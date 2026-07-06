import { AboutUsCTA } from "./components/AboutUsCTA";
import { AboutUsHero } from "./components/AboutUsHero";
import { FourPillars } from "./components/FourPillars";
import { MeetFounder } from "./components/MeetFounder";

export default function AboutUsMain() {
  return (
    <div>
      <AboutUsHero />
      <FourPillars />
      <MeetFounder />
      <AboutUsCTA
        title="Ready to Start Your Journey?"
        description="Take the free assessment to get your personalized health & fitness program roadmap"
        buttonText="Start Free Assessment"
        bgClass="bg-[#1E3A8A]"
        bottomCurveColor="#191C2B"
        buttonTextClass="!text-[#1E3A8A]"
      />
    </div>
  );
}
