"use client";

import React, { useState, useEffect } from "react";
import { ResetFlowState, STRENGTH_LEVELS } from "../types/reset-password";
import IllustrationPanel from "../components/reset-password/IllustrationPanel";
import FormHeader from "../components/reset-password/FormHeader";
import PasswordInput from "../components/reset-password/PasswordInput";
import CriteriaList from "../components/reset-password/CriteriaList";
import ActionButton from "../components/reset-password/ActionButton";
import SuccessState from "../components/reset-password/SuccessState";
import ExpiredState from "../components/reset-password/ExpiredState";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [flowState, setFlowState] = useState<ResetFlowState>("form");
  const [isLoading, setIsLoading] = useState(false);

  // Validation UI flags
  const [errors, setErrors] = useState({ password: false, confirm: false });
  const [shakes, setShakes] = useState({ password: false, confirm: false });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("expired") === "1") setFlowState("expired");
    }
  }, []);

  const getStrengthIndex = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return Math.min(3, Math.max(0, score - 1));
  };

  const strength = STRENGTH_LEVELS[getStrengthIndex(password)];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ password: false, confirm: false });

    let valid = true;
    if (!password || password.length < 8) {
      setErrors(p => ({ ...p, password: true }));
      setShakes(p => ({ ...p, password: true }));
      setTimeout(() => setShakes(p => ({ ...p, password: false })), 400);
      valid = false;
    }
    if (!confirmPassword || confirmPassword !== password) {
      setErrors(p => ({ ...p, confirm: true }));
      setShakes(p => ({ ...p, confirm: true }));
      setTimeout(() => setShakes(p => ({ ...p, confirm: false })), 400);
      valid = false;
    }

    if (!valid) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setFlowState("success");
      document.getElementById("rightPanel")?.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden bg-[#0b0705] text-[#f0dcc8] select-none font-sans max-[768px]:h-auto max-[768px]:overflow-x-hidden max-[768px]:overflow-y-auto max-[768px]:flex-col max-[768px]:min-h-screen">
        
        {/* Isolated Graphic Module */}
        <IllustrationPanel />

        {/* Content Interactive Container */}
        <div id="rightPanel" className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col relative panel-glow max-[768px]:flex-none max-[768px]:w-full max-[768px]:overflow-y-visible max-[768px]:rounded-t-[30px] max-[768px]:-mt-10 max-[768px]:z-30 max-[768px]:shadow-[0_-2px_0_rgba(190,140,90,0.12),0_-20px_60px_rgba(0,0,0,0.6)]">
          <span className="hidden max-[768px]:block w-9 h-1 bg-[#be8c5a]/25 rounded-full mx-auto mt-3.5" />
          
          <div className="min-h-full w-full flex items-center justify-center py-11 px-14 z-[1] relative max-[768px]:py-6 max-[768px]:px-[22px] max-[768px]:pb-13">
            <div className="w-full max-w-[390px]">
              
              <Link href="/salford-login" className="inline-flex items-center gap-[7px] text-[12.5px] font-semibold text-[#7a6858] no-underline mb-7 transition-colors hover:text-[#e07840] group">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" strokeWidth={2.5} />
                Back to Sign In
              </Link>

              {flowState === "success" && <SuccessState />}
              {flowState === "expired" && <ExpiredState />}
              
              {flowState === "form" && (
                <form onSubmit={handleSubmit} className="animate-fade-up">
                  <FormHeader />

                  <PasswordInput
                    id="pw"
                    label="New Password"
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={setPassword}
                    hasError={errors.password}
                    shouldShake={shakes.password}
                    errorMessage="Password must be at least 8 characters"
                    strength={strength}
                  />

                  <CriteriaList password={password} />

                  <PasswordInput
                    id="cpw"
                    label="Confirm Password"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    hasError={errors.confirm}
                    shouldShake={shakes.confirm}
                    errorMessage="Passwords do not match"
                    matchReference={password}
                  />

                  <ActionButton isLoading={isLoading} label="Reset Password" loadingLabel="Updating…" />

                  <div className="text-center mt-[18px] text-[12.5px] text-[#7a6858]">
                    Remembered it?{" "}
                    <Link href="/salford-login" className="text-[#e07840] font-bold border-b border-[#e07840]/32 pb-[1px] hover:text-[#e98a58]">
                      Sign in →
                    </Link>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}