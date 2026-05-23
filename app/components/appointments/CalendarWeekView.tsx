import React from "react";
import { Appointment, STATUS_META } from "../../types/appointments";
import { TODAY } from "../../lib/appointmentsUtils";

interface CalendarWeekViewProps {
  weekDays: string[];
  grouped: Record<string, Appointment[]>;
  onSelect: (appt: Appointment) => void;
}

export function CalendarWeekView({ weekDays, grouped, onSelect }: CalendarWeekViewProps) {
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="bg-white rounded-2xl border border-orange-900/[.07] shadow-[0_8px_32px_rgba(232,85,32,.08)] overflow-hidden">
      {/* Day headers */}
      <div className="grid border-b border-orange-100" style={{ gridTemplateColumns: `repeat(7, 1fr)` }}>
        {weekDays.map((day, i) => {
          const isToday = day === TODAY;
          const dateNum = new Date(day + "T00:00:00").getDate();
          const hasAppts = (grouped[day] ?? []).length > 0;
          return (
            <div
              key={day}
              className={`flex flex-col items-center py-3 px-1 border-r last:border-r-0 border-orange-100 ${isToday ? "bg-orange-50" : ""}`}
            >
              <span className="text-[10px] sm:text-[11px] font-semibold text-orange-800/50 tracking-wider uppercase">{DAYS[i]}</span>
              <span className={`mt-1 w-7 h-7 flex items-center justify-center rounded-full font-display text-[14px] font-bold transition-all ${
                isToday ? "bg-orange-500 text-white shadow-[0_4px_12px_rgba(232,85,32,.35)]" : "text-gray-700"
              }`}>
                {dateNum}
              </span>
              {hasAppts && (
                <div className="mt-1.5 flex gap-0.5 flex-wrap justify-center max-w-[40px]">
                  {(grouped[day] ?? []).slice(0, 3).map((a, j) => (
                    <span key={j} className={`w-1.5 h-1.5 rounded-full ${STATUS_META[a.status].dotCls}`}/>
                  ))}
                  {(grouped[day] ?? []).length > 3 && (
                    <span className="text-[9px] text-orange-400 font-bold">+{(grouped[day] ?? []).length - 3}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Appointment slots per day */}
      <div className="grid min-h-[320px]" style={{ gridTemplateColumns: `repeat(7, 1fr)` }}>
        {weekDays.map((day) => {
          const appts = grouped[day] ?? [];
          const isToday = day === "2026-04-13";
          return (
            <div
              key={day}
              className={`border-r last:border-r-0 border-orange-50 p-2 flex flex-col gap-1.5 ${isToday ? "bg-orange-50/40" : ""}`}
            >
              {appts.map(a => {
                const meta = STATUS_META[a.status];
                return (
                  <button
                    key={a.id}
                    onClick={() => onSelect(a)}
                    className={`w-full text-left rounded-lg px-2 py-1.5 transition-all hover:scale-[1.02] hover:shadow-md ${meta.badgeCls} border border-current/20`}
                  >
                    <p className="text-[10px] sm:text-[11px] font-bold leading-tight truncate">{a.time}</p>
                    <p className="text-[9px] sm:text-[10px] font-medium leading-tight truncate opacity-80">{a.patient}</p>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}