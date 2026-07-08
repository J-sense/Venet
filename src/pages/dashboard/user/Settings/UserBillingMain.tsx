// /home/workdir/artifacts/UserBillingMain.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Download, Plus, Trash2, Receipt, Clock } from "lucide-react";

import { subscriptions, billingHistory } from "./data/userBillingData";

export default function UserBillingMain() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Billing & Payments</h1>
          <p className="text-zinc-400 mt-1">Manage your subscriptions and payment methods</p>
        </div>
      </div>

      {/* Main Grid: 70% Left - 30% Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* LEFT SIDE - 70% */}
        <div className="xl:col-span-8 space-y-8">
          {/* Active Subscriptions */}
          <Card className="bg-[#0D1526] border border-white/5 rounded-3xl p-1 relative overflow-hidden shadow-2xl shadow-black/40 group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <CardHeader className="p-6 md:p-8 pb-0">
              <CardTitle className="flex items-center gap-3 text-white text-2xl font-bold tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-inner">
                  <Receipt className="w-5 h-5 text-blue-400" />
                </div>
                Active Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-6 relative z-10">
              {subscriptions.map((sub, i) => (
                <div
                  key={i}
                  className="bg-[#101E2D] border border-white/10 hover:border-blue-500/50 transition-all duration-300 rounded-2xl p-6 shadow-md hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 cursor-pointer group/sub"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-white tracking-tight group-hover/sub:text-blue-400 transition-colors">
                        {sub.name}
                      </h3>
                      <p className="text-3xl font-extrabold mt-1 text-white tracking-tight">
                        {sub.price}
                      </p>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 font-semibold uppercase tracking-widest text-[10px] w-fit group-hover/sub:bg-emerald-500/20 transition-colors">
                      Active
                    </Badge>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-sm pt-6 border-t border-white/5">
                    <div className="flex items-center text-zinc-400">
                      <span className="font-medium">Next billing:</span>
                      <span className="font-bold text-white ml-2">
                        {sub.nextBilling}
                      </span>
                    </div>
                    <Button variant="outline" className="bg-transparent border-white/10 group-hover/sub:bg-blue-600 group-hover/sub:border-transparent group-hover/sub:text-white group-hover/sub:shadow-lg group-hover/sub:shadow-blue-900/20 text-white transition-all duration-300">
                      Manage Plan
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card className="bg-[#0D1526] border border-white/5 rounded-3xl p-1 relative overflow-hidden shadow-2xl shadow-black/40 group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <CardHeader className="p-6 md:p-8 pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-3 text-white text-2xl font-bold tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-inner">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                Billing History
              </CardTitle>
              <Button
                variant="outline"
                className="bg-transparent border-white/10 hover:bg-white/5 text-white transition-colors"
              >
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
            </CardHeader>
            <CardContent className="p-6 md:p-8 relative z-10">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-zinc-400">
                      <th className="pb-4 font-semibold whitespace-nowrap">Date</th>
                      <th className="pb-4 font-semibold whitespace-nowrap">Description</th>
                      <th className="pb-4 font-semibold whitespace-nowrap">Amount</th>
                      <th className="pb-4 font-semibold whitespace-nowrap">Status</th>
                      <th className="pb-4 font-semibold text-right whitespace-nowrap">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {billingHistory.map((item, i) => (
                      <tr key={i} className="hover:bg-white/[0.04] transition-colors cursor-pointer group/row">
                        <td className="py-5 whitespace-nowrap font-medium text-zinc-400 group-hover/row:text-zinc-200 transition-colors">{item.date}</td>
                        <td className="py-5 whitespace-nowrap text-white font-medium group-hover/row:text-blue-300 transition-colors">{item.desc}</td>
                        <td className="py-5 font-bold whitespace-nowrap text-white">{item.amount}</td>
                        <td className="py-5 whitespace-nowrap">
                          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 group-hover/row:bg-emerald-500/20 transition-colors">
                            Paid
                          </Badge>
                        </td>
                        <td className="py-5 text-right whitespace-nowrap">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-400 opacity-50 group-hover/row:opacity-100 hover:text-white hover:bg-blue-500/20 group-hover/row:scale-110 transition-all duration-300"
                          >
                            <Download className="w-4 h-4" />
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
        <div className="xl:col-span-4 space-y-8 hidden">
          {/* Payment Method */}
          <Card className="bg-[#0D1526] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-2xl shadow-black/40 group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-inner shrink-0">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-white font-bold text-xl tracking-tight">
                  Payment Method
                </h2>
              </div>

              <div className="bg-[#101E2D] border border-white/10 rounded-2xl p-5 mb-6 group/card hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-black/50 border border-white/10 text-white font-black italic text-sm w-12 h-8 rounded flex items-center justify-center shadow-inner group-hover/card:border-blue-500/50 transition-colors">
                      VISA
                    </div>
                    <div>
                      <p className="font-mono text-sm tracking-widest text-white font-medium group-hover/card:text-blue-100 transition-colors">
                        •••• •••• 4242
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">Exp 12/25</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <span className="text-[10px] uppercase tracking-wider font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded text-zinc-300 group-hover/card:bg-blue-500/10 group-hover/card:text-blue-400 transition-colors">
                      Default
                    </span>
                    <button className="text-zinc-500 hover:text-red-400 transition-colors hover:scale-110 active:scale-95">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <Button className="w-full h-12 bg-transparent hover:bg-white/5 border border-dashed border-white/20 hover:border-blue-500/50 hover:text-blue-400 text-white transition-all duration-300 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
                <Plus className="w-4 h-4" />
                Add New Method
              </Button>
            </div>
          </Card>

          {/* Upcoming Charges */}

        </div>
      </div>
    </div>
  );
}
