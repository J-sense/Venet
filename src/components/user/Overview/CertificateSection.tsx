import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Award, ExternalLink, FileBadge, Loader2 } from "lucide-react";
import { useGetAllCertificateQuery } from "@/redux/features/userDashboard/userProfile.api";
import AssessmentCompleteModal from "@/pages/dashboard/user/AssessmentComplete";

export function CertificateSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data: certResponse, isLoading } = useGetAllCertificateQuery(undefined);
  const certificates: any[] = certResponse?.data || [];

  useEffect(() => {
    if (searchParams.get("showCertificate") === "true") {
      setIsModalOpen(true);
      if (certificates.length > 0) {
        setSelectedCert(certificates[0]);
      }
      navigate("/dashboard/user", { replace: true });
    }
  }, [searchParams, navigate, certificates]);

  return (
    <Card className="bg-[#0D1526] border-[#FFFFFF0F]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-white">Certificates</h3>
          </div>
          {certificates.length > 0 && (
            <span className="text-xs font-semibold px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
              {certificates.length} Earned
            </span>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin mb-2" />
            <p className="text-xs text-zinc-400">Loading certificates...</p>
          </div>
        ) : certificates.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-6 rounded-xl text-center">
            <div className="w-12 h-12 bg-[#1E293B]/50 rounded-full flex items-center justify-center mb-3">
              <FileBadge className="w-6 h-6 text-[#62748E]" />
            </div>
            <p className="text-white font-medium text-sm mb-1">
              No certificates yet
            </p>
            <p className="text-[#62748E] text-xs max-w-[180px]">
              Complete a program to earn your first certificate.
            </p>
          </div>
        ) : (
          /* Certificate List */
          <div className="space-y-3">
            {certificates.map((cert: any) => (
              <div
                key={cert.id}
                className="bg-[#162032] border border-white/5 rounded-xl p-3.5 flex items-center justify-between gap-3 hover:border-blue-500/30 transition-all group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                      {cert.certificate_number}
                    </span>
                  </div>
                  <h4 className="text-white font-medium text-sm truncate">
                    {cert.program?.name || "Program Certificate"}
                  </h4>
                  <p className="text-[#62748E] text-[11px] mt-0.5">
                    Issued: {cert.issued_at ? new Date(cert.issued_at).toLocaleDateString() : "Recently"}
                  </p>
                </div>

                <div className="flex items-center shrink-0">
                  {cert.pdf_url && (
                    <a
                      href={cert.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors text-xs font-medium cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View PDF
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        <AssessmentCompleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          certificate={selectedCert || certificates[0]}
        />
      </CardContent>
    </Card>
  );
}
