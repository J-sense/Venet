import { BookOpen, Brain, Check, Heart } from "lucide-react";

export const programs = [
  {
    title: "Health & Fitness Program",
    desc: "Personalized fitness plans, nutrition guidance, and wellness tracking to help you achieve your health goals.",
    icon: Heart,
    iconColor: "text-red-500",
    benefits: [
      "AI-generated daily workout routines",
      "Customized meal plans and nutrition tracking",
      "Progress monitoring with detailed analytics",
      "Access to fitness experts",
      "Community support and challenges",
    ],
  },
  {
    title: "Mental Health Program",
    desc: "Comprehensive mental wellness support with guided exercises, expert consultations, and daily practices.",
    icon: Brain,
    iconColor: "text-purple-500",
    benefits: [
      "Daily mindfulness and meditation exercises",
      "Stress management techniques",
      "Cognitive behavioral therapy worksheets",
      "Access to licensed therapists",
      "Private journaling and mood tracking",
    ],
  },
  {
    title: "Educational Services Program",
    desc: "Structured learning paths with professional certifications to advance your knowledge and skills.",
    icon: BookOpen,
    iconColor: "text-blue-400",
    benefits: [
      "Curated course library across multiple subjects",
      "Industry-recognized certifications",
      "Interactive learning modules",
      "Expert instructors and mentors",
      "Skill assessments and progress tracking",
    ],
  },
  {
    title: "Career Preparation Program",
    desc: "Complete career development package including resume building, interview prep, and job placement support.",
    icon: Heart, // Placeholder - Replace with preferred icon
    iconColor: "text-green-500",
    benefits: [
      "Professional resume and cover letter templates",
      "Mock interview sessions with feedback",
      "Career roadmap planning",
      "LinkedIn optimization",
      "Job matching and application support",
    ],
  },
];

export const ProgramGrid = () => {
  return (
    <div className="w-full bg-[#030303] py-16 px-6">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {programs.map((program, idx) => {
          const Icon = program.icon;
          return (
            <div
              key={idx}
              className="p-8 bg-zinc-900 rounded-2xl outline outline-2 outline-offset-[-2px] outline-blue-600 flex flex-col"
            >
              <div className="flex gap-4">
                <div className={`size-10 shrink-0 ${program.iconColor}`}>
                  <Icon size={40} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white text-2xl font-medium font-['Inter'] leading-8">
                    {program.title}
                  </h3>
                  <p className="text-zinc-400 text-base font-normal font-['Inter'] leading-6 pt-2">
                    {program.desc}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <div className="p-4 bg-blue-600/10 rounded-[10px] outline outline-1 outline-blue-600/30">
                  <h4 className="text-blue-400 text-lg font-medium font-['Inter'] leading-7">
                    Why This is Recommended
                  </h4>
                  <p className="text-zinc-300 text-sm font-normal font-['Inter'] leading-5 pt-2">
                    Based on your assessment responses, this program aligns well
                    with your goals and interests.
                  </p>
                </div>
              </div>

              <div className="pt-6 flex-grow">
                <h4 className="text-white text-lg font-medium font-['Inter'] leading-7">
                  Benefits
                </h4>
                <div className="pt-1">
                  {program.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 pt-2">
                      <Check className="text-blue-600 size-5 shrink-0" />
                      <span className="text-zinc-300 text-sm font-normal font-['Inter'] leading-5">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 flex justify-between items-center">
                <div>
                  <span className="text-white text-3xl font-normal">
                    $29.99
                  </span>
                  <span className="text-zinc-400 text-base">/month</span>
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button className="flex-1 p-2.5 bg-blue-600/30 rounded-[32px] text-blue-500 text-base font-medium">
                  Add to Cart
                </button>
                <button className="flex-1 p-2.5 bg-blue-600 rounded-[32px] text-white text-base font-medium">
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
