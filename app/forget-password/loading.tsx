import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-[#0b0705] text-[#f0dcc8] font-sans">
      
      {/* Structural Minimal Loader Frame */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative flex items-center justify-center w-12 h-12">
          {/* Outer Stationary Ring */}
          <div className="absolute inset-0 border-[3.5px] border-white/[0.04] rounded-full" />
          {/* Dynamic Fluid Spinner Arc */}
          <div className="absolute inset-0 border-[3.5px] border-transparent border-t-[#e07840] rounded-full animate-spin" />
        </div>
        
        {/* Core Context Messaging Tracker */}
        <span className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-[#7a6858] animate-pulse">
          Securing Session Connection...
        </span>
      </div>
      
    </div>
  );
}