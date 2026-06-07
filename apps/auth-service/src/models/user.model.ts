import { db } from '@repo/database';
import { User } from '@repo/database';
import { UserResponse } from '../interface/user.interface.js';

export const UserModel = {
  ...db.user,

  /**
   * Transforms a raw database record into a clean client-facing response payload
   */
  transform(user: User): UserResponse {
    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
  }
};

export default UserModel;