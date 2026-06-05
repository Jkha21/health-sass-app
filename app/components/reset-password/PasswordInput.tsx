"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  hasError: boolean;
  shouldShake: boolean;
  errorMessage: string;
  strength?: { text: string; color: string; count: number };
  matchReference?: string;
}

export default function PasswordInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  hasError,
  shouldShake,
  errorMessage,
  strength,
  matchReference,
}: PasswordInputProps) {
  const [showText, setShowText] = useState(false);

  return (
    <div className={`mb-4 ${shouldShake ? "animate-shake" : ""}`}>
      <label htmlFor={id} className="block text-[10.5px] font-bold tracking-widest uppercase text-[#7a6858] mb-[7px]">
        {label}
      </label>
      <div className="relative">
        <input
          type={showText ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="new-password"
          className={`w-full py-3 pl-4 pr-11 bg-white/[0.038] border rounded-[11px] text-[#f0dcc8] text-sm outline-none transition-all focus:border-[#dc783c]/46 focus:bg-white/[0.055] focus:shadow-[0_0_0_3px_rgba(224,120,64,0.18)] placeholder-[#826e5a]/48 max-md:text-base
            ${hasError ? "border-[#c83c28]/46 shadow-[0_0_0_3px_rgba(200,60,40,0.12)]" : "border-white/[0.14]"}
            ${matchReference !== undefined && value && matchReference === value ? "border-[#52c87a]/42" : ""}
            ${matchReference !== undefined && value && matchReference !== value ? "border-[#e05252]/42" : ""}
          `}
        />

        {/* Status verification marker */}
        {matchReference !== undefined && value && (
          <span className="absolute right-[42px] top-1/2 -translate-y-1/2 block">
            {matchReference === value ? (
              <Check className="w-3.5 h-3.5 text-[#52c87a]" strokeWidth={2.8} />
            ) : (
              <X className="w-3.5 h-3.5 text-[#e05252]" strokeWidth={2.8} />
            )}
          </span>
        )}

        {/* Toggle password visibility visibility button */}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowText(!showText)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a6858] hover:text-[#e07840] p-1 transition-colors"
        >
          {showText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Dynamic Password Strength Track Indicator */}
      {strength && value && (
        <div className="mt-[7px]">
          <div className="flex gap-1 mb-1">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="flex-1 h-[3px] rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: idx < strength.count ? strength.color : "rgba(190,140,90,.14)",
                }}
              />
            ))}
          </div>
          <span className="text-[10.5px] font-bold tracking-wider" style={{ color: strength.color }}>
            {strength.text}
          </span>
        </div>
      )}

      {hasError && <div className="text-[11px] text-[#e05252] mt-1.5 pl-0.5">{errorMessage}</div>}
    </div>
  );
}