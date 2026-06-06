"use client";

import React from "react";

interface StepTwoProps {
  data: any;
  updateData: (fields: any) => void;
  errors: any;
  shake: any;
}

export const StepTwoCompany: React.FC<StepTwoProps> = ({ data, updateData, errors, shake }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Company Name Field Wrapper */}
      <div className={`w-full flex flex-col gap-1.5 font-['Outfit',sans-serif] ${shake.company ? "animate-shake" : ""}`}>
        <label htmlFor="cmp" className="text-xs font-bold uppercase tracking-wider text-[#a6958a]">
          Company Name <span className="text-red-500">*</span>
        </label>
        <div className={`relative flex items-center w-full h-11 bg-[#1a120e] rounded-xl border ${errors.company ? 'border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-[#2c221a] focus-within:border-[#e66828]'} transition-all px-3.5`}>
          <div className="text-[#a6958a] mr-2.5 flex items-center justify-center pointer-events-none">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </div>
          <input
            id="cmp" type="text" placeholder="Acme Corp" value={data.company}
            onChange={e => updateData({ company: e.target.value })}
            className="w-full h-full bg-transparent text-sm font-medium font-['Outfit',sans-serif] tracking-normal text-[#f5f0eb] placeholder-[#5c4d43] border-none outline-none p-0"
          />
        </div>
        {errors.company && <p className="text-[11px] text-red-400 font-medium tracking-wide">Please enter your company name</p>}
      </div>

      {/* Designation Field Wrapper */}
      <div className={`w-full flex flex-col gap-1.5 font-['Outfit',sans-serif] ${shake.designation ? "animate-shake" : ""}`}>
        <label htmlFor="dsg" className="text-xs font-bold uppercase tracking-wider text-[#a6958a]">
          Designation <span className="text-red-500">*</span>
        </label>
        <div className={`relative flex items-center w-full h-11 bg-[#1a120e] rounded-xl border ${errors.designation ? 'border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'border-[#2c221a] focus-within:border-[#e66828]'} transition-all px-3.5`}>
          <div className="text-[#a6958a] mr-2.5 flex items-center justify-center pointer-events-none">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <input
            id="dsg" type="text" placeholder="Software Engineer" value={data.designation}
            onChange={e => updateData({ designation: e.target.value })}
            className="w-full h-full bg-transparent text-sm font-medium font-['Outfit',sans-serif] tracking-normal text-[#f5f0eb] placeholder-[#5c4d43] border-none outline-none p-0"
          />
        </div>
        {errors.designation && <p className="text-[11px] text-red-400 font-medium tracking-wide">Please enter your professional title</p>}
      </div>
    </div>
  );
};