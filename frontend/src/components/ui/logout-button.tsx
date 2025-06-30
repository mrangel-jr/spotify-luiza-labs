"use client";

import { useAuth } from "@/providers/auth-provider";
import { Button } from "./button";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button
      onClick={logout}
      className="font-bold py-3 px-8 rounded-full transition-colors focus:outline-none focus:ring-2  font-primary transform hover:scale-105 active:scale-95"
      aria-label="Sair da conta"
      type="button"
    >
      Sair
    </Button>
  );
}
