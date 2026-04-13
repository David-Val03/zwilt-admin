import axios from 'axios';

// In dev: Next.js proxy at /api → localhost:5000/api (same-origin, cookies work)
// In prod: use the actual server URL via env var
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Send zwilt session cookie
});

// Redirect to login on 401 (unauthenticated) or 403 (forbidden/admin-only)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // TODO: Remove bypass once user.accountType is ADMIN
            // Don't redirect for stats endpoint - it's expected to fail for CLIENT accounts
            if (!error.config?.url?.includes('/api/admin/stats')) {
                if (typeof window !== 'undefined') {
                    window.location.href = '/auth/login';
                }
            }
        }
        return Promise.reject(error);
    },
);

export default api;
