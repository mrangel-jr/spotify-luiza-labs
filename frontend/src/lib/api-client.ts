import {
  Album,
  ApiResponse,
  Artist,
  AuthResponse,
  ItemResponse,
  Playlist,
  User,
} from "../types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

class ApiClient {
  private baseURL: string;
  private accessToken: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    };

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error:
            data.message || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  async initiateLogin(): Promise<ApiResponse<{ auth_url: string }>> {
    return this.request<{ auth_url: string }>("/api/login", {
      method: "GET",
    });
  }

  async handleCallback(
    code: string,
    state?: string
  ): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>("/api/callback", {
      method: "POST",
      body: JSON.stringify({ code, state }),
    });
  }

  async logout(): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>("/api/logout", {
      method: "POST",
    });
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>("/api/me");
  }

  async getTopArtists(
    limit = 20,
    timeRange = "medium_term"
  ): Promise<ApiResponse<ItemResponse<Artist[]>>> {
    return this.request<ItemResponse<Artist[]>>(
      `/api/artists/top?limit=${limit}&time_range=${timeRange}`
    );
  }

  async getUserPlaylists(
    limit = 20,
    offset = 0
  ): Promise<ApiResponse<ItemResponse<Playlist[]>>> {
    return this.request<ItemResponse<Playlist[]>>(
      `/api/playlists?limit=${limit}&offset=${offset}`
    );
  }

  async getSavedAlbums(
    id = "",
    limit = 20,
    offset = 0
  ): Promise<ApiResponse<ItemResponse<Album[]>>> {
    return this.request<ItemResponse<Album[]>>(
      `/api/artists/${id}/albums?limit=${limit}&offset=${offset}`
    );
  }

  async createPlaylist(
    name: string,
    user_id: string
  ): Promise<ApiResponse<Playlist>> {
    return this.request<Playlist>("/api/playlists", {
      method: "POST",
      body: JSON.stringify({ name, user_id }),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
