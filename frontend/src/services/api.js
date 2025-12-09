import { API_URL } from '../config/endpoints';

/**
 * api(path, options)
 * Unified wrapper for REST API calls.
 * Automatically attaches token when provided.
 */
export async function api(path, { method = 'GET', body, token, headers = {} } = {}) {
  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (token) {
    finalHeaders['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    // Try reading JSON error → fallback to text
    let message = res.statusText;
    try {
      const data = await res.json();
      message = data.message || JSON.stringify(data);
    } catch (_) {
      message = await res.text();
    }
    throw new Error(message || 'Request failed');
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }

  return res.text();
}
