"use client";

import React from "react";

/* ─── Types ──────────────────────────────────────────────── */
interface Action {
  icon: string;
  label: string;
  onClick?: () => void;
}

interface QuickActionsProps {
  actions?: Action[];
}

/* ─── Defaults ───────────────────────────────────────────── */
const DEFAULT_ACTIONS: Action[] = [
  { icon: "📋", label: "Records"   },
  { icon: "📞", label: "Telehealth" },
  { icon: "💊", label: "Rx"         },
  { icon: "📊", label: "Analytics"  },
];

/* ─── QuickActions ───────────────────────────────────────── */
export default function QuickActions({ actions = DEFAULT_ACTIONS }: QuickActionsProps) {
  return (
    <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-5 pb-0">
        <div className="font-['Sora'] text-base font-bold text-gray-800">Quick Actions</div>
      </div>

      {/* Grid */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-2.5">
          {actions.map((a, i) => (
            <button
              key={i}
              onClick={a.onClick}
              className="flex flex-col items-center justify-center gap-2 py-4 px-2.5 rounded-[14px] bg-orange-50 border border-orange-200 text-center cursor-pointer transition-all hover:bg-orange-500/10 hover:border-orange-500 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(232,85,32,.14)]"
            >
              <span className="text-[22px]">{a.icon}</span>
              <span className="text-xs font-semibold text-gray-800">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}