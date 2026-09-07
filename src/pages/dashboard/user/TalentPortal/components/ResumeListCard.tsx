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
      className={`bg-[#0D1526] border-[#FFFFFF0F] p-5 transition-all duration-300 ${className}`}
    >
      <CardContent className="p-0 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">
                Generated Resumes
              </h3>
              <p className="text-xs text-[#90A1B9]">
                Access and download your created resumes
              </p>
            </div>
          </div>
          <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full font-semibold">
            {resumes.length} {resumes.length === 1 ? "Resume" : "Resumes"}
          </span>
        </div>

        {/* Filter Tabs */}
        {resumes.length > 0 && (
          <div className="flex items-center gap-1.5 bg-[#091322] p-1 rounded-xl border border-white/5 text-xs">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                filter === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              All ({resumes.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("ai_generated")}
              className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                filter === "ai_generated"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              AI Generated (
              {resumes.filter((r) => r.source === "ai_generated").length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("manual")}
              className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                filter === "manual"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
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
            <p className="text-xs">Fetching your resume list...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center text-red-400 text-xs">
            Failed to load resume list. Please try again.
          </div>
        )}

        {/* Resume Items Scroll List */}
        {!isLoading && !isError && (
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
            {filteredResumes.length === 0 ? (
              <div className="py-8 text-center text-zinc-500 text-xs bg-[#091322] rounded-xl border border-white/5">
                No resumes found.
              </div>
            ) : (
              filteredResumes.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#101E2D] hover:bg-[#15273B] border border-white/5 hover:border-white/10 rounded-xl p-3 flex items-center justify-between gap-3 transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        item.source === "ai_generated"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
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
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
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
                      <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                        ID: {item.id}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {item.pdf_url ? (
                      <>
                        <a
                          href={item.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open PDF"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-600 text-zinc-400 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={item.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          title="Download PDF"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-600 text-zinc-400 hover:text-white transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      </>
                    ) : (
                      <span className="text-[10px] text-zinc-500 bg-white/5 px-2 py-1 rounded-md">
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
