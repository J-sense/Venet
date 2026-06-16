export default function ExpertsBanner() {
  return (
    <section className="relative w-full h-[600px] bg-[#030303] overflow-hidden flex items-center py-24">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-right-bottom bg-no-repeat bg-contain"
        style={{
          backgroundImage: "url('/ExpertsBanner.png')",
        }}
      />

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-16">
        <div className="flex flex-col gap-6 max-w-[600px]">
          <h2 className="text-[56px] lg:text-[72px] font-bold  leading-[1.1] text-white">
            Find Your <span className="text-[#007AFF]">Perfect Expert</span>{" "}
            Coach
          </h2>
          <p className="text-[#99A1AF] text-xl font-normal  leading-7">
            Connect with certified professionals who specialize in your goals.
          </p>

          <button className="bg-[#007AFF] text-white px-8 py-4 rounded-full font-bold w-fit hover:bg-[#0066FF] transition-all">
            Find a Coach
          </button>
        </div>
      </div>
    </section>
  );
}