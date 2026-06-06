import { Router } from "express";
import { feedController } from "../controllers/feed.controller.js";

export const feedRouter = Router();

feedRouter.get("/dashboard", feedController.getDashboardFeed);