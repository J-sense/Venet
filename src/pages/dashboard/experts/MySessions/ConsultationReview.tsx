// src/components/ConsultationReview.tsx
import { Star } from "lucide-react";

export const ConsultationReview = () => (
  <div className="bg-[#1E2937] mx-4 sm:mx-6 mb-6 rounded-2xl border border-white/10 overflow-hidden">
    <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
      {/* Left Section */}
      <div className="flex items-start sm:items-center gap-4 flex-1">
        <div className="bg-[#0A66C2] p-3 rounded-full flex-shrink-0">
          <Star className="text-white" fill="white" size={22} />
        </div>
        <div>
          <h4 className="font-bold text-lg text-white">
            Consultation Completed
          </h4>
          <p className="text-sm text-gray-400 mt-1">
            Share your feedback about this session.
          </p>
        </div>
      </div>

      {/* Right Section - Rating + Button */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
        {/* Star Rating */}
        <div className="flex gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={24}
              className="cursor-pointer hover:scale-110 transition-transform"
            />
          ))}
        </div>

        {/* Leave Review Button */}
        <button className="w-full sm:w-auto bg-[#0A66C2] hover:bg-blue-600 active:bg-blue-700 px-8 py-3.5 rounded-xl font-medium text-white transition-colors whitespace-nowrap">
          Leave Review
        </button>
      </div>
    </div>
  </div>
);
