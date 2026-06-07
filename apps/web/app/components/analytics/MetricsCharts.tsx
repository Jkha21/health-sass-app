"use client";

import React from "react";
import { AnalyticsMetric } from "../../types/analytics";

interface MetricsGridProps {
  metrics: AnalyticsMetric[];
}

const CHANGE_CLASSES: Record<string, string> = {
  "change-up":      "bg-green-100 text-green-700",
  "change-down":    "bg-red-100 text-red-600",
  "change-neutral": "bg-amber-50 text-amber-700",
};

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((m, i) => (
        <div
          key={i}
          style={{ animationDelay: `${0.05 + i * 0.05}s` }}
          className="relative overflow-hidden rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(232,85,32,.20)]"
        >
          {/* accent bar */}
          <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-orange-200 to-orange-500" />

          <div className="flex items-start justify-between mb-3">
            <div className="w-11 h-11 rounded-[13px] bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-[19px]">
              {m.icon}
            </div>
            <span className={`text-[11.5px] font-semibold px-2 py-0.5 rounded-lg ${CHANGE_CLASSES[m.changeClass] ?? "bg-gray-100 text-gray-600"}`}>
              {m.change}
            </span>
          </div>

          <div className="font-display text-[30px] font-extrabold text-orange-500 leading-none mb-1">
            {m.value}
          </div>
          <div className="text-[12.5px] font-semibold tracking-wide text-orange-800/60">
            {m.label}
          </div>
          {m.sub && (
            <div className="text-[11.5px] text-[#c8a888] mt-1">{m.sub}</div>
          )}
        </div>
      ))}
    </div>
  );
}