"use client";

import React, { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/hooks/useAuthStore";

export default function LoginForm() {
  const router = useRouter();
  const { user, loading, error, signInWithGoogle, signInWithEmailPassword } = useAuthStore();
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [emailShake, setEmailShake] = useState<boolean>(false);
  const [passwordShake, setPasswordShake] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  // Redirect on successful login
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSignInSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let valid = true;

    setEmailError(false);
    setPasswordError(false);
    setServerError("");

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailShake(true);
      setTimeout(() => setEmailShake(false), 420);
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError(true);
      setPasswordShake(true);
      setTimeout(() => setPasswordShake(false), 420);
      valid = false;
    }

    if (!valid) return;

    try {
      await signInWithEmailPassword(email, password);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Sign-in failed");
    }
  };

  const handleGoogleSignIn = async () => {
    setServerError("");
    try {
      await signInWithGoogle();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Google sign-in failed");
    }
  };

  return (
    <div className="relative z-30 flex flex-1 items-start justify-center bg-[#0b0705] px-6 pt-[38px] pb-14 rounded-t-[32px] -mt-11 shadow-[0_-2px_0_rgba(190,140,90,0.12),0_-20px_60px_rgba(0,0,0,0.6)] md:mt-0 md:flex-1 md:items-center md:rounded-none md:p-[52px_60px] md:shadow-none min-[961px]:p-[52px_60px] max-[960px]:p-10_36px before:md:absolute before:md:top-[-180px] before:md:right-[-180px] before:md:w-[460px] before:md:h-[460px] before:md:bg-[radial-gradient(circle,rgba(200,90,40,0.07)_0%,transparent_68%)] before:md:pointer-events-none after:md:absolute after:md:bottom-[-100px] after:md:left-[-80px] after:md:w-[300px] after:md:h-[300px] after:md:bg-[radial-gradient(circle,rgba(180,70,20,0.05)_0%,transparent_70%)] after:md:pointer-events-none">
      <span className="mx-auto mb-[30px] block h-1 w-[36px] rounded-[100px] bg-[rgba(190,140,90,0.25)] md:hidden max-[430px]:mb-6"></span>
      
      <div className="w-full max-w-full md:max-w-[390px]">
        <h1 className="animate-fade-up font-['Outfit'] text-3xl font-extrabold tracking-tight text-[var(--accent)] mb-2 md:text-[46px] md:leading-[1.06] md:tracking-[-.03em] md:mb-3 max-[430px]:text-[28px]">Welcome Back!</h1>
        <p className="animate-fade-up [animation-delay:0.08s] text-xs leading-[1.65] text-[var(--muted)] mb-5 md:text-[13.5px] md:leading-[1.7] md:mb-8 max-[430px]:text-[12.5px]">
          Log in to access your dashboard, manage your account, and continue securely with full control.
        </p>
        <div className="animate-fade-up [animation-delay:0.08s] flex gap-[5px] mb-4 md:mb-7">
          <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]"></span>
          <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)] opacity-50 scale-80"></span>
          <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)] opacity-28 scale-60"></span>
        </div>

        <form onSubmit={handleSignInSubmit}>
          <div className="animate-fade-up [animation-delay:0.15s] mb-3">
            <label className="block text-[10.5px] font-semibold tracking-wider uppercase text-[var(--muted)] mb-1.5 md:text-[11px] md:tracking-[0.09em] md:mb-[7px]" htmlFor="em">Email Address</label>
            <div className={`relative ${emailShake ? "animate-shake" : ""}`}>
              <input
                type="email"
                id="em"
                className={`w-full rounded-[13px] border border-[var(--border)] bg-[var(--input-bg)] px-4 py-3.5 text-base text-[var(--text)] outline-none transition-all placeholder:text-[rgba(130,110,90,0.5)] focus:border-[rgba(220,120,60,0.45)] focus:bg-white/5 focus:shadow-[0_0_0_3.5px_var(--focus)] md:rounded-[11px] md:py-[13.5px] md:text-sm ${
                  emailError ? "border-[rgba(200,60,40,0.45)]! shadow-[0_0_0_3.5px_rgba(200,60,40,0.12)]!" : ""
                }`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:0.22s] mb-3">
            <label className="block text-[10.5px] font-semibold tracking-wider uppercase text-[var(--muted)] mb-1.5 md:text-[11px] md:tracking-[0.09em] md:mb-[7px]" htmlFor="pw">Password</label>
            <div className={`relative ${passwordShake ? "animate-shake" : ""}`}>
              <input
                type={showPassword ? "text" : "password"}
                id="pw"
                className={`w-full rounded-[13px] border border-[var(--border)] bg-[var(--input-bg)] px-4 py-3.5 pr-[46px]! text-base text-[var(--text)] outline-none transition-all placeholder:text-[rgba(130,110,90,0.5)] focus:border-[rgba(220,120,60,0.45)] focus:bg-white/5 focus:shadow-[0_0_0_3.5px_var(--focus)] md:rounded-[11px] md:py-[13.5px] md:text-sm ${
                  passwordError ? "border-[rgba(200,60,40,0.45)]! shadow-[0_0_0_3.5px_rgba(200,60,40,0.12)]!" : ""
                }`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute right-[13px] top-1/2 flex -translate-y-1/2 cursor-pointer rounded p-1 text-[var(--muted)] transition-colors hover:text-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                <svg className="w-4 h-4 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {showPassword ? (
                    <>
                      <path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Linked Forget Password */}
          <div className="animate-fade-up [animation-delay:0.28s] mb-[18px] flex justify-end md:mb-[22px]">
            <Link 
              href="/forgot-password" 
              className="text-[12.5px] text-[var(--muted)] no-underline border-b border-transparent transition-colors hover:text-[var(--accent)] hover:border-[var(--accent)] md:text-xs"
            >
              Forgot password?
            </Link>
          </div>

          {serverError && (
            <div className="animate-fade-up mb-4 rounded-[11px] bg-red-500/15 p-3 text-sm text-red-400 border border-red-500/30">
              {serverError}
            </div>
          )}

          <button
            className="animate-fade-up [animation-delay:0.32s] relative w-full overflow-hidden rounded-[13px] bg-[var(--accent)] p-[15px] font-['Nunito'] text-[15px] font-bold tracking-normal text-white border-none cursor-pointer transition-all hover:bg-[var(--accent-h)] hover:-translate-y-[1px] hover:shadow-[0_7px_22px_rgba(224,120,64,0.32)] active:translate-y-0 active:shadow-none md:rounded-[11px] md:p-[14.5px] md:text-[14.5px] md:tracking-wide md:mb-[18px]"
            type="submit"
            disabled={loading}
            style={loading ? { opacity: 0.72 } : undefined}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div className="animate-fade-up [animation-delay:0.38s] flex items-center gap-[11px] mb-3.5 md:mb-[17px]">
          <span className="flex-1 h-px bg-[var(--border)]"></span>
          <p className="text-[11px] text-[var(--muted)] tracking-wider uppercase">or continue with</p>
          <span className="flex-1 h-px bg-[var(--border)]"></span>
        </div>

        <button className="animate-fade-up [animation-delay:0.44s] flex w-full items-center justify-center gap-[11px] rounded-[13px] border border-[var(--border)] bg-[var(--input-bg)] p-[13.5px] font-['Nunito'] text-sm font-semibold text-[var(--text)] cursor-pointer transition-all hover:bg-white/7 hover:border-[rgba(200,140,90,0.28)] hover:-translate-y-[1px] active:translate-y-0 md:rounded-[11px] md:p-[13px] disabled:opacity-70" type="button" onClick={handleGoogleSignIn} disabled={loading}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        {/* Show success message or security badge */}
        <div className="animate-fade-up [animation-delay:0.5s] mt-4 flex items-center justify-center gap-[5px] text-[11px] text-[rgba(120,100,80,0.6)] max-[430px]:text-[10.5px]">
          <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Secured by Firebase &amp; Google OAuth 2.0
        </div>

        {/* Linked Signup */}
        <div className="animate-fade-up [animation-delay:0.54s] mt-5 text-center text-xs text-[var(--muted)] max-[768px]:mt-5 max-[768px]:text-sm max-[430px]:text-xs">
          Don't have an account?{" "}
          <Link 
            href="/signup" 
            className="font-medium text-[var(--accent)] no-underline border-b border-[rgba(224,120,64,0.35)] transition-colors hover:text-[var(--accent-h)] hover:border-[var(--accent-h)]"
          >
            Create one →
          </Link>
        </div>
      </div>
    </div>
  );
}