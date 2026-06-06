import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-[#0b0705] text-[#f0dcc8] font-sans">
      
      {/* Structural Minimal Spinner Block */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative flex items-center justify-center w-11 h-11">
          {/* Outer Track Ring */}
          <div className="absolute inset-0 border-[3px] border-white/[0.04] rounded-full" />
          {/* Active Spinning Fluid Accent */}
          <div className="absolute inset-0 border-[3px] border-transparent border-t-[#e07840] rounded-full animate-spin" />
        </div>
        
        {/* Sub-text Context Tracker */}
        <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#7a6858] animate-pulse">
          Establishing Encryption...
        </span>
      </div>
      
    </div>
  );
}