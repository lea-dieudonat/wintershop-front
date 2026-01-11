export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    refresh_token?: string;
}

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
}

/* TODO: Add additional types as needed
export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export interface PasswordResetRequest {
    email: string;
}

export interface PasswordReset {
    token: string;
    newPassword: string;
}

export interface AuthError {
    code: number;
    message: string;
}
*/