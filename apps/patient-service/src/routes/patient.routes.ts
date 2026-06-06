import { Router } from "express";
import { getPatientProfile, createPatient } from "../controllers/patient.controller.js";

export const patientRouter = Router();

// 🛡️ Middleware specific to patient routes can go here
patientRouter.use((req, res, next) => {
  if (!req.headers["x-user-uid"]) return res.status(403).json({ error: "Forbidden" });
  next();
});

// 📍 Map URLs to the Controller functions
patientRouter.get("/profile/:id", getPatientProfile);
patientRouter.post("/new", createPatient);