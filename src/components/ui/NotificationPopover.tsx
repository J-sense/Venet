/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetAllNotificationsQuery,
  useMarkNotificationsReadMutation
} from "@/redux/features/notifications/notifications";
import { Bell, Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface NotificationPopoverProps {
  iconClassName?: string;
  notificationsData?: any;
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  iconClassName = "w-4 h-4 sm:w-5 sm:h-5",
  notificationsData: propData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [notificationsList, setNotificationsList] = useState<any[]>([]);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Fetch notifications with page parameter
  const { data: fetchedData, isLoading, isFetching } = useGetAllNotificationsQuery(page, {
    skip: !!propData,
  });

  const [markNotificationsRead, { isLoading: isMarkingRead }] = useMarkNotificationsReadMutation();

  const nextUrl = fetchedData?.data?.next ?? fetchedData?.next ?? null;
  const hasNextPage = Boolean(nextUrl);

  // Sync / accumulate notifications list
  useEffect(() => {
    if (propData) {
      const list = Array.isArray(propData) ? propData : propData?.results ?? propData?.data ?? [];
      setNotificationsList(Array.isArray(list) ? list : []);
      return;
    }

    if (!fetchedData) return;

    const rawResults = fetchedData?.data?.results ?? fetchedData?.results ?? (Array.isArray(fetchedData?.data) ? fetchedData.data : []);
    const results = Array.isArray(rawResults) ? rawResults : [];

    if (page === 1) {
      setNotificationsList(results);
    } else {
      setNotificationsList((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const newItems = results.filter((item: any) => !existingIds.has(item.id));
        return [...prev, ...newItems];
      });
    }
  }, [fetchedData, page, propData]);

  // Reset page to 1 when popover is toggled open
  const togglePopover = () => {
    setIsOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        setPage(1);
      }
      return nextState;
    });
  };

  // Mark all notifications as read: sends payload {}
  const handleMarkAllRead = async () => {
    try {
      // Optimistic UI update
      setNotificationsList((prev) =>
        prev.map((n) => ({ ...n, is_read: true, read: true }))
      );
      await markNotificationsRead({}).unwrap();
      toast.success("All notifications marked as read");
    } catch (err: any) {
      console.error("Failed to mark all notifications as read:", err);
      toast.error("Failed to mark notifications as read");
    }
  };

  // Mark single notification as read: sends payload { id }
  const handleMarkSingleRead = async (item: any) => {
    if (item.is_read || item.read) return; // already read
    try {
      // Optimistic UI update
      setNotificationsList((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, is_read: true, read: true } : n))
      );
      await markNotificationsRead({ id: item.id }).unwrap();
    } catch (err: any) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  // Infinite scroll handler
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (propData) return; // if controlled by propData, disable internal pagination
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 35) {
      if (hasNextPage && !isFetching && !isLoading) {
        setPage((prev) => prev + 1);
      }
    }
  };

  // Unread badge counter
  const unreadCount = notificationsList.filter((n: any) => !n.is_read && !n.read).length;

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={togglePopover}
        className={`relative p-2.5 rounded-full transition-all duration-200 cursor-pointer ${isOpen
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:text-white hover:bg-zinc-800/80"
          }`}
        aria-label="Toggle notifications"
      >
        <Bell className={iconClassName} />

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
        )}
      </button>

      {/* Sleek Dark Popover Box */}
      {isOpen && (
        <div className="fixed sm:absolute right-3 sm:right-0 top-16 sm:top-auto mt-0 sm:mt-2.5 w-[calc(100vw-1.5rem)] sm:w-[320px] md:w-[340px] bg-[#121214]/95 backdrop-blur-2xl border border-[#232326] text-white rounded-2xl p-3.5 sm:p-4 shadow-2xl z-[100] animate-in fade-in zoom-in-95 duration-200 font-sora">

          {/* Header: Title + Action Link */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#232326]">
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
              Notifications
            </h3>
            <button
              onClick={handleMarkAllRead}
              disabled={isMarkingRead}
              className="text-[10px] sm:text-[11px] font-semibold text-[#5B7FFF] hover:text-[#7A9CFF] disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isMarkingRead ? "Marking..." : "Mark all as read"}
            </button>
          </div>

          {/* List Content */}
          <div
            onScroll={handleScroll}
            className="mt-2.5 space-y-2 max-h-[60vh] sm:max-h-[350px] overflow-y-auto pr-1 custom-popover-scrollbar"
          >
            {isLoading && page === 1 && !propData ? (
              <div className="py-6 text-center text-xs text-zinc-500 animate-pulse">
                Loading notifications...
              </div>
            ) : notificationsList.length === 0 ? (
              /* Empty State */
              <div className="py-6 text-center">
                <p className="text-xs font-semibold text-zinc-400">No new notifications</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">
                  You're all caught up!
                </p>
              </div>
            ) : (
              /* Notification Items Cards */
              <>
                {notificationsList.map((item: any, idx: number) => {
                  const title = item.title || item.heading || "Notification";
                  const body = item.body || item.message || item.text || "You have a new update";
                  const timeAgo = formatTimeAgo(item.created_at || item.timestamp || item.date);
                  const isUnread = item.is_read === false || item.read === false;

                  return (
                    <div
                      key={item.id || idx}
                      onClick={() => handleMarkSingleRead(item)}
                      className={`relative p-3 rounded-xl transition-all duration-200 cursor-pointer border ${isUnread
                        ? "bg-[#1A1D28] hover:bg-[#222533] border-blue-500/25"
                        : "bg-[#18181B] hover:bg-[#202024] border-[#252529]/60 opacity-85 hover:opacity-100"
                        }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-white tracking-tight flex-1">
                          {title}
                        </h4>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Time Ago in Top Right Corner */}
                          <span className="text-[10px] text-zinc-500 font-normal">
                            {timeAgo}
                          </span>

                          {/* Unread Blue Badge Dot */}
                          {isUnread && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
                          )}
                        </div>
                      </div>

                      <p className="text-[11px] text-zinc-400 mt-1 leading-snug font-normal">
                        {body}
                      </p>
                    </div>
                  );
                })}

                {/* Bottom Loading Indicator when fetching next page */}
                {isFetching && page > 1 && (
                  <div className="py-2.5 flex items-center justify-center gap-2 text-zinc-400 text-xs">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                    <span className="text-[11px]">Loading more...</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
