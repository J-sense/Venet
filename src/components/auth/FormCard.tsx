// components/ui/FormCard.tsx

import type { ReactNode } from "react";

interface FormCardProps {
  children: ReactNode;
  className?: string;
}

export const FormCard = ({ children }: FormCardProps) => {
  return (
    <div>
      {/* ── Form Content ── */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
