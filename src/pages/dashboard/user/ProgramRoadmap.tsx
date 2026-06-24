import { Button } from "@/components/ui/button";
import AssessmentCompleteModal from "@/pages/dashboard/user/AssessmentComplete";
import { ChevronDown, ChevronUp, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const programTitles: Record<string, string> = {
  "mental-health": "Mental Health",
  "health-&-fitness": "Health & Fitness",
};

const roadmapData = [
  {
    week: 1,
    title: "Foundation & Baseline",
    tasks: [
      "Complete body composition assessment",
      "Set up nutrition tracking app",
      "Establish sleep schedule",
      "Begin daily 20-min walks",
      "Log baseline measurements",
    ],
  },
  {
    week: 2,
    title: "Building Habits",
    tasks: [
      "Follow custom meal plan for 5 days",
      "Complete 3 strength training sessions",
      "Drink 2 liters of water daily",
      "Read provided material on macros",
      "End-of-week reflection journal",
    ],
  },
  {
    week: 3,
    title: "Intensity Ramp-Up",
    tasks: [
      "Increase daily walk to 30 mins",
      "Add 1 HIIT session",
      "Meal prep for the entire week",
      "Try one new healthy recipe",
      "Check-in with expert coach",
    ],
  },
  {
    week: 4,
    title: "Progress Evaluation",
    tasks: [
      "Retake body composition assessment",
      "Compare baseline measurements",
      "Review habit consistency",
      "Set goals for next phase",
      "Celebrate milestone completion!",
    ],
  },
];

export default function ProgramRoadmap() {
  const { id } = useParams();
  // const navigate = useNavigate();
  const title = programTitles[id || ""] || "Program";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({
    1: true,
  });
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(
    {},
  );

  const totalTasks = roadmapData.reduce(
    (acc, week) => acc + week.tasks.length,
    0,
  );
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  const isFullyCompleted = completedCount === totalTasks;

  const toggleWeek = (week: number) => {
    setExpandedWeeks((prev) => ({ ...prev, [week]: !prev[week] }));
  };

  const toggleTask = (week: number, taskIndex: number) => {
    const taskId = `${week}-${taskIndex}`;
    setCompletedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  // Auto-expand next week when current week is completed (optional nice touch)
  useEffect(() => {
    if (isFullyCompleted) return;

    const currentWeek = Math.floor(completedCount / 5) + 1;
    if (currentWeek <= 4 && !expandedWeeks[currentWeek]) {
      setExpandedWeeks((prev) => ({ ...prev, [currentWeek]: true }));
    }
  }, [completedCount, expandedWeeks, isFullyCompleted]);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-['Inter'] max-w-7xl mx-auto pb-32">
      {/* Header section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm mb-2 uppercase tracking-wider">
          <Zap className="w-4 h-4 fill-blue-500 text-blue-500" />
          Re-Generate
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold mb-2">
              Your <span className="text-blue-500">{title}</span> Roadmap
            </h1>
            <p className="text-[#90A1B9] text-sm">
              Personalized 4-week action plan tailored to your assessment
              responses.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              Auto generate
            </button>
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              View Experts
            </button>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4 text-sm">
          <span className="text-slate-300 font-medium">Overall Progress</span>
          <span className="text-blue-400 font-medium">
            {completedCount}/{totalTasks} tasks - {progressPercent}%
          </span>
        </div>
        <div className="w-full bg-[#1E293B] h-2.5 rounded-full mb-6">
          <div
            className="bg-[#3B82F6] h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex flex-wrap gap-6 text-xs text-[#90A1B9]">
          <span className="flex items-center gap-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            4 weeks
          </span>
          <span className="flex items-center gap-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            {totalTasks} tasks
          </span>
          <span className="flex items-center gap-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Daily check-ins
          </span>
          <span className="flex items-center gap-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="7" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
            Certificate on completion
          </span>
        </div>
      </div>

      {/* Weekly Sections */}
      <div className="space-y-4">
        {roadmapData.map((weekData) => {
          const isExpanded = expandedWeeks[weekData.week] ?? false;
          const weekCompletedTasks = weekData.tasks.filter(
            (_, idx) => completedTasks[`${weekData.week}-${idx}`],
          ).length;

          return (
            <div
              key={weekData.week}
              className="bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden transition-all duration-300"
            >
              {/* Accordion Header */}
              <div
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#151E2E] transition-colors"
                onClick={() => toggleWeek(weekData.week)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1A2744] flex items-center justify-center text-blue-400 font-medium text-sm border border-blue-900/50">
                    W{weekData.week}
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-[15px]">
                      Week {weekData.week}: {weekData.title}
                    </h3>
                    <p className="text-[#62748E] text-xs mt-1">
                      {weekCompletedTasks}/{weekData.tasks.length} tasks
                      completed
                    </p>
                  </div>
                </div>
                <div className="text-[#62748E]">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-[#1E293B]">
                  <div className="space-y-4 ml-14">
                    {weekData.tasks.map((task, idx) => {
                      const taskId = `${weekData.week}-${idx}`;
                      const isChecked = !!completedTasks[taskId];

                      return (
                        <label
                          key={idx}
                          className="flex items-start gap-3 cursor-pointer group"
                          onClick={() => toggleTask(weekData.week, idx)}
                        >
                          <div
                            className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-all ${isChecked ? "bg-blue-600 border-blue-600" : "bg-[#19273C] border-[#2A374A] group-hover:border-blue-500"}`}
                          >
                            {isChecked && (
                              <svg
                                className="w-3.5 h-3.5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <span
                            className={`text-sm transition-colors ${isChecked ? "text-slate-400 line-through" : "text-slate-200 group-hover:text-white"}`}
                          >
                            {task}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Section */}
      {isFullyCompleted && (
        <div className="mt-12 bg-[#155DFC1A] border border-[#155DFC4D] rounded-3xl p-10 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-6">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-medium mb-2">Roadmap Complete!</h2>
          <p className="text-[#90A1B9] mb-8 max-w-md mx-auto">
            You've completed all tasks. Your certificate is ready.
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#155DFC] hover:bg-blue-700 text-white px-10 py-6 rounded-2xl font-normal text-lg "
          >
            View Certificate
          </Button>
        </div>
      )}

      {/* Floating Save Button */}
      {!isFullyCompleted && (
        <Button className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
          Save Progress
        </Button>
      )}

      {/* Assessment Complete Modal */}
      <AssessmentCompleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
