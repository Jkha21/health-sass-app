import { db } from "@repo/database";
import { 
  DashboardStats, 
  DashboardPatient, 
  DashboardAlert 
} from "@repo/types/dashboard.types.js";

export class FeedService {
  async getDashboardStats(): Promise<DashboardStats> {
    const [activeCount, totalAppointments, urgentAlerts] = await Promise.all([
      db.patient.count({ where: { status: 'active' } }),
      db.appointment.count(),
      db.patient.count({ where: { status: 'urgent' } })
    ]);

    return {
      activePatients: activeCount,
      appointments: totalAppointments,
      priorityAlerts: urgentAlerts,
      completedToday: 0 
    };
  }

  async getRecentDashboardPatients(): Promise<DashboardPatient[]> {
    const recentPatients = await db.patient.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    return recentPatients.map(p => ({
      initials: p.initials,
      name: p.name,
      age: p.age,
      reason: p.condition,
      time: p.nextVisit,
      status: p.status === 'urgent' ? 'priority' : p.status
    }));
  }

  async getActiveAlerts(): Promise<DashboardAlert[]> {
    const criticalRecords = await db.medicalRecord.findMany({
      where: { status: 'critical' },
      take: 3,
      orderBy: { date: 'desc' }
    });

    return criticalRecords.map(r => ({
      level: 'urgent',
      title: `Critical ${r.type} Result`,
      sub: `${r.patientName}: ${r.title}`,
      time: r.date
    }));
  }
}