import { Router } from "express";
import { getPatientPrescriptions, createNewPrescription } from "../controllers/prescription.controller.js";

export const prescriptionRouter = Router();

// 🛡️ Gateway Edge Verification Barrier
prescriptionRouter.use((req, res, next) => {
  if (!req.headers["x-user-uid"]) {
    return res.status(403).json({ error: "Direct network access forbidden. Route through API Gateway." });
  }
  next();
});

// 📍 Route Map Definitions
prescriptionRouter.get("/patient/:patientId", getPatientPrescriptions);
prescriptionRouter.post("/new", createNewPrescription);