// ─── Patients Types ───────────────────────────────────────

export type PatientStatus = "urgent" | "active" | "pending" | "complete";

export type ViewMode = "grid" | "list";

export type StatusFilter = PatientStatus | "all";

export interface Patient {
  id: string;
  name: string;
  initials: string;
  status: PatientStatus;
  condition: string;
  age: number;
  location: string;
  nextVisit: string;
  doctor: string;
  ward: string;
}

export interface PatientStatusMeta {
  label: string;
  cls: string;
  bar: string;
}

export interface PatientFilters {
  search: string;
  status: StatusFilter;
  view: ViewMode;
}

export interface PatientStats {
  total: number;
  active: number;
  urgent: number;
}