"use client";

import React, { useState } from "react";
import { StepOneProfile } from "./StepOneProfile";
import { StepTwoCompany } from "./StepTwoCompany";
import { StepThreeSecurity } from "./StepthreeSecurity";
import { SuccessScreen } from "./SuccessScreen";

export default function SignUpForm() {
  const [step, setStep] = useState<number>(1); 
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    company: "",
    designation: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [shake, setShake] = useState<Record<string, boolean>>({});
  const [securityHint, setSecurityHint] = useState<string>("");

  const updateFields = (fields: Partial<typeof formData>) => {
    if (securityHint) setSecurityHint("");
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const triggerShake = (field: string) => {
    setShake(prev => ({ ...prev, [field]: true }));
    setTimeout(() => setShake(prev => ({ ...prev, [field]: false })), 420);
  };

  // Centralized Step Validation
  const validateAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    const currentErrors: Record<string, boolean> = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.name.trim()) { currentErrors.name = true; triggerShake("name"); isValid = false; }
      if (formData.username.trim() && formData.username.trim().length < 3) { currentErrors.username = true; triggerShake("username"); isValid = false; }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) { currentErrors.email = true; triggerShake("email"); isValid = false; }
    } 
    else if (step === 2) {
      if (!formData.company.trim()) { currentErrors.company = true; triggerShake("company"); isValid = false; }
      if (!formData.designation.trim()) { currentErrors.designation = true; triggerShake("designation"); isValid = false; }
    } 
    else if (step === 3) {
      if (!formData.password.trim() || formData.password.length < 6) { currentErrors.password = true; triggerShake("password"); isValid = false; }
      if (!formData.confirmPassword.trim()) { setSecurityHint("Please confirm your password"); currentErrors.confirmPassword = true; triggerShake("confirmPassword"); isValid = false; }
      else if (formData.password !== formData.confirmPassword) { setSecurityHint("Passwords do not match"); currentErrors.confirmPassword = true; triggerShake("confirmPassword"); isValid = false; }
    }

    setErrors(currentErrors);

    if (isValid) {
      if (step < 3) {
        setStep(prev => prev + 1);
      } else {
        executeFinalSubmit();
      }
    }
  };

  const executeFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    }, 2000);
  };

  const handleBack = () => {
    setErrors({});
    setStep(prev => prev - 1);
  };

  return (
    <div className="relative z-30 flex flex-col justify-start items-center w-full h-full max-h-screen overflow-y-auto overflow-x-hidden bg-[#0b0705] px-6 pt-8 pb-12 rounded-t-[32px] -mt-11 shadow-[0_-2px_0_rgba(190,140,90,0.12),0_-20px_60px_rgba(0,0,0,0.6)] md:mt-0 md:justify-center md:rounded-none md:p-[48px_60px] md:shadow-none min-[961px]:p-[48px_60px] max-[960px]:p-[40px_36px] before:md:absolute before:md:top-[-180px] before:md:right-[-180px] before:md:w-[460px] before:md:h-[460px] before:md:bg-[radial-gradient(circle,rgba(200,90,40,0.07)_0%,transparent_68%)] before:md:pointer-events-none after:md:absolute after:md:bottom-[-100px] after:md:left-[-80px] after:md:w-[300px] after:md:h-[300px] after:md:bg-[radial-gradient(circle,rgba(180,70,20,0.05)_0%,transparent_70%)] after:md:pointer-events-none">
      
      <span className="mx-auto mb-[20px] block h-1 w-[36px] rounded-[100px] bg-[rgba(190,140,90,0.25)] md:hidden max-[430px]:mb-4"></span>
      
      <div className="w-full max-w-full md:max-w-[390px] flex flex-col justify-between h-auto font-['Outfit'] tracking-normal">
        
        {/* Dynamic Shared Header */}
        {step < 4 && (
          <div className="w-full">
            <h1 className="animate-fade-up font-['Outfit'] text-2xl font-extrabold text-[var(--accent)] mb-1.5 md:text-[38px] md:leading-[1.1] tracking-[-.03em] md:mb-2 max-[430px]:text-[24px]">
              {step === 1 && "Create Profile"}
              {step === 2 && "Workplace Info"}
              {step === 3 && "Secure Account"}
            </h1>
            <p className="animate-fade-up [animation-delay:0.04s] font-['Outfit'] text-xs leading-[1.5] text-[var(--muted)] tracking-wide mb-4 md:text-[13px] md:mb-6 max-[430px]:text-[12px]">
              {step === 1 && "Let's get started with your basic identity setups."}
              {step === 2 && "Tell us about your operational hub and designation."}
              {step === 3 && "Choose a reliable key configuration sequence for entry."}
            </p>
            <div className="animate-fade-up [animation-delay:0.04s] flex gap-[6px] mb-5 md:mb-6">
              <span className={`w-[6px] h-[6px] rounded-full bg-[var(--accent)] transition-opacity duration-300 ${step === 1 ? 'opacity-100 scale-110' : 'opacity-30'}`}></span>
              <span className={`w-[6px] h-[6px] rounded-full bg-[var(--accent)] transition-opacity duration-300 ${step === 2 ? 'opacity-100 scale-110' : 'opacity-30'}`}></span>
              <span className={`w-[6px] h-[6px] rounded-full bg-[var(--accent)] transition-opacity duration-300 ${step === 3 ? 'opacity-100 scale-110' : 'opacity-30'}`}></span>
            </div>
          </div>
        )}

        {/* --- FORM CONTAINER OVER STEP FIELDS --- */}
        {step < 4 && (
          <form onSubmit={validateAndProceed} className="w-full flex flex-col gap-1.5 font-['Outfit']">
            
            {step === 1 && (
              <StepOneProfile data={formData} updateData={updateFields} errors={errors} shake={shake} />
            )}

            {step === 2 && (
              <StepTwoCompany data={formData} updateData={updateFields} errors={errors} shake={shake} />
            )}

            {step === 3 && (
              <StepThreeSecurity data={formData} updateData={updateFields} errors={errors} shake={shake} hintText={securityHint} />
            )}

            {/* Global Standardized Buttons Outside of Form Fields */}
            <div className="animate-fade-up [animation-delay:0.14s] flex gap-3 mt-3 w-full">
              {step > 1 && (
                <button
                  type="button" onClick={handleBack} disabled={isSubmitting}
                  className="flex-1 rounded-[13px] border border-[var(--border)] bg-transparent p-[14px] font-['Outfit'] text-[14.5px] font-bold tracking-wide text-[var(--text)] cursor-pointer transition-all hover:bg-white/5 md:rounded-[11px]"
                >
                  Back
                </button>
              )}
              
              <button
                type="submit" disabled={isSubmitting} style={isSubmitting ? { opacity: 0.7 } : undefined}
                className={`${step === 1 ? 'w-full' : 'flex-[2]'} relative flex items-center justify-center gap-2 rounded-[13px] bg-[var(--accent)] p-[14px] font-['Outfit'] text-[14.5px] font-bold tracking-wide text-white border-none cursor-pointer transition-all hover:bg-[var(--accent-h)] hover:-translate-y-[1px] active:translate-y-0 md:rounded-[11px]`}
              >
                {step === 3 ? (isSubmitting ? "Processing…" : "Complete Setup") : "Continue"}
                {step === 1 && <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>}
              </button>
            </div>
          </form>
        )}

        {/* --- SUCCESS SCREEN --- */}
        {step === 4 && (
          <div className="animate-fade-up w-full flex items-center justify-center py-4">
             <SuccessScreen email={formData.email} />
          </div>
        )}

        {/* Dynamic Navigation Footer */}
        {step < 4 && (
          <div className="animate-fade-up [animation-delay:0.1s] mt-6 text-center text-xs text-[var(--muted)] font-['Outfit'] tracking-normal border-t border-[var(--border)] pt-4 w-full">
            Already have an account? <a className="font-medium text-[var(--accent)] no-underline tracking-wide border-b border-[rgba(224,120,64,0.35)] hover:text-[var(--accent-h)]" href="/login">Log in →</a>
          </div>
        )}
      </div>
    </div>
  );
}