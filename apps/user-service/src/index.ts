import express from "express";
import { userRouter } from "./routes/user.route.js";
import { logger } from "@repo/logger";

const app = express();
const log = logger.child({ service: "user-service" });

app.use(express.json());

// 🔀 Mount the separated profile routing layer
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 4010;
app.listen(PORT, () => {
  log.info(`👤 Core profile and user metadata service executing on port ${PORT}`);
});