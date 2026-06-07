import React from "react";
import { Appointment, STATUS_META } from "../../types/appointments";
import { formatDate } from "../../lib/appointmentsUtils";

interface AppointmentModalProps {
  appt: Appointment;
  onClose: () => void;
}

export function AppointmentModal({ appt, onClose }: AppointmentModalProps) {
  const meta = STATUS_META[appt.status];
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Sheet */}
      <div
        className="relative z-10 w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-orange-200" />
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 px-6 py-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/25 flex items-center justify-center font-display text-lg font-bold text-white">
                {appt.initials}
              </div>
              <div>
                <p className="font-display text-[17px] font-bold text-white leading-snug">{appt.patient}</p>
                <p className="text-[12px] text-white/75">{appt.type} · {appt.specialty}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-lg transition-all hover:bg-white/30"
            >
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-orange-800/50 font-semibold uppercase tracking-wider">Status</span>
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${meta.badgeCls}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${meta.dotCls}`}/>
              {meta.label}
            </span>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Date",     value: formatDate(appt.date) },
              { label: "Time",     value: `${appt.time} (${appt.duration}m)` },
              { label: "Doctor",   value: appt.doctor },
              { label: "Room",     value: appt.room },
              { label: "ID",       value: `#${appt.id}` },
              { label: "Type",     value: appt.type },
            ].map(({ label, value }) => (
              <div key={label} className="bg-orange-50/60 rounded-xl px-3.5 py-2.5">
                <p className="text-[10px] text-orange-800/50 font-semibold uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-[13px] text-gray-800 font-semibold leading-snug">{value}</p>
              </div>
            ))}
          </div>

          {/* Notes */}
          {appt.notes && (
            <div className="bg-orange-50 rounded-xl px-3.5 py-3 border border-orange-100">
              <p className="text-[10px] text-orange-800/50 font-semibold uppercase tracking-wider mb-1">Notes</p>
              <p className="text-[13px] text-gray-700">{appt.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2.5 pt-1">
            <button className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-display text-[13px] font-semibold transition-all hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(232,85,32,.35)]">
              Reschedule
            </button>
            <button className="flex-1 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-500 font-display text-[13px] font-semibold transition-all hover:bg-red-500 hover:text-white hover:border-red-500">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}