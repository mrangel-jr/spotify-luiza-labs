"use client";

import { Button } from "./button";

export function CreatePlaylistButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      className="bg-[#1ed760] hover:bg-green-600 font-bold py-3 px-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 font-primary transform hover:scale-105 active:scale-95"
      aria-label="Criar nova playlist"
      type="button"
    >
      Criar playlist
    </Button>
  );
}
