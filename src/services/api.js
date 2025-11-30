import axios from 'axios';

const api = axios.create({
  baseURL:
    (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) ||
    ((typeof process !== "undefined" && process.env && process.env.VITE_API_URL) ? process.env.VITE_API_URL : undefined) ||
    "http://localhost:8080",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inyectar token JWT si existe en localStorage (clave 'user' con campo token)
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('user');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch (e) {
      // si hay error al parsear, lo ignoramos y seguimos sin token
    }
  }
  return config;
});

export default api;
