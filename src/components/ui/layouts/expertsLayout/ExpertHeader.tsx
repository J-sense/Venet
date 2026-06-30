import { Bell, Settings } from "lucide-react";

interface ExpertHeaderProps {
  title?: string;
  subtitle?: string;
  userName?: string;
  userRole?: string;
  avatarUrl?: string;
}

export default function ExpertHeader({
  title = "Expert Dashboard",
  subtitle = "Welcome back",
  userName = "Dr. Sarah Mitchell",
  userRole = "Wellness Expert",
  avatarUrl,
}: ExpertHeaderProps) {
  return (
    <header className="bg-zinc-950 border-b border-white/10 px-6 py-5 flex items-center justify-between">
      {/* Left: Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-zinc-400 text-sm mt-0.5">
          {subtitle}, <span className="text-white font-medium">{userName}</span>
        </p>
      </div>

      {/* Right: Actions + Avatar */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-3 hover:bg-white/5 rounded-xl transition-colors relative">
          <Bell className="w-5 h-5 text-zinc-400" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
        </button>

        {/* Settings */}
        <button className="p-3 hover:bg-white/5 rounded-xl transition-colors">
          <Settings className="w-5 h-5 text-zinc-400" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{userName}</p>
            <p className="text-xs text-zinc-500 -mt-0.5">{userRole}</p>
          </div>

          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/20">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl">
                👩‍⚕️
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
