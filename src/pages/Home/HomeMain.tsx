import { Banner } from "./Banner";
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
      <Banner />
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
