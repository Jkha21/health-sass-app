"use client";

import React from "react";
import { Patient, STATUS_META } from "./index";

interface PatientProfileProps {
  patient: Patient;
}

const STATUS_BAR: Record<string, string> = {
  urgent:   "from-red-400 to-red-600",
  active:   "from-green-400 to-green-600",
  pending:  "from-yellow-300 to-yellow-600",
  complete: "from-blue-400 to-blue-600",
};

export default function PatientProfile({ patient: p }: PatientProfileProps) {
  const m = STATUS_META[p.status];

  return (
    <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
      {/* Gradient header */}
      <div className={`h-24 bg-gradient-to-r ${STATUS_BAR[p.status]} relative`}>
        <span className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
      </div>

      {/* Avatar + name */}
      <div className="px-6 pb-6 -mt-10">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-3xl font-extrabold text-white shadow-[0_8px_24px_rgba(232,85,32,.30)] mb-4 border-4 border-white">
          {p.initials}
        </div>

        <div className="mb-4">
          <h2 className="font-display text-xl font-bold text-gray-800">{p.name}</h2>
          <div className="text-sm text-orange-800/60 mt-0.5">#{p.id}</div>
        </div>

        {/* Status badge */}
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-current ${m.badgeCls}`}>
          {m.label}
        </span>

        {/* Info rows */}
        <div className="space-y-3">
          {[
            ["🧑", "Age",       `${p.age} years`    ],
            ["🏥", "Ward",      p.ward              ],
            ["👨‍⚕️", "Doctor",  p.doctor             ],
            ["📍", "Location",  p.location           ],
            ["🦠", "Condition", p.condition          ],
            ["📅", "Next Visit",p.nextVisit          ],
          ].map(([icon, label, val]) => (
            <div key={label} className="flex items-start gap-3">
              <span className="text-base shrink-0 mt-px">{icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-orange-800/50">{label}</div>
                <div className="text-[13.5px] font-semibold text-gray-800 truncate">{val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-2">
          <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-display text-[13px] font-semibold transition-all hover:shadow-[0_6px_18px_rgba(232,85,32,.35)]">
            Schedule Appointment
          </button>
          <button className="w-full py-2.5 rounded-xl border border-[#e8c8a8] bg-white text-[#e85520] font-display text-[13px] font-semibold transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}