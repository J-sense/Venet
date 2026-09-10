import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExpertTrainerCard } from "@/components/ui/ExpertTrainnerCard";
import { STartProgramCard } from "@/components/ui/ProgramCard";
import { StatCard } from "@/components/ui/StatCard";
import { UpcomingTasksCard } from "@/components/ui/UpcomingTasksCard";
import { CertificateSection } from "@/components/user/Overview/CertificateSection";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

import {
  useGetUserDashboardQuery,
  useGetUserProfileQuery,
  useMyPurchaseProgrammeQuery
} from "@/redux/features/userDashboard/userProfile.api";
import { trainers } from "./data/userHomeData";

export default function UserHome() {
  const navigate = useNavigate();
  const { data: userProfileData } = useGetUserProfileQuery(undefined);
  const { data: myPurchaseProgramme } = useMyPurchaseProgrammeQuery(undefined);
  const { data: dashboadData } = useGetUserDashboardQuery(undefined);
  // const { data: getAllCertificate } = useGetAllCertificateQuery(undefined);

  const userName = userProfileData?.data?.first_name
    ? `${userProfileData.data.first_name} ${userProfileData.data.last_name || ""}`.trim()
    : "User";

  const isTalentPortalActive =
    dashboadData?.data?.talent_portal_subscription?.status
    === "ACTIVE";


  const handleStartProgram = (id: string | number) => {
    navigate(`/dashboard/user/program/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white w-full relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              Welcome back, {userName}!
            </h1>
            <p className="text-zinc-400 font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Here's your progress overview
            </p>
          </div>
        </header>

        {/* Quick Stats */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Active Programs"
              value={dashboadData?.data?.summary?.active_programs ?? 0}
              icon={<TrendingUp className="text-blue-400" />}
            />
            <StatCard
              title="Tasks Completed"
              value={
                dashboadData?.data?.summary?.tasks_completed !== undefined
                  ? `${dashboadData.data.summary.tasks_completed} / ${dashboadData.data.summary.total_tasks ?? 0}`
                  : "0 / 0"
              }
              icon={<CheckCircle2 className="text-green-400" />}
            />
            <StatCard
              title="Certificates"
              value={dashboadData?.data?.summary?.certificates ?? 0}
              icon={<Award className="text-purple-400" />}
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* My Programs */}
            <section>
              <Card className="bg-[#0D1526] border border-white/5 rounded-3xl p-2 md:p-8  relative overflow-hidden shadow-2xl shadow-black/40 group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-inner">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text:xl md:text-2xl font-bold text-white tracking-tight leading-tight">
                        My Programs
                      </h2>
                      <p className="text-sm md:text-sm text-zinc-400 mt-0.5 font-medium">
                        Continue where you left off
                      </p>
                    </div>
                  </div>
                  {/* {myPrograms && myPrograms.length > 0 && (
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors flex items-center gap-1 group/btn">
                      View All{" "}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  )} */}
                </div>

                <div className="space-y-4 relative z-10">
                  {!myPurchaseProgramme?.data ||
                    myPurchaseProgramme.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-white/10 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent">
                      <div className="w-16 h-16 bg-[#1A2333] rounded-full flex items-center justify-center mb-4 border border-white/5 shadow-lg">
                        <BookOpen className="w-8 h-8 text-zinc-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        No active programs
                      </h3>
                      <p className="text-sm text-zinc-400 text-center max-w-sm mb-6 leading-relaxed">
                        You haven't enrolled in any programs yet. Explore our
                        catalog to find the perfect fit for your goals.
                      </p>
                      <Link to={"/programs/all-programs"}>
                        <Button className="bg-white text-[#0D1526] hover:bg-zinc-200 font-bold px-8 rounded-xl shadow-xl transition-transform hover:scale-105 active:scale-95">
                          Browse Catalog
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    myPurchaseProgramme.data.map((item: any, index: number) => (
                      <div
                        key={item.id || index}
                        onClick={() =>
                          handleStartProgram(
                            item.program.id ||
                            item.id ||
                            item.program.slug ||
                            item.program.name
                              .toLowerCase()
                              .replace(/\s+/g, "-"),
                          )
                        }
                        className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/10 rounded-2xl"
                      >
                        <STartProgramCard
                          title={item.program.name}
                          status="In Progress"
                          progress={50}
                          icon={<BookOpen className="w-6 h-6 text-blue-400" />}
                        />
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </section>

            {/* Upcoming Tasks Component */}
            <UpcomingTasksCard tasks={dashboadData?.data?.upcoming_tasks} />
          </div>

          {/* RIGHT COLUMN (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Recommended Experts */}
            <section className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-white text-lg tracking-tight">
                  Recommended Experts
                </h3>
                <button
                  onClick={() => navigate("/experts")}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {(dashboadData?.data?.recommended_experts && dashboadData.data.recommended_experts.length > 0
                  ? dashboadData.data.recommended_experts
                  : trainers
                ).map((expert: any, index: number) => {
                  const isApiData = "first_name" in expert;
                  const trainerProps = isApiData
                    ? {
                      id: expert.id,
                      name: `${expert.first_name || ""} ${expert.last_name || ""}`.trim() || "Expert Trainer",
                      title: expert.professional_title || expert.specialty || "Specialist",
                      rating: expert.average_rating ? Number(expert.average_rating) : 5.0,
                      reviews: expert.review_count ?? 0,
                      price: expert.hourly_rate ? `$${expert.hourly_rate}` : "$0.00",
                      specialties: expert.skills && Array.isArray(expert.skills) && expert.skills.length > 0
                        ? expert.skills
                        : [expert.specialty || "Expert"],
                      category: expert.open_to || expert.specialty || "AVAILABLE",
                      image: expert.image,
                    }
                    : expert;

                  return (
                    <div
                      key={expert.id || index}
                      className="transition-transform duration-300 hover:-translate-y-1"
                    >
                      <ExpertTrainerCard {...trainerProps} />
                    </div>
                  );
                })}
              </div>
            </section>

            <CertificateSection />

            {/* Unlock / Access Talent Portal CTA */}
            <Card className="relative overflow-hidden border border-white/10 rounded-2xl group shadow-2xl shadow-blue-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1D4ED8] via-[#2563EB] to-[#4338CA]" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/20 blur-3xl rounded-full group-hover:bg-white/30 transition-colors duration-500" />

              <CardContent className="relative z-10 p-8 flex flex-col items-start justify-between min-h-[220px]">
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md mb-5 border border-white/20 shadow-inner">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    {isTalentPortalActive ? "Talent Portal Active" : "Unlock Talent Portal"}
                  </h3>
                  <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                    {isTalentPortalActive
                      ? "Your subscription is active! Access your exclusive career tools, resume builder, and job opportunities."
                      : "Complete a program to access exclusive career opportunities and professional networking."}
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/dashboard/user/talent-portal")}
                  className="w-full bg-white text-blue-700 hover:bg-zinc-100 font-bold shadow-lg shadow-black/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  {isTalentPortalActive ? "Go to Talent Portal" : "Learn More"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
