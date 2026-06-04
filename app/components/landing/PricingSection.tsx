import React from "react";

const PLANS = [
  {
    tier: "Starter",
    price: "$29",
    description: "For small teams getting started with digital health records and automated reminders.",
    features: [
      "Up to 25 employees",
      "Digital health records",
      "Appointment & checkup reminders",
      "Basic wellness reporting",
      "Email support (48h SLA)",
      "Advanced analytics dashboard",
      "Custom HRIS integrations",
      "Dedicated account manager",
    ],
    button: { label: "Start Free Trial", variant: "pbtn-o" },
  },
  {
    tier: "Professional",
    badge: "Most Popular",
    price: "$79",
    description: "For growing companies that need full wellness visibility and proactive team health management.",
    features: [
      "Up to 150 employees",
      "Digital health records",
      "Appointment & checkup reminders",
      "Advanced analytics dashboard",
      "Priority chat & email support",
      "Custom integrations (up to 5)",
      "Compliance & audit reports",
      "Dedicated account manager",
    ],
    button: { label: "Start Free Trial", variant: "pbtn-s" },
  },
  {
    tier: "Enterprise",
    price: "Custom",
    description: "For large organisations with complex compliance, integrations, and enterprise security requirements.",
    features: [
      "Unlimited employees",
      "Digital health records",
      "Appointment & checkup reminders",
      "Advanced analytics dashboard",
      "24/7 phone, chat & email support",
      "Unlimited custom integrations",
      "Full compliance & HIPAA suite",
      "Dedicated account manager + SLA",
    ],
    button: { label: "Talk to Sales", variant: "pbtn-o" },
  },
];

export default function PricingSection() {
  return (
    <section className="sec" id="pricing">
      <div className="sec-inner">
        <div className="rv" style={{ textAlign: "center" }}>
          <span className="sec-lbl">Simple pricing</span>
          <h2 className="sec-h" style={{ margin: "0 auto 14px" }}>
            No surprises. Just value.
          </h2>
          <p className="sec-sub cx">
            Scale from a small team to an enterprise — pay only for what you need, with a 14-day free trial on every plan.
            No credit card required.
          </p>
        </div>
        <div className="pgrid rv">
          {PLANS.map((plan) => (
            <div key={plan.tier} className={`pc${plan.badge ? " feat" : ""}`}>
              {plan.badge && <div className="pbadge">{plan.badge}</div>}
              <div className="ptier">{plan.tier}</div>
              <div className="pamt">
                {plan.price}
                {plan.price !== "Custom" && <sub> /mo</sub>}
              </div>
              <div className="pdesc">{plan.description}</div>
              <div className="pdiv" />
              <ul className="plist">
                {plan.features.map((feature) => (
                  <li key={feature} className={feature.includes("Advanced analytics") && plan.tier === "Starter" ? "off" : undefined}>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`pbtn ${plan.button.variant}`} type="button">
                {plan.button.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
