import React, { useState, useEffect } from "react";
import Link from "next/link";

interface SuccessStateProps {
  email: string;
}

export function SuccessState({ email }: SuccessStateProps) {
  const [countdown, setCountdown] = useState<number>(30);
  const [resendStatus, setResendStatus] = useState<"idle" | "countdown" | "sent">("countdown");

  useEffect(() => {
    if (countdown <= 0) {
      setResendStatus("idle");
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = (e: React.MouseEvent) => {
    e.preventDefault();
    if (resendStatus !== "idle") return;

    setResendStatus("sent");
    setTimeout(() => {
      setResendStatus("countdown");
      setCountdown(30);
    }, 3000);
  };

  return (
    <div className="text-center py-2">
      <div className="w-[70px] h-[70px] rounded-full bg-[#e07840]/10 border-[1.5px] border-[#e07840]/28 flex items-center justify-center mx-auto mb-[22px] animate-popIn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 stroke-[#e07840]">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" className="animate-draw" />
          <polyline points="22,6 12,13 2,6" className="animate-draw" />
        </svg>
      </div>

      <h2 className="text-[26px] font-extrabold tracking-[-0.02em] mb-2.5 animate-fup [animation-delay:0.28s]">
        Check Your Inbox
      </h2>
      <p className="text-[13.5px] text-[#7a6858] leading-[1.7] mb-[22px] animate-fup [animation-delay:0.34s]">
        We've sent a password reset link to your email. It will expire in 15 minutes.
      </p>

      <div className="inline-flex items-center gap-2 bg-[#e07840]/10 border border-[#e07840]/25 rounded-full px-[18px] py-2 text-[13px] font-semibold text-[#e07840] mb-6 animate-fup [animation-delay:0.4s]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span>{email}</span>
      </div>

      <Link href="/login" className="block w-full p-[13.5px] rounded-[11px] bg-white/[0.038] border border-[rgba(190,140,90,0.26)] text-[#f0dcc8] font-sans text-[14.5px] font-bold text-center no-underline transition-all hover:bg-white/[0.07] hover:border-[rgba(200,140,90,0.28)] hover:-translate-y-[1px] animate-fup [animation-delay:0.46s]">
        Back to Sign In
      </Link>

      <div className="text-[12.5px] text-[#7a6858] mt-4 animate-fup [animation-delay:0.52s]">
        Didn't receive it?{" "}
        {resendStatus === "countdown" && (
          <span className="opacity-50 pointer-events-none text-[#e07840] font-semibold">
            Resend in {countdown}s
          </span>
        )}
        {resendStatus === "idle" && (
          <a href="#" onClick={handleResend} className="text-[#e07840] font-semibold border-b border-[#e07840]/30 hover:text-[#e98a58] transition-colors">
            Resend email
          </a>
        )}
        {resendStatus === "sent" && (
          <span className="text-[#52c87a] font-semibold transition-colors">
            Sent ✓
          </span>
        )}
      </div>
    </div>
  );
}