import { ReactNode } from "react";

type SettingsSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-orange-900/[.07] shadow-[0_4px_20px_rgba(232,85,32,.07)] overflow-hidden mb-5">
      <div className="px-5 sm:px-6 py-4 border-b border-orange-50">
        <h3 className="font-display text-[15px] font-bold text-gray-800">{title}</h3>
        {description && (
          <p className="text-[12.5px] text-orange-800/50 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
      <div className="divide-y divide-orange-50">{children}</div>
    </div>
  );
}
