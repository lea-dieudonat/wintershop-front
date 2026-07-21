import axios from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur REQUEST: Ajoute automatiquement le token jwt à chaque requête
apiClient.interceptors.request.use(
    (config) => {
    // You can add authorization headers or other custom logic here TODO: to be configured
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur RESPONSE: Gère les erreurs d'authentification
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear stale/expired auth state, but don't force-redirect: browsing
            // public pages (home, product listing) must keep working even if a
            // background request 401s. Notify AuthContext so isAuthenticated
            // updates reactively; ProtectedRoute then redirects only when the
            // user is actually on a protected route.
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.dispatchEvent(new Event('auth:unauthorized'));
        }
        return Promise.reject(error);
    }
)