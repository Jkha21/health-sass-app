export type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled";

export type ViewMode = "list" | "calendar";

export interface Appointment {
  id:        string;
  patient:   string;
  initials:  string;
  doctor:    string;
  specialty: string;
  date:      string;         // "2026-04-14"
  time:      string;         // "09:30 AM"
  duration:  number;         // minutes
  type:      string;
  status:    AppointmentStatus;
  room:      string;
  notes?:    string;
}

export const STATUS_META: Record<AppointmentStatus, { label: string; badgeCls: string; dotCls: string }> = {
  confirmed:  { label: "Confirmed",  badgeCls: "bg-green-100 text-green-700",  dotCls: "bg-green-500"  },
  pending:    { label: "Pending",    badgeCls: "bg-yellow-100 text-yellow-700", dotCls: "bg-yellow-500" },
  completed:  { label: "Completed",  badgeCls: "bg-blue-100 text-blue-700",    dotCls: "bg-blue-500"   },
  cancelled:  { label: "Cancelled",  badgeCls: "bg-red-100 text-red-600",      dotCls: "bg-red-500"    },
};