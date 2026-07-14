import { Outlet } from "react-router";

import { CommonNavbar } from "./CommonNavbar";
import { Footer } from "./CommonFotter";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export default function CommonLayout() {
  return (
    <div>
      <ScrollToTop />
      <CommonNavbar />
      <main className="bg-base min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

