"use client";

import React from "react";
import Link from "next/link";

export default function ExpiredState() {
  return (
    <div className="text-center py-2 animate-fade-up">
      <div className="w-[70px] h-[70px] rounded-full flex items-center justify-center mx-auto mb-5.5 bg-[#e0a040]/10 border-[1.5px] border-[#e0a040]/30 animate-pop-in">
        <svg className="w-8 h-8 stroke-[#e0a040]" viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <path className="animate-draw" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
        </svg>
      </div>

      <h2 className="font-heading text-[26px] font-extrabold tracking-tight mb-2.5 text-[#e07840]">
        Link Expired
      </h2>

      <p className="text-[13.5px] text-[#7a6858] leading-[1.7] mb-7 max-w-[300px] mx-auto">
        This password reset link has expired or has already been used. Request a new one to continue.
      </p>

      {/* Fixed: Updated to clear explicit arbitrary corner radius tracking values */}
      <Link 
        href="/salford-forgot-password" 
        className="block w-full max-w-[280px] py-[13.5px] px-6 rounded-[11px] bg-[#e07840] text-white font-bold text-[14.5px] text-center mx-auto no-underline transition-all hover:bg-[#e98a58] hover:-translate-y-0.5 hover:shadow-[0_7px_22px_rgba(224,120,64,0.32)] active:translate-y-0"
      >
        Request New Link
      </Link>
    </div>
  );
}