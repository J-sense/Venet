import { Card } from "@/components/ui/card";
import { ProgramCard } from "@/components/ui/ProgramCard";
import { StatCard } from "@/components/ui/StatCard";
import { TaskItem } from "@/components/ui/TaskItem";
import {
  Award,
  CheckCircle2,
  Heart,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";
const upcomingTasks = [
  {
    title: "Complete Health Assessment",
    category: "Health & Fitness",
    date: "Today",
  },
  {
    title: "Watch Introduction Video",
    category: "Career Preparation",
    date: "Tomorrow",
  },
  {
    title: "Set Weekly Goals",
    category: "Mental Health",
    date: "Jun 23", // Updated to reflect current timeline (2026-06-22)
  },
  {
    title: "Initial Consultation Call",
    category: "Health & Fitness",
    date: "Jun 25",
  },
  {
    title: "Update Skill Portfolio",
    category: "Career Preparation",
    date: "Jun 27",
  },
];
export default function ExpertsOverview() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-1">Welcome back, John!</h1>
      <p className="text-zinc-400 mb-6">Here's your progress overview</p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard title="Active Programs" value="2" icon={<TrendingUp />} />
            <StatCard
              title="Tasks Completed"
              value="0"
              icon={<CheckCircle2 />}
            />
            <StatCard title="Certificates" value="0" icon={<Award />} />
          </div>

          {/* My Programs */}
          <section>
            <Card className="bg-[#0F172A] p-4 border-none">
              <h2 className="text-[24px] font-semibold mb-4 text-[#FFFFFF]">
                My Programs
              </h2>
              <div className="space-y-4">
                <ProgramCard
                  title="Health & Fitness"
                  status="Not Started"
                  progress={60}
                  icon={<Heart className="w-6 h-6 text-rose-500" />} // Use the string literal
                />
                <ProgramCard
                  title="Mental Health"
                  status="Not Started"
                  progress={60}
                  icon={<Heart className="w-6 h-6 text-rose-500" />} // Use the string literal
                />
                {/* <ProgramCard title="Mental Health" status="Not Started" /> */}
              </div>
            </Card>
          </section>

          {/* Upcoming Tasks */}
          <section>
            <Card className="bg-[#0F172A] p-4 border-none">
              <h2 className="text-[24px] font-semibold mb-4 text-[#FFFFFF]">
                Upcoming Tasks
              </h2>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <TaskItem
                    key={index}
                    title={task.title}
                    category={task.category}
                    date={task.date}
                  />
                ))}
              </div>
            </Card>
          </section>
        </div>

        {/* RIGHT COLUMN (4 cols) */}
        <div className="lg:col-span-4 space-y-6 bg-red-300">
          {/* <RecommendedExperts />
          <CertificatePlaceholder />
          <UnlockPortalCard /> */}
        </div>
      </div>
    </div>
  );
}
