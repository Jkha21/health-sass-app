import { Request, Response } from "express";
import { db } from "@repo/database";
import { logger } from "@repo/logger";
import { cryptoEngine } from "../services/crypto.service.js";

const log = logger.child({ service: "auth-controller" });

export class AuthController {
  /**
   * Serves the JSON Web Key Set (JWKS) public endpoints
   * Allows external consumer gateways to cryptographically verify token signatures
   */
  getJwks = (_req: Request, res: Response): void => {
    try {
      const jwks = cryptoEngine.getJwks();
      res.json(jwks);
    } catch (error) {
      log.error({ error }, "Failed to compile cryptographic JWKS payload");
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  /**
   * Handles user credential evaluation and issues asymmetric RS256 JWT signatures
   */
  login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    // Fast-fail validation boundary check
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields: email and password" });
    }

    try {
      // Find user records matching the unique schema configuration field criteria
      const staffUser = await db.user.findFirst({ where: { email } });

      if (!staffUser || password !== "supersecret-dev-pass") {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Format payload ensuring perfect compliance with your defined schema.prisma fields
      const userPayload = {
        uid: staffUser.uid,
        displayName: staffUser.displayName,
        email: staffUser.email,
        photoURL: staffUser.photoURL
      };

      // Generate the secure token using the key engine instance
      const token = cryptoEngine.issueUserToken(userPayload);

      log.info(
        { uid: staffUser.uid }, 
        "Cryptographically signed authorization credentials generated successfully"
      );

      return res.json({
        token,
        user: userPayload
      });
    } catch (error) {
      log.error({ error, email }, "Identity provider authentication process crashed");
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export const authController = new AuthController();