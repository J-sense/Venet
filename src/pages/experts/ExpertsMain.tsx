import ExpertsBanner from "./ExpertsBanner";
import ExpertDirectoryPage from "../../components/experts/ExpertDirectoryPage";

export default function ExpertsMain() {
  return (
    <div>
      <div className="">
        <ExpertsBanner />
      </div>
      <div className="py-30 bg-black">
        <ExpertDirectoryPage />
      </div>
    </div>
  );
}
