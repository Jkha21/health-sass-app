import { db } from "@repo/database";

export class UserService {
  /**
   * Retrieves profile information for a verified user UID
   */
  async findProfileByUid(uid: string) {
    return db.user.findUnique({
      where: { uid: uid }, // Changed from 'id' to 'uid'
      select: {
        uid: true,         // Changed from 'id' to 'uid'
        email: true,
        displayName: true, // Changed from firstName/lastName to 'displayName'
        photoURL: true,    // Added to align with available schema fields
        createdAt: true
      }
    });
  }

  /**
   * Modifies an existing user record profile dataset
   */
  async updateProfile(uid: string, data: { displayName?: string; photoURL?: string }) {
    return db.user.update({
      where: { uid: uid }, // Changed from 'id' to 'uid'
      data,
      select: {
        uid: true,         // Changed from 'id' to 'uid'
        email: true,
        displayName: true  // Changed to match the single schema property
      }
    });
  }
}