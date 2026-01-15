import { useState } from "react";
import type { ReactNode } from "react";
import { authApi } from "@/services/api/authApi";
import type { User, AuthState, LoginCredentials } from "@/types/authTypes";
import { AuthContext } from "./Auth";

// Fonction helper pour récupérer l'état initial depuis le localStorage
const getInitialAuthState = (): AuthState => {
  const token = authApi.getToken();
  const userStr = localStorage.getItem("user");

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr) as User;
      return {
        user,
        isAuthenticated: true,
        isLoading: false,
        token,
      };
    } catch {
      authApi.logout();
    }
  }

  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    token: null,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(getInitialAuthState);

  const login = async (credentials: LoginCredentials) => {
    const { token } = await authApi.login(credentials);
    // Stocker le token
    localStorage.setItem("token", token);

    // Récupérer les infos utilisateur depuis une API dédiée
    const user = await authApi.getMe();
    localStorage.setItem("user", JSON.stringify(user));

    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
      token,
    });
  };

  const logout = () => {
    authApi.logout();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
