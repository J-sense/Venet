import { Card } from "@/components/ui/card";
import { TaskItem } from "@/components/ui/TaskItem";
import { Calendar } from "lucide-react";

export interface UpcomingTaskData {
  week?: number;
  index?: number;
  text?: string;
  title?: string;
  completed?: boolean;
}

interface UpcomingTasksCardProps {
  tasks?: UpcomingTaskData[];
}

export function UpcomingTasksCard({ tasks }: UpcomingTasksCardProps) {
  return (
    <Card className="bg-[#0D1526] border border-white/5 rounded-3xl p-2 md:p-8 relative overflow-hidden shadow-2xl shadow-black/40 group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-inner">
            <Calendar className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
              Upcoming Tasks
            </h2>
            <p className="text-sm text-zinc-400 mt-0.5 font-medium">
              Your schedule for this week
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        {tasks && tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={task.index || index}
              className="transition-transform duration-300 hover:translate-x-1"
            >
              <TaskItem
                title={task.text || task.title || "Upcoming Task"}
                category={task.week ? `Week ${task.week}` : "General"}
                date={task.completed ? "Completed" : "Pending"}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-zinc-500 font-medium">
            You're all caught up! No upcoming tasks.
          </div>
        )}
      </div>
    </Card>
  );
}
