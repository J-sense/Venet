import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  FileText,
  Globe,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AssessmentModal } from "@/components/assessment";
import HeadingBadge from "@/components/ui/HeadingBadge";

export default function TalentPortalInfoPage() {
  const navigate = useNavigate();
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const COLORS = {
    blue: {
      cardHover: "hover:border-blue-400/40",
      tile: "from-blue-500/35 to-blue-700/15 border-blue-400/30 text-blue-300",
    },
    purple: {
      cardHover: "hover:border-purple-400/40",
      tile: "from-purple-500/35 to-purple-700/15 border-purple-400/30 text-purple-300",
    },
    cyan: {
      cardHover: "hover:border-cyan-400/40",
      tile: "from-cyan-500/35 to-cyan-700/15 border-cyan-400/30 text-cyan-300",
    },
    amber: {
      cardHover: "hover:border-amber-400/40",
      tile: "from-amber-500/35 to-amber-700/15 border-amber-400/30 text-amber-300",
    },
  } as const
  const items = [
    { color: "blue", icon: <span className="text-lg font-bold">AI</span>, title: "Resume Builder", desc: "Automated ATS templates & cover letters" },
    { color: "purple", icon: <Globe className="w-6 h-6" />, title: "Global Hiring", desc: "Recruiter visibility & job matches" },
    { color: "cyan", icon: <Users className="w-6 h-6" />, title: "Expert Coaching", desc: "1-on-1 mentorship & interview prep" },
    { color: "amber", icon: <Zap className="w-6 h-6" />, title: "Roadmap Sync", desc: "Track milestones & progress gains" },
  ] as const;
  const features = [
    {
      icon: <FileText className="w-6 h-6 text-blue-400" />,
      title: "AI-Powered Resume & Cover Letter Builder",
      description:
        "Instantly build ATS-optimized resumes tailored to top-tier global job roles with our automated AI engine.",
      badge: "AI Powered",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-purple-400" />,
      title: "Exclusive Talent Matching",
      description:
        "Get direct recommendations for career opportunities aligned with your program completion credentials and skills.",
      badge: "Direct Hiring",
    },
    {
      icon: <Network className="w-6 h-6 text-cyan-400" />,
      title: "Professional Networking Ecosystem",
      description:
        "Connect with industry leaders, certified mentors, and fellow transformed candidates across the vNXT network.",
      badge: "Global Community",
    },
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: "Verified Credentials & Badges",
      description:
        "Display your official vNXT certificates and achievements to employers with tamper-proof digital verification.",
      badge: "Verified Proof",
    },
    {
      icon: <Target className="w-6 h-6 text-emerald-400" />,
      title: "Tailored Career Roadmaps",
      description:
        "Receive step-by-step milestones to transition smoothly from learning to high-impact professional placement.",
      badge: "Milestones",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-rose-400" />,
      title: "Priority Corporate Recruiter Spotlight",
      description:
        "Talent Portal subscribers get highlighted in candidate pools accessible directly by corporate hiring managers.",
      badge: "Priority Talent",
    },
  ];

  const benefits = [
    "Accelerate your job search with AI-generated resumes & cover letters",
    "Stand out to global recruiters with verified vNXT program certificates",
    "Access exclusive career coaching, interview preps, and mentorship",
    "Unlock high-paying career pathways tailored to your unique strengths",
    "Join a thriving network of high-achieving professionals and experts",
    "Continuous career tracking, skills audit, and growth reviews",
  ];

  const stats = [
    { label: "Career Placement Boost", value: "88%" },
    { label: "ATS Resume Match Rate", value: "99%" },
    { label: "Active Employer Partners", value: "250+" },
    { label: "Average Interview Calls", value: "3.5x" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-28 pb-24 relative overflow-hidden font-['Inter']">
      {/* Dynamic Glassmorphism Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-blue-600/20 via-cyan-500/15 to-purple-600/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-8 pt-4">
          <HeadingBadge icon={<Sparkles className="w-4 h-4 animate-pulse" />} children="Empowering Your Professional Journey" />

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
            Welcome to the <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
              vNXT Talent Portal
            </span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Your gateway to career transformation. Bridge the gap between learning, certified expertise, and high-impact career placement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-2">
            <Button
              onClick={() => navigate("/dashboard/user/talent-portal")}
              className="w-full sm:w-auto bg-gradient-to-b from-[#007AFF] to-[#0B60BD] text-white px-9 py-7 rounded-full font-bold text-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.35),0_4px_15px_rgba(0,122,255,0.3)] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] transition-all duration-200 cursor-pointer select-none active:scale-[0.97]"
            >
              Access Talent Portal <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
            <Button
              onClick={() => setIsAssessmentOpen(true)}
              className="w-full sm:w-auto bg-white/5 text-white border border-white/20 px-8 py-7 rounded-full font-semibold text-lg backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.35)] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] transition-all duration-300 cursor-pointer select-none"
            >
              Take Career Assessment
            </Button>
          </div>

          {/* STATS STRIP */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/10">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-6 rounded-2xl text-center space-y-1 select-none
        bg-gradient-to-b from-[#121B2E]/90 to-[#0A1120]/90 backdrop-blur-md
        border border-white/10
        shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-3px_6px_rgba(0,0,0,0.35)]"
              >
                <div className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT IT IS SECTION */}
        <section className="bg-gradient-to-b from-[#0D1526] via-[#0A101D] to-[#070C16] border border-white/10 rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl shadow-blue-950/20 group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/15 transition-all duration-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20">
                <Rocket className="w-4 h-4" />
                What is the Talent Portal?
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                An All-in-One Career Acceleration Engine
              </h2>
              <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
                The <strong className="text-white font-semibold">vNXT  Talent Portal</strong> is a premium career ecosystem designed to help individuals convert their education, wellness, and skills into tangible professional career success.
              </p>
              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                Whether you are seeking a strategic career pivot, looking to land high-paying roles, or building a standout professional brand, the Talent Portal equips you with AI tools, direct recruiter visibility, and verified credentials.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {items.map((item) => (
                <div
                  key={item.title}
                  className={`group p-6 rounded-2xl text-center space-y-3 select-none
        bg-gradient-to-b from-[#172238] to-[#0F1727]
        border border-white/10 ${COLORS[item.color].cardHover}
        shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-3px_6px_rgba(0,0,0,0.35)]
        transition-all duration-300 hover:-translate-y-1`}
                >
                  <div
                    className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center
          bg-gradient-to-b border ${COLORS[item.color].tile}
          shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.35)]
          transition-transform duration-300 group-hover:scale-110`}
                  >
                    <span className="flex items-center justify-center drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]">
                      {item.icon}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-base [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE FEATURES GRID */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-400/10 border border-blue-400/20">
              <TrendingUp className="w-4 h-4" />
              Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Powerful Features Built for Career Success
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              Everything you need to showcase your talent and secure high-impact roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                className="group relative overflow-hidden
        bg-gradient-to-b from-[#121B2E] to-[#0A101D]
        border border-white/10 hover:border-blue-400/40
        shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-3px_6px_rgba(0,0,0,0.35)]
        hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-3px_6px_rgba(0,0,0,0.35)]
        transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 p-4">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full select-none
            text-[10px] font-bold uppercase tracking-wider text-blue-300
            bg-gradient-to-b from-blue-500/25 to-blue-700/15
            border border-blue-400/30
            shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.3)]
            [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]"
                  >
                    {feature.badge}
                  </span>
                </div>

                <CardContent className="p-8 space-y-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center select-none
            bg-gradient-to-b from-white/10 to-white/[0.02]
            border border-white/10
            shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-3px_6px_rgba(0,0,0,0.35)]
            text-zinc-300
            transition-all duration-300
            group-hover:scale-110 group-hover:-translate-y-0.5
            group-hover:from-blue-500/30 group-hover:to-blue-700/15
            group-hover:border-blue-400/40 group-hover:text-blue-300
            group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-3px_6px_rgba(0,0,0,0.35)]"
                  >
                    <span className="flex items-center justify-center drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105">
                      {feature.icon}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* WHY SIGN UP / BENEFITS */}
        <section
          className="relative overflow-hidden rounded-3xl p-8 sm:p-14 space-y-12
    bg-gradient-to-r from-[#0D1526] via-[#151D33] to-[#0D1526]
    border border-white/10
    shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-3px_6px_rgba(0,0,0,0.35)]"
        >
          <div className="max-w-3xl space-y-4">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full select-none
        text-purple-300 text-xs font-bold uppercase tracking-widest
        bg-gradient-to-b from-purple-500/25 to-purple-700/15
        border border-purple-400/30
        shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.3)]
        [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]"
            >
              <Star className="w-4 h-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]" />
              Why Join the Talent Portal?
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
              Transform Your Career Potential into Reality
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              Signing up for the Talent Portal gives you a distinct competitive advantage in today's global market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl
          bg-gradient-to-b from-white/[0.06] to-white/[0.02]
          border border-white/10 hover:border-white/20
          shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-3px_6px_rgba(0,0,0,0.3)]
          transition-all duration-300"
              >
                <div
                  className="w-7 h-7 rounded-full shrink-0 mt-0.5 flex items-center justify-center select-none
            bg-gradient-to-b from-emerald-500/35 to-emerald-700/15
            border border-emerald-400/30 text-emerald-300
            shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(0,0,0,0.35)]"
                >
                  <CheckCircle2 className="w-4 h-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]" />
                </div>
                <span className="text-zinc-200 text-base font-medium leading-relaxed">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="text-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-10 sm:p-20 space-y-8 shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight relative z-10">
            Ready to Unlock Your Talent Potential?
          </h2>
          <p className="text-blue-100 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed relative z-10">
            Join thousands of professionals already accelerating their career trajectory with the vNXT Talent Portal.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5 relative z-10">
            <Link to="/dashboard/user/talent-portal">
              <Button className="bg-white text-blue-700 hover:bg-zinc-100 px-10 py-7 rounded-full font-bold text-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-3px_6px_rgba(0,0,0,0.15),0_8px_24px_rgba(0,0,0,0.2)] [text-shadow:0_1px_1px_rgba(255,255,255,0.5)] transition-all cursor-pointer select-none">
                Get Started Now <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <Link to="/programs/all-programs">
              <Button className="bg-blue-950/50 hover:bg-blue-900/70 text-white border border-white/25 px-9 py-7 rounded-full font-semibold text-lg backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.35)] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] transition-all cursor-pointer select-none">
                Browse Programs
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
      />
    </div>
  );
}
