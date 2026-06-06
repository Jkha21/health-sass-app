"use client";

import React from "react";

interface ActionButtonProps {
  isLoading: boolean;
  label: string;
  loadingLabel: string;
}

export default function ActionButton({ isLoading, label, loadingLabel }: ActionButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full p-3.5 rounded-[11px] bg-[#e07840] text-white font-bold text-[14.5px] border-none cursor-pointer tracking-wide flex items-center justify-center gap-2 transition-all hover:bg-[#e98a58] hover:-translate-y-0.5 hover:shadow-[0_7px_22px_rgba(224,120,64,0.32)] active:translate-y-0 disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none"
    >
      <span>{isLoading ? loadingLabel : label}</span>
      {isLoading && (
        <span className="w-4 h-4 border-[2.5px] border-white/35 border-t-white rounded-full animate-spin" />
      )}
    </button>
  );
}