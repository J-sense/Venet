import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  useGeneretateResumeByMutation,
  useUploadPdfForAiGenerateMutation,
} from "@/redux/features/userDashboard/userProfile.api";
import { useState } from "react";
import { toast } from "sonner";
import { AIResumeResultView } from "./resume/AIResumeResultView";
import { AIResumeUploadDropzone } from "./resume/AIResumeUploadDropzone";

interface UpdateProfileAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateResumeAIModal({
  isOpen,
  onClose,
}: UpdateProfileAIModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<any>(null);

  const [uploadPdf, { isLoading: isUploadingPdf }] =
    useUploadPdfForAiGenerateMutation();
  const [generetateResumeByAi, { isLoading: isGenerating }] =
    useGeneretateResumeByMutation();

  const isLoading = isUploadingPdf || isGenerating;

  const handleClose = () => {
    setGeneratedResult(null);
    onClose();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUpload = async (file: File) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Please upload a valid PDF file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("Uploading PDF FormData:", file.name);
      // Step 1: Upload PDF
      const uploadRes = await uploadPdf(formData).unwrap();
      console.log("PDF upload response:", uploadRes);

      const resumeId = uploadRes?.data?.id;

      if (resumeId) {
        toast.success("Resume uploaded! Generating AI resume...");

        // Step 2: Post object with id to generetateResumeBy mutation
        const generateRes = await generetateResumeByAi({ id: resumeId }).unwrap();
        console.log("Generate by ID response:", generateRes);

        if (generateRes?.data) {
          setGeneratedResult(generateRes.data);
          toast.success(
            generateRes?.details || "AI Resume generated successfully!",
          );
        } else {
          toast.success(
            generateRes?.details || "Resume generated successfully!",
          );
          handleClose();
        }
      } else {
        toast.success(
          uploadRes?.details || "Resume uploaded and analyzed successfully!",
        );
        handleClose();
      }
    } catch (error: any) {
      console.error("PDF processing error:", error);
      toast.error(
        error?.data?.details ||
        error?.data?.message ||
        error?.message ||
        "Failed to process resume PDF.",
      );
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        className={`bg-gradient-to-b from-[#0D1526] via-[#091322] to-[#0D1526] border border-blue-500/20 text-white p-0 rounded-3xl overflow-hidden font-['Inter'] shadow-[0_0_50px_rgba(13,21,38,0.8)] transition-all duration-300 ${generatedResult ? "max-w-[620px]" : "max-w-[440px]"
          }`}
      >
        <div className="relative">
          {generatedResult ? (
            <AIResumeResultView
              generatedResult={generatedResult}
              onClose={handleClose}
            />
          ) : (
            <AIResumeUploadDropzone
              isLoading={isLoading}
              isGenerating={isGenerating}
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onFileSelect={handleFileSelect}
              onClose={handleClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
