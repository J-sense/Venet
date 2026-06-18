import { Link, useLocation } from "react-router";
import { LogOut, Settings } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { MenuItemsType } from "../../navitems";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: MenuItemsType[];
}

export function ExpertsSidebar({ isOpen, onClose, navItems }: SidebarProps) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/auth/login";
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`bg-[#FFFFFF] border-r border-[#E8DED0] fixed top-0 left-0 z-40 flex h-screen w-[260px] flex-col overflow-hidden
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo Section */}
        <Link to={"/"} className="h-32 w-44">
          <img src="/logo.png" alt="Roomify" className="" />
        </Link>

        {/* Navigation */}
        <nav className="flex-1 px-4 overflow-y-auto scrollbar-hide">
          <div className="mb-2 px-4">
            <p className="text-[#9B8D80] text-[10px] font-bold uppercase tracking-[2px]">
              Main Menu
            </p>
          </div>

          <div className="space-y-2">
            {navItems?.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-4 rounded-2xl px-4 py-3.5
                    text-[15px] font-semibold transition-all duration-300 group
                    ${
                      isActive
                        ? "bg-[#3D2817] text-white shadow-xl shadow-[#3D2817]/20"
                        : "text-primaryText hover:bg-[#FAF8F6] hover:text-[#3D2817]"
                    }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-[#C9955F]"
                        : "text-[#9B8D80] group-hover:text-[#3D2817]"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Actions / Logout */}
        <div className="p-4 mt-auto border-t border-[#FAF8F6] space-y-2">
          {/* Settings Link */}
          <Link
            to="/admin/settings"
            className={`flex items-center gap-4 rounded-xl px-4 py-3 text-[15px] font-semibold transition-all duration-300
      ${
        location.pathname === "/admin/settings"
          ? "bg-[#FAF8F6] text-[#3D2817]"
          : "text-[#9B8D80] hover:bg-[#FAF8F6] hover:text-[#3D2817]"
      }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>

          {/* Logout Section */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full flex items-center gap-4 rounded-xl px-4 py-3 text-[15px] font-semibold text-[#EF4444] hover:bg-[#FEF2F2] transition-all duration-300">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md bg-[#FDFCFB] border-[#F2EDE8] rounded-4xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-playfair text-[#2C1810]">
                  Confirm Logout
                </DialogTitle>
                <DialogDescription className="text-primaryText">
                  Are you sure you want to log out of your account?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-end gap-3 pt-4">
                <DialogClose asChild>
                  <button className="px-6 py-2.5 rounded-xl border border-[#E8DED0] text-[#9B8D80] hover:bg-[#FAF8F6] transition-colors text-sm font-semibold">
                    Cancel
                  </button>
                </DialogClose>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 rounded-xl bg-[#EF4444] text-white hover:bg-[#DC2626] transition-colors shadow-sm text-sm font-semibold"
                >
                  Log Out
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </aside>
    </>
  );
}
