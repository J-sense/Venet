"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Download, Receipt, History } from "lucide-react";
import { useNavigate } from "react-router";
import { subscriptions, billingHistory } from "./data/userBillingData";

export default function UserBillingMain() {
  const navigate = useNavigate();
  
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Active Subscriptions Section */}
      <Card className="bg-[#122131] border-none rounded-xl overflow-hidden shadow-none">
        <CardHeader className="px-6 py-5">
          <CardTitle className="flex items-center gap-2 text-white text-xl font-bold tracking-wide">
            <Sparkles className="w-5 h-5 text-blue-400" />
            Active Subscriptions
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subscriptions.map((sub, i) => (
              <div
                key={i}
                className="bg-[#2736474D] rounded-xl p-5 border border-white/5 flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-zinc-200 font-medium text-[17px] mb-1">
                      {sub.name}
                    </h3>
                    <p className="text-zinc-400 text-[13px]">{sub.price}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    {sub.status}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                  <div className="text-zinc-400 text-[13px]">
                    Next billing: {sub.nextBilling}
                  </div>
                  <button className="text-red-500 font-semibold hover:text-red-400 transition-colors text-[13px]">
                    Cancel Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History Section */}
      <Card className="bg-[#122131] border-none rounded-xl overflow-hidden shadow-none">
        <CardHeader className="px-6 py-5 flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white text-xl font-bold tracking-wide">
            <History className="w-5 h-5 text-zinc-300" />
            Billing History
          </CardTitle>
          <button className="flex items-center gap-1.5 text-blue-500 hover:text-blue-400 text-[13px] font-semibold transition-colors mt-0">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] text-left border-t border-white/5">
              <thead>
                <tr className="text-zinc-400 border-b border-white/5">
                  <th className="px-6 py-4 font-medium whitespace-nowrap">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">
                    Expert Name
                  </th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">
                    Expertise
                  </th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">
                    Duration
                  </th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">
                    Total Amount
                  </th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap text-right">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {billingHistory.map((item, i) => (
                  <tr
                    key={i}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-300">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-300">
                      {item.expertName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-300">
                      {item.expertise}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-300">
                      {item.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-medium border ${
                          item.status === "Paid"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/user/invoice/INV-2024-089${i}`)
                        }
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        <Receipt className="w-4 h-4 inline-block" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
