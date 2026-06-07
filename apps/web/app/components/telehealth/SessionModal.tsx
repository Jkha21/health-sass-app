import { VideoSvg, PhoneSvg, RecordSvg } from "./icons";
import { STATUS_META, SESSION_TYPE_META, CONSULT_META } from "./constants";
import { StarRating } from "./StarRating";
import type { TelehealthSession } from "./types";

interface SessionModalProps {
  session: TelehealthSession;
  onClose: () => void;
  onJoin: (s: TelehealthSession) => void;
}

export function SessionModal({ session, onClose, onJoin }: SessionModalProps) {
  const s = STATUS_META[session.status];
  const st = SESSION_TYPE_META[session.sessionType];
  const c = CONSULT_META[session.consultType];
  const isLive = session.status === "live";
  const isScheduled = session.status === "scheduled";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div
        className="relative z-10 w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden shrink-0">
          <div className="w-10 h-1 rounded-full bg-orange-200" />
        </div>

        {/* Header */}
        <div className={`px-6 py-5 shrink-0 ${isLive
          ? "bg-gradient-to-r from-emerald-500 to-green-400"
          : "bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300"
        }`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-white/25 flex items-center justify-center text-2xl border border-white/30 shrink-0 ${st.bg.replace("bg-", "").replace("border-", "")}`}>
                {st.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[12px] font-bold text-white/70">#{session.id}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white">{c.label}</span>
                  {isLive && <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white text-emerald-600 animate-pulse">● LIVE</span>}
                </div>
                <p className="font-display text-[16px] font-extrabold text-white leading-snug">{session.reason}</p>
                <p className="text-[12px] text-white/70 mt-0.5">{st.label} · {session.specialty}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-xl hover:bg-white/30 shrink-0">×</button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

          {/* Live alert */}
          {isLive && (
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 animate-pulse">
              <span className="text-lg">🟢</span>
              <div>
                <p className="font-display text-[13px] font-bold text-emerald-700">Session In Progress</p>
                <p className="text-[12px] text-emerald-600">Connected {session.waitTime} min ago</p>
              </div>
              <button onClick={() => { onClose(); onJoin(session); }} className="ml-auto px-3.5 py-1.5 rounded-lg bg-emerald-500 text-white text-[12px] font-bold font-display whitespace-nowrap">
                Join Now
              </button>
            </div>
          )}

          {/* Patient + doctor row */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-[14px] font-bold text-white">
                {session.initials}
              </div>
              <div>
                <p className="font-semibold text-[14.5px] text-gray-800">{session.patient}
                  <span className="text-[11.5px] text-orange-800/40 ml-2">{session.age}y</span>
                </p>
                <p className="text-[11px] text-orange-800/50">{session.doctor}</p>
              </div>
            </div>
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${s.badgeCls}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${s.dotCls} ${isLive ? "animate-pulse" : ""}`}/>
              {s.label}
            </span>
          </div>

          {/* Detail grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "Date", value: new Date(session.date + "T00:00:00").toLocaleDateString("en", { weekday:"short", day:"numeric", month:"long", year:"numeric" }) },
              { label: "Time", value: `${session.time} · ${session.duration} min` },
              { label: "Type", value: st.label },
              { label: "Platform", value: session.platform },
              { label: "Session", value: `#${session.id}` },
              { label: "Patient", value: `#${session.patientId}` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-orange-50/70 rounded-xl px-3.5 py-2.5">
                <p className="text-[10px] text-orange-800/50 font-semibold uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-[12.5px] text-gray-800 font-semibold leading-snug">{value}</p>
              </div>
            ))}
          </div>

          {/* Rating */}
          {session.rating && (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <StarRating rating={session.rating} />
              <span className="text-[13px] font-semibold text-amber-700">{session.rating}/5 Patient Rating</span>
            </div>
          )}

          {/* Notes */}
          {session.notes && (
            <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5">
              <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1.5">Session Notes</p>
              <p className="text-[13px] text-gray-700 leading-relaxed">{session.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2.5 pt-1 pb-2">
            {isLive && (
              <button
                onClick={() => { onClose(); onJoin(session); }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-400 text-white font-display text-[13px] font-bold hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(34,197,94,.4)] transition-all"
              >
                <VideoSvg size={14} /> Join Session
              </button>
            )}
            {isScheduled && (
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 text-white font-display text-[13px] font-semibold hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(59,130,246,.4)] transition-all">
                <VideoSvg size={14} /> Start Session
              </button>
            )}
            {session.recordingUrl && (
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-orange-200 bg-orange-50 text-orange-500 font-display text-[13px] font-semibold hover:bg-orange-500 hover:text-white transition-all">
                <RecordSvg /> Recording
              </button>
            )}
            {!isLive && !isScheduled && !session.recordingUrl && (
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-orange-200 bg-orange-50 text-orange-500 font-display text-[13px] font-semibold hover:bg-orange-500 hover:text-white transition-all">
                <PhoneSvg /> Re-book
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}