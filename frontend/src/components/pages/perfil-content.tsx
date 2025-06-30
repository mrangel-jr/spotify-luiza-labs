"use client";

import { useAuth } from "@/providers/auth-provider";
import { LogoutButton } from "../ui/logout-button";

export function PerfilContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-full flex items-center justify-center p-8">
      <div className="flex flex-col items-center text-center text-white space-y-6">
        {/* Avatar */}
        {user?.images?.[0] && (
          <img
            src={user.images[0].url}
            alt={user.display_name}
            className="w-32 h-32 rounded-full"
          />
        )}

        {/* Nome */}
        <div>
          <h1 className="text-4xl font-bold mb-2 font-primary">
            {user?.display_name}
          </h1>
          <p className="text-gray-400 text-lg">{user?.email}</p>
        </div>

        {/* Botão de Logout */}
        <LogoutButton />
      </div>
    </div>
  );
}
