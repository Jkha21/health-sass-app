import { db } from "@repo/database";

export class AggregationService {
  /**
   * Computes historical trends comparing total appointments month-over-month
   */
  async getAppointmentVolumeTrends() {
    const records = await db.appointment.findMany({
      select: { createdAt: true },
      orderBy: { createdAt: "asc" }
    });

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const trendMap: Record<string, number> = {};

    records.forEach(rec => {
      const date = new Date(rec.createdAt);
      const monthLabel = `${months[date.getMonth()]} ${date.getFullYear()}`;
      trendMap[monthLabel] = (trendMap[monthLabel] || 0) + 1;
    });

    return Object.entries(trendMap).map(([name, total]) => ({
      name,
      total
    }));
  }

  /**
   * Aggregates patient medical conditions to help clinics track core caseload profiles
   */
  async getConditionDemographics() {
    const patients = await db.patient.findMany({
      select: { condition: true }
    });

    const distribution: Record<string, number> = {};
    patients.forEach(p => {
      const condition = p.condition || "Unassigned";
      distribution[condition] = (distribution[condition] || 0) + 1;
    });

    return Object.entries(distribution).map(([value, count]) => ({
      name: value,
      value: count
    }));
  }
}