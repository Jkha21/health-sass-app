"use client";

import React, { useState, useEffect, useRef } from "react";

interface LeafData {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function LeftIllustration() {
  const [leaves, setLeaves] = useState<LeafData[]>([]);
  const leafIdCounter = useRef<number>(0);
  const leafColors = ["#c84018", "#d85030", "#e07040", "#b82808", "#d04828"];

  useEffect(() => {
    const generateLeaf = () => {
      const id = leafIdCounter.current++;
      const newLeaf: LeafData = {
        id,
        left: Math.random() * 92,
        size: 9 + Math.random() * 13,
        duration: 7 + Math.random() * 6,
        delay: Math.random() * 2,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
      };

      setLeaves((prev) => [...prev, newLeaf]);

      setTimeout(() => {
        setLeaves((prev) => prev.filter((leaf) => leaf.id !== id));
      }, (newLeaf.duration + newLeaf.delay) * 1000 + 400);
    };

    // Instantiate baseline depth leaves
    for (let i = 0; i < 14; i++) {
      generateLeaf();
    }

    const leafInterval = setInterval(generateLeaf, 1100);
    return () => clearInterval(leafInterval);
  }, []);

  return (
    <div className="relative h-[48vh] min-h-[270px] max-h-[380px] w-full shrink-0 overflow-hidden before:absolute before:bottom-0 before:left-0 before:right-0 before:z-[19] before:h-[120px] before:pointer-events-none before:bg-gradient-to-b before:from-transparent before:via-[#0b0705]/50 before:to-[#0b0705] md:h-full md:max-h-none md:min-h-0 md:w-[48%] md:rounded-r-[26px] md:before:content-none">
      <svg className="absolute inset-0 block h-full w-full" viewBox="0 0 700 860" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fad6a0" />
            <stop offset="35%" stopColor="#f5aa74" />
            <stop offset="75%" stopColor="#e87848" />
            <stop offset="100%" stopColor="#d46030" />
          </linearGradient>
          <linearGradient id="h1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f2a268" /><stop offset="100%" stopColor="#d86040" /></linearGradient>
          <linearGradient id="h2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e07448" /><stop offset="100%" stopColor="#c85028" /></linearGradient>
          <linearGradient id="h3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#cc5c2e" /><stop offset="100%" stopColor="#a83e18" /></linearGradient>
        </defs>

        <rect width="700" height="860" fill="url(#sky)" />
        <circle cx="400" cy="178" r="72" fill="#f5c840" opacity=".85" />

        {/* Dynamic Vector Details */}
        <g stroke="#b84020" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M68 106 Q80 96 92 106" />
          <path d="M118 88 Q132 78 146 88" />
        </g>

        {/* Structural Background Tree */}
        <path d="M555 208 Q550 280 546 370 Q544 430 548 490" stroke="#3a1800" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d="M550 290 Q510 248 478 224" stroke="#3a1800" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M548 340 Q598 294 636 262" stroke="#3a1800" strokeWidth="8" fill="none" strokeLinecap="round" />

        {/* Tree Foliage Clusters */}
        <ellipse cx="478" cy="216" rx="44" ry="34" fill="#c84018" opacity=".92" transform="rotate(-18,478,216)" />
        <ellipse cx="520" cy="192" rx="40" ry="30" fill="#d85028" opacity=".88" transform="rotate(8,520,192)" />

        {/* Horizon Landscape Curves */}
        <path d="M-10 490 Q90 408 220 448 Q348 488 460 415 Q540 360 700 402 L700 860 L-10 860Z" fill="url(#h1)" />
        <path d="M-10 560 Q110 492 258 534 Q400 574 498 500 Q590 438 700 474 L700 860 L-10 860Z" fill="url(#h2)" />
        <path d="M-10 650 Q88 588 216 630 Q348 672 464 598 Q572 534 700 572 L700 860 L-10 860Z" fill="url(#h3)" />
      </svg>

      {/* Brand Header */}
      <div className="absolute top-[24px] left-1/2 z-20 flex -translate-x-1/2 items-center gap-[9px] whitespace-nowrap rounded-[100px] border border-white/15 bg-[#0b0705]/28 px-4 py-2 text-[13px] font-semibold tracking-[0.13em] uppercase text-white/92 backdrop-blur-md md:top-6 md:left-6 md:translate-x-0 md:rounded-none md:border-none md:bg-transparent md:p-0 md:text-[12.5px] md:tracking-[0.12em] md:backdrop-blur-none">
        <svg className="h-5 w-5 md:h-[27px] md:w-[27px]" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 1.5 L24 7.5 L24 19.5 L13.5 25.5 L3 19.5 L3 7.5 Z" stroke="rgba(255,255,255,.9)" strokeWidth="1.4" fill="none" />
          <path d="M13.5 7 L19.5 10.5 L19.5 17.5 L13.5 21 L7.5 17.5 L7.5 10.5 Z" stroke="rgba(255,255,255,.6)" strokeWidth="1" fill="none" />
        </svg>
        Salford &amp; Co.
      </div>

      {/* Typography Overlay */}
      <div className="absolute top-1/2 bottom-auto left-0 right-0 z-20 -translate-y-[58%] px-7 text-center text-white md:top-auto md:bottom-10 md:left-[34px] md:right-[34px] md:translate-y-0 md:text-left md:px-0">
        <div className="mb-[7px] text-[11px] tracking-[0.1em] opacity-75 md:mb-1.5 md:text-[11.5px] md:tracking-[0.07em] md:opacity-[0.72]">Your Digital Record</div>
        <h2 className="font-['Outfit'] text-[clamp(22px,6vw,30px)] font-extrabold leading-[1.16] tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)] md:text-4xl md:leading-[1.14] md:drop-shadow-[0_2px_20px_rgba(0,0,0,0.28)]">
          Smart Health for<br />Smarter Work
        </h2>
        <button className="hidden md:inline-flex items-center justify-center w-[42px] h-[42px] rounded-full bg-white/22 backdrop-blur-[6px] border border-white/30 cursor-pointer mt-3.5 text-white transition-colors duration-200 hover:bg-white/36" aria-label="Learn more" type="button">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
          </svg>
        </button>
      </div>

      {/* Environment Instanced Foliage Container */}
      <div className="absolute inset-0 z-12 overflow-hidden pointer-events-none">
        {leaves.map((leaf, index) => {
          if (index >= 6 && typeof window !== "undefined" && window.innerWidth <= 768) return null;
          return (
            <div
              key={leaf.id}
              className="animate-leaf-fall absolute"
              style={{
                left: `${leaf.left}%`,
                top: "-25px",
                width: `${leaf.size}px`,
                height: `${leaf.size}px`,
                animationDuration: `${leaf.duration}s`,
                animationDelay: `${leaf.delay}s`,
              }}
            >
              <svg viewBox="0 0 20 20" width={leaf.size} height={leaf.size}>
                <path d="M10 1 Q16 5 18 10 Q16 17 10 19 Q4 17 2 10 Q4 5 10 1Z" fill={leaf.color} opacity=".82" />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}