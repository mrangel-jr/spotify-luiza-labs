"use client";

import { useAuth } from "@/providers/auth-provider";
import { useSearchParams } from "next/navigation";
import router from "next/router";
import { Suspense, useEffect } from "react";

function CallbackHandler() {
  const searchParams = useSearchParams();
  const { handleCallback } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (error) {
          alert(`Erro na autenticação: ${error}`);
          router.push("/?error=" + error);
          return;
        }

        // Verificar se o token está presente
        if (!token) {
          alert("Erro: token não encontrado");
          router.push("/?error=no_token");
          return;
        }

        // Chamar função simplificada do AuthProvider
        await handleCallback(token);
      } catch (error) {
        alert("Erro no processamento: " + (error as Error).message);
        router.push("/?error=callback_failed");
      }
    };

    processCallback();
  }, [searchParams, handleCallback]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <h2 className="text-white text-xl">Processando autenticação...</h2>
        <p className="text-gray-400 mt-2">
          Aguarde enquanto configuramos sua conta
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Redirecionando para o dashboard...
        </p>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className="text-white">Carregando...</div>}>
      <CallbackHandler />
    </Suspense>
  );
}
