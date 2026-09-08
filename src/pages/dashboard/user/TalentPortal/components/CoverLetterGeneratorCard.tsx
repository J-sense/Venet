import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGeneretateCoverLetterByMutation } from "@/redux/features/userDashboard/userProfile.api";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CoverLetterGeneratorCardProps {
  className?: string;
  onGenerateSuccess?: (data: any) => void;
}

export default function CoverLetterGeneratorCard({
  className = "",
  onGenerateSuccess,
}: CoverLetterGeneratorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedResult, setGeneratedResult] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);

  const [generateCoverLetter, { isLoading }] =
    useGeneretateCoverLetterByMutation();

  const handleAction = async () => {
    if (isExpanded && prompt.trim()) {
      try {
        const payload = { content: prompt.trim() };
        console.log("Generating Cover Letter Payload:", payload);
        const res = await generateCoverLetter(payload).unwrap();
        console.log("Cover Letter API Response:", res);

        if (res?.data) {
          setGeneratedResult(res.data);
          toast.success(res?.details || "Cover letter generated successfully!");
          if (onGenerateSuccess) {
            onGenerateSuccess(res.data);
          }
        } else {
          toast.success("Cover letter generated successfully!");
        }
      } catch (error: any) {
        console.error("Cover Letter generation error:", error);
        toast.error(
          error?.data?.details ||
          error?.data?.message ||
          error?.message ||
          "Failed to generate cover letter.",
        );
      }
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const coverLetterText =
    generatedResult?.cover_letter ||
    (typeof generatedResult === "string"
      ? generatedResult
      : generatedResult?.content?.about ||
      generatedResult?.content ||
      "");

  const pdfUrl = generatedResult?.pdf_url;
  const wordCount = generatedResult?.word_count;

  const handleCopy = () => {
    if (coverLetterText) {
      navigator.clipboard.writeText(coverLetterText);
      setIsCopied(true);
      toast.success("Cover letter copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDownloadTxt = () => {
    if (coverLetterText) {
      const element = document.createElement("a");
      const file = new Blob([coverLetterText], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "Cover_Letter.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success("Cover letter downloaded as text file!");
    }
  };

  return (
    <Card
      className={`bg-gradient-to-b from-[#0D1526] via-[#091322] to-[#0D1526] border border-purple-500/20 hover:border-purple-500/40 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 group shadow-xl shadow-black/30 ${className}`}
    >
      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-600/20 transition-all" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-600/20 transition-all" />

      <CardContent className="p-0 relative z-10 space-y-5">
        {/* Header Row: Icon & Badge */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center shadow-md shadow-purple-950/40 group-hover:scale-105 transition-transform">
            {generatedResult ? (
              <Check className="w-6 h-6 text-emerald-400" />
            ) : (
              <Sparkles className="w-6 h-6 text-purple-400" />
            )}
          </div>

          {wordCount ? (
            <span className="text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full">
              {wordCount} words
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Writing</span>
            </span>
          )}
        </div>

        {/* Text Content Header */}
        <div className="space-y-1.5">
          <h3 className="font-bold text-white text-lg tracking-tight">
            {generatedResult ? "Cover Letter Ready!" : "Cover Letter Generator"}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {generatedResult
              ? "Your AI-tailored cover letter has been generated successfully."
              : "AI-powered cover letters tailored to each job application."}
          </p>
        </div>

        {generatedResult ? (
          /* RESULT DISPLAY STATE */
          <div className="space-y-4">
            {/* Formatted Cover Letter Text Card */}
            {coverLetterText && (
              <div className="bg-[#0F172A]/90 border border-purple-500/20 rounded-xl p-4 max-h-64 overflow-y-auto custom-scrollbar shadow-inner">
                <p className="text-xs text-zinc-200 leading-relaxed whitespace-pre-line font-mono">
                  {coverLetterText}
                </p>
              </div>
            )}

            {/* Action Buttons Grid */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-xl py-3 bg-[#131D31] hover:bg-[#1C2A44] text-white border border-white/10 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-purple-400" />
                  )}
                  {isCopied ? "Copied!" : "Copy Text"}
                </Button>

                {pdfUrl ? (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="rounded-xl py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/40 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </a>
                ) : (
                  <Button
                    type="button"
                    onClick={handleDownloadTxt}
                    className="rounded-xl py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/40 transition-all"
                  >
                    <FileText className="w-3.5 h-3.5" /> Download TXT
                  </Button>
                )}
              </div>

              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-xl py-3 bg-[#131D31] hover:bg-[#1C2A44] border border-white/10 text-zinc-300 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-all text-center"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open Fullscreen PDF
                </a>
              )}

              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setGeneratedResult(null);
                  setIsExpanded(true);
                }}
                className="w-full text-zinc-400 hover:text-white hover:bg-white/5 text-xs py-2 mt-1 rounded-xl"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Write Another Cover Letter
              </Button>
            </div>
          </div>
        ) : (
          /* FORM INPUT STATE */
          <div className="space-y-4">
            {/* Expandable Prompt Area */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
                }`}
            >
              <label className="text-xs text-purple-300 font-semibold mb-2 block uppercase tracking-wider">
                Job Details & Description
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
                placeholder="Paste the job description or enter key points to include in your cover letter..."
                className="w-full bg-[#0F172A]/90 border border-purple-500/20 hover:border-purple-500/40 rounded-xl p-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none h-32 transition-all shadow-inner disabled:opacity-50"
              />
            </div>

            {/* Action Button */}
            <Button
              type="button"
              disabled={isLoading}
              onClick={handleAction}
              className={`w-full rounded-xl py-6 font-semibold flex items-center justify-center gap-2 transition-all duration-300 group/btn ${isExpanded
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/40"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-950/40"
                }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Cover Letter...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  <span>{isExpanded ? "Generate Now" : "Write Cover Letter"}</span>
                  <ArrowRight className="w-4 h-4 text-purple-200 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
