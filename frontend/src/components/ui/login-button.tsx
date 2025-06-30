interface LoginButtonProps {
  onClick: () => void;
}

export function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#1ed760] hover:bg-green-600 text-black font-bold py-3 px-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 block mx-auto w-fit font-primary transform hover:scale-105 active:scale-95"
      aria-label="Entrar com conta Spotify"
      type="button"
    >
      Entrar
    </button>
  );
}
