/* eslint-disable react-hooks/set-state-in-effect */
import { Button } from "@/components/ui/button";
import { Briefcase, Check, FileText, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const agreementList = [
  {
    id: "nda",
    icon: FileText,
    title: "Non-Disclosure Agreement (NDA)",
    points: [
      "Maintain confidentiality of all client information shared during consultations",
      "Not disclose any personal, health, career, or educational information of clients",
      "Protect all proprietary information about the vNET platform and its operations",
      "Not use client information for any purpose other than providing consultations",
    ],
    label: "I have read and agree to the NDA",
  },
  {
    id: "nda2",
    icon: ShieldCheck,
    title: "Non-Disclosure Agreement",
    points: [
      "Trade secrets or business methods of vNET",
      "Client lists, contact information, or usage patterns",
      "Platform features, algorithms, or technical implementations",
      "Financial information or pricing strategies",
    ],
    label: "I have read and agree to the Non-Disclosure Agreement",
  },
  {
    id: "nca",
    icon: Briefcase,
    title: "Non-Compete Agreement",
    points: [
      "Solicit vNET clients for services outside the platform",
      "Create or join a directly competing platform in the same market",
      "Use client contacts gained through vNET for non-platform business",
      "Share or sell client information to third parties",
    ],
    label: "I have read and agree to the Non-Compete Agreement",
  },
];

export const AgreementModal = ({
  isOpen,
  onClose,
  onAccept,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}) => {
  const [accepted, setAccepted] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  const allAccepted = agreementList.every((a) => accepted[a.id]);
  const toggle = (id: string) =>
    setAccepted((prev) => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <>
      {/* Page backdrop — plain dark, no image */}
      <div
        className="fixed inset-0 z-[998] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal — the image lives only inside this */}
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 pointer-events-none max-w-full ">
        <div
          className="relative w-full max-w-[540px] max-h-[90vh] md:max-h-[95vh] rounded-[20px] overflow-hidden shadow-2xl pointer-events-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Background image layer (stays inside modal) ── */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/expertBG.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* ── Dark overlay on top of image ── */}
          <div className="absolute inset-0 bg-[#191C2B]/80 backdrop-blur-[1px]" />

          {/* ── All content sits above both layers ── */}
          <div className="relative z-10 p-5 sm:p-7 text-white overflow-y-auto flex-1 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/[0.08] border border-white/15 text-white/60 hover:text-white hover:bg-white/[0.15] flex items-center justify-center transition-all"
              aria-label="Close"
            >
              <X size={14} />
            </button>

            {/* Header */}
            <div className="mb-5 text-center">
              <h2 className="text-xl font-semibold text-white mb-1">
                Become an Expert
              </h2>
              <p className="text-[12px] text-white/45">
                First, please review and accept our agreements
              </p>
            </div>

            {/* Agreement cards */}
            <div className="flex flex-col gap-2.5 mb-5">
              {agreementList.map((item) => {
                const Icon = item.icon;
                const isChecked = !!accepted[item.id];

                return (
                  <div
                    key={item.id}
                    className={`rounded-xl p-3 sm:p-3.5 border transition-all duration-150 ${
                      isChecked
                        ? "border-blue-500/40 bg-blue-500/10"
                        : "border-white/[0.09] bg-white/[0.04]"
                    }`}
                  >
                    {/* Title row */}
                    <div className="flex items-start gap-2.5 mb-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={15} className="text-blue-400" />
                      </div>
                      <span className="text-[13px] font-semibold text-[#f0f0f0] leading-snug pt-1">
                        {item.title}
                      </span>
                    </div>

                    {/* Points */}
                    <ul className="list-disc bg-[#19273C] rounded-lg px-3 py-2.5 pl-[22px] mb-2.5 space-y-1 sm:space-y-1.5">
                      {item.points.map((pt, i) => (
                        <li key={i} className="text-[11px] sm:text-xs text-[#E2E8F0]">
                          {pt}
                        </li>
                      ))}
                    </ul>

                    {/* Checkbox */}
                    <label
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => toggle(item.id)}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
                          isChecked
                            ? "bg-blue-600 border-blue-600"
                            : "bg-transparent border border-white/25"
                        }`}
                        style={{ borderWidth: "1.5px" }}
                      >
                        {isChecked && (
                          <Check
                            size={10}
                            className="text-white"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                      <span className="text-[11px] sm:text-xs text-white/50 select-none pt-0.5">
                        {item.label}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <Button
              className={`w-full h-[46px] rounded-full text-[14px] font-semibold text-white transition-all duration-200 border-none ${
                allAccepted
                  ? "bg-blue-600 hover:bg-blue-700 opacity-100 cursor-pointer"
                  : "bg-blue-600 opacity-40 cursor-not-allowed"
              }`}
              disabled={!allAccepted}
              onClick={onAccept}
            >
              Accept &amp; Continue
            </Button>

            <p className="text-center text-[11px] text-white/30 mt-3.5">
              Already an expert?{" "}
              <a href="/auth/login" className="text-blue-400 hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};
