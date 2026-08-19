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

export default function ExpertOverview() {
  const { data: getStripe, isLoading: isLoadingStripe } =
    useGetExpertStripeAccountQuery(undefined);
  console.log(getStripe);
  const [createOnboarding, { isLoading: isOnboarding }] =
    useExpertOnBoardingMutation();

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
      value: "$12,450",
      subtitle: "All time",
      icon: <DollarSign className="w-6 h-6" />,
      trend: "+18% this month",
      href: "earnings",
    },
    {
      title: "Total Clients",
      value: "127",
      subtitle: "All time",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Rating",
      value: "4.9",
      subtitle: "Based on 127 reviews",
      icon: <Star className="w-6 h-6" />,
    },
    {
      title: "This Week",
      value: "9",
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
                trend={stat.trend}
                href={stat?.href}
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
                {[
                  {
                    name: "Sarah J.",
                    topic: "Fitness Goals",
                    time: "Today • 2:30 PM",
                  },
                  {
                    name: "Michael R.",
                    topic: "Fitness Goals",
                    time: "Tomorrow • 10:30 AM",
                  },
                  {
                    name: "Emily K.",
                    topic: "Mental Health",
                    time: "Jun 10 • 2:00 PM",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-[#334155] p-4 rounded-2xl"
                  >
                    <div>
                      <p className="font-medium text-[#FFFFFF] text-[18px]">
                        {item.name}
                      </p>
                      <p className="text-sm text-[#9F9FA9] text-[14px] font-normal">
                        {item.topic}
                      </p>
                    </div>
                    <div className="text-right text-sm text-zinc-400">
                      {item.time}
                    </div>
                  </div>
                ))}
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
                {[
                  { name: "Sarah J.", amount: "$90", time: "Jun 8 • 45 min" },
                  { name: "Michael R.", amount: "$90", time: "Jun 7 • 50 min" },
                  { name: "Emily K.", amount: "$90", time: "Jun 6 • 30 min" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-[#334155] p-4 rounded-2xl"
                  >
                    <div>
                      <p className="font-medium text-[#FFFFFF] text-[18px]">
                        {item.name}
                      </p>
                      <p className="text-sm text-[#9F9FA9] text-[14px] font-normal">
                        {item.time}
                      </p>
                    </div>
                    <div className="font-semibold text-emerald-400">
                      {item.amount}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
