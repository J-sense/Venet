// /home/workdir/artifacts/TalentPortalUnlocked.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function TalentPortalUnlocked() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* LEFT SIDE - 70% */}
          <div className="xl:col-span-8 space-y-6">
            {/* Profile Header with Top Blue Gradient */}
            <Card className="bg-[#0D1526] border-[#FFFFFF0F] overflow-hidden p-0">
              {/* Full-width Blue Gradient Header */}
              <div className="h-28 bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#1E40AF] relative">
                <div className="absolute -bottom-12 left-8 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-5xl border-[6px] border-[#0D1526] shadow-xl">
                  👨‍💼
                </div>
              </div>

              <CardContent className="pt-16 pb-8 px-8">
                <div className="pl-2">
                  <h1 className="text-3xl font-bold text-white">John Doe</h1>

                  <p className="text-blue-400 text-lg mt-1">
                    Health & Wellness Professional • Career Development
                    Specialist
                  </p>

                  {/* Location & Open to */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <MapPin className="w-4 h-4" />
                      New York, NY
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <Briefcase className="w-4 h-4" />
                      Open to opportunities
                    </div>
                  </div>

                  {/* Skills & Certifications */}
                  <div className="mt-8">
                    <h3 className="text-[11px] text-[#62748E] font-semibold mb-3 uppercase tracking-widest">
                      SKILLS & CERTIFICATIONS
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-[#8E51FF26] hover:bg-[#8E51FF30] text-[#C4B4FF] border border-[#8E51FF40] px-4 py-1.5 text-sm">
                        Mental Health Program
                      </Badge>
                      <Badge className="bg-[#F59E0B26] hover:bg-[#F59E0B30] text-[#FCD34D] border border-[#F59E0B40] px-4 py-1.5 text-sm">
                        Educational Services
                      </Badge>
                      <Badge className="bg-[#EA580C26] hover:bg-[#EA580C30] text-[#FDBA74] border border-[#EA580C40] px-4 py-1.5 text-sm">
                        Career Coaching
                      </Badge>
                    </div>
                  </div>

                  {/* About */}
                  <div className="mt-8">
                    <h3 className="text-[11px] text-[#62748E] font-semibold mb-3 uppercase tracking-widest">
                      ABOUT
                    </h3>
                    <p className="text-[#CAD5E2] leading-relaxed text-[15px]">
                      Passionate health and wellness professional with
                      certifications in mental health programs and fitness
                      coaching. Dedicated to helping individuals achieve their
                      personal and professional goals through evidence-based
                      approaches.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Jobs */}

            <CardContent className="">
              <div className="flex justify-between items-center mb-6 w-full ">
                <h2 className="text-2xl font-semibold">Recommended Jobs</h2>
                <Button
                  variant="link"
                  className="text-blue-400 hover:text-blue-300"
                >
                  View All <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Senior Software Engineer",
                    company: "Tech Corp",
                    salary: "$120k - $150k",
                    match: "95%",
                    type: "Full-time",
                    time: "2d ago",
                    location: "Remote",
                  },
                  {
                    title: "Senior Software Engineer",
                    company: "Tech Corp",
                    salary: "$120k - $150k",
                    match: "95%",
                    type: "Full-time",
                    time: "2d ago",
                    location: "Remote",
                  },
                  {
                    title: "Senior Software Engineer",
                    company: "Tech Corp",
                    salary: "$120k - $150k",
                    match: "95%",
                    type: "Full-time",
                    time: "2d ago",
                    location: "Remote",
                  },
                ].map((job, i) => (
                  <div
                    key={i}
                    className="bg-[#0D1526] border border-[#FFFFFF0F] rounded-2xl p-5 flex flex-col gap-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        {/* Avatar Placeholder */}
                        <div className="w-12 h-12 bg-[#0F1C2E] rounded-lg flex items-center justify-center font-bold text-emerald-400 border border-[#1E293B]">
                          TC
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">
                            {job.title}
                          </h3>
                          <p className="text-[#90A1B9] text-sm">
                            {job.company}
                          </p>
                        </div>
                      </div>

                      {/* Match Pill */}
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1E293B] text-emerald-400 text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {job.match} match
                      </div>
                    </div>

                    {/* Metadata Row */}
                    <div className="flex items-center gap-6 text-[#90A1B9] text-sm">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> {job.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4" /> {job.salary}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> {job.time}
                      </div>
                      <span className="px-3 py-1 bg-[#1E293B] rounded-full text-xs text-white/80">
                        {job.type}
                      </span>
                    </div>

                    {/* Action Button */}
                    <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white w-fit px-6 flex items-center gap-2">
                      Apply Now <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>

          {/* RIGHT SIDE - 30% */}
          <div className="xl:col-span-4 space-y-6">
            {/* Resume Builder */}
            <Card className="bg-[#0D1526] border-[#FFFFFF0F] p-5">
              <CardContent className="p-0">
                {/* Icon at the top */}
                <div className="w-12 h-12 bg-[#0A1A14] border border-[#10B981]/20 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-[#10B981]" />
                </div>

                {/* Text content */}
                <div className="mb-6">
                  <h3 className="font-semibold text-white text-lg">
                    Resume Builder
                  </h3>
                  <p className="text-sm text-[#90A1B9] mt-1 leading-relaxed">
                    Create a professional resume showcasing your vNET
                    certifications and achievements.
                  </p>
                </div>

                {/* Button */}
                <Button className="w-full rounded-full py-6 bg-[#194BFB] hover:bg-[#1D4ED8] text-white font-medium flex items-center justify-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Build Resume
                </Button>
              </CardContent>
            </Card>

            {/* Cover Letter Generator */}
            <Card className="bg-[#0D1526] border-[#FFFFFF0F] p-5">
              <CardContent className="p-0">
                {/* Icon at the top */}
                <div className="w-12 h-12 bg-[#8E51FF1A]  border border-[#8E51FF33]/20 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-[#A684FF] " />
                </div>

                {/* Text content */}
                <div className="mb-6">
                  <h3 className="font-semibold text-white text-lg">
                    Resume Builder
                  </h3>
                  <p className="text-sm text-[#90A1B9] mt-1 leading-relaxed">
                    Create a professional resume showcasing your vNET
                    certifications and achievements.
                  </p>
                </div>

                {/* Button */}
                <Button className="w-full rounded-full py-6 bg-[#194BFB] hover:bg-[#1D4ED8] text-white font-medium flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Generate Letter
                </Button>
              </CardContent>
            </Card>

            {/* Activity This Week */}
          </div>
        </div>
      </div>
    </div>
  );
}
