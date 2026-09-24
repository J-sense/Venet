import { StartFreeButton } from "@/components/assessment";
import { AgreementModal } from "@/pages/Auth/components/AgreementModal";
import { baseApi } from "@/redux/baseApi";
import { useMyProfileQuery } from "@/redux/features/auth/auth.api";
import {
  logout,
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useGetAllCartItemsQuery } from "@/redux/features/cart/cart.api";
import { selectCartCount } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ChevronDown, LogOut, Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "sonner";
import { ProfileDropdown } from "./ProfileDropdown";
export const CommonNavbar = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false); // Desktop hover
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false); // Mobile accordion
  // const submitted = localStorage.getItem(GUEST_ASSESSMENT_COMPLETED_KEY);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userFromRedux = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const reduxCartCount = useAppSelector(selectCartCount);
  const { data: getAllCart } = useGetAllCartItemsQuery(undefined, {
    skip: !token,
  });
  const displayCartCount = token
    ? (getAllCart?.data?.items?.length ?? 0)
    : reduxCartCount;

  const { data: myProfile } = useMyProfileQuery(undefined);
  const userProfile = myProfile?.data || userFromRedux;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMobileLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    setMobileMenuOpen(false);
    toast.success("Logged out successfully");
  };

  const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `font-inter text-base font-medium leading-6 transition-colors ${isActive ? "text-[#3B82F6]" : "text-gray-300 hover:text-white"
    }`;

  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 sm:h-20 z-50 w-full text-white transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0, 0, 0, 0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
        borderBottom: scrolled ? "0.5px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full gap-2 sm:gap-4 md:gap-8">

          {/* Logo - Fluid Sizing across device sizes */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="/VNetLogo.png"
              alt="VNET Logo"
              className="w-28 h-8 sm:w-36 sm:h-10 md:w-44 md:h-12 lg:w-52 lg:h-14 object-cover rounded-full border border-zinc-800 transition-all duration-300 hover:border-blue-500/40"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            <NavLink to="/" className={navLinkStyles}>
              Home
            </NavLink>

            {/* Programs Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
            >
              <button className="flex items-center gap-1 font-inter text-sm xl:text-base font-medium leading-6 text-gray-300 hover:text-white transition-colors cursor-pointer">
                Programs
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${programsOpen ? "rotate-180 text-blue-400" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-[#0B0F19]/95 backdrop-blur-2xl border border-white/10 rounded-2xl py-2 px-2 shadow-2xl w-64 animate-in fade-in zoom-in-95 duration-150">
                  <Link
                    to="/programs/health-fitness"
                    className="block px-4 py-2.5 hover:bg-white/10 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Health & Fitness
                  </Link>
                  <Link
                    to="/programs/mental-health"
                    className="block px-4 py-2.5 hover:bg-white/10 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Mental Health
                  </Link>
                  <Link
                    to="/programs/education-service"
                    className="block px-4 py-2.5 hover:bg-white/10 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Education Service
                  </Link>
                  <Link
                    to="/programs/career"
                    className="block px-4 py-2.5 hover:bg-white/10 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Career
                  </Link>
                </div>
              </div>
            </div>

            <NavLink to="/talent-portal" className={navLinkStyles}>
              Talent Portal
            </NavLink>
            <NavLink to="/experts" className={navLinkStyles}>
              Experts
            </NavLink>
            <NavLink to="/about" className={navLinkStyles}>
              About us
            </NavLink>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3.5">

            {/* Shopping Cart Button */}
            <Link
              to="/shopping-cart"
              className="group relative p-[1.5px] rounded-full bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-cyan-400/40 hover:from-blue-400 hover:via-cyan-400 hover:to-indigo-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,122,255,0.2)] hover:shadow-[0_0_25px_rgba(0,122,255,0.5)] active:scale-95 flex items-center justify-center shrink-0"
              title="View Cart"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0B0F19]/90 hover:bg-[#0E1526] backdrop-blur-xl flex items-center justify-center relative overflow-hidden transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ShoppingBag className="relative z-10 w-4 h-4 sm:w-4.5 sm:h-4.5 text-cyan-400 group-hover:text-white group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
              </div>

              {displayCartCount > 0 && (
                <span className="absolute -top-1 -right-1 z-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white text-[10px] font-extrabold min-w-[18px] h-4.5 px-1 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,198,255,0.8)] ring-2 ring-[#0B0F19]">
                  {displayCartCount}
                </span>
              )}
            </Link>

            {/* Desktop Quick Actions */}
            <div className="hidden sm:flex items-center gap-2 lg:gap-3">
              {userProfile ? (
                <>
                  <ProfileDropdown user={userProfile} />
                  <StartFreeButton
                    text="Start Free"
                    className="px-3.5 py-2 lg:px-5 lg:py-2.5 text-xs lg:text-sm font-bold shadow-[0_0_15px_rgba(0,122,255,0.3)]"
                  />
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsAgreementModalOpen(true)}
                    className="hidden md:inline-flex px-3.5 py-2 lg:px-5 lg:py-2.5 rounded-full text-xs lg:text-sm font-semibold text-white/90 border border-white/20 bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer shrink-0"
                  >
                    Join as Expert
                  </button>
                  <Link
                    to="/auth/login"
                    className="px-3.5 py-2 lg:px-6 lg:py-2.5 rounded-full text-xs lg:text-sm font-semibold text-[#3B82F6] border border-[#3B82F6]/70 bg-blue-500/5 hover:bg-blue-500/10 transition-colors shrink-0"
                  >
                    Log In
                  </Link>
                  <StartFreeButton
                    text="Start Free"
                    className="px-3.5 py-2 lg:px-6 lg:py-2.5 text-xs lg:text-sm font-bold shadow-[0_0_15px_rgba(0,122,255,0.3)] shrink-0"
                  />
                </>
              )}
            </div>

            <AgreementModal
              isOpen={isAgreementModalOpen}
              onClose={() => setIsAgreementModalOpen(false)}
              onAccept={() => {
                setIsAgreementModalOpen(false);
                navigate("/auth/experts-register");
              }}
            />

            {/* Mobile / Tablet Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ULTRA-RESPONSIVE MOBILE / TABLET DRAWER */}
      <div
        className={`lg:hidden fixed top-16 sm:top-20 left-0 w-full h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-5rem)] overflow-y-auto px-5 sm:px-8 py-6 sm:py-8 flex flex-col justify-between transition-all duration-300 ease-out origin-top ${mobileMenuOpen
          ? "opacity-100 scale-y-100 visible"
          : "opacity-0 scale-y-95 invisible pointer-events-none"
          }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(11,15,25,0.98) 0%, rgba(5,7,12,0.99) 100%)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex flex-col gap-6 sm:gap-7">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `text-xl sm:text-2xl font-extrabold tracking-tight transition-all duration-200 ${isActive ? "text-[#3B82F6] pl-3 border-l-4 border-[#3B82F6]" : "text-gray-200 hover:text-white"}`
            }
          >
            Home
          </NavLink>

          {/* Mobile Programs Accordion */}
          <div className="flex flex-col">
            <button
              onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
              className={`flex items-center justify-between w-full text-left text-xl sm:text-2xl font-extrabold tracking-tight transition-all duration-200 cursor-pointer ${mobileProgramsOpen ? "text-white" : "text-gray-200 hover:text-white"}`}
            >
              <span>Programs</span>
              <ChevronDown
                className={`w-6 h-6 transition-transform duration-200 ${mobileProgramsOpen ? "rotate-180 text-[#3B82F6]" : "text-gray-400"}`}
              />
            </button>
            <div
              className={`flex flex-col gap-3.5 overflow-hidden transition-all duration-300 ease-in-out ${mobileProgramsOpen
                ? "max-h-[300px] mt-4 opacity-100"
                : "max-h-0 mt-0 opacity-0"
                }`}
            >
              <Link
                to="/programs/health-fitness"
                onClick={() => setMobileMenuOpen(false)}
                className="pl-4 text-base text-gray-400 font-medium hover:text-[#3B82F6] hover:translate-x-1 transition-all duration-200"
              >
                Health & Fitness
              </Link>
              <Link
                to="/programs/mental-health"
                onClick={() => setMobileMenuOpen(false)}
                className="pl-4 text-base text-gray-400 font-medium hover:text-[#3B82F6] hover:translate-x-1 transition-all duration-200"
              >
                Mental Health
              </Link>
              <Link
                to="/programs/education-service"
                onClick={() => setMobileMenuOpen(false)}
                className="pl-4 text-base text-gray-400 font-medium hover:text-[#3B82F6] hover:translate-x-1 transition-all duration-200"
              >
                Education Service
              </Link>
              <Link
                to="/programs/career"
                onClick={() => setMobileMenuOpen(false)}
                className="pl-4 text-base text-gray-400 font-medium hover:text-[#3B82F6] hover:translate-x-1 transition-all duration-200"
              >
                Career
              </Link>
            </div>
          </div>

          <NavLink
            to="/talent-portal"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `text-xl sm:text-2xl font-extrabold tracking-tight transition-all duration-200 ${isActive ? "text-[#3B82F6] pl-3 border-l-4 border-[#3B82F6]" : "text-gray-200 hover:text-white"}`
            }
          >
            Talent Portal
          </NavLink>
          <NavLink
            to="/experts"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `text-xl sm:text-2xl font-extrabold tracking-tight transition-all duration-200 ${isActive ? "text-[#3B82F6] pl-3 border-l-4 border-[#3B82F6]" : "text-gray-200 hover:text-white"}`
            }
          >
            Experts
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `text-xl sm:text-2xl font-extrabold tracking-tight transition-all duration-200 ${isActive ? "text-[#3B82F6] pl-3 border-l-4 border-[#3B82F6]" : "text-gray-200 hover:text-white"}`
            }
          >
            About us
          </NavLink>

          <NavLink
            to="/shopping-cart"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `text-xl sm:text-2xl font-extrabold tracking-tight transition-all duration-200 flex items-center justify-between ${isActive ? "text-[#3B82F6] pl-3 border-l-4 border-[#3B82F6]" : "text-gray-200 hover:text-white"}`
            }
          >
            <span className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span>Cart</span>
            </span>
            {displayCartCount > 0 && (
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {displayCartCount} {displayCartCount === 1 ? "Item" : "Items"}
              </span>
            )}
          </NavLink>
        </div>

        {/* Mobile Call to Actions */}
        <div className="flex flex-col gap-3.5 mt-8 pb-8 border-t border-white/10 pt-6">
          {userProfile ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#141824] border border-white/10">
                {userProfile.image ? (
                  <img
                    src={userProfile.image}
                    alt={userProfile.first_name}
                    className="w-10 h-10 rounded-full object-cover border border-blue-500/40"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {(userProfile.first_name?.[0] || "U").toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-white font-bold text-sm truncate">
                    {userProfile.first_name} {userProfile.last_name}
                  </span>
                  <span className="text-xs text-gray-400 truncate">
                    {userProfile.email}
                  </span>
                </div>
              </div>
              <Link
                to={
                  userProfile.role?.toUpperCase() === "EXPERT"
                    ? "/dashboard/experts"
                    : "/dashboard/user"
                }
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-6 py-3.5 rounded-full text-base font-bold text-white bg-[#3B82F6] hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={handleMobileLogout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-base font-bold text-red-400 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-colors cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAgreementModalOpen(true);
                }}
                className="w-full text-center px-6 py-3.5 rounded-full text-base font-bold text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                Join as Expert
              </button>
              <Link
                to="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-6 py-3.5 rounded-full text-base font-bold text-[#3B82F6] border-2 border-[#3B82F6] bg-transparent hover:bg-blue-500/10 transition-all duration-200"
              >
                Log In
              </Link>
              <StartFreeButton
                text="Start Free"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full px-6 py-3.5 text-base font-bold shadow-[0_0_20px_rgba(0,122,255,0.4)]"
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
