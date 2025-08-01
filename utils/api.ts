import { useAuthStore } from '@/features/auth/auth.store';
import axios from 'axios';

const API_BASE_URL = 'http://172.29.16.1:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para añadir el token a las solicitudes
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // El servidor respondió con un código de error (por ejemplo, 400 o 500)
            console.error('Error response:', {
                url: error.config.url,
                method: error.config.method,
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
            });
        } else if (error.request) {
            // La solicitud fue hecha pero no hubo respuesta
            console.error('No response received:', {
                url: error.config?.url,
                method: error.config?.method,
                request: error.request,
            });
        } else {
            // Algo salió mal configurando la solicitud
            console.error('Request setup error:', error.message);
        }

        return Promise.reject(error.response?.data ?? error);

    }
);

export default api;