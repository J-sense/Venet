import { Search, RotateCcw, X, SlidersHorizontal } from "lucide-react";
import type { FilterState } from "../data/expertsData";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  availableSpecialties?: string[];
}

const SPECIALTIES = [
  "Health & Fitness",
  "Mental Health",
  "Educational Services",
  "Career Preparation",
];

const RATINGS = [
  { label: "5★ Stars", value: 5.0 },
  { label: "4.5+ Stars", value: 4.5 },
  { label: "4+ Stars", value: 4.0 },
  { label: "3.5+ Stars", value: 3.5 },
  { label: "Any Rating", value: null },
];

export default function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
  isOpen = false,
  onClose,
  availableSpecialties,
}: FilterSidebarProps) {
  const specialtyOptions =
    availableSpecialties && availableSpecialties.length > 0
      ? availableSpecialties
      : SPECIALTIES;
  const handleSpecialtyChange = (specialty: string) => {
    const isSelected = filters.specialties.includes(specialty);
    const newSpecialties = isSelected
      ? filters.specialties.filter((s) => s !== specialty)
      : [...filters.specialties, specialty];
    onFilterChange({ specialties: newSpecialties });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    // Ensure bounds
    const cleanMin = Math.max(0, isNaN(min) ? 0 : min);
    const cleanMax = Math.min(500, isNaN(max) ? 500 : max);
    onFilterChange({ minPrice: cleanMin, maxPrice: cleanMax });
  };

  return (
    <aside
      className={`
    bg-gradient-to-b from-[#162036] to-[#0B1220] border border-[#1E293B]/60 rounded-2xl p-6 w-full lg:w-[400px] shrink-0
    shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-3px_6px_rgba(0,0,0,0.35)]
    transition-all duration-300
    ${isOpen ? "block fixed inset-y-0 left-0 z-50 overflow-y-auto w-80 m-4 lg:relative lg:inset-auto lg:m-0" : "hidden lg:block"}
  `}
    >
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-white font-bold text-[18px] font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
          <SlidersHorizontal className="w-5 h-5 text-[#FFFFFF] drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]" />
          <span>Filters</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onReset}
            title="Reset all filters"
            className="text-gray-300 hover:text-white px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 text-xs select-none cursor-pointer
          bg-gradient-to-b from-white/10 to-white/[0.02] hover:from-white/20 hover:to-white/[0.06]
          border border-white/10
          shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-2px_4px_rgba(0,0,0,0.35)]
          [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-gray-300 hover:text-white p-1.5 rounded-lg transition-all select-none cursor-pointer
            bg-gradient-to-b from-white/10 to-white/[0.02] hover:from-white/20 hover:to-white/[0.06]
            border border-white/10
            shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-2px_4px_rgba(0,0,0,0.35)]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-gray-400 text-[14px] text-white font-medium uppercase tracking-wider mb-2">
            Search
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Search experts..."
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="w-full bg-gradient-to-b from-[#182338] to-[#1E293B] border border-[#64748B] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 text-sm outline-none transition-all
            shadow-[inset_0_2px_4px_rgba(0,0,0,0.35),inset_0_-1px_0_rgba(255,255,255,0.06)]"
            />
          </div>
        </div>

        {/* Specialty */}
        <div>
          <label className="block text-[#94A3B8] text-xs font-semibold uppercase tracking-wider mb-3">
            Specialty
          </label>
          <div className="space-y-2.5">
            {specialtyOptions.map((specialty) => {
              const isChecked = filters.specialties.includes(specialty);
              return (
                <label
                  key={specialty}
                  className="flex items-center gap-3 group cursor-pointer   text-gray-300 text-white transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleSpecialtyChange(specialty)}
                    className="w-4 h-4 rounded border-slate-700 bg-[#070C15] text-[#3B82F6] focus:ring-[#3B82F6]/50 focus:ring-offset-0 transition-colors cursor-pointer shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                  />
                  <span className="text-[16px] font-medium">{specialty}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Minimum Rating */}
        <div>
          <label className="block text-[#94A3B8] text-[14px] font-semibold uppercase tracking-wider mb-3">
            Minimum Rating
          </label>
          <div className="space-y-2.5">
            {RATINGS.map((ratingOption) => {
              const isChecked = filters.rating === ratingOption.value;
              return (
                <label
                  key={ratingOption.label}
                  className="flex items-center gap-3 group cursor-pointer text-gray-300 hover:text-white transition-colors"
                >
                  <input
                    type="radio"
                    name="rating-filter"
                    checked={isChecked}
                    onChange={() => onFilterChange({ rating: ratingOption.value })}
                    className="w-4 h-4 rounded-full border-slate-700 bg-[#070C15] text-[#3B82F6] focus:ring-[#3B82F6]/50 focus:ring-offset-0 transition-colors cursor-pointer shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                  />
                  <span className="text-[#FAFAFA]  text-[16px] font-medium">{ratingOption.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-[#FFFFFF] text-[14px] font-semibold uppercase tracking-wider mb-3">
            Price Range
          </label>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 text-sm">$</span>
              <input
                type="number"
                min="0"
                max="500"
                value={filters.minPrice || ""}
                onChange={(e) => handlePriceRangeChange(parseInt(e.target.value), filters.maxPrice)}
                className="w-full bg-gradient-to-b from-[#05080F] to-[#0B111D] border border-slate-800 focus:border-[#3B82F6] rounded-lg pl-6 pr-3 py-3 text-white text-sm outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.05)]"
                placeholder="0"
              />
            </div>
            <span className="text-gray-500 text-sm">to</span>
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 text-sm">$</span>
              <input
                type="number"
                min="0"
                max="500"
                value={filters.maxPrice || ""}
                onChange={(e) => handlePriceRangeChange(filters.minPrice, parseInt(e.target.value))}
                className="w-full bg-gradient-to-b from-[#05080F] to-[#0B111D] border border-slate-800 focus:border-[#3B82F6] rounded-lg pl-6 pr-3 py-3 text-white text-sm outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.05)]"
                placeholder="500"
              />
            </div>
          </div>

          {/* Range Slider for Max Price */}
          <div className="mt-3 px-1">
            <input
              type="range"
              min="0"
              max="500"
              value={filters.maxPrice}
              onChange={(e) => handlePriceRangeChange(filters.minPrice, parseInt(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#3B82F6] focus:outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(filters.maxPrice / 500) * 100}%, #1E293B ${(filters.maxPrice / 500) * 100}%, #1E293B 100%)`
              }}
            />
            <div className="flex justify-between text-gray-500 text-[11px] font-semibold mt-2">
              <span>$0</span>
              <span className="text-[#6AA8FF] bg-gradient-to-b from-[#3B82F6]/30 to-[#3B82F6]/10 px-2 py-0.5 rounded-md border border-[#3B82F6]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_3px_rgba(0,0,0,0.3)] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                ${filters.minPrice} - ${filters.maxPrice}
              </span>
              <span>$500</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
