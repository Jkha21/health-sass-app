import { useState } from "react";
import { SettingsSection, SettingsInput, SettingsSelect, SaveBar } from "./index";

export default function ProfileTab() {
  const [saved, setSaved]           = useState(false);
  const [firstName, setFirstName]   = useState("James");
  const [lastName, setLastName]     = useState("Carter");
  const [email, setEmail]           = useState("james.carter@healthsaas.in");
  const [phone, setPhone]           = useState("+91 98765 43210");
  const [specialty, setSpecialty]   = useState("cardiology");
  const [department, setDepartment] = useState("Cardiology");
  const [bio, setBio]               = useState("Senior cardiologist with 18+ years of experience in interventional cardiology and heart failure management.");
  const [language, setLanguage]     = useState("en");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className="bg-white rounded-2xl border border-orange-900/[.07] shadow-[0_4px_20px_rgba(232,85,32,.07)] p-5 sm:p-6 mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-200 to-orange-500 flex items-center justify-center font-display text-3xl font-extrabold text-white shadow-[0_8px_24px_rgba(232,85,32,.3)]">
            JC
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-orange-500 border-2 border-white flex items-center justify-center text-white text-sm shadow-md hover:bg-orange-600 transition-colors">
            ✏️
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-[17px] font-bold text-gray-800">Dr. James Carter</p>
          <p className="text-[13px] text-orange-800/50 mt-0.5">Senior Cardiologist · Apollo Health Systems</p>
          <p className="text-[12px] text-orange-800/40 mt-0.5">ID: DOC-0042 · Licence: MCI-2008-KA-7741</p>
          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">✓ Verified</span>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-600 border border-orange-200">Senior Staff</span>
            <button className="text-[11px] font-semibold text-orange-500 hover:underline">Change avatar →</button>
          </div>
        </div>
      </div>

      <SettingsSection title="Personal Information" description="Your name and contact details visible to patients and staff.">
        <SettingsInput label="First Name" value={firstName} onChange={setFirstName} placeholder="First name" />
        <SettingsInput label="Last Name" value={lastName} onChange={setLastName} placeholder="Last name" />
        <SettingsInput label="Email" value={email} onChange={setEmail} type="email" hint="Used for login and notifications" />
        <SettingsInput label="Phone" value={phone} onChange={setPhone} type="tel" />
        <SettingsInput label="Department" value={department} onChange={setDepartment} />
        <SettingsSelect
          label="Specialty"
          value={specialty}
          onChange={setSpecialty}
          options={[
            { value: "cardiology", label: "Cardiology" },
            { value: "neurology", label: "Neurology" },
            { value: "orthopedics", label: "Orthopedics" },
            { value: "endocrinology", label: "Endocrinology" },
            { value: "pulmonology", label: "Pulmonology" },
            { value: "general", label: "General Medicine" },
          ]}
        />
      </SettingsSection>

      <SettingsSection title="Professional Bio" description="Shown on your public profile and patient-facing pages.">
        <div className="px-5 sm:px-6 py-4">
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={4}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8c8a8] bg-white text-[13.5px] text-gray-800 outline-none resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all leading-relaxed"
          />
          <p className="text-[11px] text-orange-800/40 mt-1.5">{bio.length} / 500 characters</p>
        </div>
      </SettingsSection>

      <SettingsSection title="Localisation">
        <SettingsSelect
          label="Language"
          value={language}
          onChange={setLanguage}
          options={[
            { value: "en", label: "English (UK)" },
            { value: "en-us", label: "English (US)" },
            { value: "hi", label: "हिन्दी" },
            { value: "ta", label: "தமிழ்" },
          ]}
        />
        <SettingsSelect
          label="Time Zone"
          value="IST"
          onChange={() => {}}
          options={[
            { value: "IST", label: "IST — Asia/Kolkata (UTC+5:30)" },
            { value: "UTC", label: "UTC" },
            { value: "EST", label: "EST — America/New_York" },
          ]}
        />
        <SettingsSelect
          label="Date Format"
          value="dmy"
          onChange={() => {}}
          options={[
            { value: "dmy", label: "DD/MM/YYYY" },
            { value: "mdy", label: "MM/DD/YYYY" },
            { value: "ymd", label: "YYYY-MM-DD" },
          ]}
        />
      </SettingsSection>

      <SaveBar onSave={handleSave} saved={saved} />
    </div>
  );
}
