// app/analytics/page.tsx
"use client";

import React, { useEffect, useMemo } from "react";
import AppLayout from "../components/common/AppLayout";
import useAnalyticsStore from "../hooks/useAnalyticsStore";
import { Period } from "../types/analytics";
import MetricsGrid from "../components/analytics/MetricsCharts";
import PatientsTrends from "../components/analytics/PatientsTrends";
import DiagnosticsPanel from "../components/analytics/DiagonasticPanel";

/* ─── Period options ─────────────────────────────────────── */
const PERIOD_OPTIONS: { label: string; value: Period }[] = [
  { label: "7D",  value: 7   },
  { label: "30D", value: 30  },
  { label: "90D", value: 90  },
  { label: "1Y",  value: 365 },
];

/* ─── SVG ────────────────────────────────────────────────── */
const DownloadSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

/* ─── AnalyticsPage ──────────────────────────────────────── */
export default function AnalyticsPage() {
  const {
    period,
    metrics,
    diagnoses,
    donutData,
    datasets,
    setPeriod,
    fetchAnalyticsData,
  } = useAnalyticsStore();

  // Stable dataset — avoids infinite loop from passing selector directly
  const dataset = useMemo(() => datasets[period], [datasets, period]);

  useEffect(() => { 
    fetchAnalyticsData(); 
  }, [fetchAnalyticsData]);

  return (
    <AppLayout
      title="Analytics"
      activeItem="analytics"
      breadcrumbs={[{ label: "Dashboard" }, { label: "Analytics" }]}
    >
      {/* ══ Hero ══ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-7 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5">
        {/* Responsive decorative blobs - smaller on mobile */}
        <span className="pointer-events-none absolute -top-8 sm:-top-12 -right-8 sm:-right-12 w-32 sm:w-52 h-32 sm:h-52 lg:w-52 lg:h-52 rounded-full bg-white/[.07] -z-10" />
        <span className="pointer-events-none absolute -bottom-8 sm:-bottom-14 right-8 sm:right-16 lg:right-24 w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 rounded-full bg-white/[.05] -z-10" />

        <div className="relative z-10 w-full sm:w-auto">
          <h1 className="font-display text-xl sm:text-2xl lg:text-[26px] font-extrabold text-white leading-tight mb-1 sm:mb-1.5">
            Healthcare Analytics
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-sm sm:max-w-lg">
            Monitor patient outcomes, revenue trends, and operational efficiency across your practice.
          </p>
        </div>

        {/* Health Score - smaller and always visible */}
        <div className="relative z-10 shrink-0 rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 text-center min-w-[100px]">
          <div className="text-[10px] sm:text-[11px] uppercase tracking-wide text-white/70 mb-0.5">Health Score</div>
          <div className="font-display text-2xl sm:text-[28px] font-extrabold text-white leading-none">94%</div>
          <div className="text-[10px] sm:text-xs font-medium text-white/80 mt-0.5">Operational</div>
        </div>
      </div>

      {/* ══ Filter row ══ */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-6">
        {/* Period tabs - proper mobile scrolling */}
        <div className="flex bg-white border border-[#e8c8a8] rounded-xl p-1 overflow-x-auto scrollbar-hide lg:scrollbar-default min-w-0 flex-shrink-0">
          {PERIOD_OPTIONS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={[
                "px-3 sm:px-4 py-2 rounded-[9px] text-xs sm:text-[13px] font-semibold font-display whitespace-nowrap transition-all duration-200 flex-shrink-0",
                period === p.value
                  ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-[0_3px_10px_rgba(232,85,32,.30)]"
                  : "text-[#8a6650] hover:text-[#e85520] bg-transparent hover:bg-white/50",
              ].join(" ")}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Export - proper mobile sizing */}
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#e8c8a8] bg-white text-[#e85520] font-display text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all duration-200 hover:bg-[#e85520] hover:text-white hover:border-[#e85520] flex-shrink-0 w-full lg:w-auto max-w-full">
          <DownloadSvg /> Export Report
        </button>
      </div>

      {/* ══ Sub-components ══ */}
      <MetricsGrid metrics={metrics} />
      <PatientsTrends period={period} dataset={dataset} />
      <DiagnosticsPanel diagnoses={diagnoses} donutData={donutData} />
    </AppLayout>
  );
}