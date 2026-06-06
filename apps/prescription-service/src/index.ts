import express from "express";
import { prescriptionRouter } from "./routes/prescription.route.js";
import { logger } from "@repo/logger";

const app = express();
const log = logger.child({ service: "prescription-service" });

app.use(express.json());
app.use("/api/prescriptions", prescriptionRouter);

const PORT = process.env.PORT || 4008;
app.listen(PORT, () => {
  log.info(`💊 Prescription lifecycle management engine active on port ${PORT}`);
});