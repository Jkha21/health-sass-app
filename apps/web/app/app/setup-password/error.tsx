'use client';

import React, { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log unexpected exceptions to application monitoring pipelines safely
    console.error('Captured Runtime Boundary Exception:', error);
  }, [error]);

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#0b0705] text-[#f0dcc8] antialiased p-6">
      <div className="w-full max-w-md text-center flex flex-col items-center animate-[fup_0.5s_ease_both]">
        {/* Graphic Error Shield Box */}
        <div className="w-16 h-16 rounded-full bg-[rgba(224,82,82,0.1)] border border-[rgba(224,82,82,0.25)] flex items-center justify-center text-[#e05252] mb-6">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="font-sans text-xl font-black text-[#e05252] tracking-tight mb-2">Something Went Wrong</h1>
        <p className="text-sm text-[#7a6858] leading-relaxed mb-6">
          An unexpected error occurred while compiling this view layout state interface context loop.
        </p>

        {error.digest && (
          <code className="text-[10px] font-mono text-[rgba(120,100,80,0.45)] tracking-wider block bg-[rgba(0,0,0,0.2)] px-2 py-1 rounded border border-[rgba(190,140,90,0.06)] mb-8 select-all">
            DIGEST_ID: {error.digest}
          </code>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#e07840] font-sans text-sm font-bold text-white hover:bg-[#e98a58] transition-all duration-200 shadow-[0_4px_14px_rgba(224,120,64,0.2)]"
          >
            Try Again
          </button>
          
          <a
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[rgba(255,255,255,0.038)] border border-[rgba(190,140,90,0.14)] font-sans text-sm font-bold text-[#f0dcc8] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200 text-center"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}