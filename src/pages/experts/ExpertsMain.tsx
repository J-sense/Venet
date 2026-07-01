import ExpertDirectoryPage from "./components/ExpertDirectoryPage";
import ExpertsBanner from "./components/ExpertsBanner";

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
