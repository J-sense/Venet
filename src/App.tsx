import { Route, Routes } from "react-router";
import CommonLayout from "./components/ui/layouts/CommonLayout";
import HomeMain from "./pages/Home/HomeMain";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<HomeMain />} />
      </Route>
    </Routes>
  );
};
