// /home/workdir/artifacts/UserBillingMain.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Download, Plus, Trash2 } from "lucide-react";

import { subscriptions, billingHistory } from "./data/userBillingData";

export default function UserBillingMain() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Billing</h1>

        {/* Main Grid: 70% Left - 30% Right */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* LEFT SIDE - 70% */}
          <div className="xl:col-span-8 space-y-6">
            {/* Active Subscriptions */}
            <Card className="bg-[#122131] border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#D4E4FA] text-[24px] font-semibold">
                  <span className="text-blue-400">✦</span> Active Subscriptions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {subscriptions.map((sub, i) => (
                  <div
                    key={i}
                    className="bg-[#2736474D]/30 border border-zinc-700 rounded-2xl p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-[#D4E4FA]">
                          {sub.name}
                        </h3>
                        <p className="text-2xl font-bold mt-1 text-[#BDC9C6]">
                          {sub.price}
                        </p>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                        Active
                      </Badge>
                    </div>

                    <div className="mt-6 flex justify-between items-center text-sm">
                      <div className="flex text-[#BDC9C6]">
                        <span>Next billing :</span>
                        <span className="font-medium ml-1">
                          {sub.nextBilling}
                        </span>
                      </div>
                      <span className="text-[#0A66C2] cursor-pointer hover:underline">
                        Manage
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card className="bg-[#122131] border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-[#D4E4FA] text-[24px] font-semibold">
                  <span>🕒</span> Billing History
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Download className="w-4 h-4 mr-2" /> Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800 text-left text-zinc-400">
                        <th className="pb-4 font-medium">Date</th>
                        <th className="pb-4 font-medium">Description</th>
                        <th className="pb-4 font-medium">Amount</th>
                        <th className="pb-4 font-medium">Status</th>
                        <th className="pb-4 font-medium text-right">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {billingHistory.map((item, i) => (
                        <tr key={i} className="hover:bg-zinc-800/50">
                          <td className="py-4">{item.date}</td>
                          <td className="py-4">{item.desc}</td>
                          <td className="py-4 font-medium">{item.amount}</td>
                          <td className="py-4">
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                              Paid
                            </Badge>
                          </td>
                          <td className="py-4 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-zinc-400 hover:text-white"
                            >
                              📄
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE - 30% */}
          <div className="xl:col-span-4 space-y-6">
            {/* Payment Method */}
            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 h-fit">
              <div className="flex items-center gap-2 mb-6 text-blue-400">
                <CreditCard className="w-5 h-5" />
                <h2 className="text-white font-semibold text-lg">
                  Payment Method
                </h2>
              </div>

              <div className="bg-[#1e293b] border border-white/5 rounded-xl p-5 mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-black border border-white/10 text-white font-bold text-xl w-14 h-9 rounded flex items-center justify-center">
                      VISA
                    </div>
                    <div>
                      <p className="font-mono text-lg tracking-widest text-white">
                        •••• •••• •••• 4242
                      </p>
                      <p className="text-sm text-gray-400">Expires 12/25</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <span className="text-xs bg-white/10 px-3 py-1 rounded text-gray-300">
                      Default
                    </span>
                    <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-400 cursor-pointer" />
                  </div>
                </div>
              </div>

              <button className="w-full py-3.5 border border-white/10 bg-transparent hover:bg-white/5 transition-colors rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add Payment Method
              </button>
            </div>

            {/* Upcoming Charges */}
            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 h-fit">
              <h2 className="text-[#D4E4FA] text-xl font-semibold mb-6">
                Upcoming Charges
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-zinc-300">
                  <span>Stress Management Pro</span>
                  <span className="font-medium text-white">$19.99</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Career Growth Suite</span>
                  <span className="font-medium text-white">$29.99</span>
                </div>
              </div>

              <div className="border-t border-white/10 mt-6 pt-5 flex justify-between items-center">
                <span className="text-zinc-300 font-medium">
                  Total Due (Oct 15 - Oct 22)
                </span>
                <span className="text-2xl font-semibold text-blue-400">
                  $49.98
                </span>
              </div>

              <p className="text-xs text-zinc-500 mt-6 leading-relaxed">
                Charges will be billed automatically to your default payment
                method.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
