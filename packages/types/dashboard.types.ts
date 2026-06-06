// Prefixed to isolate from the root PatientStatus entity mapping
export type DashboardPatientStatus = "active" | "pending" | "priority" | "complete";
export type AlertLevel = "urgent" | "warning" | "info";
export type ScheduleStatus = "now" | "upcoming" | "done";

export interface MetricCard {
  icon: string;
  trend: string;
  trendClass: "trend-up" | "trend-down" | "trend-neutral";
  value: string;
  label: string;
}

export interface DashboardPatient {
  initials: string;
  name: string;
  age: number;
  reason: string;
  time: string;
  status: DashboardPatientStatus;
}

export interface DashboardAlert {
  level: AlertLevel;
  title: string;
  sub: string;
  time: string;
}

export interface ScheduleItem {
  time: string;
  name: string;
  type: string;
  status: ScheduleStatus;
}

export interface DashboardStats {
  activePatients: number;
  appointments: number;
  priorityAlerts: number;
  completedToday: number;
}