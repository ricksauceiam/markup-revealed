# MarkupRevealed

See what products really cost to make vs what brands charge you.

200+ built-in products analyzed with manufacturing costs, markup percentages, and affordable alternatives. Paste any product link to reveal its markup in real-time using AI.

## Deploy Your Own

1. Fork this repo
2. Go to [vercel.com/new](https://vercel.com/new) and import it
3. Add environment variable: `ANTHROPIC_API_KEY` = your key from [console.anthropic.com](https://console.anthropic.com)
4. Click Deploy

## Features

- 200 pre-analyzed products across 8 categories
- Paste any product URL to analyze its markup with AI
- Community database — every analyzed product is cached for instant lookups
- Smarter Pick alternatives with savings calculations
- Search, sort, and filter by category

## Tech Stack

- Next.js 14
- React 18
- Anthropic Claude API (with web search)
- File-based storage (swap for Vercel KV for production)
