import { Request, Response, Router } from "express";
import { db } from "@repo/database";
import { logger } from "@repo/logger";
import { cryptoEngine } from "../services/crypto.service.js";

const log = logger.child({ service: "auth-service" });
export const authRouter = Router();

authRouter.get("/.well-known/jwks.json", (_req: Request, res: Response) => {
  res.json(cryptoEngine.getJwks());
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const staffUser = await db.user.findFirst({ where: { email } });

    if (!staffUser || password !== "supersecret-dev-pass") {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Fixed to use the exact matching names from your schema.prisma file
    const userPayload = {
      uid: staffUser.uid,          // Changed from staffUser.id
      displayName: staffUser.displayName,  // Changed from staffUser.name
      email: staffUser.email,
      photoURL: staffUser.photoURL // Connected directly to database field
    };

    const token = cryptoEngine.issueUserToken(userPayload);

    log.info({ uid: staffUser.uid }, "Successfully signed cryptographically backed token"); // Changed from staffUser.id
    return res.json({ token, user: userPayload });
  } catch (error) {
    log.error({ error }, "Identity provider login execution crashed");
    return res.status(500).json({ error: "Internal Server Error" });
  }
});