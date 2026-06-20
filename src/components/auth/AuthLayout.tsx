import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="h-screen w-full bg-[#080A0E] flex flex-col">
      {/* ── Main Content ── */}
      <main className="flex w-full flex-1 overflow-hidden">
        {/* LEFT: Hero Panel - Desktop Only (Unchanged) */}
        <div className="hidden lg:block lg:w-[55%] relative overflow-hidden bg-[#080A0E]">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_55%_85%_at_0%_40%,#1E40AFCC_0%,#1E3A8A88_35%,transparent_65%)]" />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950 via-slate-950/50 to-transparent h-30" />

          <div
            className="absolute inset-0 z-10 bg-no-repeat bg-[right_bottom] lg:bg-[right_bottom] bg-[length:90%_auto]"
            style={{
              backgroundImage: `url('/authImg.png')`,
            }}
          />
        </div>

        {/* RIGHT: Form Panel */}
        <div className="flex-1 flex items-center justify-center w-full lg:w-[60%] z-30 px-6 py-10 overflow-y-auto relative">
          {/* Mobile Full Background (Only visible on small screens) */}
          <div className="lg:hidden absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/authImg.png')` }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#080A0E]/75" />
            {/* Strong Blur */}
            <div className="absolute inset-0 backdrop-blur-[90px]" />
          </div>

          {/* Form Container */}
          <div className="w-full md:max-w-[400px] lg:max-w-[400px] relative z-10">
            <div className="rounded-3xl bg-[#191C2B] backdrop-blur-2xl border border-white/[0.08] p-8 shadow-[0_8px_40px_0_rgba(0,0,0,0.6)]">
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
      </main>
    </div>
  );
};
