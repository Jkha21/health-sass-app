import { ReactNode } from "react";

type ToggleProps = {
  enabled: boolean;
  onChange: (v: boolean) => void;
  size?: "sm" | "md";
};

export default function Toggle({ enabled, onChange, size = "md" }: ToggleProps) {
  const track = size === "sm" ? "w-8 h-4" : "w-11 h-6";
  const thumb = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  const translate = size === "sm" ? "translate-x-4" : "translate-x-5";

  return (
    <button
      onClick={() => onChange(!enabled)}
      role="switch"
      aria-checked={enabled}
      className={`relative inline-flex items-center ${track} rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 ${
        enabled
          ? "bg-gradient-to-r from-orange-500 to-orange-400"
          : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block ${thumb} bg-white rounded-full shadow-sm transform transition-transform duration-200 ml-0.5 ${
          enabled ? translate : "translate-x-0"
        }`}
      />
    </button>
  );
}
