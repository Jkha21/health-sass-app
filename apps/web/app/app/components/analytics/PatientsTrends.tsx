"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { Period, PeriodDataset } from "../../types/analytics";

interface PatientsTrendsProps {
  period: Period;
  dataset: PeriodDataset;
}

function fmtMoney(v: number) {
  return v >= 1000 ? "$" + (v / 1000).toFixed(0) + "k" : "$" + v;
}

const LEGEND_ITEMS = {
  volume:  [{ color: "#e85520", label: "This week" }, { color: "#ffd09a", label: "Last week" }],
  revenue: [{ color: "#e85520", label: "Billed"    }, { color: "#ffd09a", label: "Collected" }],
  types:   [
    { color: "#e85520", label: "General"    },
    { color: "#f68540", label: "Follow-up"  },
    { color: "#ffd09a", label: "Specialist" },
    { color: "#c8a888", label: "Telehealth" },
  ],
};

/* ─── Shared card shell ──────────────────────────────────── */
function ChartCard({
  title, subtitle, badge, tall = false, legend, children,
}: {
  title: string; subtitle: string; badge: string;
  tall?: boolean; legend: { color: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-2.5 px-6 py-5 border-b border-orange-100">
        <div>
          <div className="font-display text-[15.5px] font-bold text-gray-800 mb-0.5">{title}</div>
          <div className="text-xs text-orange-800/60">{subtitle}</div>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-orange-800/60 bg-[#fdf8f2] border border-[#e8c8a8] px-3 py-1.5 rounded-full whitespace-nowrap">
          {badge}
        </span>
      </div>
      <div className="px-6 py-5">
        <div className={tall ? "relative h-[300px]" : "relative h-[250px]"}>
          {children}
        </div>
        <div className="flex flex-wrap gap-3.5 mt-3.5">
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 text-xs text-orange-800/60 font-medium">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── PatientsTrends ─────────────────────────────────────── */
export default function PatientsTrends({ dataset }: PatientsTrendsProps) {
  const volumeRef  = useRef<HTMLCanvasElement>(null);
  const revenueRef = useRef<HTMLCanvasElement>(null);
  const typesRef   = useRef<HTMLCanvasElement>(null);
  const chartsRef  = useRef<Record<string, any>>({});

  const buildCharts = useCallback(async (d: PeriodDataset) => {
    const {
      Chart,
      // ── Controllers — one required per chart type ───────
      LineController,
      BarController,
      // ── Scales ──────────────────────────────────────────
      CategoryScale,
      LinearScale,
      // ── Elements ────────────────────────────────────────
      PointElement,
      LineElement,
      BarElement,
      ArcElement,
      Filler,
      Tooltip,
    } = await import("chart.js");

    // All controllers + elements must be registered before new Chart(...)
    Chart.register(
      LineController,
      BarController,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      BarElement,
      ArcElement,
      Filler,
      Tooltip,
    );

    // Destroy stale instances
    Object.values(chartsRef.current).forEach((c: any) => c?.destroy?.());
    chartsRef.current = {};

    const base = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#fff",
          titleColor: "#1f2937",
          bodyColor: "#8a6650",
          borderColor: "#e8c8a8",
          borderWidth: 1,
          padding: 10,
          cornerRadius: 10,
        },
      },
    };

    const yAxis = {
      beginAtZero: true,
      grid:  { color: "rgba(232,85,32,.07)" },
      ticks: { color: "#c8a888" },
    };
    const xAxis = {
      grid:  { display: false },
      ticks: { color: "#c8a888" },
    };

    /* ── Patient Volume (line) ── */
    if (volumeRef.current) {
      chartsRef.current.volume = new Chart(volumeRef.current, {
        type: "line",
        data: {
          labels: d.labels,
          datasets: [
            { label: "This period", data: d.volume,  borderColor: "#e85520", backgroundColor: "rgba(232,85,32,.12)", pointBackgroundColor: "#e85520", pointRadius: 4, tension: 0.4, fill: true,  borderWidth: 2.5 } as any,
            { label: "Last period", data: d.volPrev, borderColor: "#ffd09a", backgroundColor: "transparent",          pointBackgroundColor: "#ffd09a", pointRadius: 3, tension: 0.4, fill: false, borderWidth: 2, borderDash: [5, 4] } as any,
          ],
        },
        options: { ...base, scales: { y: yAxis, x: xAxis } } as any,
      });
    }

    /* ── Revenue Trends (bar) ── */
    if (revenueRef.current) {
      chartsRef.current.revenue = new Chart(revenueRef.current, {
        type: "bar",
        data: {
          labels: d.labels,
          datasets: [
            { label: "Billed",    data: d.billed,    backgroundColor: "rgba(232,85,32,.7)",    borderRadius: 6 } as any,
            { label: "Collected", data: d.collected, backgroundColor: "rgba(255,208,154,.85)", borderRadius: 6 } as any,
          ],
        },
        options: {
          ...base,
          scales: {
            y: { ...yAxis, ticks: { ...yAxis.ticks, callback: (v: any) => fmtMoney(v) } },
            x: xAxis,
          },
        } as any,
      });
    }

    /* ── Appointment Categories (stacked area) ── */
    if (typesRef.current) {
      chartsRef.current.types = new Chart(typesRef.current, {
        type: "line",
        data: {
          labels: d.labels,
          datasets: [
            { label: "General",    data: d.types.general,    borderColor: "#e85520", backgroundColor: "rgba(232,85,32,.15)",   tension: 0.4, fill: true, borderWidth: 2 } as any,
            { label: "Follow-up",  data: d.types.followUp,   borderColor: "#f68540", backgroundColor: "rgba(246,133,64,.12)",  tension: 0.4, fill: true, borderWidth: 2 } as any,
            { label: "Specialist", data: d.types.specialist, borderColor: "#ffd09a", backgroundColor: "rgba(255,208,154,.12)", tension: 0.4, fill: true, borderWidth: 2 } as any,
            { label: "Telehealth", data: d.types.telehealth, borderColor: "#c8a888", backgroundColor: "rgba(200,168,136,.1)",  tension: 0.4, fill: true, borderWidth: 2 } as any,
          ],
        },
        options: { ...base, scales: { y: yAxis, x: xAxis } } as any,
      });
    }
  }, []);

  useEffect(() => { buildCharts(dataset); }, [dataset, buildCharts]);

  useEffect(() => () => {
    Object.values(chartsRef.current).forEach((c: any) => c?.destroy?.());
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
      <ChartCard title="Patient Volume" subtitle="Daily appointment count" badge="📈 Weekly" legend={LEGEND_ITEMS.volume}>
        <canvas ref={volumeRef} />
      </ChartCard>

      <ChartCard title="Revenue Trends" subtitle="Billed vs collected" badge="💰 Weekly" legend={LEGEND_ITEMS.revenue}>
        <canvas ref={revenueRef} />
      </ChartCard>

      <div className="lg:col-span-2">
        <ChartCard title="Appointment Categories" subtitle="Breakdown by visit type over time" badge="📅 Monthly view" tall legend={LEGEND_ITEMS.types}>
          <canvas ref={typesRef} />
        </ChartCard>
      </div>
    </div>
  );
}