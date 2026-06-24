import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

interface Certificate {
  id: number;
  title: string;
  program: string;
  image: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "CERTIFICATE OF APPRECIATION",
    program: "Mental Health Program",
    image: "/certificate.jpg", // Replace with actual paths
  },
  {
    id: 2,
    title: "CERTIFICATE OF APPRECIATION",
    program: "Health & Fitness Program",
    image: "/certificate.jpg",
  },
  {
    id: 3,
    title: "CERTIFICATE OF APPRECIATION",
    program: "Educational Services Program",
    image: "/certificate.jpg",
  },
];

export default function UserCertificates() {
  const handleDownload = (program: string) => {
    // TODO: Implement actual PDF download logic
    console.log(`Downloading certificate: ${program}`);
    alert(`Downloading ${program} certificate...`);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Professional Certificates
        </h2>
        <p className="text-zinc-400 mt-1">
          Professional certificates and accomplishments by vNET
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <Card
            key={cert.id}
            className="bg-zinc-900 border-zinc-700 overflow-hidden hover:border-blue-500/50 transition-all duration-200 group"
          >
            <CardContent className="p-0">
              {/* Certificate Image */}
              <div className="relative aspect-[4/3] bg-zinc-950 border-b border-zinc-700">
                <img
                  src={cert.image}
                  alt={cert.program}
                  className="w-full h-full object-cover"
                // Fallback if image doesn't exist
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Certificate Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium tracking-wider text-center">
                    {cert.title}
                  </p>
                </div>
              </div>

              {/* Program Name & Download Button */}
              <div className="p-5">
                <h3 className="text-white font-semibold text-center mb-4">
                  {cert.program}
                </h3>

                <Button
                  onClick={() => handleDownload(cert.program)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl flex items-center justify-center gap-2 font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* About Section */}
      <div className="bg-[#155DFC1A] border border-zinc-700 rounded-2xl p-6">
        <h3 className="text-[#9F9FA9] font-semibold mb-3">
          About vNET Certificates
        </h3>
        <ul className="space-y-2 text-sm text-[#9F9FA9]">
          <li className="flex gap-2">
            • Certificates are digitally verified and include a unique
            certificate number
          </li>
          <li className="flex gap-2">
            • Share your certificates on LinkedIn, resumes, or portfolios
          </li>
          <li className="flex gap-2">
            • Certificates never expire and remain accessible in your account
          </li>
        </ul>
      </div>
    </div>
  );
}
