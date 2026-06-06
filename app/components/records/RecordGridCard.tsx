import React from "react";
import { MedicalRecord, TYPE_META, STATUS_META } from "../../types/records";
import { DownloadSvg } from "./RecordIcons";

interface RecordGridCardProps {
  rec: MedicalRecord;
  idx: number;
  onSelect: (r: MedicalRecord) => void;
}

export function RecordGridCard({ rec, idx, onSelect }: RecordGridCardProps) {
  const t = TYPE_META[rec.type];
  const s = STATUS_META[rec.status];
  const isCritical = rec.status === "critical";

  return (
    <div
      onClick={() => onSelect(rec)}
      style={{ animationDelay: `${idx * 0.04}s` }}
      className={`group relative flex flex-col bg-white rounded-2xl border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(232,85,32,.18)] overflow-hidden
        ${isCritical ? "border-red-200 shadow-[0_4px_20px_rgba(239,68,68,.12)]" : "border-orange-900/[.07] shadow-[0_8px_32px_rgba(232,85,32,.08)]"}`}
    >
      {/* Critical pulse ring */}
      {isCritical && (
        <div className="absolute inset-0 rounded-2xl animate-pulse ring-2 ring-red-300/40 pointer-events-none" />
      )}

      {/* Top accent bar */}
      <div className={`h-1 w-full ${
        rec.status === "critical" ? "bg-gradient-to-r from-red-400 to-red-600" :
        rec.status === "abnormal" ? "bg-gradient-to-r from-yellow-300 to-orange-400" :
        "bg-gradient-to-r from-orange-200 to-orange-400"
      }`}/>

      {/* Header */}
      <div className="px-5 pt-4 pb-3.5 border-b border-orange-50 flex items-start gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 border ${t.bg}`}>
          {t.icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[14px] font-bold text-gray-800 leading-snug line-clamp-2">{rec.title}</p>
          <p className={`text-[11px] font-semibold mt-0.5 ${t.color}`}>{t.label}</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-3.5 flex-1 flex flex-col gap-3">
        {/* Patient row */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-[11px] font-bold text-white shrink-0">
            {rec.initials}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-gray-800 truncate">{rec.patient}</p>
            <p className="text-[11px] text-orange-800/40">#{rec.patientId}</p>
          </div>
        </div>

        {/* Summary */}
        <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-3 flex-1">{rec.summary}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {rec.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-500 border border-orange-100">
              {tag}
            </span>
          ))}
          {rec.tags.length > 3 && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-50 text-gray-400">+{rec.tags.length - 3}</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-orange-50 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded-full ${s.badgeCls}`}>
            <span className={`w-1 h-1 rounded-full ${s.dotCls}`}/>
            {s.label}
          </span>
          <span className="text-[11px] text-orange-800/40 truncate hidden sm:block">
            {new Date(rec.date).toLocaleDateString("en", { month: "short", day: "numeric" })}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {rec.fileSize && rec.fileSize !== "—" && (
            <button
              onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-[#fdf3ec] border border-[#e8c8a8] flex items-center justify-center text-orange-500 transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500"
            >
              <DownloadSvg />
            </button>
          )}
          <button
            onClick={e => { e.stopPropagation(); onSelect(rec); }}
            className="w-7 h-7 rounded-lg bg-[#fdf3ec] border border-[#e8c8a8] flex items-center justify-center text-sm text-orange-500 transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}