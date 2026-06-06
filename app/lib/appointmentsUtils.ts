import { Appointment } from "../types/appointments";

export const TODAY = "2026-04-13";

export function groupByDate(list: Appointment[]): Record<string, Appointment[]> {
  return list.reduce((acc, a) => {
    (acc[a.date] ??= []).push(a);
    return acc;
  }, {} as Record<string, Appointment[]>);
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  if (dateStr === TODAY) return "Today";
  const tomorrow = new Date(TODAY + "T00:00:00");
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (dateStr === tomorrow.toISOString().split("T")[0]) return "Tomorrow";
  return d.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" });
}

export function getWeekDays(anchor: string): string[] {
  const d = new Date(anchor + "T00:00:00");
  const day = d.getDay(); // 0=Sun
  const mon = new Date(d);
  mon.setDate(d.getDate() - ((day + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const dt = new Date(mon);
    dt.setDate(mon.getDate() + i);
    return dt.toISOString().split("T")[0];
  });
}