import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Upload } from "lucide-react";
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
    <div className="p-8">
      {/* Header */}
      <DialogHeader className="mb-6">
        <DialogTitle className="text-2xl font-semibold text-white text-center">
          Update your resume with AI
        </DialogTitle>
        <p className="text-center text-gray-400 text-[15px] mt-2">
          Upload your resume and get the input fields ready for you.
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
        className={`border-2 border-dashed rounded-2xl p-10 bg-[#0E141680] text-center cursor-pointer transition-all duration-200
        ${
          isDragging
            ? "border-blue-500 bg-blue-500/10"
            : "border-gray-600 hover:border-blue-500/50 hover:bg-gray-800/50"
        } ${isLoading ? "opacity-60 pointer-events-none" : ""}`}
      >
        <input
          id="resume-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          disabled={isLoading}
          onChange={onFileSelect}
        />

        <div className="mx-auto w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-4">
          {isLoading ? (
            <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
          ) : (
            <Upload className="w-6 h-6 text-blue-400" />
          )}
        </div>

        <p className="text-white font-medium mb-1">
          {isLoading
            ? isGenerating
              ? "Generating AI Resume..."
              : "Uploading & parsing PDF..."
            : "Click to upload or drag and drop"}
        </p>
        <p className="text-gray-500 text-sm">
          {isLoading ? "Please wait a moment..." : "PDF (max. 5MB)"}
        </p>
      </div>

      {/* OR Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="h-px flex-1 bg-gray-700" />
        <span className="text-gray-500 text-sm font-medium">OR</span>
        <div className="h-px flex-1 bg-gray-700" />
      </div>

      {/* Manual Input Button */}
      <Link to={"/dashboard/user/manual-input"}>
        <Button
          variant="ghost"
          disabled={isLoading}
          className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 py-6 text-base font-medium"
          onClick={onClose}
        >
          Input data manually
        </Button>
      </Link>
    </div>
  );
}
