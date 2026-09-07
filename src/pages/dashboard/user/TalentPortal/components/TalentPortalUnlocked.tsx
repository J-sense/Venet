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
  Phone
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
            {/* Profile Header with Abstract Wave Aesthetic Cover */}
            <Card className="bg-[#0D1526] border-[#FFFFFF0F] overflow-hidden p-0">
              {/* Full-width Abstract Wave Cover Header */}
              <div className="h-32 bg-[#091322] relative rounded-t-xl">
                {/* Background Layer with Overflow Hidden */}
                <div className="absolute inset-0 overflow-hidden rounded-t-xl pointer-events-none">
                  {/* Abstract Geometric Wave SVG */}
                  <svg
                    className="w-full h-full object-cover opacity-40"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="wave-grad-1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3B82F6"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="50%"
                          stopColor="#8B5CF6"
                          stopOpacity="0.6"
                        />
                        <stop
                          offset="100%"
                          stopColor="#06B6D4"
                          stopOpacity="0.8"
                        />
                      </linearGradient>
                      <linearGradient
                        id="wave-grad-2"
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#1E40AF"
                          stopOpacity="0.9"
                        />
                        <stop
                          offset="100%"
                          stopColor="#3B82F6"
                          stopOpacity="0.3"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#wave-grad-1)"
                      d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,208C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    />
                    <path
                      fill="url(#wave-grad-2)"
                      d="M0,96L60,112C120,128,240,160,360,165.3C480,171,600,149,720,138.7C840,128,960,128,1080,144C1200,160,1320,192,1380,208L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                    />
                  </svg>

                  {/* Subtle Ambient Glow */}
                  <div className="absolute top-0 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

                  {/* Dark Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1526] via-transparent to-black/20" />
                </div>

                {/* Glassmorphic Floating Profile Avatar Frame */}
                <div className="absolute -bottom-14 left-8 w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-[3px] bg-gradient-to-b from-white/40 via-blue-500/40 to-indigo-600/50 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 z-20 group">
                  {/* Glowing Ambient Halo behind avatar */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500/30 via-cyan-400/20 to-purple-500/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Inner Glass Container */}
                  <div className="w-full h-full bg-[#0B132B]/90 rounded-[21px] overflow-hidden relative flex items-center justify-center border border-white/10 shadow-inner">
                    {profileData?.image ? (
                      <img
                        src={profileData.image}
                        alt={
                          [profileData?.first_name, profileData?.last_name]
                            .filter(Boolean)
                            .join(" ") || "Profile"
                        }
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-5xl select-none">👨‍💼</span>
                    )}
                  </div>

                  {/* Floating Verified Status Badge */}
                  <div
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#0D1526] p-1 shadow-xl z-30 flex items-center justify-center ring-2 ring-[#0D1526]"
                    title="Verified Candidate"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md">
                      <CheckCircle2 className="w-4 h-4 text-white stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="pt-20 pb-8 px-8">
                <div className="pl-2">
                  <h1 className="text-3xl font-bold text-white">
                    {[profileData?.first_name, profileData?.last_name]
                      .filter(Boolean)
                      .join(" ") || "User Profile"}
                  </h1>

                  <p className="text-blue-400 text-lg mt-1">
                    {profileData?.specialty || "Professional"}
                    {profileData?.years_of_experience
                      ? ` • ${profileData.years_of_experience} Years Experience`
                      : ""}
                  </p>

                  {/* Location, Open to & Hourly Rate */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">
                    {(profileData?.location || profileData?.address1) && (
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        {profileData?.location || profileData?.address1}
                      </div>
                    )}

                    {profileData?.open_to && (
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <Briefcase className="w-4 h-4" />
                        {profileData.open_to === "AVAILABLE"
                          ? "Open to opportunities"
                          : profileData.open_to}
                      </div>
                    )}

                    {profileData?.hourly_rate && (
                      <div className="flex items-center gap-1.5 text-amber-400">
                        <DollarSign className="w-4 h-4" />$
                        {profileData.hourly_rate} / hr
                      </div>
                    )}

                    {profileData?.email && (
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <Mail className="w-4 h-4 text-blue-400" />
                        {profileData.email}
                      </div>
                    )}

                    {(profileData?.phone1 || profileData?.phone_number) && (
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <Phone className="w-4 h-4 text-blue-400" />
                        {profileData?.phone1 || profileData?.phone_number}
                      </div>
                    )}
                  </div>

                  {/* Skills & Certifications */}
                  {profileData?.skills && profileData.skills.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-[11px] text-[#62748E] font-semibold mb-3 uppercase tracking-widest">
                        SKILLS & CERTIFICATIONS
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map(
                          (skill: string, index: number) => {
                            const badgeStyles = [
                              "bg-[#8E51FF26] hover:bg-[#8E51FF30] text-[#C4B4FF] border-[#8E51FF40]",
                              "bg-[#F59E0B26] hover:bg-[#F59E0B30] text-[#FCD34D] border-[#F59E0B40]",
                              "bg-[#EA580C26] hover:bg-[#EA580C30] text-[#FDBA74] border-[#EA580C40]",
                              "bg-[#3B82F626] hover:bg-[#3B82F630] text-[#93C5FD] border-[#3B82F640]",
                              "bg-[#10B98126] hover:bg-[#10B98130] text-[#6EE7B7] border-[#10B98140]",
                            ];
                            const style =
                              badgeStyles[index % badgeStyles.length];
                            return (
                              <Badge
                                key={index}
                                className={`${style} border px-4 py-1.5 text-sm transition-colors`}
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
                    <div className="mt-8">
                      <h3 className="text-[11px] text-[#62748E] font-semibold mb-3 uppercase tracking-widest">
                        ABOUT
                      </h3>
                      <p className="text-[#CAD5E2] leading-relaxed text-[15px]">
                        {profileData.bio}
                      </p>
                    </div>
                  )}

                  {/* Education & Current Organization */}
                  {(profileData?.educational_institute ||
                    profileData?.current_organization) && (
                      <div className="mt-8 flex flex-wrap gap-6 text-sm text-[#CAD5E2]">
                        {profileData.current_organization && (
                          <div>
                            <span className="text-[11px] text-[#62748E] font-semibold block uppercase tracking-widest mb-1">
                              CURRENT ORGANIZATION
                            </span>
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-blue-400" />
                              {profileData.current_organization}
                            </div>
                          </div>
                        )}
                        {profileData.educational_institute && (
                          <div>
                            <span className="text-[11px] text-[#62748E] font-semibold block uppercase tracking-widest mb-1">
                              EDUCATION
                            </span>
                            <div className="flex items-center gap-2">
                              <GraduationCap className="w-4 h-4 text-blue-400" />
                              {profileData.educational_institute}
                              {profileData.program_degree &&
                                ` (${profileData.program_degree})`}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Jobs */}

            <CardContent className="px-0 sm:px-6">
              <div className="flex justify-between items-center mb-6 w-full">
                <h2 className="text-xl sm:text-2xl font-semibold">
                  Recommended Jobs
                </h2>
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
