import { useAuth, useProtectedRoute } from '@/features/auth/auth.hooks';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
// import {  } from '../../context/AuthContext';

export default function ProtectedLayout() {
    useProtectedRoute();
    const { logout, user } = useAuth();

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                contentStyle: {},
                headerRight: () => (
                    <View>
                        <TouchableOpacity
                            onPress={logout}
                            style={{
                                marginRight: 15,
                            }}
                        >
                            <Ionicons name="log-out-outline" size={24} color="#4A90E2" />
                        </TouchableOpacity>
                    </View>
                ),
            }}
        >
            <Stack.Screen
                name="list"
                options={{
                    title: 'Lista de Tareas', headerTitle: 'Lista de Tareas',
                    headerBackVisible: false,
                }}
            />
        </Stack>
    );
}