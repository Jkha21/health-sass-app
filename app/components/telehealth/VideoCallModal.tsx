import { useState } from "react";
import { VideoSvg, MicSvg, MicOffSvg, VideoOffSvg, EndCallSvg } from "./icons";
import type { TelehealthSession } from "./types";

interface VideoCallModalProps {
  session: TelehealthSession;
  onClose: () => void;
}

export function VideoCallModal({ session, onClose }: VideoCallModalProps) {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [elapsed, setElapsed] = useState("08:42");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full sm:max-w-2xl h-full sm:h-auto bg-[#0f1923] rounded-none sm:rounded-3xl overflow-hidden flex flex-col"
        style={{ maxHeight: "90vh", minHeight: 420 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Call header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center font-display text-[13px] font-bold text-white">
                {session.initials}
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0f1923]" />
            </div>
            <div>
              <p className="font-display text-[14px] font-bold text-white">{session.patient}</p>
              <p className="text-[11px] text-white/50">{session.specialty} · {session.sessionType === "video" ? "Video" : "Audio"} Call</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold text-emerald-400">{elapsed}</span>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-lg hover:bg-white/20">×</button>
          </div>
        </div>

        {/* Video area */}
        <div className="relative flex-1 bg-[#1a2535] flex items-center justify-center" style={{ minHeight: 220 }}>
          {/* Main video placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-200/20 to-orange-400/20 border border-orange-400/20 flex items-center justify-center font-display text-4xl font-extrabold text-orange-300/60 mx-auto mb-3">
                {session.initials}
              </div>
              <p className="text-white/40 text-sm">Patient camera loading…</p>
            </div>
          </div>

          {/* Self-view PiP */}
          <div className="absolute bottom-4 right-4 w-24 sm:w-32 h-16 sm:h-20 rounded-xl bg-[#0f1923] border-2 border-white/20 flex items-center justify-center shadow-xl overflow-hidden">
            <div className="text-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center font-display text-[10px] font-bold text-white mx-auto mb-1">
                You
              </div>
              <p className="text-white/30 text-[9px]">Doctor</p>
            </div>
          </div>

          {/* Signal strength */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 rounded-lg px-2.5 py-1.5">
            <div className="flex items-end gap-0.5">
              {[3,5,7,9].map((h,i) => (
                <div key={i} className={`w-1 rounded-sm ${i < 3 ? "bg-emerald-400" : "bg-white/20"}`} style={{ height: h }} />
              ))}
            </div>
            <span className="text-[10px] text-white/60">Good</span>
          </div>
        </div>

        {/* Controls */}
        <div className="px-5 py-4 bg-[#0f1923] border-t border-white/10">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {/* Mic */}
            <button
              onClick={() => setMicOn(v => !v)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                micOn ? "bg-white/10 text-white hover:bg-white/20" : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {micOn ? <MicSvg /> : <MicOffSvg />}
            </button>

            {/* Camera */}
            <button
              onClick={() => setCamOn(v => !v)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                camOn ? "bg-white/10 text-white hover:bg-white/20" : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {camOn ? <VideoSvg size={16} /> : <VideoOffSvg />}
            </button>

            {/* End call */}
            <button
              onClick={onClose}
              className="w-14 h-14 rounded-2xl bg-red-500 text-white flex items-center justify-center transition-all hover:bg-red-600 hover:scale-105 shadow-[0_4px_20px_rgba(239,68,68,.5)]"
            >
              <EndCallSvg />
            </button>

            {/* Chat */}
            <button className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </button>

            {/* Notes */}
            <button className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
          </div>

          {/* Labels */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2">
            {["Mic", "Camera", "End", "Chat", "Notes"].map((label, i) => (
              <span key={i} className={`text-[9px] text-white/30 w-12 text-center ${i === 2 ? "w-14" : ""}`}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}