import { Card, CardContent } from "@/components/ui/card";
import { Award, FileBadge } from "lucide-react";

export function CertificateSection() {
  return (
    <Card className="bg-[#0D1526] border-[#FFFFFF0F]">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-amber-500" />
          <h3 className="font-semibold text-white">Certificates</h3>
        </div>

        {/* Placeholder state */}
        <div className="flex flex-col items-center justify-center py-8  rounded-xl text-center">
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
      </CardContent>
    </Card>
  );
}
