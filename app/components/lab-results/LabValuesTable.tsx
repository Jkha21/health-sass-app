"use client";

import { LabValue, ResultStatus } from "./types";
import { STATUS_META } from "./constants";
import { TrendDownSvg, TrendStableSvg, TrendUpSvg } from "./icons";

function TrendBadge({ trend, status }: { trend?: "up" | "down" | "stable"; status: ResultStatus }) {
  if (!trend) return null;
  const isBad = status === "critical" || status === "abnormal";
  const color = trend === "stable" ? "text-gray-400" : isBad ? "text-red-500" : "text-green-600";
  return (
    <span className={`inline-flex items-center gap-0.5 ${color}`}>
      {trend === "up"     ? <TrendUpSvg />     : null}
      {trend === "down"   ? <TrendDownSvg />   : null}
      {trend === "stable" ? <TrendStableSvg /> : null}
    </span>
  );
}

export function LabValuesTable({ values }: { values: LabValue[] }) {
  if (values.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-orange-800/40 italic">
        Results pending — processing in progress.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="hidden sm:table w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-orange-100">
            <th className="py-2.5 px-3 text-[11px] font-semibold text-orange-800/50 uppercase tracking-wider w-[40%]">Parameter</th>
            <th className="py-2.5 px-3 text-[11px] font-semibold text-orange-800/50 uppercase tracking-wider w-[18%]">Value</th>
            <th className="py-2.5 px-3 text-[11px] font-semibold text-orange-800/50 uppercase tracking-wider w-[16%]">Unit</th>
            <th className="py-2.5 px-3 text-[11px] font-semibold text-orange-800/50 uppercase tracking-wider w-[20%]">Ref. Range</th>
            <th className="py-2.5 px-3 text-[11px] font-semibold text-orange-800/50 uppercase tracking-wider w-[6%]">Status</th>
          </tr>
        </thead>
        <tbody>
          {values.map((v, i) => {
            const s = STATUS_META[v.status];
            return (
              <tr key={i} className={`border-b border-orange-50 last:border-0 ${s.rowCls}`}>
                <td className="py-2.5 px-3">
                  <span className="text-[13px] font-semibold text-gray-800">{v.parameter}</span>
                </td>
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-display text-[14px] font-bold ${
                      v.status === "critical" ? "text-red-600" :
                      v.status === "abnormal" ? "text-amber-700" : "text-gray-800"
                    }`}>{v.value}</span>
                    <TrendBadge trend={v.trend} status={v.status} />
                    {v.prevValue && (
                      <span className="text-[10px] text-orange-800/35 hidden lg:inline">prev: {v.prevValue}</span>
                    )}
                  </div>
                </td>
                <td className="py-2.5 px-3 text-[12.5px] text-orange-800/60">{v.unit}</td>
                <td className="py-2.5 px-3 text-[12.5px] text-orange-800/50">{v.refRange}</td>
                <td className="py-2.5 px-3">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${s.badgeCls}`}>
                    <span className={`w-1 h-1 rounded-full ${s.dotCls}`}/>
                    {v.status === "normal" ? "✓" : v.status.charAt(0).toUpperCase()}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="sm:hidden space-y-2.5">
        {values.map((v, i) => {
          const s = STATUS_META[v.status];
          return (
            <div key={i} className={`rounded-xl border p-3.5 ${
              v.status === "critical" ? "border-red-200 bg-red-50/40" :
              v.status === "abnormal" ? "border-amber-200 bg-amber-50/40" :
              "border-orange-100 bg-orange-50/20"
            }`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[13px] font-semibold text-gray-800">{v.parameter}</span>
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${s.badgeCls}`}>
                  <span className={`w-1 h-1 rounded-full ${s.dotCls}`}/>
                  {s.label}
                </span>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className={`font-display text-[18px] font-extrabold ${
                    v.status === "critical" ? "text-red-600" :
                    v.status === "abnormal" ? "text-amber-700" : "text-gray-800"
                  }`}>{v.value}</span>
                  <span className="text-[12px] text-orange-800/50">{v.unit}</span>
                  <TrendBadge trend={v.trend} status={v.status} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-orange-800/40 font-medium">Ref range</p>
                  <p className="text-[12px] text-orange-800/60 font-semibold">{v.refRange}</p>
                </div>
              </div>
              {v.prevValue && (
                <p className="text-[10.5px] text-orange-800/35 mt-1.5">Previous: {v.prevValue} {v.unit}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
