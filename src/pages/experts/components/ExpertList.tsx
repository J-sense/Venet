import { ArrowUpDown, ChevronDown, RefreshCw } from "lucide-react";
import type { Expert } from "../data/expertsData";
import ExpertCard from "./ExpertCard";

interface ExpertListProps {
  experts: Expert[];
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  onClearFilters: () => void;
  isLoading?: boolean;
}

export default function ExpertList({
  experts,
  sortBy,
  onSortChange,
  onClearFilters,
  isLoading = false,
}: ExpertListProps) {
  return (
    <div className="flex-1 w-full space-y-6">
      {/* Header section with count and sort */}
      <div
        className="relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl px-6 py-4 select-none
    bg-gradient-to-b from-[#16203A]/80 to-[#0A101D]/80 backdrop-blur-sm
    border border-white/10
    shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-3px_6px_rgba(0,0,0,0.4)]"
      >
        {/* Accent bar on the left edge */}
        <div className="absolute left-0 inset-y-4 w-1 rounded-r-full bg-gradient-to-b from-[#2B7FFF] to-[#0B60BD]" />

        {/* Count / loading */}
        <div className="text-gray-400 text-sm font-semibold pl-2">
          {isLoading ? (
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
          bg-gradient-to-b from-[#3B82F6]/25 to-[#3B82F6]/10
          border border-[#3B82F6]/30 text-blue-200
          shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.3)]
          [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]"
            >
              <RefreshCw className="w-4 h-4 animate-spin text-[#6AA8FF]" />
              Searching experts...
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <strong
                className="inline-flex items-center justify-center min-w-8 h-8 px-2 rounded-lg text-white text-base
            bg-gradient-to-b from-[#2B7FFF] to-[#0B60BD]
            border border-white/20
            shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.35)]
            [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]"
              >
                {experts.length}
              </strong>
              <span>{experts.length === 1 ? "expert" : "experts"} found</span>
            </span>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-gray-400 text-sm font-medium">
            <ArrowUpDown className="w-4 h-4 text-gray-500 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]" />
            Sort by:
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none cursor-pointer outline-none transition-all duration-200 rounded-xl px-4 py-2.5 pr-10
          text-white text-sm font-semibold [color-scheme:dark]
          bg-gradient-to-b from-[#1A2438] to-[#070C15]
          border border-white/15 hover:border-white/25 focus:border-[#3B82F6]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-3px_6px_rgba(0,0,0,0.45)]
          [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]
          hover:brightness-110 active:scale-[0.98]"
            >
              <option className="bg-[#0B1220] text-white" value="most_popular">Most Popular</option>
              <option className="bg-[#0B1220] text-white" value="top_rated">Top Rated</option>
              <option className="bg-[#0B1220] text-white" value="price_low_to_high">Price: Low to High</option>
              <option className="bg-[#0B1220] text-white" value="price_high_to_low">Price: High to Low</option>
            </select>

            {/* Chevron in its own glossy chip */}
            <span
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md flex items-center justify-center pointer-events-none text-gray-300
          bg-gradient-to-b from-white/15 to-white/[0.03]
          border border-white/10
          shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_3px_rgba(0,0,0,0.35)]"
            >
              <ChevronDown className="w-4 h-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]" />
            </span>
          </div>
        </div>
      </div>

      {/* Grid container */}
      {experts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          className="flex flex-col items-center justify-center text-center p-12 min-h-[350px] rounded-2xl select-none
    bg-gradient-to-b from-[#121B2E]/60 to-[#0B1220]/60
    border border-dashed border-slate-700/80
    shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-3px_6px_rgba(0,0,0,0.35)]"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-5 text-gray-400
      bg-gradient-to-b from-white/10 to-white/[0.02]
      border border-white/10
      shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-3px_6px_rgba(0,0,0,0.35)]"
          >
            <svg
              className="w-8 h-8 drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h4 className="text-white text-lg font-bold mb-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
            No Experts Found
          </h4>
          <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
            We couldn't find any experts matching your current search parameters. Try adjusting your filters.
          </p>
          <button
            onClick={onClearFilters}
            className="px-6 py-3 rounded-full text-xs font-bold text-white cursor-pointer select-none
      bg-gradient-to-b from-[#007AFF] to-[#0B60BD]
      border border-[#007AFF4D]
      shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.35)]
      [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]
      transition-all duration-200 hover:brightness-110 active:scale-95"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
