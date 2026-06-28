export default function ExpertsBanner() {
  return (
    <section className="relative w-full h-[500px] bg-[#030303] overflow-hidden flex items-center">
      {/* Focused Radial Glow behind content */}
      <div
        className="absolute left-0 top-0 w-[800px] h-full pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, #007AFF80 0%, transparent 60%)",
        }}
      />

      {/* Right-side Image Container (Anchored to bottom right) */}
      <div className="absolute right-0 -bottom-50  flex items-end justify-end pointer-events-none z-10 ">
        <img
          src="/ExpertDirectoryImg.png"
          alt="Expert Coaches"
          className="h-full w-full object-contain object-right-bottom"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-16">
        <div className="flex flex-col gap-6 max-w-[400px] mt-24">
          <h2 className="text-[56px] lg:text-[46px] font-bold leading-[1.1] text-white">
            Find Your <span className="text-[#007AFF]">Perfect Expert</span>{" "}
            Coach
          </h2>
          <p className="text-[#99A1AF] text-xl font-normal leading-7 max-w-[400px]">
            Connect with certified professionals who specialize in your goals.
          </p>


        </div>
      </div>
    </section>
  );
}
