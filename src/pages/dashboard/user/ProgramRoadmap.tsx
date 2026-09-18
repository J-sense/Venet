/* eslint-disable react-hooks/set-state-in-effect */
import { Button } from "@/components/ui/button";
import AssessmentCompleteModal from "@/pages/dashboard/user/AssessmentComplete";
import {
  useGetProgramPlanQuery,
  useSubmitProgramPlanMutation,
  useToggleTaskCompletionMutation,
} from "@/redux/features/userDashboard/userProfile.api";
import { ChevronDown, ChevronUp, Clock, ClipboardList, Loader2, Trophy, Zap, MailCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

const programTitles: Record<string, string> = {
  "mental-health": "Mental Health",
  "health-&-fitness": "Health & Fitness",
};

export default function ProgramRoadmap() {
  const { id } = useParams();
  const { data: planResponse, isLoading } = useGetProgramPlanQuery(id);
  const [submitProgramPlan, { isLoading: isRegenerating }] = useSubmitProgramPlanMutation();
  const [toggleTaskCompletion] = useToggleTaskCompletionMutation();

  // Handle both nested plan structure { data: { plan: {...}, certificate: {...} } } and flat structure
  const rawData = planResponse?.data;
  const planData = rawData?.plan || rawData;
  const certificateData = rawData?.certificate;

  const title = programTitles[id || ""] || "Program";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({
    1: true,
  });
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  // Dynamic weeks from API response
  const weeks: Array<{
    week: number;
    title?: string;
    tasks: Array<{ index?: number; text: string; completed?: boolean }>;
  }> = planData?.weeks || [];

  // Initialize initial completed tasks state from API response when loaded
  useEffect(() => {
    if (planData?.weeks) {
      const initialCompleted: Record<string, boolean> = {};
      planData.weeks.forEach((weekItem: any) => {
        weekItem.tasks?.forEach((task: any, idx: number) => {
          const taskIdx = task.index !== undefined ? task.index : idx;
          const taskId = `${weekItem.week}-${taskIdx}`;
          if (task.completed) {
            initialCompleted[taskId] = true;
          }
        });
      });
      setCompletedTasks(initialCompleted);
    }
  }, [planData]);

  const totalTasks =
    planData?.progress?.total_tasks ||
    weeks.reduce((acc, week) => acc + (week.tasks?.length || 0), 0);

  const completedCount = Object.values(completedTasks).filter(Boolean).length;

  const progressPercent =
    planData?.progress?.percentage !== undefined
      ? Math.round(planData.progress.percentage)
      : totalTasks > 0
        ? Math.round((completedCount / totalTasks) * 100)
        : 0;

  const isFullyCompleted =
    planData?.progress?.is_complete ||
    rawData?.is_complete ||
    (totalTasks > 0 && completedCount === totalTasks);

  const toggleWeek = (week: number) => {
    setExpandedWeeks((prev) => ({ ...prev, [week]: !prev[week] }));
  };

  const toggleTask = async (week: number, taskIndex: number) => {
    const taskId = `${week}-${taskIndex}`;
    const nextStatus = !completedTasks[taskId];

    setCompletedTasks((prev) => ({ ...prev, [taskId]: nextStatus }));

    try {
      await toggleTaskCompletion({
        program_id: id,
        data: {
          week: week,
          task_index: taskIndex,
          completed: nextStatus,
        },
      }).unwrap();
    } catch (error) {
      console.error("Failed to toggle task status:", error);
      setCompletedTasks((prev) => ({ ...prev, [taskId]: !nextStatus }));
    }
  };

  const handleRegenerate = async () => {
    if (!id) return;
    try {
      const formattedAnswers = planData?.answers
        ? Array.isArray(planData.answers)
          ? planData.answers
          : Object.entries(planData.answers).map(([_, answer], index) => ({
            question_id: index + 1,
            answer: answer as string,
          }))
        : [];

      await submitProgramPlan({
        program_id: id,
        data: { answers: formattedAnswers },
      }).unwrap();
    } catch (error: any) {
      if (error?.status == 400 && error?.data?.code == 'PLAN_GENERATION_LIMIT_EXCEEDED') {
        toast.error(error?.data?.details)
      }
      console.error("Failed to regenerate program plan:", error);
    }
  };

  // Auto-expand next week when current week is completed
  useEffect(() => {
    if (isFullyCompleted || totalTasks === 0) return;

    const currentWeek = Math.floor(completedCount / 5) + 1;
    if (currentWeek <= weeks.length && !expandedWeeks[currentWeek]) {
      setExpandedWeeks((prev) => ({ ...prev, [currentWeek]: true }));
    }
  }, [completedCount, expandedWeeks, isFullyCompleted, totalTasks, weeks.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-zinc-400 text-lg">Loading your personalized program roadmap...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 font-['Inter'] max-w-7xl mx-auto pb-32">
      {/* Header section */}
      <div className="mb-8">
        <button
          onClick={handleRegenerate}
          disabled={isRegenerating}
          className="flex items-center gap-2 text-blue-400 font-semibold text-sm mb-2 uppercase tracking-wider hover:text-blue-300 transition-colors disabled:opacity-50"
        >
          {isRegenerating ? (
            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
          ) : (
            <Zap className="w-4 h-4 fill-blue-500 text-blue-500" />
          )}
          {isRegenerating ? "Regenerating..." : "Re-Generate"}
        </button>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold mb-2">
              Your <span className="text-blue-500">{title}</span> Roadmap
            </h1>
            <p className="text-[#90A1B9] text-sm">
              Personalized {planData?.duration_weeks || weeks.length || 4}-week action plan tailored to your assessment
              responses.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50 flex items-center gap-1"
            >
              {isRegenerating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isRegenerating ? "Generating..." : "Auto generate"}
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
          <span className="flex items-center gap-1">
            <Clock size={16} />


            {planData?.duration_weeks || weeks.length || 4} weeks
          </span>
          <span className="flex items-center gap-1">
            <ClipboardList size={16} />
            {totalTasks} tasks
          </span>
          <span className="flex items-center gap-2">
            <MailCheck size={16} />
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
        {weeks.map((weekData) => {
          const isExpanded = expandedWeeks[weekData.week] ?? false;
          const weekTasks = weekData.tasks || [];
          const weekCompletedTasks = weekTasks.filter(
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
                      Week {weekData.week} {weekData.title ? `: ${weekData.title}` : ""}
                    </h3>
                    <p className="text-[#62748E] text-xs mt-1">
                      {weekCompletedTasks}/{weekTasks.length} tasks completed
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
                    {weekTasks.map((taskItem, idx) => {
                      const taskId = `${weekData.week}-${idx}`;
                      const isChecked = !!completedTasks[taskId];
                      const taskText = typeof taskItem === "string" ? taskItem : taskItem.text;

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
                            {taskText}
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
      {
        isFullyCompleted && (
          <div className="mt-12 bg-[#155DFC1A] border border-[#155DFC4D] rounded-3xl p-10 text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-6">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-medium mb-2">Roadmap Complete!</h2>
            <p className="text-[#90A1B9] mb-8 max-w-md mx-auto">
              You've completed all tasks. Your official certificate is ready to view and download.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#155DFC] hover:bg-blue-700 text-white px-8 py-6 rounded-2xl font-normal text-lg cursor-pointer"
              >
                View Certificate Details
              </Button>
              {certificateData?.pdf_url && (
                <a
                  href={certificateData.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-medium text-base transition-colors"
                >
                  Open PDF Directly
                </a>
              )}
            </div>
          </div>
        )
      }

      {/* Floating Save Button */}
      {
        !isFullyCompleted && (
          <Button className=" hidden fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            Save Progress
          </Button>
        )
      }

      {/* Assessment Complete Modal */}
      <AssessmentCompleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        certificate={certificateData}
      />
    </div >
  );
}
