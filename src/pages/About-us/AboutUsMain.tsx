import { AboutUsCTA } from "./components/AboutUsCTA";
import { AboutUsHero } from "./components/AboutUsHero";
import { FourPillars } from "./components/FourPillars";

export default function AboutUsMain() {
  return (
    <div>
      <AboutUsHero />
      <FourPillars />
      <AboutUsCTA />
    </div>
  );
}
