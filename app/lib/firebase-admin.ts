// lib/firebase-admin.ts (UPDATED - PERFECT)
import 'server-only';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const adminAuth = getAuth();

export async function verifySessionCookie(sessionCookie: string, checkRevoked = false) {
  if (!sessionCookie) {
    throw new Error('No session cookie provided');
  }

  try {
    // ✅ Properly passes checkRevoked parameter to Firebase Admin SDK
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, checkRevoked);
    return decoded;
  } catch (error: any) {
    console.error('Session verification failed:', error.code);

    // Specific Firebase Auth error codes
    if (error.code === 'auth/argument-error') {
      throw new Error('Invalid session cookie format');
    }
    if (error.code === 'auth/session-cookie-expired') {
      throw new Error('Session expired. Please log in again.');
    }
    if (error.code === 'auth/session-cookie-revoked') {
      throw new Error('Session has been revoked');
    }
    if (error.code === 'auth/user-disabled') {
      throw new Error('User account has been disabled');
    }
    
    // Generic fallback
    throw new Error('Session verification failed: ' + (error.message || 'Unknown error'));
  }
}
