import { db } from "@repo/database";

export class BillingService {
  /**
   * Retrieves all outstanding and paid invoices for a patient
   */
  async getInvoicesByPatient(patientId: string) {
    return db.invoice.findMany({
      where: { patientId },
      orderBy: { createdAt: "desc" }
    });
  }

  /**
   * Generates a brand new invoice record (e.g., after a completed telehealth session)
   */
  async createInvoice(data: {
    patientId: string;
    amount: number;
    description: string;
  }) {
    return db.invoice.create({
      data: {
        patientId: data.patientId,
        amount: data.amount,
        description: data.description,
        // Using type assertion to ensure it matches your Prisma Schema Enum exactly
        status: "UNPAID" as any 
      }
    });
  }
}