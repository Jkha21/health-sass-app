import React from 'react';

export default function SuccessState({ firstName }: { firstName: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-7 px-4 md:py-8">
      <div className="relative w-[68px] h-[68px] md:w-20 md:h-20 mx-auto mb-[18px] md:mb-6">
        <div className="w-full h-full rounded-full bg-[rgba(82,200,122,0.1)] border-[1.5px] border-[rgba(82,200,122,0.3)] flex items-center justify-center animate-[popIn_0.55s_cubic-bezier(0.17,0.67,0.35,1.3)_both]">
          <svg className="w-[30px] h-[30px] md:w-9 md:h-9 stroke-[#52c87a] stroke-2" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" style={{ strokeDasharray: 40, strokeDashoffset: 40, animation: 'draw 0.45s 0.4s ease forwards' }} />
          </svg>
        </div>
        
        {/* Orbital Celebration Ring Dots */}
        <div className="absolute w-2 h-2 rounded-full bg-[#e07840] top-1/2 left-1/2 -mt-1 -ml-1 animate-[orbit_1.4s_linear_0.5s_infinite]" style={{'--a': '0deg'} as React.CSSProperties}></div>
        <div className="absolute w-2 h-2 rounded-full bg-[#52c87a] top-1/2 left-1/2 -mt-1 -ml-1 animate-[orbit_1.4s_linear_0.65s_infinite]" style={{'--a': '72deg'} as React.CSSProperties}></div>
        <div className="absolute w-2 h-2 rounded-full bg-[#f5c030] top-1/2 left-1/2 -mt-1 -ml-1 animate-[orbit_1.4s_linear_0.8s_infinite]" style={{'--a': '144deg'} as React.CSSProperties}></div>
      </div>

      <h2 className="font-sans text-2xl md:text-[28px] font-black tracking-tight text-[#f0dcc8] mb-2 animate-[fup_0.5s_0.3s_ease_both]">
        You're All Set, <span className="text-[#e07840]">{firstName}</span>!
      </h2>
      <p className="text-[13px] md:text-[13.5px] text-[#7a6858] leading-[1.72] mb-[22px] md:mb-6 max-w-[320px] animate-[fup_0.5s_0.37s_ease_both]">
        Your Salford &amp; Co. account is now active. Start exploring your health dashboard and invite your team.
      </p>

      {/* Feature Action Items Pills */}
      <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-[22px] md:mb-[28px] animate-[fup_0.5s_0.43s_ease_both]">
        {['Analytics', 'Health Records', 'Team View', 'Smart Alerts'].map((feat, idx) => (
          <div key={idx} className="inline-flex items-center gap-1.5 text-[11.5px] md:text-xs font-semibold px-[11px] py-[5px] md:px-3 md:py-1.5 rounded-full bg-[rgba(255,255,255,0.038)] border border-[rgba(190,140,90,0.14)] text-[#7a6858]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e07840]" />
            {feat}
          </div>
        ))}
      </div>

      <a href="/salford-login" className="block w-full max-w-[300px] py-[14px] px-7 rounded-xl bg-[#e07840] text-white font-sans text-[15px] font-bold text-center mx-auto transition-all duration-200 hover:bg-[#e98a58] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(224,120,64,0.32)] animate-[fup_0.5s_0.5s_ease_both]">
        Go to Dashboard →
      </a>
    </div>
  );
}