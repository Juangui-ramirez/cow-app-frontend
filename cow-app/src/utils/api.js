const API_URL = import.meta.env.VITE_API_URL;

const authHeaders = () => {
  const token = sessionStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Thin wrapper around fetch: prefixes VITE_API_URL, attaches the bearer
// token when present, and JSON-encodes `body` when given.
export const apiFetch = (path, { method = "GET", body, headers = {} } = {}) => {
  return fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...(body !== undefined ? { "Content-type": "application/json" } : {}),
      ...authHeaders(),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
};
