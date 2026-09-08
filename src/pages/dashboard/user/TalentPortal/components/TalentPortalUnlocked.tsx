// /home/workdir/artifacts/TalentPortalUnlocked.tsx
"use client";

import { recommendedJobs } from "../data/talentPortalData";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllResumeListQuery, useGetTalentPortalUserProfileQuery } from "@/redux/features/userDashboard/userProfile.api";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import CoverLetterGeneratorCard from "./CoverLetterGeneratorCard";
import ResumeListCard from "./ResumeListCard";
import UpdateResumeAIModal from "./UpdateResumeAIModal";

export default function TalentPortalUnlocked() {
  const [isOpenAiModal, setIsOpenAiModal] = useState(false);
  const { data: getAllGenerateResume } = useGetAllResumeListQuery(undefined);
  const { data: talentPortalProfile } =
    useGetTalentPortalUserProfileQuery(undefined);
  console.log(talentPortalProfile, "talentPortalProfile");
  console.log(getAllGenerateResume, "getAllGenerateResume");
  const profileData = talentPortalProfile?.data;

  return (
    <div className="min-h-screen bg-[#030712] text-white w-full relative overflow-hidden md:p-8">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* LEFT SIDE - 70% */}
          <div className="xl:col-span-8 space-y-6">
            {/* Profile Header with Glassmorphic Aesthetic */}
            <Card className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 hover:border-blue-500/30 rounded-3xl overflow-hidden p-0 shadow-2xl transition-all duration-300 relative">
              {/* Fully Transparent Sleek Cover Header */}
              <div className="h-32 sm:h-36 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent relative">
                {/* Cover Content Text (Right Side / Main Area) */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-8 text-right z-10 max-w-[200px] xs:max-w-[260px] sm:max-w-md">
                  <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] sm:text-xs font-semibold mb-1 backdrop-blur-md">
                    <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                    <span>vNET Career Portal</span>
                  </div>
                  <h2 className="text-xs xs:text-sm sm:text-lg font-bold text-white tracking-tight">
                    AI Talent & Career Hub
                  </h2>
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 leading-relaxed line-clamp-2 hidden xs:block">
                    Showcase certified skills, generate AI resumes, and connect with top tech opportunities.
                  </p>
                </div>

                {/* Simple & Clean Rounded Profile Picture Avatar with Glass Transparency */}
                <div className="absolute -bottom-10 sm:-bottom-12 left-4 sm:left-8 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl z-20 relative">
                  <div className="w-full h-full rounded-full overflow-hidden bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10">
                    {profileData?.image ? (
                      <img
                        src={profileData.image}
                        alt={
                          [profileData?.first_name, profileData?.last_name]
                            .filter(Boolean)
                            .join(" ") || "Profile"
                        }
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <span className="text-4xl sm:text-5xl select-none">👨‍💼</span>
                    )}
                  </div>

                  {/* Verified Candidate Badge Overlay */}
                  <div
                    className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0D1526]/80 backdrop-blur-md p-0.5 border border-white/15 shadow-md z-30 flex items-center justify-center"
                    title="Verified Candidate"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center text-white">
                      <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-8">
                <div className="pl-2 space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                      {[profileData?.first_name, profileData?.last_name]
                        .filter(Boolean)
                        .join(" ") || "User Profile"}
                    </h1>

                    <p className="text-blue-400 text-lg font-semibold mt-1">
                      {profileData?.specialty || "Professional"}
                      {profileData?.years_of_experience
                        ? ` • ${profileData.years_of_experience} Years Experience`
                        : ""}
                    </p>
                  </div>

                  {/* Location, Open to & Hourly Rate */}
                  <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                    {(profileData?.location || profileData?.address1) && (
                      <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-xl text-gray-300">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span>{profileData?.location || profileData?.address1}</span>
                      </div>
                    )}

                    {profileData?.open_to && (
                      <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl text-emerald-400 font-semibold">
                        <Briefcase className="w-4 h-4" />
                        <span>
                          {profileData.open_to === "AVAILABLE"
                            ? "Open to opportunities"
                            : profileData.open_to}
                        </span>
                      </div>
                    )}

                    {profileData?.hourly_rate && (
                      <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 rounded-xl text-amber-400 font-semibold">
                        <DollarSign className="w-4 h-4" />
                        <span>${profileData.hourly_rate} / hr</span>
                      </div>
                    )}

                    {profileData?.email && (
                      <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-xl text-gray-300">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span>{profileData.email}</span>
                      </div>
                    )}

                    {(profileData?.phone1 || profileData?.phone_number) && (
                      <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-xl text-gray-300">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <span>{profileData?.phone1 || profileData?.phone_number}</span>
                      </div>
                    )}
                  </div>

                  {/* Skills & Certifications */}
                  {profileData?.skills && profileData.skills.length > 0 && (
                    <div className="pt-2">
                      <h3 className="text-[11px] text-gray-400 font-semibold mb-3 uppercase tracking-widest">
                        SKILLS & CERTIFICATIONS
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map(
                          (skill: string, index: number) => {
                            const badgeStyles = [
                              "bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border-purple-500/30",
                              "bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30",
                              "bg-orange-500/15 hover:bg-orange-500/25 text-orange-300 border-orange-500/30",
                              "bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border-blue-500/30",
                              "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/30",
                            ];
                            const style =
                              badgeStyles[index % badgeStyles.length];
                            return (
                              <Badge
                                key={index}
                                className={`${style} border px-4 py-1.5 text-xs font-semibold rounded-xl transition-all shadow-sm`}
                              >
                                {skill}
                              </Badge>
                            );
                          },
                        )}
                      </div>
                    </div>
                  )}

                  {/* About */}
                  {profileData?.bio && (
                    <div className="pt-2">
                      <h3 className="text-[11px] text-gray-400 font-semibold mb-3 uppercase tracking-widest">
                        ABOUT
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-[15px]">
                        {profileData.bio}
                      </p>
                    </div>
                  )}

                  {/* Education & Current Organization */}
                  {(profileData?.educational_institute ||
                    profileData?.current_organization) && (
                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        {profileData.current_organization && (
                          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 space-y-1">
                            <span className="text-[11px] text-gray-400 font-semibold block uppercase tracking-widest">
                              CURRENT ORGANIZATION
                            </span>
                            <div className="flex items-center gap-2 text-white font-medium">
                              <Building2 className="w-4 h-4 text-blue-400" />
                              <span>{profileData.current_organization}</span>
                            </div>
                          </div>
                        )}
                        {profileData.educational_institute && (
                          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 space-y-1">
                            <span className="text-[11px] text-gray-400 font-semibold block uppercase tracking-widest">
                              EDUCATION
                            </span>
                            <div className="flex items-center gap-2 text-white font-medium">
                              <GraduationCap className="w-4 h-4 text-blue-400" />
                              <span>
                                {profileData.educational_institute}
                                {profileData.program_degree &&
                                  ` (${profileData.program_degree})`}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Jobs */}
            <div className="space-y-6 pt-2">
              <div className="flex justify-between items-center w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Recommended Jobs
                </h2>
                <Button
                  variant="link"
                  className="text-blue-400 hover:text-blue-300 px-0 font-semibold flex items-center gap-1 group/btn"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="space-y-4">
                {recommendedJobs.map((job, i) => (
                  <div
                    key={i}
                    className="bg-[#0D1526]/60 backdrop-blur-xl border border-white/10 hover:border-blue-500/30 rounded-3xl p-5 sm:p-6 flex flex-col gap-4 sm:gap-5 transition-all duration-300 group relative overflow-hidden shadow-xl"
                  >
                    {/* Ambient Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-600/20 transition-all" />

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 relative z-10">
                      <div className="flex gap-3 sm:gap-4">
                        {/* Company Logo Avatar */}
                        <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center font-bold text-emerald-400 border border-emerald-500/30 shadow-md">
                          TC
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-base sm:text-lg tracking-tight group-hover:text-blue-400 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-gray-400 text-xs sm:text-sm font-medium">
                            {job.company}
                          </p>
                        </div>
                      </div>

                      {/* Match Pill */}
                      <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{job.match} match</span>
                      </div>
                    </div>

                    {/* Metadata Row */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-gray-400 text-xs sm:text-sm relative z-10">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <MapPin className="w-4 h-4 text-blue-400" /> {job.location}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <DollarSign className="w-4 h-4 text-amber-400" /> {job.salary}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Clock className="w-4 h-4 text-purple-400" /> {job.time}
                      </div>
                      <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[11px] sm:text-xs text-blue-300 font-semibold shrink-0">
                        {job.type}
                      </span>
                    </div>

                    {/* Action Button */}
                    <div className="relative z-10 pt-1">
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl px-6 py-5 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/35 transition-all group/btn w-full sm:w-fit">
                        <span>Apply Now</span>
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - 30% */}
          <div className="xl:col-span-4 space-y-6">
            {/* Resume Builder */}
            <Card className="bg-gradient-to-b from-[#0D1526] via-[#091322] to-[#0D1526] border border-blue-500/20 hover:border-blue-500/40 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 group shadow-xl shadow-black/30">
              {/* Subtle Ambient Background Glows */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-600/20 transition-all" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-600/20 transition-all" />

              <CardContent className="p-0 relative z-10 space-y-5">
                {/* Header Row: Icon & AI Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center shadow-md shadow-blue-950/40 group-hover:scale-105 transition-transform">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Powered</span>
                  </span>
                </div>

                {/* Text Content */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-white text-lg tracking-tight">
                    Resume Builder
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Create a professional resume showcasing your vNET certifications and achievements.
                  </p>
                </div>

                {/* Button */}
                <Button
                  onClick={() => setIsOpenAiModal(true)}
                  className="w-full rounded-xl py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/35 transition-all group/btn"
                >
                  <Sparkles className="w-4 h-4 text-blue-200" />
                  <span>Build Resume</span>
                  <ArrowRight className="w-4 h-4 text-blue-200 group-hover/btn:translate-x-1 transition-transform" />
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
            <CoverLetterGeneratorCard />

            {/* Generated Resumes List */}
            <ResumeListCard />

            {/* Activity This Week */}
          </div>
        </div>
      </div>
    </div>
  );
}
