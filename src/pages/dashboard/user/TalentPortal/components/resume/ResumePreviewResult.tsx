import { useEffect } from "react";
import {
  Award,
  Briefcase,
  Building2,
  Calendar,
  Check,
  Code2,
  Download,
  ExternalLink,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Wrench,
} from "lucide-react";

interface ResumePreviewResultProps {
  resumeResult: any;
}

export function ResumePreviewResult({
  resumeResult,
}: ResumePreviewResultProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const pdfUrl = resumeResult?.pdf_url;
  const content = resumeResult?.content;
  const contact = content?.contact || {};
  const experienceList = content?.experience || content?.employments || [];
  const educationList = content?.education || [];
  const projectList = content?.projects || [];
  const certificationList = content?.certifications || [];
  const skillList = content?.skills || [];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 pt-4">
      {/* Success Header Card */}
      <div className="bg-[#0E1416] border border-emerald-500/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-950/50">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Resume Generated Successfully
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            {content?.full_name || "Your Resume"} is Ready!
          </h2>
          {content?.title && (
            <p className="text-blue-400 font-medium text-base">
              {content.title}
            </p>
          )}
          <p className="text-zinc-400 text-sm max-w-lg mx-auto">
            Your professional resume has been processed. You can view the summary below or download the PDF directly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/40"
            >
              <Download className="w-4 h-4" /> Download PDF
            </a>
          )}
          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-medium px-6 py-3.5 rounded-xl border border-zinc-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Open Fullscreen PDF
            </a>
          )}
        </div>
      </div>

      {/* INTERACTIVE RESUME SUMMARY */}
      <div className="bg-[#0A1012] border border-white/10 rounded-3xl p-8 sm:p-10 space-y-10 shadow-2xl">
        {/* Header Profile Info */}
        <div className="border-b border-white/10 pb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white">
                {content?.full_name || "Resume Profile"}
              </h1>
              {content?.title && (
                <p className="text-lg text-blue-400 font-medium mt-1">
                  {content.title}
                </p>
              )}
            </div>
            {contact?.location && (
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />{" "}
                {contact.location}
              </span>
            )}
          </div>

          {content?.about && (
            <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl pt-2">
              {content.about}
            </p>
          )}

          {/* Contact Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {contact?.email && (
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-xl">
                <Mail className="w-3.5 h-3.5 text-blue-400" /> {contact.email}
              </span>
            )}
            {contact?.phone_number && (
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />{" "}
                {contact.phone_number}
              </span>
            )}
            {contact?.linkedin && (
              <a
                href={
                  contact.linkedin.startsWith("http")
                    ? contact.linkedin
                    : `https://${contact.linkedin}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-xl hover:bg-purple-500/20 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-purple-400" /> LinkedIn
              </a>
            )}
            {contact?.github_profile_link && (
              <a
                href={contact.github_profile_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-xl hover:bg-zinc-700 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-zinc-400" /> GitHub
              </a>
            )}
            {contact?.portfolio && (
              <a
                href={contact.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl hover:bg-amber-500/20 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" /> Portfolio
              </a>
            )}
          </div>
        </div>

        {/* Experience Section */}
        {experienceList.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Briefcase className="w-5 h-5 text-emerald-400" /> Work Experience
            </h3>
            <div className="space-y-6">
              {experienceList.map((exp: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#0E1416] border border-white/5 rounded-2xl p-6 space-y-3 relative"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h4 className="text-white font-bold text-base">
                        {exp.designation || exp.title}
                      </h4>
                      <p className="text-emerald-400 text-xs font-medium flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5" />{" "}
                        {exp.company_name || exp.companyName}
                      </p>
                    </div>
                    {exp.period && (
                      <span className="text-xs text-zinc-400 flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />{" "}
                        {exp.period}
                      </span>
                    )}
                  </div>

                  {Array.isArray(exp.description) &&
                    exp.description.length > 0 && (
                      <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1.5 pt-2">
                        {exp.description.map(
                          (bullet: string, bIdx: number) => (
                            <li key={bIdx} className="leading-relaxed">
                              {bullet}
                            </li>
                          ),
                        )}
                      </ul>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skillList.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Wrench className="w-5 h-5 text-cyan-400" /> Core Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillList.map((skill: any, idx: number) => {
                const skillName =
                  typeof skill === "string" ? skill : skill?.name;
                return (
                  <span
                    key={idx}
                    className="bg-[#0E1416] border border-cyan-500/20 text-cyan-300 text-xs px-3.5 py-1.5 rounded-xl font-medium"
                  >
                    {skillName}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projectList.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Code2 className="w-5 h-5 text-indigo-400" /> Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectList.map((proj: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#0E1416] border border-white/5 rounded-2xl p-6 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-bold text-base">
                      {proj.name}
                    </h4>
                    {proj.liveLink && (
                      <a
                        href={proj.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        Live Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {proj.description}
                  </p>
                  {Array.isArray(proj.techStack) &&
                    proj.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.techStack.map(
                          (tech: string, tIdx: number) => (
                            <span
                              key={tIdx}
                              className="text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-md"
                            >
                              {tech}
                            </span>
                          ),
                        )}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Certifications Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationList.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <GraduationCap className="w-5 h-5 text-amber-400" /> Education
              </h3>
              <div className="space-y-3">
                {educationList.map((edu: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-[#0E1416] border border-white/5 rounded-xl p-4 space-y-1"
                  >
                    <h4 className="text-white font-semibold text-sm">
                      {edu.degree}
                    </h4>
                    <p className="text-amber-400 text-xs">{edu.institute}</p>
                    {edu.period && (
                      <p className="text-zinc-500 text-[11px]">
                        {edu.period}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {certificationList.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <Award className="w-5 h-5 text-pink-400" /> Certifications
              </h3>
              <div className="space-y-3">
                {certificationList.map((cert: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-[#0E1416] border border-white/5 rounded-xl p-4 space-y-1"
                  >
                    <h4 className="text-white font-semibold text-sm">
                      {cert.name}
                    </h4>
                    <p className="text-pink-400 text-xs">{cert.issuer}</p>
                    {cert.year && (
                      <p className="text-zinc-500 text-[11px]">
                        {cert.year}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
