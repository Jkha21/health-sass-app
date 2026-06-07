import { VideoSvg, PhoneSvg, RecordSvg } from "./icons";
import { STATUS_META, SESSION_TYPE_META } from "./constants";
import type { TelehealthSession } from "./types";

interface SessionCardProps {
  session: TelehealthSession;
  idx: number;
  onSelect: (session: TelehealthSession) => void;
  onJoin: (session: TelehealthSession) => void;
}

export function SessionCard({ session, idx, onSelect, onJoin }: SessionCardProps) {
  const s = STATUS_META[session.status];
  const st = SESSION_TYPE_META[session.sessionType];
  const isLive = session.status === "live";
  const isScheduled = session.status === "scheduled";

  return (
    <div className="bg-white rounded-2xl border border-orange-900/[.06] shadow-[0_8px_32px_rgba(232,85,32,.08)] p-5 hover:shadow-[0_12px_40px_rgba(232,85,32,.12)] transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-[14px] font-bold text-white ${isLive ? "ring-2 ring-emerald-400 ring-offset-2" : ""}`}>
              {session.initials}
            </div>
            {isLive && (
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[12px] text-orange-800/40 font-semibold">#{session.id}</span>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${s.badgeCls}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dotCls} ${isLive ? "animate-pulse" : ""}`}/>
                    {s.label}
                  </span>
                </div>
                <h3 className="font-display text-[16px] font-bold text-gray-800 leading-snug mb-1 truncate">{session.patient}</h3>
                <p className="text-[13px] text-orange-800/60 mb-1">{session.doctor} · {session.specialty}</p>
                <p className="text-[13px] text-gray-700 leading-relaxed line-clamp-2">{session.reason}</p>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-[12px] text-orange-800/50 mb-3">
              <span>{session.date} at {session.time}</span>
              <span>{session.duration} min</span>
              <span className="flex items-center gap-1">
                <span className="text-sm">{st.icon}</span>
                {st.label}
              </span>
            </div>

            {/* Rating */}
            {session.rating && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill={star <= session.rating! ? "#f59e0b" : "#d1d5db"}
                      stroke="none"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-[11px] text-amber-700 font-semibold">{session.rating}/5</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 shrink-0">
          {isLive && (
            <button
              onClick={() => onJoin(session)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 text-[11.5px] font-semibold transition-all hover:bg-emerald-500 hover:text-white hover:border-emerald-500"
            >
              <VideoSvg size={12} /> Start
            </button>
          )}
          {isScheduled && (
            <>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 text-[11.5px] font-semibold transition-all hover:bg-blue-500 hover:text-white hover:border-blue-500">
                <VideoSvg size={12} /> Start
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fdf3ec] border border-[#e8c8a8] text-orange-500 text-[11.5px] font-semibold transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500">
                Reschedule
              </button>
            </>
          )}
          {session.status === "missed" && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-500 text-[11.5px] font-semibold transition-all hover:bg-orange-500 hover:text-white">
              Re-book
            </button>
          )}
          <button
            onClick={() => onSelect(session)}
            className="w-8 h-8 rounded-lg bg-[#fdf3ec] border border-[#e8c8a8] flex items-center justify-center text-sm text-orange-500 transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}