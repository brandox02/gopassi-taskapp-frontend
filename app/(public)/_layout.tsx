import { usePublicRoute } from '@/features/auth/auth.hooks';
import { Stack } from 'expo-router';

export default function PublicLayout() {
    usePublicRoute();
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#fff' },
            }}
        />
    );
}