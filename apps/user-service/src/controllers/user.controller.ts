import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import { logger } from "@repo/logger";

const log = logger.child({ service: "user-controller" });
const userService = new UserService();

/**
 * GET /api/users/profile
 */
export const getMyProfile = async (req: Request, res: Response) => {
  const userUid = req.headers["x-user-uid"] as string;

  try {
    log.info({ userUid }, "Fetching profile record data");
    const user = await userService.findProfileByUid(userUid);

    if (!user) {
      return res.status(404).json({ error: "User profile record does not exist" });
    }

    return res.json({ success: true, data: user });
  } catch (error) {
    log.error({ error, userUid }, "Failed to extract user profile database entry");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * PATCH /api/users/profile
 */
export const updateMyProfile = async (req: Request, res: Response) => {
  const userUid = req.headers["x-user-uid"] as string;
  
  // Fixed: Destructure 'displayName' and 'photoURL' to match the updated Prisma schema fields
  const { displayName, photoURL } = req.body;

  try {
    log.info({ userUid }, "Executing user profile data mutation");
    
    // Fixed: Pass the correct schema-compliant object properties down to the service layer
    const updatedUser = await userService.updateProfile(userUid, { 
      displayName, 
      photoURL 
    });
    
    return res.json({ success: true, data: updatedUser });
  } catch (error) {
    log.error({ error, userUid }, "Failed to update user identity properties");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};