import { Router } from "express";
import { getMyProfile, updateMyProfile } from "../controllers/user.controller.js";

export const userRouter = Router();

// 🛡️ Gateway Edge Verification Guard
userRouter.use((req, res, next) => {
  if (!req.headers["x-user-uid"]) {
    return res.status(403).json({ error: "Direct network access forbidden. Route through API Gateway." });
  }
  next();
});

// 📍 Mapped Endpoint Trees
userRouter.get("/profile", getMyProfile);
userRouter.patch("/profile", updateMyProfile);