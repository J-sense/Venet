import { Star, Award, GraduationCap, CheckCircle2, Heart, Shield } from "lucide-react";
import type { Expert } from "../types";

interface ExpertProfileDetailsProps {
  expert: Expert;
}

// Generate specialty-specific profile details to make every expert profile feel unique and realistic
const getSpecialtyDetails = (specialty: Expert['specialty'], name: string) => {
  switch (specialty) {
    case "Health & Fitness":
      return {
        about: `As a dedicated Health & Fitness specialist, I help clients build sustainable habits, optimize their physical performance, and establish a balanced relationship with nutrition and training. My methodology merges exercise science with behavioral coaching to ensure long-term health improvements without extreme restrictions.`,
        achievements: [
          "NASM Certified Personal Trainer",
          "Precision Nutrition Level 2 Coach",
          "Functional Strength Specialist"
        ],
        education: [
          "M.S. in Kinesiology & Exercise Science - University of Michigan, 2017",
          "B.S. in Nutritional Sciences - Penn State University, 2014"
        ],
        certifications: [
          "NASM-CPT",
          "Precision Nutrition L2",
          "FMS (Functional Movement Screen)",
          "CPR/AED Certified"
        ],
        specializations: [
          {
            title: "Strength & Conditioning",
            description: "Customized training programs to increase lean muscle, build absolute strength, and improve durability."
          },
          {
            title: "Nutrition Coaching",
            description: "Science-backed nutritional guidelines, habit-building, and macro tracking tailored to individual goals."
          },
          {
            title: "Mobility & Injury Rehab",
            description: "Corrective exercises and flexibility routines to improve joint health, posture, and recover from strain."
          },
          {
            title: "Habit Transformation",
            description: "Cognitive strategies to break old fitness barriers, overcome plateaus, and build lifetime consistency."
          }
        ],
        reviews: [
          {
            author: "Marcus D.",
            time: "3 days ago",
            rating: 5,
            comment: `${name} completely changed my perspective on fitness. I lost 15 lbs while eating foods I enjoy and feeling stronger than ever. The focus on joint mobility saved my lower back!`
          },
          {
            author: "Emily K.",
            time: "3 weeks ago",
            rating: 5,
            comment: "Extremely knowledgeable. The customized strength progression program is clean, easy to follow, and fits my busy work schedule. Highly recommend!"
          }
        ]
      };

    case "Career Preparation":
      return {
        about: `I specialize in advising high-potential professionals through strategic career shifts, resume refinement, interview readiness, and executive presence development. With a background in talent acquisition, I pull back the curtain on hiring processes to give you an unfair advantage in the competitive job market.`,
        achievements: [
          "Certified Career Services Provider (CCSP)",
          "Certified Professional Resume Writer (CPRW)",
          "Former FAANG Recruiter"
        ],
        education: [
          "M.B.A. in Organizational Behavior - Wharton School, University of Pennsylvania, 2016",
          "B.A. in Communication Studies - Northwestern University, 2013"
        ],
        certifications: [
          "CCSP Certified",
          "CPRW Designation",
          "Myers-Briggs Type Indicator (MBTI) Facilitator",
          "EQ-i 2.0 Emotional Intelligence Coach"
        ],
        specializations: [
          {
            title: "Resume & Portfolio Tuning",
            description: "High-impact storytelling and ATS optimization to secure interviews at top-tier organizations."
          },
          {
            title: "Interview Mastery",
            description: "Mock interviews, behavioral framing (STAR method), and anxiety management for executive roles."
          },
          {
            title: "Salary Negotiation",
            description: "Frameworks to research market values, negotiate stock/bonuses, and confidently state your worth."
          },
          {
            title: "Executive Presence",
            description: "Developing communication clarity, leadership charisma, and professional authority for promotions."
          }
        ],
        reviews: [
          {
            author: "David L.",
            time: "1 week ago",
            rating: 5,
            comment: `Working with ${name} was a turning point. We overhauled my resume and prepped for a Director interview. I landed the role and negotiated an additional $25k in base salary!`
          },
          {
            author: "Sophia V.",
            time: "1 month ago",
            rating: 5,
            comment: "The salary negotiation strategies alone are worth it. Professional, highly tactical, and knows exactly how corporate decision-makers think."
          }
        ]
      };

    case "Educational Services":
      return {
        about: `I provide academic mentorship and structured learning strategies for students aiming to master complex subjects and excel in high-stakes testing. My student-centric pedagogy focuses on developing deep conceptual understanding, effective study habits, and exam confidence.`,
        achievements: [
          "National Board Certified Teacher",
          "Advanced Placement (AP) Curriculum Consultant",
          "1000+ Hours of Academic Mentorship"
        ],
        education: [
          "M.Ed. in Curriculum & Instruction - Boston University, 2018",
          "B.S. in Mathematics & Physics - University of Chicago, 2015"
        ],
        certifications: [
          "NBCT Certification",
          "AP Calculus Board Approved Provider",
          "SAT/ACT Prep Expert Tutor"
        ],
        specializations: [
          {
            title: "STEM Mastering",
            description: "Simplifying complex calculus, physics, and statistics concepts into intuitive mental models."
          },
          {
            title: "Test prep & Strategy",
            description: "Time management, question triage, and mental prep for SAT, ACT, and advanced subject exams."
          },
          {
            title: "College Essay Coaching",
            description: "Brainstorming and editing unique, narrative-driven college essays that stand out to admissions."
          },
          {
            title: "Executive Functioning",
            description: "Guiding students in time management, organization, notes systems, and avoiding procrastination."
          }
        ],
        reviews: [
          {
            author: "Julian T.",
            time: "5 days ago",
            rating: 5,
            comment: `${name} is patient, clear, and explains abstract concepts beautifully. My physics grade went from a C- to an A in just one semester. The study routines are invaluable.`
          },
          {
            author: "Clara M.",
            time: "2 weeks ago",
            rating: 5,
            comment: "Fantastic college essay guidance. My daughter felt supported, clear in her messaging, and got accepted to her first-choice university!"
          }
        ]
      };

    case "Mental Health":
    default:
      return {
        about: `With over 15 years of clinical experience, I specialize in guiding high-performing professionals through stress, burnout, and complex career transitions. My approach integrates evidence-based psychology with customized lifestyle engineering.
        I believe that true stability is not just the absence of illness, but the presence of robust mental and physical resilience. Together, we'll design highly-personalized routines to restore your energy, clarify your goals, and elevate your performance without sacrificing your well-being.`,
        achievements: [
          "ICF Certified Coach (ACC)",
          "Certified Mindfulness Coach",
          "Productivity Consultant"
        ],
        education: [
          "M.A. in Behavioral Psychology - University of Massachusetts, 2018",
          "B.A. in Psychology - Cornell University, 2015"
        ],
        certifications: [
          "ICF-ACC Coach",
          "Certified Deep Work Coach (CDWC)",
          "Energy Management Advisor (EMA)"
        ],
        specializations: [
          {
            title: "Leadership Growth",
            description: "Enhance emotional intelligence and executive presence."
          },
          {
            title: "Stress Resilience",
            description: "Build functional mental frameworks for high-pressure environments."
          },
          {
            title: "Anxiety Management",
            description: "Evidence-based strategies to regulate nervous system responses and triggers."
          },
          {
            title: "Career Transition",
            description: "Navigating pivots with clarity, confidence, and self-understanding."
          }
        ],
        reviews: [
          {
            author: "Kevin S.",
            time: "2 weeks ago",
            rating: 5,
            comment: `${name} helped me finally overcome chronic procrastination. Their systemic approach is brilliant—far more practical than typical therapy. Highly recommend for anyone struggling with consistency.`
          },
          {
            author: "Rachel G.",
            time: "1 month ago",
            rating: 5,
            comment: "The dual focus on work habits and psychology transformed me. They are exactly the coach I've been looking for. Their accountability and frameworks made the difference. Feel energized."
          }
        ]
      };
  }
};

export default function ExpertProfileDetails({ expert }: ExpertProfileDetailsProps) {
  const details = getSpecialtyDetails(expert.specialty, expert.name);

  return (
    <div className="flex flex-col gap-8 text-slate-100">
      {/* 1. Header Profile Card */}
      <div className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden group">
        {/* Decorative Blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start relative z-10">

          {/* Avatar with Ring */}
          <div className="relative flex-shrink-0">
            <img
              src={expert.avatar}
              alt={expert.name}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-slate-800/80 shadow-2xl group-hover:border-[#007AFF] transition-all duration-300"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#007AFF] text-white p-1.5 rounded-full border-2 border-[#0B1220] shadow-lg">
              <Shield className="w-4 h-4 fill-white text-[#007AFF]" />
            </div>
          </div>

          {/* Core Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
                {expert.name}
              </h1>
              <span className="self-center md:self-auto bg-[#007AFF]/15 text-[#3B82F6] text-xs font-semibold px-3 py-1 rounded-full border border-[#3B82F6]/20 w-fit">
                {expert.specialty}
              </span>
            </div>

            <p className="text-[#94A3B8] text-base md:text-lg font-medium mt-1.5">
              {expert.title}
            </p>

            {/* Ratings and Stats */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-sm font-semibold">
              <div className="flex items-center gap-1.5 bg-amber-400/10 text-amber-400 px-3 py-1.5 rounded-xl border border-amber-400/20">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{expert.rating.toFixed(1)} Rating</span>
              </div>
              <div className="text-slate-400 font-medium">
                ({expert.reviewsCount} verified reviews)
              </div>
              <div className="hidden md:block text-slate-600">•</div>
              <div className="text-slate-300 bg-slate-800/50 px-3 py-1.5 rounded-xl border border-slate-700/40">
                8+ years experience
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. About Section */}
      <section className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-3xl p-6 md:p-8 backdrop-blur-md">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#3B82F6]" />
          About {expert.name.split(' ')[0]}
        </h2>
        <p className="text-[#94A3B8] leading-relaxed text-sm md:text-base whitespace-pre-line">
          {details.about}
        </p>
      </ section>

      {/* 3. Achievements & Educations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Achievements Card */}
        <div className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Award className="w-5 h-5 text-[#3B82F6]" />
              Achievements
            </h3>
            <ul className="space-y-4">
              {details.achievements.map((ach, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base font-medium leading-tight">{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Education Card */}
        <div className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <GraduationCap className="w-5 h-5 text-[#3B82F6]" />
              Education
            </h3>
            <div className="space-y-4">
              {details.education.map((edu, idx) => {
                const [degree, institution] = edu.split(" - ");
                return (
                  <div key={idx} className="flex flex-col gap-1">
                    <h4 className="text-sm md:text-base font-bold text-slate-200 leading-snug">
                      {degree}
                    </h4>
                    <p className="text-xs md:text-sm text-slate-400 font-medium">
                      {institution}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Certifications Pill Grid */}
      <div className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-3xl p-6 backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800/80 pb-3">
          Certifications & Credentials
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {details.certifications.map((cert) => (
            <span
              key={cert}
              className="bg-[#121B2E] text-slate-300 text-xs md:text-sm px-4 py-2 rounded-xl border border-slate-800 font-semibold shadow-inner"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>

      {/* 5. Specializations Cards Grid */}
      <section className="space-y-6">
        <h3 className="text-lg font-bold text-white border-b border-slate-800/80 pb-3">
          Specializations
        </h3>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {details?.specializations.map((spec, idx) => (
            <div
              key={idx}
              className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-2xl p-6 backdrop-blur-sm 
                       hover:border-[#3B82F6]/30 hover:bg-[#111827]/60 transition-all duration-300"
            >
              <h4 className="text-base font-bold text-white mb-2 tracking-wide">
                {spec.title}
              </h4>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {spec.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Reviews Section */}
      <div className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-3xl p-6 md:p-8 backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center justify-between">
          <span>Reviews ({expert.reviewsCount})</span>
          <span className="text-xs font-semibold text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
            Verified Clients Only
          </span>
        </h3>
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-slate-800/80 pb-3">
            Reviews
          </h3>

          <div className="space-y-4">
            {details?.reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-2xl p-6 backdrop-blur-sm transition-all"
              >
                {/* Header: Author Info & Rating */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 text-[#3B82F6] flex items-center justify-center font-bold">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{rev.author}</h4>
                      <p className="text-xs text-slate-500 font-medium">{rev.time}</p>
                    </div>
                  </div>

                  {/* Dynamic Star Rating */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rev.rating ? "fill-amber-400 text-amber-400" : "fill-slate-700 text-slate-700"}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment Body */}
                <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div >
  );
}
