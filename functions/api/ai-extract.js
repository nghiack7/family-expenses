/**
 * AI Expense Extraction — Cloudflare Function
 * Accepts image (receipt/screenshot) or text (Excel/CSV data)
 * Uses AI to extract expense items
 */

import { ensurePersonalFamilyMembership } from './_family-utils.js';

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB

function buildExtractionPrompt(categories, currency) {
  const catList = categories.map(c => `  - id:"${c.id}" name:"${c.name}"`).join('\n');
  return `You are an expense extraction assistant. Extract ALL expense items from the provided image or text.

## Available Categories
${catList}

## Rules
- Extract each distinct expense item
- Match each item to the most appropriate category from the list above
- Currency: ${currency}
- For receipts: extract individual line items, NOT the total
- For screenshots of expense lists: extract each row
- If a date is visible, use it (YYYY-MM-DD format). Otherwise use today
- Amounts should be numbers (no currency symbols)
- Description should be concise but clear

Respond ONLY with valid JSON (no markdown, no code fences):
{
  "expenses": [
    {
      "amount": 50000,
      "description": "Cà phê sữa đá",
      "category_id": "matching-category-id",
      "category_name": "Food",
      "expense_date": "2025-04-11"
    }
  ],
  "raw_text": "brief summary of what was detected in the image"
}

If no expenses can be extracted, return: { "expenses": [], "raw_text": "explanation" }`;
}

function buildProviderRequest(provider, model, apiKey, prompt, imageBase64, imageMimeType) {
  const config = {
    gemini: () => {
      const parts = [{ text: prompt }];
      if (imageBase64) {
        parts.push({ inline_data: { mime_type: imageMimeType, data: imageBase64 } });
      }
      return {
        url: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        headers: { 'Content-Type': 'application/json' },
        body: { contents: [{ parts }], generationConfig: { temperature: 0.1, maxOutputTokens: 4096 } },
        extractText: (json) => json.candidates?.[0]?.content?.parts?.[0]?.text || '',
      };
    },
    openai: () => {
      const content = [];
      if (imageBase64) {
        content.push({ type: 'image_url', image_url: { url: `data:${imageMimeType};base64,${imageBase64}` } });
      }
      content.push({ type: 'text', text: prompt });
      return {
        url: 'https://api.openai.com/v1/chat/completions',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: { model, messages: [{ role: 'user', content }], temperature: 0.1, max_tokens: 4096 },
        extractText: (json) => json.choices?.[0]?.message?.content || '',
      };
    },
    anthropic: () => {
      const content = [];
      if (imageBase64) {
        content.push({ type: 'image', source: { type: 'base64', media_type: imageMimeType, data: imageBase64 } });
      }
      content.push({ type: 'text', text: prompt });
      return {
        url: 'https://api.anthropic.com/v1/messages',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: { model, max_tokens: 4096, messages: [{ role: 'user', content }] },
        extractText: (json) => json.content?.map(b => b.text).join('') || '',
      };
    },
    zai: () => {
      const content = [];
      if (imageBase64) {
        content.push({ type: 'image', source: { type: 'base64', media_type: imageMimeType, data: imageBase64 } });
      }
      content.push({ type: 'text', text: prompt });
      return {
        url: 'https://api.z.ai/api/anthropic/v1/messages',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: { model, max_tokens: 4096, messages: [{ role: 'user', content }] },
        extractText: (json) => json.content?.map(b => b.text).join('') || '',
      };
    },
  };

  const builder = config[provider];
  if (!builder) return null;
  return builder();
}

export async function onRequestPost(context) {
  const { request, env, data } = context;
  const user = data.user;

  try {
    const formData = await request.formData();
    const provider = formData.get('provider');
    const model = formData.get('model');
    const apiKey = formData.get('apiKey');
    const currency = formData.get('currency') || 'VND';
    const file = formData.get('file');

    if (!provider || !model || !apiKey) {
      return Response.json({ error: 'Missing provider, model, or apiKey' }, { status: 400 });
    }
    if (!file) {
      return Response.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Get user's family categories
    const membership = await ensurePersonalFamilyMembership(env, user);
    if (!membership) {
      return Response.json({ error: 'Not in a family' }, { status: 404 });
    }

    const categories = await env.DB.prepare(
      `SELECT id, name, icon FROM categories WHERE family_id = ?`
    ).bind(membership.family_id).all();

    const prompt = buildExtractionPrompt(categories.results, currency);

    let imageBase64 = null;
    let imageMimeType = null;

    const mimeType = file.type;
    const arrayBuf = await file.arrayBuffer();

    if (arrayBuf.byteLength > MAX_IMAGE_SIZE) {
      return Response.json({ error: 'File too large (max 4MB)' }, { status: 400 });
    }

    if (mimeType.startsWith('image/')) {
      // Image file — send as vision input
      const bytes = new Uint8Array(arrayBuf);
      imageBase64 = btoa(String.fromCharCode(...bytes));
      imageMimeType = mimeType;
    } else {
      return Response.json({ error: 'Unsupported file type. Please upload an image (JPG, PNG).' }, { status: 400 });
    }

    const req = buildProviderRequest(provider, model, apiKey, prompt, imageBase64, imageMimeType);
    if (!req) {
      return Response.json({ error: `Unknown provider: ${provider}` }, { status: 400 });
    }

    const aiRes = await fetch(req.url, {
      method: 'POST',
      headers: req.headers,
      body: JSON.stringify(req.body),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      return Response.json(
        { error: `AI API error (${aiRes.status}): ${errText.slice(0, 300)}` },
        { status: 502 }
      );
    }

    const aiJson = await aiRes.json();
    const rawText = req.extractText(aiJson);
    const cleaned = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

    let result;
    try {
      result = JSON.parse(cleaned);
    } catch {
      return Response.json(
        { error: 'AI returned invalid JSON', raw: rawText.slice(0, 500) },
        { status: 502 }
      );
    }

    return Response.json({
      expenses: result.expenses || [],
      raw_text: result.raw_text || '',
      categories: categories.results,
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
