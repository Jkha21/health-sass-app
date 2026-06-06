import { PrescriptionStatus, RefillStatus, FrequencyType } from "./types";

export const STATUS_META: Record<PrescriptionStatus, { label: string; badgeCls: string; dotCls: string; barCls: string }> = {
  active:    { label: "Active",    badgeCls: "bg-green-100 text-green-700",  dotCls: "bg-green-500",   barCls: "from-green-300 to-green-500"   },
  completed: { label: "Completed", badgeCls: "bg-blue-100 text-blue-700",   dotCls: "bg-blue-500",    barCls: "from-blue-300 to-blue-500"     },
  expired:   { label: "Expired",   badgeCls: "bg-red-100 text-red-600",     dotCls: "bg-red-500",     barCls: "from-red-300 to-red-500"       },
  pending:   { label: "Pending",   badgeCls: "bg-yellow-100 text-yellow-700", dotCls: "bg-yellow-500", barCls: "from-yellow-200 to-yellow-400" },
  cancelled: { label: "Cancelled", badgeCls: "bg-gray-100 text-gray-500",   dotCls: "bg-gray-400",    barCls: "from-gray-200 to-gray-400"     },
};

export const REFILL_META: Record<RefillStatus, { label: string; cls: string }> = {
  available: { label: "Refill Available", cls: "bg-emerald-50 text-emerald-600 border-emerald-200"  },
  low:       { label: "Refill Low",       cls: "bg-amber-50 text-amber-600 border-amber-200"        },
  out:       { label: "No Refills",       cls: "bg-red-50 text-red-500 border-red-200"              },
  na:        { label: "No Refill",        cls: "bg-gray-50 text-gray-400 border-gray-200"           },
};

export const FREQ_LABEL: Record<FrequencyType, string> = {
  OD: "Once daily",
  BD: "Twice daily",
  TDS: "3× daily",
  QDS: "4× daily",
  PRN: "As needed",
  weekly: "Weekly",
  monthly: "Monthly",
};

export const FILTER_LABELS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "expired", label: "Expired" },
  { value: "cancelled", label: "Cancelled" },
] as const;
