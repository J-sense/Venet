import { Navigate, Route, Routes } from "react-router";
import CommonLayout from "./components/ui/layouts/CommonLayout";
import { HomeMain } from "./pages/Home";
import {
  CareerPage,
  EducationServicePage,
  HealthFitnessPage,
  MentalHealthPage,
} from "./pages/program";

import { AboutUsMain, FounderStoryPage } from "./pages/About-us";
import { ShoppingCartPage } from "./pages/SubscriptionSuggestion/ShoppingCart";
import { SubscriptionSuggestionMain } from "./pages/SubscriptionSuggestion/SubscriptionSuggestionMain";

import { navItemsForExperts, navItemsForUser } from "./components/ui/navitems";
import {
  ExpertsForgotPassword,
  ExpertsLogin,
  ExpertsRegister,
  ForgotPassword,
  Login,
  Register,
  VerifyIdentity,
} from "./pages/Auth";
import ExpertesAvailability from "./pages/dashboard/experts/Availability/ExpertesAvailability";
import { ExpertsLayout } from "./pages/dashboard/experts/layout";
import ExpertsOverview from "./pages/dashboard/experts/overView/ExpertsOverview";
import { ExpertsProfile } from "./pages/dashboard/experts/profile";
import UserCertificates from "./pages/dashboard/user/Certificates/UserCertificates";
import { UserHome } from "./pages/dashboard/user/home";
import { UserLayout } from "./pages/dashboard/user/layout";
import ProgramAssessment from "./pages/dashboard/user/ProgramAssessment";
import ProgramDetails from "./pages/dashboard/user/ProgramDetails";
import ProgramRoadmap from "./pages/dashboard/user/ProgramRoadmap";
import { TalentPortal } from "./pages/dashboard/user/TalentPortal";

import { ChatWindow } from "./pages/dashboard/experts/MySessions/ChatWindow";
import EXpertsMySession from "./pages/dashboard/experts/MySessions/EXpertsMySession";
import { ExpertsReview } from "./pages/dashboard/experts/Reviews";
import {
  ExpertSettings,
  ExpertsNotificationsPage,
  ExpertsSecurityPage,
} from "./pages/dashboard/experts/Setting";

import {
  UserAccountMain,
  UserBillingMain,
  UserNotifications,
  UserSecurityMain,
  UserSettingsMain,
} from "./pages/dashboard/user/Settings";
import { ResumeBuildForm } from "./pages/dashboard/user/TalentPortal";
import AgoraVideoCallPage from "./pages/video/AgoraVideoCallPage";

import DisclaimerMain from "./pages/Disclaimer/DisclaimerMain";
import { ExpertsDetails, ExpertsMain } from "./pages/experts";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyMain from "./pages/privacyPolicy/PrivacyMain";
import TermsMain from "./pages/termsCondition/TermsMain";
import GraphEarnignList from "./pages/dashboard/experts/overView/components/GraphEarnignList";

export const App = () => {
  return (
    <Routes>
      <Route path="/video-call/:channel" element={<AgoraVideoCallPage />} />
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<HomeMain />} />

        <Route
          path="/programs/health-fitness"
          element={<HealthFitnessPage />}
        />
        <Route path="/programs/mental-health" element={<MentalHealthPage />} />
        <Route
          path="/programs/education-service"
          element={<EducationServicePage />}
        />
        <Route path="/programs/career" element={<CareerPage />} />
        <Route path="/experts" element={<ExpertsMain />} />
        <Route path="/about" element={<AboutUsMain />} />
        <Route path="/founder-story" element={<FounderStoryPage />} />
        <Route path="/experts/:id" element={<ExpertsDetails />} />
        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
        <Route path="/disclaimer" element={<DisclaimerMain />} />
        <Route path="/privacy" element={<PrivacyMain />} />
        <Route path="/terms" element={<TermsMain />} />
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
          <Route index element={<Navigate to="upcoming" replace />} />
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
        <Route path="overview/earnings" element={<GraphEarnignList />} />
        <Route path="earnings" element={<GraphEarnignList />} />

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
          <Route index element={<Navigate to="upcoming" replace />} />
          <Route path=":section" element={<ChatWindow />} />
          <Route path=":section/:id" element={<ChatWindow />} />
        </Route>
      </Route>

      {/* Catch-all Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
