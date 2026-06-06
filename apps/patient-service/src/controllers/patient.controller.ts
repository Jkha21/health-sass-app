import { Request, Response } from "express";
import { db } from "@repo/database";
import { logger } from "@repo/logger";

const log = logger.child({ service: "patient-controller" });

// Export simple async functions, NOT routers
export const getPatientProfile = async (req: Request, res: Response) => {
  try {
    const patient = await db.patient.findUnique({ where: { id: req.params.id } });
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    
    return res.json({ profile: patient });
  } catch (error) {
    log.error({ error }, "Failed to fetch patient");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createPatient = async (req: Request, res: Response) => {
  // Logic to create a patient...
  res.status(201).json({ message: "Patient created successfully" });
};