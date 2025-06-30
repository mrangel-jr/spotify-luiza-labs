"use client";

import { useEffect, useState } from "react";
import { SidebarIcon } from "../ui/sidebar-icon";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) {
      console.log("PWA já instalado ou não disponível");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("PWA instalado com sucesso");
    } else {
      console.log("Usuário cancelou a instalação");
    }

    setDeferredPrompt(null);
    setShowInstall(false);
  };

  if (!showInstall) {
    return null;
  }

  return (
    <button
      onClick={handleInstallPWA}
      className="flex items-center gap-x-4 text-sidebar-inactive hover:text-white transition-colors duration-200 py-2 px-4 text-lg w-full justify-start font-secondary"
    >
      <SidebarIcon type="download" />
      <span>Instalar PWA</span>
    </button>
  );
}
