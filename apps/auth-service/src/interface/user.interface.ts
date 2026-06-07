 import { User } from '@repo/database';

/**
 * Type contract for user profile mutation operations
 */
export interface UserUpdateInput {
  displayName?: string | null;
  photoURL?: string | null;
}

/**
 * Clean response shape exposed to clients, isolating system timestamps
 */
export type UserResponse = Pick<User, 'uid' | 'displayName' | 'email' | 'photoURL'>;