"use client";

import React, { useState, useRef, useEffect, FC } from "react";
import {
  useNotifications,
  AppNotif,
  NotifType,
} from "../../hooks/useNotifications";

/* ─── Type maps ──────────────────────────────────────────── */
const TYPE_ICON: Record<NotifType, string> = {
  urgent:  "🚨",
  warning: "⚠️",
  info:    "📋",
  success: "✅",
};

const TYPE_DOT: Record<NotifType, string> = {
  urgent:  "bg-red-500",
  warning: "bg-amber-400",
  info:    "bg-blue-500",
  success: "bg-green-500",
};

/* ─── Helpers ────────────────────────────────────────────── */
function timeAgo(date: Date): string {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60)    return "Just now";
  if (s < 3600)  return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return date.toLocaleDateString();
}

/* ─── NotifRow ───────────────────────────────────────────── */
interface NotifRowProps {
  n:        AppNotif;
  onRead:   (id: string) => void;
  onRemove: (id: string) => void;
}

const NotifRow: FC<NotifRowProps> = ({ n, onRead, onRemove }) => (
  <div
    onClick={() => onRead(n.id)}
    className={[
      "flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors",
      "border-b border-orange-50 last:border-0",
      n.read
        ? "hover:bg-gray-50/60"
        : "bg-orange-50/50 hover:bg-orange-50/80",
    ].join(" ")}
  >
    <span className="text-lg shrink-0 mt-0.5">{TYPE_ICON[n.type]}</span>

    <div className="flex-1 min-w-0">
      <div
        className={`text-[13.5px] font-semibold mb-0.5 ${
          n.read ? "text-gray-500" : "text-gray-800"
        }`}
      >
        {n.title}
      </div>
      <div className="text-xs text-orange-800/60 leading-relaxed line-clamp-2">
        {n.body}
      </div>
      <div className="flex items-center gap-1.5 mt-1">
        <span className={`w-1.5 h-1.5 rounded-full ${TYPE_DOT[n.type]}`} />
        <span className="text-[10.5px] text-orange-800/40 font-medium">
          {timeAgo(n.timestamp)}
        </span>
      </div>
    </div>

    <div className="flex flex-col items-end gap-1.5 shrink-0">
      {!n.read && <span className="w-2 h-2 rounded-full bg-orange-500" />}
      <button
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onRemove(n.id);
        }}
        className="text-[10px] text-orange-800/30 hover:text-red-500 transition-colors"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  </div>
);

/* ─── NotificationBell ───────────────────────────────────── */
const NotificationBell: FC = () => {
  const {
    permission,
    unreadCount,
    notifications,
    markRead,
    markAllRead,
    remove,
    clearAll,
    requestPermission,
    subscribeToPush,
    triggerAppointmentReminder,
    triggerUrgentAlert,
    triggerLabResults,
  } = useNotifications();

  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleEnable = async (): Promise<void> => {
    await requestPermission();
    await subscribeToPush();
  };

  const fire = (fn: () => void): void => {
    fn();
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">

      {/* ── Bell button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        className={[
          "relative flex h-9 w-9 items-center justify-center rounded-xl border text-base transition-all",
          open
            ? "bg-orange-500 border-orange-500"
            : "bg-[#fdf3ec] border-[#e8c8a8] hover:bg-orange-500/15 hover:border-[#e85520]",
        ].join(" ")}
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white px-0.5">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div className="absolute right-0 top-11 w-[360px] bg-white rounded-2xl border border-orange-100 shadow-[0_16px_48px_rgba(0,0,0,.15)] z-[300] overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-orange-100">
            <div className="flex items-center gap-2">
              <span className="font-display text-[15px] font-bold text-gray-800">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="text-[11px] font-bold text-white bg-orange-500 px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[12px] font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                >
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-[12px] font-semibold text-gray-400 hover:text-red-500 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Permission banner */}
          {permission !== "granted" && (
            <div className="flex items-center justify-between gap-3 px-4 py-3 bg-amber-50 border-b border-amber-100">
              <p className="text-xs text-amber-700 leading-relaxed">
                Enable browser notifications to receive real-time alerts.
              </p>
              <button
                onClick={handleEnable}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-500 text-white text-[12px] font-semibold hover:bg-amber-600 transition-colors"
              >
                Enable
              </button>
            </div>
          )}

          {/* Notification list */}
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                <div className="text-3xl mb-2">🔔</div>
                <div className="font-display text-sm font-semibold text-gray-600 mb-1">
                  All caught up!
                </div>
                <div className="text-xs text-orange-800/50">
                  No notifications yet.
                </div>
              </div>
            ) : (
              notifications.map((n: AppNotif) => (
                <NotifRow
                  key={n.id}
                  n={n}
                  onRead={markRead}
                  onRemove={remove}
                />
              ))
            )}
          </div>

          {/* Demo triggers */}
          <div className="px-4 py-3 border-t border-orange-100 bg-orange-50/40">
            <p className="text-[10.5px] font-semibold uppercase tracking-wide text-orange-800/40 mb-2">
              Demo — trigger a notification
            </p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => fire(triggerAppointmentReminder)}
                className="px-2.5 py-1.5 rounded-lg bg-amber-100 text-amber-700 text-[11.5px] font-semibold hover:bg-amber-200 transition-colors"
              >
                ⏰ Appointment
              </button>
              <button
                onClick={() => fire(triggerUrgentAlert)}
                className="px-2.5 py-1.5 rounded-lg bg-red-100 text-red-600 text-[11.5px] font-semibold hover:bg-red-200 transition-colors"
              >
                🚨 Urgent Alert
              </button>
              <button
                onClick={() => fire(triggerLabResults)}
                className="px-2.5 py-1.5 rounded-lg bg-blue-100 text-blue-600 text-[11.5px] font-semibold hover:bg-blue-200 transition-colors"
              >
                🧪 Lab Results
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default NotificationBell;