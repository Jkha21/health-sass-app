import { ReactNode } from "react";

type SettingsRowProps = {
  icon: string;
  label: string;
  description?: string;
  children?: ReactNode;
  danger?: boolean;
};

export default function SettingsRow({
  icon,
  label,
  description,
  children,
  danger,
}: SettingsRowProps) {
  return (
    <div className="flex items-center gap-4 px-5 sm:px-6 py-4 hover:bg-orange-50/40 transition-colors">
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${
          danger ? "bg-red-50 border border-red-100" : "bg-orange-50 border border-orange-100"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-[13.5px] font-semibold leading-snug ${
            danger ? "text-red-600" : "text-gray-800"
          }`}
        >
          {label}
        </p>
        {description && (
          <p className="text-[12px] text-orange-800/50 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
}
