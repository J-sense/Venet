import { StarRating } from "@/components/ui/StarRating";

import { useGetAllReviewsQuery } from "@/redux/features/userDashboard/userSession.api";
import { useExpertProfileQuery } from "@/redux/features/expertDashboard/expertProfile.api";

export const ExpertsReview = () => {
  const { data: expertProfileData } = useExpertProfileQuery(undefined);

  // Extract Expert ID safely from profile response
  const expertId =
    expertProfileData?.data?.user?.id || expertProfileData?.user?.id;

  // Execute reviews query only when expertId is available
  const { data: reviewsResponse, isLoading: isLoadingReviews } =
    useGetAllReviewsQuery(expertId, {
      skip: !expertId,
      refetchOnMountOrArgChange: true,
    });
  console.log(reviewsResponse);
  const apiData = reviewsResponse?.data;
  const stats = apiData?.stats;

  // Extract reviews list
  const reviewsList: any[] = Array.isArray(apiData?.reviews)
    ? apiData.reviews
    : Array.isArray(apiData)
      ? apiData
      : [];

  const averageRating =
    stats?.average_rating !== undefined ? stats.average_rating : 0;
  const totalReviewCount =
    stats?.review_count !== undefined ? stats.review_count : reviewsList.length;
  const recommendedPercentage =
    stats?.recommended_percentage !== null &&
    stats?.recommended_percentage !== undefined
      ? `${stats.recommended_percentage}%`
      : "0%";

  const ratingBreakdown = stats?.rating_breakdown || {};

  // Build rating bars data dynamically (5 stars to 1 star)
  const displayRatingData = [5, 4, 3, 2, 1].map((stars) => {
    const starInfo = ratingBreakdown[String(stars)] || {
      count: 0,
      percentage: 0,
    };
    return {
      stars,
      count: starInfo.count,
      width: `${starInfo.percentage}%`,
    };
  });

  const displayReviewsList = reviewsList;

  return (
    <div className="w-full md:p-10">
      {/* ==================== Rating & Review Section (with #0F172A) ==================== */}
      <div className="bg-[#0F172A] p-6 md:p-8 rounded-3xl border border-white/5 mb-10">
        <h2 className="text-2xl font-semibold text-white mb-8">
          Rating & Review
        </h2>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Rating Bars */}
          <div className="flex-1">
            <div className="space-y-5">
              {displayRatingData.map((item) => (
                <div key={item.stars} className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 w-10">
                    {item.stars} stars
                  </span>

                  <div className="flex-1 h-3 bg-[#1E2937] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFAB00] transition-all duration-300"
                      style={{ width: item.width }}
                    />
                  </div>

                  <span className="text-sm font-medium text-gray-300 w-8 text-right">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Overall Rating */}
          <div className="lg:w-80 flex-shrink-0 flex flex-col items-center lg:items-start">
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-bold text-white tracking-tighter">
                {averageRating}
              </span>
              <span className="text-5xl text-yellow-400">★</span>
            </div>

            <div className="text-gray-400 mt-1">
              {totalReviewCount} {totalReviewCount === 1 ? "Review" : "Reviews"}
            </div>

            <div className="mt-6 bg-emerald-500/10 text-emerald-400 text-sm font-medium px-6 py-2.5 rounded-2xl inline-flex items-center gap-2">
              <span>{recommendedPercentage}</span>
              <span className="text-emerald-500">Recommended</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Reviews List Section ==================== */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-6">
          Reviews ({totalReviewCount})
        </h3>

        {isLoadingReviews ? (
          <div className="py-12 text-center text-sm text-zinc-400">
            Loading reviews...
          </div>
        ) : displayReviewsList.length === 0 ? (
          <div className="py-12 text-center text-sm text-zinc-500">
            No reviews yet.
          </div>
        ) : (
          <div className="space-y-6">
            {displayReviewsList.map((review: any, index: number) => {
              const reviewerName =
                review.reviewer_name || review.name || "Anonymous User";
              const avatarUrl =
                review.reviewer_image ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  reviewerName,
                )}&background=1E293B&color=3B82F6`;

              const timeStr = review.created_at
                ? new Date(review.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : review.time || "";

              return (
                <div
                  key={review.id || index}
                  className="bg-[#0F172A] rounded-2xl p-6 transition-all hover:bg-[#25344A]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={avatarUrl}
                        alt={reviewerName}
                        className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-white">
                          {reviewerName}
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {timeStr}
                    </span>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-[15px]">
                    {review.comment || "No written comment provided."}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
