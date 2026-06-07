"use client";

import React, { useState, useEffect } from "react";
import { Leaf, LEAF_COLORS } from "../../types/reset-password";

export default function IllustrationPanel() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    let idCounter = 0;
    const generateLeaf = () => {
      const size = 9 + Math.random() * 13;
      const duration = 7 + Math.random() * 6;
      const delay = Math.random() * 9;
      const color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];

      const newLeaf: Leaf = {
        id: idCounter++,
        left: `${Math.random() * 92}%`,
        size,
        duration: `${duration}s`,
        delay: `${delay}s`,
        color,
      };
      setLeaves((prev) => [...prev.slice(-25), newLeaf]);
    };

    for (let i = 0; i < 14; i++) generateLeaf();
    const interval = setInterval(generateLeaf, 1100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[48%] flex-shrink-0 overflow-hidden rounded-r-[26px] max-[768px]:w-full max-[768px]:h-[46vh] max-[768px]:min-h-[255px] max-[768px]:max-h-[340px] max-[768px]:rounded-none">
      
      {/* FIXED: Replaced non-standard styled-jsx syntax with type-safe dangerouslySetInnerHTML injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes leafFallAnimation {
          0% { 
            opacity: 0.9; 
            transform: translateY(-40px) rotate(0deg) translateX(0px); 
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(15px);
          }
          100% { 
            opacity: 0; 
            transform: translateY(105vh) rotate(380deg) translateX(-15px); 
          }
        }
        .animate-vector-leaf { 
          animation: leafFallAnimation linear infinite; 
          will-change: transform, opacity;
        }
      `}} />

      {/* Background Graphic Architecture */}
      <svg className="absolute inset-0 w-full h-full block" viewBox="0 0 700 860" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fce8b0" /><stop offset="30%" stopColor="#f8b87a" />
            <stop offset="70%" stopColor="#e87040" /><stop offset="100%" stopColor="#c85828" />
          </linearGradient>
          <linearGradient id="h1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f0a060" /><stop offset="100%" stopColor="#d45c38" /></linearGradient>
          <linearGradient id="h2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d86840" /><stop offset="100%" stopColor="#be4820" /></linearGradient>
          <linearGradient id="h3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c45828" /><stop offset="100%" stopColor="#a03818" /></linearGradient>
          <radialGradient id="gl" cx="57%" cy="20%" r="30%"><stop offset="0%" stopColor="#ffe090" stopOpacity=".85" /><stop offset="100%" stopColor="#ffe090" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="700" height="860" fill="url(#sky)" />
        <rect width="700" height="860" fill="url(#gl)" />
        <circle cx="400" cy="174" r="74" fill="#f5c030" opacity=".88" />
        <path d="M552 205 Q548 276 544 368 Q542 428 546 488" stroke="#321400" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d="M547 288 Q506 246 474 222" stroke="#321400" strokeWidth="9.5" fill="none" strokeLinecap="round" />
        <path d="M545 338 Q596 292 634 260" stroke="#321400" strokeWidth="8" fill="none" strokeLinecap="round" />
        <ellipse cx="474" cy="214" rx="46" ry="35" fill="#c03810" opacity=".94" transform="rotate(-20,474,214)" />
        <ellipse cx="516" cy="190" rx="42" ry="31" fill="#d44820" opacity=".9" transform="rotate(10,516,190)" />
        <ellipse cx="558" cy="198" rx="40" ry="29" fill="#e05828" opacity=".92" transform="rotate(-7,558,198)" />
        <path d="M-10 488 Q88 406 218 446 Q346 486 458 413 Q538 358 700 400 L700 860 L-10 860Z" fill="url(#h1)" />
        <path d="M-10 558 Q108 490 256 532 Q398 572 496 498 Q588 436 700 472 L700 860 L-10 860Z" fill="url(#h2)" />
        <path d="M-10 648 Q86 586 214 628 Q346 670 462 596 Q570 532 700 570 L700 860 L-10 860Z" fill="url(#h3)" />
      </svg>

      {/* Brand Overlay */}
      <div className="absolute top-[26px] left-[26px] z-20 flex items-center gap-[9px] text-white/90 text-[12.5px] font-semibold tracking-[0.12em] uppercase max-[768px]:left-1/2 max-[768px]:-translate-x-1/2 max-[768px]:bg-[#0b0705]/28 max-[768px]:backdrop-blur-md max-[768px]:py-[7px] max-[768px]:px-[15px] max-[768px]:rounded-full max-[768px]:border max-[768px]:border-white/15">
        <svg className="w-[27px] h-[27px]" viewBox="0 0 27 27" fill="none">
          <path d="M13.5 1.5L24 7.5v12l-10.5 6L3 19.5v-12z" stroke="rgba(255,255,255,.9)" strokeWidth="1.4" />
        </svg>
        Salford &amp; Co.
      </div>

      {/* Context Typography Layer */}
      <div className="absolute bottom-[38px] left-[34px] right-[34px] z-20 text-white max-[768px]:top-1/2 max-[768px]:bottom-auto max-[768px]:left-0 max-[768px]:right-0 max-[768px]:-translate-y-[65%] max-[768px]:text-center max-[768px]:px-6">
        <div className="text-[11.5px] tracking-[0.07em] opacity-70 mb-[5px]">Security Update</div>
        <h2 className="font-heading text-[34px] font-extrabold leading-[1.14] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] max-[768px]:text-[clamp(20px,5.5vw,26px)]">
          Your New Chapter<br />Starts Here
        </h2>
      </div>

      {/* Dynamic Environmental Particles Engine */}
      <div className="absolute inset-0 pointer-events-none z-[12] overflow-hidden">
        {leaves.map((leaf) => (
          <div
            key={leaf.id}
            className="absolute animate-vector-leaf"
            style={{
              left: leaf.left,
              top: "-40px",
              width: leaf.size,
              height: leaf.size,
              animationDuration: leaf.duration,
              animationDelay: leaf.delay,
            }}
          >
            <svg viewBox="0 0 20 20" width={leaf.size} height={leaf.size}>
              <path d="M10 1 Q16 5 18 10 Q16 17 10 19 Q4 17 2 10 Q4 5 10 1Z" fill={leaf.color} opacity=".82" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}