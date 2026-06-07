type SaveBarProps = {
  onSave: () => void;
  saved: boolean;
};

export default function SaveBar({ onSave, saved }: SaveBarProps) {
  return (
    <div className="sticky bottom-0 z-10 -mx-0 px-0 py-4 bg-gradient-to-t from-[#fdeede] to-transparent pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-end gap-3">
        <button className="px-5 py-2.5 rounded-xl border border-[#e8c8a8] bg-white text-[13px] font-semibold text-orange-800/60 hover:bg-orange-50 transition-all">
          Discard
        </button>
        <button
          onClick={onSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-display text-[13px] font-bold transition-all ${
            saved
              ? "bg-green-500 text-white shadow-[0_4px_14px_rgba(34,197,94,.35)]"
              : "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-[0_4px_14px_rgba(232,85,32,.35)] hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(232,85,32,.45)]"
          }`}
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
