import { useParams, Link } from "react-router";
import { ChevronLeft } from "lucide-react";
import { mockExperts } from "./data/expertsData";
import ExpertProfileDetails from "./components/profile/ExpertProfileDetails";
import CustomBooking from "./components/booking/CustomBooking";

export default function ExpertsDetails() {
  const { id } = useParams();

  // Find the selected expert, default to Dr. Sarah Chen (id: "2") if not found or invalid
  const expert = mockExperts.find((exp) => exp.id === id) || mockExperts.find((exp) => exp.id === "2") || mockExperts[0];

  if (!expert) {
    return (
      <div className="bg-[#030303] min-h-screen text-slate-100 font-inter flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-black text-white mb-4">Expert Profile Not Found</h2>
        <Link to="/experts">
          <button className="bg-[#007AFF] hover:bg-[#0066FF] text-white px-6 py-3 rounded-full text-sm font-bold transition-all">
            Return to Directory
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className=" min-h-screen text-slate-100 font-inter my-24">
      {/* Detail Page Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-10">

        {/* Breadcrumb Navigation */}
        <div className="mb-8 flex items-center">
          <Link
            to="/experts"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm font-semibold transition-colors duration-200 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Expert Directory
          </Link>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Detailed Expert Biography, Credentials & Reviews */}
          <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
            <ExpertProfileDetails expert={expert} />
          </div>

          {/* Right Column: Sticky Stepper Booking Interface */}
          <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 lg:sticky lg:top-24">
            <div className="space-y-4">
              {/* Optional dynamic top status badge */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-slate-300 font-bold">Accepting Bookings</span>
                </div>
                <span className="text-emerald-400 font-extrabold font-mono text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase">
                  Available
                </span>
              </div>

              {/* Booking Component */}
              <CustomBooking expert={expert} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
