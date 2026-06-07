"use client";

import { Prescription } from "./types";
import { STATUS_META, REFILL_META } from "./constants";
import { MedicationRow } from "./MedicationRow";
import { PrintSvg, RefillSvg } from "./icons";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

interface PrescriptionModalProps {
  rx: Prescription;
  onClose: () => void;
}

export function PrescriptionModal({ rx, onClose }: PrescriptionModalProps) {
  const statusMeta = STATUS_META[rx.status];
  const refillMeta = REFILL_META[rx.refill];

  return (
    <Modal open={true} onClose={onClose} className="relative z-10 w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col">
      <div className="flex justify-center pt-3 pb-1 sm:hidden shrink-0">
        <div className="w-10 h-1 rounded-full bg-orange-200" />
      </div>

      <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 px-6 py-5 shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-display text-[13px] font-bold text-white/80">#{rx.id}</span>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white">
                <span className={`w-1.5 h-1.5 rounded-full ${statusMeta.dotCls}`} />{statusMeta.label}
              </span>
            </div>
            <p className="font-display text-[18px] font-extrabold text-white leading-snug">{rx.diagnosis}</p>
            <p className="text-[12px] text-white/70 mt-0.5">{rx.doctor} · {rx.specialty}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-xl hover:bg-white/30 transition-all shrink-0"
          >
            ×
          </button>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-[15px] font-bold text-white">
              {rx.initials}
            </div>
            <div>
              <p className="font-semibold text-[15px] text-gray-800">{rx.patient}</p>
              <p className="text-[11px] text-orange-800/50">#{rx.patientId}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-orange-800/50 font-semibold uppercase tracking-wider">Valid until</p>
            <p className="text-[13.5px] font-bold text-gray-800">
              {new Date(rx.expiryDate).toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: "Issued", value: new Date(rx.issuedDate).toLocaleDateString("en", { day: "numeric", month: "short", year: "numeric" }) },
            { label: "Refills", value: rx.refillsLeft > 0 ? `${rx.refillsLeft} left` : "None" },
            ...(rx.pharmacy ? [{ label: "Pharmacy", value: rx.pharmacy }] : []),
          ].map(({ label, value }) => (
            <div key={label} className="bg-orange-50/70 rounded-xl px-3.5 py-2.5">
              <p className="text-[10px] text-orange-800/50 font-semibold uppercase tracking-wider mb-0.5">{label}</p>
              <p className="text-[13px] text-gray-800 font-semibold">{value}</p>
            </div>
          ))}
          <div className="bg-orange-50/70 rounded-xl px-3.5 py-2.5">
            <p className="text-[10px] text-orange-800/50 font-semibold uppercase tracking-wider mb-0.5">Refill Status</p>
            <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${refillMeta.cls}`}>
              {refillMeta.label}
            </span>
          </div>
        </div>

        <div>
          <p className="text-[11px] text-orange-800/50 font-semibold uppercase tracking-wider mb-3">
            Medications ({rx.medications.length})
          </p>
          <div className="bg-orange-50/40 rounded-xl border border-orange-100 px-4 py-1 divide-y divide-orange-100">
            {rx.medications.map((med, i) => (
              <MedicationRow key={i} med={med} idx={i} />
            ))}
          </div>
        </div>

        {rx.notes && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3.5">
            <p className="text-[10px] text-amber-700/70 font-semibold uppercase tracking-wider mb-1.5">Clinical Notes</p>
            <p className="text-[13px] text-amber-900 leading-relaxed">{rx.notes}</p>
          </div>
        )}

        <div className="flex gap-2.5 pt-1 pb-2">
          {rx.status === "active" && rx.refill !== "na" && (
            <Button variant="primary" size="md" className="flex-1 gap-2">
              <RefillSvg /> Request Refill
            </Button>
          )}
          <Button variant="outline" size="md" className="flex-1 gap-2 text-orange-500 border-orange-200 hover:bg-orange-500 hover:text-white">
            <PrintSvg /> Print / Download
          </Button>
        </div>
      </div>
    </Modal>
  );
}
