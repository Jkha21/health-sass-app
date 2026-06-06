"use client";

import React from "react";
import { LogoIcon } from "./LogoIcons";

const PanelIllustration = () => (
  <svg
    viewBox="0 0 520 500"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 w-full h-full"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="lsc-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffe8cc" /><stop offset="100%" stopColor="#ffb87a" />
      </linearGradient>
      <linearGradient id="lsc-h1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef8050" /><stop offset="100%" stopColor="#d85f2a" />
      </linearGradient>
      <linearGradient id="lsc-h2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e87050" /><stop offset="100%" stopColor="#c84e20" />
      </linearGradient>
      <linearGradient id="lsc-h3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f59060" /><stop offset="100%" stopColor="#df6030" />
      </linearGradient>
      <linearGradient id="lsc-h4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbaa70" /><stop offset="100%" stopColor="#ef7038" />
      </linearGradient>
      <radialGradient id="lsc-sunG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffd580" stopOpacity=".65" />
        <stop offset="100%" stopColor="#ffd580" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="520" height="500" fill="url(#lsc-sky)" />
    <circle cx="355" cy="115" r="85" fill="url(#lsc-sunG)" />
    <circle cx="355" cy="115" r="46" fill="#fdd87a" opacity=".88" />
    <g stroke="#b85820" strokeWidth="1.6" fill="none" strokeLinecap="round">
      <path d="M75 68 Q81 63 87 68" /><path d="M98 55 Q105 50 112 55" />
      <path d="M120 44 Q126 39 132 44" /><path d="M155 78 Q161 73 167 78" />
      <path d="M175 90 Q180 85 185 90" /><path d="M55 90 Q60 85 65 90" />
    </g>
    <path d="M0 265 Q90 160 210 205 Q310 238 415 172 Q460 152 520 185 L520 500 L0 500Z" fill="url(#lsc-h4)" opacity=".58" />
    <path d="M0 295 Q110 215 230 245 Q350 272 470 215 Q495 208 520 225 L520 500 L0 500Z" fill="url(#lsc-h3)" opacity=".72" />
    <path d="M0 328 Q130 265 258 295 Q378 320 520 270 L520 500 L0 500Z" fill="url(#lsc-h2)" opacity=".84" />
    <path d="M0 368 Q148 315 285 346 Q398 366 520 326 L520 500 L0 500Z" fill="url(#lsc-h1)" />
    <g transform="translate(248,-8)">
      <path d="M272 0 Q242 44 210 86 Q188 116 166 138" stroke="#5a2e10" strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <path d="M228 52 Q206 64 190 80" stroke="#5a2e10" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M200 94 Q178 100 162 112" stroke="#5a2e10" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      {[
        { tx: 188, ty: 62,  r: -22, s: 1.25, c: "#e8511a" },
        { tx: 178, ty: 78,  r:  18, s: 1.05, c: "#d44015" },
        { tx: 162, ty: 93,  r: -38, s: 0.92, c: "#f06022" },
        { tx: 198, ty: 80,  r:  28, s: 1.12, c: "#c83010" },
        { tx: 213, ty: 57,  r: -12, s: 1.35, c: "#e96018" },
        { tx: 167, ty: 111, r:  42, s: 0.82, c: "#f07030" },
        { tx: 182, ty: 98,  r: -28, s: 1.02, c: "#dc4818" },
        { tx: 203, ty: 103, r:  12, s: 1.18, c: "#e55012" },
      ].map(({ tx, ty, r, s, c }, i) => (
        <g key={i} transform={`translate(${tx},${ty}) rotate(${r}) scale(${s})`}>
          <path d="M0-15 C2-11 8-9 6-5 C11-5 13-1 9 2 C11 6 9 9 5 7 C3 10 0 11 0 11 C0 11-3 10-5 7 C-9 9-11 6-9 2 C-13-1-11-5-6-5 C-8-9-2-11 0-15Z" fill={c} opacity=".93" />
        </g>
      ))}
      {[
        { tx: 105, ty: 155, r:  18, c: "#e8511a" },
        { tx: 136, ty: 195, r: -32, c: "#f06022" },
        { tx:  82, ty: 228, r:  47, c: "#d44015" },
        { tx: 155, ty: 258, r: -12, c: "#c83010" },
      ].map(({ tx, ty, r, c }, i) => (
        <g key={i} transform={`translate(${tx},${ty}) rotate(${r}) scale(.7)`}>
          <path d="M0-11 C1-8 5-6 4-3 C8-3 9-1 7 1 C8 4 6 6 3 5 C2 7 0 8 0 8 C0 8-2 7-3 5 C-6 6-8 4-7 1 C-9-1-8-3-4-3 C-5-6-1-8 0-11Z" fill={c} opacity=".82" />
        </g>
      ))}
    </g>
  </svg>
);

export default function LoginPanel() {
  return (
    <div
      role="complementary"
      aria-label="Salford & Co. branding"
      className={[
        "relative flex flex-col overflow-hidden",
        "bg-gradient-to-br from-[#ffd09a] via-[#f68540] to-[#e85520]",
        "max-h-[200px] rounded-b-[28px]",
        "md:max-h-none md:min-h-0 md:self-stretch",
        "md:rounded-none md:rounded-r-[36px]",
      ].join(" ")}
    >
      {/* ── Top row: logo left, spacer right ── */}
      <div className="relative z-[3] shrink-0 flex items-center justify-between px-5 pt-5 pb-2 md:px-8 md:pt-7 md:pb-4">
        {/* Logo — always top-left */}
        <div className="flex items-center gap-2.5">
          <LogoIcon />
          <span className="font-display font-bold text-white/95 tracking-[1.3px] text-[13px] md:text-[clamp(12px,1.1vw,15px)]">
            SALFORD &amp; CO.
          </span>
        </div>
      </div>

      {/* ── Illustration — desktop only, fills middle ── */}
      <div aria-hidden="true" className="hidden md:block flex-1 relative min-h-0 overflow-hidden">
        <PanelIllustration />
      </div>

      {/* ── Bottom row: headline right-aligned ── */}
      <div
        className={[
          "relative z-[3] shrink-0 flex justify-end",
          "md:bg-gradient-to-t md:from-[rgba(175,38,0,.75)] md:to-transparent",
          "px-5 pb-5 md:px-9 md:pb-9 md:pt-8",
        ].join(" ")}
      >
        <div className="text-right">
          <p className="text-white/75 mb-1 text-[11px] md:text-[clamp(11px,1vw,13px)]">
            Your Digital Record
          </p>
          <h2 className="font-display font-extrabold text-white leading-tight tracking-tight flex flex-col items-end gap-1 md:gap-1.5 text-[20px] md:text-[clamp(20px,2.8vw,36px)]">
            <span>Smart Health for</span>
            <span className="flex items-center gap-2 md:gap-3">
              <span className="inline-flex items-center justify-center rounded-full bg-white/20 border border-white/45 shrink-0 w-8 h-8 md:w-[clamp(34px,3.2vw,46px)] md:h-[clamp(34px,3.2vw,46px)]">
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 14L14 4M14 4H7M14 4V11" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Smarter Work
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}