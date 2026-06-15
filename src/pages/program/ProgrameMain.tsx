import { CustomerFeedback } from "../Home/CustomerFeedback";
import { ProgramBanner } from "./ProgramBanner";
import { ProgramGrid } from "./ProgramCards";

import ProgrammeHowItWorks from "./ProgrameWorks";

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
