"use client";

import { useAuth } from "@/providers/auth-provider";
import { useEffect, useState } from "react";
import { apiClient } from "../../lib/api-client";
import { Playlist } from "../../types/api";
import { CreatePlaylistButton } from "../ui/create-playlist-button";
import { CreatePlaylistModal } from "../ui/create-playlist-modal";
import { PageHeader } from "../ui/page-header";

export function PlaylistsContent() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    try {
      const response = await apiClient.getUserPlaylists(50);
      if (response.success && response.data) {
        setPlaylists(response.data.items || []);
      }
    } catch (error) {
      console.error("Error loading playlists:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlaylist = async (name: string) => {
    try {
      const response = await apiClient.createPlaylist(name, user!.id);
      if (response.success && response.data) {
        setPlaylists((prev) => [...prev, response.data!]);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
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
      <div className="flex justify-between items-start mb-8">
        <PageHeader
          name="Minhas playlists"
          description="Sua coleção pessoal de playlists"
        />
        <CreatePlaylistButton onClick={() => setShowModal(true)} />
      </div>

      {showModal && (
        <CreatePlaylistModal
          onClose={() => setShowModal(false)}
          isOpen={showModal}
          onCreatePlaylist={handleCreatePlaylist}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors"
          >
            {playlist.images?.[0] && (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                className="w-full aspect-square object-cover rounded-lg mb-3"
              />
            )}
            <h3 className="font-semibold text-lg mb-1">{playlist.name}</h3>
            {playlist.description && (
              <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                {playlist.description}
              </p>
            )}
            <p className="text-sm text-gray-400">
              {playlist.tracks?.total || 0} músicas •{" "}
              {playlist.public ? "Pública" : "Privada"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
