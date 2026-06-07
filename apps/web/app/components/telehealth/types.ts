export type SessionStatus = "live" | "scheduled" | "completed" | "missed" | "cancelled";
export type SessionType = "video" | "audio" | "chat";
export type ConsultType = "initial" | "followup" | "emergency";

export interface TelehealthSession {
  id: string;
  patientId: string;
  patient: string;
  initials: string;
  age: number;
  doctor: string;
  specialty: string;
  reason: string;
  date: string;
  time: string;
  duration: number;
  status: SessionStatus;
  sessionType: SessionType;
  consultType: ConsultType;
  platform: string;
  rating?: number;
  notes?: string;
  recordingUrl?: string;
  waitTime?: string;
}