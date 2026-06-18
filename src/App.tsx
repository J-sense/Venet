import { Route, Routes } from "react-router";
import CommonLayout from "./components/ui/layouts/CommonLayout";
import HomeMain from "./pages/Home/HomeMain";
import ProgrameMain from "./pages/program/ProgrameMain";
import ExpertsMain from "./pages/experts/ExpertsMain";
import ExpertsDetails from "./pages/experts/ExpertsDetails";
import { SubscriptionSuggestionMain } from "./pages/SubscriptionSuggestion/SubscriptionSuggestionMain";
import { ShoppingCartPage } from "./pages/SubscriptionSuggestion/ShoppingCart";
import AboutUsMain from "./pages/About-us/AboutUsMain";

import { navItemsForExperts, navItemsForUser } from "./components/ui/navitems";
import UserLayout from "./components/ui/layouts/UserLayout/UserLayout";
import ExpertsLayout from "./components/ui/layouts/expertsLayout/ExpertsLayout";
import UserHome from "./pages/dashboard/user/UserDashbpard/UserHome";
import UserCertificates from "./pages/dashboard/user/Certificates/UserCertificates";
import TalentPortal from "./pages/dashboard/user/TalentPortal/TalentPortal";
import { Login } from "./pages/authPages/Login";
import { Register } from "./pages/authPages/Register";
import { ForgotPassword } from "./pages/authPages/ForgotPassword";
import { VerifyIdentity } from "./pages/authPages/VerifyIdentity";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<HomeMain />} />
        <Route path="/programs" element={<ProgrameMain />} />
        <Route path="/experts" element={<ExpertsMain />} />
        <Route path="/about" element={<AboutUsMain />} />
        <Route path="/experts/:id" element={<ExpertsDetails />} />
        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
        <Route
          path="/subscription-suggestions"
          element={<SubscriptionSuggestionMain />}
        />
      </Route>
      <Route
        path="/dashboard/user"
        element={<UserLayout navItems={navItemsForUser} />}
      >
        <Route index element={<UserHome />} />
        <Route path="certificates" element={<UserCertificates />} />
        <Route path="talent-portal" element={<TalentPortal />} />
      </Route>
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="otp-verification" element={<VerifyIdentity />} />
        {/* <Route path="forgot-password" element={<ForgotPassword />} /> */}
      </Route>
      <Route
        path="/dashboard/experts"
        element={<ExpertsLayout navItems={navItemsForExperts} />}
      ></Route>
    </Routes>
  );
};
