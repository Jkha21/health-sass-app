"use client";

import React, { useRef, useEffect } from "react";
import { DiagnosisRow, DonutSegment } from "../../types/analytics";

interface DiagnosticsPanelProps {
  diagnoses: DiagnosisRow[];
  donutData: DonutSegment[];
}

const TREND_CLASSES: Record<string, string> = {
  up:      "bg-green-100 text-green-700",
  down:    "bg-red-100 text-red-600",
  neutral: "bg-amber-50 text-amber-700",
};
const TREND_LABELS: Record<string, string> = {
  up: "↑ Rising", down: "↓ Falling", neutral: "→ Stable",
};

export default function DiagnosticsPanel({ diagnoses, donutData }: DiagnosticsPanelProps) {
  const donutRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    const build = async () => {
      // ── DoughnutController MUST be registered for type:"doughnut" ──
      const {
        Chart,
        DoughnutController,
        ArcElement,
        Tooltip,
      } = await import("chart.js");

      Chart.register(DoughnutController, ArcElement, Tooltip);

      if (!mounted || !donutRef.current) return;

      chartRef.current?.destroy();

      chartRef.current = new Chart(donutRef.current, {
        type: "doughnut",
        data: {
          labels: donutData.map((d) => d.label),
          datasets: [{
            data:            donutData.map((d) => d.value),
            backgroundColor: donutData.map((d) => d.color),
            borderWidth: 2,
            borderColor: "#fff",
            hoverOffset: 6,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "68%",
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#fff",
              titleColor:       "#1f2937",
              bodyColor:        "#8a6650",
              borderColor:      "#e8c8a8",
              borderWidth: 1,
              padding: 10,
              cornerRadius: 10,
            },
          },
        } as any,
      });
    };

    build();

    return () => {
      mounted = false;
      chartRef.current?.destroy();
    };
  }, [donutData]);

  const total = donutData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">

      {/* ── Diagnosis table ── */}
      <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
        <div className="px-6 py-5 border-b border-orange-100">
          <div className="font-display text-[15.5px] font-bold text-gray-800">Top Diagnoses</div>
          <div className="text-xs text-orange-800/60 mt-0.5">Most frequent conditions this period</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["#", "Condition", "Patients", "Share", "Trend"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[11.5px] font-semibold text-orange-800/60 tracking-[.6px] uppercase px-4 py-2.5 border-b-2 border-orange-100 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {diagnoses.map((d, i) => (
                <tr
                  key={d.name}
                  className="hover:bg-orange-50/60 transition-colors border-b border-[#fdf0e6] last:border-0"
                >
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-orange-500/10 text-orange-500 text-[11.5px] font-bold">
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[13.5px] text-gray-800">{d.name}</td>
                  <td className="px-4 py-3.5 text-[13.5px] text-gray-800 font-semibold">{d.patients}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex-1 h-1.5 bg-[#f3e8d9] rounded-full overflow-hidden min-w-[60px]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-orange-200 to-orange-500 transition-[width] duration-500"
                          style={{ width: `${d.pct * 4}%` }}
                        />
                      </div>
                      <span className="text-xs text-orange-800/60 min-w-[32px] shrink-0">{d.pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${TREND_CLASSES[d.trend] ?? "bg-gray-100 text-gray-600"}`}>
                      {TREND_LABELS[d.trend] ?? d.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Donut chart ── */}
      <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-orange-100">
          <div className="font-display text-[15.5px] font-bold text-gray-800">Patient Mix</div>
          <div className="text-xs text-orange-800/60 mt-0.5">By appointment status</div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-5 p-6">
          {/* Canvas */}
          <div className="relative w-44 h-44 shrink-0">
            <canvas ref={donutRef} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-display text-[28px] font-extrabold text-orange-500 leading-none">{total}</span>
              <span className="text-[11px] text-orange-800/60 font-medium">Total</span>
            </div>
          </div>

          {/* Legend */}
          <div className="w-full flex flex-col gap-2.5">
            {donutData.map((d) => (
              <div key={d.label} className="flex items-center gap-2.5 text-[13px] text-gray-800">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="flex-1">{d.label}</span>
                <span className="font-semibold">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}