"use client";

import { useAuth } from "@/providers/auth-provider";

export function HomeContent() {
  const { user } = useAuth();

  return (
    <div className="p-8 text-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 font-primary">
          Bem-vindo, {user?.display_name}!
        </h1>
        <p className="text-gray-400 text-lg">
          Aqui está um resumo da sua música
        </p>
      </div>
    </div>
  );
}
