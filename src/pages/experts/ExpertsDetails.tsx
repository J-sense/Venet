/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { useParams, Link } from "react-router";
import { ChevronLeft } from "lucide-react";
import type { Expert } from "./data/expertsData";
import ExpertProfileDetails from "./components/profile/ExpertProfileDetails";
import CustomBooking from "./components/booking/CustomBooking";
import { useGetSingleExpertQuery } from "@/redux/features/expertsRoute/expertRoute.api";

// Helper to format image URLs and handle HTTP/HTTPS mixed content
const getImageUrl = (url?: string | null) => {
  if (!url) return undefined;
  if (
    typeof window !== "undefined" &&
    window.location.protocol === "https:" &&
    url.startsWith("http://")
  ) {
    return url.replace("http://", "https://");
  }
  return url;
};

export default function ExpertsDetails() {
  const { id } = useParams();
  const { data: singExpert, isLoading } = useGetSingleExpertQuery(id);

  // Dynamically map API response data for CustomBooking & ProfileDetails (NO mock data)
  const expert: Expert = useMemo(() => {
    const apiData = singExpert?.data;
    const userObj = apiData?.user;

    const name =
      [userObj?.first_name, userObj?.last_name].filter(Boolean).join(" ") ||
      "Expert Profile";
    const avatarUrl = getImageUrl(userObj?.image);
    const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name,
    )}&background=1E293B&color=3B82F6`;

    return {
      id: userObj?.id || id || "",
      name,
      avatar: avatarUrl || fallbackAvatar,
      title: apiData?.professional_title || userObj?.specialty || "Expert",
      specialty: userObj?.specialty || "Expert",
      rating: apiData?.average_rating ? Number(apiData.average_rating) : 0,
      reviewsCount:
        apiData?.review_count !== undefined && apiData?.review_count !== null
          ? Number(apiData.review_count)
          : 0,
      tags:
        Array.isArray(userObj?.skills) && userObj.skills.length > 0
          ? userObj.skills
          : userObj?.specialty
            ? [userObj.specialty]
            : [],
      pricePerHour: userObj?.hourly_rate ? Number(userObj.hourly_rate) : 0,
      availability:
        userObj?.open_to === "AVAILABLE"
          ? "Available This Week"
          : userObj?.open_to === "BUSY"
            ? "Busy"
            : "Not Available",
    };
  }, [singExpert?.data, id]);

  if (isLoading) {
    return (
      <div className="min-h-screen text-slate-100 font-inter my-24 flex items-center justify-center">
        <div className="animate-pulse text-slate-400 font-bold">
          Loading expert profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-100 font-inter my-24">
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
            <ExpertProfileDetails expert={expert} id={id || ""} />
          </div>

          {/* Right Column: Sticky Stepper Booking Interface */}
          <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 lg:sticky lg:top-24">
            <div className="space-y-4">
              {/* Dynamic top status badge */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-slate-300 font-bold">
                    Accepting Bookings
                  </span>
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
