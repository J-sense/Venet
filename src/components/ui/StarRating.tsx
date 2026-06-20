// components/ui/StarRating.tsx
import { Star } from "lucide-react";

export const StarRating = ({
  rating,
  max = 5,
}: {
  rating: number;
  max?: number;
}) => (
  <div className="flex gap-0.5">
    {[...Array(max)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < rating ? "fill-[#FFAB00] text-[#FFAB00]" : "text-gray-600"
        }
      />
    ))}
  </div>
);
