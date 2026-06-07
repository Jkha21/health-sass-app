import { useState } from "react";
import { SettingsSection, SettingsRow, SettingsInput, Toggle, SaveBar } from "./index";

export default function SecurityTab() {
  const [saved, setSaved]           = useState(false);
  const [twoFA, setTwoFA]           = useState(true);
  const [sessionAlerts, setSessionAlerts] = useState(true);
  const [showPassword, setShowPassword]   = useState(false);

  const sessions = [
    { device: "MacBook Pro — Chrome", location: "Bengaluru, IN", time: "Now",          current: true  },
    { device: "iPhone 15 — Safari",   location: "Bengaluru, IN", time: "2 hours ago",  current: false },
    { device: "Windows PC — Edge",    location: "Mumbai, IN",    time: "3 days ago",   current: false },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <SettingsSection title="Password" description="Last changed 47 days ago. We recommend changing every 90 days.">
        <SettingsInput label="Current password" value="" type={showPassword ? "text" : "password"} placeholder="Enter current password" />
        <SettingsInput label="New password" value="" type={showPassword ? "text" : "password"} placeholder="Min 12 characters" hint="Use uppercase, numbers and symbols for a strong password." />
        <SettingsInput label="Confirm password" value="" type={showPassword ? "text" : "password"} placeholder="Repeat new password" />
        <div className="px-5 sm:px-6 py-3 flex items-center gap-2">
          <input id="show-pw" type="checkbox" checked={showPassword} onChange={e => setShowPassword(e.target.checked)} className="accent-orange-500 w-3.5 h-3.5" />
          <label htmlFor="show-pw" className="text-[12px] text-orange-800/60 cursor-pointer">Show passwords</label>
        </div>
      </SettingsSection>

      <SettingsSection title="Two-Factor Authentication" description="Add an extra layer of security to your account.">
        <SettingsRow icon="📱" label="Authenticator app (TOTP)" description="Google Authenticator, Authy, or similar">
          <Toggle enabled={twoFA} onChange={setTwoFA} />
        </SettingsRow>
        <SettingsRow icon="📲" label="SMS backup codes" description="Receive a code via text if authenticator is unavailable">
          <button className="text-[12px] font-semibold text-orange-500 hover:underline">Set up</button>
        </SettingsRow>
        <SettingsRow icon="🗝️" label="Recovery codes" description="8 codes remaining. Generate new ones if needed.">
          <button className="text-[12px] font-semibold text-orange-500 hover:underline">View</button>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Active Sessions" description="Devices currently signed in to your account.">
        {sessions.map((s, i) => (
          <div key={i} className="flex items-center gap-4 px-5 sm:px-6 py-3.5 hover:bg-orange-50/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-lg shrink-0">
              {s.device.includes("iPhone") ? "📱" : s.device.includes("Windows") ? "🖥️" : "💻"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-semibold text-gray-800 flex items-center gap-2 flex-wrap">
                {s.device}
                {s.current && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Current</span>}
              </p>
              <p className="text-[11.5px] text-orange-800/50">{s.location} · {s.time}</p>
            </div>
            {!s.current && (
              <button className="text-[12px] font-semibold text-red-500 hover:underline shrink-0">Revoke</button>
            )}
          </div>
        ))}
        <div className="px-5 sm:px-6 py-3 border-t border-orange-50">
          <button className="text-[12.5px] font-semibold text-red-500 hover:underline">Sign out all other sessions</button>
        </div>
      </SettingsSection>

      <SettingsSection title="Login Alerts">
        <SettingsRow icon="🔔" label="New login notifications" description="Get an email when a new device signs in">
          <Toggle enabled={sessionAlerts} onChange={setSessionAlerts} />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Danger Zone">
        <SettingsRow icon="⬇️" label="Download my data" description="Export all your records and account data as a ZIP file" danger>
          <button className="text-[12px] font-semibold text-orange-500 border border-[#e8c8a8] px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-all">Export</button>
        </SettingsRow>
        <SettingsRow icon="🗑️" label="Delete account" description="Permanently remove your account and all data. This cannot be undone." danger>
          <button className="text-[12px] font-semibold text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all">Delete</button>
        </SettingsRow>
      </SettingsSection>

      <SaveBar onSave={handleSave} saved={saved} />
    </div>
  );
}
