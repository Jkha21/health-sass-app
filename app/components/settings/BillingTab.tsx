import { SettingsSection, SettingsRow } from "./index";

export default function BillingTab() {
  const invoices = [
    { id: "INV-2026-04", date: "Apr 1, 2026", amount: "₹8,400", status: "Paid" },
    { id: "INV-2026-03", date: "Mar 1, 2026", amount: "₹8,400", status: "Paid" },
    { id: "INV-2026-02", date: "Feb 1, 2026", amount: "₹8,400", status: "Paid" },
    { id: "INV-2026-01", date: "Jan 1, 2026", amount: "₹6,300", status: "Paid" },
  ];

  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-orange-300 rounded-2xl px-6 py-5 mb-5">
        <span className="pointer-events-none absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] text-white/70 font-semibold uppercase tracking-wider mb-1">Current Plan</p>
            <p className="font-display text-[22px] font-extrabold text-white">Enterprise Pro</p>
            <p className="text-[13px] text-white/75 mt-1">Unlimited patients · 5 doctors · Full analytics · Priority support</p>
            <p className="text-[12px] text-white/60 mt-1.5">Renews on May 1, 2026 · ₹8,400/month</p>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <button className="px-5 py-2.5 rounded-xl bg-white text-orange-600 font-display text-[13px] font-bold hover:shadow-lg transition-all whitespace-nowrap">
              Manage Plan
            </button>
            <button className="px-4 py-2.5 rounded-xl border border-white/30 bg-white/15 text-white font-display text-[13px] font-semibold hover:bg-white/25 transition-all whitespace-nowrap">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <SettingsSection title="Usage This Month">
        {[
          { label: "Patients", used: 8, limit: "Unlimited", pct: null as number | null },
          { label: "Appointments", used: 47, limit: "Unlimited", pct: null },
          { label: "Telehealth", used: 12, limit: 20, pct: 60 },
          { label: "Storage", used: "2.4 GB", limit: "10 GB", pct: 24 },
          { label: "Team Seats", used: 3, limit: 5, pct: 60 },
        ].map(item => (
          <div key={item.label} className="px-5 sm:px-6 py-4 hover:bg-orange-50/30 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-semibold text-gray-800">{item.label}</span>
              <span className="text-[12.5px] text-orange-800/60 font-medium">{item.used} / {item.limit}</span>
            </div>
            {item.pct !== null && (
              <div className="h-1.5 bg-orange-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${item.pct >= 80 ? "bg-red-400" : "bg-gradient-to-r from-orange-400 to-orange-500"}`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </SettingsSection>

      <SettingsSection title="Payment Method">
        <SettingsRow icon="💳" label="HDFC Visa •••• 4821" description="Expires 08/2028 · Default">
          <button className="text-[12px] font-semibold text-orange-500 hover:underline">Change</button>
        </SettingsRow>
        <div className="px-5 sm:px-6 py-3">
          <button className="text-[12.5px] font-semibold text-orange-500 border border-orange-200 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-all">+ Add payment method</button>
        </div>
      </SettingsSection>

      <SettingsSection title="Invoice History">
        {invoices.map(inv => (
          <div key={inv.id} className="flex items-center gap-4 px-5 sm:px-6 py-4 hover:bg-orange-50/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-lg shrink-0">🧾</div>
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-semibold text-gray-800">{inv.id}</p>
              <p className="text-[11.5px] text-orange-800/50">{inv.date}</p>
            </div>
            <span className="text-[13px] font-bold text-gray-700">{inv.amount}</span>
            <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">{inv.status}</span>
            <button className="text-[12px] font-semibold text-orange-500 hover:underline shrink-0">PDF</button>
          </div>
        ))}
      </SettingsSection>
    </div>
  );
}
