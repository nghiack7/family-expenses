/**
 * AI Financial Analysis — Cloudflare Function
 * Proxies requests to Gemini / OpenAI / Claude APIs
 * API key is sent per-request from client, never stored server-side
 */

const PROVIDERS = {
  gemini: {
    buildUrl: (model, apiKey) =>
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    buildBody: (prompt) => ({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 2048 },
    }),
    extractText: (json) =>
      json.candidates?.[0]?.content?.parts?.[0]?.text || '',
    models: ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash'],
  },
  openai: {
    buildUrl: () => 'https://api.openai.com/v1/chat/completions',
    buildBody: (prompt, model) => ({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 2048,
    }),
    buildHeaders: (apiKey) => ({ Authorization: `Bearer ${apiKey}` }),
    extractText: (json) => json.choices?.[0]?.message?.content || '',
    models: ['gpt-4o-mini', 'gpt-4o', 'gpt-4.1-mini', 'gpt-4.1-nano'],
  },
  anthropic: {
    buildUrl: () => 'https://api.anthropic.com/v1/messages',
    buildBody: (prompt, model) => ({
      model,
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    }),
    buildHeaders: (apiKey) => ({
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    }),
    extractText: (json) =>
      json.content?.map((b) => b.text).join('') || '',
    models: ['claude-sonnet-4-20250514', 'claude-haiku-4-5-20251001'],
  },
  zai: {
    buildUrl: () => 'https://api.z.ai/api/paas/v4/chat/completions',
    buildBody: (prompt, model) => ({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 2048,
    }),
    buildHeaders: (apiKey) => ({ Authorization: `Bearer ${apiKey}` }),
    extractText: (json) => json.choices?.[0]?.message?.content || '',
    models: ['glm-5.1', 'glm-5-turbo', 'glm-4.7', 'glm-4.7-flash', 'glm-4.5-flash'],
  },
};

function buildAnalysisPrompt(data) {
  const { stats, monthLabel, currency, income, savings, question } = data;

  const catBreakdown = (stats.by_category || [])
    .filter((c) => c.total > 0)
    .map((c) => `  - ${c.name}: ${c.total} ${currency}`)
    .join('\n');

  const personBreakdown = (stats.by_person || [])
    .map((p) => `  - ${p.name}: ${p.total} ${currency}`)
    .join('\n');

  return `You are a family financial advisor. Analyze this household's spending for ${monthLabel}.

## Data
- Currency: ${currency}
- Total spending: ${stats.total} ${currency}
- Number of expenses: ${stats.count}
${income ? `- Monthly income: ${income} ${currency}` : ''}
${savings ? `- Current savings: ${savings} ${currency}` : ''}

### By Category:
${catBreakdown || '  No data'}

### By Person:
${personBreakdown || '  No data'}

${question ? `## User's Question\n${question}\n\nPlease address this specific question in your analysis.\n\n` : ''}## Instructions
Respond ONLY with valid JSON (no markdown, no code fences). Use this exact structure:

{
  "summary": "2-3 sentence overview of financial health",
  "score": <number 1-10, 10 = excellent financial health>,
  "insights": ["insight 1", "insight 2", "insight 3"],
  "warnings": ["warning if any"],
  "tips": ["actionable tip 1", "actionable tip 2"],
  "chart": {
    "type": "doughnut",
    "labels": ["category1", "category2"],
    "values": [amount1, amount2],
    "colors": ["#4c645a", "#785843", "#a83836", "#4f645b", "#6b4c38", "#b2b2ac", "#40584e", "#cde9db"]
  },
  "trend": {
    "label": "Spending health",
    "description": "one line about the trend"
  }
}`;
}

export async function onRequestPost(context) {
  const { request } = context;

  try {
    const body = await request.json();
    const { provider, model, apiKey, stats, monthLabel, currency, income, savings, question } = body;

    if (!provider || !model || !apiKey) {
      return Response.json({ error: 'Missing provider, model, or apiKey' }, { status: 400 });
    }

    const providerConfig = PROVIDERS[provider];
    if (!providerConfig) {
      return Response.json({ error: `Unknown provider: ${provider}` }, { status: 400 });
    }

    const prompt = buildAnalysisPrompt({ stats, monthLabel, currency, income, savings, question });
    const url = providerConfig.buildUrl(model, apiKey);
    const reqBody = providerConfig.buildBody(prompt, model);
    const headers = {
      'Content-Type': 'application/json',
      ...(providerConfig.buildHeaders ? providerConfig.buildHeaders(apiKey) : {}),
    };

    const aiRes = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(reqBody),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      return Response.json(
        { error: `AI API error (${aiRes.status}): ${errText.slice(0, 300)}` },
        { status: 502 }
      );
    }

    const aiJson = await aiRes.json();
    const rawText = providerConfig.extractText(aiJson);

    // Parse JSON from AI response (strip markdown fences if present)
    const cleaned = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    let analysis;
    try {
      analysis = JSON.parse(cleaned);
    } catch {
      return Response.json(
        { error: 'AI returned invalid JSON', raw: rawText.slice(0, 500) },
        { status: 502 }
      );
    }

    return Response.json({ analysis });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
