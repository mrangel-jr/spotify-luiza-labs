"use client";

import { useState } from "react";
import { Button } from "./button";
import { CloseIcon } from "./close-icon";
import { Modal } from "./modal";

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePlaylist: (name: string) => void;
}

export function CreatePlaylistModal({
  isOpen,
  onClose,
  onCreatePlaylist,
}: CreatePlaylistModalProps) {
  const [playlistName, setPlaylistName] = useState("Minha playlist #1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playlistName.trim()) {
      onCreatePlaylist(playlistName.trim());
      onClose();
      setPlaylistName("Minha playlist #1"); // Reset para próxima vez
    }
  };

  const handleClose = () => {
    onClose();
    setPlaylistName("Minha playlist #1"); // Reset quando fechar
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-8 h-[346px] flex flex-col justify-between">
        {/* Header com botão fechar */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-300 transition-colors p-1"
            aria-label="Fechar modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Título */}
            <h2 className="text-white text-2xl font-semibold text-center font-primary">
              Dê um nome a sua playlist
            </h2>

            {/* Input */}
            <div className="space-y-4">
              <input
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                className="w-full bg-transparent border-b-2 border-gray-500 text-white text-lg px-0 py-2 focus:outline-none focus:border-[#1ed760] font-primary placeholder-gray-400"
                placeholder="Minha playlist #1"
                autoFocus
                maxLength={100}
              />
            </div>

            {/* Botão Criar */}
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={!playlistName.trim()}
              >
                Criar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
