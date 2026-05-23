import React from "react";
import { MedicalRecord, TYPE_META, STATUS_META } from "../../types/records";
import { DownloadSvg } from "./RecordIcons";

interface RecordListRowProps {
  rec: MedicalRecord;
  idx: number;
  onSelect: (r: MedicalRecord) => void;
}

export function RecordListRow({ rec, idx, onSelect }: RecordListRowProps) {
  const t = TYPE_META[rec.type];
  const s = STATUS_META[rec.status];
  const isCritical = rec.status === "critical";

  return (
    <div
      onClick={() => onSelect(rec)}
      style={{ animationDelay: `${idx * 0.03}s` }}
      className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-white rounded-2xl border px-4 sm:px-5 py-4 mb-2.5 cursor-pointer transition-all duration-200 hover:shadow-[0_8px_28px_rgba(232,85,32,.14)] hover:border-orange-400/30 hover:-translate-y-px
        ${isCritical ? "border-red-200" : "border-orange-900/[.07]"}`}
    >
      {/* Type icon + title */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 border ${t.bg}`}>
          {t.icon}
        </div>
        <div className="min-w-0">
          <p className="font-display text-[14px] font-bold text-gray-800 truncate">{rec.title}</p>
          <p className="text-[11.5px] text-orange-800/50">{t.label} · {rec.department}</p>
        </div>
      </div>

      {/* Patient — hidden on smallest screens, shown from sm */}
      <div className="hidden sm:block w-[150px] shrink-0 min-w-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-[10px] font-bold text-white shrink-0">
            {rec.initials}
          </div>
          <span className="text-[12.5px] text-gray-700 font-semibold truncate">{rec.patient}</span>
        </div>
      </div>

      {/* Doctor — hidden below lg */}
      <div className="hidden lg:block w-[150px] shrink-0 min-w-0">
        <p className="text-[12px] text-orange-800/50 font-medium">Doctor</p>
        <p className="text-[13px] text-gray-700 font-semibold truncate">{rec.doctor}</p>
      </div>

      {/* Date — hidden below md */}
      <div className="hidden md:block shrink-0 text-right">
        <p className="text-[12px] text-orange-800/50 font-medium">Date</p>
        <p className="text-[13px] text-gray-700 font-semibold whitespace-nowrap">
          {new Date(rec.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* Status + actions row — always visible */}
      <div className="flex items-center justify-between sm:justify-end gap-2.5 mt-1 sm:mt-0">
        {/* On mobile: show patient inline here */}
        <div className="flex items-center gap-2 sm:hidden flex-1">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-[9px] font-bold text-white shrink-0">
            {rec.initials}
          </div>
          <span className="text-[12px] text-gray-600 font-medium truncate">{rec.patient}</span>
        </div>

        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${s.badgeCls}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dotCls}`}/>
          {s.label}
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          {rec.fileSize && rec.fileSize !== "—" && (
            <button
              onClick={e => e.stopPropagation()}
              className="w-8 h-8 rounded-[9px] bg-[#fdf3ec] border border-[#e8c8a8] flex items-center justify-center text-orange-500 transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500"
            >
              <DownloadSvg />
            </button>
          )}
          <button
            onClick={e => { e.stopPropagation(); onSelect(rec); }}
            className="w-8 h-8 rounded-[9px] bg-[#fdf3ec] border border-[#e8c8a8] flex items-center justify-center text-sm text-orange-500 transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}