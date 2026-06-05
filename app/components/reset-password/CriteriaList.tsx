import React from "react";
import { Check } from "lucide-react";

export default function CriteriaList({ password = "" }) {
  const rules = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One number", valid: /[0-9]/.test(password) },
    { label: "One special character (!@#$…)", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="my-3 flex flex-col gap-1.5">
      {rules.map((rule, idx) => (
        <div key={idx} className={`flex items-center gap-2 text-xs transition-colors duration-300 ${rule.valid ? "text-[#52c87a]" : "text-[#7a6858]"}`}>
          <div className={`w-4 h-4 flex-shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${rule.valid ? "border-[#52c87a]/50 bg-[#52c87a]/12" : "border-white/[0.26]"}`}>
            <Check className={`w-[9px] h-[9px] ${rule.valid ? "text-[#52c87a]" : "text-transparent"}`} strokeWidth={3} />
          </div>
          {rule.label}
        </div>
      ))}
    </div>
  );
}