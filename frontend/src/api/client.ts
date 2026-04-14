import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = sessionStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/api/accounts/refresh/`, {
            refresh: refreshToken,
          });
          const { access } = response.data;
          sessionStorage.setItem('access_token', access);
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch {
          sessionStorage.removeItem('access_token');
          sessionStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: async (username: string, password: string) => {
    const response = await api.post('/accounts/login/', { username, password });
    const { access, refresh } = response.data;
    sessionStorage.setItem('access_token', access);
    sessionStorage.setItem('refresh_token', refresh);
    return response.data;
  },
  logout: () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  },
  getCurrentUser: async () => {
    const response = await api.get('/accounts/me/');
    return response.data;
  },
};

export const leads = {
  list: async () => {
    const response = await api.get('/leads/');
    return response.data;
  },
  get: async (id: number) => {
    const response = await api.get(`/leads/${id}/`);
    return response.data;
  },
  create: async (data: object) => {
    const response = await api.post('/leads/', data);
    return response.data;
  },
  update: async (id: number, data: object) => {
    const response = await api.put(`/leads/${id}/`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/leads/${id}/`);
    return response.data;
  },
  syncTrello: async (id: number) => {
    const response = await api.post(`/leads/${id}/sync-trello/`);
    return response.data;
  },
};

export const proofing = {
  listJobs: async () => {
    const response = await api.get('/proofing/jobs/');
    return response.data;
  },
  getJob: async (id: number) => {
    const response = await api.get(`/proofing/jobs/${id}/`);
    return response.data;
  },
  createJob: async (data: object) => {
    const response = await api.post('/proofing/jobs/', data);
    return response.data;
  },
  updateJob: async (id: number, data: object) => {
    const response = await api.put(`/proofing/jobs/${id}/`, data);
    return response.data;
  },
  createVersion: async (jobId: number, data: object) => {
    const response = await api.post(`/proofing/jobs/${jobId}/versions/`, data);
    return response.data;
  },
  createComment: async (versionId: number, data: object) => {
    const response = await api.post(`/proofing/versions/${versionId}/comments/`, data);
    return response.data;
  },
};

export const dashboard = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats/');
    return response.data;
  },
};