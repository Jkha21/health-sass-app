"use client";

import { useState, useMemo } from "react";
import AppLayout from "@/app/components/common/AppLayout";
import {
  SESSIONS,
  TODAY,
  STATUS_META,
  SESSION_TYPE_META,
  SearchSvg,
  VideoSvg,
  PhoneSvg,
  PlusSvg,
  LiveSessionBanner,
  SessionCard,
  VideoCallModal,
  SessionModal,
  type TelehealthSession,
  type SessionStatus,
  type SessionType,
} from "@/app/components/telehealth";

/* ─── TelehealthPage ─────────────────────────────────────── */
export default function TelehealthPage() {
  const [searchQ, setSearchQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<SessionStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<SessionType | "all">("all");
  const [selected, setSelected] = useState<TelehealthSession | null>(null);
  const [inCall, setInCall] = useState<TelehealthSession | null>(null);

  // Live session
  const liveSession = SESSIONS.find((s) => s.status === "live");

  // Stats
  const todayCount = SESSIONS.filter((s) => s.date === TODAY).length;
  const scheduledCount = SESSIONS.filter((s) => s.status === "scheduled").length;
  const completedCount = SESSIONS.filter((s) => s.status === "completed").length;
  const avgRating = Number(
    (SESSIONS.filter((s) => s.rating).reduce((a, s) => a + (s.rating ?? 0), 0) /
      SESSIONS.filter((s) => s.rating).length).toFixed(1)
  );

  // Filtered + sorted
  const filtered = useMemo(() => {
    const q = searchQ.toLowerCase().trim();
    return SESSIONS.filter((s) => {
      const matchQ =
        !q ||
        s.patient.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.doctor.toLowerCase().includes(q) ||
        s.reason.toLowerCase().includes(q) ||
        s.specialty.toLowerCase().includes(q);
      const matchS = statusFilter === "all" || s.status === statusFilter;
      const matchT = typeFilter === "all" || s.sessionType === typeFilter;
      return matchQ && matchS && matchT;
    }).sort((a, b) => {
      const order = { live: 0, scheduled: 1, missed: 2, completed: 3, cancelled: 4 };
      if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
      return (a.date + a.time).localeCompare(b.date + b.time);
    });
  }, [searchQ, statusFilter, typeFilter]);

  return (
    <AppLayout
      title="Telehealth"
      activeItem="telehealth"
      breadcrumbs={[{ label: "Dashboard" }, { label: "Telehealth" }]}
    >
      {/* ══ Hero ════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-6 sm:px-8 py-6 sm:py-7 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white/[.07]" />
        <div className="relative z-10">
          <h1 className="font-display text-2xl sm:text-[26px] font-extrabold text-white leading-tight mb-1">
            Telehealth
          </h1>
          <p className="text-sm text-white/75">
            {liveSession ? "1 session live now · " : ""}
            {scheduledCount} scheduled · {todayCount} today
          </p>
        </div>
        <div className="relative z-10 flex gap-2.5 flex-wrap">
          {[
            { num: todayCount, label: "Today" },
            { num: scheduledCount, label: "Scheduled" },
            { num: completedCount, label: "Completed" },
            { num: avgRating, label: "Avg Rating" },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 text-center min-w-[60px]"
            >
              <div className="font-display text-xl sm:text-2xl font-extrabold text-white leading-none">
                {num}
              </div>
              <div className="text-[9.5px] sm:text-[10px] text-white/70 mt-0.5 whitespace-nowrap">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ Live session banner ═════════════════════════════ */}
      {liveSession && (
        <LiveSessionBanner
          session={liveSession}
          onJoin={() => setInCall(liveSession)}
        />
      )}

      {/* ══ Status filter tabs ══════════════════════════════ */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1 scrollbar-none">
        {([
          ["all", "All Sessions", SESSIONS.length],
          ["live", "Live", SESSIONS.filter((s) => s.status === "live").length],
          ["scheduled", "Scheduled", scheduledCount],
          ["completed", "Completed", completedCount],
          ["missed", "Missed", SESSIONS.filter((s) => s.status === "missed").length],
          ["cancelled", "Cancelled", SESSIONS.filter((s) => s.status === "cancelled").length],
        ] as [SessionStatus | "all", string, number][]).map(([val, label, count]) => (
          <button
            key={val}
            onClick={() => setStatusFilter(val)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-semibold whitespace-nowrap border transition-all shrink-0
              ${statusFilter === val
                ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white border-orange-500 shadow-[0_3px_10px_rgba(232,85,32,.25)]"
                : "bg-white border-[#e8c8a8] text-orange-800/60 hover:border-orange-400"}`}
          >
            {val !== "all" &&
              val !== "scheduled" &&
              val !== "completed" &&
              val !== "cancelled" && (
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  STATUS_META[val as SessionStatus].dotCls
                } ${val === "live" ? "animate-pulse" : ""}`}
              />
            )}
            {label}
            {count > 0 && (
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  statusFilter === val ? "bg-white/20" : "bg-orange-50"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ══ Toolbar ═════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-orange-900/[.06] shadow-[0_8px_32px_rgba(232,85,32,.08)] px-4 sm:px-5 py-3.5 mb-5">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Search */}
          <div className="flex items-center gap-2 bg-[#fdf8f2] border border-[#e8c8a8] rounded-xl px-3.5 py-2.5 flex-1 min-w-[160px] transition-all focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10">
            <SearchSvg />
            <input
              type="text"
              placeholder="Search patient, doctor, reason…"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              className="bg-transparent border-none outline-none text-[13.5px] text-gray-800 placeholder:text-[#c8a888] w-full"
            />
          </div>

          {/* Session type filter */}
          <div className="flex items-center bg-[#fdf8f2] border border-[#e8c8a8] rounded-[10px] p-0.5">
            {(
              [["all", "All"], ["video", "📹"], ["audio", "🎙️"], ["chat", "💬"]] as [
                SessionType | "all",
                string
              ][]
            ).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setTypeFilter(val)}
                className={`px-3 py-1.5 rounded-[8px] text-[12.5px] font-semibold transition-all duration-200
                  ${typeFilter === val
                    ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-[0_3px_10px_rgba(232,85,32,.30)]"
                    : "text-orange-800/50 hover:text-orange-500"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <span className="text-[13px] text-orange-800/50 font-medium whitespace-nowrap hidden sm:block">
            {filtered.length} session{filtered.length !== 1 ? "s" : ""}
          </span>

          {/* New session */}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-display text-[13px] font-semibold transition-all hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(232,85,32,.35)] whitespace-nowrap ml-auto">
            <PlusSvg />
            <span className="hidden sm:inline">New Session</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      {/* ══ Empty state ════════════════════════════════════ */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-[#e8c8a8]">
          <div className="text-5xl mb-4">📹</div>
          <div className="font-display text-lg font-bold text-gray-800 mb-1">
            No sessions found
          </div>
          <div className="text-sm text-orange-800/50">
            Adjust your search or filter
          </div>
        </div>
      )}

      {/* ══ Session cards ══════════════════════════════════ */}
      <div className="space-y-4">
        {filtered.map((session, i) => (
          <SessionCard
            key={session.id}
            session={session}
            idx={i}
            onSelect={setSelected}
            onJoin={(s) => setInCall(s)}
          />
        ))}
      </div>

      {/* ══ Detail modal ═══════════════════════════════════ */}
      {selected && !inCall && (
        <SessionModal
          session={selected}
          onClose={() => setSelected(null)}
          onJoin={(s) => {
            setSelected(null);
            setInCall(s);
          }}
        />
      )}

      {/* ══ Video call modal ═══════════════════════════════ */}
      {inCall && (
        <VideoCallModal session={inCall} onClose={() => setInCall(null)} />
      )}
    </AppLayout>
  );
}