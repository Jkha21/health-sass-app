'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export interface SessionData {
  email?: string;
  name?: string;
  picture?: string;
  sub?: string;
}

export function useSession(requireAuth: boolean = false) {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkSession = useCallback(async () => {
    try {
      // 👈 Cache busting + no-store to prevent stale data
      const res = await fetch('/api/sessionCheck?' + new Date().getTime(), {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',  // 👈 Prevent browser caching stale sessions
      });

      if (res.ok) {
        const data = await res.json();
        setSession(data);
        
        // 👈 Only redirect if requireAuth AND no session
        if (requireAuth && !data) {
          router.replace('/login?redirect=' + encodeURIComponent(window.location.pathname));
        }
      } else {
        setSession(null);
        if (requireAuth) {
          router.replace('/login');
        }
      }
    } catch (error) {
      console.error('Session check failed:', error);
      setSession(null);
      if (requireAuth) {
        router.replace('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [requireAuth, router]);

  useEffect(() => {
    checkSession();
    
    // 👈 Re-validate every 5 minutes for long sessions
    const interval = setInterval(checkSession, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkSession]);

  return { session, loading, isAuthenticated: !!session };
}