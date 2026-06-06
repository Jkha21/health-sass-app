"use client";

import { useState } from "react";
import { Prescription } from "./types";
import { STATUS_META, REFILL_META } from "./constants";
import { MedicationRow } from "./MedicationRow";
import { PrintSvg, RefillSvg, ChevronSvg } from "./icons";
import { Button } from "../ui/Button";

interface PrescriptionCardProps {
  rx: Prescription;
  idx: number;
  onSelect: (rx: Prescription) => void;
}

export function PrescriptionCard({ rx, idx, onSelect }: PrescriptionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const statusMeta = STATUS_META[rx.status];
  const refillMeta = REFILL_META[rx.refill];
  const isExpired = rx.status === "expired";
  const isExpiring = !isExpired && new Date(rx.expiryDate) <= new Date(Date.now() + 14 * 86400000);

  return (
    <div
      style={{ animationDelay: `${idx * 0.04}s` }}
      className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-[0_12px_40px_rgba(232,85,32,.13)]
        ${isExpired ? "border-red-100" : isExpiring ? "border-amber-200" : "border-orange-900/[.07]"}
        shadow-[0_4px_20px_rgba(232,85,32,.07)]`}
    >
      <div className={`h-[3px] w-full bg-gradient-to-r ${statusMeta.barCls}`} />

      <div className="px-5 pt-4 pb-3.5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-display text-[13px] font-bold text-orange-500">#{rx.id}</span>
              {isExpiring && !isExpired && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 animate-pulse">
                  Expiring soon
                </span>
              )}
            </div>
            <p className="font-display text-[15px] font-bold text-gray-800 leading-snug line-clamp-1">{rx.diagnosis}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 ${statusMeta.badgeCls}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusMeta.dotCls}`} />
            {statusMeta.label}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-[12px] font-bold text-white shrink-0">
              {rx.initials}
            </div>
            <div className="min-w-0">
              <p className="text-[13.5px] font-semibold text-gray-800 truncate">{rx.patient}</p>
              <p className="text-[11px] text-orange-800/40">{rx.doctor} · {rx.specialty}</p>
            </div>
          </div>
          <div className="text-right shrink-0 hidden sm:block">
            <p className="text-[11px] text-orange-800/40 font-medium">Issued</p>
            <p className="text-[12.5px] font-semibold text-gray-700">
              {new Date(rx.issuedDate).toLocaleDateString("en", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
        </div>
      </div>

      <div
        className="px-5 py-2.5 bg-orange-50/60 border-y border-orange-100 flex items-center justify-between cursor-pointer select-none hover:bg-orange-50 transition-colors"
        onClick={() => setExpanded((value) => !value)}
      >
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] font-semibold text-gray-700">
            {rx.medications.length} medication{rx.medications.length !== 1 ? "s" : ""}
          </span>
          <div className="flex -space-x-1">
            {rx.medications.slice(0, 4).map((med, i) => (
              <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 border-2 border-white flex items-center justify-center" title={med.name}>
                <span className="text-[8px] text-white font-bold">{med.name[0]}</span>
              </div>
            ))}
            {rx.medications.length > 4 && (
              <div className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                <span className="text-[7px] text-gray-600 font-bold">+{rx.medications.length - 4}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-orange-500 font-semibold">{expanded ? "Hide" : "Show"} details</span>
          <ChevronSvg open={expanded} />
        </div>
      </div>

      {expanded && (
        <div className="px-5 py-1 border-b border-orange-50 divide-y divide-orange-50">
          {rx.medications.map((med, i) => (
            <MedicationRow key={i} med={med} idx={i} />
          ))}
        </div>
      )}

      <div className="px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1 text-[10.5px] font-semibold px-2.5 py-1 rounded-full border ${refillMeta.cls}`}>
            {rx.refill !== "na" && <RefillSvg />}
            {refillMeta.label}
            {rx.refillsLeft > 0 && ` (${rx.refillsLeft})`}
          </span>
          <span className={`text-[11px] font-medium ${isExpired ? "text-red-500" : "text-orange-800/40"}`}>
            {isExpired ? "Expired" : "Valid until"}{" "}
            {new Date(rx.expiryDate).toLocaleDateString("en", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          {rx.refill === "available" && rx.status === "active" && (
            <Button variant="outline" size="sm" className="gap-1.5 text-emerald-600 border-emerald-200 hover:bg-emerald-500 hover:text-white">
              <RefillSvg /> Refill
            </Button>
          )}
          <Button variant="outline" size="sm" className="gap-1.5 text-orange-500 border-[#e8c8a8] hover:bg-orange-500 hover:text-white">
            <PrintSvg /> Print
          </Button>
          <button
            onClick={() => onSelect(rx)}
            className="w-8 h-8 rounded-lg bg-[#fdf3ec] border border-[#e8c8a8] flex items-center justify-center text-sm text-orange-500 transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
