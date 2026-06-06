"use client";

import { useState, useTransition } from "react";

export interface SignupFormData {
  fname: string;
  lname: string;
  email: string;
  company: string;
  pw: string;
  cpw: string;
  terms: boolean;
}

export type PasswordStrengthLevel = "Weak" | "Fair" | "Good" | "Strong";

export function useSignupForm(onSuccess: (email: string) => void) {
  const [formData, setFormData] = useState<SignupFormData>({
    fname: "",
    lname: "",
    email: "",
    company: "",
    pw: "",
    cpw: "",
    terms: false,
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [shaking, setShaking] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (field: keyof SignupFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const calculatePasswordStrength = (p: string): { label: PasswordStrengthLevel; color: string; score: number } => {
    let s = 0;
    if (!p) return { label: "Weak", color: "#e05252", score: 0 };
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    if (p.length >= 12 && s >= 3) s = 4;

    const finalScore = Math.min(3, Math.max(0, s - 1));
    const structuralLevels: Array<{ label: PasswordStrengthLevel; color: string }> = [
      { label: "Weak", color: "#e05252" },
      { label: "Fair", color: "#e09040" },
      { label: "Good", color: "#c8c030" },
      { label: "Strong", color: "#52c87a" },
    ];
    return { ...structuralLevels[finalScore], score: finalScore + 1 };
  };

  const triggerShake = (field: keyof SignupFormData) => {
    setShaking((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setShaking((prev) => ({ ...prev, [field]: false }));
    }, 420);
  };

  const validateForm = (): boolean => {
    const currentErrors: Record<string, boolean> = {};
    let isValid = true;

    if (!formData.fname.trim()) { currentErrors.fname = true; triggerShake("fname"); isValid = false; }
    if (!formData.lname.trim()) { currentErrors.lname = true; triggerShake("lname"); isValid = false; }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) { currentErrors.email = true; triggerShake("email"); isValid = false; }
    if (!formData.pw || formData.pw.length < 8) { currentErrors.pw = true; triggerShake("pw"); isValid = false; }
    if (!formData.cpw || formData.cpw !== formData.pw) { currentErrors.cpw = true; triggerShake("cpw"); isValid = false; }
    if (!formData.terms) { currentErrors.terms = true; isValid = false; }

    setErrors(currentErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1600));
      onSuccess(formData.email);
    });
  };

  return {
    formData,
    errors,
    shaking,
    isPending,
    handleInputChange,
    calculatePasswordStrength,
    handleSubmit,
  };
}