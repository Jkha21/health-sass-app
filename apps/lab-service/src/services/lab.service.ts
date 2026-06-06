import { db } from "@repo/database";

export class LabService {
  /**
   * Retrieves all verified lab results for a specific patient
   */
  async getResultsByPatient(patientId: string) {
    return db.medicalRecord.findMany({
      where: {
        patientId,
        type: "lab",
      },
      orderBy: { date: "desc" },
    });
  }

  /**
   * Retrieves lab requests that are still pending processing/reviews
   */
  async getPendingResults() {
    return db.medicalRecord.findMany({
      where: {
        type: "lab",
        status: "pending",
      },
      orderBy: { date: "asc" },
      take: 25,
    });
  }

  /**
   * Updates a lab result status (e.g., signing off on a pending report)
   */
  async updateResultStatus(recordId: string, status: "pending" | "reviewed" | "critical") {
    return db.medicalRecord.update({
      where: { id: recordId },
      data: { status },
    });
  }
}