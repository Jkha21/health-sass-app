"use client";

import { LabResult } from "./types";
import { STATUS_META, CATEGORY_META, PRIORITY_META } from "./constants";
import { LabValuesTable } from "./LabValuesTable";
import { DownloadSvg } from "./icons";

interface LabResultModalProps {
  result: LabResult;
  onClose: () => void;
}

export function LabResultModal({ result, onClose }: LabResultModalProps) {
  const s = STATUS_META[result.status];
  const c = CATEGORY_META[result.category];
  const p = PRIORITY_META[result.priority];
  const isCritical = result.status === "critical";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div
        className="relative z-10 w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1 sm:hidden shrink-0">
          <div className="w-10 h-1 rounded-full bg-orange-200" />
        </div>

        <div className={`px-6 py-5 shrink-0 ${isCritical
          ? "bg-gradient-to-r from-red-600 to-red-400"
          : "bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300"}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/25 flex items-center justify-center text-2xl shrink-0">
                {c.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[12px] font-bold text-white/70">#{result.id}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">{p.label}</span>
                  {isCritical && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white text-red-600 animate-pulse">🚨 CRITICAL</span>
                  )}
                </div>
                <p className="font-display text-[17px] font-extrabold text-white leading-snug">{result.testName}</p>
                <p className="text-[12px] text-white/70 mt-0.5">{c.label} · {result.lab}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-xl hover:bg-white/30 shrink-0">×</button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 px-5 sm:px-6 py-5 space-y-5">
          {isCritical && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3.5">
              <span className="text-xl shrink-0">🚨</span>
              <div>
                <p className="font-display text-[13px] font-bold text-red-700">Critical Result — Immediate Action Required</p>
                <p className="text-[12px] text-red-600 mt-0.5">{result.notes}</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-[14px] font-bold text-white">
                {result.initials}
              </div>
              <div>
                <p className="font-semibold text-[14.5px] text-gray-800">{result.patient}</p>
                <p className="text-[11px] text-orange-800/50">{result.doctor} · {result.department}</p>
              </div>
            </div>
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${s.badgeCls}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${s.dotCls}`}/>{s.label}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {[
              { label: "Ordered",   value: new Date(result.orderedDate).toLocaleDateString("en", { day:"numeric", month:"long", year:"numeric" }) },
              { label: "Reported",  value: result.status === "pending" ? "Pending" : new Date(result.reportedDate).toLocaleDateString("en", { day:"numeric", month:"long", year:"numeric" }) },
              { label: "Category",  value: c.label },
              { label: "Lab",       value: result.lab },
              { label: "Priority",  value: p.label },
              { label: "Patient ID",value: `#${result.patientId}` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-orange-50/70 rounded-xl px-3.5 py-2.5">
                <p className="text-[10px] text-orange-800/50 font-semibold uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-[12.5px] text-gray-800 font-semibold leading-snug">{value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-[11px] text-orange-800/50 font-semibold uppercase tracking-wider mb-3">
              Test Parameters ({result.values.length})
            </p>
            <div className="bg-orange-50/30 rounded-xl border border-orange-100 overflow-hidden px-3 sm:px-4 py-2">
              <LabValuesTable values={result.values} />
            </div>
          </div>

          {result.interpretation && (
            <div className={`rounded-xl px-4 py-4 border ${isCritical ? "bg-red-50 border-red-100" : "bg-blue-50 border-blue-100"}`}>
              <p className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${isCritical ? "text-red-600" : "text-blue-600"}`}>
                Clinical Interpretation
              </p>
              <p className={`text-[13px] leading-relaxed ${isCritical ? "text-red-900" : "text-blue-900"}`}>
                {result.interpretation}
              </p>
            </div>
          )}

          {result.notes && !isCritical && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3.5">
              <p className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider mb-1.5">Lab Notes</p>
              <p className="text-[13px] text-amber-900 leading-relaxed">{result.notes}</p>
            </div>
          )}

          <div className="flex gap-2.5 pt-1 pb-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-display text-[13px] font-semibold hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(232,85,32,.35)] transition-all">
              <DownloadSvg /> Download Report
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-orange-200 bg-orange-50 text-orange-500 font-display text-[13px] font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
              Order Follow-up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
