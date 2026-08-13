/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import {
  Star,
  Award,
  GraduationCap,
  CheckCircle2,
  Heart,
  Shield,
  FileText,
} from "lucide-react";
import type { Expert } from "../../data/expertsData";
import { useGetSingleExpertQuery } from "@/redux/features/expertsRoute/expertRoute.api";

interface ExpertProfileDetailsProps {
  expert: Expert;
  id: string | number;
}

// Helper to format image URLs and handle HTTP/HTTPS mixed content
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

export default function ExpertProfileDetails({
  expert,
  id,
}: ExpertProfileDetailsProps) {
  const { data: singExpert, isLoading } = useGetSingleExpertQuery(id);
  const apiData = singExpert?.data;
  const userObj = apiData?.user;

  // Values strictly derived from API or basic fallback string (NO mock data)
  const name =
    [userObj?.first_name, userObj?.last_name].filter(Boolean).join(" ") ||
    expert?.name ||
    "Expert Profile";

  const firstName = userObj?.first_name || name.split(" ")[0] || "Expert";
  const specialty = userObj?.specialty || expert?.specialty || "Expert";
  const title =
    apiData?.professional_title ||
    userObj?.specialty ||
    expert?.title ||
    "Expert";

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name,
  )}&background=1E293B&color=3B82F6`;

  const avatar =
    getImageUrl(userObj?.image) || expert?.avatar || fallbackAvatar;

  const rating = apiData?.average_rating
    ? Number(apiData.average_rating)
    : expert?.rating
      ? Number(expert.rating)
      : 0;

  const reviewsCount =
    apiData?.review_count !== undefined && apiData?.review_count !== null
      ? Number(apiData.review_count)
      : expert?.reviewsCount ?? 0;

  const yearsExperience =
    userObj?.years_of_experience !== null &&
      userObj?.years_of_experience !== undefined
      ? `${userObj.years_of_experience} yrs exp`
      : null;

  const aboutText = userObj?.bio || "No biography provided yet.";

  // Extracted lists strictly from API without mock defaults
  const specializationsList = useMemo(() => {
    if (
      Array.isArray(apiData?.specializations) &&
      apiData.specializations.length > 0
    ) {
      return apiData.specializations.map((s: any) => ({
        title: s.title || "Specialization",
        description: s.description || "",
      }));
    }
    return [];
  }, [apiData?.specializations]);

  const certificationsList = useMemo(() => {
    if (
      Array.isArray(apiData?.certifications) &&
      apiData.certifications.length > 0
    ) {
      return apiData.certifications.map((c: any) => ({
        name: c.name || "Certification",
        file: getImageUrl(c.file),
      }));
    }
    return [];
  }, [apiData?.certifications]);

  const achievementsList = useMemo(() => {
    if (
      Array.isArray(apiData?.achievements) &&
      apiData.achievements.length > 0
    ) {
      return apiData.achievements.map((a: any) => ({
        name: a.name || "Achievement",
        file: getImageUrl(a.file),
      }));
    }
    return [];
  }, [apiData?.achievements]);

  const educationList = useMemo(() => {
    if (Array.isArray(apiData?.education) && apiData.education.length > 0) {
      return apiData.education.map((e: any) => ({
        degree: e.degree || "Degree",
        institution: e.institution
          ? `${e.institution}${e.year ? `, ${e.year}` : ""}`
          : e.year
            ? String(e.year)
            : "",
        file: getImageUrl(e.certificate),
      }));
    }
    return [];
  }, [apiData?.education]);

  const reviewsList = useMemo(() => {
    if (Array.isArray(apiData?.reviews) && apiData.reviews.length > 0) {
      return apiData.reviews.map((r: any) => ({
        author: r.author || r.name || "Verified Client",
        time: r.time || r.date || "Recent",
        rating: Number(r.rating) || 5,
        comment: r.comment || r.content || "",
      }));
    }
    return [];
  }, [apiData?.reviews]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 text-slate-100 animate-pulse">
        <div className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-3xl p-8 h-40" />
        <div className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-3xl p-8 h-48" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 text-slate-100">
      {/* 1. Header Profile Card */}
      <div className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start relative z-10">
          <div className="relative flex-shrink-0">
            <img
              src={avatar}
              alt={name}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = fallbackAvatar;
              }}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-slate-800/80 shadow-2xl group-hover:border-[#007AFF] transition-all duration-300"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#007AFF] text-white p-1.5 rounded-full border-2 border-[#0B1220] shadow-lg">
              <Shield className="w-4 h-4 fill-white text-[#007AFF]" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
                {name}
              </h1>
              <span className="self-center md:self-auto bg-[#007AFF]/15 text-[#3B82F6] text-xs font-semibold px-3 py-1 rounded-full border border-[#3B82F6]/20 w-fit">
                {specialty}
              </span>
            </div>

            <p className="text-[#94A3B8] text-base md:text-lg font-medium mt-1.5">
              {title}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-sm font-semibold">
              <div className="flex items-center gap-1.5 bg-amber-400/10 text-amber-400 px-3 py-1.5 rounded-xl border border-amber-400/20">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>
                  {rating > 0 ? `${rating.toFixed(1)} Rating` : "No Ratings"}
                </span>
              </div>
              <div className="text-slate-400 font-medium">
                ({reviewsCount} verified reviews)
              </div>
              {yearsExperience && (
                <>
                  <div className="hidden md:block text-slate-600">•</div>
                  <div className="text-slate-300 bg-slate-800/50 px-3 py-1.5 rounded-xl border border-slate-700/40">
                    {yearsExperience}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. About Section */}
      <section className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-3xl p-6 md:p-8 backdrop-blur-md">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#3B82F6]" />
          About {firstName}
        </h2>
        <p className="text-[#94A3B8] leading-relaxed text-sm md:text-base whitespace-pre-line">
          {aboutText}
        </p>
      </section>

      {/* 3. Achievements & Educations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Achievements Card */}
        <div className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Award className="w-5 h-5 text-[#3B82F6]" />
              Achievements
            </h3>
            {achievementsList.length > 0 ? (
              <ul className="space-y-4">
                {achievementsList.map((ach: any, idx: any) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-slate-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0 flex-1">
                      <span className="text-sm md:text-base font-medium leading-tight">
                        {ach.name}
                      </span>
                      {ach.file && (
                        <a
                          href={ach.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#3B82F6] hover:underline font-bold inline-flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" /> View File
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500 italic">
                No achievements added yet.
              </p>
            )}
          </div>
        </div>

        {/* Education Card */}
        <div className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <GraduationCap className="w-5 h-5 text-[#3B82F6]" />
              Education
            </h3>
            {educationList.length > 0 ? (
              <div className="space-y-4">
                {educationList.map((edu: any, idx: any) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm md:text-base font-bold text-slate-200 leading-snug">
                        {edu.degree}
                      </h4>
                      {edu.file && (
                        <a
                          href={edu.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#3B82F6] hover:underline font-bold shrink-0 flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" /> Certificate
                        </a>
                      )}
                    </div>
                    {edu.institution && (
                      <p className="text-xs md:text-sm text-slate-400 font-medium">
                        {edu.institution}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">
                No education details added yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 4. Certifications Pill Grid */}
      <div className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-3xl p-6 backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800/80 pb-3">
          Certifications & Credentials
        </h3>
        {certificationsList.length > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            {certificationsList.map((cert: any, idx: any) =>
              cert.file ? (
                <a
                  key={idx}
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#121B2E] hover:bg-[#1E293B] text-slate-300 hover:text-white text-xs md:text-sm px-4 py-2 rounded-xl border border-slate-800 font-semibold shadow-inner transition-colors flex items-center gap-2"
                >
                  <span>{cert.name}</span>
                  <FileText className="w-3.5 h-3.5 text-[#3B82F6]" />
                </a>
              ) : (
                <span
                  key={idx}
                  className="bg-[#121B2E] text-slate-300 text-xs md:text-sm px-4 py-2 rounded-xl border border-slate-800 font-semibold shadow-inner"
                >
                  {cert.name}
                </span>
              ),
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">
            No certifications uploaded yet.
          </p>
        )}
      </div>

      {/* 5. Specializations Cards Grid */}
      <section className="space-y-6">
        <h3 className="text-lg font-bold text-white border-b border-slate-800/80 pb-3">
          Specializations
        </h3>

        {specializationsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specializationsList.map((spec: any, idx: any) => (
              <div
                key={idx}
                className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-2xl p-6 backdrop-blur-sm 
                         hover:border-[#3B82F6]/30 hover:bg-[#111827]/60 transition-all duration-300"
              >
                <h4 className="text-base font-bold text-white mb-2 tracking-wide">
                  {spec.title}
                </h4>
                {spec.description && (
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {spec.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">
            No specializations added yet.
          </p>
        )}
      </section>

      {/* 6. Reviews Section */}
      <div className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-3xl p-6 md:p-8 backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center justify-between">
          <span>Reviews ({reviewsCount})</span>
          <span className="text-xs font-semibold text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
            Verified Clients Only
          </span>
        </h3>
        <section className="space-y-4">
          {reviewsList.length > 0 ? (
            <div className="space-y-4">
              {reviewsList.map((rev: any, idx: any) => (
                <div
                  key={idx}
                  className="bg-[#0B1220]/60 border border-[#1E293B]/60 rounded-2xl p-6 backdrop-blur-sm transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600/20 text-[#3B82F6] flex items-center justify-center font-bold">
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">
                          {rev.author}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          {rev.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < rev.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-700 text-slate-700"
                            }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">No reviews yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
