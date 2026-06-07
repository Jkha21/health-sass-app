"use client";

import React, { useState } from "react";
import { Patient } from "./index";

/* ─── Types ──────────────────────────────────────────────── */
interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  doctor: string;
  room: string;
  status: "upcoming" | "completed" | "cancelled";
}

interface AppointmentsListProps {
  patient: Patient;
}

/* ─── Seed data (replace with API call) ─────────────────── */
function getAppointments(patient: Patient): Appointment[] {
  return [
    { id: "A001", date: patient.nextVisit,  time: "10:30 AM", type: "Follow-up Consultation", doctor: patient.doctor, room: "Room 3",      status: "upcoming"  },
    { id: "A002", date: "Mar 10, 2026",      time: "9:00 AM",  type: "Blood Pressure Review",   doctor: patient.doctor, room: "Room 1",      status: "completed" },
    { id: "A003", date: "Feb 22, 2026",      time: "2:15 PM",  type: "Routine Check-up",        doctor: patient.doctor, room: "Room 2",      status: "completed" },
    { id: "A004", date: "Feb 05, 2026",      time: "11:00 AM", type: "Lab Results Review",      doctor: patient.doctor, room: "Telehealth",  status: "completed" },
    { id: "A005", date: "Jan 18, 2026",      time: "3:45 PM",  type: "Specialist Referral",     doctor: patient.doctor, room: "Room 4",      status: "cancelled" },
  ];
}

const STATUS_STYLES: Record<Appointment["status"], string> = {
  upcoming:  "bg-orange-50 text-orange-600 border border-orange-200",
  completed: "bg-green-50 text-green-700 border border-green-200",
  cancelled: "bg-red-50 text-red-600 border border-red-200",
};
const STATUS_DOT: Record<Appointment["status"], string> = {
  upcoming:  "bg-orange-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500",
};

type Filter = "all" | Appointment["status"];

/* ─── AppointmentsList ───────────────────────────────────── */
export default function AppointmentsList({ patient }: AppointmentsListProps) {
  const appointments = getAppointments(patient);
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all"
    ? appointments
    : appointments.filter(a => a.status === filter);

  const counts = {
    upcoming:  appointments.filter(a => a.status === "upcoming").length,
    completed: appointments.filter(a => a.status === "completed").length,
    cancelled: appointments.filter(a => a.status === "cancelled").length,
  };

  return (
    <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 border-b border-orange-100">
        <div>
          <div className="font-display text-base font-bold text-gray-800">Appointments</div>
          <div className="text-xs text-orange-800/60 mt-0.5">{appointments.length} total appointments</div>
        </div>
        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-display text-[13px] font-semibold transition-all hover:shadow-[0_4px_14px_rgba(232,85,32,.35)]">
          + Book New
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 px-6 pt-4">
        {(["all", "upcoming", "completed", "cancelled"] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={[
              "px-3.5 py-1.5 rounded-lg text-[12.5px] font-semibold transition-all",
              filter === f
                ? "bg-orange-500 text-white shadow-[0_3px_10px_rgba(232,85,32,.25)]"
                : "bg-orange-50 text-orange-800/60 hover:text-orange-500",
            ].join(" ")}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== "all" && (
              <span className="ml-1.5 opacity-70">{counts[f as keyof typeof counts]}</span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="p-4 space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-8 text-orange-800/50 text-sm">No appointments found</div>
        )}
        {filtered.map(a => (
          <div
            key={a.id}
            className="flex items-start gap-4 p-4 rounded-xl border border-orange-50 hover:bg-orange-50/50 transition-colors cursor-pointer"
          >
            {/* Date block */}
            <div className="shrink-0 w-12 text-center">
              <div className="font-display text-lg font-extrabold text-orange-500 leading-none">
                {a.date.split(" ")[1]?.replace(",", "") ?? "—"}
              </div>
              <div className="text-[10px] font-semibold text-orange-800/50 uppercase tracking-wide">
                {a.date.split(" ")[0] ?? ""}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px self-stretch bg-orange-100 shrink-0" />

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[13.5px] text-gray-800 mb-0.5">{a.type}</div>
              <div className="text-xs text-orange-800/60 flex flex-wrap gap-x-3 gap-y-0.5">
                <span>🕐 {a.time}</span>
                <span>👨‍⚕️ {a.doctor}</span>
                <span>📍 {a.room}</span>
              </div>
            </div>

            {/* Status */}
            <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${STATUS_STYLES[a.status]}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[a.status]}`} />
              {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}