"use client";

import React from "react";

/* ─── Types ──────────────────────────────────────────────── */
interface RevenueChartProps {
  /** Heights as percentages (0–100). Defaults to the weekly sample data. */
  heights?: number[];
  /** X-axis labels. Must match `heights` length. */
  labels?: string[];
  title?: string;
  subtitle?: string;
}

/* ─── Defaults ───────────────────────────────────────────── */
const DEFAULT_HEIGHTS = [55, 70, 48, 85, 62, 30, 20];
const DEFAULT_LABELS  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ─── RevenueChart ───────────────────────────────────────── */
export default function RevenueChart({
  heights  = DEFAULT_HEIGHTS,
  labels   = DEFAULT_LABELS,
  title    = "Weekly Patients",
  subtitle = "This week vs last week",
}: RevenueChartProps) {
  const maxH = Math.max(...heights);

  return (
    <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-orange-100">
        <div className="font-['Sora'] text-base font-bold text-gray-800">{title}</div>
        <div className="text-[12.5px] text-orange-800/60 mt-0.5">{subtitle}</div>
      </div>

      {/* Bars — fixed 60px container, bars scale relative to tallest */}
      <div className="flex items-end gap-1.5 h-[60px] px-5 pb-5 pt-2">
        {heights.map((h, i) => (
          <div
            key={i}
            title={`${labels[i]}: ${Math.round(h * 0.3)} patients`}
            style={{ height: `${(h / maxH) * 100}%` }}
            className="flex-1 rounded-t-md bg-gradient-to-b from-orange-400 to-orange-200 cursor-pointer transition-all duration-300 hover:from-orange-500 hover:to-orange-400"
          />
        ))}
      </div>

      {/* Labels */}
      <div className="flex gap-1.5 px-5 pb-4">
        {labels.map((d) => (
          <span
            key={d}
            className="flex-1 text-center text-[10px] font-medium text-orange-800/50"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}