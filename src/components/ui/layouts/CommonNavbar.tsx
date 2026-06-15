import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X } from "lucide-react";

export const CommonNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `font-inter text-base font-medium leading-6 transition-colors ${
      isActive ? "text-[#3B82F6]" : "text-gray-300 hover:text-white"
    }`;

  return (
    <header
      className="fixed top-0 left-0 right-0 h-20 z-50 w-full text-white transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0, 0, 0, 0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        borderBottom: scrolled ? "0.5px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full gap-8">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="/VNetLogo.png"
              alt="VNET Logo"
              className="w-48 h-12 md:w-60 md:h-16 object-contain rounded-full border border-zinc-800"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkStyles}>
              Home
            </NavLink>
            <NavLink to="/programs" className={navLinkStyles}>
              Programs
            </NavLink>
            <NavLink to="/experts" className={navLinkStyles}>
              Experts
            </NavLink>
            <NavLink to="/about" className={navLinkStyles}>
              About us
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2 rounded-full text-sm font-medium text-white border border-gray-700/60 bg-transparent hover:bg-white/5 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-full text-sm font-medium text-white bg-[#3B82F6] hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
              >
                Start Free
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-gray-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER: Added for small devices */}
      {mobileMenuOpen && (
        <div
          className="md:hidden absolute top-20 left-0 w-full border-b border-white/10 shadow-2xl px-6 py-8 flex flex-col gap-6"
          style={{
            background: "rgba(11, 15, 25, 0.98)",
            backdropFilter: "blur(20px)",
          }}
        >
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkStyles}
          >
            Home
          </NavLink>
          <NavLink
            to="/programs"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkStyles}
          >
            Programs
          </NavLink>
          <NavLink
            to="/experts"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkStyles}
          >
            Experts
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={navLinkStyles}
          >
            About us
          </NavLink>

          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl border border-gray-700 text-sm font-medium text-gray-300"
            >
              Log In
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 bg-[#3B82F6] rounded-xl text-sm font-medium text-white"
            >
              Start Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
