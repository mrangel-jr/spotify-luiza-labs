"use client";

import InstallPWA from "./install-pwa";
import { SidebarNavigation } from "./sidebar-navigation";

export function SidebarContent() {
  return (
    <>
      <SidebarNavigation />
      <div className="mt-auto pt-8">
        <InstallPWA />
      </div>
    </>
  );
}
