import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    useColorScheme,
    ScrollView,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/features/auth/auth.hooks';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Esquema de validación
const registerSchema = yup.object({
    username: yup
        .string()
        .required('Nombre de usuario es requerido')
        .min(3, 'Mínimo 3 caracteres')
        .max(20, 'Máximo 20 caracteres')
        .matches(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guiones bajos'),
    fullname: yup
        .string()
        .required('Nombre completo es requerido')
        .min(3, 'Mínimo 3 caracteres')
        .max(50, 'Máximo 50 caracteres'),
    email: yup
        .string()
        .required('Email es requerido')
        .email('Email inválido'),
    password: yup
        .string()
        .required('Contraseña es requerida')
        .min(6, 'Mínimo 6 caracteres'),
    confirmPassword: yup
        .string()
        .required('Confirma tu contraseña')
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

const RegisterScreen = () => {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const { register, isLoading } = useAuth();
    const isDarkMode = colorScheme === 'dark';

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
        mode: 'onChange',
    });

    // Colores adaptables al tema
    const colors = {
        background: isDarkMode ? '#121212' : '#FFFFFF',
        text: isDarkMode ? '#FFFFFF' : '#000000',
        secondaryText: isDarkMode ? '#BBBBBB' : '#666666',
        inputBackground: isDarkMode ? '#1E1E1E' : '#F5F5F5',
        inputBorder: isDarkMode ? '#333333' : '#E0E0E0',
        inputErrorBorder: isDarkMode ? '#FF453A' : '#FF3B30',
        primary: '#4A90E2',
        error: '#FF3B30',
        success: '#34C759',
        placeholder: isDarkMode ? '#888888' : '#999999',
    };

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await register({
                username: data.username,
                fullname: data.fullname,
                email: data.email,
                password: data.password,
            });

            router.push('/(protected)/list');
        } catch (error: any) {
            console.error('Registration error:', error);
            Alert.alert(error?.message || 'Algo salió mal')
        }
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
                <View style={styles.logoContainer}>
                    <Text style={[styles.title, { color: colors.text, marginTop: 30 }]}>
                        Lista de Tareas App
                    </Text>
                    <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
                        Completa tu información para registrarte
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    {/* Campo de Username */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>
                            Nombre de usuario
                        </Text>
                        <Controller
                            control={control}
                            name="username"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View
                                    style={[
                                        styles.inputWrapper,
                                        {
                                            backgroundColor: colors.inputBackground,
                                            borderColor: errors.username
                                                ? colors.inputErrorBorder
                                                : colors.inputBorder,
                                        },
                                    ]}
                                >
                                    <Ionicons
                                        name="person-outline"
                                        size={20}
                                        color={colors.placeholder}
                                        style={styles.inputIcon}
                                    />
                                    <TextInput
                                        style={[styles.input, { color: colors.text }]}
                                        placeholder="tu_usuario"
                                        placeholderTextColor={colors.placeholder}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                </View>
                            )}
                        />
                        {errors.username && (
                            <Text style={[styles.errorText, { color: colors.error }]}>
                                {errors.username.message}
                            </Text>
                        )}
                    </View>

                    {/* Campo de Nombre completo */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>
                            Nombre completo
                        </Text>
                        <Controller
                            control={control}
                            name="fullname"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View
                                    style={[
                                        styles.inputWrapper,
                                        {
                                            backgroundColor: colors.inputBackground,
                                            borderColor: errors.fullname
                                                ? colors.inputErrorBorder
                                                : colors.inputBorder,
                                        },
                                    ]}
                                >
                                    <Ionicons
                                        name="person-circle-outline"
                                        size={20}
                                        color={colors.placeholder}
                                        style={styles.inputIcon}
                                    />
                                    <TextInput
                                        style={[styles.input, { color: colors.text }]}
                                        placeholder="Tu nombre completo"
                                        placeholderTextColor={colors.placeholder}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        autoCapitalize="words"
                                    />
                                </View>
                            )}
                        />
                        {errors.fullname && (
                            <Text style={[styles.errorText, { color: colors.error }]}>
                                {errors.fullname.message}
                            </Text>
                        )}
                    </View>

                    {/* Campo de Email */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>
                            Correo electrónico
                        </Text>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View
                                    style={[
                                        styles.inputWrapper,
                                        {
                                            backgroundColor: colors.inputBackground,
                                            borderColor: errors.email
                                                ? colors.inputErrorBorder
                                                : colors.inputBorder,
                                        },
                                    ]}
                                >
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
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                </View>
                            )}
                        />
                        {errors.email && (
                            <Text style={[styles.errorText, { color: colors.error }]}>
                                {errors.email.message}
                            </Text>
                        )}
                    </View>

                    {/* Campo de Contraseña */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>
                            Contraseña
                        </Text>
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View
                                    style={[
                                        styles.inputWrapper,
                                        {
                                            backgroundColor: colors.inputBackground,
                                            borderColor: errors.password
                                                ? colors.inputErrorBorder
                                                : colors.inputBorder,
                                        },
                                    ]}
                                >
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
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        secureTextEntry={true}
                                    />
                                </View>
                            )}
                        />
                        {errors.password && (
                            <Text style={[styles.errorText, { color: colors.error }]}>
                                {errors.password.message}
                            </Text>
                        )}
                    </View>

                    {/* Campo de Confirmar Contraseña */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { color: colors.text }]}>
                            Confirmar contraseña
                        </Text>
                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View
                                    style={[
                                        styles.inputWrapper,
                                        {
                                            backgroundColor: colors.inputBackground,
                                            borderColor: errors.confirmPassword
                                                ? colors.inputErrorBorder
                                                : colors.inputBorder,
                                        },
                                    ]}
                                >
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
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        secureTextEntry={true}
                                    />
                                </View>
                            )}
                        />
                        {errors.confirmPassword && (
                            <Text style={[styles.errorText, { color: colors.error }]}>
                                {errors.confirmPassword.message}
                            </Text>
                        )}
                    </View>

                    {/* Botón de Registro */}
                    <TouchableOpacity
                        style={[
                            styles.registerButton,
                            {
                                backgroundColor: isValid ? colors.primary : `${colors.primary}80`,
                            },
                        ]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={!isValid || isLoading}
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

// Los estilos se mantienen igual que en tu código original
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