import express from "express";
import { logger } from "@repo/logger";
import { patientRouter } from "./routes/patient.routes.js";

const app = express();
const log = logger.child({ service: "patient-service" });

// Global Middleware
app.use(express.json());

// 🔀 Route Mounting (Connecting the separated route file)
// Every route inside patientRouter will automatically be prefixed with /api/patients
app.use("/api/patients", patientRouter);

// Start the server
const PORT = 4001;
app.listen(PORT, () => {
  log.info(`🩺 Patient Service running on port ${PORT}`);
});