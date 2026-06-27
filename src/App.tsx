import { Navigate, Route, Routes } from "react-router";
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
import ProgramDetails from "./pages/dashboard/user/ProgramDetails";
import ProgramAssessment from "./pages/dashboard/user/ProgramAssessment";
import ProgramRoadmap from "./pages/dashboard/user/ProgramRoadmap";
import UserCertificates from "./pages/dashboard/user/Certificates/UserCertificates";
import TalentPortal from "./pages/dashboard/user/TalentPortal/TalentPortal";
import { Login } from "./pages/authPages/Login";
import { Register } from "./pages/authPages/Register";
import { ForgotPassword } from "./pages/authPages/ForgotPassword";
import { VerifyIdentity } from "./pages/authPages/VerifyIdentity";
import ExpertsRegister from "./pages/authPages/ExpertsRegister";
import ExpertsLogin from "./pages/authPages/ExpertsLogin";
import ExpertsForgotPassword from "./pages/authPages/ExpertsForgotPassword";
import ExpertsOverview from "./pages/dashboard/experts/overView/ExpertsOverview";
import ExpertesAvailability from "./pages/dashboard/experts/Availability/ExpertesAvailability";
import ExpertsProfile from "./pages/dashboard/experts/profile/ExpertsProfile";

import ExpertSettings from "./pages/dashboard/experts/Setting/ExpertSettings";
import EXpertsMySession from "./pages/dashboard/experts/MySessions/EXpertsMySession";
import { ExpertsReview } from "./pages/dashboard/experts/Reviews/ExpertsReview";
import { ChatWindow } from "./pages/dashboard/experts/MySessions/ChatWindow";
import ExpertsSecurityPage from "./pages/dashboard/experts/Reviews/ExpertsSecurityPage";
import ExpertsNotificationsPage from "./components/experts/settings/ExpertsNotificationsPage";
import UserSettingsMain from "./pages/dashboard/user/Settings/SettingsMain";
import UserAccountMain from "./pages/dashboard/user/Settings/Account/UserAccountMain";
import UserSecurityMain from "./pages/dashboard/user/Settings/UserSecurityMain";
import UserBillingMain from "./pages/dashboard/user/Settings/UserBillingMain";
import UserNotifications from "./pages/dashboard/user/Settings/UserNotifications";
import AgoraVideoCallPage from "./pages/video/AgoraVideoCallPage";
import ResumeBuildForm from "./components/user/talentPortal/ResumeBuildForm";

import HealthFitnessPage from "./pages/program/health-fitness/HealthFitnessPage";
import MentalHealthPage from "./pages/program/mental-health/MentalHealthPage";
import EducationServicePage from "./pages/program/education-service/EducationServicePage";
import CareerPage from "./pages/program/career/CareerPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/video-call/:channel" element={<AgoraVideoCallPage />} />
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<HomeMain />} />
        <Route path="/programs" element={<ProgrameMain />} />
        <Route path="/programs/health-fitness" element={<HealthFitnessPage />} />
        <Route path="/programs/mental-health" element={<MentalHealthPage />} />
        <Route path="/programs/education-service" element={<EducationServicePage />} />
        <Route path="/programs/career" element={<CareerPage />} />
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
        <Route path="program/:id" element={<ProgramDetails />} />
        <Route path="program/:id/assessment" element={<ProgramAssessment />} />
        <Route path="program/:id/roadmap" element={<ProgramRoadmap />} />
        <Route path="certificates" element={<UserCertificates />} />
        <Route path="talent-portal" element={<TalentPortal />} />
        <Route path="manual-input" element={<ResumeBuildForm />} />
        <Route path="consultation" element={<EXpertsMySession />}>
          {/* Remove the hardcoded div and point to ChatWindow */}
          <Route path=":section" element={<ChatWindow />} />
          <Route path=":section/:id" element={<ChatWindow />} />
        </Route>
        <Route path="settings" element={<UserSettingsMain />}>
          <Route index element={<Navigate to="account" replace />} />
          <Route path="account" element={<UserAccountMain />} />
          <Route path="security" element={<UserSecurityMain />} />
          <Route path="billing" element={<UserBillingMain />} />
          <Route path="notifications" element={<UserNotifications />} />
        </Route>
      </Route>
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="otp-verification" element={<VerifyIdentity />} />
        <Route path="experts-register" element={<ExpertsRegister />} />
        <Route path="experts-login" element={<ExpertsLogin />} />
        <Route path="experts-forget" element={<ExpertsForgotPassword />} />
        {/* <Route path="forgot-password" element={<ForgotPassword />} /> */}
      </Route>
      <Route
        path="/dashboard/experts"
        element={<ExpertsLayout navItems={navItemsForExperts} />}
      >
        <Route index element={<ExpertsOverview />} />
        <Route path="overview" element={<ExpertsOverview />} />
        <Route path="availability" element={<ExpertesAvailability />} />
        <Route path="profile" element={<ExpertsProfile />} />
        <Route path="Reviews" element={<ExpertsReview />} />
        <Route path="settings" element={<ExpertSettings />}>
          {/* This makes 'security' the default active page */}
          <Route index element={<Navigate to="security" replace />} />
          <Route path="security" element={<ExpertsSecurityPage />} />
          <Route path="notifications" element={<ExpertsNotificationsPage />} />
        </Route>
        {/* <Route path="my-sessions" element={<EXpertsMySession />} /> */}
        <Route path="consultation" element={<EXpertsMySession />}>
          {/* Remove the hardcoded div and point to ChatWindow */}
          <Route path=":section" element={<ChatWindow />} />
          <Route path=":section/:id" element={<ChatWindow />} />
        </Route>
      </Route>
    </Routes>
  );
};
