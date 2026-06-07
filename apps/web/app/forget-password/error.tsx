"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Pipeline logging telemetry metrics can be routed here
    console.error("Intercepted operational boundary error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-[#0b0705] p-6 text-[#f0dcc8] font-sans selection:bg-[#e07840]/30 relative">
      
      {/* Ambient Visual Radial Backing Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none z-0 bg-[radial-gradient(circle,rgba(224,120,64,0.06)_0%,transparent_70%)] blur-2xl" />

      <div className="w-full max-w-[400px] text-center z-10">
        
        {/* Warning Indicator Badge */}
        <div className="w-14 h-14 rounded-2xl bg-[#e05252]/10 border border-[#e05252]/20 flex items-center justify-center text-[#e05252] mx-auto mb-6">
          <AlertCircle className="w-6 h-6" strokeWidth={1.8} />
        </div>

        {/* Messaging Hierarchy */}
        <h1 className="text-[26px] font-extrabold tracking-tight text-[#e07840] leading-tight mb-2.5">
          Reset Link Interrupted
        </h1>
        <p className="text-[13.5px] text-[#7a6858] leading-relaxed mb-7 max-w-[310px] mx-auto">
          An issue occurred while evaluating your link configuration parameters. Please re-run the operational handshake cycle.
        </p>

        {/* Debug Cryptographic Key Tracker */}
        {error.digest && (
          <div className="mb-7 p-3 rounded-xl bg-white/[0.015] border border-white/5 font-mono text-[10.5px] text-[#7a6858]/80 select-all tracking-wide">
            Trace Signature: {error.digest}
          </div>
        )}

        {/* User Recovery Controls */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="flex-1 py-[13px] px-5 rounded-[12px] bg-[#e07840] text-white font-bold text-[14px] border-none cursor-pointer tracking-wide flex items-center justify-center gap-2 transition-all hover:bg-[#e98a58] hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_14px_rgba(224,120,64,0.22)]"
          >
            <RotateCcw className="w-4 h-4" strokeWidth={2.2} />
            Reset Session
          </button>
          
          <Link
            href="/salford-login"
            className="flex-1 py-[13px] px-5 rounded-[12px] bg-white/[0.03] border border-white/[0.14] text-[#f0dcc8] font-bold text-[14px] text-center no-underline flex items-center justify-center gap-2 transition-all hover:bg-white/5 hover:border-white/[0.22] hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" strokeWidth={2.2} />
            To Portal
          </Link>
        </div>
        
      </div>
    </div>
  );
}