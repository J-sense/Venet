import React, { useState } from "react";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import { useCreateReviewMutation } from "@/redux/features/userDashboard/userSession.api";
import { toast } from "sonner";

interface ConsultationReviewProps {
  sessionId?: string;
  onSuccess?: () => void;
}

export const ConsultationReview: React.FC<ConsultationReviewProps> = ({
  sessionId,
  onSuccess,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleSubmitReview = async () => {
    if (!sessionId) {
      toast.error("Session ID is required to submit a review.");
      return;
    }

    try {
      const payload = {
        session: sessionId,
        rating,
        comment: comment.trim() || undefined,
      };

      await createReview(payload).unwrap();
      toast.success("Thank you for your feedback! Review submitted.");
      setSubmitted(true);
      setIsOpen(false);
      onSuccess?.();
    } catch (err: any) {
      console.error("Failed to submit review:", err);
      toast.error(
        err?.data?.detail ||
          err?.data?.message ||
          "Failed to submit review. Please try again."
      );
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#1E2937]/80 mx-4 sm:mx-6 mb-6 rounded-2xl border border-emerald-500/20 p-5 flex items-center gap-3 text-emerald-400">
        <CheckCircle2 size={24} className="shrink-0" />
        <div>
          <h4 className="font-bold text-sm text-white">Review Submitted</h4>
          <p className="text-xs text-zinc-400">
            Your feedback has been recorded. Thank you!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1E2937] mx-4 sm:mx-6 mb-6 rounded-2xl border border-white/10 overflow-hidden transition-all duration-300">
      <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        {/* Left Section */}
        <div className="flex items-start sm:items-center gap-4 flex-1">
          <div className="bg-[#0A66C2] p-3 rounded-full flex-shrink-0">
            <Star className="text-white fill-white" size={22} />
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

        {/* Right Section - Rating + Toggle Button */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
          {/* Star Rating Selection */}
          <div className="flex gap-1 text-yellow-400">
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <Star
                key={starIndex}
                size={26}
                onClick={() => {
                  setRating(starIndex);
                  setIsOpen(true);
                }}
                onMouseEnter={() => setHoverRating(starIndex)}
                onMouseLeave={() => setHoverRating(0)}
                className={`cursor-pointer hover:scale-110 transition-transform ${
                  starIndex <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-zinc-600 fill-transparent"
                }`}
              />
            ))}
          </div>

          {/* Toggle / Submit Form Button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full sm:w-auto bg-[#0A66C2] hover:bg-blue-600 active:bg-blue-700 px-7 py-3 rounded-xl font-medium text-white transition-colors whitespace-nowrap text-sm cursor-pointer"
          >
            {isOpen ? "Close Form" : "Leave Review"}
          </button>
        </div>
      </div>

      {/* Expandable Form Body */}
      {isOpen && (
        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/5 space-y-4 animate-fadeIn">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
              Comment (Optional)
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review or thoughts about the expert and session..."
              className="w-full bg-[#111723] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-blue-500 placeholder:text-zinc-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitReview}
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
