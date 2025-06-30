"use client";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContextType, AuthState } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    loading: true,
  });
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("spotify_access_token");
      if (token) {
        apiClient.setAccessToken(token);
        const response = await apiClient.getCurrentUser();

        if (response.success && response.data) {
          setAuthState({
            isAuthenticated: true,
            user: response.data,
            accessToken: token,
            loading: false,
          });
        } else {
          // Token inválido, remove do localStorage
          localStorage.removeItem("spotify_access_token");
          setAuthState({
            isAuthenticated: false,
            user: null,
            accessToken: null,
            loading: false,
          });
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          loading: false,
        });
      }
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        loading: false,
      });
    }
  };

  const login = async () => {
    try {
      const response = await apiClient.initiateLogin();

      if (response.success && response.data?.auth_url) {
        window.location.href = response.data.auth_url;
      } else {
        throw new Error(response.error || "Failed to initiate login");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Erro ao iniciar login. Tente novamente.");
    }
  };

  const handleCallback = async (token: string) => {
    try {
      // Salvar token no localStorage
      localStorage.setItem("spotify_access_token", token);

      // Configurar API client
      apiClient.setAccessToken(token);

      // Buscar dados do usuário para validar o token
      const userResponse = await apiClient.getCurrentUser();

      if (userResponse.success && userResponse.data) {
        setAuthState({
          isAuthenticated: true,
          user: userResponse.data,
          accessToken: token,
          loading: false,
        });

        router.push("/dashboard");
      } else {
        throw new Error("Token inválido ou expirado: " + userResponse.error);
      }
    } catch (error) {
      console.error("💥 Erro no processamento do token:", error);

      // Limpar token inválido
      localStorage.removeItem("spotify_access_token");
      apiClient.setAccessToken(null);

      setAuthState({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        loading: false,
      });

      // Redirecionar para home com erro
      router.push("/?error=invalid_token");
    }
  };

  const logout = () => {
    localStorage.removeItem("spotify_access_token");
    apiClient.setAccessToken(null);
    setAuthState({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      loading: false,
    });

    // Chama o endpoint de logout no backend
    apiClient.logout().catch(console.error);
    router.push("/");
  };

  const refreshUser = async () => {
    if (!authState.accessToken) return;

    try {
      const response = await apiClient.getCurrentUser();
      if (response.success && response.data) {
        setAuthState((prev) => ({
          ...prev,
          user: response.data!,
        }));
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        refreshUser,
        handleCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
