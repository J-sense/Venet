import { Card, CardContent } from "@/components/ui/card";
import { useGetAllResumeListQuery } from "@/redux/features/userDashboard/userProfile.api";
import {
  Download,
  ExternalLink,
  FileText,
  Loader2,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { useState } from "react";

interface ResumeItem {
  id: string;
  source: string;
  pdf_url: string | null;
}

export default function ResumeListCard({
  className = "",
}: {
  className?: string;
}) {
  const {
    data: resumeListResponse,
    isLoading,
    isError,
  } = useGetAllResumeListQuery(undefined);

  const [filter, setFilter] = useState<"all" | "ai_generated" | "manual">(
    "all",
  );

  const resumes: ResumeItem[] = resumeListResponse?.data || [];

  const filteredResumes = resumes.filter((item) => {
    if (filter === "all") return true;
    return item.source === filter;
  });

  return (
    <Card
      className={`bg-gradient-to-b from-[#0D1526] via-[#091322] to-[#0D1526] border border-blue-500/20 hover:border-blue-500/40 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 group shadow-xl shadow-black/30 ${className}`}
    >
      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-600/20 transition-all" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-600/20 transition-all" />

      <CardContent className="p-0 relative z-10 space-y-5">
        {/* Header Row: Icon & Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center shadow-md shadow-blue-950/40 group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg tracking-tight">
                Generated Resumes
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Access and download your created resumes
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full">
            {resumes.length} {resumes.length === 1 ? "Resume" : "Resumes"}
          </span>
        </div>

        {/* Filter Tabs */}
        {resumes.length > 0 && (
          <div className="flex items-center gap-1.5 bg-[#0B1220] p-1.5 rounded-xl border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                filter === "all"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-950/40"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              All ({resumes.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("ai_generated")}
              className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                filter === "ai_generated"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-950/40"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              AI Generated (
              {resumes.filter((r) => r.source === "ai_generated").length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("manual")}
              className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                filter === "manual"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-950/40"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Manual ({resumes.filter((r) => r.source === "manual").length})
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="py-8 flex flex-col items-center justify-center text-zinc-400 space-y-2">
            <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
            <p className="text-xs font-medium">Fetching your resume list...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center text-red-400 text-xs font-medium">
            Failed to load resume list. Please try again.
          </div>
        )}

        {/* Resume Items Scroll List */}
        {!isLoading && !isError && (
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
            {filteredResumes.length === 0 ? (
              <div className="py-8 text-center text-gray-500 text-xs bg-[#0F172A]/70 rounded-xl border border-white/5">
                No resumes found.
              </div>
            ) : (
              filteredResumes.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0F172A]/90 hover:bg-[#15233D] border border-white/10 hover:border-blue-500/30 rounded-xl p-3 flex items-center justify-between gap-3 transition-all group/item shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        item.source === "ai_generated"
                          ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                          : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {item.source === "ai_generated" ? (
                        <Sparkles className="w-4 h-4" />
                      ) : (
                        <UserCheck className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white truncate">
                          Resume #{item.id.slice(0, 8)}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            item.source === "ai_generated"
                              ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                              : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          }`}
                        >
                          {item.source === "ai_generated"
                            ? "AI Generated"
                            : "Manual"}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 truncate mt-0.5 font-mono">
                        ID: {item.id}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.pdf_url ? (
                      <>
                        <a
                          href={item.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open PDF"
                          className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-600 border border-blue-500/20 text-blue-400 hover:text-white transition-all shadow-sm"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={item.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          title="Download PDF"
                          className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-600 border border-emerald-500/20 text-emerald-400 hover:text-white transition-all shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      </>
                    ) : (
                      <span className="text-[10px] text-gray-500 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                        No PDF
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
