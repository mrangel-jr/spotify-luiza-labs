// app/callback/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "../lib/api-client";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      setStatus("error");
      setMessage(`Erro de autenticação: ${error}`);
      return;
    }

    if (token) {
      localStorage.setItem("spotify_access_token", token);
      apiClient.setAccessToken(token);
      setStatus("success");
      setMessage("Login realizado com sucesso!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      setStatus("error");
      setMessage("Nenhum token recebido");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center text-white">
        {status === "loading" && (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1ed760] mx-auto mb-4"></div>
            <div>Processando login...</div>
          </div>
        )}
        {status === "success" && (
          <div>
            <div className="text-[#1ed760] text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold mb-2">{message}</h1>
            <p className="text-gray-400">Redirecionando para dashboard...</p>
          </div>
        )}
        {status === "error" && (
          <div>
            <div className="text-red-500 text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold mb-2">Erro no login</h1>
            <p className="text-gray-400 mb-4">{message}</p>
            <button
              onClick={() => router.push("/")}
              className="bg-[#1ed760] hover:bg-green-600 text-white px-6 py-2 rounded-full"
            >
              Tentar novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
