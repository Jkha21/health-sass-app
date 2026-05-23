import React from "react";
import { RecordType, RecordStatus, ViewMode } from "../../types/records";
import { SearchSvg, GridSvg, ListSvgIcon, PlusSvg, FilterSvg } from "./RecordIcons";

interface RecordToolbarProps {
  searchQ: string;
  setSearchQ: (q: string) => void;
  typeFilter: RecordType | "all";
  setTypeFilter: (t: RecordType | "all") => void;
  statusFilter: RecordStatus | "all";
  setStatusFilter: (s: RecordStatus | "all") => void;
  view: ViewMode;
  setView: (v: ViewMode) => void;
  showFilters: boolean;
  setShowFilters: (s: boolean) => void;
  filteredCount: number;
}

export function RecordToolbar({
  searchQ,
  setSearchQ,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  view,
  setView,
  showFilters,
  setShowFilters,
  filteredCount,
}: RecordToolbarProps) {
  return (
    <div className="bg-white rounded-2xl border border-orange-900/[.06] shadow-[0_8px_32px_rgba(232,85,32,.08)] px-4 sm:px-5 py-3.5 mb-5 space-y-3">
      {/* Row 1: Search + toggle filters + view + upload */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Search */}
        <div className="flex items-center gap-2 bg-[#fdf8f2] border border-[#e8c8a8] rounded-xl px-3.5 py-2.5 flex-1 min-w-[160px] transition-all focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10">
          <SearchSvg />
          <input
            type="text"
            placeholder="Search records, patient, doctor…"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            className="bg-transparent border-none outline-none text-[13.5px] text-gray-800 placeholder:text-[#c8a888] w-full"
          />
        </div>

        {/* Filter toggle (mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-[13px] font-semibold transition-all sm:hidden ${
            showFilters
              ? "bg-orange-500 text-white border-orange-500"
              : "border-[#e8c8a8] bg-white text-orange-800/60"
          }`}
        >
          <FilterSvg />
          {showFilters ? "Hide" : "Filter"}
        </button>

        {/* Filters — always visible on sm+ */}
        <div className="hidden sm:flex items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as RecordType | "all")}
            className="px-3.5 py-2.5 border border-[#e8c8a8] rounded-xl bg-white text-[13px] text-gray-800 outline-none cursor-pointer focus:border-orange-500 transition-colors"
          >
            <option value="all">All Types</option>
            <option value="lab">Lab Report</option>
            <option value="imaging">Imaging</option>
            <option value="prescription">Prescription</option>
            <option value="discharge">Discharge</option>
            <option value="consultation">Consultation</option>
            <option value="vaccination">Vaccination</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as RecordStatus | "all")}
            className="px-3.5 py-2.5 border border-[#e8c8a8] rounded-xl bg-white text-[13px] text-gray-800 outline-none cursor-pointer focus:border-orange-500 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="normal">Normal</option>
            <option value="abnormal">Abnormal</option>
            <option value="critical">Critical</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
          </select>
        </div>

        <span className="text-[13px] text-orange-800/50 font-medium whitespace-nowrap hidden sm:block ml-auto">
          {filteredCount} record{filteredCount !== 1 ? "s" : ""}
        </span>

        {/* View toggle */}
        <div className="flex items-center bg-[#fdf8f2] border border-[#e8c8a8] rounded-[10px] p-0.5">
          {(["grid", "list"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className={[
                "flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12.5px] font-semibold font-display capitalize transition-all duration-200",
                view === mode
                  ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-[0_3px_10px_rgba(232,85,32,.30)]"
                  : "text-orange-800/50 hover:text-orange-500",
              ].join(" ")}
            >
              {mode === "grid" ? (
                <GridSvg active={view === "grid"} />
              ) : (
                <ListSvgIcon active={view === "list"} />
              )}
              <span className="hidden sm:inline">{mode === "grid" ? "Grid" : "List"}</span>
            </button>
          ))}
        </div>

        {/* Upload */}
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-display text-[13px] font-semibold transition-all hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(232,85,32,.35)] whitespace-nowrap">
          <PlusSvg />
          <span className="hidden sm:inline">Upload Record</span>
          <span className="sm:hidden">Upload</span>
        </button>
      </div>

      {/* Row 2: Mobile filter dropdowns (collapsible) */}
      {showFilters && (
        <div className="flex gap-2.5 sm:hidden">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as RecordType | "all")}
            className="flex-1 px-3.5 py-2.5 border border-[#e8c8a8] rounded-xl bg-white text-[13px] text-gray-800 outline-none cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="lab">Lab Report</option>
            <option value="imaging">Imaging</option>
            <option value="prescription">Prescription</option>
            <option value="discharge">Discharge</option>
            <option value="consultation">Consultation</option>
            <option value="vaccination">Vaccination</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as RecordStatus | "all")}
            className="flex-1 px-3.5 py-2.5 border border-[#e8c8a8] rounded-xl bg-white text-[13px] text-gray-800 outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="normal">Normal</option>
            <option value="abnormal">Abnormal</option>
            <option value="critical">Critical</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
          </select>
        </div>
      )}
    </div>
  );
}