import { Request, Response } from "express";
import { PrescriptionService } from "../services/prescription.service.js";
import { logger } from "@repo/logger";

const log = logger.child({ service: "prescription-controller" });
const prescriptionService = new PrescriptionService();

/**
 * GET /api/prescriptions/patient/:patientId
 */
export const getPatientPrescriptions = async (req: Request, res: Response) => {
  const { patientId } = req.params;

  // Fixed: Guard check added to ensure patientId is present and strictly a string
  if (!patientId || typeof patientId !== "string") {
    return res.status(400).json({ error: "Missing or invalid patientId path parameter" });
  }

  try {
    // Now TypeScript guarantees 'patientId' cannot be undefined here
    const list = await prescriptionService.getPrescriptionsByPatient(patientId);
    return res.json({ success: true, data: list });
  } catch (error) {
    log.error({ error, patientId }, "Failed to get patient prescription history");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * POST /api/prescriptions/new
 */
export const createNewPrescription = async (req: Request, res: Response) => {
  const doctorUid = req.headers["x-user-uid"] as string; // Extracted safely from trusted gateway headers
  const { patientId, medication, dosage, frequency, duration, refills } = req.body;

  if (!patientId || !medication || !dosage) {
    return res.status(400).json({ error: "Missing required clinical parameters" });
  }

  try {
    log.info({ doctorUid, patientId }, "Issuing new pharmaceutical prescription record");
    const record = await prescriptionService.createPrescription({
      patientId,
      doctorUid,
      medication,
      dosage,
      frequency,
      duration,
      refills: refills || 0 // Safe: Accommodated perfectly by our updated PrescriptionService signature
    });

    return res.status(201).json({ success: true, data: record });
  } catch (error) {
    log.error({ error }, "Failed to write new prescription record entry");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};