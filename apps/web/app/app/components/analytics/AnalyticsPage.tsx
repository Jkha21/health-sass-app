"use client";

import React, { useState, useEffect, useMemo } from "react";
import AppLayout        from "../common/AppLayout";
import useAnalyticsStore from "../../hooks/useAnalyticsStore";
import { Period }       from "../../types/analytics";
import MetricsGrid      from "./MetricsCharts";
import PatientsTrends   from "./PatientsTrends";
import DiagnosticsPanel from "./DiagonasticPanel";

/* ─── Period options ─────────────────────────────────────── */
const PERIOD_OPTIONS: { label: string; value: Period }[] = [
  { label: "7 Days",  value: 7   },
  { label: "30 Days", value: 30  },
  { label: "90 Days", value: 90  },
  { label: "1 Year",  value: 365 },
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
    setPeriod,
    fetchAnalyticsData,
  } = useAnalyticsStore();

  /* Derive current dataset without passing selector directly (avoids infinite loop) */
  const datasets = useAnalyticsStore((s) => s.datasets);
  const dataset  = useMemo(() => datasets[period], [datasets, period]);

  useEffect(() => { fetchAnalyticsData(); }, [fetchAnalyticsData]);

  return (
    <AppLayout
      title="Analytics"
      activeItem="analytics"
      breadcrumbs={[{ label: "Dashboard" }, { label: "Analytics" }]}
    >

      {/* ══ Hero ══ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-8 py-7 mb-6 flex items-center justify-between gap-5">
        <span className="pointer-events-none absolute -top-12 -right-12 w-52 h-52 rounded-full bg-white/[.07]" />
        <span className="pointer-events-none absolute -bottom-14 right-24 w-40 h-40 rounded-full bg-white/[.05]" />

        <div className="relative z-10">
          <h1 className="font-display text-2xl sm:text-[26px] font-extrabold text-white leading-tight mb-1.5">
            Healthcare Analytics
          </h1>
          <p className="text-sm text-white/80 leading-relaxed max-w-lg">
            Monitor patient outcomes, revenue trends, and operational efficiency across your practice.
          </p>
        </div>

        <div className="relative z-10 hidden sm:block shrink-0 rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm px-5 py-3 text-center">
          <div className="text-[11px] uppercase tracking-wide text-white/70 mb-0.5">Health Score</div>
          <div className="font-display text-[28px] font-extrabold text-white leading-none">94%</div>
          <div className="text-xs font-medium text-white/80 mt-0.5">Operational</div>
        </div>
      </div>

      {/* ══ Filter row ══ */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        {/* Period tabs */}
        <div className="flex gap-1.5 bg-white border border-[#e8c8a8] rounded-xl p-1 overflow-x-auto">
          {PERIOD_OPTIONS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={[
                "px-4 py-2 rounded-[9px] text-[13px] font-semibold font-display whitespace-nowrap transition-all duration-200",
                period === p.value
                  ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-[0_3px_10px_rgba(232,85,32,.30)]"
                  : "text-[#8a6650] hover:text-[#e85520] bg-transparent",
              ].join(" ")}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Export */}
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#e8c8a8] bg-white text-[#e85520] font-display text-[13px] font-semibold whitespace-nowrap transition-all hover:bg-[#e85520] hover:text-white hover:border-[#e85520] sm:w-auto w-full">
          <DownloadSvg /> Export Report
        </button>
      </div>

      {/* ══ Sub-components ══ */}

      {/* 4 metric cards — reads from useAnalyticsStore */}
      <MetricsGrid metrics={metrics} />

      {/* 3 Chart.js charts — rebuilds when period changes */}
      <PatientsTrends period={period} dataset={dataset} />

      {/* Diagnosis table + donut */}
      <DiagnosticsPanel diagnoses={diagnoses} donutData={donutData} />

    </AppLayout>
  );
}