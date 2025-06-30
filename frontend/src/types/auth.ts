import { User } from "./api";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  loading: boolean;
}

export interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  handleCallback: (tokens: string) => Promise<void>;
}
