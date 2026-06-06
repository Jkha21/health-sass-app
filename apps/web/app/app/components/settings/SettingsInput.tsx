type SettingsInputProps = {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
  readOnly?: boolean;
};

export default function SettingsInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
  readOnly,
}: SettingsInputProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-5 sm:px-6 py-4 hover:bg-orange-50/30 transition-colors">
      <label className="text-[13px] font-semibold text-gray-700 sm:w-[160px] shrink-0">{label}</label>
      <div className="flex-1 min-w-0">
        <input
          type={type}
          {...(onChange ? { value, onChange: e => onChange(e.target.value) } : { defaultValue: value })}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-[13.5px] text-gray-800 outline-none transition-all ${
            readOnly
              ? "bg-orange-50/60 border-orange-100 text-orange-800/60 cursor-default"
              : "bg-white border-[#e8c8a8] focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
          }`}
        />
        {hint && <p className="text-[11px] text-orange-800/40 mt-1.5">{hint}</p>}
      </div>
    </div>
  );
}
