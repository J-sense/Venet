import { ArrowRight, Star } from "lucide-react";
import type { Expert } from "../data/expertsData";
import { Link } from "react-router";

interface ExpertCardProps {
  expert: Expert;
}

export default function ExpertCard({ expert }: ExpertCardProps) {
  return (
    <div className="bg-[#0F172A] border border-[#1E293B]/60 rounded-2xl p-6 hover:border-[#3B82F6]/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/10 flex flex-col justify-between h-full group">
      <div>
        {/* Profile Info Header */}
        <div className="flex gap-4 items-start">
          <div className="relative flex-shrink-0">
            <img
              src={expert.avatar}
              alt={expert.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-700/50 group-hover:border-[#007AFF] transition-colors duration-300"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-white text-[18px] font-bold truncate group-hover:text-[#007AFF] transition-colors duration-300">
                {expert.name}
              </h3>
              <span className="bg-[#007AFF]/15 text-[#3B82F6] text-[14px] px-2.5 py-0.5 rounded-full font-medium border border-[#3B82F6]/20">
                {expert.specialty}
              </span>
            </div>

            <p className="text-[#94A3B8] text-[14px] mt-1 line-clamp-1">
              {expert.title}
            </p>

            {/* Ratings */}
            <div className="flex items-center gap-1.5 mt-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-white text-sm font-semibold mt-0.5">
                {expert.rating.toFixed(1)}
              </span>
              <span className="text-gray-500 text-[14px] mt-0.5">
                ({expert.reviewsCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Skill/Specialty Tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {expert.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#121B2E] text-slate-300 text-xs px-3 py-1 rounded-lg border border-slate-800 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Availability Status */}
        <div className="flex items-center gap-2 mt-4 text-[#10B981] text-xs font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium tracking-wide">
            {expert.availability}
          </span>
        </div>
      </div>

      {/* Pricing and Action Button */}
      <div className="flex items-center justify-between border-t border-slate-800/80 mt-6 pt-4">
        <div>
          <span className="text-white text-2xl font-extrabold">
            ${expert.pricePerHour}
          </span>
          <span className="text-gray-500 text-xs font-medium ml-1">/hour</span>
        </div>
        <Link to={`/experts/${expert?.id}`}>

          <button
            className="group/btn flex items-center gap-1.5 px-5 py-2 rounded-full select-none cursor-pointer
    text-[16px] font-semibold text-slate-950
    bg-gradient-to-b from-white to-slate-200
    border border-white/60
    shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-3px_6px_rgba(15,23,42,0.18),0_4px_12px_rgba(0,0,0,0.25)]
    [text-shadow:0_1px_0_rgba(255,255,255,0.8)]
    transition-all duration-200
    hover:from-white hover:to-slate-100 hover:-translate-y-0.5
    hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-3px_6px_rgba(15,23,42,0.18),0_8px_20px_rgba(0,0,0,0.3)]
    active:translate-y-0 active:scale-[0.97]
    active:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-2px_4px_rgba(15,23,42,0.2)]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            View Profile
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </button>
        </Link>
      </div>
    </div>
  );
}
