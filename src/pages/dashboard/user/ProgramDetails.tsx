/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, HeartPulse, Briefcase, GraduationCap } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const programData: Record<string, any> = {
  "mental-health": {
    title: "Mental Health Program",
    icon: <Brain className="w-8 h-8 text-fuchsia-500" />,
    description:
      "Develop emotional wellness with guided practices, expert support, and evidence-based techniques.",
    steps: [
      {
        title: "Mental Wellness Assessment",
        desc: "Evaluate your current mental health and identify areas for growth",
      },
      {
        title: "Personalized Care Plan",
        desc: "Get a customized mental wellness roadmap with daily practices",
      },
      {
        title: "Daily Mindfulness Tasks",
        desc: "Practice meditation, journaling, and stress management techniques",
      },
      {
        title: "Expert Support",
        desc: "Access licensed therapists and mental health professionals",
      },
      {
        title: "Certification",
        desc: "Complete the program and receive your mental wellness certificate",
      },
    ],
  },
  "health-&-fitness": {
    title: "Health & Fitness Program",
    icon: <HeartPulse className="w-8 h-8 text-rose-500" />,
    description:
      "Achieve your physical goals with personalized workout plans, nutrition advice, and expert trainers.",
    steps: [
      {
        title: "Fitness Assessment",
        desc: "Evaluate your physical baseline and set realistic goals",
      },
      {
        title: "Custom Workout Plan",
        desc: "Receive a tailored workout schedule for your fitness level",
      },
      {
        title: "Nutrition Guide",
        desc: "Get personalized meal plans and dietary recommendations",
      },
      {
        title: "Expert Coaching",
        desc: "Work with certified personal trainers for guidance",
      },
      {
        title: "Certification",
        desc: "Complete milestones and earn your fitness certificate",
      },
    ],
  },
  "career-accelerator": {
    title: "Career Accelerator",
    icon: <Briefcase className="w-8 h-8 text-blue-500" />,
    description:
      "Fast-track your professional growth with personalized coaching, resume reviews, and interview prep.",
    steps: [
      {
        title: "Career Assessment",
        desc: "Evaluate your current skills and define your dream career path",
      },
      {
        title: "Profile Optimization",
        desc: "Revamp your resume, LinkedIn, and portfolio to stand out",
      },
      {
        title: "Interview Preparation",
        desc: "Practice with mock interviews and receive expert feedback",
      },
      {
        title: "Networking Strategy",
        desc: "Learn how to connect with industry leaders and find hidden opportunities",
      },
      {
        title: "Certification",
        desc: "Complete the program and earn your career readiness certificate",
      },
    ],
  },
  "education-services": {
    title: "Education Services",
    icon: <GraduationCap className="w-8 h-8 text-emerald-500" />,
    description:
      "Expand your knowledge base with curated courses, skill-building paths, and expert academic guidance.",
    steps: [
      {
        title: "Skills Gap Analysis",
        desc: "Identify the exact skills you need to learn for your goals",
      },
      {
        title: "Custom Learning Path",
        desc: "Get a curated list of courses and materials tailored to you",
      },
      {
        title: "Weekly Milestones",
        desc: "Stay on track with bite-sized weekly learning objectives",
      },
      {
        title: "Expert Mentorship",
        desc: "Access mentors to help you overcome learning hurdles",
      },
      {
        title: "Certification",
        desc: "Pass the final assessment and receive your education certificate",
      },
    ],
  },
};

export default function ProgramDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const program = programData[id || ""] || programData["mental-health"];

  return (
    // min-h-screen keeps it full height; padding scales from 4 to 12
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 lg:p-16 max-w-7xl mx-auto">
      {/* Back Button: Stays consistent, but maybe smaller on mobile */}
      <button
        onClick={() => navigate("/dashboard/user")}
        className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#334155] text-blue-400 px-4 py-2 rounded-full text-sm font-medium transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Header: Centered on mobile, left-aligned on tablet+ */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 text-center md:text-left">
        <div className="text-4xl">{program.icon}</div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          {program.title}
        </h1>
      </div>

      <p className="text-[#9F9FA9] text-sm sm:text-base mb-12 max-w-2xl text-center md:text-left mx-auto md:mx-0">
        {program.description}
      </p>

      {/* How it works */}
      <h2 className="text-lg sm:text-xl font-semibold mb-6">
        How Program Works
      </h2>

      <div className="space-y-4 mb-16">
        {program.steps.map((step: any, index: number) => (
          <div
            key={index}
            className="flex flex-col border-none sm:flex-row items-start sm:items-center gap-4 sm:gap-5 bg-[#0F172A] p-5 rounded-xl border border-[#1E293B]"
          >
            {/* Index badge stays same size to maintain layout harmony */}
            <div className="w-10 h-10 rounded-full bg-[#155DFC] flex items-center justify-center font-bold text-white ">
              {index + 1}
            </div>
            <div>
              <h3 className="text-[#FFFFFF] font-medium mb-0.5">
                {step.title}
              </h3>
              <p className="text-[#9F9FA9] text-xs sm:text-sm">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Start Button: Full width on mobile, auto-width on tablet+ */}
      <Button
        onClick={() => {
          navigate(
            `/dashboard/user/program/${id || "mental-health"}/assessment`,
          );
        }}
        className="w-full md:w-auto bg-[#155DFC] hover:bg-blue-700 !px-10 sm:!px-14 text-white py-4 sm:py-6 rounded-full font-medium flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
      >
        Start Program <ArrowLeft className="w-4 h-4 rotate-180" />
      </Button>
    </div>
  );
}
