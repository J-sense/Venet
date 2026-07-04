
import { useEffect } from "react";

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      // Lock scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLocked]);
};
