export type RecordType    = "lab"      | "imaging"   | "prescription" | "discharge" | "consultation" | "vaccination";
export type RecordStatus  = "normal"   | "abnormal"  | "critical"     | "pending"   | "reviewed";
export type ViewMode      = "grid"     | "list";

export interface MedicalRecord {
  id:          string;
  patient:     string;
  initials:    string;
  patientId:   string;
  type:        RecordType;
  title:       string;
  date:        string;
  doctor:      string;
  department:  string;
  status:      RecordStatus;
  summary:     string;
  tags:        string[];
  fileSize?:   string;
  pages?:      number;
}

export const TYPE_META: Record<RecordType, { label: string; icon: string; color: string; bg: string }> = {
  lab:          { label: "Lab Report",    icon: "🧪", color: "text-purple-600", bg: "bg-purple-50 border-purple-100" },
  imaging:      { label: "Imaging",       icon: "🩻", color: "text-blue-600",   bg: "bg-blue-50 border-blue-100"     },
  prescription: { label: "Prescription",  icon: "💊", color: "text-green-600",  bg: "bg-green-50 border-green-100"   },
  discharge:    { label: "Discharge",     icon: "🏥", color: "text-orange-600", bg: "bg-orange-50 border-orange-100" },
  consultation: { label: "Consultation",  icon: "📋", color: "text-teal-600",   bg: "bg-teal-50 border-teal-100"     },
  vaccination:  { label: "Vaccination",   icon: "💉", color: "text-pink-600",   bg: "bg-pink-50 border-pink-100"     },
};

export const STATUS_META: Record<RecordStatus, { label: string; badgeCls: string; dotCls: string }> = {
  normal:   { label: "Normal",   badgeCls: "bg-green-100 text-green-700",   dotCls: "bg-green-500"   },
  abnormal: { label: "Abnormal", badgeCls: "bg-yellow-100 text-yellow-700", dotCls: "bg-yellow-500"  },
  critical: { label: "Critical", badgeCls: "bg-red-100 text-red-600",       dotCls: "bg-red-500"     },
  pending:  { label: "Pending",  badgeCls: "bg-gray-100 text-gray-600",     dotCls: "bg-gray-400"    },
  reviewed: { label: "Reviewed", badgeCls: "bg-blue-100 text-blue-700",     dotCls: "bg-blue-500"    },
};