import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Award, FileBadge } from "lucide-react";
import { Button } from "@/components/ui/button";
import AssessmentCompleteModal from "@/pages/dashboard/user/AssessmentComplete";

export function CertificateSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("showCertificate") === "true") {
      setIsModalOpen(true);
      // Remove the query param so it doesn't keep reopening on refresh
      navigate("/dashboard/user", { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <Card className="bg-[#0D1526] border-[#FFFFFF0F]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-white">Certificates</h3>
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)} 
            variant="outline" 
            size="sm" 
            className="bg-[#1E293B] text-white hover:bg-[#334155] hover:text-white border-none"
          >
            View Certificate
          </Button>
        </div>

        {/* Placeholder state */}
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

        {/* Modal */}
        <AssessmentCompleteModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </CardContent>
    </Card>
  );
}
