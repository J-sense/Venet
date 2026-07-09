import { Heart, Briefcase, GraduationCap } from "lucide-react";

export const upcomingTasks = [
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
    date: "Jun 23",
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

export const trainers = [
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

export const myPrograms = [
  {
    title: "Health & Fitness",
    status: "In Progress",
    progress: 60,
    icon: <Heart className="w-6 h-6 text-rose-500" />,
  },
  {
    title: "Mental Health",
    status: "Not Started",
    progress: 0,
    icon: <Heart className="w-6 h-6 text-purple-400" />,
  },
  {
    title: "Career Accelerator",
    status: "In Progress",
    progress: 35,
    icon: <Briefcase className="w-6 h-6 text-blue-500" />,
  },
  {
    title: "Education Services",
    status: "Completed",
    progress: 100,
    icon: <GraduationCap className="w-6 h-6 text-emerald-500" />,
  },
];
