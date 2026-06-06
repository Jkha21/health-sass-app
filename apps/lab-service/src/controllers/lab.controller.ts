import { Request, Response } from "express";
import { LabService } from "../services/lab.service.js"; // NodeNext ESM extension rule
import { logger } from "@repo/logger";

const log = logger.child({ service: "lab-results-controller" });
const labService = new LabService();

/**
 * GET /api/labs/pending
 */
export const getPendingRequests = async (req: Request, res: Response) => {
  try {
    log.info("Fetching queue of pending lab results");
    const pending = await labService.getPendingResults();
    
    return res.json({
      success: true,
      count: pending.length,
      data: pending,
    });
  } catch (error) {
    log.error({ error }, "Error parsing pending lab results list");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * GET /api/labs/patient/:patientId
 */
export const getPatientLabs = async (req: Request, res: Response) => {
  const { patientId } = req.params;

  if (!patientId) {
    return res.status(400).json({ error: "Missing required patient identification parameter" });
  }

  try {
    log.info({ patientId }, "Compiling lab result history chart");
    const results = await labService.getResultsByPatient(patientId);
    
    return res.json({
      success: true,
      patientId,
      data: results,
    });
  } catch (error) {
    log.error({ error, patientId }, "Failed to extract patient lab results payload");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};