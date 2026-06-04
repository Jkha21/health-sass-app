"use client";

import React, { useState } from "react";

interface StepThreeProps {
  data: any;
  updateData: (fields: any) => void;
  errors: any;
  shake: any;
  hintText: string;
}

export const StepThreeSecurity: React.FC<StepThreeProps> = ({ data, updateData, errors, shake, hintText }) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Password Field Wrapper */}
      <div className={`w-full flex flex-col gap-1.5 font-['Outfit',sans-serif] ${shake.password ? "animate-shake" : ""}`}>
        <label htmlFor="pw" className="text-xs font-bold uppercase tracking-wider text-[#a6958a]">
          Password <span className="text-red-500">*</span>
        </label>
        <div className={`relative flex items-center w-full h-11 bg-[#1a120e] rounded-xl border ${errors.password ? 'border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-[#2c221a] focus-within:border-[#e66828]'} transition-all px-3.5 pr-10`}>
          <div className="text-[#a6958a] mr-2.5 flex items-center justify-center pointer-events-none">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <input
            id="pw" type={showPass ? "text" : "password"} placeholder="••••••••" value={data.password}
            onChange={e => updateData({ password: e.target.value })}
            className="w-full h-full bg-transparent text-sm font-medium font-['Outfit',sans-serif] tracking-normal text-[#f5f0eb] placeholder-[#5c4d43] border-none outline-none p-0"
          />
          <button 
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a6958a] hover:text-[#e66828] transition-colors bg-transparent border-none p-0 cursor-pointer flex items-center" 
            type="button" tabIndex={-1} onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        </div>
        {!errors.password && <p className="text-[11px] text-[#6e5d53] tracking-wide">Password must be at least 6 characters long</p>}
        {errors.password && <p className="text-[11px] text-red-400 font-medium tracking-wide">Password must be at least 6 characters long</p>}
      </div>

      {/* Confirm Password Field Wrapper */}
      <div className={`w-full flex flex-col gap-1.5 font-['Outfit',sans-serif] ${shake.confirmPassword ? "animate-shake" : ""}`}>
        <label htmlFor="cpw" className="text-xs font-bold uppercase tracking-wider text-[#a6958a]">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <div className={`relative flex items-center w-full h-11 bg-[#1a120e] rounded-xl border ${errors.confirmPassword ? 'border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-[#2c221a] focus-within:border-[#e66828]'} transition-all px-3.5 pr-10`}>
          <div className="text-[#a6958a] mr-2.5 flex items-center justify-center pointer-events-none">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <input
            id="cpw" type={showConfirmPass ? "text" : "password"} placeholder="••••••••" value={data.confirmPassword}
            onChange={e => updateData({ confirmPassword: e.target.value })}
            className="w-full h-full bg-transparent text-sm font-medium font-['Outfit',sans-serif] tracking-normal text-[#f5f0eb] placeholder-[#5c4d43] border-none outline-none p-0"
          />
          <button 
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a6958a] hover:text-[#e66828] transition-colors bg-transparent border-none p-0 cursor-pointer flex items-center" 
            type="button" tabIndex={-1} onClick={() => setShowConfirmPass(!showConfirmPass)}
          >
            {showConfirmPass ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        </div>
        {hintText && <p className="text-[11px] text-red-400 font-medium tracking-wide">{hintText}</p>}
      </div>
    </div>
  );
};