import React, { useEffect, useState } from "react";
import { Bell, X, ShieldCheck } from "lucide-react";
import { getFCMToken } from "@/lib/firebase.messaging";
import { useRegisterDeviceMutation } from "@/redux/features/firebase/firebase.api";
import { toast } from "sonner";

export const NotificationPermissionModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerDevice] = useRegisterDeviceMutation();

  useEffect(() => {
    // Check if Notification API exists in browser
    if (!("Notification" in window)) return;

    // Show custom modal only if permission is still 'default' (not granted & not denied)
    if (Notification.permission === "default") {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000); // 2 second delay for optimal UX
      return () => clearTimeout(timer);
    }
  }, []);

  const handleEnableNotifications = async () => {
    setLoading(true);
    try {
      const token = await getFCMToken(); // Triggers browser permission prompt
      if (token) {
        console.log("FCM Token generated successfully:", token);
        await registerDevice({ token, platform: "web" }).unwrap();
        toast.success("Notifications enabled successfully!");
      } else {
        console.warn("Could not get FCM token or permission was denied.");
      }
    } catch (err) {
      console.error("Failed to enable notifications:", err);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] max-w-sm w-full bg-[#0F172A] border border-blue-500/30 text-white rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom-5 duration-300 font-sora">
      <div className="flex items-start justify-between gap-3">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
          <Bell className="w-6 h-6 animate-bounce" />
        </div>

        <button
          onClick={handleDismiss}
          className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3">
        <h4 className="text-base font-bold text-white tracking-tight">
          Enable Notifications
        </h4>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          Stay updated with real-time updates on your consultation sessions, messages, and expert availability.
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>You can turn off notifications anytime</span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={handleDismiss}
          className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Not Now
        </button>

        <button
          onClick={handleEnableNotifications}
          disabled={loading}
          className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
        >
          {loading ? "Enabling..." : "Allow Access"}
        </button>
      </div>
    </div>
  );
};
