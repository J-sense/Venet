import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileEdit, Loader2, Sparkles, Upload } from "lucide-react";
import { Link } from "react-router";

interface AIResumeUploadDropzoneProps {
  isLoading: boolean;
  isGenerating: boolean;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

export function AIResumeUploadDropzone({
  isLoading,
  isGenerating,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  onClose,
}: AIResumeUploadDropzoneProps) {
  return (
    <div className="p-7 space-y-6 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <DialogHeader className="text-center space-y-2 relative z-10">
        <div className="mx-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Resume Builder</span>
        </div>
        <DialogTitle className="text-2xl font-bold text-white tracking-tight">
          Update your resume with AI
        </DialogTitle>
        <p className="text-center text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
          Upload your resume and get the input fields ready for you automatically.
        </p>
      </DialogHeader>

      {/* Upload Area */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => {
          if (!isLoading) {
            document.getElementById("resume-upload")?.click();
          }
        }}
        className={`relative group border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 overflow-hidden z-10
        ${isDragging
            ? "border-blue-500 bg-blue-500/15 shadow-[0_0_30px_rgba(59,130,246,0.25)] scale-[1.01]"
            : "border-blue-500/30 hover:border-blue-400/60 bg-gradient-to-b from-[#0F172A]/80 via-[#0D1526]/80 to-[#0A101D]/80 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]"
          } ${isLoading ? "opacity-75 pointer-events-none" : ""}`}
      >
        <input
          id="resume-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          disabled={isLoading}
          onChange={onFileSelect}
        />

        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center mb-3 shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform duration-300">
          {isLoading ? (
            <Loader2 className="w-7 h-7 text-blue-400 animate-spin" />
          ) : (
            <Upload className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
          )}
        </div>

        <p className="text-white font-semibold text-base mb-1">
          {isLoading
            ? isGenerating
              ? "Generating AI Resume..."
              : "Uploading & parsing PDF..."
            : "Click to upload or drag and drop"}
        </p>
        <p className="text-gray-400 text-xs">
          {isLoading ? "Please wait a moment..." : "PDF format (max. 5MB)"}
        </p>
      </div>

      {/* OR Divider */}
      <div className="flex items-center gap-4 my-2 relative z-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        <span className="text-gray-500 text-xs font-semibold tracking-wider">OR</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      </div>

      {/* Actions */}
      <div className="space-y-2.5 relative z-10">
        <Link to={"/dashboard/user/manual-input"} className="block">
          <Button
            type="button"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 hover:from-blue-600/30 hover:to-indigo-600/30 text-blue-300 hover:text-white border border-blue-500/30 py-5 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm shadow-blue-950/40"
            onClick={onClose}
          >
            <FileEdit className="w-4 h-4 text-blue-400" />
            <span>Input data manually</span>
          </Button>
        </Link>
        <Button
          type="button"
          disabled={isLoading}
          onClick={onClose}
          className="w-full bg-gradient-to-r from-gray-800/90 to-gray-900/90 hover:from-gray-700/90 hover:to-gray-800/90 text-gray-400 hover:text-white border border-white/10 py-5 text-sm font-medium rounded-xl transition-all shadow-sm"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
