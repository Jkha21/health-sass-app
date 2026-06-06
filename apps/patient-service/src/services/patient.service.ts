import { db } from "@repo/database";

export interface CreatePatientInput {
  name: string;
  initials: string;
  condition: string;
  age: number;
  location: string;
  nextVisit: string;
  doctor: string;
  ward: string;
  status?: "urgent" | "active" | "pending" | "complete";
}

export class PatientService {
  /**
   * Retrieves a unique patient record by their primary identifier
   */
  async getPatientById(id: string) {
    return db.patient.findUnique({
      where: { id },
      include: {
        appointments: true,
        medicalRecords: true,
        telehealthSessions: true,
      },
    });
  }

  /**
   * Creates and persists a brand new patient record in the database
   */
  async createPatient(data: CreatePatientInput) {
    return db.patient.create({
      data: {
        name: data.name,
        initials: data.initials,
        condition: data.condition,
        age: data.age,
        location: data.location,
        nextVisit: data.nextVisit,
        doctor: data.doctor,
        ward: data.ward,
        status: data.status ?? "active",
      },
    });
  }
}