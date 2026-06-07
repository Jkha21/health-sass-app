'use client';

import React, { useEffect, useState } from 'react';

// Explicitly defined props interface to resolve the IntrinsicAttributes error
export interface LeftPanelProps {
  firstName: string;
}

interface Leaf {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const LEAF_COLORS = ['#c04018', '#d05030', '#e07040', '#b82808', '#d04828', '#e86038'];

export default function LeftPanel({ firstName }: LeftPanelProps) {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const initialPool = Array.from({ length: 14 }).map((_, i) => createLeafData(i));
    setLeaves(initialPool);

    const interval = setInterval(() => {
      setLeaves((prev) => [...prev, createLeafData(Date.now())]);
    }, 1100);

    return () => clearInterval(interval);
  }, []);

  function createLeafData(id: number): Leaf {
    return {
      id,
      left: Math.random() * 92,
      size: 9 + Math.random() * 13,
      duration: 7 + Math.random() * 6,
      delay: Math.random() * 9,
      color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
    };
  }

  return (
    <div className="w-full md:w-[48%] shrink-0 relative overflow-hidden h-[40vh] min-h-[280px] md:h-screen md:sticky md:top-0 flex flex-col justify-between p-6 md:p-12 z-10 md:rounded-r-[26px]">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes panelLeafFall {
          0% { transform: translateY(-10px) rotate(0deg) translateX(0px); opacity: 0; }
          10% { opacity: 0.82; }
          90% { opacity: 0.82; }
          100% { transform: translateY(105vh) rotate(360deg) translateX(20px); opacity: 0; }
        }
        .animate-panel-leaf {
          animation: panelLeafFall linear infinite forwards;
        }
      `}} />

      <svg className="absolute inset-0 w-full h-full block" viewBox="0 0 700 860" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sp-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fce8b0"/>
            <stop offset="28%" stopColor="#f8b87a"/>
            <stop offset="68%" stopColor="#e87040"/>
            <stop offset="100%" stopColor="#c85828"/>
          </linearGradient>
          <radialGradient id="sp-gl" cx="57%" cy="20%" r="30%">
            <stop offset="0%" stopColor="#ffe090" stopOpacity=".88"/>
            <stop offset="100%" stopColor="#ffe090" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="sp-h1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f0a060"/><stop offset="100%" stopColor="#d45c38"/></linearGradient>
          <linearGradient id="sp-h2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d86840"/><stop offset="100%" stopColor="#be4820"/></linearGradient>
          <linearGradient id="sp-h3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c45828"/><stop offset="100%" stopColor="#a03818"/></linearGradient>
          <linearGradient id="sp-h4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b04420"/><stop offset="100%" stopColor="#882c08"/></linearGradient>
        </defs>
        <rect width="700" height="860" fill="url(#sp-sky)"/>
        <rect width="700" height="860" fill="url(#sp-gl)"/>
        <circle cx="400" cy="174" r="76" fill="#f5c030" opacity=".9"/>
        <path d="M-10 486 Q88 404 218 444 Q346 484 458 411 Q538 356 700 398 L700 860 L-10 860Z" fill="url(#sp-h1)"/>
        <path d="M-10 556 Q108 488 256 530 Q398 570 496 496 Q588 434 700 470 L700 860 L-10 860Z" fill="url(#sp-h2)"/>
        <path d="M-10 646 Q86 584 214 626 Q346 668 462 594 Q570 530 700 568 L700 860 L-10 860Z" fill="url(#sp-h3)"/>
        <path d="M-10 746 Q98 696 218 726 Q358 761 478 696 Q588 641 700 670 L700 860 L-10 860Z" fill="url(#sp-h4)"/>
      </svg>

      <div className="z-20 flex items-center gap-[9px] text-white/92 text-[12.5px] font-semibold tracking-[0.12em] uppercase bg-[#0b0705]/28 md:bg-transparent backdrop-blur-md md:backdrop-blur-none px-[15px] py-[7px] md:p-0 rounded-full md:rounded-none border border-white/15 md:border-none whitespace-nowrap mx-auto md:mx-0 w-fit">
        <svg className="w-5 h-5 md:w-[27px] md:h-[27px]" viewBox="0 0 27 27" fill="none">
          <path d="M13.5 1.5L24 7.5v12l-10.5 6L3 19.5v-12z" stroke="rgba(255,255,255,.9)" strokeWidth="1.4"/>
          <path d="M13.5 7 L19.5 10.5v7L13.5 21 7.5 17.5v-7z" stroke="rgba(255,255,255,.6)" strokeWidth="1"/>
        </svg>
        Salford &amp; Co.
      </div>

      <div className="z-20 text-center md:text-left flex flex-col gap-3.5 my-auto md:my-0 md:mt-auto">
        <div className="inline-flex items-center gap-[7px] text-[11px] font-bold tracking-[0.1em] uppercase text-white/75 bg-white/14 backdrop-blur-md border border-white/20 rounded-full px-[13px] py-[6px] w-fit mx-auto md:mx-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e07840]"></span> One-time account setup
        </div>
        <h2 className="font-sans text-[22px] sm:text-[26px] md:text-[32px] lg:text-[38px] font-black leading-[1.15] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.3)]">
          Welcome Aboard,<br /><em className="not-italic text-[#ffd580]"> {firstName}!</em>
        </h2>
        
        <div className="hidden md:flex flex-col gap-[11px] mt-2">
          {['Secure HIPAA-compliant records', 'Real-time team wellness dashboard', 'Instant access after setup', 'End-to-end encrypted & private'].map((text, idx) => (
            <div key={idx} className="flex items-center gap-[11px]">
              <div className="w-[20px] h-[20px] rounded-full bg-white/18 backdrop-blur-sm border border-white/25 flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 stroke-white stroke-[2.5]" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3"/></svg>
              </div>
              <span className="text-[13px] font-semibold text-white/90">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-12 overflow-hidden">
        {leaves.map((leaf) => (
          <div
            key={leaf.id}
            className="absolute animate-panel-leaf"
            style={{
              left: `${leaf.left}%`,
              top: '-25px',
              animationDuration: `${leaf.duration}s`,
              animationDelay: `${leaf.delay}s`,
            }}
          >
            <svg viewBox="0 0 20 20" width={leaf.size} height={leaf.size}>
              <path d="M10 1 Q16 5 18 10 Q16 17 10 19 Q4 17 2 10 Q4 5 10 1Z" fill={leaf.color} opacity=".82" />
              <line x1="10" y1="1" x2="10" y2="19" stroke={leaf.color} strokeWidth=".8" opacity=".45" />
            </svg>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-[80px] z-19 bg-gradient-to-b from-transparent to-[#0b0705] pointer-events-none md:hidden" />
    </div>
  );
}