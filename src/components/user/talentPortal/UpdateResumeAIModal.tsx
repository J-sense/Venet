import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";
import { useState } from "react";

interface UpdateProfileAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateResumeAIModal({
  isOpen,
  onClose,
}: UpdateProfileAIModalProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    console.log("File dropped:", e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log("File selected:", e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1F2937] border border-blue-500/50 text-white max-w-[420px] p-0 rounded-2xl overflow-hidden font-['Inter']">
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

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
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("resume-upload")?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200
                ${
                  isDragging
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-600 hover:border-blue-500/50 hover:bg-gray-800/50"
                }`}
            >
              <input
                id="resume-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileSelect}
              />

              <div className="mx-auto w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-blue-400" />
              </div>

              <p className="text-white font-medium mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-gray-500 text-sm">PDF (max. 2MB)</p>
            </div>

            {/* OR Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="h-px flex-1 bg-gray-700" />
              <span className="text-gray-500 text-sm font-medium">OR</span>
              <div className="h-px flex-1 bg-gray-700" />
            </div>

            {/* Manual Input Button */}
            <Button
              variant="ghost"
              className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 py-6 text-base font-medium"
              onClick={onClose}
            >
              Input data manually
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
