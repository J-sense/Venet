import { ActionButton } from "@/components/ui/ActionButton";
import { BlackActionButton } from "@/components/ui/BlackActionButton";

export const Banner = () => {
  return (
    <main className="flex-1 relative flex items-center overflow-hidden w-full min-h-screen bg-[#000000] pt-20">
      {/* ================================================================
          FIGMA BLOB LAYER 2 — Left ambient circle
          Original: 709x709px circle, left:0 top:0, rgba(0,122,255,0.20), blur:142px
          Role: Soft blue ambient wash that bleeds from the top-left corner
                into the navbar area. Counterbalances the right-side pillar.
          Adjustment: Scaled to vw units so it stays proportional on all screens.
      ================================================================ */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: "55vw",
          height: "55vw",
          maxWidth: 709,
          maxHeight: 709,
          left: 0,
          top: 0,
          background: "rgba(0, 122, 255, 0.20)",
          borderRadius: "50%",
          filter: "blur(142px)",
        }}
      />

      {/* ================================================================
          FIGMA BLOB LAYER 1 — Right pillar glow (main light source)
          Original: 338x670px capsule, left:918, blur:175px, color:#185CA6
          Role: The primary blue spotlight — a tall vertical pill blurred
                into a wide column of light on the right half of the banner.
                This is what makes the athlete look dramatically lit.
          Adjustment: Positioned with `right` instead of `left:918` so it
                stays anchored to the right edge on all screen widths.
      ================================================================ */}
      <div
        className="absolute pointer-events-none hidden md:block z-0"
        style={{
          width: 338,
          height: 670,
          right: "-60px",
          top: 55,
          background: "#185CA6",
          borderRadius: 9999,
          filter: "blur(175px)",
        }}
      />

      {/* ================================================================
          FIGMA BLOB LAYER 3 — Right edge accent (opacity overlay)
          Original: 338x670 capsule, left:808, opacity:0.40, same color
          Role: Stacks on top of Blob 1 slightly offset to the left.
                Because it's 40% opacity, it deepens the glow gradient
                in the centre of the right zone without adding harsh edges.
                The original Figma clips it inside a wrapper — we replicate
                that by keeping overflow:hidden on the parent <main>.
      ================================================================ */}
      <div
        className="absolute pointer-events-none hidden md:block z-0"
        style={{
          width: 338,
          height: 670,
          right: "80px",
          top: 75,
          opacity: 0.4,
          background: "#185CA6",
          borderRadius: 9999,
          filter: "blur(175px)",
        }}
      />

      {/* ================================================================
          GRADIENT LAYER — Top vignette (darkens navbar zone)
          Makes the fixed transparent navbar legible by darkening the
          top 144px of the banner — right through all three blob layers.
      ================================================================ */}
      <div
        className="absolute top-0 left-0 right-0 h-36 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* ================================================================
          GRADIENT LAYER — Bottom dissolve mask
          Fades the banner seamlessly into the next section.
      ================================================================ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-52 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* ================================================================
          GRADIENT LAYER — Left text guard
          Keeps the hero text column on pure black so the ambient circle
          (Blob 2) doesn't bleed blue into the typography area.
      ================================================================ */}
      <div
        className="absolute inset-y-0 left-0 w-[38%] pointer-events-none hidden md:block z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* ── Page Content ─────────────────────────────────────────────── */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Side Content */}
          <div className="md:col-span-6 flex flex-col items-start space-y-5">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[14px] font-bold text-[#3B82F6] uppercase tracking-wider border"
              style={{
                background: "linear-gradient(90deg, #0B60BD33, #007AFF33)",
                borderColor: "#007AFF4D",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              Transform Your Fitness Journey
            </div>

            <h1 className="font-sora text-[40px] sm:text-[60px] lg:text-[80px] font-extrabold leading-none tracking-normal capitalize bg-gradient-to-b from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent">
              Achieve Your <br />
              Health Goal <br />
              With{" "}
              <span className="bg-gradient-to-r from-[#007AFF] to-[#0B60BD] bg-clip-text text-transparent">
                VNET
              </span>
            </h1>
            <p className="text-sm text-[#FFFFFF]/80 max-w-2xl leading-relaxed font-normal">
              Join the Fitmaker community and transform your fitness journey.
              Our expert coaches and personalized programs are designed to help
              you achieve your goals and exceed your expectations. Ready to make
              a change?"
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 w-full lg:max-w-xl">
              <ActionButton label="Start Your Journey" />

              <BlackActionButton label="Explore Programs" />
            </div>
          </div>

          {/* Right: Athlete image + floating stat badges */}
          <div className="md:col-span-6 relative flex justify-center items-center mt-12 md:mt-0 select-none">
            {/* ── UPDATED: BRIGHTER & MORE VISIBLE LEFT IMAGE GLOW BACKDROP ── */}
            <div
              className="absolute pointer-events-none z-0"
              style={{
                width: "320px",
                height: "500px",
                left: "20px", // Shifting it closer inwards onto the image boundary area
                top: "50%",
                transform: "translateY(-50%)",
                background:
                  "radial-gradient(circle, rgba(0, 122, 255, 0.45) 0%, rgba(11, 96, 189, 0.15) 55%, rgba(0,0,0,0) 100%)",
                borderRadius: "50%",
                filter: "blur(50px)", // Reduced blur radius slightly to keep it punchier and less washed out
              }}
            />

            {/* Athlete image — sits above the blob layers (z-20 from parent) */}
            <div className="relative z-10 max-w-[840px] w-full aspect-[4/5] flex items-center justify-center">
              <img
                src="/bannerLogo.png"
                alt="VNET Model Athlete"
                className="w-full h-full object-contain filter drop-shadow-[0_0_40px_rgba(59,130,246,0.2)]"
              />
            </div>

            {/* ── UPDATED: STAT BADGES PULLED INWARD CLOSER TO THE ATHLETE IMAGE ── */}

            {/* Top Left: Coaches (Changed left-0 to left-[12%] or sm:left-[15%]) */}
            <div className="absolute top-[25%] left-[4%] sm:left-[16%] z-20 p-[2px] rounded-[24px] bg-gradient-to-b from-[#1A6BEF] to-[#CD4E17] min-w-[140px]">
              <div className="bg-[#0A1628] rounded-[22px] px-6 py-4 text-center backdrop-blur-sm">
                <div className="text-3xl font-black text-white tracking-tight leading-none">
                  + 50
                </div>
                <div className="text-sm text-gray-300 mt-2 font-semibold tracking-wide uppercase">
                  Coaches
                </div>
              </div>
            </div>

            {/* Top Right: Positive Reviews (Changed right-[-4%] to right-[10%]) */}
            <div className="absolute top-[18%] right-[2%] sm:right-[10%] z-20 p-[2px] rounded-[20px] bg-gradient-to-b from-[#1A6BEF] to-[#CD4E17] min-w-[125px]">
              <div className="bg-[#0A1628] rounded-[18px] px-4 py-2.5 text-center">
                <div className="text-base font-black text-white tracking-tight leading-none">
                  + 1300
                </div>
                <div className="text-[9px] text-gray-400 mt-1 uppercase font-bold tracking-wider">
                  Positive Reviews
                </div>
              </div>
            </div>

            {/* Bottom Left: Workout Videos (Changed left-[-4%] to left-[12%]) */}
            <div className="absolute bottom-[16%] left-[2%] sm:left-[12%] z-20 p-[2px] rounded-[20px] bg-gradient-to-b from-[#1A6BEF] to-[#CD4E17] min-w-[125px]">
              <div className="bg-[#0A1628] rounded-[18px] px-4 py-2.5 text-center">
                <div className="text-base font-black text-white tracking-tight leading-none">
                  + 1000
                </div>
                <div className="text-[9px] text-gray-400 mt-1 uppercase font-bold tracking-wider">
                  Workout Videos
                </div>
              </div>
            </div>
            {/* Bottom Right: Trainers (Changed right-[-4%] to right-[14%]) */}
            <div className="absolute bottom-[22%] right-[4%] sm:right-[14%] z-20 p-[2px] rounded-[20px] bg-gradient-to-b from-[#1A6BEF] to-[#CD4E17] min-w-[100px]">
              <div className="bg-[#0A1628] rounded-[18px] px-4 py-2.5 text-center">
                <div className="text-base font-black text-white tracking-tight leading-none">
                  + 1500
                </div>
                <div className="text-[9px] text-gray-400 mt-1 uppercase font-bold tracking-wider">
                  Trainers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
