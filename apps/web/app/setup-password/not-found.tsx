'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#0b0705] text-[#f0dcc8] antialiased p-6">
      <div className="w-full max-w-md text-center flex flex-col items-center animate-[fup_0.5s_ease_both]">
        {/* Graphic Indicator */}
        <div className="w-16 h-16 rounded-full bg-[rgba(224,120,64,0.1)] border border-[rgba(224,120,64,0.2)] flex items-center justify-center text-[#e07840] mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>

        <h1 className="font-sans text-4xl font-extrabold text-[#e07840] tracking-tight mb-2">404</h1>
        <h2 className="text-lg font-bold text-[#f0dcc8] mb-3">Page Not Found</h2>
        <p className="text-sm text-[#7a6858] leading-relaxed mb-8">
          The page you are looking for doesn't exist or has been moved to a different workspace route.
        </p>

        <Link 
          href="/" 
          className="px-6 py-3 rounded-xl bg-[rgba(255,255,255,0.038)] border border-[rgba(190,140,90,0.14)] font-sans text-sm font-bold text-[#f0dcc8] hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(224,120,64,0.3)] transition-all duration-200"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}