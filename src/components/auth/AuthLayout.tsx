import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-[#080A0E] flex flex-col">
      {/* ── Main Content: Flex Container ── */}
      <main className="flex w-full flex-1 overflow-hidden">
        {/* LEFT: Hero Panel (50% width on lg) */}
        <div className="hidden lg:block lg:w-[55%] relative overflow-hidden bg-[#080A0E]">
          {/* Blue Gradient */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_55%_85%_at_0%_40%,#1E40AFCC_0%,#1E3A8A88_35%,transparent_65%)]" />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950 via-slate-950/50 to-transparent h-30" />

          {/* Athlete Image - Centered/Scaled */}
          {/* Athlete Image - Placed at the bottom */}
          <div
            className="absolute inset-0 z-10 bg-no-repeat bg-[center_bottom] lg:bg-[left_bottom] bg-[length:90%_auto]"
            style={{
              backgroundImage: `url('/authImg.png')`,
            }}
          />
        </div>

        {/* RIGHT: Form Panel (100% on mobile, 50% on lg) */}
        <div className="flex-1 flex items-center justify-center w-full lg:w-[60%] z-30 px-6 py-10 overflow-y-auto">
          <div className="w-full max-w-[600px]">
            {/* Mobile Hero Image */}
            <div
              className="lg:hidden w-full aspect-[16/9] max-h-[320px] rounded-3xl mb-8 relative bg-cover bg-center shadow-2xl shadow-blue-900/30"
              style={{
                backgroundImage: `url('/authImg.png')`,
              }}
            />

            <div className="rounded-3xl relative w-full bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/[0.08] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
              <div className="text-center my-2">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                  {title}
                </h1>
                <p className="text-sm text-gray-500">{subtitle}</p>
              </div>
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
