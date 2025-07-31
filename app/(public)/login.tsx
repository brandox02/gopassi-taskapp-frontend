import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Login from '@/components/login';

const LoginScreen = () => {
    return (
        <View style={{ flex: 1, }}>
            <Login />
        </View >
    );
};

export default LoginScreen;