import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
// import {  } from '../../context/AuthContext';

export default function ProtectedLayout() {
    //   const { user } = useAuth();

    //   if (!user) {
    //     return <Redirect href="/(public)/login" />;
    //   }
    const handleLogout = async () => {
        // try {
        //   await logout();
        //   router.replace('/(public)/login');
        // } catch (error) {
        //   console.error('Error al cerrar sesión:', error);
        // }
    };
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                contentStyle: { backgroundColor: '#f5f5f5' },
                headerRight: () => (
                    <TouchableOpacity
                        onPress={handleLogout}
                        style={{
                            marginRight: 15,
                            // flexDirection: 'row', alignItems: 'center', gap: 5 
                        }}
                    >
                        <Ionicons name="log-out-outline" size={24} color="#4A90E2" />
                        {/* <Text>Cerrar Sesión</Text> */}
                    </TouchableOpacity>
                ),
            }}
        >
            <Stack.Screen
                name="list"
                options={{
                    title: 'Lista de Tareas', headerTitle: 'Lista de Tareas',

                }}
            />
        </Stack>
    );
}