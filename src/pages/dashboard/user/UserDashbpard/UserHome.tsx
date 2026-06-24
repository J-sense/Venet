import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExpertTrainerCard } from "@/components/ui/ExpertTrainnerCard";
import { STartProgramCard } from "@/components/ui/ProgramCard";
import { StatCard } from "@/components/ui/StatCard";
import { TaskItem } from "@/components/ui/TaskItem";
import { CertificateSection } from "@/components/user/Overview/CertificateSection";
import { Award, CheckCircle2, Heart, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";

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
const trainers = [
  {
    name: "Mike Chen",
    title: "Certified Trainer & Nutritionist",
    rating: 4.8,
    reviews: 127,
    price: "$120",
    specialties: ["HIIT Training", "Strength Training"],
    category: "Health & Fitness",
  },
  {
    name: "Sarah Jenkins",
    title: "Yoga & Mindfulness Coach",
    rating: 4.9,
    reviews: 89,
    price: "$95",
    specialties: ["Vinyasa Yoga", "Meditation"],
    category: "Mental Health",
  },
  {
    name: "David Ross",
    title: "Career Strategy Mentor",
    rating: 4.7,
    reviews: 156,
    price: "$150",
    specialties: ["Resume Building", "Interview Prep"],
    category: "Career Preparation",
  },
];

const myPrograms = [
  {
    title: "Health & Fitness",
    status: "Not Started",
    progress: 60,
    icon: <Heart className="w-6 h-6 text-rose-500" />,
  },
  {
    title: "Mental Health",
    status: "Not Started",
    progress: 60,
    icon: <Heart className="w-6 h-6 text-rose-500" />,
  },
];

export default function UserHome() {
  const navigate = useNavigate();

  const handleStartProgram = (title: string) => {
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/dashboard/user/program/${slug}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-1">Welcome back, John!</h1>
      <p className="text-zinc-400 mb-6">Here's your progress overview</p>
      <section className="my-4">
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="Active Programs" value="2" icon={<TrendingUp />} />
          <StatCard title="Tasks Completed" value="0" icon={<CheckCircle2 />} />
          <StatCard title="Certificates" value="0" icon={<Award />} />
        </div>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stats Cards */}

          {/* My Programs */}
          <section>
            <Card className="bg-[#0F172A] p-4 border-none">
              <h2 className="text-[24px] font-semibold mb-4 text-[#FFFFFF]">
                My Programs
              </h2>
              <div className="space-y-4">
                {!myPrograms || myPrograms.length === 0 ? (
                  <div className="text-center py-6 text-zinc-400 bg-black/20 rounded-lg">
                    <p className="mb-2">You don't have any programs yet.</p>
                    <p className="text-sm">
                      Please explore and purchase a program to get started!
                    </p>
                  </div>
                ) : (
                  myPrograms.map((program, index) => (
                    <div key={index} onClick={() => handleStartProgram(program.title)} className="cursor-pointer">
                      <STartProgramCard
                        title={program.title}
                        status={program.status}
                        progress={program.progress}
                        icon={program.icon}
                      />
                    </div>
                  ))
                )}
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
        <div className="lg:col-span-4 space-y-6 ">
          {/* <RecommendedExperts />
          
          <CertificatePlaceholder />
          <UnlockPortalCard /> */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-white">Recommended Experts</h3>
              <button className="text-blue-500 text-sm">View All</button>
            </div>

            <div className="space-y-4">
              {trainers.map((trainer, index) => (
                <ExpertTrainerCard key={index} {...trainer} />
              ))}
            </div>
          </section>
          <CertificateSection />
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-none shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold text-lg mb-2">
                Unlock Talent Portal
              </h3>
              <p className="text-blue-50 text-sm mb-6 opacity-90">
                Complete a program to access career opportunities
              </p>
              <Button className="w-full bg-white text-blue-700 hover:bg-gray-100 font-medium">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
