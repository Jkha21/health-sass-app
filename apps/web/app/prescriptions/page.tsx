"use client";

import React, { useState, useMemo } from "react";
import AppLayout from "../components/common/AppLayout";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  PrescriptionCard,
  PrescriptionModal,
  SearchSvg,
  PlusSvg,
  Prescription,
  PrescriptionStatus,
  STATUS_META,
} from "../components/prescriptions";
import { PRESCRIPTIONS } from "../data/prescriptions";

/* ─── Prescriptions Page ─────────────────────────────────── */

export default function PrescriptionsPage() {
  const [searchQ,       setSearchQ]       = useState("");
  const [statusFilter, setStatusFilter] = useState<PrescriptionStatus | "all">("all");
  const [selected,     setSelected]     = useState<Prescription | null>(null);
  const [showFilters,  setShowFilters]  = useState(false);

  /* Stats */
  const activeCount   = PRESCRIPTIONS.filter(p => p.status === "active").length;
  const expiredCount  = PRESCRIPTIONS.filter(p => p.status === "expired").length;
  const refillCount   = PRESCRIPTIONS.filter(p => p.refill === "available" && p.status === "active").length;
  const expiringCount = PRESCRIPTIONS.filter(p => {
    if (p.status !== "active") return false;
    return new Date(p.expiryDate) <= new Date(Date.now() + 14 * 86400000);
  }).length;

  /* Filtered */
  const filtered = useMemo(() => {
    const q = searchQ.toLowerCase().trim();
    return PRESCRIPTIONS.filter(p => {
      const matchQ = !q ||
        p.patient.toLowerCase().includes(q)   ||
        p.id.toLowerCase().includes(q)         ||
        p.diagnosis.toLowerCase().includes(q)  ||
        p.doctor.toLowerCase().includes(q)     ||
        p.medications.some(m => m.name.toLowerCase().includes(q));
      const matchS = statusFilter === "all" || p.status === statusFilter;
      return matchQ && matchS;
    }).sort((a, b) => b.issuedDate.localeCompare(a.issuedDate));
  }, [searchQ, statusFilter]);

  return (
    <AppLayout
      title="Prescriptions"
      activeItem="prescriptions"
      breadcrumbs={[{ label: "Dashboard" }, { label: "Prescriptions" }]}
    >
      {/* ══ Hero ════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-6 sm:px-8 py-6 sm:py-7 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/[.07]" />
        <span className="pointer-events-none absolute bottom-0 left-1/4 w-28 h-28 rounded-full bg-white/[.04]" />
        <div className="relative z-10">
          <h1 className="font-display text-2xl sm:text-[26px] font-extrabold text-white leading-tight mb-1">
            Prescriptions
          </h1>
          <p className="text-sm text-white/75">
            {activeCount} active · {expiringCount} expiring soon · {refillCount} refills available
          </p>
        </div>
        <div className="relative z-10 flex gap-2.5 flex-wrap">
          {[
            { num: PRESCRIPTIONS.length, label: "Total"    },
            { num: activeCount,           label: "Active"    },
            { num: expiringCount,         label: "Expiring"  },
            { num: refillCount,           label: "Refillable" },
          ].map(({ num, label }) => (
            <div key={label} className="rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 text-center min-w-[60px]">
              <div className="font-display text-xl sm:text-2xl font-extrabold text-white leading-none">{num}</div>
              <div className="text-[9.5px] sm:text-[10px] text-white/70 mt-0.5 whitespace-nowrap">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ Status quick-filter tabs ═════════════════════════ */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-1 px-1 scrollbar-none">
        {([["all", "All"], ["active", "Active"], ["pending", "Pending"], ["completed", "Completed"], ["expired", "Expired"], ["cancelled", "Cancelled"]] as const).map(([val, label]) => {
          const isStatusFilter = val !== "all";
          const statusVal = val as PrescriptionStatus;
          const count = isStatusFilter ? PRESCRIPTIONS.filter(p => p.status === statusVal).length : 0;
          
          return (
            <button
              key={val}
              onClick={() => setStatusFilter(val)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-semibold whitespace-nowrap border transition-all shrink-0
                ${statusFilter === val
                  ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white border-orange-500 shadow-[0_3px_10px_rgba(232,85,32,.25)]"
                  : "bg-white border-[#e8c8a8] text-orange-800/60 hover:border-orange-400"}`}
            >
              {isStatusFilter && (
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_META[statusVal].dotCls}`}/>
              )}
              {label}
              {isStatusFilter && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${statusFilter === val ? "bg-white/20" : "bg-orange-50"}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ══ Toolbar ═════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-orange-900/[.06] shadow-[0_8px_32px_rgba(232,85,32,.08)] px-4 sm:px-5 py-3.5 mb-5 space-y-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Search */}
          <div className="flex items-center gap-2 bg-[#fdf8f2] border border-[#e8c8a8] rounded-xl px-3.5 py-2.5 flex-1 min-w-[160px] transition-all focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10">
            <SearchSvg />
            <Input
              type="text"
              placeholder="Search patient, drug, diagnosis…"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              className="bg-transparent border-none outline-none text-[13.5px] text-gray-800 placeholder:text-[#c8a888] w-full"
            />
          </div>

          <span className="text-[13px] text-orange-800/50 font-medium whitespace-nowrap hidden sm:block">
            {filtered.length} prescription{filtered.length !== 1 ? "s" : ""}
          </span>

          {/* New prescription */}
          <Button
            className="flex items-center gap-2 whitespace-nowrap ml-auto"
            variant="primary"
            size="md"
          >
            <PlusSvg />
            <span className="hidden sm:inline">New Prescription</span>
            <span className="sm:hidden">New Rx</span>
          </Button>
        </div>
      </div>

      {/* ══ Warning banner — expiring prescriptions ══════════ */}
      {expiringCount > 0 && statusFilter === "all" && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-5">
          <span className="text-xl shrink-0">⚠️</span>
          <div>
            <p className="font-display text-[13px] font-bold text-amber-800">
              {expiringCount} prescription{expiringCount !== 1 ? "s" : ""} expiring within 14 days
            </p>
            <p className="text-[12px] text-amber-700 mt-0.5">
              Review and renew prescriptions before they expire to avoid treatment gaps.
            </p>
          </div>
        </div>
      )}

      {/* ══ Empty state ════════════════════════════════════ */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-[#e8c8a8]">
          <div className="text-5xl mb-4">💊</div>
          <div className="font-display text-lg font-bold text-gray-800 mb-1">No prescriptions found</div>
          <div className="text-sm text-orange-800/50">Try adjusting your search or status filter</div>
        </div>
      )}

      {/* ══ Prescription cards ═════════════════════════════ */}
      <div className="space-y-4">
        {filtered.map((rx, i) => (
          <PrescriptionCard key={rx.id} rx={rx} idx={i} onSelect={setSelected} />
        ))}
      </div>

      {/* ══ Detail modal ═══════════════════════════════════ */}
      {selected && (
        <PrescriptionModal rx={selected} onClose={() => setSelected(null)} />
      )}
    </AppLayout>
  );
}