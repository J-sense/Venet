import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGeneretateCoverLetterByMutation } from "@/redux/features/userDashboard/userProfile.api";
import {
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
      className={`bg-[#0D1526] border-[#FFFFFF0F] p-5 transition-all duration-300 ${className}`}
    >
      <CardContent className="p-0">
        {/* Icon Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-[#8E51FF1A] border border-[#8E51FF33]/20 rounded-xl flex items-center justify-center">
            {generatedResult ? (
              <Check className="w-6 h-6 text-emerald-400" />
            ) : (
              <Sparkles className="w-6 h-6 text-[#A684FF]" />
            )}
          </div>
          {wordCount && (
            <span className="text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full">
              {wordCount} words
            </span>
          )}
        </div>

        {/* Text Content Header */}
        <div className="mb-6">
          <h3 className="font-semibold text-white text-lg">
            {generatedResult ? "Cover Letter Ready!" : "Cover Letter Generator"}
          </h3>
          <p className="text-sm text-[#90A1B9] mt-1 leading-relaxed">
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
              <div className="bg-[#101E2D] border border-white/10 rounded-2xl p-5 max-h-64 overflow-y-auto custom-scrollbar shadow-inner">
                <p className="text-xs text-zinc-200 leading-relaxed whitespace-pre-line font-mono">
                  {coverLetterText}
                </p>
              </div>
            )}

            {/* Action Buttons Grid */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-full py-3 bg-[#1D293D] hover:bg-[#283852] text-white border border-white/10 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-blue-400" />
                  )}
                  {isCopied ? "Copied!" : "Copy Text"}
                </Button>

                {pdfUrl ? (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="rounded-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-blue-900/20 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </a>
                ) : (
                  <Button
                    type="button"
                    onClick={handleDownloadTxt}
                    className="rounded-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-blue-900/20 transition-all"
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
                  className="w-full rounded-full py-3 bg-[#101E2D] hover:bg-[#16293D] border border-white/10 text-zinc-300 font-medium text-xs flex items-center justify-center gap-2 transition-colors text-center"
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
                className="w-full text-zinc-400 hover:text-white hover:bg-white/5 text-xs py-2 mt-1"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Write Another Cover Letter
              </Button>
            </div>
          </div>
        ) : (
          /* FORM INPUT STATE */
          <>
            {/* Expandable Prompt Area */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded
                  ? "max-h-96 opacity-100 mb-6"
                  : "max-h-0 opacity-0 mb-0"
              }`}
            >
              <label className="text-xs text-zinc-400 font-medium mb-2 block uppercase tracking-wider">
                Job Details & Description
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
                placeholder="Paste the job description or enter key points to include in your cover letter..."
                className="w-full bg-[#101E2D] border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-[#6a768a] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none h-32 disabled:opacity-50"
              />
            </div>

            {/* Action Button */}
            <Button
              type="button"
              disabled={isLoading}
              onClick={handleAction}
              className={`w-full rounded-full py-6 font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                isExpanded
                  ? "bg-[#10B981] hover:bg-[#059669] text-white shadow-lg shadow-emerald-900/20"
                  : "bg-[#194BFB] hover:bg-[#1D4ED8] text-white shadow-lg shadow-blue-900/20"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Cover Letter...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {isExpanded ? "Generate Now" : "Write Cover Letter"}
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
