import { Banner } from "./Banner";
import BannerV2 from "./BannerV2";
import { CTASection } from "./CTASection";
import { CustomerFeedback } from "./CustomerFeedback";
import { FAQSection } from "./FAQSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { MissionSection } from "./MissionSection";
import { ProgramsSection } from "./ProgramCard";
import { OurTrainersSection } from "./StatCard";

import { SubscriptionSection } from "./SubscriptionSection";

export default function HomeMain() {
  return (
    <div>
      {/* <Banner /> */}
      <BannerV2 />
      <ProgramsSection />
      <MissionSection />
      <HowItWorksSection />
      <SubscriptionSection />
      <OurTrainersSection />
      <CustomerFeedback />
      <FAQSection />
      <CTASection />
    </div>
  );
}
