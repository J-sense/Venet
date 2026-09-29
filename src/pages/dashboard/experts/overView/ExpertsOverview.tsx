/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/expert/ExpertOverview.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/StatCard";
import {
  useExpertOnBoardingMutation,
  useGetExpertStripeAccountQuery,
} from "@/redux/features/expertDashboard/expertAvailability.api";
import { Calendar, DollarSign, Star, Users } from "lucide-react";
import { toast } from "sonner";
import { StripeSetupCard } from "./components/StripeSetupCard";
import { useExpertsOverViewQuery } from "@/redux/features/expertDashboard/expertProfile.api";

export default function ExpertOverview() {
  const { data: getStripe, isLoading: isLoadingStripe } =
    useGetExpertStripeAccountQuery(undefined);

  const [createOnboarding, { isLoading: isOnboarding }] =
    useExpertOnBoardingMutation();
  const { data: expertsOverView, } =
    useExpertsOverViewQuery(undefined);
  console.log(expertsOverView, "expertsOverView")
  const handleStripeConnect = async () => {
    try {
      const res = await createOnboarding(undefined).unwrap();
      const onboardingUrl =
        res?.data?.onboarding_url || res?.onboarding_url || res?.url;
      if (onboardingUrl) {
        window.open(onboardingUrl, "_blank", "noopener,noreferrer");
      } else {
        toast.error("Failed to get Stripe onboarding URL.");
      }
    } catch (err: any) {
      console.error("Stripe onboarding error:", err);
      toast.error(err?.data?.message || "Failed to trigger Stripe onboarding.");
    }
  };

  const stats = [
    {
      title: "Total Earnings",
      value:
        `$ ${expertsOverView?.data?.summary?.total_earnings || 0}`
      ,
      subtitle: "All time",
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: "Total Clients",
      value: `${expertsOverView?.data?.summary?.total_clients}`,
      subtitle: "All time",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Rating",
      value: `${expertsOverView?.data?.summary?.review_count}`,
      subtitle: "Based on 127 reviews",
      icon: <Star className="w-6 h-6" />,
    },
    {
      title: "This Week",
      value: `${expertsOverView?.data?.summary?.this_week_consultations}`,
      subtitle: "Consultations",
      icon: <Calendar className="w-6 h-6" />,
    },
  ];
  return (
    <>
      <div className="min-h-screen bg-zinc-950 text-white ">
        <div className="max-w-full  space-y-8">
          {/* Stripe Setup Banner */}
          <StripeSetupCard
            getStripe={getStripe}
            isLoadingStripe={isLoadingStripe}
            handleStripeConnect={handleStripeConnect}
            isOnboarding={isOnboarding}
          />

          {/* Stats Grid */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
                icon={stat.icon}

              // href={stat?.href}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Consultations */}
            <Card className="bg-[#0F172A] border-zinc-800">
              <CardHeader>
                <CardTitle className="text-[#FFFFFF] text-[24px] font-medium">
                  Upcoming Consultations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {expertsOverView?.data?.upcoming_consultations && expertsOverView.data.upcoming_consultations.length > 0 ? (
                  expertsOverView.data.upcoming_consultations.map((item: any) => {
                    // Format time
                    const timeString = item.start_time;
                    let formattedTime = "";
                    if (timeString) {
                      const [hours, minutes] = timeString.split(":");
                      const dateObj = new Date();
                      dateObj.setHours(parseInt(hours, 10));
                      dateObj.setMinutes(parseInt(minutes, 10));
                      formattedTime = dateObj.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      });
                    }

                    // Format date
                    const dateString = item.date;
                    let formattedDate = "";
                    if (dateString) {
                      const [year, month, day] = dateString.split("-").map(Number);
                      const dateObj = new Date(year, month - 1, day);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);

                      const tomorrow = new Date(today);
                      tomorrow.setDate(tomorrow.getDate() + 1);

                      if (dateObj.getTime() === today.getTime()) {
                        formattedDate = "Today";
                      } else if (dateObj.getTime() === tomorrow.getTime()) {
                        formattedDate = "Tomorrow";
                      } else {
                        formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                      }
                    }

                    return (
                      <div
                        key={item.id}
                        className="flex justify-between items-center bg-[#334155] p-4 rounded-2xl"
                      >
                        <div className="flex items-center gap-3">
                          {item.client_image ? (
                            <img
                              src={item.client_image}
                              alt={item.client_name}
                              className="w-12 h-12 rounded-full object-cover border border-white/10"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">
                              {item.client_name?.charAt(0) || "U"}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-[#FFFFFF] text-[18px]">
                              {item.client_name}
                            </p>
                            <p className="text-sm text-[#9F9FA9] text-[14px] font-normal">
                              {item.duration_minutes} min Consultation
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <span className="text-[#9F9FA9] text-sm">{formattedDate}</span>
                          <span className="text-[#FFFFFF] font-medium">{formattedTime}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-zinc-400 bg-[#334155]/50 rounded-2xl border border-dashed border-zinc-600">
                    No upcoming consultations
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Earnings */}
            <Card className="bg-[#0F172A] border-zinc-800">
              <CardHeader>
                <CardTitle className="text-[#FFFFFF] text-[24px] font-medium">
                  Recent Earnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {expertsOverView?.data?.recent_earnings && expertsOverView.data.recent_earnings.length > 0 ? (
                  expertsOverView.data.recent_earnings.map((item: any, i: number) => {
                    const name = item.client_name || item.name || "Client";
                    const amount = item.amount || item.earnings || 0;
                    const duration = item.duration_minutes || item.duration || 0;

                    // Format date
                    const dateString = item.date || item.created_at || "";
                    let formattedDate = dateString;
                    if (dateString) {
                      const dateObj = new Date(dateString);
                      if (!isNaN(dateObj.getTime())) {
                        formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                      }
                    }

                    return (
                      <div
                        key={item.id || i}
                        className="flex justify-between items-center bg-[#334155] p-4 rounded-2xl"
                      >
                        <div>
                          <p className="font-medium text-[#FFFFFF] text-[18px]">
                            {name}
                          </p>
                          <p className="text-sm text-[#9F9FA9] text-[14px] font-normal">
                            {formattedDate ? `${formattedDate} • ` : ""}{duration > 0 ? `${duration} min` : "Consultation"}
                          </p>
                        </div>
                        <div className="font-semibold text-emerald-400">
                          ${Number(amount).toFixed(2)}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-zinc-400 bg-[#334155]/50 rounded-2xl border border-dashed border-zinc-600">
                    No recent earnings
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
