// Storage using /tmp on Vercel (ephemeral but works for testing)
// For production, swap this for Vercel KV or Supabase
import { promises as fs } from 'fs';
import path from 'path';

// On Vercel, only /tmp is writable
const STORAGE_DIR = path.join('/tmp', 'mr-storage');

async function ensureDir() {
  try { await fs.mkdir(STORAGE_DIR, { recursive: true }); } catch {}
}

function sanitizeKey(key) {
  return key.replace(/[^a-zA-Z0-9_-]/g, '_');
}

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

export async function POST(req) {
  try {
    const body = await req.json();
    const { key, value } = body;
    if (!key || value === undefined) {
      return Response.json({ error: 'Missing key or value' }, { status: 400 });
    }

    await ensureDir();
    const filePath = path.join(STORAGE_DIR, sanitizeKey(key) + '.json');
    await fs.writeFile(filePath, value, 'utf-8');
    return Response.json({ key, value, success: true });
  } catch (err) {
    console.error('Storage error:', err.message);
    return Response.json({ error: 'Storage failed' }, { status: 500 });
  }
}
