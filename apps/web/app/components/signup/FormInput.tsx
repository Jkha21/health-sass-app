"use client";

import React, { ReactNode, InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  optionalLabel?: string;
  id: string;
  hasError: boolean;
  isShaking: boolean;
  hintText: string;
  leftIcon?: ReactNode;
  renderCustomIcons?: () => ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  optionalLabel,
  id,
  hasError,
  isShaking,
  hintText,
  leftIcon,
  renderCustomIcons,
  style,
  ...props
}) => {
  return (
    <div className={`w-full mb-4 transition-transform ${isShaking ? "animate-shake" : ""}`}>
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5 font-['Outfit']">
        {label} {optionalLabel && <span className="text-[rgba(190,140,90,0.5)] lowercase italic ml-1">{optionalLabel}</span>}
      </label>
      
      <div className="relative w-full">
        {/* Left Hand Icon Slot */}
        {leftIcon && (
          <div className="absolute left-[14px] top-1/2 -translate-y-1/2 flex items-center justify-center text-[var(--muted)] pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          id={id}
          className={`w-full bg-[var(--input-bg)] border rounded-[11px] font-['Nunito'] text-sm text-[var(--text)] transition-all outline-none placeholder:text-white/20
            ${leftIcon ? "pl-11" : "pl-4"} 
            ${renderCustomIcons ? "pr-11" : "pr-4"} 
            py-[13px] md:py-[12.5px]
            ${hasError ? "border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.15)] text-red-400" : "border-[var(--border)] focus:border-[var(--accent)] focus:shadow-[0_0_14px_rgba(224,120,64,0.15)]"}`}
          style={style}
          {...props}
        />
        
        {/* Right Hand Icon Slot (Password eye toggle, etc.) */}
        {renderCustomIcons && renderCustomIcons()}
      </div>

      {hasError && hintText && (
        <p className="text-[11px] text-red-400 mt-1 font-medium tracking-normal animate-fade-in">
          {hintText}
        </p>
      )}
    </div>
  );
};