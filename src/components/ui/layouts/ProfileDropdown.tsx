import { baseApi } from "@/redux/baseApi";
import { logout, type IUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProfileDropdownProps {
  user: IUser | null | undefined;
  isDashboard?: boolean;
}

export const ProfileDropdown = ({
  user,
  isDashboard,
}: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    localStorage.clear();
    toast.success("Logged out successfully");
    setIsOpen(false);
    navigate("/auth/login");
  };

  if (!user) return null;

  const firstName = user.first_name || "";
  const lastName = user.last_name || "";
  const fullName = `${firstName} ${lastName}`.trim() || user.email || "User";
  const initials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`.toUpperCase()
      : (user.email?.[0] || "U").toUpperCase();

  const isExpert = user.role?.toUpperCase() === "EXPERT";

  const dashboardLabel = isDashboard ? "Home" : "Dashboard";

  const dashboardLink = isDashboard
    ? "/"
    : isExpert
      ? "/dashboard/experts"
      : "/dashboard/user";

  const settingsLink = isExpert
    ? "/dashboard/experts/settings"
    : "/dashboard/user/settings";

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#191C2B] hover:bg-[#23273B] border border-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
          aria-expanded={isOpen}
        >
          {user.image ? (
            <img
              src={user.image}
              alt={fullName}
              className="w-8 h-8 rounded-full object-cover border border-blue-500/30"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {initials}
            </div>
          )}
          <span className="text-sm font-medium text-white max-w-[120px] truncate hidden sm:inline-block">
            {firstName || fullName}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-400" : ""
              }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-[#131722] border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
              {user.image ? (
                <img
                  src={user.image}
                  alt={fullName}
                  className="w-10 h-10 rounded-full object-cover border border-blue-500/40"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                  {initials}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-white truncate">
                  {fullName}
                </span>
                <span className="text-xs text-gray-400 truncate">
                  {user.email}
                </span>
                <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit uppercase">
                  <Shield className="w-2.5 h-2.5" />
                  {user.role || "User"}
                </span>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="py-1">
              <Link
                to={dashboardLink}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{dashboardLabel}</span>
              </Link>

              <Link
                to={settingsLink}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Settings className="w-4 h-4 text-gray-400" />
                <span>Settings</span>
              </Link>
            </div>

            {/* Logout Button */}
            <div className="pt-1 border-t border-white/10">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsLogoutModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <DialogContent className="bg-[#12141D] border-zinc-800 text-white max-w-sm rounded-2xl p-6 shadow-2xl">
          <DialogHeader className="flex flex-col items-center text-center sm:text-center space-y-2">
            <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-400 mb-1">
              <LogOut className="w-6 h-6" />
            </div>
            <DialogTitle className="text-lg font-bold text-white">
              Confirm Logout
            </DialogTitle>
            <DialogDescription className="text-sm text-zinc-400">
              Are you sure you want to log out of your vNXT account?
            </DialogDescription>
          </DialogHeader>



          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 mt-6 sm:justify-center">
            {/* Cancel: dark glass */}
            <Button
              variant="outline"
              onClick={() => setIsLogoutModalOpen(false)}
              className="min-w-28 px-6 py-2 rounded-full text-sm font-medium cursor-pointer select-none
      text-zinc-300 hover:text-white
      bg-gradient-to-b from-zinc-700/70 to-zinc-800/80 hover:from-zinc-600/70 hover:to-zinc-700/80
      border border-zinc-600/50
      shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-3px_6px_rgba(0,0,0,0.35)]
      [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]
      transition-all duration-200 active:scale-[0.97]
      focus-visible:ring-2 focus-visible:ring-zinc-400/60 focus-visible:ring-offset-0"
            >
              Cancel
            </Button>

            {/* Log Out: glossy red */}
            <Button
              onClick={handleConfirmLogout}
              className="min-w-28 px-6 py-2 rounded-full text-sm font-bold cursor-pointer select-none
      flex items-center justify-center gap-2 text-white
      bg-gradient-to-b from-[#F04444] to-[#C21F1F] hover:from-[#F25555] hover:to-[#D12B2B]
      border border-red-400/30
      shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.35),0_4px_15px_rgba(239,68,68,0.3)]
      [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]
      transition-all duration-200 hover:-translate-y-0.5
      active:translate-y-0 active:scale-[0.97]
      active:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(0,0,0,0.35)]
      focus-visible:ring-2 focus-visible:ring-red-300/70 focus-visible:ring-offset-0"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

