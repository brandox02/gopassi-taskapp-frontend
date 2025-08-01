import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from '../../utils/storage';
import { authService } from './auth.service';
import { AuthState, LoginCredentials, RegisterCredentials, User } from './types';

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isLoading: false,
            error: null,
            login: async (credentials: LoginCredentials) => {
                set({ isLoading: true, error: null });
                try {
                    const { user, access_token } = await authService.login(credentials);
                    set({ user, accessToken: access_token, isLoading: false });
                    return user;
                } catch (error) {
                    set({ error: 'Invalid credentials', isLoading: false });
                    throw error;
                }
            },
            register: async (credentials: RegisterCredentials) => {
                set({ isLoading: true, error: null });
                try {
                    const { user, access_token } = await authService.register(credentials);
                    set({ user, accessToken: access_token, isLoading: false });
                    return user;
                } catch (error) {
                    set({ error: 'Registration failed', isLoading: false });
                    throw error;
                }
            },
            logout: () => {
                set({ user: null, accessToken: null });
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => storage),
            partialize: (state) => ({ accessToken: state.accessToken }),
        }
    )
);