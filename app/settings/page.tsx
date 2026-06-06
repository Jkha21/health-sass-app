"use client";

import { useState } from "react";
import AppLayout from "@/app/components/common/AppLayout";
import {
  ProfileTab,
  NotificationsTab,
  SecurityTab,
  AppearanceTab,
  IntegrationsTab,
  BillingTab,
} from "@/app/components/settings";

/* ─── Types ─────────────────────────────────────────────── */
type SettingsTab =
  | "profile"
  | "notifications"
  | "security"
  | "appearance"
  | "integrations"
  | "billing";

/* ─── Tab navigation ─────────────────────────────────────── */
const TABS: { id: SettingsTab; label: string; icon: string }[] = [
  { id: "profile",       label: "Profile",       icon: "👤" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "security",      label: "Security",      icon: "🔐" },
  { id: "appearance",    label: "Appearance",    icon: "🎨" },
  { id: "integrations",  label: "Integrations",  icon: "🔗" },
  { id: "billing",       label: "Billing",       icon: "💳" },
];

/* ─── Main SettingsPage Component ───────────────────────── */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeTabMeta = TABS.find(t => t.id === activeTab)!;

  const renderTab = () => {
    switch (activeTab) {
      case "profile":       return <ProfileTab />;
      case "notifications": return <NotificationsTab />;
      case "security":      return <SecurityTab />;
      case "appearance":    return <AppearanceTab />;
      case "integrations":  return <IntegrationsTab />;
      case "billing":       return <BillingTab />;
    }
  };

  return (
    <AppLayout
      title="Settings"
      activeItem="settings"
      breadcrumbs={[{ label: "Dashboard" }, { label: "Settings" }]}
    >
      {/* ══ Hero ════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 px-6 sm:px-8 py-6 mb-6 flex items-center justify-between gap-4">
        <span className="pointer-events-none absolute -top-8 -right-8 w-44 h-44 rounded-full bg-white/[.07]" />
        <div className="relative z-10">
          <h1 className="font-display text-2xl sm:text-[26px] font-extrabold text-white leading-tight mb-1">Settings</h1>
          <p className="text-sm text-white/75">Manage your profile, notifications, security and preferences.</p>
        </div>
        <div className="relative z-10 hidden sm:flex items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center font-display text-xl font-extrabold text-white">JC</div>
          <div>
            <p className="text-[13px] font-bold text-white">Dr. James Carter</p>
            <p className="text-[11px] text-white/70">james.carter@healthsaas.in</p>
          </div>
        </div>
      </div>

      {/* ══ Mobile tab selector ═════════════════════════════ */}
      <div className="sm:hidden mb-5">
        <button
          onClick={() => setMobileMenuOpen(v => !v)}
          className="w-full flex items-center justify-between gap-3 bg-white border border-[#e8c8a8] rounded-2xl px-4 py-3.5 shadow-[0_4px_16px_rgba(232,85,32,.08)]"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">{activeTabMeta.icon}</span>
            <span className="font-display text-[15px] font-bold text-gray-800">{activeTabMeta.label}</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e85520" strokeWidth="2.5"
            style={{ transform: mobileMenuOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        {mobileMenuOpen && (
          <div className="mt-2 bg-white border border-[#e8c8a8] rounded-2xl shadow-[0_8px_32px_rgba(232,85,32,.12)] overflow-hidden">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors border-b border-orange-50 last:border-0
                  ${activeTab === tab.id
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-orange-50/60"
                  }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className={`font-display text-[14px] font-semibold ${activeTab === tab.id ? "text-orange-600" : ""}`}>{tab.label}</span>
                {activeTab === tab.id && <span className="ml-auto w-2 h-2 rounded-full bg-orange-500" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ══ Desktop layout ══════════════════════════════════ */}
      <div className="flex gap-6 items-start">

        {/* Sidebar nav — desktop only */}
        <aside className="hidden sm:block w-52 shrink-0 sticky top-[calc(var(--header-h,64px)+1.5rem)]">
          <nav className="bg-white rounded-2xl border border-orange-900/[.07] shadow-[0_4px_20px_rgba(232,85,32,.07)] overflow-hidden">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all border-b border-orange-50 last:border-0
                  ${activeTab === tab.id
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-orange-50/50 hover:text-orange-500"
                  }`}
              >
                <span className="text-[17px]">{tab.icon}</span>
                <span className={`font-display text-[13.5px] font-semibold ${activeTab === tab.id ? "text-orange-600" : ""}`}>{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="ml-auto w-1 h-5 rounded-full bg-orange-500" />
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {renderTab()}
        </main>
      </div>
    </AppLayout>
  );
}