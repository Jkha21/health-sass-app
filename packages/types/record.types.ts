export type RecordType = "lab" | "imaging" | "prescription" | "discharge" | "consultation" | "vaccination";
export type RecordStatus = "normal" | "abnormal" | "critical" | "pending" | "reviewed";
export type RecordViewMode = "grid" | "list";

export interface MedicalRecord {
  id: string;
  patient: string;
  initials: string;
  patientId: string;
  type: RecordType;
  title: string;
  date: string;
  doctor: string;
  department: string;
  status: RecordStatus;
  summary: string;
  tags: string[];
  fileSize?: string;
  pages?: number;
}