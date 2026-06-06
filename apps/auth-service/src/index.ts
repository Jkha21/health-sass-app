import express from "express";
// Fixed the import path to target your routes instead of the controller directly
import { authRouter } from "./routes/auth.route.js"; 
import { logger } from "@repo/logger";

const app = express();
const log = logger.child({ service: "auth-service" });

// Middleware parsing incoming JSON payloads
app.use(express.json());

// Namespace your identity provider endpoints
app.use("/auth", authRouter);

const PORT = process.env.PORT || 4006;
app.listen(PORT, () => {
  log.info(`🔑 Cryptographic Identity Provider running live on port ${PORT}`);
});