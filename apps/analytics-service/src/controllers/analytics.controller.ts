import { Request, Response, Router } from "express";
import { AggregationService } from "../services/aggregation.service.js";
import { logger } from "@repo/logger";

const log = logger.child({ service: "analytics-service" });
export const analyticsRouter = Router();
const aggregationService = new AggregationService();

analyticsRouter.get("/summary", async (_req: Request, res: Response) => {
  try {
    const [trends, demographics] = await Promise.all([
      aggregationService.getAppointmentVolumeTrends(),
      aggregationService.getConditionDemographics()
    ]);

    return res.json({
      trends,
      demographics
    });
  } catch (error) {
    log.error({ error }, "Failed to generate system-wide analytics summary aggregates.");
    return res.status(500).json({ error: "Internal Server Error" });
  }
});