"use client";

import { useEffect, FC, ReactNode } from "react";
import useAuthStore from "../../hooks/useAuthStore";

interface AuthProviderProps {
  children: ReactNode;
}

/*
 * AuthProvider
 * Mount once in app/layout.tsx to start the Firebase auth listener.
 * initAuth() returns the Firebase unsubscribe function which is called
 * on unmount to prevent memory leaks.
 */
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const initAuth = useAuthStore((s) => s.initAuth);

  useEffect(() => {
    const unsubscribe = initAuth();
    return () => unsubscribe();
  }, [initAuth]);

  return <>{children}</>;
};

export default AuthProvider;