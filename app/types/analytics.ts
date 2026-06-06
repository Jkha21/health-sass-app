// ─── Analytics Types ──────────────────────────────────────

export type Period = 7 | 30 | 90 | 365;

export type TrendDirection = "up" | "down" | "neutral";

export type ChangeClass = "change-up" | "change-down" | "change-neutral";

export interface PeriodDataset {
  labels: string[];
  volume: number[];
  volPrev: number[];
  billed: number[];
  collected: number[];
  types: AppointmentTypeData;
}

export interface AppointmentTypeData {
  general: number[];
  followUp: number[];
  specialist: number[];
  telehealth: number[];
}

export interface AnalyticsMetric {
  icon: string;
  change: string;
  changeClass: ChangeClass;
  value: string;
  label: string;
  sub: string;
}

export interface DiagnosisRow {
  name: string;
  patients: number;
  pct: number;
  trend: TrendDirection;
}

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

export interface ChartTooltipOptions {
  backgroundColor: string;
  titleColor: string;
  bodyColor: string;
  borderColor: string;
  borderWidth: number;
  padding: number;
  cornerRadius: number;
}