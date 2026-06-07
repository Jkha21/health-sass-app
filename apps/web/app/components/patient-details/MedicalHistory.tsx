"use client";

import React, { useState } from "react";
import { Patient } from "./index";

/* ─── Types ──────────────────────────────────────────────── */
interface MedicalEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "diagnosis" | "procedure" | "lab" | "prescription" | "note";
  doctor: string;
}

interface Medication {
  name: string;
  dose: string;
  frequency: string;
  since: string;
  status: "active" | "discontinued";
}

interface MedicalHistoryProps {
  patient: Patient;
}

/* ─── Seed data (replace with API) ──────────────────────── */
function getMedicalEvents(patient: Patient): MedicalEvent[] {
  return [
    { id: "E001", date: "Mar 2026", title: `${patient.condition} diagnosed`,       description: "Initial diagnosis confirmed after comprehensive blood panel and imaging.", type: "diagnosis",    doctor: patient.doctor  },
    { id: "E002", date: "Feb 2026", title: "Routine Blood Panel",                  description: "HbA1c, lipid profile, and CBC within expected ranges.",                   type: "lab",          doctor: patient.doctor  },
    { id: "E003", date: "Jan 2026", title: "Medication adjustment",                description: "Dosage increased following review of symptom progression.",               type: "prescription", doctor: patient.doctor  },
    { id: "E004", date: "Dec 2025", title: "Specialist consultation",              description: "Referred to and reviewed by specialist. Follow-up plan established.",     type: "procedure",    doctor: "Dr. Specialist" },
    { id: "E005", date: "Oct 2025", title: "Annual physical",                      description: "All vitals stable. Preventive care plan reviewed and updated.",           type: "note",         doctor: patient.doctor  },
  ];
}

function getMedications(patient: Patient): Medication[] {
  return [
    { name: "Metformin",    dose: "500mg",  frequency: "Twice daily",      since: "Jan 2026", status: "active"       },
    { name: "Lisinopril",   dose: "10mg",   frequency: "Once daily",       since: "Mar 2026", status: "active"       },
    { name: "Atorvastatin", dose: "20mg",   frequency: "Once at bedtime",  since: "Dec 2025", status: "active"       },
    { name: "Aspirin",      dose: "81mg",   frequency: "Once daily",       since: "Oct 2025", status: "discontinued" },
  ];
}

const TYPE_ICON: Record<MedicalEvent["type"], string> = {
  diagnosis:   "🩺",
  procedure:   "⚕️",
  lab:         "🧪",
  prescription:"💊",
  note:        "📋",
};
const TYPE_COLOR: Record<MedicalEvent["type"], string> = {
  diagnosis:   "bg-red-100 text-red-600",
  procedure:   "bg-purple-100 text-purple-600",
  lab:         "bg-blue-100 text-blue-600",
  prescription:"bg-amber-100 text-amber-700",
  note:        "bg-gray-100 text-gray-600",
};

/* ─── MedicalHistory ─────────────────────────────────────── */
export default function MedicalHistory({ patient }: MedicalHistoryProps) {
  const events      = getMedicalEvents(patient);
  const medications = getMedications(patient);
  const [tab, setTab] = useState<"timeline" | "medications">("timeline");

  const activeMeds = medications.filter(m => m.status === "active");

  return (
    <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-orange-100">
        <div className="font-display text-base font-bold text-gray-800">Medical History</div>
        <div className="text-xs text-orange-800/60 mt-0.5">
          {events.length} events · {activeMeds.length} active medications
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-6 pt-4 border-b border-orange-100">
        {(["timeline", "medications"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              "px-4 py-2 rounded-t-lg text-[13px] font-semibold border-b-2 transition-all capitalize",
              tab === t
                ? "text-orange-500 border-orange-500"
                : "text-orange-800/50 border-transparent hover:text-orange-500",
            ].join(" ")}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-5">

        {/* ── Timeline ── */}
        {tab === "timeline" && (
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-orange-100" />

            <div className="space-y-5">
              {events.map((e, i) => (
                <div key={e.id} className="flex gap-4 relative">
                  {/* icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0 z-10 ${TYPE_COLOR[e.type]}`}>
                    {TYPE_ICON[e.type]}
                  </div>

                  {/* content */}
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="font-semibold text-[13.5px] text-gray-800">{e.title}</div>
                      <span className="text-[11px] font-medium text-orange-800/50 shrink-0">{e.date}</span>
                    </div>
                    <div className="text-xs text-orange-800/60 mt-0.5 mb-1 leading-relaxed">{e.description}</div>
                    <div className="text-[11px] text-orange-800/40 font-medium">👨‍⚕️ {e.doctor}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Medications ── */}
        {tab === "medications" && (
          <div className="space-y-3">
            {medications.map(med => (
              <div
                key={med.name}
                className={[
                  "flex items-start gap-4 p-4 rounded-xl border transition-colors",
                  med.status === "active"
                    ? "border-orange-100 hover:bg-orange-50/50"
                    : "border-gray-100 opacity-60",
                ].join(" ")}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-lg shrink-0">
                  💊
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display text-[14px] font-bold text-gray-800">{med.name}</span>
                    <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">{med.dose}</span>
                  </div>
                  <div className="text-xs text-orange-800/60 mt-0.5">
                    {med.frequency} · Since {med.since}
                  </div>
                </div>
                <span className={[
                  "text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0",
                  med.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500",
                ].join(" ")}>
                  {med.status.charAt(0).toUpperCase() + med.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}