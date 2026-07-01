export interface Expert {
  id: string;
  name: string;
  avatar: string;
  title: string;
  specialty: 'Health & Fitness' | 'Mental Health' | 'Educational Services' | 'Career Preparation';
  rating: number;
  reviewsCount: number;
  tags: string[];
  pricePerHour: number;
  availability: 'Available This Week' | 'Available Next Week' | 'Fully Booked';
}

export interface FilterState {
  search: string;
  specialties: string[];
  rating: number | null; // e.g., 4.5 means >= 4.5
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

export const mockExperts: Expert[] = [
  {
    id: "1",
    name: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
    title: "Certified Trainer & Nutritionist",
    specialty: "Health & Fitness",
    rating: 4.9,
    reviewsCount: 127,
    tags: ["HIIT Training", "Strength Training"],
    pricePerHour: 120,
    availability: "Available This Week"
  },
  {
    id: "2",
    name: "Dr. Sarah Chen, PhD",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    title: "Licensed Clinical Psychologist",
    specialty: "Mental Health",
    rating: 4.8,
    reviewsCount: 94,
    tags: ["CBT", "Mindfulness", "Anxiety Coach"],
    pricePerHour: 150,
    availability: "Available This Week"
  },
  {
    id: "3",
    name: "Jane Cooper",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    title: "Certified Personal Trainer",
    specialty: "Health & Fitness",
    rating: 4.8,
    reviewsCount: 112,
    tags: ["Cardio", "Weight Loss", "Yoga"],
    pricePerHour: 110,
    availability: "Available This Week"
  },
  {
    id: "4",
    name: "Darlene Robertson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
    title: "Career Transition & Executive Coach",
    specialty: "Career Preparation",
    rating: 4.7,
    reviewsCount: 83,
    tags: ["Interview Prep", "Resume Review", "Salary Negotiation"],
    pricePerHour: 135,
    availability: "Available This Week"
  },
  {
    id: "5",
    name: "Brooklyn Simmons",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    title: "Academic Advisor & Math Tutor",
    specialty: "Educational Services",
    rating: 4.9,
    reviewsCount: 145,
    tags: ["Calculus", "SAT Math", "Algebra"],
    pricePerHour: 95,
    availability: "Available This Week"
  },
  {
    id: "6",
    name: "Ralph Edwards",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    title: "Product Management Career Coach",
    specialty: "Career Preparation",
    rating: 4.6,
    reviewsCount: 64,
    tags: ["Product Strategy", "FAANG Prep", "Case Study"],
    pricePerHour: 160,
    availability: "Available This Week"
  },
  {
    id: "7",
    name: "Bessie Cooper",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200&h=200",
    title: "Mental Wellness & Stress Management",
    specialty: "Mental Health",
    rating: 4.9,
    reviewsCount: 156,
    tags: ["Stress Relief", "Meditation", "Life Coaching"],
    pricePerHour: 125,
    availability: "Available This Week"
  },
  {
    id: "8",
    name: "Savannah Nguyen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200&h=200",
    title: "Science & Biology Instructor",
    specialty: "Educational Services",
    rating: 4.8,
    reviewsCount: 78,
    tags: ["AP Biology", "Chemistry", "Pre-Med Mentor"],
    pricePerHour: 105,
    availability: "Available This Week"
  },
  {
    id: "9",
    name: "Jerome Bell",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200&h=200",
    title: "Certified Strength & Conditioning Specialist",
    specialty: "Health & Fitness",
    rating: 4.9,
    reviewsCount: 204,
    tags: ["Athletic Training", "Powerlifting", "Mobility"],
    pricePerHour: 140,
    availability: "Available This Week"
  },
  {
    id: "10",
    name: "Ronald Richards",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    title: "ADHD & Neurodiverse Life Coach",
    specialty: "Mental Health",
    rating: 4.8,
    reviewsCount: 119,
    tags: ["ADHD Support", "Time Management", "Focus Strategies"],
    pricePerHour: 130,
    availability: "Available This Week"
  },
  {
    id: "11",
    name: "Alistair Vance",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    title: "Corporate Interview Coach & Speaker",
    specialty: "Career Preparation",
    rating: 4.5,
    reviewsCount: 42,
    tags: ["Public Speaking", "Resume Writing", "Networking"],
    pricePerHour: 180,
    availability: "Available Next Week"
  },
  {
    id: "12",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    title: "Language Acquisition & ESL Specialist",
    specialty: "Educational Services",
    rating: 5.0,
    reviewsCount: 88,
    tags: ["English", "Spanish", "Accent Reduction"],
    pricePerHour: 80,
    availability: "Available This Week"
  }
];
