"use client";

import { SidebarMenuItem } from "./sidebar-menu-item";

export function SidebarNavigation() {
  const menuItems = [
    {
      to: "/dashboard",
      icon: "home",
      label: "Home",
    },
    {
      to: "/dashboard/artistas",
      icon: "music",
      label: "Artistas",
    },
    {
      to: "/dashboard/playlists",
      icon: "play",
      label: "Playlists",
    },
    {
      to: "/dashboard/perfil",
      icon: "user",
      label: "Perfil",
    },
  ];

  return (
    <nav>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <SidebarMenuItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </ul>
    </nav>
  );
}
