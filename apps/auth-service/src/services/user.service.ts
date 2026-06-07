import { db } from '@repo/database';
import { logger } from '@repo/logger';

const log = logger.child({ service: 'user-service' });

class UserService {
  /**
   * Fetch a user profile from the database
   * @param {string} uid 
   */
  public getProfile = async (uid: string) => {
    const user = await db.user.findUnique({
      where: { uid }
    });

    if (!user) {
      const error: any = new Error('User profile not found');
      error.status = 404;
      throw error;
    }

    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    };
  };

  /**
   * Mutate profile attributes for an existing record
   * @param {string} uid 
   * @param {object} body 
   */
  public updateProfile = async (uid: string, body: { displayName?: string; photoURL?: string }) => {
    const { displayName, photoURL } = body;

    const userExists = await db.user.findUnique({ where: { uid } });
    if (!userExists) {
      const error: any = new Error('Cannot mutate record: User not found');
      error.status = 404;
      throw error;
    }

    const updatedUser = await db.user.update({
      where: { uid },
      data: {
        ...(displayName !== undefined && { displayName }),
        ...(photoURL !== undefined && { photoURL })
      }
    });

    log.info({ uid: updatedUser.uid }, 'User profile engine configuration updated successfully');

    return {
      uid: updatedUser.uid,
      displayName: updatedUser.displayName,
      email: updatedUser.email,
      photoURL: updatedUser.photoURL
    };
  };
}

export default UserService;