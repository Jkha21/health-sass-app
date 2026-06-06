import React from "react";

interface RecordStatsProps {
  totalCount: number;
  recentCount: number;
  criticalCount: number;
  pendingCount: number;
}

export function RecordStats({ totalCount, recentCount, criticalCount, pendingCount }: RecordStatsProps) {
  return (
    <div className="relative z-10 flex gap-2.5 flex-wrap">
      {[
        { num: totalCount,    label: "Total"    },
        { num: recentCount,   label: "This Week" },
        { num: criticalCount, label: "Critical"  },
        { num: pendingCount,  label: "Pending"   },
      ].map(({ num, label }) => (
        <div key={label} className="rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 text-center min-w-[56px]">
          <div className="font-display text-xl sm:text-2xl font-extrabold text-white leading-none">{num}</div>
          <div className="text-[9.5px] sm:text-[10px] text-white/70 mt-0.5 whitespace-nowrap">{label}</div>
        </div>
      ))}
    </div>
  );
}