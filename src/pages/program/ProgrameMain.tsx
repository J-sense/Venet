
import { CustomerFeedback } from "../Home/components/CustomerFeedback";
import { ProgramBanner } from "./components/ProgramBanner";
import { ProgramGrid } from "./components/ProgramCards";

import ProgrammeHowItWorks from "./components/ProgrameWorks";

export default function ProgrameMain() {
  return (
    <div>
      <ProgramBanner />
      <ProgramGrid />
      <ProgrammeHowItWorks />
      <CustomerFeedback />
    </div>
  );
}
