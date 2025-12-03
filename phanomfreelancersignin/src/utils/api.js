export const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

export async function apiFetch(path, opts = {}) {
  const headers = opts.headers || {};
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  const res = await fetch(API_BASE + path, { ...opts, headers });
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if(!res.ok) throw { status: res.status, body: json };
    return json;
  } catch(e){
    if(text && text.startsWith('{')) throw e;
    // fallback
    return text;
  }
}
