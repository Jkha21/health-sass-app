// ─── Shared Types ──────────────────────────────────────────
export type PatientStatus = "urgent" | "active" | "pending" | "complete";
export type ViewMode      = "grid"   | "list";

export interface Patient {
  id:        string;
  name:      string;
  initials:  string;
  status:    PatientStatus;
  condition: string;
  age:       number;
  location:  string;
  nextVisit: string;
  doctor:    string;
  ward:      string;
}

// ─── Status metadata ────────────────────────────────────────
export const STATUS_META: Record<PatientStatus, { label: string; badgeCls: string }> = {
  urgent:   { label: "High Priority", badgeCls: "bg-red-100 text-red-600"    },
  active:   { label: "Active",        badgeCls: "bg-green-100 text-green-700" },
  pending:  { label: "Pending",       badgeCls: "bg-yellow-50 text-yellow-700"},
  complete: { label: "Completed",     badgeCls: "bg-blue-100 text-blue-700"   },
};

// ─── Static patient data (replace with API/store) ───────────
export const PATIENTS: Patient[] = [
  { id: "P247891", name: "Sarah Mitchell", initials: "SM", status: "urgent",   condition: "Hypertension",          age: 41, location: "Bengaluru, KA", nextVisit: "Mar 25, 2026", doctor: "Dr. James",  ward: "Cardiology"  },
  { id: "P248012", name: "John Ramirez",   initials: "JR", status: "active",   condition: "Diabetes Type 2",       age: 35, location: "Mumbai, MH",    nextVisit: "Mar 26, 2026", doctor: "Dr. Patel",  ward: "Endocrine"   },
  { id: "P248103", name: "Emma Larson",    initials: "EL", status: "pending",  condition: "Respiratory Infection", age: 28, location: "Delhi, DL",     nextVisit: "Mar 27, 2026", doctor: "Dr. Kumar",  ward: "Pulmonary"   },
  { id: "P248204", name: "Raj Kumar",      initials: "RK", status: "complete", condition: "Osteoarthritis",        age: 52, location: "Chennai, TN",   nextVisit: "Apr 02, 2026", doctor: "Dr. James",  ward: "Orthopedic"  },
  { id: "P248305", name: "Lisa Park",      initials: "LP", status: "active",   condition: "Thyroid Disorder",      age: 44, location: "Pune, MH",      nextVisit: "Mar 28, 2026", doctor: "Dr. Nair",   ward: "Endocrine"   },
  { id: "P248406", name: "Arjun Mehta",    initials: "AM", status: "urgent",   condition: "Coronary Artery",       age: 58, location: "Hyderabad, TG", nextVisit: "Mar 20, 2026", doctor: "Dr. Patel",  ward: "ICU"         },
  { id: "P248507", name: "Priya Sharma",   initials: "PS", status: "active",   condition: "Migraine",              age: 31, location: "Bengaluru, KA", nextVisit: "Apr 01, 2026", doctor: "Dr. Kumar",  ward: "Neurology"   },
  { id: "P248608", name: "David Chen",     initials: "DC", status: "pending",  condition: "Back Pain",             age: 47, location: "Kolkata, WB",   nextVisit: "Mar 29, 2026", doctor: "Dr. James",  ward: "Orthopedic"  },
];

// ─── Component exports ──────────────────────────────────────
export { default as PatientDetailsPage} from "./PatientDetailsPage";
export { default as PatientProfile }    from "./PatientProfile";
export { default as AppointmentsList }  from "./AppointmentsList";
export { default as MedicalHistory }    from "./MedicalHistory";