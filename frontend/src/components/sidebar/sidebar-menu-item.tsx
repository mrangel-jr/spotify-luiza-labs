"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarIcon } from "../ui/sidebar-icon";

interface SidebarMenuItemProps {
  to: string;
  icon: string;
  label: string;
}

export function SidebarMenuItem({ to, icon, label }: SidebarMenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <li>
      <Link
        href={to}
        className={`flex items-center gap-x-4 py-2 px-4 text-lg rounded-md transition-colors duration-200 font-secondary ${
          isActive
            ? "text-white font-medium"
            : "text-sidebar-inactive hover:text-white"
        }`}
      >
        <SidebarIcon type={icon} isActive={isActive} />
        <span>{label}</span>
      </Link>
    </li>
  );
}
