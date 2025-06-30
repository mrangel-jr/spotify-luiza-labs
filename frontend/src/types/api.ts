export interface User {
  id: string;
  display_name: string;
  email: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  followers: {
    total: number;
  };
  country: string;
}

export interface ItemResponse<T> {
  href: string;
  items: T;
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface Artist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  followers: {
    total: number;
  };
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  external_urls: {
    spotify: string;
  };
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  public: boolean;
  collaborative: boolean;
  followers: {
    total: number;
  };
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  tracks: {
    total: number;
  };
  external_urls: {
    spotify: string;
  };
}

export interface Album {
  id: string;
  name: string;
  album_type: string;
  artists: Array<{
    id: string;
    name: string;
  }>;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  release_date: string;
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  auth_url?: string;
  user?: User;
  access_token?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
