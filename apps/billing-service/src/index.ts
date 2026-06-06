import express from "express";
import { logger } from "@repo/logger";
import { billingRouter } from "./routes/billing.route.js";

const app = express();
const log = logger.child({ service: "billing-service" });
const PORT = process.env.PORT || 4007;

// 1. Global Inbound Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Global Request Logging Middleware
app.use((req, res, next) => {
  log.info({ method: req.method, url: req.url }, "Inbound network request intercepted");
  next();
});

// 3. Service Level Diagnostics Checkpoint
app.get("/health", (_req, res) => {
  return res.json({ 
    status: "UP", 
    service: "billing-service",
    timestamp: new Date().toISOString()
  });
});

// 4. Mount Mapped Financial Domain Router
// Matches the controller path requirements: /api/billing/patient/:patientId
app.use("/api/billing", billingRouter);

// 5. Catch-All Route Unmapped Fallback
app.use((_req, res) => {
  return res.status(404).json({ error: "Requested financial endpoint path not found" });
});

// 6. Centralized Microservice Error Interceptor Guard
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  log.error({ err }, "Unhandled application runtime exception caught");
  return res.status(500).json({ error: "Internal Server Error" });
});

// 7. Initialize Application Cluster Execution Listener
app.listen(PORT, () => {
  log.info(`💳 Financial billing microservice engine spinning online at port ${PORT}`);
});