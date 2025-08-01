import api from '../../utils/api';
import { LoginCredentials, RegisterCredentials } from './types';

export const authService = {
    async login(credentials: LoginCredentials) {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    async register(credentials: RegisterCredentials) {
        const response = await api.post('/auth/register', credentials);
        return response.data;
    },

};