import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useGetAllCertificateQuery } from "@/redux/features/userDashboard/userProfile.api";
import {
  Award,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  Download,
  ExternalLink,
  Eye,
  FileBadge,
  Loader2,
  Ribbon,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export interface ProgramBenefit {
  id: number;
  text: string;
  order: number;
}

export interface ProgramData {
  id?: string;
  slug?: string;
  name?: string;
  description?: string;
  price?: string;
  recommendation_reason?: string;
  finish_date?: string;
  status?: number;
  benefits?: ProgramBenefit[];
  created_at?: string;
  updated_at?: string;
}

export interface UserCertificate {
  id: string | number;
  certificate_number?: string | null;
  program?: ProgramData | null;
  pdf_url?: string | null;
  issued_at?: string | null;
}

const formatDate = (dateString?: string | null): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "N/A";
  }
};

export default function UserCertificates() {
  const { data: certResponse, isLoading, isError, refetch } = useGetAllCertificateQuery(undefined);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>("Certificate Preview");

  // Extract certificate array safely handling direct array and object wrappers
  const rawData = certResponse?.data ?? certResponse;
  const certificates: UserCertificate[] = Array.isArray(rawData) ? rawData : [];

  const handleOpenPdf = (pdfUrl?: string | null) => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handlePreviewPdf = (pdfUrl?: string | null, title?: string) => {
    if (pdfUrl) {
      setSelectedPdfUrl(pdfUrl);
      if (title) setPreviewTitle(title);
    }
  };

  return (
    <div className="space-y-8 p-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <Award className="w-6 h-6 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              My Certificates
            </h2>
          </div>
          <p className="text-zinc-400 text-sm">
            View, download, and share your verified professional accomplishments issued by vNET
          </p>
        </div>

        {certificates.length > 0 && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full w-fit">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold text-blue-400">
              {certificates.length} {certificates.length === 1 ? "Certificate" : "Certificates"} Earned
            </span>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && <LoadingState />}

      {/* Error State */}
      {!isLoading && isError && <ErrorState onRetry={refetch} />}

      {/* Empty State */}
      {!isLoading && !isError && certificates.length === 0 && <EmptyState />}

      {/* Certificates Grid */}
      {!isLoading && !isError && certificates.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <CertificateCard
              key={cert?.id ?? index}
              cert={cert}
              onOpenPdf={handleOpenPdf}
              onPreviewPdf={handlePreviewPdf}
            />
          ))}
        </div>
      )}

      {/* About Section */}
      <AboutSection />

      {/* PDF Modal Preview Dialog */}
      <Dialog open={!!selectedPdfUrl} onOpenChange={(open) => !open && setSelectedPdfUrl(null)}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-4xl w-[95vw] h-[85vh] p-0 flex flex-col rounded-2xl overflow-hidden">
          <DialogHeader className="p-4 border-b border-zinc-800 flex flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-base font-semibold flex items-center gap-2">
              <Ribbon className="w-5 h-5 text-amber-500" />
              {previewTitle}
            </DialogTitle>
            {selectedPdfUrl && (
              <Button
                size="sm"
                onClick={() => handleOpenPdf(selectedPdfUrl)}
                className="bg-blue-600 hover:bg-blue-500 text-white gap-1.5 text-xs mr-6"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open Fullscreen
              </Button>
            )}
          </DialogHeader>
          <div className="flex-1 bg-zinc-900 w-full h-full relative">
            {selectedPdfUrl ? (
              <iframe
                src={selectedPdfUrl}
                className="w-full h-full border-none"
                title="Certificate PDF"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-500">
                Unable to load preview
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface CertificateCardProps {
  cert: UserCertificate;
  onOpenPdf: (pdfUrl?: string | null) => void;
  onPreviewPdf: (pdfUrl?: string | null, title?: string) => void;
}

function CertificateCard({ cert, onOpenPdf, onPreviewPdf }: CertificateCardProps) {
  const [copied, setCopied] = useState(false);

  const programName = cert?.program?.name ?? "Program Certificate";
  const programDesc = cert?.program?.description;
  const certNum = cert?.certificate_number ?? "N/A";
  const issuedDate = formatDate(cert?.issued_at);
  const finishDate = cert?.program?.finish_date ? formatDate(cert.program.finish_date) : null;
  const pdfUrl = cert?.pdf_url;
  const benefits = cert?.program?.benefits ?? [];

  const handleCopyCertNum = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (certNum && certNum !== "N/A") {
      navigator.clipboard.writeText(certNum);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="bg-zinc-900/90 border-zinc-800/90 overflow-hidden hover:border-blue-500/50 transition-all duration-300 group flex flex-col justify-between shadow-xl rounded-2xl">
      <CardContent className="p-0 flex flex-col justify-between h-full">
        <div>
          {/* Certificate Header Banner */}
          <div className="relative p-6 bg-gradient-to-br from-blue-950/80 via-zinc-900 to-zinc-950 border-b border-zinc-800/80 overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="p-2.5 bg-blue-600/10 border border-blue-500/20 rounded-xl shrink-0">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>

              {certNum !== "N/A" && (
                <button
                  onClick={handleCopyCertNum}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md tracking-wider hover:bg-amber-500/20 transition-colors cursor-pointer"
                  title="Click to copy certificate number"
                >
                  <span>{certNum}</span>
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                  )}
                </button>
              )}
            </div>

            <h3 className="text-lg font-bold text-white leading-snug group-hover:text-blue-400 transition-colors">
              {programName}
            </h3>

            {programDesc && (
              <p className="text-zinc-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                {programDesc}
              </p>
            )}
          </div>

          {/* Details Section */}
          <div className="p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400 border-b border-zinc-800/60 pb-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-zinc-500" />
                <span>Issued:</span>
                <span className="text-zinc-200 font-medium">{issuedDate}</span>
              </div>

              {finishDate && (
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Valid Until:</span>
                  <span className="text-zinc-200 font-medium">{finishDate}</span>
                </div>
              )}
            </div>

            {/* Program Benefits Tags */}
            {benefits.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Skills & Benefits Verified
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {benefits.map((b) => (
                    <span
                      key={b.id}
                      className="text-[11px] bg-zinc-800/70 border border-zinc-700/60 text-zinc-300 px-2.5 py-1 rounded-lg"
                    >
                      {b.text}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 pt-0 mt-auto">
          <div className="flex gap-2">
            <Button
              onClick={() => onOpenPdf(pdfUrl)}
              disabled={!pdfUrl}
              className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white py-5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all text-sm cursor-pointer shadow-lg shadow-blue-600/10"
            >
              <Download className="w-4 h-4" />
              {pdfUrl ? "Download PDF" : "PDF Unavailable"}
            </Button>

            {pdfUrl && (
              <Button
                onClick={() => onPreviewPdf(pdfUrl, programName)}
                variant="outline"
                className="bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border-zinc-700 p-3 py-5 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                title="Preview Certificate PDF"
              >
                <Eye className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl text-center">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
      <p className="text-zinc-300 font-medium">Fetching your certificates...</p>
      <p className="text-zinc-500 text-xs mt-1">Connecting to vNET records</p>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="p-8 bg-red-950/20 border border-red-800/40 rounded-2xl text-center space-y-3">
      <p className="text-red-400 font-medium text-base">Unable to load your certificates right now.</p>
      <p className="text-zinc-400 text-sm max-w-md mx-auto">
        There was a problem retrieving data from the server. Please check your internet connection or try again.
      </p>
      <Button
        onClick={onRetry}
        variant="outline"
        className="bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800 cursor-pointer"
      >
        Try Again
      </Button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl text-center">
      <div className="w-16 h-16 bg-zinc-800/70 rounded-full flex items-center justify-center mb-4 border border-zinc-700">
        <FileBadge className="w-8 h-8 text-zinc-400" />
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">No Certificates Found</h3>
      <p className="text-zinc-400 text-sm max-w-md mb-2">
        You haven't completed any certified programs yet.
      </p>
      <p className="text-zinc-500 text-xs max-w-md">
        Once you finish your program modules and roadmap assessments, your official certificates will appear here.
      </p>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="bg-gradient-to-r from-blue-950/30 via-zinc-900 to-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-zinc-200 font-semibold mb-3 flex items-center gap-2 text-sm">
        <ShieldCheck className="w-4 h-4 text-blue-400" />
        About vNET Certificates
      </h3>
      <ul className="space-y-2.5 text-xs text-zinc-400">
        <li className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
          Certificates are digitally signed and include an authentic unique certificate code.
        </li>
        <li className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
          You can download high-resolution PDF certificates or share them directly on LinkedIn, resumes, and portfolios.
        </li>
        <li className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
          Issued certificates remain permanently stored and accessible under your vNET profile.
        </li>
      </ul>
    </div>
  );
}


