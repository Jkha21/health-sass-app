'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-[#0b0705] text-[#f0dcc8] antialiased">
      <div className="flex flex-col items-center animate-[fup_0.4s_ease_both]">
        {/* Animated Custom Ring Spinner Only */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-[rgba(190,140,90,0.1)]" />
          <div className="absolute inset-0 rounded-full border-4 border-t-[#e07840] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
      </div>
    </div>
  );
}