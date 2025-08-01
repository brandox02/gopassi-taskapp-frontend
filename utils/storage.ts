import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_STORAGE_KEY = '@auth';

export const storage = {
    async getItem<T>(key: string): Promise<T | null> {
        try {
            const value = await AsyncStorage.getItem(`${AUTH_STORAGE_KEY}:${key}`);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Storage get error:', error);
            return null;
        }
    },

    async setItem(key: string, value: any): Promise<void> {
        try {
            await AsyncStorage.setItem(
                `${AUTH_STORAGE_KEY}:${key}`,
                JSON.stringify(value)
            );
        } catch (error) {
            console.error('Storage set error:', error);
        }
    },

    async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(`${AUTH_STORAGE_KEY}:${key}`);
        } catch (error) {
            console.error('Storage remove error:', error);
        }
    },

    async clear(): Promise<void> {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const authKeys = keys.filter((key) => key.startsWith(AUTH_STORAGE_KEY));
            await AsyncStorage.multiRemove(authKeys);
        } catch (error) {
            console.error('Storage clear error:', error);
        }
    },
};