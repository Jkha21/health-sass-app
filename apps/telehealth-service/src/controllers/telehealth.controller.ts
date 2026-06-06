import { Request, Response } from "express";
import { TelehealthService } from "../services/telehealth.service.js";
import { logger } from "@repo/logger";

const log = logger.child({ service: "telehealth-controller" });
const telehealthService = new TelehealthService();

/**
 * GET /api/telehealth/my-sessions
 */
export const getMySessions = async (req: Request, res: Response) => {
  const userUid = req.headers["x-user-uid"] as string;
  // Infer client type dynamically from the token matrix array parsed at the gateway
  const userRoles = req.headers["x-user-roles"] ? JSON.parse(req.headers["x-user-roles"] as string) : [];
  const role = userRoles.includes("DOCTOR") ? "doctor" : "patient";

  try {
    log.info({ userUid, role }, "Retrieving upcoming virtual appointment sessions queue");
    const sessions = await telehealthService.getUserSessions(userUid, role);
    return res.json({ success: true, data: sessions });
  } catch (error) {
    log.error({ error, userUid }, "Failed to extract active virtual sessions data");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * POST /api/telehealth/activate/:appointmentId
 */
export const startSession = async (req: Request, res: Response) => {
  const { appointmentId } = req.params;

  if (!appointmentId) {
    return res.status(400).json({ error: "Missing session identification key pointer" });
  }

  try {
    log.info({ appointmentId }, "Provisioning live audio-visual link routing tokens");
    const record = await telehealthService.initializeSession(appointmentId);
    return res.json({ success: true, data: record });
  } catch (error) {
    log.error({ error, appointmentId }, "Failed to allocate room infrastructure configurations");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};