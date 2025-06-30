"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");

    if (!token) {
      router.push("/login");
      return;
    }

    // OPCIONAL: Verificar se token é válido
    // fetch('/api/verify-token', {
    //   headers: { Authorization: `Bearer ${token}` }
    // }).then(res => {
    //   if (res.ok) {
    //     setIsAuthenticated(true)
    //   } else {
    //     localStorage.removeItem('auth-token')
    //     router.replace('/login')
    //   }
    // })

    setIsAuthenticated(true);
  }, [router]);

  // Mostra loading até verificar
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Se não autenticado, mostra tela vazia (redirecionamento já aconteceu)
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
