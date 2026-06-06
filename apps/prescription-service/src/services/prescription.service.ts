import { db } from "@repo/database";

export class PrescriptionService {
  /**
   * Fetch all active and historical prescriptions for a patient
   */
  async getPrescriptionsByPatient(patientId: string) {
    return db.prescription.findMany({
      where: { patientId },
      orderBy: { createdAt: "desc" }
    });
  }

  /**
   * Issue a brand new prescription to a patient
   */
  async createPrescription(data: {
    patientId: string;
    doctorUid: string;
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    refills?: number; 
    notes?: string;   
  }) {
    return db.prescription.create({
      data: {
        patientId: data.patientId,
        doctor: data.doctorUid,
        medication: data.medication,
        dosage: data.dosage,
        frequency: data.frequency,
        duration: data.duration,
        notes: data.notes ?? null,
        
      }
    });
  }
}