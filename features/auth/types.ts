export type User = {
    id: number;
    username: string;
    fullname: string;
    email: string;
    createdAt?: string;
};

export type AuthState = {
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;

    login: (credentials: LoginCredentials) => Promise<void>
    register: (credentials: RegisterCredentials) => Promise<void>
    logout: () => void
};

export type LoginCredentials = {
    username: string;
    password: string;
};

export type RegisterCredentials = {
    username: string;
    email: string;
    password: string;
    fullname: string;
};