import { Outlet } from "react-router";

import { CommonNavbar } from "./CommonNavbar";
import { Footer } from "./CommonFotter";

export default function CommonLayout() {
  return (
    <div>
      <CommonNavbar />
      <main className="bg-base min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
