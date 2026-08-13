/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { Expert, FilterState } from "../data/expertsData";
import FilterSidebar from "./FilterSidebar";
import ExpertList from "./ExpertList";
import { useGetAllExpertsQuery } from "@/redux/features/expertsRoute/expertRoute.api";
import type { GetExpertsQueryParams } from "@/redux/features/expertsRoute/expertRoute.api";

const INITIAL_FILTERS: FilterState = {
  search: "",
  specialties: [],
  rating: null,
  minPrice: 0,
  maxPrice: 500,
  sortBy: "most_popular",
};

// Helper to format image URLs and handle HTTP/HTTPS mixed-content
const getImageUrl = (url?: string | null) => {
  if (!url) return undefined;
  if (
    typeof window !== "undefined" &&
    window.location.protocol === "https:" &&
    url.startsWith("http://")
  ) {
    return url.replace("http://", "https://");
  }
  return url;
};

// Maps frontend sortBy values to backend query parameter values
const getBackendSortBy = (sortBy: string) => {
  switch (sortBy) {
    case "rating":
    case "top_rated":
      return "top_rated";
    case "price-low":
    case "price_low_to_high":
      return "price_low_to_high";
    case "price-high":
    case "price_high_to_low":
      return "price_high_to_low";
    case "most-popular":
    case "most_popular":
    default:
      return "most_popular";
  }
};

export default function ExpertDirectoryPage() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Construct query parameters for backend API request (sort_by, search, price_min, price_max)
  const queryParams = useMemo(() => {
    const params: GetExpertsQueryParams = {};

    const backendSortBy = getBackendSortBy(filters.sortBy);
    if (backendSortBy) {
      params.sort_by = backendSortBy;
    }

    if (filters.search.trim()) {
      params.search = filters.search.trim();
    }

    if (filters.minPrice > 0) {
      params.price_min = filters.minPrice;
    }

    if (filters.maxPrice < 500) {
      params.price_max = filters.maxPrice;
    }

    return params;
  }, [filters.sortBy, filters.search, filters.minPrice, filters.maxPrice]);

  // Fetch experts from RTK Query API passing query parameters
  const { data: allExperts, isLoading } = useGetAllExpertsQuery(queryParams);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Standardize and map API data to clean Expert UI model
  const expertsList: Expert[] = useMemo(() => {
    const rawList = Array.isArray(allExperts)
      ? allExperts
      : Array.isArray(allExperts?.data)
        ? allExperts.data
        : Array.isArray(allExperts?.results)
          ? allExperts.results
          : [];

    return rawList.map((item: any) => {
      const name =
        [item.first_name, item.last_name].filter(Boolean).join(" ") ||
        "Expert Profile";
      const avatarUrl = getImageUrl(item.image);
      const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name,
      )}&background=1E293B&color=3B82F6`;

      const tags =
        Array.isArray(item.skills) && item.skills.length > 0
          ? item.skills
          : item.specialty
            ? [item.specialty]
            : [];

      return {
        id: item.id,
        name,
        avatar: avatarUrl || fallbackAvatar,
        title: item.professional_title || item.specialty || "Expert",
        specialty: item.specialty || "General Expert",
        rating: item.average_rating ? Number(item.average_rating) : 5.0,
        reviewsCount: item.review_count ? Number(item.review_count) : 0,
        tags,
        pricePerHour: item.hourly_rate ? Number(item.hourly_rate) : 0,
        availability:
          item.open_to === "AVAILABLE"
            ? "Available This Week"
            : item.open_to === "BUSY"
              ? "Busy"
              : "Not Available",
      };
    });
  }, [allExperts]);

  // Extract unique specialties from API response
  const availableSpecialties = useMemo(() => {
    return Array.from(
      new Set(expertsList.map((e) => e.specialty).filter(Boolean)),
    );
  }, [expertsList]);

  // Filter the experts list (Backend handles search, sorting, and price range filtering)
  const filteredExperts = useMemo(() => {
    let result = [...expertsList];

    // Specialty filter
    if (filters.specialties.length > 0) {
      result = result.filter((expert) =>
        filters.specialties.includes(expert.specialty),
      );
    }

    // Rating filter
    if (filters.rating !== null) {
      result = result.filter((expert) => expert.rating >= (filters.rating as number));
    }

    return result;
  }, [expertsList, filters]);

  return (
    <div className="bg-[#030303] min-h-screen text-slate-100 font-inter">
      {/* Directory Section Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 py-12">
        {/* Mobile Filter Trigger */}
        <div className="flex lg:hidden justify-between items-center mb-6 bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-2xl px-6 py-4">
          <span className="text-gray-400 text-sm font-semibold">
            <strong className="text-white text-base mr-1">
              {filteredExperts.length}
            </strong>
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
            availableSpecialties={availableSpecialties}
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
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
