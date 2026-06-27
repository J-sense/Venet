import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className=" w-full bg-[#080A0E] flex flex-col relative">
      {/* Absolute Logo */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
        <img src="/VNetLogo.png" alt="VNet Logo" className="w-32 md:w-44" />
      </div>

      {/* ── Main Content ── */}
      <main className="flex w-full flex-1 overflow-hidden min-h-screen">
        {/* LEFT: Hero Panel - Desktop & Tablet */}
        <div className="hidden md:block md:w-2/5 lg:w-[55%] relative overflow-visible bg-[#080A0E]">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_55%_85%_at_0%_40%,#1E40AFCC_0%,#1E3A8A88_35%,transparent_65%)]" />
          {/* Extended gradient to the bottom side */}
          <div className="absolute inset-0 -ml-3xl z-10 bg-gradient-to-b from-[#080A0E] via-[#080A0E]/50 to-transparent h-[45%]" />

          {/* Absolutely positioned image for precise bottom alignment and scaling */}
          <img
            src="/authImg.png"
            alt=""
            aria-hidden="true"
            className="absolute bottom-0 -right-[5%] md:-right-[10%] lg:-right-[15%] z-20 w-auto object-contain object-right-bottom h-[110%] md:h-[180%] lg:h-[190%] xl:h-[210%] pointer-events-none"
          />
        </div>

        {/* RIGHT: Form Panel */}
        <div className="flex-1 flex items-center justify-center md:justify-end md:pr-8 lg:pr-[10%] xl:pr-[15%] w-full md:w-3/5 lg:w-[55%] z-30 px-4 py-4 sm:px-6 md:py-6 overflow-y-auto relative mt-20">
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

          {/* Form Container */}
          <div className="w-full max-w-[480px] md:max-w-[460px] lg:max-w-[500px] xl:max-w-[540px] relative z-10">
            <div className="relative rounded-3xl sm:rounded-[2rem] bg-[#191C2B] backdrop-blur-3xl border border-white/[0.06] p-6 sm:px-8 sm:py-6 lg:px-10 lg:py-8 shadow-[0_16px_60px_-15px_rgba(0,0,0,0.8)]">
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
