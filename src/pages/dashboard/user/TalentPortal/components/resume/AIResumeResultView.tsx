import { Button } from "@/components/ui/button";
import {
  Check,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

interface AIResumeResultViewProps {
  generatedResult: any;
  onClose: () => void;
}

export function AIResumeResultView({
  generatedResult,
  onClose,
}: AIResumeResultViewProps) {
  const content = generatedResult?.content || {};
  const contact = content?.contact || {};
  const pdfUrl = generatedResult?.pdf_url;
  const skills = content?.skills || [];
  const experience = content?.experience || content?.employments || [];
  const education = content?.education || [];
  const projects = content?.projects || [];
  const certifications = content?.certifications || [];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
          <Check className="w-6 h-6 stroke-[3]" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <Sparkles className="w-3 h-3" /> AI Resume Generated
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            {content.full_name || "Resume Ready"}
          </h3>
          {content.title && (
            <p className="text-xs text-blue-400 font-medium">{content.title}</p>
          )}
        </div>
      </div>

      {/* Scrollable Summary Cards */}
      <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
        {/* About Section */}
        {content.about && (
          <div className="bg-[#0E1416] border border-white/5 p-4 rounded-2xl space-y-1">
            <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              About Summary
            </h4>
            <p className="text-xs text-zinc-200 leading-relaxed">
              {content.about}
            </p>
          </div>
        )}

        {/* Contact Pills */}
        <div className="flex flex-wrap gap-2">
          {contact.email && (
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 bg-[#0E1416] border border-white/5 px-3 py-1.5 rounded-xl">
              <Mail className="w-3.5 h-3.5 text-blue-400" /> {contact.email}
            </span>
          )}
          {contact.phone_number && (
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 bg-[#0E1416] border border-white/5 px-3 py-1.5 rounded-xl">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />{" "}
              {contact.phone_number}
            </span>
          )}
          {contact.location && (
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 bg-[#0E1416] border border-white/5 px-3 py-1.5 rounded-xl">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />{" "}
              {contact.location}
            </span>
          )}
        </div>

        {/* Detected Skills */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              Detected Skills ({skills.length})
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill: any, idx: number) => {
                const name = typeof skill === "string" ? skill : skill?.name;
                return (
                  <span
                    key={idx}
                    className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs px-3 py-1 rounded-xl font-medium"
                  >
                    {name}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              Experience
            </h4>
            <div className="space-y-2">
              {experience.map((exp: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#0E1416] border border-white/5 p-3 rounded-xl space-y-1"
                >
                  <p className="text-xs font-bold text-white">
                    {exp.designation || exp.title}
                  </p>
                  <p className="text-[11px] text-emerald-400">
                    {exp.company_name || exp.companyName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              Education
            </h4>
            <div className="space-y-2">
              {education.map((edu: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#0E1416] border border-white/5 p-3 rounded-xl space-y-1"
                >
                  <p className="text-xs font-bold text-white">{edu.degree}</p>
                  <p className="text-[11px] text-amber-400">{edu.institute}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              Featured Projects
            </h4>
            <div className="space-y-2">
              {projects.map((proj: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#0E1416] border border-white/5 p-3 rounded-xl space-y-1"
                >
                  <p className="text-xs font-bold text-white">{proj.name}</p>
                  <p className="text-[11px] text-zinc-400">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              Certifications
            </h4>
            <div className="space-y-2">
              {certifications.map((cert: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#0E1416] border border-white/5 p-3 rounded-xl space-y-1"
                >
                  <p className="text-xs font-bold text-white">{cert.name}</p>
                  <p className="text-[11px] text-pink-400">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium px-4 py-2.5 rounded-xl border border-zinc-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View PDF
          </a>
        )}
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-900/30 transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Download PDF
          </a>
        )}
        <Button
          type="button"
          onClick={onClose}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
