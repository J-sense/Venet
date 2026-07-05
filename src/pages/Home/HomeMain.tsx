import BannerV2 from "./components/BannerV2";
import { CTASection } from "./components/CTASection";
import { CustomerFeedback } from "./components/CustomerFeedback";
import { FAQSection } from "./components/FAQSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { MissionSection } from "./components/MissionSection";
import { ProgramsSection } from "./components/ProgramsSection";
import { SubscriptionSection } from "./components/SubscriptionSection";

export default function HomeMain() {
  return (
    <div>
      {/* <Banner /> */}
      <BannerV2 />
      <ProgramsSection />
      <HowItWorksSection />
      <MissionSection />
      {/* <OurTrainersSection /> */}
      <CustomerFeedback />
      <SubscriptionSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
