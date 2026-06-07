import { useState } from "react";
import { SettingsSection, SettingsRow, Toggle, SaveBar } from "./index";

export default function NotificationsTab() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    emailAppts:    true,
    emailLab:      true,
    emailMessages: false,
    emailDigest:   true,
    pushAppts:     true,
    pushLab:       true,
    pushCritical:  true,
    pushMessages:  true,
    smsAppts:      false,
    smsCritical:   true,
    inAppAll:      true,
    quietHours:    true,
    soundAlerts:   true,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings(s => ({ ...s, [key]: !s[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <SettingsSection title="Email Notifications" description="Choose what sends you an email. Delivered to james.carter@healthsaas.in">
        <SettingsRow icon="📅" label="Appointment reminders" description="24hr and 1hr before each appointment">
          <Toggle enabled={settings.emailAppts} onChange={() => toggle("emailAppts")} />
        </SettingsRow>
        <SettingsRow icon="🧪" label="Lab result alerts" description="When new results are reported">
          <Toggle enabled={settings.emailLab} onChange={() => toggle("emailLab")} />
        </SettingsRow>
        <SettingsRow icon="💬" label="Patient messages" description="When a patient sends a new message">
          <Toggle enabled={settings.emailMessages} onChange={() => toggle("emailMessages")} />
        </SettingsRow>
        <SettingsRow icon="📊" label="Weekly digest" description="Summary of your week every Monday morning">
          <Toggle enabled={settings.emailDigest} onChange={() => toggle("emailDigest")} />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Push Notifications" description="In-browser and mobile app alerts.">
        <SettingsRow icon="📅" label="Appointment alerts" description="Session starts and changes">
          <Toggle enabled={settings.pushAppts} onChange={() => toggle("pushAppts")} />
        </SettingsRow>
        <SettingsRow icon="🧪" label="Lab results" description="Normal and abnormal results">
          <Toggle enabled={settings.pushLab} onChange={() => toggle("pushLab")} />
        </SettingsRow>
        <SettingsRow icon="🚨" label="Critical alerts" description="Always on — STAT and critical results">
          <Toggle enabled={settings.pushCritical} onChange={() => toggle("pushCritical")} />
        </SettingsRow>
        <SettingsRow icon="💬" label="Patient messages" description="New messages and replies">
          <Toggle enabled={settings.pushMessages} onChange={() => toggle("pushMessages")} />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="SMS / Text Alerts" description="Sent to +91 98765 43210. Carrier charges may apply.">
        <SettingsRow icon="📅" label="Appointment reminders" description="Text reminder 1hr before">
          <Toggle enabled={settings.smsAppts} onChange={() => toggle("smsAppts")} />
        </SettingsRow>
        <SettingsRow icon="🚨" label="Critical lab results" description="STAT results — always recommended">
          <Toggle enabled={settings.smsCritical} onChange={() => toggle("smsCritical")} />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Preferences">
        <SettingsRow icon="🌙" label="Quiet hours" description="Suppress non-critical notifications 10 PM – 7 AM">
          <Toggle enabled={settings.quietHours} onChange={() => toggle("quietHours")} />
        </SettingsRow>
        <SettingsRow icon="🔊" label="Sound alerts" description="Play a sound for incoming critical alerts">
          <Toggle enabled={settings.soundAlerts} onChange={() => toggle("soundAlerts")} />
        </SettingsRow>
      </SettingsSection>

      <SaveBar onSave={handleSave} saved={saved} />
    </div>
  );
}
