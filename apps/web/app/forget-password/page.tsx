"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RequestFormState } from "../components/forget-password/RequestFormState";
import { SuccessState } from "../components/forget-password/SuccessState";
import { LeftPanelBackground } from "../components/forget-password/LeftPanelBackground";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Safely wait until client mount to render the browser-dependent leaf animation
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasError(false);

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email.trim() || !emailRegex.test(email)) {
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="w-full h-screen max-md:h-auto max-md:overflow-x-hidden max-md:overflow-y-auto flex flex-col md:flex-row bg-[#0b0705] text-[#f0dcc8] font-sans overflow-hidden select-none max-md:min-h-screen">
      
      {/* Background executes only if client window is confirmed active */}
      {mounted ? <LeftPanelBackground /> : <div className="hidden md:block w-[44%] lg:w-[48%] shrink-0 h-full bg-[#0b0705]" />}

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col relative before:content-[''] before:fixed before:-top-[160px] before:-right-[140px] before:w-[420px] before:h-[420px] before:pointer-events-none before:z-0 before:bg-[radial-gradient(circle,rgba(200,90,40,0.07)_0%,transparent_68%)] max-md:w-full max-md:overflow-y-visible max-md:rounded-t-[30px] max-md:-mt-10 max-md:z-30 max-md:shadow-[0_-2px_0_rgba(190,140,90,0.12),0_-20px_60px_rgba(0,0,0,0.6)] max-md:bg-[#0b0705] max-md:before:hidden">
        <span className="hidden max-md:block w-9 h-1 bg-[rgba(190,140,90,0.25)] rounded-full mx-auto mt-3.5" />
        
        <div className="min-h-full w-full flex items-center justify-center p-12 md:p-14 relative z-10 max-md:p-[24px_22px_52px] max-md:items-start max-sm:p-[18px_16px_44px]">
          <div className="w-full max-w-[380px] max-md:max-w-full">
            
            <Link href="/login" className="inline-flex items-center gap-[7px] text-[12.5px] font-semibold text-[#7a6858] no-underline mb-8 max-md:mb-6 transition-colors group hover:text-[#e07840]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Sign In
            </Link>

            {!isSubmitted ? (
              <RequestFormState
                email={email}
                onChangeEmail={setEmail}
                onSubmit={handleSubmit}
                hasError={hasError}
                isLoading={isLoading}
              />
            ) : (
              <SuccessState email={email} />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}