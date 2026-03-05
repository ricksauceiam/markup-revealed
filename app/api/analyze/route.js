export async function POST(req) {
  const body = await req.json();

  // Rate limit: simple in-memory check (use Redis in production)
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'API error' }), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
