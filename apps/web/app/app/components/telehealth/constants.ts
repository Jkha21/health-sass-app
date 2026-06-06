import type { SessionStatus, SessionType, ConsultType } from "./types";

export const TODAY = new Date().toISOString().split("T")[0];

export const STATUS_META: Record<SessionStatus, {
  label: string;
  dotCls: string;
  badgeCls: string;
  bg: string;
}> = {
  live: {
    label: "Live",
    dotCls: "bg-emerald-400",
    badgeCls: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    bg: "bg-emerald-500",
  },
  scheduled: {
    label: "Scheduled",
    dotCls: "bg-blue-400",
    badgeCls: "bg-blue-50 text-blue-700 border border-blue-200",
    bg: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    dotCls: "bg-gray-400",
    badgeCls: "bg-gray-50 text-gray-700 border border-gray-200",
    bg: "bg-gray-500",
  },
  missed: {
    label: "Missed",
    dotCls: "bg-orange-400",
    badgeCls: "bg-orange-50 text-orange-700 border border-orange-200",
    bg: "bg-orange-500",
  },
  cancelled: {
    label: "Cancelled",
    dotCls: "bg-red-400",
    badgeCls: "bg-red-50 text-red-700 border border-red-200",
    bg: "bg-red-500",
  },
};

export const SESSION_TYPE_META: Record<SessionType, {
  label: string;
  icon: string;
  bg: string;
}> = {
  video: {
    label: "Video Call",
    icon: "📹",
    bg: "bg-blue-500",
  },
  audio: {
    label: "Audio Call",
    icon: "🎙️",
    bg: "bg-green-500",
  },
  chat: {
    label: "Chat",
    icon: "💬",
    bg: "bg-purple-500",
  },
};

export const CONSULT_META: Record<ConsultType, {
  label: string;
}> = {
  initial: {
    label: "Initial",
  },
  followup: {
    label: "Follow-up",
  },
  emergency: {
    label: "Emergency",
  },
};