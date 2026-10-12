export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

export const ADMIN_TOKEN_KEY = 'ics_admin_token';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

/**
 * Authenticated admin request. Sends the stored JWT as a Bearer token and the session cookie as a fallback.
 * Throws ApiError on non-2xx responses so callers can show `err.message` and react to `err.status === 401`.
 */
export async function adminRequest(path, { method = 'GET', body, token } = {}) {
  const isForm = body instanceof FormData;
  const headers = {};
  // 'logged_in' is the placeholder stored when login only set a cookie.
  if (token && token !== 'logged_in') headers.Authorization = `Bearer ${token}`;
  if (body !== undefined && !isForm) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${BACKEND_URL}${path}`, {
    method,
    headers,
    credentials: 'include',
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new ApiError(data.message || `Request failed (${res.status})`, res.status);
  }
  return data;
}

export async function uploadAdminImage(file, token) {
  const form = new FormData();
  form.append('image', file);
  const { data } = await adminRequest('/api/admin/summit/uploads/image', { method: 'POST', body: form, token });
  return data.url;
}
