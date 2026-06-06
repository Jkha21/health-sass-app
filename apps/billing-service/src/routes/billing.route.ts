import { Router } from "express";
import { getPatientInvoices, createNewInvoice } from "../controllers/billing.controller.js";

export const billingRouter = Router();

// 🛡️ Gateway Edge Verification Guard
billingRouter.use((req, res, next) => {
  if (!req.headers["x-user-uid"]) {
    return res.status(403).json({ error: "Direct network access forbidden. Route through API Gateway." });
  }
  next();
});

// 📍 Mapped Financial Endpoint Paths
billingRouter.get("/patient/:patientId", getPatientInvoices);
billingRouter.post("/invoice", createNewInvoice);