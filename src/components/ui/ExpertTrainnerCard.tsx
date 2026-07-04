import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ExpertTrainerProps {
  name: string;
  title: string;
  rating: number;
  reviews: number;
  price: string;
  specialties: string[];
  category: string; // Added for the top-right badge
}

export function ExpertTrainerCard({
  name,
  title,
  rating,
  reviews,
  price,
  specialties,
  category,
}: ExpertTrainerProps) {
  return (
    <Card className="bg-[#0D1526] border-[#FFFFFF0F] p-5">
      {/* Header section with image and name */}
      <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
        <img
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150"
          alt={name}
          className="w-16 h-16 rounded-full object-cover shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-white font-semibold text-lg truncate">{name}</h4>
            <Badge className="bg-[#DBEAFE] text-[#1E40AF] hover:bg-[#DBEAFE] text-[10px] px-2 py-0 shrink-0">
              {category}
            </Badge>
          </div>
          <p className="text-[#90A1B9] text-sm break-words mt-1">{title}</p>
          <div className="flex flex-wrap items-center gap-1 text-amber-400 text-sm mt-1.5">
            <Star className="w-4 h-4 fill-amber-400 shrink-0" />
            <span className="text-white font-medium">{rating}</span>
            <span className="text-[#62748E] ml-1">({reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Specialties */}
      <div className="flex flex-wrap gap-2 mb-4">
        {specialties.map((s) => (
          <Badge
            key={s}
            className="bg-[#1E293B] text-[#90A1B9] border-none text-xs py-1 px-3"
          >
            {s}
          </Badge>
        ))}
      </div>

      {/* Price and Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#1E293B]">
        <span className="text-white font-bold text-2xl">
          {price}
          <span className="text-sm text-[#62748E] font-normal ml-1">/hour</span>
        </span>
        <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl px-6 w-full sm:w-auto">
          View Profile
        </Button>
      </div>
    </Card>
  );
}
