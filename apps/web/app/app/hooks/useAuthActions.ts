// hooks/useAuthActions.ts
"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "./useAuthStore";

export function useAuthActions() {
  const router = useRouter();
  const { user, loading, error, signOut: storeSignOut } = useAuthStore();

  const signOut = async () => {
    try {
      await storeSignOut();        // 1) Firebase signOut + destroySession()
      router.replace("/");    // 2) Go to login after sign-out
    } catch (e) {
      console.error("Sign-out failed:", e);
    }
  };

  return {
    user,
    loading,
    error,
    signOut,
  };
}
