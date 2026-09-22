import { Outlet } from "react-router";

import { CommonNavbar } from "./CommonNavbar";
import { Footer } from "./CommonFotter";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { NotificationPermissionModal } from "@/components/ui/NotificationPermissionModal";

export default function CommonLayout() {
  return (
    <div>
      <ScrollToTop />
      <NotificationPermissionModal />
      <CommonNavbar />
      <main className="bg-base min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

