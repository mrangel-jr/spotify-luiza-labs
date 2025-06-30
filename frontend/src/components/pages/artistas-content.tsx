"use client";

import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Artist } from "../../types/api";
import { PageHeader } from "../ui/page-header";

export function ArtistasContent() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = useCallback(async () => {
    try {
      const responseRes = await apiClient.getTopArtists(20);
      if (responseRes.success && responseRes.data) {
        setArtists(responseRes.data.items || []);
      }
    } catch (error) {
      console.error("Error loading artists:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleArtistClick = (artistId: string, artistName: string) => {
    router.push(
      `/dashboard/artistas/${artistId}?artistName=${encodeURIComponent(
        artistName
      )}`
    );
  };

  const handleAlbumClick = (artistId: string, artistName: string) => {
    handleArtistClick(artistId, artistName);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ed760]"></div>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <PageHeader
        name="Top Artistas"
        description="Aqui você encontra seus artistas preferidos"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors"
            onClick={() => handleAlbumClick(artist.id, artist.name)}
          >
            {artist.images?.[0] && (
              <img
                src={artist.images[0].url}
                alt={artist.name}
                className="w-full aspect-square object-cover rounded-lg mb-3"
              />
            )}
            <h3 className="font-semibold text-lg mb-1">{artist.name}</h3>
            <p className="text-sm text-gray-400 mb-2">
              {artist.followers.total.toLocaleString()} seguidores
            </p>
            <div className="flex flex-wrap gap-1">
              {artist.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="text-xs bg-gray-700 px-2 py-1 rounded"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
