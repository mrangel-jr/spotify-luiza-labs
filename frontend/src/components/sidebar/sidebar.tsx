import SpotifyLogo from "../ui/spotify-logo";
import { SidebarContent } from "./sidebar-content";

export function Sidebar() {
  return (
    <aside className="w-64 bg-black flex flex-col justify-between py-6 px-4 border-r border-gray-800">
      <div>
        <div className="mb-8 pl-2">
          <SpotifyLogo />
        </div>
        <SidebarContent />
      </div>
    </aside>
  );
}
