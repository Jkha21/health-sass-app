import React from "react";

const STEPS = [
  {
    number: "01",
    title: "Connect your team",
    description:
      "Import employees from your HRIS or invite them via email. Health records are automatically consolidated from existing providers through our secure, encrypted data pipeline.",
  },
  {
    number: "02",
    title: "Configure your policies",
    description:
      "Set checkup schedules, wellness goals, and alert thresholds to match your company's health policy. Everything is customisable to your exact workflow and compliance requirements.",
  },
  {
    number: "03",
    title: "Monitor & act",
    description:
      "Your dashboard goes live immediately. Receive proactive alerts, review team health trends, generate compliance reports, and celebrate your healthiest quarter yet.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="sec" id="how">
      <div className="sec-inner">
        <div className="rv">
          <span className="sec-lbl">How it works</span>
          <h2 className="sec-h">Up and running<br />in three steps</h2>
          <p className="sec-sub">
            No lengthy onboarding. No IT overhead. Your team is live and healthier in under a day.
          </p>
        </div>
        <div className="steps rv">
          {STEPS.map((step) => (
            <div key={step.number} className="step">
              <div className="snum">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
