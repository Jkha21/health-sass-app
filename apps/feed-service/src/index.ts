import express from "express";
import { feedRouter } from "./routes/feed.route.js";
import { logger } from "@repo/logger";

const app = express();
const log = logger.child({ service: "feed-service" });

app.use(express.json());

app.use("/api/feed", feedRouter);

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
  log.info(`📊 Dashboard Feed Service running live on port ${PORT}`);
});