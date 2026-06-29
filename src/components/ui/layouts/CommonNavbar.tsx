import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { AssessmentModal } from "@/components/assessment/AssessmentModal";

export const CommonNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false); // Desktop hover
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false); // Mobile accordion

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
          <Link to="/" className="flex items-center flex-shrink-0 ">
            <img
              src="/VNetLogo.png"
              alt="VNET Logo"
              className="w-32 h-9 sm:w-40 sm:h-11 md:w-60 md:h-16 object-cover rounded-full border border-zinc-800 transition-all duration-300"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkStyles}>
              Home
            </NavLink>

            {/* Programs Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
            >
              <button className="flex items-center gap-1 font-inter text-base font-medium leading-6 text-gray-300 hover:text-white transition-colors">
                Programs
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${programsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-[#0B0F19] border border-white/10 rounded-xl py-3 px-2 shadow-xl w-64">
                  <Link
                    to="/programs/health-fitness"
                    className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-gray-300 hover:text-white transition-colors"
                  >
                    Health & Fitness
                  </Link>
                  <Link
                    to="/programs/mental-health"
                    className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-gray-300 hover:text-white transition-colors"
                  >
                    Mental Health
                  </Link>
                  <Link
                    to="/programs/education-service"
                    className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-gray-300 hover:text-white transition-colors"
                  >
                    Education Service
                  </Link>
                  <Link
                    to="/programs/career"
                    className="block px-4 py-2.5 hover:bg-white/5 rounded-lg text-gray-300 hover:text-white transition-colors"
                  >
                    Career
                  </Link>
                </div>
              </div>
            </div>

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
                className="px-[32px] py-[12px] rounded-full text-sm font-medium text-[#0A66C2] border border-[#0A66C2] bg-transparent hover:bg-white/5 transition-colors"
              >
                Log In
              </Link>
              <button
                onClick={() => setIsAssessmentOpen(true)}
                className="bg-[#007AFF] text-white px-[32px] py-[12px] rounded-full font-bold"
              >
                Start Free
              </button>
            </div>

            <AssessmentModal
              isOpen={isAssessmentOpen}
              onClose={() => setIsAssessmentOpen(false)}
            />

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

      {/* MOBILE DRAWER */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full h-[calc(100vh-80px)] overflow-y-auto px-6 py-10 flex flex-col justify-between transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] origin-top ${
          mobileMenuOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible pointer-events-none"
        }`}
        style={{
          background: "linear-gradient(180deg, rgba(11,15,25,0.98) 0%, rgba(3,3,3,0.98) 100%)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex flex-col gap-8 mt-4">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) => `text-3xl font-extrabold tracking-tight transition-all duration-300 ${isActive ? "text-[#007AFF] pl-2 border-l-4 border-[#007AFF]" : "text-gray-200 hover:text-white"}`}
          >
            Home
          </NavLink>

          {/* Mobile Programs Accordion */}
          <div className="flex flex-col">
            <button
              onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
              className={`flex items-center justify-between w-full text-left text-3xl font-extrabold tracking-tight transition-all duration-300 ${mobileProgramsOpen ? "text-white" : "text-gray-200 hover:text-white"}`}
            >
              Programs
              <ChevronDown
                className={`w-8 h-8 transition-transform duration-300 ${mobileProgramsOpen ? "rotate-180 text-[#007AFF]" : ""}`}
              />
            </button>
            <div
              className={`flex flex-col gap-5 overflow-hidden transition-all duration-500 ease-in-out ${
                mobileProgramsOpen ? "max-h-[400px] mt-6 opacity-100" : "max-h-0 mt-0 opacity-0"
              }`}
            >
              <Link
                to="/programs/health-fitness"
                onClick={() => setMobileMenuOpen(false)}
                className="pl-4 text-xl text-gray-400 font-medium hover:text-[#007AFF] hover:translate-x-2 transition-all duration-300"
              >
                Health & Fitness
              </Link>
              <Link
                to="/programs/mental-health"
                onClick={() => setMobileMenuOpen(false)}
                className="pl-4 text-xl text-gray-400 font-medium hover:text-[#007AFF] hover:translate-x-2 transition-all duration-300"
              >
                Mental Health
              </Link>
              <Link
                to="/programs/education-service"
                onClick={() => setMobileMenuOpen(false)}
                className="pl-4 text-xl text-gray-400 font-medium hover:text-[#007AFF] hover:translate-x-2 transition-all duration-300"
              >
                Education Service
              </Link>
              <Link
                to="/programs/career"
                onClick={() => setMobileMenuOpen(false)}
                className="pl-4 text-xl text-gray-400 font-medium hover:text-[#007AFF] hover:translate-x-2 transition-all duration-300"
              >
                Career
              </Link>
            </div>
          </div>

          <NavLink
            to="/experts"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) => `text-3xl font-extrabold tracking-tight transition-all duration-300 ${isActive ? "text-[#007AFF] pl-2 border-l-4 border-[#007AFF]" : "text-gray-200 hover:text-white"}`}
          >
            Experts
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) => `text-3xl font-extrabold tracking-tight transition-all duration-300 ${isActive ? "text-[#007AFF] pl-2 border-l-4 border-[#007AFF]" : "text-gray-200 hover:text-white"}`}
          >
            About us
          </NavLink>
        </div>

        {/* Mobile Call to Actions */}
        <div className="flex flex-col gap-4 mt-12 pb-10">
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center px-8 py-4 rounded-full text-lg font-bold text-[#007AFF] border-2 border-[#007AFF] bg-transparent hover:bg-[#007AFF]/10 active:scale-95 transition-all duration-300"
          >
            Log In
          </Link>
          <button
            onClick={() => {
              setIsAssessmentOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full text-center px-8 py-4 rounded-full text-lg font-bold text-white bg-[#007AFF] hover:bg-[#0066FF] shadow-[0_0_20px_rgba(0,122,255,0.4)] active:scale-95 transition-all duration-300"
          >
            Start Free
          </button>
        </div>
      </div>
    </header>
  );
};
