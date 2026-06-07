"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Caught interface exception:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-[#0b0705] p-6 text-[#f0dcc8] font-sans">
      
      {/* Background Decorative Gradient Radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] pointer-events-none z-0 bg-radial-gradient from-[#e07840]/5 to-transparent blur-3xl" />

      <div className="w-full max-w-[420px] text-center z-10">
        {/* Error Symbol Badge */}
        <div className="w-14 h-14 rounded-2xl bg-[#e05252]/10 border border-[#e05252]/20 flex items-center justify-center text-[#e05252] mx-auto mb-6">
          <AlertCircle className="w-6 h-6" strokeWidth={1.8} />
        </div>

        {/* Messaging */}
        <h1 className="text-[28px] font-extrabold tracking-tight text-[#e07840] leading-tight mb-2">
          Something went wrong
        </h1>
        <p className="text-[13.5px] text-[#7a6858] leading-relaxed mb-8 max-w-[320px] mx-auto">
          An unexpected structural error occurred while configuring your secure session. Please attempt a fresh lifecycle reset.
        </p>

        {/* Micro-System Debug Code if available */}
        {error.digest && (
          <div className="mb-8 p-3 rounded-lg bg-white/[0.02] border border-white/5 font-mono text-[11px] text-[#7a6858]/80 select-all">
            ID Reference: {error.digest}
          </div>
        )}

        {/* Action Interface Controls */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="flex-1 py-3 px-5 rounded-[11px] bg-[#e07840] text-white font-bold text-[14px] border-none cursor-pointer tracking-wide flex items-center justify-center gap-2 transition-all hover:bg-[#e98a58] hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_14px_rgba(224,120,64,0.2)]"
          >
            <RotateCcw className="w-4 h-4" strokeWidth={2.2} />
            Retry Interface
          </button>
          
          <Link
            href="/salford-login"
            className="flex-1 py-3 px-5 rounded-[11px] bg-white/[0.03] border border-white/[0.14] text-[#f0dcc8] font-bold text-[14px] text-center no-underline flex items-center justify-center gap-2 transition-all hover:bg-white/5 hover:border-white/[0.22] hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" strokeWidth={2.2} />
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}