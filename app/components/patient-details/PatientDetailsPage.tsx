"use client";

import React, { useState } from "react";
import AppLayout from "../../components/common/AppLayout";
import { Patient, STATUS_META } from "./index";

// ─────────────────────────────────────────────────────────────────
//  PatientProfile (fixed: avatar overlaps status bar)
// ─────────────────────────────────────────────────────────────────
interface PatientProfileProps {
  patient: Patient;
}

function PatientProfile({ patient }: PatientProfileProps) {
  const m = STATUS_META[patient.status];

  const statusBarGradient: Record<string, string> = {
    urgent: "from-red-400 to-red-600",
    active: "from-green-400 to-green-600",
    pending: "from-yellow-400 to-yellow-600",
    complete: "from-blue-400 to-blue-600",
  };

  return (
    <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
      {/* Status bar – now at the top */}
      <div className={`h-24 bg-gradient-to-r ${statusBarGradient[patient.status] || "from-gray-400 to-gray-600"} relative`}>
        {/* Avatar – absolutely positioned to overlap the bar */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-3xl font-extrabold text-white shadow-[0_8px_24px_rgba(232,85,32,.30)] border-4 border-white">
            {patient.initials}
          </div>
        </div>
      </div>

      {/* Patient info below the avatar */}
      <div className="pt-12 pb-5 px-5 text-center">
        <div className="font-display text-xl font-bold text-gray-800">{patient.name}</div>
        <div className="text-xs text-orange-800/50 mt-0.5">#{patient.id}</div>
        <div className="mt-3 flex justify-center">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${m.badgeCls}`}>
            {m.label}
          </span>
        </div>
      </div>

      {/* Details list */}
      <div className="border-t border-orange-100 p-5 space-y-3">
        {[
          ["Age", `${patient.age} yrs`],
          ["Condition", patient.condition],
          ["Doctor", patient.doctor],
          ["Ward", patient.ward],
          ["Next Visit", patient.nextVisit],
          ["Location", patient.location],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between text-[13px]">
            <span className="text-orange-800/60 font-medium">{label}</span>
            <span className="text-gray-800 font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  VitalCard (icon above content)
// ─────────────────────────────────────────────────────────────────
function VitalCard({ icon, label, value, sub, color }: {
  icon: string; label: string; value: string; sub: string; color: string;
}) {
  return (
    <div className={`rounded-2xl p-3 sm:p-4 border ${color} flex flex-col items-center text-center gap-2`}>
      <span className="text-3xl sm:text-4xl">{icon}</span>
      <div>
        <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-orange-800/50">
          {label}
        </div>
        <div className="font-display text-xl sm:text-2xl font-extrabold text-gray-800 leading-tight">
          {value}
        </div>
        <div className="text-[10px] sm:text-[11px] text-orange-800/50 mt-0.5">
          {sub}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Responsive Appointments List
// ─────────────────────────────────────────────────────────────────
function ResponsiveAppointmentsList({ patient }: { patient: Patient }) {
  // Replace with your real appointments data
  const appointments = [
    { date: "Apr 10, 2026", time: "10:30 AM", type: "Follow-up", doctor: patient.doctor, location: "Clinic A" },
    { date: "Mar 25, 2026", time: "2:00 PM", type: "Lab Results", doctor: patient.doctor, location: "Lab B" },
    { date: "Mar 10, 2026", time: "9:00 AM", type: "Initial Consult", doctor: patient.doctor, location: "Clinic A" },
  ];

  return (
    <div className="space-y-4">
      {/* Mobile card view */}
      <div className="block md:hidden space-y-3">
        {appointments.map((apt, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-orange-100 p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="font-display font-bold text-gray-800">{apt.date}</span>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">{apt.time}</span>
            </div>
            <div className="text-sm text-gray-700"><span className="font-semibold">Type:</span> {apt.type}</div>
            <div className="text-sm text-gray-700"><span className="font-semibold">Doctor:</span> {apt.doctor}</div>
            <div className="text-sm text-gray-700"><span className="font-semibold">Location:</span> {apt.location}</div>
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl border border-orange-100">
          <thead className="bg-orange-50 text-orange-800/70 text-xs font-semibold">
            <tr><th className="px-5 py-3 text-left">Date</th><th className="px-5 py-3 text-left">Time</th><th className="px-5 py-3 text-left">Type</th><th className="px-5 py-3 text-left">Doctor</th><th className="px-5 py-3 text-left">Location</th></tr>
          </thead>
          <tbody>
            {appointments.map((apt, idx) => (
              <tr key={idx} className="border-t border-orange-50">
                <td className="px-5 py-3 text-sm text-gray-800">{apt.date}</td>
                <td className="px-5 py-3 text-sm text-gray-800">{apt.time}</td>
                <td className="px-5 py-3 text-sm text-gray-800">{apt.type}</td>
                <td className="px-5 py-3 text-sm text-gray-800">{apt.doctor}</td>
                <td className="px-5 py-3 text-sm text-gray-800">{apt.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Responsive Medical History
// ─────────────────────────────────────────────────────────────────
function ResponsiveMedicalHistory({ patient }: { patient: Patient }) {
  // Replace with your real history data
  const history = [
    { date: "Mar 15, 2026", diagnosis: patient.condition, notes: "Stable, continue treatment", doctor: patient.doctor },
    { date: "Feb 20, 2026", diagnosis: "Routine Check", notes: "Blood pressure normal", doctor: patient.doctor },
    { date: "Jan 10, 2026", diagnosis: "Initial Diagnosis", notes: "Prescribed medication", doctor: patient.doctor },
  ];

  return (
    <div className="space-y-4">
      {/* Mobile card view */}
      <div className="block md:hidden space-y-3">
        {history.map((rec, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-orange-100 p-4 shadow-sm">
            <div className="font-display font-bold text-gray-800 mb-1">{rec.date}</div>
            <div className="text-sm text-gray-700"><span className="font-semibold">Diagnosis:</span> {rec.diagnosis}</div>
            <div className="text-sm text-gray-700"><span className="font-semibold">Notes:</span> {rec.notes}</div>
            <div className="text-sm text-gray-700"><span className="font-semibold">Doctor:</span> {rec.doctor}</div>
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl border border-orange-100">
          <thead className="bg-orange-50 text-orange-800/70 text-xs font-semibold">
            <tr><th className="px-5 py-3 text-left">Date</th><th className="px-5 py-3 text-left">Diagnosis</th><th className="px-5 py-3 text-left">Notes</th><th className="px-5 py-3 text-left">Doctor</th></tr>
          </thead>
          <tbody>
            {history.map((rec, idx) => (
              <tr key={idx} className="border-t border-orange-50">
                <td className="px-5 py-3 text-sm text-gray-800">{rec.date}</td>
                <td className="px-5 py-3 text-sm text-gray-800">{rec.diagnosis}</td>
                <td className="px-5 py-3 text-sm text-gray-800">{rec.notes}</td>
                <td className="px-5 py-3 text-sm text-gray-800">{rec.doctor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Main PatientDetailsPage
// ─────────────────────────────────────────────────────────────────
interface PatientDetailsPageProps {
  patient: Patient;
  onBack: () => void;
}

type Tab = "overview" | "appointments" | "history";

export default function PatientDetailsPage({ patient, onBack }: PatientDetailsPageProps) {
  const [tab, setTab] = useState<Tab>("overview");
  const m = STATUS_META[patient.status];

  return (
    <AppLayout
      title={patient.name}
      activeItem="patients"
      breadcrumbs={[
        { label: "Patients", onClick: onBack },
        { label: patient.name },
      ]}
    >
      {/* Header – responsive stacking */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-3 sm:gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border border-[#e8c8a8] bg-white text-[#e85520] font-display text-[12px] sm:text-[13px] font-semibold transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500"
          >
            ← Back
          </button>
          <div>
            <h1 className="font-display text-lg sm:text-xl font-bold text-gray-800 break-words">{patient.name}</h1>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
              <span className="text-xs sm:text-sm text-orange-800/60">#{patient.id}</span>
              <span className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full ${m.badgeCls}`}>
                {m.label}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-xl border border-[#e8c8a8] bg-white text-[#e85520] font-display text-[12px] sm:text-[13px] font-semibold transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500">
            Edit Record
          </button>
          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-display text-[12px] sm:text-[13px] font-semibold transition-all hover:shadow-[0_6px_18px_rgba(232,85,32,.35)]">
            Schedule Appointment
          </button>
        </div>
      </div>

      {/* Tabs – always visible */}
      <div className="flex gap-1 bg-white border border-[#e8c8a8] rounded-xl p-1 w-fit mb-6">
        {(["overview", "appointments", "history"] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              "px-3 sm:px-5 py-1.5 sm:py-2 rounded-[9px] text-[11px] sm:text-[13px] font-semibold font-display capitalize transition-all duration-200",
              tab === t
                ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-[0_3px_10px_rgba(232,85,32,.25)]"
                : "text-orange-800/60 hover:text-orange-500",
            ].join(" ")}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === "overview" && (
        <div className="flex flex-col lg:grid lg:grid-cols-[300px_1fr] gap-6">
          <PatientProfile patient={patient} />
          <div className="flex flex-col gap-5">
            {/* Vitals – responsive grid */}
            <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
              <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-orange-100">
                <div className="font-display text-sm sm:text-base font-bold text-gray-800">Vitals</div>
                <div className="text-[11px] sm:text-xs text-orange-800/60 mt-0.5">Last recorded today</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5">
                <VitalCard icon="❤️" label="Heart Rate"  value="72 bpm"   sub="Normal"      color="border-red-100 bg-red-50/50"    />
                <VitalCard icon="🩸" label="Blood Press." value="118/76"  sub="Normal"      color="border-blue-100 bg-blue-50/50"  />
                <VitalCard icon="🌡️" label="Temperature"  value="98.6°F"  sub="Normal"      color="border-amber-100 bg-amber-50/50"/>
                <VitalCard icon="💨" label="SpO2"         value="98%"     sub="Normal"      color="border-green-100 bg-green-50/50"/>
              </div>
            </div>

            {/* Clinical Notes */}
            <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 border-b border-orange-100">
                <div>
                  <div className="font-display text-sm sm:text-base font-bold text-gray-800">Clinical Notes</div>
                  <div className="text-[11px] sm:text-xs text-orange-800/60 mt-0.5">Latest notes from {patient.doctor}</div>
                </div>
                <button className="text-[12px] sm:text-[13px] font-semibold text-orange-500 hover:text-orange-600 transition-colors whitespace-nowrap">
                  + Add Note
                </button>
              </div>
              <div className="p-4 sm:p-5 space-y-4">
                {[
                  { date: "Mar 15, 2026", note: `Patient presenting with ${patient.condition}. Vitals stable. Current treatment plan responding well. Continue monitoring and schedule follow-up in two weeks.` },
                  { date: "Feb 28, 2026", note: "Lab results reviewed. No significant changes. Patient reports improved energy levels and reduced symptoms. Medication adherence confirmed." },
                ].map((n, i) => (
                  <div key={i} className="p-3 sm:p-4 rounded-xl bg-orange-50/50 border border-orange-100">
                    <div className="text-[10px] sm:text-[11px] font-semibold text-orange-800/50 mb-1.5">📅 {n.date} · {patient.doctor}</div>
                    <p className="text-[12.5px] sm:text-[13.5px] text-gray-700 leading-relaxed break-words">{n.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointments Tab */}
      {tab === "appointments" && <ResponsiveAppointmentsList patient={patient} />}

      {/* History Tab */}
      {tab === "history" && <ResponsiveMedicalHistory patient={patient} />}
    </AppLayout>
  );
}