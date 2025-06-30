import { AuthGuard } from "@/components/auth-guard";
import { LoginSection } from "@/components/login-section";
import SpotifyLogo from "@/components/ui/spotify-logo";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <AuthGuard
        fallback={
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="flex flex-col items-center">
              <SpotifyLogo />
              <LoginSection />
            </div>
          </div>
        }
      />
    </main>
  );
}
