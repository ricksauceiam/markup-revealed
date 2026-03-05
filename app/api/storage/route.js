import { promises as fs } from 'fs';
import path from 'path';

// Simple file-based storage for getting started.
// For production, replace with Vercel KV:
//   npm install @vercel/kv
//   import { kv } from '@vercel/kv';
//   GET: const val = await kv.get(key); 
//   POST: await kv.set(key, value);

const STORAGE_DIR = path.join(process.cwd(), '.storage');

async function ensureDir() {
  try { await fs.mkdir(STORAGE_DIR, { recursive: true }); } catch {}
}

function sanitizeKey(key) {
  return key.replace(/[^a-zA-Z0-9_-]/g, '_');
}

// GET /api/storage?key=xxx&shared=true
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');
  if (!key) return Response.json(null);

  await ensureDir();
  const filePath = path.join(STORAGE_DIR, sanitizeKey(key) + '.json');

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return Response.json({ key, value: data });
  } catch {
    return Response.json(null);
  }
}

// POST /api/storage { key, value, shared? }
export async function POST(req) {
  const body = await req.json();
  const { key, value } = body;
  if (!key || value === undefined) {
    return Response.json({ error: 'Missing key or value' }, { status: 400 });
  }

  await ensureDir();
  const filePath = path.join(STORAGE_DIR, sanitizeKey(key) + '.json');

  try {
    await fs.writeFile(filePath, value, 'utf-8');
    return Response.json({ key, value, success: true });
  } catch (err) {
    return Response.json({ error: 'Write failed' }, { status: 500 });
  }
}
