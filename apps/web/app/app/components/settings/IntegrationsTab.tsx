import { SettingsSection, SettingsInput, SettingsRow } from "./index";

export default function IntegrationsTab() {
  const integrations = [
    { name: "Apollo EMR",          icon: "🏥", desc: "Sync patient records from Apollo Health Systems",        connected: true,  badge: "Live"        },
    { name: "Google Calendar",     icon: "📅", desc: "Sync appointments to your Google Calendar",             connected: true,  badge: "Syncing"     },
    { name: "Zoho CRM",            icon: "📊", desc: "Push patient data to Zoho CRM for follow-ups",          connected: false, badge: null          },
    { name: "Razorpay",            icon: "💰", desc: "Accept payments and manage billing online",              connected: false, badge: null          },
    { name: "Twilio SMS",          icon: "📲", desc: "Send automated appointment reminders via SMS",           connected: true,  badge: "Active"      },
    { name: "WhatsApp Business",   icon: "💬", desc: "Patient communication via WhatsApp",                    connected: false, badge: null          },
    { name: "AWS S3 Storage",      icon: "☁️", desc: "Store and retrieve medical documents securely",          connected: true,  badge: "Healthy"     },
    { name: "Stripe",              icon: "💳", desc: "International payment processing and subscriptions",    connected: false, badge: null          },
  ];

  return (
    <div>
      <SettingsSection title="API Access" description="Use your API key to connect third-party tools programmatically.">
        <SettingsInput label="API Key" value="sk-hs-live-••••••••••••••••••••••••••••••••" readOnly hint="Keep this secret. Regenerate if compromised." />
        <div className="px-5 sm:px-6 py-3 flex items-center gap-3">
          <button className="text-[12.5px] font-semibold text-orange-500 border border-orange-200 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-all">Copy Key</button>
          <button className="text-[12.5px] font-semibold text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all">Regenerate</button>
        </div>
      </SettingsSection>

      <SettingsSection title="Connected Services" description="Connect external tools to enhance your workflow.">
        {integrations.map(int => (
          <div key={int.name} className="flex items-center gap-4 px-5 sm:px-6 py-4 hover:bg-orange-50/40 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-white border border-orange-100 shadow-sm flex items-center justify-center text-xl shrink-0">{int.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-[13.5px] font-semibold text-gray-800">{int.name}</p>
                {int.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">{int.badge}</span>
                )}
              </div>
              <p className="text-[12px] text-orange-800/50 mt-0.5">{int.desc}</p>
            </div>
            <button
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-[12px] font-semibold transition-all ${
                int.connected
                  ? "border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500"
                  : "border border-orange-200 bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-500"
              }`}
            >
              {int.connected ? "Disconnect" : "Connect"}
            </button>
          </div>
        ))}
      </SettingsSection>

      <SettingsSection title="Webhooks" description="Send real-time event data to your own endpoints.">
        <SettingsInput label="Webhook URL" value="" placeholder="https://your-app.com/webhooks/healthsaas" />
        <SettingsRow icon="🔔" label="Event types" description="appointment.created, lab.result.critical, patient.updated">
          <button className="text-[12px] font-semibold text-orange-500 hover:underline">Configure</button>
        </SettingsRow>
      </SettingsSection>
    </div>
  );
}
