"use client";

import React, { useState, useMemo } from "react";
import AppLayout from "../components/common/AppLayout";

/* ─── Types ─────────────────────────────────────────────── */
type ResultStatus   = "normal" | "abnormal" | "critical" | "pending";
type LabCategory    = "haematology" | "biochemistry" | "microbiology" | "immunology" | "endocrinology" | "cardiology";
type TrendDirection = "up" | "down" | "stable";

interface LabValue {
  parameter:  string;
  value:      string;
  unit:       string;
  refRange:   string;
  status:     ResultStatus;
  trend?:     TrendDirection;
  prevValue?: string;
}

interface LabResult {
  id:          string;
  patient:     string;
  initials:    string;
  patientId:   string;
  doctor:      string;
  department:  string;
  category:    LabCategory;
  testName:    string;
  orderedDate: string;
  reportedDate:string;
  status:      ResultStatus;
  priority:    "routine" | "urgent" | "stat";
  lab:         string;
  values:      LabValue[];
  notes?:      string;
  interpretation?: string;
}

/* ─── Mock data ─────────────────────────────────────────── */
const LAB_RESULTS: LabResult[] = [
  {
    id: "LB-3041", patient: "Sarah Mitchell", initials: "SM", patientId: "P247891",
    doctor: "Dr. James Carter", department: "Cardiology",
    category: "haematology", testName: "Complete Blood Count (CBC)",
    orderedDate: "2026-04-09", reportedDate: "2026-04-10",
    status: "abnormal", priority: "routine", lab: "Metropolis Labs",
    values: [
      { parameter: "Haemoglobin",  value: "10.8",  unit: "g/dL",      refRange: "12.0 – 16.0",  status: "abnormal", trend: "down",   prevValue: "11.4" },
      { parameter: "WBC Count",   value: "11.2",  unit: "×10⁹/L",    refRange: "4.0 – 11.0",   status: "abnormal", trend: "up",     prevValue: "9.8"  },
      { parameter: "Platelets",   value: "245",   unit: "×10⁹/L",    refRange: "150 – 400",    status: "normal",   trend: "stable"                    },
      { parameter: "RBC Count",   value: "3.9",   unit: "×10¹²/L",   refRange: "4.0 – 5.5",    status: "abnormal", trend: "down",   prevValue: "4.1"  },
      { parameter: "Haematocrit", value: "34.2",  unit: "%",          refRange: "36.0 – 46.0",  status: "abnormal"                                     },
      { parameter: "MCV",         value: "87.6",  unit: "fL",         refRange: "80.0 – 100.0", status: "normal"                                       },
    ],
    notes: "Mild normocytic anaemia noted. WBC mildly elevated — consider infection or inflammation.",
    interpretation: "Findings suggest mild anaemia combined with possible inflammatory process. Recommend iron studies, CRP and peripheral blood smear. Clinical correlation advised.",
  },
  {
    id: "LB-3042", patient: "Arjun Mehta", initials: "AM", patientId: "P248406",
    doctor: "Dr. Priya Patel", department: "Cardiology",
    category: "cardiology", testName: "Cardiac Enzyme Panel",
    orderedDate: "2026-04-13", reportedDate: "2026-04-13",
    status: "critical", priority: "stat", lab: "Apollo Diagnostics",
    values: [
      { parameter: "Troponin I",   value: "4.82",  unit: "ng/mL",     refRange: "< 0.04",       status: "critical", trend: "up",   prevValue: "0.89" },
      { parameter: "CK-MB",        value: "68.4",  unit: "U/L",       refRange: "< 25",         status: "critical", trend: "up",   prevValue: "22.0" },
      { parameter: "BNP",          value: "420",   unit: "pg/mL",     refRange: "< 100",        status: "critical"                                   },
      { parameter: "LDH",          value: "310",   unit: "U/L",       refRange: "120 – 246",    status: "abnormal", trend: "up",   prevValue: "198"  },
    ],
    notes: "STAT result — notified Dr. Patel immediately. Patient in CCU.",
    interpretation: "Markedly elevated troponin I and CK-MB consistent with acute myocardial infarction. Immediate cardiology intervention required. Serial monitoring every 4 hours.",
  },
  {
    id: "LB-3043", patient: "John Ramirez", initials: "JR", patientId: "P248012",
    doctor: "Dr. Priya Patel", department: "Endocrinology",
    category: "biochemistry", testName: "HbA1c & Glucose Panel",
    orderedDate: "2026-04-10", reportedDate: "2026-04-11",
    status: "abnormal", priority: "routine", lab: "SRL Diagnostics",
    values: [
      { parameter: "HbA1c",           value: "8.4",   unit: "%",       refRange: "< 5.7",         status: "abnormal", trend: "up",   prevValue: "7.9" },
      { parameter: "Fasting Glucose", value: "148",   unit: "mg/dL",   refRange: "70 – 99",       status: "abnormal", trend: "up",   prevValue: "132" },
      { parameter: "Post-prandial",   value: "224",   unit: "mg/dL",   refRange: "< 140",         status: "abnormal"                                  },
      { parameter: "C-Peptide",       value: "1.8",   unit: "ng/mL",   refRange: "0.8 – 3.1",     status: "normal"                                   },
      { parameter: "Insulin",         value: "14.2",  unit: "µU/mL",   refRange: "2.6 – 24.9",    status: "normal"                                   },
    ],
    interpretation: "HbA1c worsening — suboptimal glycaemic control. Medication review and dietary counselling recommended.",
  },
  {
    id: "LB-3044", patient: "Lisa Park", initials: "LP", patientId: "P248305",
    doctor: "Dr. Meera Nair", department: "Endocrinology",
    category: "endocrinology", testName: "Thyroid Function Tests",
    orderedDate: "2026-04-11", reportedDate: "2026-04-12",
    status: "critical", priority: "urgent", lab: "Thyrocare",
    values: [
      { parameter: "TSH",     value: "0.01",  unit: "mU/L",    refRange: "0.4 – 4.0",   status: "critical", trend: "down",  prevValue: "0.08" },
      { parameter: "Free T4", value: "38.4",  unit: "pmol/L",  refRange: "10.0 – 22.0", status: "critical", trend: "up",    prevValue: "28.0" },
      { parameter: "Free T3", value: "11.2",  unit: "pmol/L",  refRange: "3.5 – 6.5",   status: "critical", trend: "up",    prevValue: "7.8"  },
      { parameter: "Anti-TPO",value: "320",   unit: "IU/mL",   refRange: "< 35",         status: "abnormal"                                   },
    ],
    notes: "Critical thyroid values — Dr. Nair contacted urgently.",
    interpretation: "Severe hyperthyroidism. Significantly suppressed TSH with markedly elevated free thyroid hormones. Urgent endocrinology review. Consider antithyroid medication.",
  },
  {
    id: "LB-3045", patient: "David Chen", initials: "DC", patientId: "P248608",
    doctor: "Dr. James Carter", department: "Cardiology",
    category: "biochemistry", testName: "Lipid Panel",
    orderedDate: "2026-04-06", reportedDate: "2026-04-07",
    status: "abnormal", priority: "routine", lab: "Metropolis Labs",
    values: [
      { parameter: "Total Cholesterol", value: "6.4",  unit: "mmol/L", refRange: "< 5.2",         status: "abnormal", trend: "up",    prevValue: "5.9" },
      { parameter: "LDL Cholesterol",   value: "4.8",  unit: "mmol/L", refRange: "< 3.4",         status: "abnormal", trend: "up",    prevValue: "4.2" },
      { parameter: "HDL Cholesterol",   value: "0.9",  unit: "mmol/L", refRange: "> 1.0",         status: "abnormal", trend: "down",  prevValue: "1.1" },
      { parameter: "Triglycerides",     value: "2.8",  unit: "mmol/L", refRange: "< 1.7",         status: "abnormal"                                   },
      { parameter: "Non-HDL",           value: "5.5",  unit: "mmol/L", refRange: "< 4.2",         status: "abnormal"                                   },
    ],
    interpretation: "Atherogenic dyslipidaemia. High CVD risk profile. Statin therapy and dietary modification strongly recommended.",
  },
  {
    id: "LB-3046", patient: "Priya Sharma", initials: "PS", patientId: "P248507",
    doctor: "Dr. Arun Kumar", department: "Neurology",
    category: "biochemistry", testName: "Comprehensive Metabolic Panel",
    orderedDate: "2026-04-07", reportedDate: "2026-04-08",
    status: "normal", priority: "routine", lab: "SRL Diagnostics",
    values: [
      { parameter: "Sodium",     value: "139", unit: "mmol/L",  refRange: "136 – 145",  status: "normal" },
      { parameter: "Potassium",  value: "4.1", unit: "mmol/L",  refRange: "3.5 – 5.0",  status: "normal" },
      { parameter: "Creatinine", value: "78",  unit: "µmol/L",  refRange: "44 – 97",    status: "normal" },
      { parameter: "eGFR",       value: "88",  unit: "mL/min",  refRange: "> 60",        status: "normal" },
      { parameter: "ALT",        value: "24",  unit: "U/L",     refRange: "7 – 40",     status: "normal" },
      { parameter: "AST",        value: "28",  unit: "U/L",     refRange: "10 – 40",    status: "normal" },
    ],
    interpretation: "All values within normal reference ranges. Renal and hepatic function satisfactory.",
  },
  {
    id: "LB-3047", patient: "Fatima Al-Said", initials: "FA", patientId: "P248911",
    doctor: "Dr. Arun Kumar", department: "Neurology",
    category: "haematology", testName: "HbA1c & Glucose Panel",
    orderedDate: "2026-04-15", reportedDate: "2026-04-16",
    status: "pending", priority: "routine", lab: "Thyrocare",
    values: [],
    notes: "Sample received. Processing in progress.",
  },
  {
    id: "LB-3048", patient: "Raj Kumar", initials: "RK", patientId: "P248204",
    doctor: "Dr. James Carter", department: "Orthopedics",
    category: "immunology", testName: "Inflammatory Markers",
    orderedDate: "2026-04-08", reportedDate: "2026-04-09",
    status: "abnormal", priority: "urgent", lab: "Apollo Diagnostics",
    values: [
      { parameter: "CRP",          value: "48.2",  unit: "mg/L",    refRange: "< 5.0",   status: "abnormal", trend: "down", prevValue: "82.0" },
      { parameter: "ESR",          value: "68",    unit: "mm/hr",   refRange: "0 – 20",  status: "abnormal", trend: "down", prevValue: "95"   },
      { parameter: "Procalcitonin",value: "0.18",  unit: "ng/mL",   refRange: "< 0.25",  status: "normal",   trend: "down", prevValue: "0.42" },
      { parameter: "Fibrinogen",   value: "4.8",   unit: "g/L",     refRange: "2.0 – 4.0",status:"abnormal"                                  },
    ],
    interpretation: "Elevated inflammatory markers trending downward. Post-operative inflammatory response. Continue current management.",
  },
];

/* ─── Config ─────────────────────────────────────────────── */
const STATUS_META: Record<ResultStatus, { label: string; badgeCls: string; dotCls: string; rowCls: string; barCls: string }> = {
  normal:   { label: "Normal",   badgeCls: "bg-green-100 text-green-700",   dotCls: "bg-green-500",   rowCls: "",                              barCls: "from-green-300 to-green-500"  },
  abnormal: { label: "Abnormal", badgeCls: "bg-amber-100 text-amber-700",   dotCls: "bg-amber-500",   rowCls: "bg-amber-50/50",                barCls: "from-amber-300 to-amber-500"  },
  critical: { label: "Critical", badgeCls: "bg-red-100 text-red-600",       dotCls: "bg-red-500",     rowCls: "bg-red-50/60",                  barCls: "from-red-400 to-red-600"      },
  pending:  { label: "Pending",  badgeCls: "bg-gray-100 text-gray-500",     dotCls: "bg-gray-400",    rowCls: "bg-gray-50/50",                 barCls: "from-gray-200 to-gray-400"    },
};

const CATEGORY_META: Record<LabCategory, { label: string; icon: string; color: string; bg: string }> = {
  haematology:    { label: "Haematology",    icon: "🩸", color: "text-red-600",    bg: "bg-red-50 border-red-100"    },
  biochemistry:   { label: "Biochemistry",   icon: "🧬", color: "text-blue-600",   bg: "bg-blue-50 border-blue-100"  },
  microbiology:   { label: "Microbiology",   icon: "🦠", color: "text-green-600",  bg: "bg-green-50 border-green-100"},
  immunology:     { label: "Immunology",     icon: "🛡️", color: "text-purple-600", bg: "bg-purple-50 border-purple-100"},
  endocrinology:  { label: "Endocrinology",  icon: "⚗️", color: "text-teal-600",   bg: "bg-teal-50 border-teal-100"  },
  cardiology:     { label: "Cardiology",     icon: "❤️", color: "text-rose-600",   bg: "bg-rose-50 border-rose-100"  },
};

const PRIORITY_META = {
  routine: { label: "Routine", cls: "bg-gray-100 text-gray-500" },
  urgent:  { label: "Urgent",  cls: "bg-amber-100 text-amber-700" },
  stat:    { label: "STAT",    cls: "bg-red-100 text-red-600 font-extrabold" },
};

/* ─── SVGs ──────────────────────────────────────────────── */
const SearchSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8a888" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const TrendUpSvg = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);
const TrendDownSvg = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
  </svg>
);
const TrendStableSvg = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="2" y1="12" x2="22" y2="12"/>
  </svg>
);
const PlusSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const DownloadSvg = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const ChevronSvg = ({ open }: { open: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

/* ─── Trend indicator ───────────────────────────────────── */
function TrendBadge({ trend, status }: { trend?: TrendDirection; status: ResultStatus }) {
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

/* ─── Lab Values Table ──────────────────────────────────── */
function LabValuesTable({ values }: { values: LabValue[] }) {
  if (values.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-orange-800/40 italic">
        Results pending — processing in progress.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      {/* Desktop table */}
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

      {/* Mobile stacked cards */}
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

/* ─── Lab Result Card ───────────────────────────────────── */
function LabResultCard({ result, idx, onSelect }: {
  result: LabResult;
  idx: number;
  onSelect: (r: LabResult) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const s  = STATUS_META[result.status];
  const c  = CATEGORY_META[result.category];
  const p  = PRIORITY_META[result.priority];
  const isCritical  = result.status === "critical";
  const abnormals   = result.values.filter(v => v.status === "abnormal" || v.status === "critical").length;

  return (
    <div
      style={{ animationDelay: `${idx * 0.04}s` }}
      className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-[0_12px_40px_rgba(232,85,32,.12)]
        ${isCritical ? "border-red-200 shadow-[0_4px_20px_rgba(239,68,68,.10)]" : "border-orange-900/[.07] shadow-[0_4px_20px_rgba(232,85,32,.06)]"}`}
    >
      {/* Critical pulse ring */}
      {isCritical && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-red-300/30 animate-pulse pointer-events-none" />
      )}

      {/* Top accent bar */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${s.barCls}`} />

      {/* Card header */}
      <div className="px-5 pt-4 pb-3.5">
        <div className="flex items-start gap-3">
          {/* Category icon */}
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 border ${c.bg}`}>
            {c.icon}
          </div>

          {/* Title block */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-display text-[12.5px] font-bold text-orange-500">#{result.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.cls}`}>{p.label}</span>
                  {isCritical && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-500 text-white animate-pulse">
                      🚨 CRITICAL
                    </span>
                  )}
                </div>
                <p className="font-display text-[15px] font-bold text-gray-800 leading-snug">{result.testName}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 ${s.badgeCls}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${s.dotCls}`}/>
                {s.label}
              </span>
            </div>

            {/* Sub info row */}
            <div className="flex items-center gap-2 flex-wrap text-[11.5px] text-orange-800/50">
              <span className={`font-semibold ${c.color}`}>{c.label}</span>
              <span>·</span>
              <span>{result.lab}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">
                {new Date(result.reportedDate).toLocaleDateString("en", { day:"numeric", month:"short", year:"numeric" })}
              </span>
            </div>
          </div>
        </div>

        {/* Patient row */}
        <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-[11px] font-bold text-white shrink-0">
              {result.initials}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-gray-800 truncate">{result.patient}</p>
              <p className="text-[11px] text-orange-800/40">{result.doctor}</p>
            </div>
          </div>
          {/* Abnormal count badge */}
          {abnormals > 0 && (
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
              isCritical ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700"
            }`}>
              {abnormals} out-of-range
            </span>
          )}
        </div>
      </div>

      {/* Expand toggle strip */}
      {result.status !== "pending" && (
        <div
          className="px-5 py-2.5 bg-orange-50/60 border-y border-orange-100 flex items-center justify-between cursor-pointer hover:bg-orange-50 transition-colors select-none"
          onClick={() => setExpanded(v => !v)}
        >
          <div className="flex items-center gap-2">
            <span className="text-[12.5px] font-semibold text-gray-700">
              {result.values.length} parameter{result.values.length !== 1 ? "s" : ""}
            </span>
            {/* Mini value previews */}
            <div className="hidden sm:flex items-center gap-1.5">
              {result.values.slice(0, 3).map((v, i) => (
                <span key={i} className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_META[v.status].badgeCls}`}>
                  {v.parameter.split(" ")[0]}: {v.value}
                </span>
              ))}
              {result.values.length > 3 && (
                <span className="text-[10.5px] text-orange-800/40 font-medium">+{result.values.length - 3} more</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-orange-500 font-semibold">{expanded ? "Collapse" : "View Results"}</span>
            <ChevronSvg open={expanded} />
          </div>
        </div>
      )}

      {/* Expanded values */}
      {expanded && (
        <div className="px-4 sm:px-5 py-4 border-b border-orange-50">
          <LabValuesTable values={result.values} />

          {/* Interpretation */}
          {result.interpretation && (
            <div className={`mt-4 rounded-xl px-4 py-3.5 border ${
              isCritical ? "bg-red-50 border-red-100" : "bg-blue-50 border-blue-100"
            }`}>
              <p className={`text-[10px] font-semibold uppercase tracking-wider mb-1.5 ${isCritical ? "text-red-600" : "text-blue-600"}`}>
                Clinical Interpretation
              </p>
              <p className={`text-[12.5px] leading-relaxed ${isCritical ? "text-red-900" : "text-blue-900"}`}>
                {result.interpretation}
              </p>
            </div>
          )}

          {/* Notes */}
          {result.notes && (
            <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <p className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider mb-1">Lab Notes</p>
              <p className="text-[12.5px] text-amber-900 leading-relaxed">{result.notes}</p>
            </div>
          )}
        </div>
      )}

      {/* Card footer */}
      <div className="px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-[11px] text-orange-800/40 flex-wrap">
          <span>Ordered {new Date(result.orderedDate).toLocaleDateString("en", { day:"numeric", month:"short" })}</span>
          {result.status !== "pending" && (
            <>
              <span>·</span>
              <span>Reported {new Date(result.reportedDate).toLocaleDateString("en", { day:"numeric", month:"short" })}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          {result.status !== "pending" && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fdf3ec] border border-[#e8c8a8] text-orange-500 text-[11.5px] font-semibold transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500">
              <DownloadSvg /> Report
            </button>
          )}
          <button
            onClick={() => onSelect(result)}
            className="w-8 h-8 rounded-lg bg-[#fdf3ec] border border-[#e8c8a8] flex items-center justify-center text-sm text-orange-500 transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Detail Modal ──────────────────────────────────────── */
function LabResultModal({ result, onClose }: { result: LabResult; onClose: () => void }) {
  const s  = STATUS_META[result.status];
  const c  = CATEGORY_META[result.category];
  const p  = PRIORITY_META[result.priority];
  const isCritical = result.status === "critical";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div
        className="relative z-10 w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden shrink-0">
          <div className="w-10 h-1 rounded-full bg-orange-200" />
        </div>

        {/* Modal header */}
        <div className={`px-6 py-5 shrink-0 ${isCritical
          ? "bg-gradient-to-r from-red-600 to-red-400"
          : "bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300"}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/25 flex items-center justify-center text-2xl shrink-0">
                {c.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[12px] font-bold text-white/70">#{result.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white`}>{p.label}</span>
                  {isCritical && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white text-red-600 animate-pulse">🚨 CRITICAL</span>
                  )}
                </div>
                <p className="font-display text-[17px] font-extrabold text-white leading-snug">{result.testName}</p>
                <p className="text-[12px] text-white/70 mt-0.5">{c.label} · {result.lab}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-xl hover:bg-white/30 shrink-0">×</button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-5 sm:px-6 py-5 space-y-5">

          {/* Critical alert */}
          {isCritical && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3.5">
              <span className="text-xl shrink-0">🚨</span>
              <div>
                <p className="font-display text-[13px] font-bold text-red-700">Critical Result — Immediate Action Required</p>
                <p className="text-[12px] text-red-600 mt-0.5">{result.notes}</p>
              </div>
            </div>
          )}

          {/* Patient + meta row */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center font-display text-[14px] font-bold text-white">
                {result.initials}
              </div>
              <div>
                <p className="font-semibold text-[14.5px] text-gray-800">{result.patient}</p>
                <p className="text-[11px] text-orange-800/50">{result.doctor} · {result.department}</p>
              </div>
            </div>
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${s.badgeCls}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${s.dotCls}`}/>{s.label}
            </span>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {[
              { label: "Ordered",   value: new Date(result.orderedDate).toLocaleDateString("en", { day:"numeric", month:"long", year:"numeric" }) },
              { label: "Reported",  value: result.status === "pending" ? "Pending" : new Date(result.reportedDate).toLocaleDateString("en", { day:"numeric", month:"long", year:"numeric" }) },
              { label: "Category",  value: c.label },
              { label: "Lab",       value: result.lab },
              { label: "Priority",  value: p.label },
              { label: "Patient ID",value: `#${result.patientId}` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-orange-50/70 rounded-xl px-3.5 py-2.5">
                <p className="text-[10px] text-orange-800/50 font-semibold uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-[12.5px] text-gray-800 font-semibold leading-snug">{value}</p>
              </div>
            ))}
          </div>

          {/* Results table */}
          <div>
            <p className="text-[11px] text-orange-800/50 font-semibold uppercase tracking-wider mb-3">
              Test Parameters ({result.values.length})
            </p>
            <div className="bg-orange-50/30 rounded-xl border border-orange-100 overflow-hidden px-3 sm:px-4 py-2">
              <LabValuesTable values={result.values} />
            </div>
          </div>

          {/* Interpretation */}
          {result.interpretation && (
            <div className={`rounded-xl px-4 py-4 border ${isCritical ? "bg-red-50 border-red-100" : "bg-blue-50 border-blue-100"}`}>
              <p className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${isCritical ? "text-red-600" : "text-blue-600"}`}>
                Clinical Interpretation
              </p>
              <p className={`text-[13px] leading-relaxed ${isCritical ? "text-red-900" : "text-blue-900"}`}>
                {result.interpretation}
              </p>
            </div>
          )}

          {/* Notes */}
          {result.notes && !isCritical && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3.5">
              <p className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider mb-1.5">Lab Notes</p>
              <p className="text-[13px] text-amber-900 leading-relaxed">{result.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2.5 pt-1 pb-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-display text-[13px] font-semibold hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(232,85,32,.35)] transition-all">
              <DownloadSvg /> Download Report
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-orange-200 bg-orange-50 text-orange-500 font-display text-[13px] font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all">
              Order Follow-up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── LabResultsPage ─────────────────────────────────────── */
export default function LabResultsPage() {
  const [searchQ,        setSearchQ]        = useState("");
  const [statusFilter,   setStatusFilter]   = useState<ResultStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<LabCategory | "all">("all");
  const [selected,       setSelected]       = useState<LabResult | null>(null);

  /* Stats */
  const criticalCount = LAB_RESULTS.filter(r => r.status === "critical").length;
  const abnormalCount = LAB_RESULTS.filter(r => r.status === "abnormal").length;
  const pendingCount  = LAB_RESULTS.filter(r => r.status === "pending").length;
  const statCount     = LAB_RESULTS.filter(r => r.priority === "stat").length;

  /* Filtered + sorted (critical first) */
  const filtered = useMemo(() => {
    const q = searchQ.toLowerCase().trim();
    return LAB_RESULTS
      .filter(r => {
        const matchQ = !q ||
          r.patient.toLowerCase().includes(q)  ||
          r.id.toLowerCase().includes(q)        ||
          r.testName.toLowerCase().includes(q)  ||
          r.doctor.toLowerCase().includes(q)    ||
          r.lab.toLowerCase().includes(q);
        const matchS = statusFilter   === "all" || r.status   === statusFilter;
        const matchC = categoryFilter === "all" || r.category === categoryFilter;
        return matchQ && matchS && matchC;
      })
      .sort((a, b) => {
        const pri = { critical:0, abnormal:1, pending:2, normal:3 };
        if (pri[a.status] !== pri[b.status]) return pri[a.status] - pri[b.status];
        return b.reportedDate.localeCompare(a.reportedDate);
      });
  }, [searchQ, statusFilter, categoryFilter]);

  return (
    <AppLayout
      title="Lab Results"
      activeItem="lab-results"
      breadcrumbs={[{ label: "Dashboard" }, { label: "Lab Results" }]}
    >
      {/* ══ Hero ════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-6 sm:px-8 py-6 sm:py-7 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/[.07]" />
        <div className="relative z-10">
          <h1 className="font-display text-2xl sm:text-[26px] font-extrabold text-white leading-tight mb-1">
            Lab Results
          </h1>
          <p className="text-sm text-white/75">
            {criticalCount} critical · {abnormalCount} abnormal · {pendingCount} pending
          </p>
        </div>
        <div className="relative z-10 flex gap-2.5 flex-wrap">
          {[
            { num: LAB_RESULTS.length, label: "Total"    },
            { num: criticalCount,      label: "Critical"  },
            { num: abnormalCount,      label: "Abnormal"  },
            { num: pendingCount,       label: "Pending"   },
          ].map(({ num, label }) => (
            <div key={label} className="rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 text-center min-w-[58px]">
              <div className="font-display text-xl sm:text-2xl font-extrabold text-white leading-none">{num}</div>
              <div className="text-[9.5px] sm:text-[10px] text-white/70 mt-0.5 whitespace-nowrap">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ Critical alert banner ═══════════════════════════ */}
      {criticalCount > 0 && statusFilter === "all" && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3.5 mb-5 animate-pulse">
          <span className="text-xl shrink-0">🚨</span>
          <div>
            <p className="font-display text-[13px] font-bold text-red-700">
              {criticalCount} Critical Result{criticalCount !== 1 ? "s" : ""} — Immediate Review Required
            </p>
            <p className="text-[12px] text-red-600 mt-0.5">
              Urgent clinical action needed. Results are displayed at the top of the list.
            </p>
          </div>
        </div>
      )}

      {/* ══ Status quick-filter tabs ═════════════════════════ */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1 scrollbar-none">
        {([
          ["all",      "All Results",  LAB_RESULTS.length],
          ["critical", "Critical",     criticalCount],
          ["abnormal", "Abnormal",     abnormalCount],
          ["normal",   "Normal",       LAB_RESULTS.filter(r=>r.status==="normal").length],
          ["pending",  "Pending",      pendingCount],
        ] as [ResultStatus | "all", string, number][]).map(([val, label, count]) => (
          <button
            key={val}
            onClick={() => setStatusFilter(val)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-semibold whitespace-nowrap border transition-all shrink-0
              ${statusFilter === val
                ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white border-orange-500 shadow-[0_3px_10px_rgba(232,85,32,.25)]"
                : "bg-white border-[#e8c8a8] text-orange-800/60 hover:border-orange-400"}`}
          >
            {val !== "all" && <span className={`w-1.5 h-1.5 rounded-full ${STATUS_META[val as ResultStatus].dotCls}`}/>}
            {label}
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${statusFilter === val ? "bg-white/20" : "bg-orange-50"}`}>{count}</span>
          </button>
        ))}
      </div>

      {/* ══ Category + search toolbar ═══════════════════════ */}
      <div className="bg-white rounded-2xl border border-orange-900/[.06] shadow-[0_8px_32px_rgba(232,85,32,.08)] px-4 sm:px-5 py-3.5 mb-5 space-y-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Search */}
          <div className="flex items-center gap-2 bg-[#fdf8f2] border border-[#e8c8a8] rounded-xl px-3.5 py-2.5 flex-1 min-w-[160px] transition-all focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10">
            <SearchSvg />
            <input
              type="text"
              placeholder="Search patient, test, doctor…"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              className="bg-transparent border-none outline-none text-[13.5px] text-gray-800 placeholder:text-[#c8a888] w-full"
            />
          </div>
          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value as LabCategory | "all")}
            className="px-3.5 py-2.5 border border-[#e8c8a8] rounded-xl bg-white text-[13px] text-gray-800 outline-none cursor-pointer focus:border-orange-500 flex-1 sm:flex-none max-w-[180px]"
          >
            <option value="all">All Categories</option>
            <option value="haematology">🩸 Haematology</option>
            <option value="biochemistry">🧬 Biochemistry</option>
            <option value="cardiology">❤️ Cardiology</option>
            <option value="endocrinology">⚗️ Endocrinology</option>
            <option value="immunology">🛡️ Immunology</option>
            <option value="microbiology">🦠 Microbiology</option>
          </select>

          <span className="text-[13px] text-orange-800/50 font-medium whitespace-nowrap hidden sm:block">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>

          {/* Order new test */}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-display text-[13px] font-semibold transition-all hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(232,85,32,.35)] whitespace-nowrap ml-auto">
            <PlusSvg /><span className="hidden sm:inline">Order Test</span><span className="sm:hidden">Order</span>
          </button>
        </div>
      </div>

      {/* ══ Category chip row ═══════════════════════════════ */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-1 px-1 scrollbar-none">
        <button
          onClick={() => setCategoryFilter("all")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-semibold whitespace-nowrap border transition-all shrink-0
            ${categoryFilter === "all" ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white border-orange-500 shadow-[0_3px_10px_rgba(232,85,32,.25)]" : "bg-white border-[#e8c8a8] text-orange-800/60 hover:border-orange-400"}`}
        >All</button>
        {(Object.entries(CATEGORY_META) as [LabCategory, typeof CATEGORY_META[LabCategory]][]).map(([cat, meta]) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-semibold whitespace-nowrap border transition-all shrink-0
              ${categoryFilter === cat ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white border-orange-500 shadow-[0_3px_10px_rgba(232,85,32,.25)]" : "bg-white border-[#e8c8a8] text-orange-800/60 hover:border-orange-400"}`}
          >
            <span>{meta.icon}</span>
            <span className="hidden xs:inline">{meta.label}</span>
          </button>
        ))}
      </div>

      {/* ══ Empty state ════════════════════════════════════ */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-[#e8c8a8]">
          <div className="text-5xl mb-4">🔬</div>
          <div className="font-display text-lg font-bold text-gray-800 mb-1">No lab results found</div>
          <div className="text-sm text-orange-800/50">Try adjusting your search or filters</div>
        </div>
      )}

      {/* ══ Results list ═══════════════════════════════════ */}
      <div className="space-y-4">
        {filtered.map((result, i) => (
          <LabResultCard key={result.id} result={result} idx={i} onSelect={setSelected} />
        ))}
      </div>

      {/* ══ Detail modal ═══════════════════════════════════ */}
      {selected && (
        <LabResultModal result={selected} onClose={() => setSelected(null)} />
      )}
    </AppLayout>
  );
}