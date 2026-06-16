import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"; // Adjust path as per your project
import AssessmentWizard from "./AssessmentWizard";

export const AssessmentModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/40 backdrop-blur-sm " />

      <DialogContent
        className="md:min-w-3xl max-w-4xl bg-[#0B1120]/90 border border-slate-700/50 p-0 overflow-hidden shadow-2xl rounded-3xl"
        // This prevents Shadcn from rendering its default close button if you don't want it
        onInteractOutside={onClose}
      >
        {/* We place our wizard directly inside. 
            'max-h-[90vh]' and 'overflow-y-auto' keep it scrollable on small screens */}
        <div className="max-h-[90vh] overflow-y-auto">
          <AssessmentWizard onComplete={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
