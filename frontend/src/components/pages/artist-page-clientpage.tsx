"use client";

import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/providers/auth-provider";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Album {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  release_date: string;
  total_tracks: number;
  album_type: string;
}

export default function ArtistPageClient() {
  const { isAuthenticated } = useAuth();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [artistName, setArtistName] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = useCallback(async () => {
    try {
      const artistId = params.id;
      const artistNameFromUrl = new URLSearchParams(window.location.search).get(
        "artistName"
      );
      setArtistName(artistNameFromUrl);
      if (!artistId) {
        setError("Artista não encontrado.");
        setIsLoading(false);
        return;
      }
      const albumResponse = await apiClient.getSavedAlbums(
        artistId as string,
        50
      );
      if (albumResponse.success && albumResponse.data) {
        setAlbums(albumResponse.data.items || []);
      } else {
        setError("Erro ao carregar os álbuns do artista.");
      }
    } catch (err) {
      setError("Erro ao carregar os álbuns do artista.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* Conteúdo principal */}
        <main className="flex-1">
          {/* Header do artista com botão voltar */}
          <div className="bg-gradient-to-b from-gray-800 to-black p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleBack()}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  title="Voltar"
                  aria-label="Voltar"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">
                  {artistName || "Carregando..."}
                </h1>
              </div>
            </div>
          </div>

          {/* Lista de álbuns */}
          <div className="p-6">
            {error && (
              <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {albums.length > 0 ? (
                  albums.map((album) => (
                    <div
                      key={album.id}
                      className="flex items-center space-x-4 p-4 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer group"
                    >
                      {/* Imagem do álbum */}
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={album.images[0].url}
                          alt={album.name}
                          className="w-full h-full rounded-lg object-cover"
                        />
                      </div>

                      {/* Informações do álbum */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate group-hover:text-green-400 transition-colors">
                          {album.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {formatReleaseDate(album.release_date)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400">
                      Nenhum álbum encontrado para este artista.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z" />
  </svg>
);
