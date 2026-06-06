export type PrescriptionStatus = "active" | "completed" | "expired" | "pending" | "cancelled";
export type RefillStatus = "available" | "low" | "out" | "na";
export type FrequencyType = "OD" | "BD" | "TDS" | "QDS" | "PRN" | "weekly" | "monthly";

export interface Medication {
  name: string;
  dose: string;
  frequency: FrequencyType;
  route: string;
  duration: string;
  instructions?: string;
}

export interface Prescription {
  id: string;
  patient: string;
  initials: string;
  patientId: string;
  doctor: string;
  specialty: string;
  issuedDate: string;
  expiryDate: string;
  status: PrescriptionStatus;
  refill: RefillStatus;
  refillsLeft: number;
  medications: Medication[];
  diagnosis: string;
  notes?: string;
  pharmacy?: string;
}
