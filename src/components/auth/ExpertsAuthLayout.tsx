import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  bgImage?: string;
}

export const ExpertsAuthLayout = ({
  children,
  title,
  subtitle,
  bgImage,
}: AuthLayoutProps) => {
  return (
    <div className="h-screen w-full bg-[#080A0E] flex flex-col">
      <main className="flex w-full flex-1 overflow-hidden">
        {/* LEFT: Hero Panel */}
        <div className="hidden lg:block lg:w-[45%] relative overflow-hidden bg-[#080A0E]">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_55%_85%_at_0%_40%,#1E40AFCC_0%,#1E3A8A88_35%,transparent_65%)]" />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950 via-slate-950/50 to-transparent h-30" />

          {/* ── Replaced bg-image div with <img> for responsive height control ── */}
          <img
            src="/authImg.png"
            alt=""
            aria-hidden="true"
            className="absolute bottom-0 right-0 z-10 w-auto object-contain object-right-bottom h-[80%] lg:h-[88%] xl:h-full"
          />
        </div>

        {/* RIGHT: Form Panel */}
        <div className="flex-1 flex items-center justify-center w-full lg:w-[55%] z-30 px-6 py-10 overflow-y-auto relative">
          {/* Mobile background */}
          <div className="lg:hidden absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/authImg.png')` }}
            />
            <div className="absolute inset-0 bg-[#191C2B]/75" />
            <div className="absolute inset-0 backdrop-blur-[90px]" />
          </div>

          {/* Form Container */}
          <div className="w-full md:max-w-[400px] lg:max-w-[560px] relative z-10">
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-[0_8px_40px_0_rgba(0,0,0,0.6)]">
              {bgImage && (
                <>
                  <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${bgImage}')` }}
                  />
                  <div className="absolute inset-0 z-0 bg-[#191C2B]/90" />
                </>
              )}

              {!bgImage && (
                <div className="absolute inset-0 z-0 bg-[#191C2B]" />
              )}

              <div className="relative z-10 p-8">
                <div className="text-center my-2">
                  <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                    {title}
                  </h1>
                  <p className="text-sm text-gray-400">{subtitle}</p>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
