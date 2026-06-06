import { Medication } from "./types";
import { FREQ_LABEL } from "./constants";
import { PillSvg } from "./icons";

interface MedicationRowProps {
  med: Medication;
  idx: number;
}

export function MedicationRow({ med, idx }: MedicationRowProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 py-3 ${idx > 0 ? "border-t border-orange-50" : ""}`}>
      <div className="flex items-start gap-2.5 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-orange-300 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
          <PillSvg />
        </div>
        <div className="min-w-0">
          <p className="font-display text-[14px] font-bold text-gray-800 leading-snug">{med.name}</p>
          <p className="text-[12px] text-orange-800/50 mt-0.5">{med.dose} · {med.route !== "—" ? med.route : "N/A"}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-0.5 pl-10 sm:pl-0 shrink-0">
        <span className="text-[11.5px] font-semibold text-orange-500 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-100 whitespace-nowrap">
          {FREQ_LABEL[med.frequency]}
        </span>
        <span className="text-[11px] text-orange-800/40 whitespace-nowrap sm:text-right">{med.duration}</span>
      </div>

      {med.instructions && (
        <p className="text-[11.5px] text-gray-500 leading-relaxed pl-10 sm:pl-0 sm:w-[220px] shrink-0 italic">
          {med.instructions}
        </p>
      )}
    </div>
  );
}
