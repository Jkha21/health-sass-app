import { useState } from "react";
import { SettingsSection, SettingsRow, Toggle, SaveBar } from "./index";

export default function AppearanceTab() {
  const [saved, setSaved]       = useState(false);
  const [theme, setTheme]       = useState<"light" | "dark" | "system">("light");
  const [density, setDensity]   = useState<"compact" | "default" | "comfortable">("default");
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [animations, setAnimations] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <SettingsSection title="Theme" description="Choose how the interface looks.">
        <div className="px-5 sm:px-6 py-5">
          <div className="grid grid-cols-3 gap-3">
            {(["light", "dark", "system"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`flex flex-col items-center gap-2.5 p-3.5 rounded-2xl border-2 transition-all ${
                  theme === t
                    ? "border-orange-500 bg-orange-50 shadow-[0_4px_14px_rgba(232,85,32,.2)]"
                    : "border-orange-100 bg-white hover:border-orange-300"
                }`}
              >
                <div className={`w-full h-14 rounded-xl overflow-hidden flex border ${
                  t === "dark" ? "bg-gray-900 border-gray-700" : t === "system" ? "border-orange-100" : "bg-orange-50 border-orange-100"
                }`}>
                  {t === "system" ? (
                    <>
                      <div className="w-1/2 bg-orange-50" />
                      <div className="w-1/2 bg-gray-900" />
                    </>
                  ) : (
                    <div className={`w-full flex flex-col gap-1.5 p-2 ${t === "dark" ? "bg-gray-900" : "bg-orange-50"}`}>
                      <div className={`h-2 rounded w-3/4 ${t === "dark" ? "bg-gray-700" : "bg-orange-200"}`} />
                      <div className={`h-1.5 rounded w-full ${t === "dark" ? "bg-gray-700" : "bg-orange-100"}`} />
                      <div className={`h-1.5 rounded w-2/3 ${t === "dark" ? "bg-gray-700" : "bg-orange-100"}`} />
                    </div>
                  )}
                </div>
                <span className="font-display text-[12.5px] font-semibold text-gray-700 capitalize">{t === "system" ? "System" : t.charAt(0).toUpperCase() + t.slice(1)}</span>
                {theme === t && <span className="text-[10px] font-bold text-orange-500">Active</span>}
              </button>
            ))}
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Display Density" description="Control how much information is shown at once.">
        <div className="px-5 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row gap-2.5">
            {(["compact", "default", "comfortable"] as const).map(d => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className={`flex-1 flex flex-col gap-1 px-4 py-3.5 rounded-xl border-2 text-left transition-all ${
                  density === d
                    ? "border-orange-500 bg-orange-50"
                    : "border-orange-100 bg-white hover:border-orange-200"
                }`}
              >
                <div className="flex flex-col gap-1 mb-1.5">
                  {d === "compact"      && [1.5,1,1.5,1].map((h,i)    => <div key={i} className="h-1.5 rounded bg-orange-200 w-full" />)}
                  {d === "default"      && [1,1.5,1,1.5].map((_, i)   => <div key={i} className={`rounded bg-orange-200 w-full ${i%2===0?"h-2":"h-1.5"}`} />)}
                  {d === "comfortable"  && [1,2,1,2].map((_,i)        => <div key={i} className={`rounded bg-orange-200 w-full ${i%2===0?"h-3":"h-2"}`} />)}
                </div>
                <span className="font-display text-[12.5px] font-bold text-gray-700 capitalize">{d}</span>
                <span className="text-[11px] text-orange-800/40">{
                  d === "compact" ? "More content, less space" :
                  d === "default" ? "Balanced — recommended" :
                  "More spacing, easier to read"
                }</span>
              </button>
            ))}
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Font Size">
        <div className="px-5 sm:px-6 py-5">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-semibold text-orange-800/40 uppercase tracking-wider">A</span>
            <input
              type="range"
              min={0}
              max={2}
              step={1}
              value={["sm","md","lg"].indexOf(fontSize)}
              onChange={e => setFontSize(["sm","md","lg"][+e.target.value] as "sm"|"md"|"lg")}
              className="flex-1 accent-orange-500"
            />
            <span className="text-[16px] font-semibold text-orange-800/40 uppercase tracking-wider">A</span>
          </div>
          <p className="text-center text-[12px] text-orange-800/50 mt-3 font-medium capitalize">
            {fontSize === "sm" ? "Small" : fontSize === "md" ? "Medium (default)" : "Large"}
          </p>
        </div>
      </SettingsSection>

      <SettingsSection title="Interface Options">
        <SettingsRow icon="✨" label="Animations" description="Fade and motion effects throughout the app">
          <Toggle enabled={animations} onChange={setAnimations} />
        </SettingsRow>
        <SettingsRow icon="◀️" label="Collapse sidebar by default" description="Auto-collapse the navigation sidebar on load">
          <Toggle enabled={sidebarCollapsed} onChange={setSidebarCollapsed} />
        </SettingsRow>
      </SettingsSection>

      <SaveBar onSave={handleSave} saved={saved} />
    </div>
  );
}
