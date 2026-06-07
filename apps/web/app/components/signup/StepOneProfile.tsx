"use client";

import React from "react";
import { FormInput } from "./FormInput";

interface StepOneProps {
  data: any;
  updateData: (fields: any) => void;
  errors: any;
  shake: any;
}

export const StepOneProfile: React.FC<StepOneProps> = ({ data, updateData, errors, shake }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Full Name Field Wrapper */}
      <div className={`w-full flex flex-col gap-1.5 font-['Outfit',sans-serif] ${shake.name ? "animate-shake" : ""}`}>
        <label htmlFor="nm" className="text-xs font-bold uppercase tracking-wider text-[#a6958a] flex items-center gap-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className={`relative flex items-center w-full h-11 bg-[#1a120e] rounded-xl border ${errors.name ? 'border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-[#2c221a] focus-within:border-[#e66828]'} transition-all px-3.5`}>
          <div className="text-[#a6958a] mr-2.5 flex items-center justify-center pointer-events-none">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <input
            id="nm" type="text" placeholder="John Doe" value={data.name}
            onChange={e => updateData({ name: e.target.value })}
            className="w-full h-full bg-transparent text-sm font-medium font-['Outfit',sans-serif] tracking-normal text-[#f5f0eb] placeholder-[#5c4d43] border-none outline-none p-0"
          />
        </div>
        {errors.name && <p className="text-[11px] text-red-400 font-medium tracking-wide">Please enter your full name</p>}
      </div>

      {/* Username Field Wrapper */}
      <div className={`w-full flex flex-col gap-1.5 font-['Outfit',sans-serif] ${shake.username ? "animate-shake" : ""}`}>
        <label htmlFor="usr" className="text-xs font-bold uppercase tracking-wider text-[#a6958a]">
          Username <span className="text-[11px] lowercase text-[#6e5d53] font-normal font-['Outfit',sans-serif] tracking-normal">(optional)</span>
        </label>
        <div className={`relative flex items-center w-full h-11 bg-[#1a120e] rounded-xl border ${errors.username ? 'border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-[#2c221a] focus-within:border-[#e66828]'} transition-all px-3.5`}>
          <div className="text-[#a6958a] mr-2.5 flex items-center justify-center pointer-events-none">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/></svg>
          </div>
          <input
            id="usr" type="text" placeholder="johndoe" value={data.username}
            onChange={e => updateData({ username: e.target.value })}
            className="w-full h-full bg-transparent text-sm font-medium font-['Outfit',sans-serif] tracking-normal text-[#f5f0eb] placeholder-[#5c4d43] border-none outline-none p-0"
          />
        </div>
        {errors.username && <p className="text-[11px] text-red-400 font-medium tracking-wide">Must be at least 3 characters long</p>}
      </div>

      {/* Email Field Wrapper */}
      <div className={`w-full flex flex-col gap-1.5 font-['Outfit',sans-serif] ${shake.email ? "animate-shake" : ""}`}>
        <label htmlFor="em" className="text-xs font-bold uppercase tracking-wider text-[#a6958a]">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className={`relative flex items-center w-full h-11 bg-[#1a120e] rounded-xl border ${errors.email ? 'border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-[#2c221a] focus-within:border-[#e66828]'} transition-all px-3.5`}>
          <div className="text-[#a6958a] mr-2.5 flex items-center justify-center pointer-events-none">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <input
            id="em" type="email" placeholder="you@example.com" value={data.email}
            onChange={e => updateData({ email: e.target.value })}
            className="w-full h-full bg-transparent text-sm font-medium font-['Outfit',sans-serif] tracking-normal text-[#f5f0eb] placeholder-[#5c4d43] border-none outline-none p-0"
          />
        </div>
        {errors.email && <p className="text-[11px] text-red-400 font-medium tracking-wide">Please enter a valid email address</p>}
      </div>
    </div>
  );
};