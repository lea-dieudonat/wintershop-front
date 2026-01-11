import { apiClient } from "./client";
import type { LoginCredentials, AuthResponse } from "../../types/auth";

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>("/login", credentials);
        return response.data;
    },
    // Logout (uniquement côté frontend, JWT est stateless)
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },
    // Vérifier si l'utilisateur est authentifié
    isAuthenticated: (): boolean => {
        const token = localStorage.getItem("token");
        return !!token;
    },
    // Récupérer le token d'authentification
    getToken: (): string | null => {
        return localStorage.getItem("token");
    },
};