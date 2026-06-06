import React from "react";
import { Appointment, STATUS_META } from "../../types/appointments";
import { ClockSvg, RoomSvg } from "./AppointmentIcons";

interface AppointmentCardProps {
  appt: Appointment;
  idx: number;
  onSelect: (appt: Appointment) => void;
}

export function AppointmentCard({ appt, idx, onSelect }: AppointmentCardProps) {
  const meta = STATUS_META[appt.status];
  return (
    <div
      onClick={() => onSelect(appt)}
      style={{ animationDelay: `${idx * 0.04}s` }}
      className="group relative flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-2xl border border-orange-900/[.07] px-4 sm:px-5 py-4 mb-3 cursor-pointer transition-all duration-200 hover:shadow-[0_8px_28px_rgba(232,85,32,.14)] hover:border-orange-400/30 hover:-translate-y-px"
    >
      {/* Time column */}
      <div className="flex sm:flex-col items-center sm:items-center gap-2 sm:gap-0.5 sm:w-[72px] shrink-0">
        <span className="font-display text-[15px] sm:text-[16px] font-bold text-orange-500 whitespace-nowrap">{appt.time}</span>
        <span className="text-[11px] text-orange-800/50 flex items-center gap-0.5 whitespace-nowrap">
          <ClockSvg />{appt.duration}m
        </span>
      </div>

      {/* Divider — vertical on desktop, horizontal on mobile */}
      <div className="hidden sm:block w-px h-10 bg-orange-100 shrink-0" />
      <div className="sm:hidden h-px w-full bg-orange-100" />

      {/* Avatar + patient */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-[14px] font-bold text-white shrink-0 shadow-[0_4px_12px_rgba(232,85,32,.20)]">
          {appt.initials}
        </div>
        <div className="min-w-0">
          <p className="font-display text-[14.5px] font-bold text-gray-800 truncate leading-snug">{appt.patient}</p>
          <p className="text-[12px] text-orange-800/50 truncate">{appt.type} · {appt.specialty}</p>
        </div>
      </div>

      {/* Doctor */}
      <div className="hidden md:block min-w-0 w-[160px] shrink-0">
        <p className="text-[12px] text-orange-800/50 font-medium">Doctor</p>
        <p className="text-[13px] text-gray-700 font-semibold truncate">{appt.doctor}</p>
      </div>

      {/* Room */}
      <div className="hidden lg:flex items-center gap-1.5 w-[90px] shrink-0 text-[12.5px] text-orange-800/60 font-medium">
        <RoomSvg />{appt.room}
      </div>

      {/* Status + action */}
      <div className="flex items-center justify-between sm:justify-end gap-3 mt-1 sm:mt-0 sm:w-auto">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${meta.badgeCls}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${meta.dotCls}`}/>
          {meta.label}
        </span>
        <button
          onClick={e => { e.stopPropagation(); onSelect(appt); }}
          className="w-8 h-8 rounded-[9px] bg-[#fdf3ec] border border-[#e8c8a8] flex items-center justify-center text-sm text-orange-500 transition-all hover:bg-orange-500 hover:border-orange-500 hover:text-white"
        >
          →
        </button>
      </div>
    </div>
  );
}