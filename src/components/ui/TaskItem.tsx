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


