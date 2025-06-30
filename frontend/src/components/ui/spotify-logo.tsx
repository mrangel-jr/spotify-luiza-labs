import Image from "next/image";

export default function SpotifyLogo() {
  return (
    <div>
      <Image
        src="/spotify-logo.png" // Caminho relativo à pasta `public`
        alt="Logo do Spotify"
        width={150} // Largura original da imagem em pixels
        height={45} // Altura original da imagem em pixels
        priority
        className="mb-4" // Opcional: para carregar a imagem imediatamente (bom para logos no topo da página)
      />
    </div>
  );
}
