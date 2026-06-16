import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import { mockExperts } from "./types";
import type { FilterState } from "./types";
import FilterSidebar from "./FilterSidebar";
import ExpertList from "./ExpertList";

const INITIAL_FILTERS: FilterState = {
  search: "",
  specialties: [],
  rating: null,
  minPrice: 0,
  maxPrice: 500,
  sortBy: "most-popular",
};

export default function ExpertDirectoryPage() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Filter and sort the experts list memoized for performance
  const filteredExperts = useMemo(() => {
    let result = [...mockExperts];

    // Search query match (name, title, or tags)
    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (expert) =>
          expert.name.toLowerCase().includes(searchLower) ||
          expert.title.toLowerCase().includes(searchLower) ||
          expert.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Specialty filter (multiple match)
    if (filters.specialties.length > 0) {
      result = result.filter((expert) =>
        filters.specialties.includes(expert.specialty)
      );
    }

    // Rating filter (minimum rating check)
    if (filters.rating !== null) {
      result = result.filter((expert) => expert.rating >= (filters.rating as number));
    }

    // Price range filter
    result = result.filter(
      (expert) =>
        expert.pricePerHour >= filters.minPrice &&
        expert.pricePerHour <= filters.maxPrice
    );

    // Sorting
    switch (filters.sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        result.sort((a, b) => a.pricePerHour - b.pricePerHour);
        break;
      case "price-high":
        result.sort((a, b) => b.pricePerHour - a.pricePerHour);
        break;
      case "most-popular":
      default:
        result.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
    }

    return result;
  }, [filters]);

  return (
    <div className="bg-[#030303] min-h-screen text-slate-100 font-inter">
      {/* Directory Section Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 py-12">
        {/* Mobile Filter Trigger */}
        <div className="flex lg:hidden justify-between items-center mb-6 bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-2xl px-6 py-4">
          <span className="text-gray-400 text-sm font-semibold">
            <strong className="text-white text-base mr-1">{filteredExperts.length}</strong> 
            {filteredExperts.length === 1 ? "expert" : "experts"} found
          </span>
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-[#007AFF] hover:bg-[#0066FF] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all active:scale-95 shadow-md shadow-blue-500/10"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Filters Sidebar - Desktop & Mobile */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            isOpen={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
          />

          {/* Mobile Overlay Background */}
          {isMobileFilterOpen && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileFilterOpen(false)}
            />
          )}

          {/* Expert List Grid */}
          <ExpertList
            experts={filteredExperts}
            sortBy={filters.sortBy}
            onSortChange={(val) => handleFilterChange({ sortBy: val })}
            onClearFilters={handleResetFilters}
          />
        </div>
      </div>
    </div>
  );
}
