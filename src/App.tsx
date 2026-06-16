import { Route, Routes } from "react-router";
import CommonLayout from "./components/ui/layouts/CommonLayout";
import HomeMain from "./pages/Home/HomeMain";
import ProgrameMain from "./pages/program/ProgrameMain";
import ExpertsMain from "./pages/experts/ExpertsMain";
import ExpertsDetails from "./pages/experts/ExpertsDetails";
import { SubscriptionSuggestionMain } from "./pages/SubscriptionSuggestion/SubscriptionSuggestionMain";
import { ShoppingCartPage } from "./pages/SubscriptionSuggestion/ShoppingCart";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<HomeMain />} />
        <Route path="/programs" element={<ProgrameMain />} />
        <Route path="/experts" element={<ExpertsMain />} />
        <Route path="/experts/:id" element={<ExpertsDetails />} />
        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
        <Route
          path="/subscription-suggestions"
          element={<SubscriptionSuggestionMain />}
        />
      </Route>
    </Routes>
  );
};
