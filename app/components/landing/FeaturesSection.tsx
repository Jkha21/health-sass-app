import React from "react";

const FEATURES = [
  {
    title: "Digital Health Records",
    description:
      "Centralise every employee's health history — lab results, prescriptions, visit notes — into a single secure, instantly searchable profile accessible anywhere.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: "Wellness Analytics",
    description:
      "Real-time dashboards surface burnout risk, absenteeism patterns, and team health scores so you can act with confidence before issues escalate.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: "Smart Reminders",
    description:
      "Automated nudges for upcoming checkups, vaccinations, and prescription renewals — so no employee misses preventive care again.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    title: "Team Access Controls",
    description:
      "Role-based access lets HR managers, clinic staff, and employees each see exactly what they need — with granular privacy built in from the start.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Compliance & Audit",
    description:
      "HIPAA-ready data handling, full tamper-proof audit trails, and one-click compliance reports — designed for regulated industries from day one.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Instant Integrations",
    description:
      "Connect with your HRIS, payroll, and insurance providers via pre-built connectors. Go live in hours, not weeks, with zero engineering effort.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="6" height="6" rx="1" />
        <rect x="16" y="3" width="6" height="6" rx="1" />
        <rect x="2" y="15" width="6" height="6" rx="1" />
        <path d="M22 18h-4M20 16v4M11 4h2a2 2 0 0 1 2 2v1M11 20h2a2 2 0 0 0 2-2v-1M5 12v3" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className="sec f-bg" id="features">
      <div className="sec-inner">
        <div className="rv" style={{ textAlign: "center" }}>
          <span className="sec-lbl">What we do</span>
          <h2 className="sec-h" style={{ margin: "0 auto 14px" }}>
            Everything your workforce health needs,
            <br />
            in one place
          </h2>
          <p className="sec-sub cx">
            From digital records to proactive wellness alerts — Salford & Co. gives HR leaders complete visibility and control over employee health across the organisation.
          </p>
        </div>
        <div className="fgrid rv">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="fc">
              <div className="fic">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
