"use client";

import React, { useState, useMemo } from "react";
import AppLayout         from "../components/common/AppLayout";
import PatientDetailsPage from "../components/patient-details/PatientDetailsPage";
import { PATIENTS, STATUS_META, Patient, PatientStatus } from "../components/patient-details/index";

/* ─── Types ──────────────────────────────────────────────── */
type ViewMode = "grid" | "list";

/* ─── Status bar colours ─────────────────────────────────── */
const STATUS_BAR: Record<PatientStatus, string> = {
  urgent:   "bg-gradient-to-r from-red-300 to-red-600",
  active:   "bg-gradient-to-r from-green-300 to-green-600",
  pending:  "bg-gradient-to-r from-yellow-200 to-yellow-500",
  complete: "bg-gradient-to-r from-blue-300 to-blue-600",
};

/* ─── Shared Grid Column Definition ──────────────────────── */
const LIST_GRID_TEMPLATE = "minmax(200px, 2.5fr) 120px 1.5fr 1.2fr 1.2fr 50px";

/* ─── SVGs ───────────────────────────────────────────────── */
const SearchSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8a888" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const GridSvg = ({ active }: { active: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill={active ? "#fff" : "currentColor"}>
    <rect x="0" y="0" width="6" height="6" rx="1.5"/>
    <rect x="10" y="0" width="6" height="6" rx="1.5"/>
    <rect x="0" y="10" width="6" height="6" rx="1.5"/>
    <rect x="10" y="10" width="6" height="6" rx="1.5"/>
  </svg>
);
const ListSvg = ({ active }: { active: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={active ? "#fff" : "currentColor"} strokeWidth="2" strokeLinecap="round">
    <line x1="4" y1="3" x2="15" y2="3"/>
    <line x1="4" y1="8" x2="15" y2="8"/>
    <line x1="4" y1="13" x2="15" y2="13"/>
    <circle cx="1.5" cy="3"  r="1" fill={active ? "#fff" : "currentColor"}/>
    <circle cx="1.5" cy="8"  r="1" fill={active ? "#fff" : "currentColor"}/>
    <circle cx="1.5" cy="13" r="1" fill={active ? "#fff" : "currentColor"}/>
  </svg>
);
const PlusSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5"  y1="12" x2="19" y2="12"/>
  </svg>
);

/* ─── Grid Card ──────────────────────────────────────────── */
function GridCard({ p, onSelect }: { p: Patient; onSelect: (p: Patient) => void }) {
  const m = STATUS_META[p.status];
  return (
    <div
      onClick={() => onSelect(p)}
      className="relative flex flex-col bg-white rounded-2xl border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(232,85,32,.20)] min-w-0 w-full"
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${STATUS_BAR[p.status]}`} />
      <div className="flex flex-col items-center gap-3.5 px-6 pt-7 pb-5 border-b border-orange-100 min-w-0">
        <div className="w-[72px] h-[72px] rounded-[20px] bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-[26px] font-extrabold text-white shadow-[0_8px_24px_rgba(232,85,32,.25)] shrink-0">
          {p.initials}
        </div>
        <div className="text-center min-w-0 w-full">
          <div className="font-display text-[17px] font-bold text-gray-800 leading-snug truncate">{p.name}</div>
          <div className="text-xs text-orange-800/50 mt-0.5 truncate">#{p.id}</div>
        </div>
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-current ${m.badgeCls}`}>
          {m.label}
        </span>
      </div>
      <div className="flex flex-col gap-2.5 px-5 py-4 flex-1 min-w-0">
        {([
          ["Age",       `${p.age} yrs`],
          ["Condition", p.condition   ],
          ["Doctor",    p.doctor      ],
          ["Ward",      p.ward        ],
        ] as [string, string][]).map(([label, val]) => (
          <div key={label} className="flex items-center justify-between text-[13px] gap-2 min-w-0">
            <span className="text-orange-800/60 font-medium shrink-0">{label}</span>
            <span className="text-gray-800 font-semibold truncate text-right">{val}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-2 px-5 py-3.5 border-t border-orange-50 shrink-0">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-orange-500 truncate">
          📅 {p.nextVisit}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(p); }}
          className="px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-semibold transition-all hover:bg-orange-500 hover:text-white shrink-0"
        >
          View →
        </button>
      </div>
    </div>
  );
}

/* ─── PatientsPage ───────────────────────────────────────── */
export default function PatientsPage() {
  const [view,         setView]         = useState<ViewMode>("grid");
  const [searchQ,      setSearchQ]      = useState("");
  const [statusFilter, setStatusFilter] = useState<PatientStatus | "all">("all");
  const [selected,     setSelected]     = useState<Patient | null>(null);

  const filtered = useMemo(() => {
    const q = searchQ.toLowerCase().trim();
    return PATIENTS.filter(p => {
      const matchQ = !q ||
        p.name.toLowerCase().includes(q)      ||
        p.id.toLowerCase().includes(q)        ||
        p.condition.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q);
      const matchS = statusFilter === "all" || p.status === statusFilter;
      return matchQ && matchS;
    });
  }, [searchQ, statusFilter]);

  const totalCount  = PATIENTS.length;
  const activeCount = PATIENTS.filter(p => p.status === "active").length;
  const urgentCount = PATIENTS.filter(p => p.status === "urgent").length;

  if (selected) {
    return <PatientDetailsPage patient={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <AppLayout title="Patients" activeItem="patients" breadcrumbs={[{ label: "Dashboard" }, { label: "Patients" }]}>
      <div className="w-full max-w-full min-w-0 overflow-hidden block">

        {/* ══ Hero Header Block ══ */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-5 sm:px-8 py-6 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 w-full min-w-0">
          <span className="pointer-events-none absolute -top-12 -right-12 w-52 h-52 rounded-full bg-white/[.07]" />
          <div className="relative z-10 min-w-0 flex-1">
            <h1 className="font-display text-xl sm:text-[26px] font-extrabold text-white leading-tight mb-1">
              Patient Management
            </h1>
            <p className="text-xs sm:text-sm text-white/80 truncate sm:whitespace-normal">
              Switch between grid and list views · Search · Filter by status
            </p>
          </div>
          {/* Stat metrics cards block row item */}
          <div className="relative z-10 grid grid-cols-3 md:flex gap-2 w-full md:w-auto shrink-0 min-w-0">
            {[
              { num: totalCount,  label: "Total"  },
              { num: activeCount, label: "Active"  },
              { num: urgentCount, label: "Urgent"  },
            ].map(({ num, label }) => (
              <div key={label} className="rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm p-2 text-center flex-1 md:min-w-[75px] min-w-0">
                <div className="font-display text-lg sm:text-2xl font-extrabold text-white leading-none truncate">{num}</div>
                <div className="text-[10px] text-white/75 mt-1 uppercase tracking-wider font-semibold truncate">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ Toolbar Filters Controller ══ */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 bg-white rounded-2xl border border-orange-900/[.06] shadow-[0_8px_32px_rgba(232,85,32,.10)] p-4 mb-5 w-full min-w-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 min-w-0">
            {/* Search native text input */}
            <div className="flex items-center gap-2 bg-[#fdf8f2] border border-[#e8c8a8] rounded-xl px-3.5 py-2.5 flex-1 transition-all focus-within:border-orange-500 min-w-0">
              <span className="shrink-0"><SearchSvg /></span>
              <input
                type="text"
                placeholder="Search..."
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                className="bg-transparent border-none outline-none text-[13.5px] text-gray-800 placeholder:text-[#c8a888] w-full p-0 focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Select drop selector input card option */}
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as PatientStatus | "all")}
              className="px-3.5 py-2.5 border border-[#e8c8a8] rounded-xl bg-white text-[13.5px] text-gray-800 outline-none cursor-pointer focus:border-orange-500 transition-colors w-full sm:w-auto shrink-0"
            >
              <option value="all">All Status</option>
              <option value="urgent">High Priority</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="complete">Completed</option>
            </select>
          </div>

          {/* Right side navigation buttons control layout wrap */}
          <div className="flex flex-row items-center justify-between lg:justify-end gap-3 w-full lg:w-auto shrink-0 min-w-0">
            <span className="text-[13px] text-orange-800/60 font-medium whitespace-nowrap truncate">
              {filtered.length} {filtered.length === 1 ? "patient" : "patients"}
            </span>

            <div className="flex items-center gap-2 shrink-0">
              {/* Layout view display format toggle buttons */}
              <div className="flex items-center bg-[#fdf8f2] border border-[#e8c8a8] rounded-[10px] p-0.5">
                {(["grid", "list"] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setView(mode)}
                    className={[
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[13px] font-semibold font-display capitalize transition-all duration-200 shrink-0",
                      view === mode
                        ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-sm"
                        : "text-orange-800/50 hover:text-orange-500",
                    ].join(" ")}
                  >
                    {mode === "grid" ? <GridSvg active={view === "grid"} /> : <ListSvg active={view === "list"} />}
                    <span className="hidden sm:inline text-xs">{mode}</span>
                  </button>
                ))}
              </div>

              {/* Action layout button addition block */}
              <button className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-display text-[13.5px] font-semibold shadow-sm transition-all shrink-0">
                <PlusSvg /><span className="hidden sm:inline text-xs">Add Patient</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══ List/Grid Content Area Viewport ══ */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-[#e8c8a8] text-center w-full">
            <div className="text-5xl mb-4">🔍</div>
            <div className="font-display text-lg font-bold text-gray-800 mb-1">No patients found</div>
            <div className="text-sm text-orange-800/60">Try adjusting your search or filter settings</div>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full block">
            {filtered.map((p) => (
              <GridCard key={p.id} p={p} onSelect={setSelected} />
            ))}
          </div>
        ) : (
          <div className="w-full rounded-2xl border border-orange-900/[.07] bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto w-full block scrollbar-thin">
              <div className="min-w-[700px] w-full block p-2">
                
                {/* List header row element details column header labels */}
                <div 
                  className="grid px-4 py-3 text-[11.5px] font-bold text-orange-800/60 tracking-wider uppercase border-b border-orange-50 mb-1 gap-4"
                  style={{ gridTemplateColumns: LIST_GRID_TEMPLATE }}
                >
                  <span>Patient</span>
                  <span>Status</span>
                  <span>Condition</span>
                  <span>Next Visit</span>
                  <span>Location</span>
                  <span />
                </div>

                {/* Patient entry row dynamic render items block list map */}
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className="grid items-center gap-4 bg-white border border-transparent rounded-xl px-4 py-3 hover:bg-[#fdfcfb] hover:border-orange-200/50 cursor-pointer transition-all duration-150"
                    style={{ gridTemplateColumns: LIST_GRID_TEMPLATE }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-[38px] h-[38px] rounded-xl bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-sm font-bold text-white shrink-0">
                        {p.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-display text-[14px] font-bold text-gray-800 truncate">{p.name}</div>
                        <div className="text-[11px] text-orange-800/40 font-mono">#{p.id}</div>
                      </div>
                    </div>
                    
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full w-fit whitespace-nowrap before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-current ${STATUS_META[p.status].badgeCls}`}>
                      {STATUS_META[p.status].label}
                    </span>
                    
                    <span className="text-[13.5px] text-gray-700 truncate">{p.condition}</span>
                    <span className="text-[13px] text-gray-700 font-medium truncate">{p.nextVisit}</span>
                    <span className="text-[13px] text-orange-800/60 truncate">{p.location}</span>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelected(p); }}
                        className="w-7 h-7 rounded-lg bg-[#fdf3ec] border border-[#e8c8a8] flex items-center justify-center text-sm transition-all hover:bg-orange-500 hover:border-orange-500 hover:text-white shrink-0"
                      >
                        →
                      </button>
                    </div>
                  </div>
                ))}
                
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}