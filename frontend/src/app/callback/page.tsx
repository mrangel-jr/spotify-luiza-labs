"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function CallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter(); // Corrigido: usar useRouter de next/navigation
  const { handleCallback } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Corrigido: buscar 'code' e 'state' em vez de 'token'
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");

        if (error) {
          alert(`Erro na autenticação: ${error}`);
          router.push("/?error=" + error);
          return;
        }

        // Verificar se o code está presente
        if (!code) {
          alert("Erro: código de autorização não encontrado");
          router.push("/?error=no_code");
          return;
        }

        if (!state) {
          alert("Erro: state não encontrado");
          router.push("/?error=no_state");
          return;
        }

        // Enviar code e state para o backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/callback`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ code, state }),
          }
        );

        if (!response.ok) {
          throw new Error(`Erro na resposta: ${response.status}`);
        }

        const data = await response.json();

        // Agora sim, usar o token retornado pelo backend
        await handleCallback(data.access_token || data.token);
      } catch (error) {
        console.error("Erro no processamento:", error);
        alert("Erro no processamento: " + (error as Error).message);
        router.push("/?error=callback_failed");
      }
    };

    processCallback();
  }, [searchParams, handleCallback, router]);

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
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white">Carregando...</div>
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}
