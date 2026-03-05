export async function POST(req) {
  try {
    const body = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not set');
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API error:', response.status, JSON.stringify(data));
      return Response.json(
        { error: `Anthropic API error: ${response.status}`, details: data },
        { status: response.status }
      );
    }

    return Response.json(data);
  } catch (err) {
    console.error('Analyze route error:', err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
