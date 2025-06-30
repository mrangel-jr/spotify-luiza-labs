export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ed760] mb-4"></div>
      <p className="text-white font-['Spotify_Mix']">Carregando...</p>
    </div>
  );
}
