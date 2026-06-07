"use client";

import React, { useEffect, useState } from "react";

interface LeafItem {
  id: number;
  size: number;
  duration: number;
  delay: number;
  leftPosition: number;
  color: string;
}

const LEAF_COLORS = ["#c04018", "#d05030", "#e07040", "#b82808", "#d04828", "#e86038"];

export const LeftArtwork: React.FC = () => {
  const [leaves, setLeaves] = useState<LeafItem[]>([]);

  useEffect(() => {
    const generateLeaf = (): LeafItem => ({
      id: Math.random() * Date.now(),
      size: 8 + Math.random() * 10,
      duration: 6 + Math.random() * 5,
      delay: Math.random() * 2,
      leftPosition: Math.random() * 90,
      color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
    });

    const initialLeaves = Array.from({ length: 8 }, generateLeaf);
    setLeaves(initialLeaves);

    const emitterInterval = setInterval(() => {
      setLeaves((prevLeaves) => {
        const structuralLimit = prevLeaves.slice(-15);
        return [...structuralLimit, generateLeaf()];
      });
    }, 1500);

    return () => clearInterval(emitterInterval);
  }, []);

  return (
    <div 
      style={{
        width: "520px", /* Constrains width structural profile explicitly */
        height: "100%",
        padding: "16px 0 16px 16px",
        boxSizing: "border-box",
        display: "flex",
        flexShrink: 0
      }}
    >
      <div 
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "24px", /* Recreates the layout curve border edge */
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "40px",
          boxSizing: "border-box",
          overflow: "hidden"
        }}
      >
        <style>{`
          @keyframes fallAndSway {
            0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(105vh) rotate(540deg) translateX(15px); opacity: 0; }
          }
        `}</style>

        {/* Scaled Layered Background Canvas Element */}
        <svg 
          viewBox="0 0 700 860" 
          preserveAspectRatio="xMidYMid slice" 
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 1
          }}
        >
          <defs>
            <linearGradient id="dark-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f7cd83"/>
              <stop offset="35%" stopColor="#e28753"/>
              <stop offset="70%" stopColor="#b54f31"/>
              <stop offset="100%" stopColor="#81311b"/>
            </linearGradient>
            <linearGradient id="h1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ac4529"/><stop offset="100%" stopColor="#842d17"/>
            </linearGradient>
            <linearGradient id="h2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#96351e"/><stop offset="100%" stopColor="#6b1e0d"/>
            </linearGradient>
            <linearGradient id="h3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#802814"/><stop offset="100%" stopColor="#551206"/>
            </linearGradient>
            <linearGradient id="h4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6e200f"/><stop offset="100%" stopColor="#400900"/>
            </linearGradient>
          </defs>
          <rect width="700" height="860" fill="url(#dark-sky)"/>
          <circle cx="210" cy="180" r="80" fill="#fadc66" opacity="0.85"/>
          
          <g stroke="#b03818" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4">
            <path d="M40 120 Q50 110 60 120"/><path d="M100 100 Q110 90 120 100"/><path d="M170 130 Q178 122 186 130"/>
          </g>

          {/* Center Tree Trunk Structure Graphic vector block */}
          <path d="M520 230 Q515 350 510 500" stroke="#250d02" strokeWidth="14" fill="none"/>
          <path d="M515 320 Q460 270 420 240" stroke="#250d02" strokeWidth="8" fill="none"/>
          <path d="M512 380 Q570 330 610 300" stroke="#250d02" strokeWidth="7" fill="none"/>
          
          {/* Detailed Tree Foliage Layer Vectors */}
          <ellipse cx="420" cy="230" rx="40" ry="30" fill="#a02d12" opacity="0.9"/>
          <ellipse cx="470" cy="200" rx="42" ry="32" fill="#c3421d" opacity="0.9"/>
          <ellipse cx="520" cy="210" rx="38" ry="28" fill="#d25528" opacity="0.9"/>
          <ellipse cx="570" cy="190" rx="35" ry="26" fill="#b03314" opacity="0.85"/>

          {/* Rolling Terrain Curves */}
          <path d="M-10 520 Q120 440 260 480 Q400 520 520 435 Q600 380 710 420 L710 860 L-10 860Z" fill="url(#h1)"/>
          <path d="M-10 590 Q150 520 300 560 Q440 600 550 520 Q640 460 710 500 L710 860 L-10 860Z" fill="url(#h2)"/>
          <path d="M-10 670 Q130 610 270 650 Q410 690 530 610 L710 660 L710 860 L-10 860Z" fill="url(#h3)"/>
          <path d="M-10 760 Q150 710 290 740 L500 680 L710 730 L710 860 L-10 860Z" fill="url(#h4)"/>
        </svg>

        {/* Corporate Branding Badge Layer */}
        <div style={{ position: "relative", zIndex: 5, display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.9)", textTransform: "uppercase", letterSpacing: "1px" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: "16px", height: "16px" }}>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          Salford &amp; Co.
        </div>

        {/* Inside Animated Blowing Leaves Layer Container */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3, overflow: "hidden" }}>
          {leaves.map((leaf) => (
            <div
              key={leaf.id}
              style={{
                position: "absolute",
                left: `${leaf.leftPosition}%`,
                top: "-20px",
                width: `${leaf.size}px`,
                height: `${leaf.size}px`,
                animationName: "fallAndSway",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDuration: `${leaf.duration}s`,
                animationDelay: `${leaf.delay}s`,
              }}
            >
              <svg viewBox="0 0 20 20" width={leaf.size} height={leaf.size}>
                <path d="M10 2 Q15 6 17 11 Q14 16 10 18 Q6 16 3 11 Q5 6 10 2Z" fill={leaf.color} />
              </svg>
            </div>
          ))}
        </div>

        {/* Benefits Value Bullet Points Column */}
        <div style={{ position: "relative", zIndex: 5, display: "flex", flexDirection: "column", gap: "24px", marginTop: "120px" }}>
          {[
            { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, title: "HIPAA-compliant & secure", sub: "End-to-end encrypted health records" },
            { icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>, title: "Real-time wellness insights", sub: "Proactive team health analytics" },
            { icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, title: "Up and running in minutes", sub: "Zero IT setup required" },
            { icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>, title: "2,000+ companies onboarded", sub: "Trusted across industries globally" }
          ].map((item, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: "14px", height: "14px" }}>
                  {item.icon}
                </svg>
              </div>
              <div style={{ display: "flex", flexDirection: "column", color: "#ffffff" }}>
                <span style={{ fontSize: "12px", fontWeight: 700 }}>{item.title}</span>
                <span style={{ fontSize: "11px", opacity: 0.75, marginTop: "1px" }}>{item.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tagline Graphic Label Stack */}
        <div style={{ position: "relative", zIndex: 5, color: "#ffffff", marginTop: "auto" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", opacity: 0.8, marginBottom: "6px" }}>
            Join 2,000+ companies
          </div>
          <h2 style={{ fontSize: "30px", fontWeight: 800, margin: 0, lineHeight: 1.2, letterSpacing: "-0.5px" }}>
            Your Health Journey<br/>Starts Here
          </h2>
          <button 
            aria-label="Continue registration process"
            style={{
              marginTop: "20px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.3)",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: "14px", height: "14px" }}>
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};