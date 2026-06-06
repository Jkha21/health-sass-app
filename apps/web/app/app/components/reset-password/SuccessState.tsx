"use client";

import React from "react";
import Link from "next/link";

export default function SuccessState() {
  return (
    <div className="text-center py-2 animate-fade-up">
      {/* Animated Success Checkmark Badge */}
      <div className="w-[70px] h-[70px] rounded-full flex items-center justify-center mx-auto mb-5.5 bg-[#52c87a]/10 border-[1.5px] border-[#52c87a]/30 animate-pop-in">
        <svg className="w-8 h-8 text-[#52c87a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline className="animate-draw" points="20 6 9 17 4 12" />
        </svg>
      </div>
      
      <h2 className="font-heading text-[26px] font-extrabold tracking-tight mb-2.5 text-[#e07840]">
        Password Updated!
      </h2>
      
      <p className="text-[13.5px] text-[#7a6858] leading-[1.7] mb-7 max-w-[300px] mx-auto">
        Your password has been successfully reset. You can now sign in with your new credentials.
      </p>
      
      {/* Updated to explicit arbitrary corner radius matching the inputs */}
      <Link 
        href="/login" 
        className="block w-full max-w-[280px] py-[13.5px] px-6 rounded-[11px] bg-[#e07840] text-white font-bold text-[14.5px] text-center mx-auto no-underline transition-all hover:bg-[#e98a58] hover:-translate-y-0.5 hover:shadow-[0_7px_22px_rgba(224,120,64,0.32)] active:translate-y-0"
      >
        Sign In Now
      </Link>
    </div>
  );
}