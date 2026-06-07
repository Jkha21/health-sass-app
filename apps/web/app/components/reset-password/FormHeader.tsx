import React from "react";
import { KeyRound } from "lucide-react";

export default function FormHeader() {
  return (
    <>
      <div className="w-[54px] h-[54px] rounded-2xl bg-[#e07840]/10 border border-[#e07840]/22 flex items-center justify-center text-[#e07840] mb-5 max-[768px]:w-12 max-[768px]:h-12 max-[768px]:rounded-[14px]">
        <KeyRound className="w-6 h-6" strokeWidth={1.8} />
      </div>
      <h1 className="font-heading text-[38px] font-extrabold text-[#e07840] leading-[1.06] tracking-tight mb-2 max-[768px]:text-[28px]">
        Set New Password
      </h1>
      <p className="text-[13.5px] text-[#7a6858] leading-[1.68] mb-[22px] max-[768px]:text-xs">
        Choose a strong, unique password to keep your health account secure.
      </p>
    </>
  );
}