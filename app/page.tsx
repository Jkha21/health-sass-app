"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./components/ui/Button";
import useAuthStore from "./hooks/useAuthStore";
import LoginPanel from "./components/auth/LoginPanel";
import { GoogleIcon, ShieldIcon, AlertIcon, Spinner } from "./components/auth/LogoIcons";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle, user, loading, error } = useAuthStore();
  const [welcomeName, setWelcomeName] = useState<string>("");
  const redirected = useRef(false);

  useEffect(() => {
    if (user && !redirected.current) {
      redirected.current = true;
      setWelcomeName(user.displayName?.split(" ")[0] ?? "");
      router.replace("/dashboard");
    }
  }, [user]);

  const handleSignIn = async () => {
    try { await signInWithGoogle(); } catch { /* error already in store */ }
  };

  const isDisabled = loading || !!welcomeName;
  const btnLabel   = welcomeName
    ? `Welcome, ${welcomeName}!`
    : loading ? "Signing you in…" : "Continue with Google";

  return (
    <div className="min-h-dvh bg-[#fdeede] dark:bg-[#1c0f06] font-sans antialiased grid grid-cols-1 md:grid-cols-[46fr_54fr] items-stretch">

      <LoginPanel />

      <div className="flex items-start md:items-center justify-center px-6 py-9 sm:px-10 md:px-16 bg-[#fdeede] dark:bg-[#1c0f06]">
        <div className="w-full max-w-[420px] animate-[fadeUp_.5s_cubic-bezier(.16,1,.3,1)_both]">

          <h1 className="font-display font-extrabold text-[#e85520] dark:text-[#f97848] tracking-tight leading-[1.08] mb-2.5 text-[clamp(28px,3.5vw,42px)]">
            Welcome Back!
          </h1>
          <p className="text-[#8a6650] dark:text-[#b89888] leading-[1.68] mb-[clamp(28px,3.5vw,40px)] text-[clamp(13px,1.1vw,14px)]">
            Log in to access your dashboard, manage your account, and continue
            securely with full control.
          </p>

          {/* Error banner */}
          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="flex items-center gap-2.5 bg-[#fde8e8] border border-[#f5bcbc] rounded-[10px] px-3.5 py-3 text-[13px] text-[#c0392b] mb-[18px]"
            >
              <AlertIcon />
              <span>{error}</span>
            </div>
          )}

          {/*
           * ✅ variant="ghost" — renders a plain button with no border/colour
           *    base styles, so our className fully controls the appearance
           *    without any style conflicts.
           *
           * ❌ variant="outline" was adding its own border-2 border-orange-500
           *    and text-orange-600 which fought against our custom classes.
           */}
          <Button
            variant="ghost"
            size="lg"
            onClick={handleSignIn}
            disabled={isDisabled}
            type="button"
            aria-label="Sign in with Google"
            className={[
              "relative overflow-hidden w-full flex items-center justify-center gap-3",
              "min-h-[54px] px-5 rounded-[14px]",
              "bg-white dark:bg-[#2a1608]",
              "border-2 border-[#e8c8a8] dark:border-[#5a3020]",
              "text-gray-800 dark:text-[#f1e4d8]",
              "font-display font-bold text-[clamp(14px,1.3vw,16px)]",
              "shadow-[0_4px_16px_rgba(0,0,0,.09)]",
              "transition-all duration-200",
              "hover:border-[#e85520] hover:bg-white hover:shadow-[0_8px_24px_rgba(232,85,32,.28)] hover:-translate-y-0.5",
              "dark:hover:border-[#f97848] dark:hover:bg-[#341c0a]",
              "active:translate-y-0 active:shadow-[0_4px_16px_rgba(0,0,0,.09)]",
              "disabled:opacity-55 disabled:shadow-none disabled:bg-gray-100 disabled:cursor-not-allowed disabled:transform-none",
            ].join(" ")}
          >
            <span className="absolute inset-0 bg-gradient-to-br from-orange-500/[.06] to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
            {loading ? <Spinner /> : <GoogleIcon />}
            <span className={`flex-1 text-center transition-opacity ${loading ? "opacity-70" : "opacity-100"}`}>
              {btnLabel}
            </span>
          </Button>

          <div
            className="flex items-center justify-center gap-1.5 mt-3.5 text-xs text-[#a08870] dark:text-[#7a5848] font-medium"
            aria-label="Authentication security notice"
          >
            <ShieldIcon />
            Secured by Firebase &amp; Google OAuth 2.0
          </div>

        </div>
      </div>
    </div>
  );
}