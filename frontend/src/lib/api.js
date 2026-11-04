export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

export const ADMIN_TOKEN_KEY = 'ics_admin_token';
export const ATTENDEE_TOKEN_KEY = 'ics_attendee_token';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

/**
 * Core request helper. Throws ApiError on non-2xx responses (or `success: false`)
 * so callers can show `err.message` and react to `err.status === 401`.
 */
async function request(path, { method = 'GET', body, token } = {}) {
  const isForm = body instanceof FormData;
  const headers = {};
  // 'logged_in' is the placeholder stored when admin login only set a cookie.
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

function imageForm(file) {
  const form = new FormData();
  form.append('image', file);
  return form;
}

const slugPath = (slug) => encodeURIComponent(slug);

/* ---------- Public site ---------- */

export const publicApi = {
  getPackages: () => request('/api/summit/packages'),
  getSpeakers: () => request('/api/summit/speakers'),
  getPosts: () => request('/api/summit/posts'),
  getPost: (slug) => request(`/api/summit/posts/${slugPath(slug)}`),
  getPage: (slug) => request(`/api/summit/pages/${slugPath(slug)}`),
  register: (payload) => request('/api/summit/register', { method: 'POST', body: payload }),
  startCheckout: (registrationId) =>
    request(`/api/summit/registrations/${encodeURIComponent(registrationId)}/checkout`, { method: 'POST' }),
  getCheckoutSession: (sessionId) => request(`/api/summit/checkout/session/${encodeURIComponent(sessionId)}`),

  /** Text/plain beacons avoid a CORS preflight, so they also survive page unload. */
  beacon(endpoint, payload, { unloading = false } = {}) {
    const url = `${BACKEND_URL}/api/summit/${endpoint}`;
    const body = JSON.stringify(payload);
    if (unloading && navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: 'text/plain;charset=UTF-8' }));
      return;
    }
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body,
      keepalive: true,
    }).catch(() => {});
  },
};

/* ---------- Attendee portal ---------- */

// Bearer token from localStorage (cross-site cookies are often blocked); the httpOnly cookie is the fallback.
const attendee = (path, options = {}) =>
  request(`/api/summit${path}`, { ...options, token: localStorage.getItem(ATTENDEE_TOKEN_KEY) });

export const attendeeApi = {
  login: (email, password) => attendee('/auth/login', { method: 'POST', body: { email, password } }),
  logout: () => attendee('/auth/logout', { method: 'POST' }),
  redeemCode: (body) => attendee('/auth/redeem-code', { method: 'POST', body }),
  forgotPassword: (email) => attendee('/auth/forgot-password', { method: 'POST', body: { email } }),
  setPassword: (token, password) => attendee('/auth/set-password', { method: 'POST', body: { token, password } }),
  resetPassword: (token, password) => attendee('/auth/reset-password', { method: 'POST', body: { token, password } }),

  getMe: () => attendee('/me'),
  updateMe: (profile) => attendee('/me', { method: 'PATCH', body: profile }),
  uploadImage: (kind, file) => attendee(`/me/uploads/${kind}`, { method: 'POST', body: imageForm(file) }),
  removeImage: (kind) => attendee(`/me/uploads/${kind}`, { method: 'DELETE' }),
};

/* ---------- Site admin (blog) ---------- */

export const adminApi = {
  login: (email, password) => request('/api/auth/login', { method: 'POST', body: { email, password } }),
  logout: () => request('/api/auth/logout', { method: 'POST' }).catch(() => {}),

  getOverview: (token) => request('/api/admin/summit/overview', { token }),
  getTraffic: (token) => request('/api/admin/summit/traffic', { token }),
  getPosts: (token) => request('/api/admin/summit/posts', { token }),
  getPost: (id, token) => request(`/api/admin/summit/posts/${id}`, { token }),
  createPost: (body, token) => request('/api/admin/summit/posts', { method: 'POST', body, token }),
  updatePost: (id, body, token) => request(`/api/admin/summit/posts/${id}`, { method: 'PATCH', body, token }),
  deletePost: (id, token) => request(`/api/admin/summit/posts/${id}`, { method: 'DELETE', token }),

  async uploadImage(file, token) {
    const { data } = await request('/api/admin/summit/uploads/image', { method: 'POST', body: imageForm(file), token });
    return data.url;
  },
};
