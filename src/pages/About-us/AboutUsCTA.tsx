import { ActionButton } from "@/components/ui/ActionButton";

export const AboutUsCTA = () => {
  return (
    <section className="relative bg-[#1E3A8A] py-16 md:py-24 overflow-hidden min-h-[600px] flex items-center">
      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full text-[#191C2B] z-0">
        <svg
          className="w-full h-48 md:h-64 lg:h-72"
          viewBox="0 0 1440 320"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#191C2B"
            fillOpacity="1"
            d="M0,192L80,186.7C160,181,320,171,480,192C640,213,800,267,960,277.3C1120,288,1280,256,1360,240L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Ready to Start Your Journey?
        </h2>

        <p className="text-white/80 text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Take the free assessment to get your personalized health & fitness
          program roadmap
        </p>

        <div className="flex justify-center">
          <ActionButton
            label="Start Free Assessment"
            className="px-8 sm:px-10 py-3.5 text-base sm:text-lg font-semibold bg-white !text-[#1E3A8A] hover:bg-gray-100 transition-all"
          />
        </div>
      </div>
    </section>
  );
};
