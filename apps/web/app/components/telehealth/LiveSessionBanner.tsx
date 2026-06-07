import { VideoSvg } from "./icons";
import type { TelehealthSession } from "./types";

interface LiveSessionBannerProps {
  session: TelehealthSession;
  onJoin: () => void;
}

export function LiveSessionBanner({ session, onJoin }: LiveSessionBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-green-400 p-5 mb-6">
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-white/25 flex items-center justify-center font-display text-lg font-bold text-white">
              {session.initials}
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-white border-2 border-emerald-500 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-emerald-600 animate-pulse">● LIVE</span>
              <span className="text-[12px] text-white/70">Session in progress</span>
            </div>
            <p className="font-display text-[16px] font-extrabold text-white leading-snug">{session.patient}</p>
            <p className="text-[12px] text-white/70">{session.specialty} · {session.sessionType === "video" ? "Video" : "Audio"} Call</p>
          </div>
        </div>
        <button
          onClick={onJoin}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-600 font-display text-[13px] font-bold hover:bg-emerald-50 transition-all hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(255,255,255,.3)]"
        >
          <VideoSvg size={14} /> Join Now
        </button>
      </div>
      <span className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/[.07]" />
      <span className="pointer-events-none absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/[.05]" />
    </div>
  );
}