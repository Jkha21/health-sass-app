import { ResultStatus, LabCategory } from "./types";

export const STATUS_META: Record<ResultStatus, { label: string; badgeCls: string; dotCls: string; rowCls: string; barCls: string }> = {
  normal:   { label: "Normal",   badgeCls: "bg-green-100 text-green-700",   dotCls: "bg-green-500",   rowCls: "",                              barCls: "from-green-300 to-green-500"  },
  abnormal: { label: "Abnormal", badgeCls: "bg-amber-100 text-amber-700",   dotCls: "bg-amber-500",   rowCls: "bg-amber-50/50",                barCls: "from-amber-300 to-amber-500"  },
  critical: { label: "Critical", badgeCls: "bg-red-100 text-red-600",       dotCls: "bg-red-500",     rowCls: "bg-red-50/60",                  barCls: "from-red-400 to-red-600"      },
  pending:  { label: "Pending",  badgeCls: "bg-gray-100 text-gray-500",     dotCls: "bg-gray-400",    rowCls: "bg-gray-50/50",                 barCls: "from-gray-200 to-gray-400"    },
};

export const CATEGORY_META: Record<LabCategory, { label: string; icon: string; color: string; bg: string }> = {
  haematology:    { label: "Haematology",    icon: "🩸", color: "text-red-600",    bg: "bg-red-50 border-red-100"    },
  biochemistry:   { label: "Biochemistry",   icon: "🧬", color: "text-blue-600",   bg: "bg-blue-50 border-blue-100"  },
  microbiology:   { label: "Microbiology",   icon: "🦠", color: "text-green-600",  bg: "bg-green-50 border-green-100"},
  immunology:     { label: "Immunology",     icon: "🛡️", color: "text-purple-600", bg: "bg-purple-50 border-purple-100"},
  endocrinology:  { label: "Endocrinology",  icon: "⚗️", color: "text-teal-600",   bg: "bg-teal-50 border-teal-100"  },
  cardiology:     { label: "Cardiology",     icon: "❤️", color: "text-rose-600",   bg: "bg-rose-50 border-rose-100"  },
};

export const PRIORITY_META = {
  routine: { label: "Routine", cls: "bg-gray-100 text-gray-500" },
  urgent:  { label: "Urgent",  cls: "bg-amber-100 text-amber-700" },
  stat:    { label: "STAT",    cls: "bg-red-100 text-red-600 font-extrabold" },
};
