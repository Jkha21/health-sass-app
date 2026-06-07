"use client";

import React, { useState, useMemo } from "react";
import AppLayout from "../components/common/AppLayout";
import { Appointment, AppointmentStatus, ViewMode } from "../types/appointments";
import { AppointmentCard, CalendarWeekView, AppointmentModal, SearchSvg, CalSvg, ListSvgIcon, ChevLeft, ChevRight, PlusSvg } from "../components/appointments";
import { APPOINTMENTS } from "../lib/appointmentsData";
import { TODAY, groupByDate, formatDate, getWeekDays } from "../lib/appointmentsUtils";


export default function AppointmentsPage() {
  const [view,          setView]          = useState<ViewMode>("list");
  const [searchQ,       setSearchQ]       = useState("");
  const [statusFilter,  setStatusFilter]  = useState<AppointmentStatus | "all">("all");
  const [weekAnchor,    setWeekAnchor]    = useState(TODAY);
  const [selected,      setSelected]      = useState<Appointment | null>(null);

  /* Stats */
  const todayAppts     = APPOINTMENTS.filter(a => a.date === TODAY);
  const confirmedToday = todayAppts.filter(a => a.status === "confirmed").length;
  const pendingCount   = APPOINTMENTS.filter(a => a.status === "pending").length;
  const totalThisWeek  = APPOINTMENTS.length;

  /* Filtered list */
  const filtered = useMemo(() => {
    const q = searchQ.toLowerCase().trim();
    return APPOINTMENTS.filter(a => {
      const matchQ = !q ||
        a.patient.toLowerCase().includes(q) ||
        a.doctor.toLowerCase().includes(q)  ||
        a.id.toLowerCase().includes(q)      ||
        a.type.toLowerCase().includes(q)    ||
        a.specialty.toLowerCase().includes(q);
      const matchS = statusFilter === "all" || a.status === statusFilter;
      return matchQ && matchS;
    }).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  }, [searchQ, statusFilter]);

  const grouped   = useMemo(() => groupByDate(filtered), [filtered]);
  const weekDays  = useMemo(() => getWeekDays(weekAnchor), [weekAnchor]);
  const sortedDates = Object.keys(grouped).sort();

  /* Week nav */
  const shiftWeek = (dir: 1 | -1) => {
    const d = new Date(weekAnchor + "T00:00:00");
    d.setDate(d.getDate() + dir * 7);
    setWeekAnchor(d.toISOString().split("T")[0]);
  };

  return (
    <AppLayout
      title="Appointments"
      activeItem="appointments"
      breadcrumbs={[{ label: "Dashboard" }, { label: "Appointments" }]}
    >

      {/* ══ Hero ════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-6 sm:px-8 py-6 sm:py-7 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/[.07]" />
        <div className="relative z-10">
          <h1 className="font-display text-2xl sm:text-[26px] font-extrabold text-white leading-tight mb-1">
            Appointments
          </h1>
          <p className="text-sm text-white/75">
            {todayAppts.length} scheduled today · {pendingCount} pending confirmation
          </p>
        </div>

        {/* Stat badges */}
        <div className="relative z-10 flex gap-2.5 flex-wrap">
          {[
            { num: todayAppts.length,  label: "Today",     col: "text-white" },
            { num: confirmedToday,     label: "Confirmed",  col: "text-white" },
            { num: pendingCount,       label: "Pending",    col: "text-white" },
            { num: totalThisWeek,      label: "This Week",  col: "text-white" },
          ].map(({ num, label }) => (
            <div key={label} className="rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm px-3.5 py-2 text-center min-w-[64px]">
              <div className="font-display text-xl sm:text-2xl font-extrabold text-white leading-none">{num}</div>
              <div className="text-[10px] text-white/70 mt-0.5 whitespace-nowrap">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ Toolbar ═════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 bg-white rounded-2xl border border-orange-900/[.06] shadow-[0_8px_32px_rgba(232,85,32,.08)] px-4 sm:px-5 py-3.5 mb-5">

        {/* Search */}
        <div className="flex items-center gap-2 bg-[#fdf8f2] border border-[#e8c8a8] rounded-xl px-3.5 py-2.5 flex-1 min-w-0 transition-all focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10">
          <SearchSvg />
          <input
            type="text"
            placeholder="Search patient, doctor, type…"
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            className="bg-transparent border-none outline-none text-[13.5px] text-gray-800 placeholder:text-[#c8a888] w-full"
          />
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as AppointmentStatus | "all")}
            className="px-3.5 py-2.5 border border-[#e8c8a8] rounded-xl bg-white text-[13.5px] text-gray-800 outline-none cursor-pointer focus:border-orange-500 transition-colors flex-1 sm:flex-none"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Count */}
          <span className="text-[13px] text-orange-800/50 font-medium whitespace-nowrap hidden sm:block">
            {filtered.length} appt{filtered.length !== 1 ? "s" : ""}
          </span>

          {/* View toggle */}
          <div className="flex items-center bg-[#fdf8f2] border border-[#e8c8a8] rounded-[10px] p-0.5">
            {(["list", "calendar"] as ViewMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setView(mode)}
                className={[
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12.5px] font-semibold font-display capitalize transition-all duration-200",
                  view === mode
                    ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-[0_3px_10px_rgba(232,85,32,.30)]"
                    : "text-orange-800/50 hover:text-orange-500",
                ].join(" ")}
              >
                {mode === "list" ? <ListSvgIcon active={view === "list"} /> : <CalSvg active={view === "calendar"} />}
                <span className="hidden sm:inline">{mode === "list" ? "List" : "Calendar"}</span>
              </button>
            ))}
          </div>

          {/* Add appointment */}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-display text-[13px] font-semibold transition-all hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(232,85,32,.35)] whitespace-nowrap">
            <PlusSvg /><span className="hidden xs:inline">New</span><span className="xs:hidden hidden sm:inline">Appointment</span><span className="sm:hidden">+</span>
          </button>
        </div>
      </div>

      {/* ══ Calendar week nav ════════════════════════════════ */}
      {view === "calendar" && (
        <div className="flex items-center justify-between mb-4 px-1">
          <button
            onClick={() => shiftWeek(-1)}
            className="w-8 h-8 rounded-xl border border-[#e8c8a8] bg-white flex items-center justify-center text-orange-500 transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500"
          >
            <ChevLeft />
          </button>
          <span className="font-display text-[14px] font-bold text-gray-700">
            {new Date(weekDays[0] + "T00:00:00").toLocaleDateString("en", { month: "short", day: "numeric" })}
            {" – "}
            {new Date(weekDays[6] + "T00:00:00").toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          <button
            onClick={() => shiftWeek(1)}
            className="w-8 h-8 rounded-xl border border-[#e8c8a8] bg-white flex items-center justify-center text-orange-500 transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500"
          >
            <ChevRight />
          </button>
        </div>
      )}

      {/* ══ Calendar view ════════════════════════════════════ */}
      {view === "calendar" && (
        <CalendarWeekView
          weekDays={weekDays}
          grouped={groupByDate(filtered)}
          onSelect={setSelected}
        />
      )}

      {/* ══ List view ════════════════════════════════════════ */}
      {view === "list" && (
        <>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-[#e8c8a8]">
              <div className="text-5xl mb-4">📅</div>
              <div className="font-display text-lg font-bold text-gray-800 mb-1">No appointments found</div>
              <div className="text-sm text-orange-800/50">Try adjusting your search or filter</div>
            </div>
          )}

          {sortedDates.map(date => (
            <div key={date} className="mb-6">
              {/* Date group header */}
              <div className="flex items-center gap-3 mb-3 px-1">
                <span className="font-display text-[15px] font-bold text-gray-800">{formatDate(date)}</span>
                <span className="text-[12px] text-orange-800/50 font-medium">
                  {new Date(date + "T00:00:00").toLocaleDateString("en", { weekday: "long", month: "short", day: "numeric" })}
                </span>
                <div className="flex-1 h-px bg-orange-100" />
                <span className="text-[12px] font-semibold text-orange-400 bg-orange-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {grouped[date].length} appt{grouped[date].length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Cards */}
              {grouped[date].map((appt, i) => (
                <AppointmentCard
                  key={appt.id}
                  appt={appt}
                  idx={i}
                  onSelect={setSelected}
                />
              ))}
            </div>
          ))}
        </>
      )}

      {/* ══ Detail modal ════════════════════════════════════ */}
      {selected && (
        <AppointmentModal
          appt={selected}
          onClose={() => setSelected(null)}
        />
      )}

    </AppLayout>
  );
}