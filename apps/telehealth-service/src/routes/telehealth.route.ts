import { Router } from "express";
import { getMySessions, startSession } from "../controllers/telehealth.controller.js";

export const telehealthRouter = Router();

// 🛡️ Gateway Edge Verification Barrier
telehealthRouter.use((req, res, next) => {
  if (!req.headers["x-user-uid"]) {
    return res.status(403).json({ error: "Direct network access forbidden. Route through API Gateway." });
  }
  next();
});

// 📍 Operational Endpoint Maps
telehealthRouter.get("/my-sessions", getMySessions);
telehealthRouter.post("/activate/:appointmentId", startSession);