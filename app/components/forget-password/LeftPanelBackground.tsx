"use client";

import React, { useEffect, useRef } from "react";

const LEAF_COLORS = ["#c04018", "#d05030", "#e07040", "#b82808", "#d04828"];

export function LeftPanelBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createLeaf = () => {
      const leaf = document.createElement("div");
      leaf.className = "absolute pointer-events-none origin-center top-[-25px]";
      
      const size = 9 + Math.random() * 13;
      const duration = 7 + Math.random() * 6;
      const delay = Math.random() * 9;
      const color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
      
      leaf.style.left = `${Math.random() * 92}%`;
      leaf.style.width = `${size}px`;
      leaf.style.height = `${size}px`;
      leaf.style.animation = `lfall ${duration}s linear ${delay}s infinite`;

      leaf.innerHTML = `
        <svg viewBox="0 0 20 20" width="${size}" height="${size}">
          <path d="M10 1 Q16 5 18 10 Q16 17 10 19 Q4 17 2 10 Q4 5 10 1Z" fill="${color}" opacity=".82"/>
          <line x1="10" y1="1" x2="10" y2="19" stroke="${color}" strokeWidth=".8" opacity=".45"/>
        </svg>
      `;

      container.appendChild(leaf);
      setTimeout(() => leaf.remove(), (duration + delay) * 1000 + 400);
    };

    // Instantiate baseline group
    for (let i = 0; i < 14; i++) createLeaf();
    const interval = setInterval(createLeaf, 1100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:block w-[44%] lg:w-[48%] shrink-0 relative overflow-hidden rounded-r-[26px] h-full max-md:w-full max-md:h-[46vh] max-md:min-h-[255px] max-md:max-h-[340px] max-md:rounded-none max-md:after:absolute max-md:after:bottom-0 max-md:after:inset-x-0 max-md:after:h-[110px] max-md:after:z-[19] max-md:after:bg-gradient-to-b max-md:after:from-transparent max-md:after:to-[#0b0705]/55 max-md:after:pointer-events-none">
      
      {/* Locally scoped keyframe fallback animation block */}
      <style jsx global>{`
        @keyframes lfall {
          0% { opacity: 0.9; transform: translateY(-40px) rotate(0deg); }
          90% { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(105vh) rotate(380deg); }
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full block" viewBox="0 0 700 860" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fp-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fce8b0"/><stop offset="30%" stopColor="#f8b87a"/>
            <stop offset="70%" stopColor="#e87040"/><stop offset="100%" stopColor="#c85828"/>
          </linearGradient>
          <linearGradient id="fp-h1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f0a060"/><stop offset="100%" stopColor="#d45c38"/></linearGradient>
          <linearGradient id="fp-h2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d86840"/><stop offset="100%" stopColor="#be4820"/></linearGradient>
          <linearGradient id="fp-h3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c45828"/><stop offset="100%" stopColor="#a03818"/></linearGradient>
          <linearGradient id="fp-h4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b04420"/><stop offset="100%" stopColor="#882c08"/></linearGradient>
          <radialGradient id="fp-gl" cx="57%" cy="20%" r="30%"><stop offset="0%" stopColor="#ffe090" stopOpacity=".85"/><stop offset="100%" stopColor="#ffe090" stopOpacity="0"/></radialGradient>
        </defs>
        <rect width="700" height="860" fill="url(#fp-sky)"/>
        <rect width="700" height="860" fill="url(#fp-gl)"/>
        <circle cx="400" cy="174" r="92" fill="#f8d040" opacity=".12"/>
        <circle cx="400" cy="174" r="74" fill="#f5c030" opacity=".88"/>
        <g stroke="#f8d050" strokeWidth="1.5" opacity=".28">
          <line x1="400" y1="81" x2="400" y2="59"/><line x1="460" y1="100" x2="476" y2="84"/>
          <line x1="490" y1="158" x2="514" y2="152"/><line x1="340" y1="100" x2="324" y2="84"/>
          <line x1="310" y1="158" x2="286" y2="152"/>
        </g>
        <path d="M60 110 Q73 100 86 110" stroke="#b03818" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
        <path d="M112 92 Q126 82 140 92" stroke="#b03818" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
        <path d="M188 118 Q199 110 210 118" stroke="#b03818" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        <path d="M248 96 Q256 90 264 96" stroke="#b03818" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <g fill="#c04018" opacity=".72">
          <path d="M195 265 Q202 257 209 265 Q202 273 195 265Z" transform="rotate(22,202,265)"/>
          <path d="M285 318 Q292 310 299 318 Q292 326 285 318Z" transform="rotate(-16,292,318)"/>
          <path d="M338 238 Q344 231 350 238 Q344 245 338 238Z" transform="rotate(-28,344,238)"/>
          <path d="M420 280 Q426 273 432 280 Q426 287 420 280Z" transform="rotate(-20,426,280)"/>
        </g>
        <path d="M552 205 Q548 276 544 368 Q542 428 546 488" stroke="#321400" strokeWidth="16" fill="none" strokeLinecap="round"/>
        <path d="M547 288 Q506 246 474 222" stroke="#321400" strokeWidth="9.5" fill="none" strokeLinecap="round"/>
        <path d="M545 338 Q596 292 634 260" stroke="#321400" strokeWidth="8" fill="none" strokeLinecap="round"/>
        <path d="M544 398 Q506 364 480 342" stroke="#321400" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <path d="M544 448 Q590 418 620 394" stroke="#321400" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="474" cy="214" rx="46" ry="35" fill="#c03810" opacity=".94" transform="rotate(-20,474,214)"/>
        <ellipse cx="516" cy="190" rx="42" ry="31" fill="#d44820" opacity=".9" transform="rotate(10,516,190)"/>
        <ellipse cx="558" cy="198" rx="40" ry="29" fill="#e05828" opacity=".92" transform="rotate(-7,558,198)"/>
        <ellipse cx="606" cy="184" rx="36" ry="28" fill="#c83010" opacity=".87" transform="rotate(24,606,184)"/>
        <ellipse cx="638" cy="212" rx="32" ry="25" fill="#d04018" opacity=".84" transform="rotate(-16,638,212)"/>
        <ellipse cx="452" cy="244" rx="32" ry="25" fill="#b82808" opacity=".8" transform="rotate(16,452,244)"/>
        <circle cx="484" cy="172" r="9" fill="#f07040" opacity=".5"/>
        <circle cx="594" cy="162" r="8" fill="#e85030" opacity=".55"/>
        <path d="M-10 488 Q88 406 218 446 Q346 486 458 413 Q538 358 700 400 L700 860 L-10 860Z" fill="url(#fp-h1)"/>
        <path d="M-10 558 Q108 490 256 532 Q398 572 496 498 Q588 436 700 472 L700 860 L-10 860Z" fill="url(#fp-h2)"/>
        <path d="M-10 648 Q86 586 214 628 Q346 670 462 596 Q570 532 700 570 L700 860 L-10 860Z" fill="url(#fp-h3)"/>
        <path d="M-10 748 Q98 698 218 728 Q358 763 478 698 Q588 643 700 672 L700 860 L-10 860Z" fill="url(#fp-h4)"/>
      </svg>

      <div className="absolute top-[26px] left-[26px] z-20 flex items-center gap-[9px] text-white/92 text-[12.5px] font-semibold tracking-[0.12em] uppercase max-md:top-5 max-md:left-1/2 max-md:-translate-x-1/2 max-md:whitespace-nowrap max-md:text-xs max-md:tracking-[0.13em] max-md:bg-[#0b0705]/28 max-md:backdrop-blur-md max-md:px-3.5 max-md:py-1.5 max-md:rounded-full max-md:border max-md:border-white/15">
        <svg viewBox="0 0 27 27" fill="none" className="w-[27px] h-[27px] max-md:w-5 max-md:h-5">
          <path d="M13.5 1.5L24 7.5v12l-10.5 6-10.5-6v-12z" stroke="rgba(255,255,255,.9)" strokeWidth="1.4" />
          <path d="M13.5 7L19.5 10.5v7L13.5 21 7.5 17.5v-7z" stroke="rgba(255,255,255,.6)" strokeWidth="1" />
        </svg>
        Salford &amp; Co.
      </div>

      <div className="absolute bottom-[38px] left-[34px] right-[34px] z-20 text-white max-md:top-1/2 max-md:bottom-auto max-md:-translate-y-[65%] max-md:text-center max-md:px-6">
        <div className="text-[11.5px] tracking-[0.07em] opacity-[0.72] mb-1.5 max-md:text-[11px] max-md:tracking-[0.1em] max-md:opacity-[0.78]">Account Recovery</div>
        <h2 className="text-[34px] md:text-[27px] font-extrabold leading-[1.14] tracking-[-0.02em] drop-shadow-[0_2px_20px_rgba(0,0,0,0.28)] max-md:text-[clamp(20px,5.5vw,26px)] max-md:drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)] min-[430px]:text-[19px]">
          We'll Get You<br />Back in No Time
        </h2>
      </div>
      
      {/* Target element hooks node */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none z-12 overflow-hidden" />
    </div>
  );
}