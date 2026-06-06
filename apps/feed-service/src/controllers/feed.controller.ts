import { Request, Response } from "express";
import { FeedService } from "../services/feed.service.js";
import { logger } from "@repo/logger";

const log = logger.child({ service: "feed-controller" });
const feedService = new FeedService();

export class FeedController {
  /**
   * Compiles administrative metrics, newest entries, and high-priority notices
   * for the central dashboard landing feed
   */
  getDashboardFeed = async (_req: Request, res: Response): Promise<void> => {
    try {
      log.info("Aggregating multi-domain core dashboard metrics");
      
      const [stats, patients, alerts] = await Promise.all([
        feedService.getDashboardStats(),
        feedService.getRecentDashboardPatients(),
        feedService.getActiveAlerts()
      ]);

      res.json({
        stats,
        recentPatients: patients,
        alerts
      });
    } catch (error) {
      log.error({ error }, "Failed to compile system analytics dashboard feed.");
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export const feedController = new FeedController();