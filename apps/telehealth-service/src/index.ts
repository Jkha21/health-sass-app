import express from "express";
import { telehealthRouter } from "./routes/telehealth.route.js";
import { logger } from "@repo/logger";

const app = express();
const log = logger.child({ service: "telehealth-service" });

app.use(express.json());

// 🔀 Mount the separated telehealth routes
app.use("/api/telehealth", telehealthRouter);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  log.info(`📹 Telehealth consultation management grid executing on port ${PORT}`);
});