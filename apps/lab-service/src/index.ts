import express from "express";
import { labResultsRouter } from "./routes/lab.routes.js";
import { logger } from "@repo/logger";

const app = express();
const log = logger.child({ service: "lab-service" });

app.use(express.json());

// 🔀 Mount the decoupled lab results routing tree
app.use("/api/labs", labResultsRouter);

const PORT = process.env.PORT || 4009;
app.listen(PORT, () => {
  log.info(`🔬 Lab & Diagnostics microservice safely listening on port ${PORT}`);
});