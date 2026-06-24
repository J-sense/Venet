import { StarRating } from "@/components/ui/StarRating";

export const ExpertsReview = () => {
  const ratingData = [
    { stars: 5, count: 10, width: "85%" },
    { stars: 4, count: 4, width: "34%" },
    { stars: 3, count: 3, width: "25%" },
    { stars: 2, count: 0, width: "0%" },
    { stars: 1, count: 0, width: "0%" },
  ];

  const reviews = [
    {
      name: "Kevin L.",
      rating: 5,
      time: "3 weeks ago",
      comment:
        "Tony helped me finally overcome chronic procrastination. His systems approach is brilliant—I'm more productive now than I've ever been. Highly recommend for anyone struggling with consistency.",
    },
    {
      name: "Rachel S.",
      rating: 5,
      time: "1 month ago",
      comment:
        "I've built 8 new habits that completely transformed my life thanks to Tony's coaching. His accountability and frameworks made the impossible feel achievable.",
    },
    {
      name: "Daniel P.",
      rating: 4,
      time: "2 month ago",
      comment:
        "Great coach with practical advice. Sometimes feels a bit formulaic, but the systems work so I can't complain.",
    },
  ];

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
              {ratingData.map((item) => (
                <div key={item.stars} className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 w-10 ">
                    {item.stars} stars
                  </span>

                  <div className="flex-1 h-3 bg-[#1E2937] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFAB00] transition-all"
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
                4.5
              </span>
              <span className="text-5xl text-yellow-400">★</span>
            </div>

            <div className="text-gray-400 mt-1">17 Reviews</div>

            <div className="mt-6 bg-emerald-500/10 text-emerald-400 text-sm font-medium px-6 py-2.5 rounded-2xl inline-flex items-center gap-2">
              <span>88%</span>
              <span className="text-emerald-500">Recommended</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Reviews List Section (No background color) ==================== */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-6">Reviews (103)</h3>

        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-[#0F172A] rounded-2xl p-6 transition-all hover:bg-[#25344A]"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-semibold text-white">{review.name}</div>
                  <StarRating rating={review.rating} />
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {review.time}
                </span>
              </div>

              <p className="text-gray-300 leading-relaxed text-[15px]">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
