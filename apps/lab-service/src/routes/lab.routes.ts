import { Router } from "express";
import { getPendingRequests, getPatientLabs } from "../controllers/lab.controller.js";

export const labResultsRouter = Router();

// 🛡️ Gateway Trust Middleware: Rejects any direct pings bypassing the proxy
labResultsRouter.use((req, res, next) => {
  const userUid = req.headers["x-user-uid"];
  if (!userUid) {
    return res.status(403).json({ error: "Direct network access forbidden. Route through API Gateway." });
  }
  next();
});

// 📍 Resource Endpoint Mappings
// Base prefix "/api/labs" is attached downstream in the primary index entrypoint
labResultsRouter.get("/pending", getPendingRequests);
labResultsRouter.get("/patient/:patientId", getPatientLabs);