"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Share2,
  CreditCard,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

export default function UserInvoiceMain() {
  const navigate = useNavigate();
  const { id } = useParams(); // Using the invoice ID if needed

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 sm:p-8 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xl font-bold tracking-wide hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Invoice
          </button>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="bg-transparent border-white/20 hover:bg-white/10 text-white rounded-full px-5 h-10 text-[13px] font-semibold transition-all"
            >
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
            <Button className="bg-[#2563EB] hover:bg-blue-600 text-white rounded-full px-5 h-10 text-[13px] font-semibold border-none transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>
        </div>

        {/* Invoice Card */}
        <Card className="bg-[#151D2D] border-none rounded-none overflow-hidden shadow-2xl relative !border-white">
          <CardContent className="p-0">
            <div className="p-8 sm:p-12 space-y-12">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                <div className="space-y-6">
                  {/* VNET Logo representation */}
                  <div className="h-12 w-[160px] bg-black rounded-full flex items-center justify-center border border-white/10 shadow-inner relative overflow-hidden group cursor-pointer">
                    <img
                      src="/VNetLogo.png"
                      alt="VNET Logo"
                      className="w-32 h-9 sm:w-40 sm:h-11 md:w-60 md:h-16 object-cover rounded-full border border-zinc-800 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <h1 className="text-[28px] font-bold text-[#DAE2FD] mb-3 tracking-tight">
                      Invoice
                    </h1>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-[#10B9811A] text-emerald-400 border border-emerald-500/20 px-4 py-1 rounded-full flex items-center gap-1.5 font-bold text-[11px] tracking-wide">
                        <CheckCircle2 className="w-3.5 h-3.5" /> PAID
                      </Badge>
                      <span className="text-[#BDC8D1] text-sm font-medium">
                        #{id || "INV-2024-0892"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-6 mt-4 sm:mt-0">
                  <div>
                    <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-1">
                      Meeting ID
                    </p>
                    <p className="text-zinc-300 font-medium text-sm">
                      MTG-882-CHEN-DOE
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-1">
                      Date Issued
                    </p>
                    <p className="text-zinc-300 font-medium text-sm">
                      May 24, 2026
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5" />

              {/* People involved */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                {/* Billed To */}
                <div>
                  <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-4">
                    Billed To
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-zinc-800 shrink-0 border-2 border-[#1E293B]">
                      <img
                        src="https://i.pravatar.cc/150?img=11"
                        alt="John Doe"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold text-white tracking-wide">
                        John Doe
                      </h3>
                      <p className="text-[13px] text-zinc-400 mt-0.5">
                        john.doe@example.com
                      </p>
                      <p className="text-[13px] text-zinc-500 mt-0.5">
                        San Francisco, CA
                      </p>
                    </div>
                  </div>
                </div>

                {/* Consultant */}
                <div className="md:border-l md:border-white/5 md:pl-8">
                  <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mb-4">
                    Consultant
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-zinc-800 shrink-0 border-2 border-[#1E293B]">
                      <img
                        src="https://i.pravatar.cc/150?img=12"
                        alt="Mike Chen"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold text-white tracking-wide">
                        Mike Chen
                      </h3>
                      <p className="text-[13px] text-zinc-400 mt-0.5">
                        Senior Nutritionist
                      </p>
                      <p className="text-[13px] text-zinc-500 mt-0.5">
                        Dietary & Wellness Division
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="pb-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                        Description
                      </th>
                      <th className="pb-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] text-right">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-6">
                        <p className="text-zinc-200 font-semibold text-[15px]">
                          Professional Consultation Service
                        </p>
                        <p className="text-zinc-500 text-[13px] mt-1">
                          45-minute dietary assessment session
                        </p>
                      </td>
                      <td className="py-6 text-right text-zinc-200 font-semibold text-[15px]">
                        $29.99
                      </td>
                    </tr>
                    <tr>
                      <td className="py-6">
                        <p className="text-zinc-200 font-semibold text-[15px]">
                          Platform Fee
                        </p>
                        <p className="text-zinc-500 text-[13px] mt-1">
                          Service processing & secure hosting
                        </p>
                      </td>
                      <td className="py-6 text-right text-zinc-200 font-semibold text-[15px]">
                        $5.00
                      </td>
                    </tr>
                    <tr>
                      <td className="pt-6 pb-2">
                        <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.1em]">
                          Internal: Expert Earnings
                        </p>
                      </td>
                      <td className="pt-6 pb-2 text-right text-zinc-500 font-medium text-[13px]">
                        $24.99
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Summary */}
            <div className="bg-[#2D3449] p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-white/[0.02]">
              <div>
                <p className="text-[10px] text-zinc-400 font-bold tracking-[0.2em] uppercase mb-2">
                  Payment Method
                </p>
                <div className="flex items-center gap-2 text-zinc-300 text-[15px] font-medium">
                  <CreditCard className="w-5 h-5 text-zinc-400" />
                  Visa ending in 4242
                </div>
              </div>

              <div className="text-right">
                <p className="text-blue-400 font-bold text-[12px] tracking-[0.1em] mb-1">
                  Total Amount Charged
                </p>
                <p className="text-[32px] font-bold text-white tracking-tight">
                  $29.99
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
