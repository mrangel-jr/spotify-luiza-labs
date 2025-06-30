"use client";

import { useAuth } from "@/providers/auth-provider";
import { LoginButton } from "./ui/login-button";
import { LoginPrompt } from "./ui/login-prompt";

export function LoginSection() {
  const { login } = useAuth();

  return (
    <>
      <LoginPrompt />
      <LoginButton onClick={login} />
    </>
  );
}
