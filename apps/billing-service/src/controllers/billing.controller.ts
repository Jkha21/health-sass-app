import { Request, Response } from "express";
import { BillingService } from "../services/billing.service.js";
import { logger } from "@repo/logger";

const log = logger.child({ service: "billing-controller" });
const billingService = new BillingService();

/**
 * GET /api/billing/patient/:patientId
 */
export const getPatientInvoices = async (req: Request, res: Response) => {
  const { patientId } = req.params;

  // Fix: Validate presence to narrow type from 'string | undefined' to 'string'
  if (!patientId) {
    return res.status(400).json({ error: "Missing required patient identification parameter" });
  }

  try {
    log.info({ patientId }, "Compiling financial invoice records ledger");
    const invoices = await billingService.getInvoicesByPatient(patientId);
    return res.json({ success: true, data: invoices });
  } catch (error) {
    log.error({ error, patientId }, "Failed to extract patient billing ledger entries");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * POST /api/billing/invoice
 */
export const createNewInvoice = async (req: Request, res: Response) => {
  const { patientId, amount, description } = req.body;

  if (!patientId || !amount) {
    return res.status(400).json({ error: "Missing required billing transaction parameters" });
  }

  try {
    log.info({ patientId, amount }, "Generating unique outstanding invoice item");
    const invoice = await billingService.createInvoice({ patientId, amount, description });
    return res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    log.error({ error }, "Failed to append new invoice entity entry");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};