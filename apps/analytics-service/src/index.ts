import express from "express";
import { analyticsRouter } from "./controllers/analytics.controller.js";
import { logger } from "@repo/logger";

const app = express();
const log = logger.child({ service: "analytics-service" });

app.use(express.json());

app.use("/api/analytics", analyticsRouter);

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  log.info(`📈 Analytics Aggregation Service processing data on port ${PORT}`);
});