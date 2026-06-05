import React from "react";
import Link from "next/link";

interface RequestFormProps {
  email: string;
  onChangeEmail: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  hasError: boolean;
  isLoading: boolean;
}

export function RequestFormState({
  email,
  onChangeEmail,
  onSubmit,
  hasError,
  isLoading,
}: RequestFormProps) {
  return (
    <form onSubmit={onSubmit} className="animate-fup [animation-delay:0.14s]">
      <div className="w-[54px] h-[54px] max-md:w-12 max-md:h-12 max-md:rounded-[14px] max-md:mb-[18px] rounded-[16px] bg-[#e07840]/10 border border-[#e07840]/22 flex items-center justify-center text-[#e07840] mb-[22px] animate-fup">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      <h1 className="text-[38px] max-md:text-[28px] max-sm:text-[25px] font-extrabold text-[#e07840] leading-[1.06] tracking-[-0.03em] mb-2 animate-fup [animation-delay:0.06s]">
        Forgot Password?
      </h1>
      <p className="text-[13.5px] max-md:text-[13px] max-md:mb-[22px] text-[#7a6858] leading-[1.68] mb-[28px] animate-fup [animation-delay:0.1s]">
        No worries — enter your work email and we'll send you a secure reset link within minutes.
      </p>

      <div className="mb-5 animate-fup [animation-delay:0.14s]">
        <label htmlFor="em" className="block text-[10.5px] font-bold tracking-[0.09em] uppercase text-[#7a6858] mb-[7px]">
          Work Email
        </label>
        <div className={`rounded-[11px] max-md:rounded-[12px] transition-all duration-200 ${hasError ? "animate-shake" : ""}`}>
          <input
            type="email"
            id="em"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            placeholder="james@company.com"
            autoComplete="email"
            className={`w-full p-[13.5px_16px] max-md:text-base max-md:p-3.5 max-sm:p-[13.5px_14px] max-md:rounded-[12px] bg-white/[0.038] border rounded-[11px] text-[#f0dcc8] font-sans text-sm outline-none transition-all placeholder:text-[#826e5a]/48 focus:bg-white/[0.055] ${
              hasError 
                ? "border-[#c83c28]/46 shadow-[0_0_0_3px_rgba(200,60,40,0.12)]" 
                : "border-[rgba(190,140,90,0.14)] focus:border-[#dc783c]/46 focus:shadow-[0_0_0_3px_rgba(224,120,64,0.18)]"
            }`}
          />
        </div>
        {hasError && (
          <div className="block text-[11px] text-[#e05252] mt-[5px] pl-[2px]">
            Please enter a valid email address
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full p-3.5 max-md:p-[14.5px] max-md:text-base max-md:rounded-[12px] max-sm:p-3.5 max-sm:text-[14.5px] rounded-[11px] bg-[#e07840] text-white font-sans text-[14.5px] font-bold border-none cursor-pointer tracking-[0.02em] flex items-center justify-center gap-2 transition-all hover:bg-[#e98a58] hover:-translate-y-[1px] hover:shadow-[0_7px_22px_rgba(224,120,64,0.32)] active:translate-y-0 disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none animate-fup [animation-delay:0.18s]"
      >
        <span>{isLoading ? "Sending…" : "Send Reset Link"}</span>
        {isLoading && <span className="w-4 h-4 border-[2.5px] border-white/35 border-t-white rounded-full animate-spin" />}
      </button>

      <div className="text-center mt-5 text-[12.5px] text-[#7a6858] animate-fup [animation-delay:0.22s]">
        Remembered it?{" "}
        <Link href="/login" className="text-[#e07840] font-bold border-b border-[#e07840]/32 hover:text-[#e98a58] transition-colors">
          Sign in →
        </Link>
      </div>
    </form>
  );
}