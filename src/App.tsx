import { Route, Routes } from "react-router";
import CommonLayout from "./components/ui/layouts/CommonLayout";
import HomeMain from "./pages/Home/HomeMain";
import ProgrameMain from "./pages/program/ProgrameMain";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<HomeMain />} />
        <Route path="/programs" element={<ProgrameMain />} />
      </Route>
    </Routes>
  );
};
