import { Menu, Bell } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { UserSidebar } from "./UserSidebar";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { useMyProfileQuery } from "@/redux/features/auth/auth.api";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { ProfileDropdown } from "@/components/ui/layouts/ProfileDropdown";

type UserLayoutProps = {
  navItems: any[];
  user?: any;
};

const getHeaderContent = (pathname: string) => {
  if (pathname.includes("/program")) {
    return {
      title: "Program Details",
      subtitle: "Track your progress and milestones",
    };
  } else if (pathname.includes("/certificates")) {
    return {
      title: "My Certificates",
      subtitle: "View and download your earned certificates",
    };
  } else if (
    pathname.includes("/talent-portal") ||
    pathname.includes("/manual-input")
  ) {
    return {
      title: "Talent Portal",
      subtitle: "Manage your resume and career opportunities",
    };
  } else if (pathname.includes("/settings")) {
    return {
      title: "Settings",
      subtitle: "Manage your account and preferences",
    };
  } else if (pathname.includes("/consultation")) {
    return { title: "Consultations", subtitle: "Manage your expert sessions" };
  } else {
    return {
      title: "User Dashboard",
      subtitle: "Welcome back to your learning journey!",
    };
  }
};

const SIDEBAR_WIDTH = 260;
const DESKTOP_BREAKPOINT = 1024; // lg

const UserLayout = ({ navItems, user }: UserLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => window.innerWidth >= DESKTOP_BREAKPOINT,
  );
  const isDesktop = () => window.innerWidth >= DESKTOP_BREAKPOINT;

  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const headerContent = getHeaderContent(location.pathname);

  const { data: myProfile } = useMyProfileQuery(undefined);
  console.log(myProfile);
  const userFromRedux = useAppSelector(selectCurrentUser);
  const userData = myProfile?.data || user?.data || userFromRedux;

  // Sync sidebar state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(isDesktop());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  // On desktop, nav-link clicks should NOT close the sidebar
  const handleSidebarClose = () => {
    if (!isDesktop()) setIsSidebarOpen(false);
  };

  // On small/medium screens the sidebar is an overlay — content does NOT shift
  // On large screens the sidebar pushes content via margin
  const isOverlay = !isDesktop();

  return (
    <div className="flex min-h-screen w-full bg-black text-white">
      {/* Dark backdrop — only on small/medium screens when sidebar open */}
      {isSidebarOpen && isOverlay && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={handleSidebarClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <UserSidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
        navItems={navItems}
      />

      {/* Main Content — shifts right on desktop when sidebar is open */}
      <div
        className="flex flex-col flex-1 min-w-0 transition-all duration-300"
        style={{ marginLeft: isSidebarOpen && !isOverlay ? SIDEBAR_WIDTH : 0 }}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-20 h-16 md:h-20 bg-black border-b border-zinc-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
          {/* Left: Toggle + Title */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-zinc-800 rounded-xl transition-colors shrink-0"
              aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <div className="flex flex-col min-w-0">
              <h1 className="text-white text-base sm:text-lg md:text-xl font-bold tracking-tight truncate">
                {headerContent.title}
              </h1>
              <p className="text-[#94A3B8] text-xs hidden sm:block truncate">
                {headerContent.subtitle}
              </p>
            </div>
          </div>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full border border-black" />
            </button>
            {userData ? (
              <ProfileDropdown user={userData} isDashboard={true} />
            ) : (
              <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
            )}
          </div>
        </header>

        <main
          ref={mainRef}
          className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#000000]"
        >
          <ScrollToTop scrollRef={mainRef} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
