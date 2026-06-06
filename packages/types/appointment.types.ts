export type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled";
export type AppointmentViewMode = "list" | "calendar";

export interface Appointment {
  id: string;
  patient: string; // Refers to Patient Name or ID depending on context
  initials: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: AppointmentStatus;
  room: string;
  notes?: string;
}