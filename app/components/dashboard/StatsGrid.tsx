"use client";

import React from "react";
import { MetricCard } from "../../types/dashboard";

/* ─── Types ──────────────────────────────────────────────── */
interface StatsGridProps {
  metrics: MetricCard[];
}

/* ─── Trend colour map ───────────────────────────────────── */
const TREND_CLASSES: Record<string, string> = {
  "trend-up":      "bg-green-100 text-green-800",
  "trend-down":    "bg-red-100 text-red-700",
  "trend-neutral": "bg-amber-50 text-amber-700",
};

/* ─── StatsGrid ──────────────────────────────────────────── */
export default function StatsGrid({ metrics }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(232,85,32,.20)]"
        >
          {/* Top accent bar */}
          <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-orange-200 to-orange-500 rounded-t-2xl" />

          <div className="flex items-start justify-between mb-3.5">
            <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-xl">
              {m.icon}
            </div>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg ${TREND_CLASSES[m.trendClass] ?? "bg-gray-100 text-gray-600"}`}>
              {m.trend}
            </span>
          </div>

          <div className="font-['Sora'] text-[32px] font-extrabold text-orange-500 leading-none mb-1">
            {m.value}
          </div>
          <div className="text-[12.5px] font-semibold tracking-wide text-orange-800/60">
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}