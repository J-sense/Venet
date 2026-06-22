import { CheckCircle2 } from "lucide-react";

interface TaskItemProps {
  title: string;
  category: string;
  date: string;
}

export function TaskItem({ title, category, date }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#19273C] rounded-xl hover:bg-[#1E293B]/60 transition-colors">
      <div className="flex items-center gap-4">
        {/* Blue check icon box */}
        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-white" />
        </div>

        {/* Task Title & Category */}
        <div className="flex flex-col">
          <span className="text-white font-medium">{title}</span>
          <span className="text-[#90A1B9] text-sm">{category}</span>
        </div>
      </div>

      {/* Due Date on the right */}
      <span className="text-[#90A1B9] text-sm font-medium">{date}</span>
    </div>
  );
}

// Usage in your dashboard:
export function UpcomingTasksList() {
  const tasks = [
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
    { title: "Set Weekly Goals", category: "Mental Health", date: "Jun 12" },
  ];

  return (
    <div className="bg-[#0D1526] border border-[#FFFFFF0F] rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Upcoming Tasks</h2>
      <div className="space-y-3">
        {tasks.map((task, i) => (
          <TaskItem key={i} {...task} />
        ))}
      </div>
    </div>
  );
}
