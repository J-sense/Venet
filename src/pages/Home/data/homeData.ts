export interface ProgramItem {
  title: string;
  description: string;
  imageSrc: string;
  to: string;
  iconBg: string;
  iconPath: string;
}

export const defaultPrograms: ProgramItem[] = [
  {
    title: "Health & Fitness",
    description:
      "Personalized workout plans, nutrition guidance, and wellness tracking.",
    imageSrc: "/pr1.png",
    to: "/programs/health-fitness",
    iconBg: "bg-[#1B73E8]",
    iconPath:
      "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    title: "Mental Health",
    description:
      "Mindfulness practices, stress management, and emotional well-being support.",
    imageSrc: "/pr2.png",
    to: "/programs/mental-health",
    iconBg: "bg-[#D017A0]",
    iconPath:
      "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
  {
    title: "Educational Services",
    description:
      "Skill development, certifications, and lifelong learning opportunities.",
    imageSrc: "/pr3.png",
    to: "/programs/education-service",
    iconBg: "bg-[#00C48C]",
    iconPath:
      "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 14zm-6.16-3.422a12.083 12.083 0 00.665 6.479A11.952 11.952 0 015.84 10.578zM12 14v7a11.95 11.95 0 01-4.37-3.414A12.083 12.083 0 0012 14z",
  },
  {
    title: "Career Preparation",
    description:
      "Job readiness, interview prep, and professional development programs.",
    imageSrc: "/pr4.png",
    to: "/programs/career",
    iconBg: "bg-[#FF4A22]",
    iconPath:
      "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
];

export interface TrainerItem {
  id: number;
  name: string;
  role: string;
  image: string;
}

export const trainersData: TrainerItem[] = [
  {
    id: 1,
    name: "Jack Drake",
    role: "Strength & Conditioning",
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Nathaniel",
    role: "HIIT & Cardio",
    image:
      "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Marcus Vance",
    role: "CrossFit Coach",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Sofia Reyes",
    role: "Yoga & Mobility",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Ryan Torres",
    role: "Nutrition & Wellness",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop",
  },
];

export interface FeedbackItem {
  quote: string;
  rating: number;
  author: string;
  image: string;
}

export const customerReviews: FeedbackItem[] = [
  {
    quote:
      "Before joining FitFlex, I was stuck in a fitness rut. But the trainers here are amazing, and the community is so supportive! It's like a second home to me now.",
    rating: 5,
    author: "Joanne",
    image:
      "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=500&auto=format&fit=crop",
  },
  {
    quote:
      "I used to dread going to the gym, but FitFlex changed that for me. This variety of classes ensures I never get bored, and I genuinely look forward to each workout session!",
    rating: 5,
    author: "Caleb",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop",
  },
  {
    quote:
      "Not only have I seen incredible physical results, but I've also gained a newfound confidence and sense of accomplishment. FitFlex Gym isn't just a place to work out!",
    rating: 5,
    author: "Donna",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop",
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    question: "What Is vNET And How Can It Help Me Reach My Fitness Goals?",
    answer:
      "vNET is an online fitness platform that offers personalized workout plans, expert coaching, and comprehensive nutritional guidance. Whether you're looking to lose weight, build muscle, or simply stay fit, our tailored programs and community support will help you achieve your fitness goals.",
  },
  {
    question: "How Do I Get Started With A Workout Plan On vNET?",
    answer:
      "Getting started is simple. Select a subscription tier that matches your preference, complete your physical evaluation profile, and our AI pipeline will map out your baseline routine instantly.",
  },
  {
    question: "What Is Included In The Custom Plan?",
    answer:
      "Custom packages bundle dedicated 1-on-1 messaging access with certified advisors, dynamically adjusting milestone target curves, and custom dietary allergen macro profiles.",
  },
  {
    question: "Can I Change My Plan After Signing Up?",
    answer:
      "Yes, you can upgrade, downgrade, or update structural baseline components of your membership instantly from your secure billing profile dash settings.",
  },
  {
    question: "What Kind Of Support Can I Expect From My Trainer?",
    answer:
      "Expect weekly interactive metrics adjustments, comprehensive video posture assessments review files, and persistent accountability checkins.",
  },
];
