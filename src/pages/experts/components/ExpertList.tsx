import { ChevronDown, RefreshCw } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#0B1220]/40 border border-[#1E293B]/40 rounded-2xl px-6 py-4">
        <div className="text-gray-400 text-sm font-semibold">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#3B82F6]" />
              Searching experts...
            </span>
          ) : (
            <span>
              <strong className="text-white text-base mr-1">{experts.length}</strong> 
              {experts.length === 1 ? "expert" : "experts"} found
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm font-medium">Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-[#070C15] border border-slate-800 text-white text-sm font-semibold rounded-xl px-4 py-2.5 pr-10 cursor-pointer outline-none focus:border-[#3B82F6] hover:border-slate-700 transition-all appearance-none"
            >
              <option value="most_popular">Most Popular</option>
              <option value="top_rated">Top Rated</option>
              <option value="price_low_to_high">Price: Low to High</option>
              <option value="price_high_to_low">Price: High to Low</option>
            </select>
            <span className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-gray-400">
              <ChevronDown className="w-4 h-4" />
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
        <div className="flex flex-col items-center justify-center text-center p-12 bg-[#0B1220]/50 border border-dashed border-slate-800/80 rounded-2xl min-h-[350px]">
          <div className="w-16 h-16 bg-[#1E293B]/40 border border-slate-800 rounded-full flex items-center justify-center mb-5 text-gray-500">
            <svg
              className="w-8 h-8"
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
          <h4 className="text-white text-lg font-bold mb-2">No Experts Found</h4>
          <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
            We couldn't find any experts matching your current search parameters. Try adjusting your filters.
          </p>
          <button
            onClick={onClearFilters}
            className="bg-[#007AFF] hover:bg-[#0066FF] text-white px-6 py-3 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
