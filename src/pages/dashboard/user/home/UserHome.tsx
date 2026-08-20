import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExpertTrainerCard } from "@/components/ui/ExpertTrainnerCard";
import { STartProgramCard } from "@/components/ui/ProgramCard";
import { StatCard } from "@/components/ui/StatCard";
import { TaskItem } from "@/components/ui/TaskItem";
import { CertificateSection } from "@/components/user/Overview/CertificateSection";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

import { trainers, upcomingTasks } from "./data/userHomeData";
import { useMyPurchaseProgrammeQuery } from "@/redux/features/userDashboard/userProfile.api";

export default function UserHome() {
  const navigate = useNavigate();
  const { data: myPurchaseProgramme } = useMyPurchaseProgrammeQuery(undefined);
  console.log(
    myPurchaseProgramme,
    "jfdskljfdsjkdfkdljfdklfjkdsjfdsjfksdjfldjfklsf",
  );
  const handleStartProgram = (slug: string) => {
    navigate(`/dashboard/user/program/${slug}`);
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
              Welcome back, John!
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
              value="2"
              icon={<TrendingUp className="text-blue-400" />}
            />
            <StatCard
              title="Tasks Completed"
              value="0"
              icon={<CheckCircle2 className="text-green-400" />}
            />
            <StatCard
              title="Certificates"
              value="0"
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

            {/* Upcoming Tasks */}
            <section>
              <Card className="bg-[#0D1526] border border-white/5 rounded-3xl p-2 md:p-8 relative overflow-hidden shadow-2xl shadow-black/40 group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-inner">
                      <Calendar className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text:xl md:text-2xl font-bold text-white tracking-tight leading-tight">
                        Upcoming Tasks
                      </h2>
                      <p className="text-sm md:text-sm text-zinc-400 mt-0.5 font-medium">
                        Your schedule for this week
                      </p>
                    </div>
                  </div>
                  {/* <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors flex items-center gap-1 group/btn">
                    View Calendar{" "}
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button> */}
                </div>

                <div className="space-y-3 relative z-10">
                  {upcomingTasks.map((task, index) => (
                    <div
                      key={index}
                      className="transition-transform duration-300 hover:translate-x-1"
                    >
                      <TaskItem
                        title={task.title}
                        category={task.category}
                        date={task.date}
                      />
                    </div>
                  ))}
                  {(!upcomingTasks || upcomingTasks.length === 0) && (
                    <div className="text-center py-10 text-zinc-500 font-medium">
                      You're all caught up! No upcoming tasks.
                    </div>
                  )}
                </div>
              </Card>
            </section>
          </div>

          {/* RIGHT COLUMN (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Recommended Experts */}
            <section className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-white text-lg tracking-tight">
                  Recommended Experts
                </h3>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {trainers.map((trainer, index) => (
                  <div
                    key={index}
                    className="transition-transform duration-300 hover:-translate-y-1"
                  >
                    <ExpertTrainerCard {...trainer} />
                  </div>
                ))}
              </div>
            </section>

            <CertificateSection />

            {/* Unlock Talent Portal CTA */}
            <Card className="relative overflow-hidden border border-white/10 rounded-2xl group shadow-2xl shadow-blue-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1D4ED8] via-[#2563EB] to-[#4338CA]" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/20 blur-3xl rounded-full group-hover:bg-white/30 transition-colors duration-500" />

              <CardContent className="relative z-10 p-8 flex flex-col items-start justify-between min-h-[220px]">
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md mb-5 border border-white/20 shadow-inner">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    Unlock Talent Portal
                  </h3>
                  <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                    Complete a program to access exclusive career opportunities
                    and professional networking.
                  </p>
                </div>
                <Button className="w-full bg-white text-blue-700 hover:bg-zinc-100 font-bold shadow-lg shadow-black/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
