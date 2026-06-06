"use client";

import { useState } from "react";
import { LabResult } from "./types";
import { STATUS_META, CATEGORY_META, PRIORITY_META } from "./constants";
import { LabValuesTable } from "./LabValuesTable";
import { DownloadSvg, ChevronSvg } from "./icons";

interface LabResultCardProps {
  result: LabResult;
  idx: number;
  onSelect: (result: LabResult) => void;
}

export function LabResultCard({ result, idx, onSelect }: LabResultCardProps) {
  const [expanded, setExpanded] = useState(false);
  const s = STATUS_META[result.status];
  const c = CATEGORY_META[result.category];
  const p = PRIORITY_META[result.priority];
  const isCritical = result.status === "critical";
  const abnormals = result.values.filter(v => v.status === "abnormal" || v.status === "critical").length;

  return (
    <div
      style={{ animationDelay: `${idx * 0.04}s` }}
      className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-[0_12px_40px_rgba(232,85,32,.12)]
        ${isCritical ? "border-red-200 shadow-[0_4px_20px_rgba(239,68,68,.10)]" : "border-orange-900/[.07] shadow-[0_4px_20px_rgba(232,85,32,.06)]"}`}
    >
      {isCritical && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-red-300/30 animate-pulse pointer-events-none" />
      )}

      <div className={`h-[3px] w-full bg-gradient-to-r ${s.barCls}`} />

      <div className="px-5 pt-4 pb-3.5">
        <div className="flex items-start gap-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 border ${c.bg}`}>
            {c.icon}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-display text-[12.5px] font-bold text-orange-500">#{result.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.cls}`}>{p.label}</span>
                  {isCritical && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-500 text-white animate-pulse">
                      🚨 CRITICAL
                    </span>
                  )}
                </div>
                <p className="font-display text-[15px] font-bold text-gray-800 leading-snug">{result.testName}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 ${s.badgeCls}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${s.dotCls}`}/>
                {s.label}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-[11.5px] text-orange-800/50">
              <span className={`font-semibold ${c.color}`}>{c.label}</span>
              <span>·</span>
              <span>{result.lab}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">
                {new Date(result.reportedDate).toLocaleDateString("en", { day:"numeric", month:"short", year:"numeric" })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-[11px] font-bold text-white shrink-0">
              {result.initials}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-gray-800 truncate">{result.patient}</p>
              <p className="text-[11px] text-orange-800/40">{result.doctor}</p>
            </div>
          </div>
          {abnormals > 0 && (
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
              isCritical ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700"
            }`}>
              {abnormals} out-of-range
            </span>
          )}
        </div>
      </div>

      {result.status !== "pending" && (
        <div
          className="px-5 py-2.5 bg-orange-50/60 border-y border-orange-100 flex items-center justify-between cursor-pointer hover:bg-orange-50 transition-colors select-none"
          onClick={() => setExpanded(v => !v)}
        >
          <div className="flex items-center gap-2">
            <span className="text-[12.5px] font-semibold text-gray-700">
              {result.values.length} parameter{result.values.length !== 1 ? "s" : ""}
            </span>
            <div className="hidden sm:flex items-center gap-1.5">
              {result.values.slice(0, 3).map((v, i) => (
                <span key={i} className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_META[v.status].badgeCls}`}>
                  {v.parameter.split(" ")[0]}: {v.value}
                </span>
              ))}
              {result.values.length > 3 && (
                <span className="text-[10.5px] text-orange-800/40 font-medium">+{result.values.length - 3} more</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-orange-500 font-semibold">{expanded ? "Collapse" : "View Results"}</span>
            <ChevronSvg open={expanded} />
          </div>
        </div>
      )}

      {expanded && (
        <div className="px-4 sm:px-5 py-4 border-b border-orange-50">
          <LabValuesTable values={result.values} />

          {result.interpretation && (
            <div className={`mt-4 rounded-xl px-4 py-3.5 border ${isCritical ? "bg-red-50 border-red-100" : "bg-blue-50 border-blue-100"}`}>
              <p className={`text-[10px] font-semibold uppercase tracking-wider mb-1.5 ${isCritical ? "text-red-600" : "text-blue-600"}`}>
                Clinical Interpretation
              </p>
              <p className={`text-[12.5px] leading-relaxed ${isCritical ? "text-red-900" : "text-blue-900"}`}>
                {result.interpretation}
              </p>
            </div>
          )}

          {result.notes && (
            <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <p className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider mb-1">Lab Notes</p>
              <p className="text-[12.5px] text-amber-900 leading-relaxed">{result.notes}</p>
            </div>
          )}
        </div>
      )}

      <div className="px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-[11px] text-orange-800/40 flex-wrap">
          <span>Ordered {new Date(result.orderedDate).toLocaleDateString("en", { day:"numeric", month:"short" })}</span>
          {result.status !== "pending" && (
            <>
              <span>·</span>
              <span>Reported {new Date(result.reportedDate).toLocaleDateString("en", { day:"numeric", month:"short" })}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          {result.status !== "pending" && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fdf3ec] border border-[#e8c8a8] text-orange-500 text-[11.5px] font-semibold transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500">
              <DownloadSvg /> Report
            </button>
          )}
          <button
            onClick={() => onSelect(result)}
            className="w-8 h-8 rounded-lg bg-[#fdf3ec] border border-[#e8c8a8] flex items-center justify-center text-sm text-orange-500 transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
