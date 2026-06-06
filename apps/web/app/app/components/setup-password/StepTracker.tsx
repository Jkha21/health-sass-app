import React from 'react';

export default function StepTracker({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-0 mb-5 md:mb-[28px] animate-[fup_0.5s_ease_both]">
      {/* Step 1 */}
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 bg-[rgba(82,200,122,0.18)] border-[1.5px] border-[rgba(82,200,122,0.4)] text-[#52c87a]">
          <svg className="w-[11px] h-[11px] stroke-[#52c87a] stroke-[2.5]" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3"/></svg>
        </div>
        <span className="text-[11px] font-bold tracking-wider text-[#52c87a] hidden md:inline">Account Created</span>
      </div>
      <div className="flex-1 h-px bg-[rgba(82,200,122,0.35)] mx-1.5 md:mx-2 min-w-[12px] md:min-w-[16px]" />

      {/* Step 2 */}
      <div className="flex items-center gap-1.5">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
          currentStep >= 2 ? 'bg-[rgba(224,120,64,0.18)] border-[1.5px] border-[rgba(224,120,64,0.45)] text-[#e07840]' : 'bg-[rgba(255,255,255,0.038)] border-[1.5px] border-[rgba(190,140,90,0.14)] text-[#7a6858]'
        }`}>
          2
        </div>
        <span className={`text-[11px] font-bold tracking-wider hidden md:inline ${currentStep >= 2 ? 'text-[#e07840]' : 'text-[#7a6858]'}`}>Set Password</span>
      </div>
      <div className={`flex-1 h-px mx-1.5 md:mx-2 min-w-[12px] md:min-w-[16px] ${currentStep === 3 ? 'bg-[rgba(82,200,122,0.35)]' : 'bg-[rgba(190,140,90,0.14)]'}`} />

      {/* Step 3 */}
      <div className="flex items-center gap-1.5">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
          currentStep === 3 ? 'bg-[rgba(224,120,64,0.18)] border-[1.5px] border-[rgba(224,120,64,0.45)] text-[#e07840]' : 'bg-[rgba(255,255,255,0.038)] border-[1.5px] border-[rgba(190,140,90,0.14)] text-[#7a6858]'
        }`}>
          3
        </div>
        <span className={`text-[11px] font-bold tracking-wider hidden md:inline ${currentStep === 3 ? 'text-[#e07840]' : 'text-[#7a6858]'}`}>Get Started</span>
      </div>
    </div>
  );
}