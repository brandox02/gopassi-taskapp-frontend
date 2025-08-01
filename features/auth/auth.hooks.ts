import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from './auth.store';

export const useAuth = () => {
    const { user, accessToken, isLoading, error, login, register, logout } = useAuthStore();

    return {
        user,
        accessToken,
        isLoading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!accessToken,
    };
};

export const useProtectedRoute = () => {
    const redirectPath = '/(public)/login';
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace(redirectPath);
        }
    }, [isAuthenticated, isLoading]);

    return { isAuthenticated, isLoading };
};

export const usePublicRoute = () => {
    const redirectPath = '/(protected)/list'
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace(redirectPath);
        }
    }, [isAuthenticated, isLoading]);

    return { isAuthenticated, isLoading };
};