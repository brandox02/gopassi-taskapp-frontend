import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    useColorScheme,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const colorScheme = useColorScheme();
    const router = useRouter();

    const isDarkMode = colorScheme === 'dark';

    // Colores adaptables al tema
    const colors = {
        background: isDarkMode ? '#121212' : '#FFFFFF',
        text: isDarkMode ? '#FFFFFF' : '#000000',
        secondaryText: isDarkMode ? '#BBBBBB' : '#666666',
        inputBackground: isDarkMode ? '#1E1E1E' : '#F5F5F5',
        inputBorder: isDarkMode ? '#333333' : '#E0E0E0',
        primary: '#4A90E2',
        error: '#FF3B30',
        success: '#34C759',
        placeholder: isDarkMode ? '#888888' : '#999999',
    };

    const handleLogin = () => {
        setIsLoading(true);
        // Lógica de login aquí
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={{}}>
                    <View style={[styles.logoContainer, {
                        //  borderBottomWidth: 1, borderBottomColor: '#dbdbdb' 
                    }]}>
                        {/* <Image
                        source={isDarkMode
                            ? require('./assets/logo-dark.png')
                            : require('./assets/logo-light.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    /> */}
                        <Text style={[styles.title, { color: colors.text, marginTop: 30 }]}>Lista de Tareas App</Text>
                        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
                            Inicia sesión para continuar
                        </Text>
                    </View>

                    <View style={[styles.formContainer, { marginTop: 50 }]}>
                        {/* Campo de Email */}
                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: colors.text }]}>Correo electrónico</Text>
                            <View style={[
                                styles.inputWrapper,
                                {
                                    backgroundColor: colors.inputBackground,
                                    borderColor: colors.inputBorder,
                                }
                            ]}>
                                <Ionicons
                                    name="mail-outline"
                                    size={20}
                                    color={colors.placeholder}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={[styles.input, { color: colors.text }]}
                                    placeholder="tu@email.com"
                                    placeholderTextColor={colors.placeholder}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                        </View>

                        {/* Campo de Contraseña */}
                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: colors.text }]}>Contraseña</Text>
                            <View style={[
                                styles.inputWrapper,
                                {
                                    backgroundColor: colors.inputBackground,
                                    borderColor: colors.inputBorder,
                                }
                            ]}>
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={20}
                                    color={colors.placeholder}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={[styles.input, { color: colors.text }]}
                                    placeholder="••••••••"
                                    placeholderTextColor={colors.placeholder}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.passwordToggle}
                                >
                                    <Ionicons
                                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                        size={20}
                                        color={colors.placeholder}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.forgotPasswordButton}>
                                <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                                    ¿Olvidaste tu contraseña?
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.loginButton,
                                {
                                    backgroundColor: colors.primary,
                                    opacity: (email && password) ? 1 : 0.7,
                                }
                            ]}
                            onPress={handleLogin}
                            disabled={!email || !password || isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.loginButtonText}>Iniciar sesión</Text>
                            )}
                        </TouchableOpacity>

                        {/* Enlace a registro */}
                        <View style={styles.registerContainer}>
                            <Text style={[styles.registerText, { color: colors.secondaryText }]}>
                                ¿No tienes una cuenta?
                            </Text>
                            <TouchableOpacity onPress={() => router.push('/(public)/register')}>
                                <Text style={[styles.registerLink, { color: colors.primary }]}>
                                    Regístrate
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,

    },
    logoContainer: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
    },
    formContainer: {
        paddingHorizontal: 24,
        marginTop: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 50,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
    },
    passwordToggle: {
        padding: 8,
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginTop: 8,
    },
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: '500',
    },
    loginButton: {
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    separatorLine: {
        flex: 1,
        height: 1,
    },
    separatorText: {
        marginHorizontal: 10,
        fontSize: 14,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingVertical: 12,
        marginHorizontal: 5,
    },
    socialButtonText: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    registerText: {
        fontSize: 14,
    },
    registerLink: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 5,
    },
});

export default LoginScreen;