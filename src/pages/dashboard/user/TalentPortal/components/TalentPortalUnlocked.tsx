// /home/workdir/artifacts/TalentPortalUnlocked.tsx
"use client";

import { recommendedJobs } from "../data/talentPortalData";

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
import { useState } from "react";
import UpdateResumeAIModal from "./UpdateResumeAIModal";

export default function TalentPortalUnlocked() {
  const [isOpenAiModal, setIsOpenAiModal] = useState(false);
  const [isCoverLetterExpanded, setIsCoverLetterExpanded] = useState(false);
  const [coverLetterPrompt, setCoverLetterPrompt] = useState("");
  return (
    <div className="min-h-screen bg-[#030712] text-white w-full relative overflow-hidden md:p-8">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full relative z-10">
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

            <CardContent className="px-0 sm:px-6">
              <div className="flex justify-between items-center mb-6 w-full">
                <h2 className="text-xl sm:text-2xl font-semibold">Recommended Jobs</h2>
                <Button
                  variant="link"
                  className="text-blue-400 hover:text-blue-300 px-0"
                >
                  View All <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {recommendedJobs.map((job, i) => (
                  <div
                    key={i}
                    className="bg-[#0D1526] border border-[#FFFFFF0F] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 sm:gap-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                      <div className="flex gap-3 sm:gap-4">
                        {/* Avatar Placeholder */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-[#0F1C2E] rounded-lg flex items-center justify-center font-bold text-emerald-400 border border-[#1E293B]">
                          TC
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-base sm:text-lg">
                            {job.title}
                          </h3>
                          <p className="text-[#90A1B9] text-xs sm:text-sm">
                            {job.company}
                          </p>
                        </div>
                      </div>

                      {/* Match Pill */}
                      <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1E293B] text-emerald-400 text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        {job.match} match
                      </div>
                    </div>

                    {/* Metadata Row */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[#90A1B9] text-xs sm:text-sm">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <MapPin className="w-4 h-4" /> {job.location}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <DollarSign className="w-4 h-4" /> {job.salary}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Clock className="w-4 h-4" /> {job.time}
                      </div>
                      <span className="px-3 py-1 bg-[#1E293B] rounded-full text-[11px] sm:text-xs text-white/80 shrink-0">
                        {job.type}
                      </span>
                    </div>

                    {/* Action Button */}
                    <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white w-full sm:w-fit px-6 flex items-center justify-center gap-2 mt-1 sm:mt-0">
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
                <Button
                  onClick={() => setIsOpenAiModal(true)}
                  className="w-full rounded-full py-6 bg-[#194BFB] hover:bg-[#1D4ED8] text-white font-medium flex items-center justify-center gap-2"
                >
                  <Building2 className="w-4 h-4" />
                  Build Resume
                </Button>
                {isOpenAiModal && (
                  <UpdateResumeAIModal
                    isOpen={isOpenAiModal}
                    onClose={() => setIsOpenAiModal(false)}
                  />
                )}
              </CardContent>
            </Card>

            {/* Cover Letter Generator */}
            <Card className="bg-[#0D1526] border-[#FFFFFF0F] p-5 transition-all duration-300">
              <CardContent className="p-0">
                {/* Icon at the top */}
                <div className="w-12 h-12 bg-[#8E51FF1A]  border border-[#8E51FF33]/20 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-[#A684FF] " />
                </div>

                {/* Text content */}
                <div className="mb-6">
                  <h3 className="font-semibold text-white text-lg">
                    Cover Letter Generator
                  </h3>
                  <p className="text-sm text-[#90A1B9] mt-1 leading-relaxed">
                    AI-powered cover letters tailored to each job application.
                  </p>
                </div>

                {/* Expandable Section */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isCoverLetterExpanded
                      ? "max-h-96 opacity-100 mb-6"
                      : "max-h-0 opacity-0 mb-0"
                  }`}
                >
                  <label className="text-xs text-zinc-400 font-medium mb-2 block uppercase tracking-wider">
                    Job Details
                  </label>
                  <textarea
                    value={coverLetterPrompt}
                    onChange={(e) => setCoverLetterPrompt(e.target.value)}
                    placeholder="Paste the job description or enter key points to include in your cover letter..."
                    className="w-full bg-[#101E2D] border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-[#6a768a] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none h-32"
                  />
                </div>

                {/* Button */}
                <Button
                  onClick={() => {
                    if (isCoverLetterExpanded && coverLetterPrompt.trim()) {
                      alert("Generating AI cover letter...");
                    } else {
                      setIsCoverLetterExpanded(!isCoverLetterExpanded);
                    }
                  }}
                  className={`w-full rounded-full py-6 font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                    isCoverLetterExpanded
                      ? "bg-[#10B981] hover:bg-[#059669] text-white shadow-lg shadow-emerald-900/20"
                      : "bg-[#194BFB] hover:bg-[#1D4ED8] text-white shadow-lg shadow-blue-900/20"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {isCoverLetterExpanded ? "Generate Now" : "Write Cover Letter"}
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
