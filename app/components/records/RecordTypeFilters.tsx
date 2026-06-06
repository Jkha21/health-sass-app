import React from "react";
import { RecordType, TYPE_META } from "../../types/records";

interface RecordTypeFiltersProps {
  typeFilter: RecordType | "all";
  setTypeFilter: (t: RecordType | "all") => void;
}

export function RecordTypeFilters({ typeFilter, setTypeFilter }: RecordTypeFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-none -mx-1 px-1">
      <button
        onClick={() => setTypeFilter("all")}
        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-semibold whitespace-nowrap border transition-all shrink-0 ${typeFilter === "all" ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white border-orange-500 shadow-[0_3px_10px_rgba(232,85,32,.25)]" : "bg-white border-[#e8c8a8] text-orange-800/60 hover:border-orange-400"}`}
      >
        All Records
      </button>
      {(Object.entries(TYPE_META) as [RecordType, typeof TYPE_META[RecordType]][]).map(([type, meta]) => (
        <button
          key={type}
          onClick={() => setTypeFilter(type)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-semibold whitespace-nowrap border transition-all shrink-0 ${typeFilter === type ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white border-orange-500 shadow-[0_3px_10px_rgba(232,85,32,.25)]" : "bg-white border-[#e8c8a8] text-orange-800/60 hover:border-orange-400"}`}
        >
          <span>{meta.icon}</span>
          <span className="hidden xs:inline sm:inline">{meta.label}</span>
        </button>
      ))}
    </div>
  );
}