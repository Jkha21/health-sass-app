import React from "react";
import { MedicalRecord, TYPE_META, STATUS_META } from "../../types/records";
import { DownloadSvg, FileSvg } from "./RecordIcons";

interface RecordModalProps {
  rec: MedicalRecord;
  onClose: () => void;
}

export function RecordModal({ rec, onClose }: RecordModalProps) {
  const t = TYPE_META[rec.type];
  const s = STATUS_META[rec.status];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div
        className="relative z-10 w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden shrink-0">
          <div className="w-10 h-1 rounded-full bg-orange-200" />
        </div>

        {/* Header */}
        <div className={`px-6 py-5 shrink-0 ${
          rec.status === "critical"
            ? "bg-gradient-to-r from-red-500 to-red-400"
            : "bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300"
        }`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/25 flex items-center justify-center text-2xl shrink-0">
                {t.icon}
              </div>
              <div>
                <p className="font-display text-[16px] font-bold text-white leading-snug">{rec.title}</p>
                <p className="text-[12px] text-white/75">{t.label} · #{rec.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xl transition-all hover:bg-white/30 shrink-0"
            >
              ×
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

          {/* Critical banner */}
          {rec.status === "critical" && (
            <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <span className="text-xl">🚨</span>
              <div>
                <p className="font-display text-[13px] font-bold text-red-700">Critical Result</p>
                <p className="text-[12px] text-red-600 leading-snug">Immediate clinical review required.</p>
              </div>
            </div>
          )}

          {/* Patient + status row */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-sm font-bold text-white">
                {rec.initials}
              </div>
              <div>
                <p className="font-semibold text-[14px] text-gray-800">{rec.patient}</p>
                <p className="text-[11px] text-orange-800/50">#{rec.patientId}</p>
              </div>
            </div>
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${s.badgeCls}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${s.dotCls}`}/>
              {s.label}
            </span>
          </div>

          {/* Detail grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "Date",       value: new Date(rec.date).toLocaleDateString("en", { weekday:"short", year:"numeric", month:"long", day:"numeric" }) },
              { label: "Doctor",     value: rec.doctor },
              { label: "Department", value: rec.department },
              { label: "Record ID",  value: `#${rec.id}` },
              ...(rec.fileSize && rec.fileSize !== "—" ? [{ label: "File Size", value: rec.fileSize }] : []),
              ...(rec.pages ? [{ label: "Pages", value: `${rec.pages} page${rec.pages !== 1 ? "s" : ""}` }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="bg-orange-50/70 rounded-xl px-3.5 py-2.5">
                <p className="text-[10px] text-orange-800/50 font-semibold uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-[12.5px] text-gray-800 font-semibold leading-snug">{value}</p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-100">
            <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-2">Clinical Summary</p>
            <p className="text-[13px] text-gray-700 leading-relaxed">{rec.summary}</p>
          </div>

          {/* Tags */}
          <div>
            <p className="text-[10px] text-orange-800/50 font-semibold uppercase tracking-wider mb-2">Tags</p>
            <div className="flex flex-wrap gap-1.5">
              {rec.tags.map(tag => (
                <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-orange-500 border border-orange-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 pt-1 pb-2">
            {rec.fileSize && rec.fileSize !== "—" && (
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-display text-[13px] font-semibold transition-all hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(232,85,32,.35)]">
                <DownloadSvg /> Download
              </button>
            )}
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-orange-200 bg-orange-50 text-orange-500 font-display text-[13px] font-semibold transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500">
              <FileSvg /> View Full
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}