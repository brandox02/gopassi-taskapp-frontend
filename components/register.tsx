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
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const colorScheme = useColorScheme();
    const router = useRouter()
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

    const handleRegister = () => {
        setIsLoading(true);
        // Lógica de registro aquí
        setTimeout(() => {
            setIsLoading(false);
            //   navigation.navigate('Home');
            Alert.alert('Tratando de navegador a home');
        }, 1500);
    };

    const passwordsMatch = password === confirmPassword && password.length > 0;
    const isFormValid = name && email && password && confirmPassword && passwordsMatch;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.logoContainer}>
                    {/* <Image
                        source={isDarkMode
                            ? require('./assets/logo-dark.png')
                            : require('./assets/logo-light.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    /> */}
                    <Text style={[styles.title, { color: colors.text, marginTop: 30 }]}>Lista de Tareas App</Text>
                    <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
                        Completa tu información para registrarte
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    {/* Campo de Nombre */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>Nombre completo</Text>
                        <View style={[
                            styles.inputWrapper,
                            {
                                backgroundColor: colors.inputBackground,
                                borderColor: colors.inputBorder,
                            }
                        ]}>
                            <Ionicons
                                name="person-outline"
                                size={20}
                                color={colors.placeholder}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[styles.input, { color: colors.text }]}
                                placeholder="Tu nombre"
                                placeholderTextColor={colors.placeholder}
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                            />
                        </View>
                    </View>

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
                        {password.length > 0 && password.length < 6 && (
                            <Text style={[styles.errorText, { color: colors.error }]}>
                                La contraseña debe tener al menos 6 caracteres
                            </Text>
                        )}
                    </View>

                    {/* Campo de Confirmar Contraseña */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>Confirmar contraseña</Text>
                        <View style={[
                            styles.inputWrapper,
                            {
                                backgroundColor: colors.inputBackground,
                                borderColor: !passwordsMatch && confirmPassword ? colors.error : colors.inputBorder,
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
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={styles.passwordToggle}
                            >
                                <Ionicons
                                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                                    size={20}
                                    color={colors.placeholder}
                                />
                            </TouchableOpacity>
                        </View>
                        {!passwordsMatch && confirmPassword && (
                            <Text style={[styles.errorText, { color: colors.error }]}>
                                Las contraseñas no coinciden
                            </Text>
                        )}
                    </View>



                    {/* Botón de Registro */}
                    <TouchableOpacity
                        style={[
                            styles.registerButton,
                            {
                                backgroundColor: isFormValid ? colors.primary : `${colors.primary}80`,
                            }
                        ]}
                        onPress={handleRegister}
                        disabled={!isFormValid || isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.registerButtonText}>Registrarse</Text>
                        )}
                    </TouchableOpacity>

                    {/* Enlace a login */}
                    <View style={styles.loginContainer}>
                        <Text style={[styles.loginText, { color: colors.secondaryText }]}>
                            ¿Ya tienes una cuenta?
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/(public)/login')}>
                            <Text style={[styles.loginLink, { color: colors.primary }]}>
                                Inicia sesión
                            </Text>
                        </TouchableOpacity>
                    </View>
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
        marginBottom: 16,
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
    errorText: {
        fontSize: 12,
        marginTop: 4,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        flexWrap: 'wrap',
    },
    checkbox: {
        marginRight: 8,
    },
    termsText: {
        fontSize: 14,
        marginRight: 5,
    },
    termsLink: {
        fontSize: 14,
        fontWeight: '500',
    },
    registerButton: {
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginText: {
        fontSize: 14,
    },
    loginLink: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 5,
    },
});

export default RegisterScreen;