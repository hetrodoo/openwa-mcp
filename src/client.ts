const BASE_URL = process.env.OPENWA_BASE_URL || "http://localhost:2785/api";
const API_KEY = process.env.OPENWA_API_KEY || "";

interface RequestOptions {
  method: string;
  path: string;
  body?: Record<string, unknown>;
}

export async function openwaClient<T = unknown>(opts: RequestOptions): Promise<T> {
  const url = `${BASE_URL}${opts.path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
  };

  const res = await fetch(url, {
    method: opts.method,
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`OpenWA API ${res.status}: ${text}`);
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return text as T;
  }
}
