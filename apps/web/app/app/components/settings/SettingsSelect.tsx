type SettingsSelectProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
};

export default function SettingsSelect({ label, value, onChange, options, hint }: SettingsSelectProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-5 sm:px-6 py-4 hover:bg-orange-50/30 transition-colors">
      <label className="text-[13px] font-semibold text-gray-700 sm:w-[160px] shrink-0">{label}</label>
      <div className="flex-1 min-w-0">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8c8a8] bg-white text-[13.5px] text-gray-800 outline-none cursor-pointer focus:border-orange-500 transition-colors"
        >
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {hint && <p className="text-[11px] text-orange-800/40 mt-1.5">{hint}</p>}
      </div>
    </div>
  );
}
