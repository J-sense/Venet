import React from "react";
import { Link } from "react-router";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  isCentered?: boolean;
}

export const AuthLayout = ({
  children,
  title,
  subtitle,
  isCentered = false,
}: AuthLayoutProps) => {
  return (
    <div className="w-full bg-[#080A0E] flex flex-col relative h-screen overflow-hidden">
      {/* Absolute Logo */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
        <Link to="/" className="flex items-center flex-shrink-0 ">
          <img
            src="/VNetLogo.png"
            alt="VNET Logo"
            className="w-32 h-9 sm:w-40 sm:h-11 md:w-56 md:h-16 object-contain transition-all duration-300"
          />
        </Link>
      </div>

      {/* ── Main Content ── */}
      <main className="flex w-full flex-1 h-full">
        {/* LEFT: Hero Panel - Desktop & Tablet */}
        <div className="hidden md:block md:w-[35%] lg:w-1/2 xl:w-[55%] relative overflow-visible bg-[#080A0E]">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_55%_85%_at_0%_40%,#1E40AFCC_0%,#1E3A8A88_35%,transparent_65%)]" />
          {/* Extended gradient to the bottom side */}
          <div className="absolute inset-0 -ml-3xl z-10 bg-gradient-to-b from-[#080A0E] via-[#080A0E]/50 to-transparent h-[45%]" />

          {/* Absolutely positioned image for precise bottom alignment and scaling */}
          <img
            src="/authImg.png"
            alt=""
            aria-hidden="true"
            className="absolute bottom-0 -right-[5%] md:-right-[15%] lg:-right-[10%] xl:-right-[15%] brightness-130 z-20 w-auto object-contain object-right-bottom h-[110%] md:h-[140%] lg:h-[180%] xl:h-[210%] pointer-events-none"
          />
        </div>

        {/* RIGHT: Form Panel */}
        <div
          className={`flex-1 flex ${
            isCentered ? "items-center" : "items-start"
          } justify-center w-full z-30 px-4 py-4 sm:px-6 lg:py-12 overflow-y-auto relative h-full ${
            isCentered ? "pt-12" : "pt-20 md:pt-24 lg:pt-14"
          }`}
        >
          {/* Mobile Full Background (Only visible on small screens) */}
          <div className="md:hidden absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/authImg.png')` }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#080A0E]/85" />
            {/* Strong Blur */}
            <div className="absolute inset-0 backdrop-blur-[60px]" />
          </div>

          <div
            className={`w-full max-w-[400px] md:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px] relative z-10 ${
              isCentered ? "my-auto" : "mt-12 md:mt-16 lg:mt-16"
            }`}
          >
            <div className="relative rounded-3xl sm:rounded-[2rem] bg-[#191C2B] backdrop-blur-3xl border border-white/[0.06] p-6 sm:p-7 lg:px-10 lg:py-8 shadow-[0_16px_60px_-15px_rgba(0,0,0,0.8)]">
              <div className="text-center mb-4 lg:mb-6">
                <h1 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight mb-1 lg:mb-2">
                  {title}
                </h1>
                <p className="text-sm text-gray-400">{subtitle}</p>
              </div>
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
