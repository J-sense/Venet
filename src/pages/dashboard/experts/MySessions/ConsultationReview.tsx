// src/components/ConsultationReview.tsx
import { Star } from "lucide-react";

export const ConsultationReview = () => (
  <div className="bg-[#1E2937] p-6 mx-6 mb-6 rounded-2xl flex items-center justify-between border border-white/10">
    <div className="flex items-center gap-4">
      <div className="bg-[#0A66C2] p-3 rounded-full">
        <Star className="text-white" fill="white" size={20} />
      </div>
      <div>
        <h4 className="font-bold text-lg">Consultation Completed</h4>
        <p className="text-sm text-gray-400">
          Share your feedback about this session.
        </p>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="flex gap-1 text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={20} />
        ))}
      </div>
      <button className="bg-[#0A66C2] px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
        Leave Review
      </button>
    </div>
  </div>
);
