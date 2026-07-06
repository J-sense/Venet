// src/components/expert/ExpertOverview.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/StatCard";
import { Calendar, DollarSign, Star, Users } from "lucide-react";

export default function ExpertOverview() {
  const stats = [
    {
      title: "Total Earnings",
      value: "$12,450",
      subtitle: "All time",
      icon: <DollarSign className="w-6 h-6" />,
      trend: "+18% this month",
      href: "earnings"
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
      <div className="min-h-screen bg-zinc-950 text-white p-6">
        <div className="max-w-full  space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0F172A] p-6 rounded-2xl">
            <div>
              <div className="flex  flex-col items-start gap-3">
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1">
                  LIVE
                </Badge>
                <h1 className="text-3xl font-bold">Stripe Connected</h1>
              </div>
              <p className="text-zinc-400 mt-1">
                Payouts active for john@example.com
              </p>
            </div>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 bg-[#62FF9CC2]"
            >
              Manage Account →
            </Button>
          </div>

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
