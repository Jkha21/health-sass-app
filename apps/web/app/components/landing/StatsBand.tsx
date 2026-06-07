import React from "react";

const STATS = [
  { value: "2k+", label: "Companies onboarded" },
  { value: "1.2M", label: "Employee records managed" },
  { value: "40%", label: "Reduction in sick days" },
  { value: "99.9%", label: "Platform uptime SLA" },
];

export default function StatsBand() {
  return (
    <div className="sband rv">
      {STATS.map((item) => (
        <div key={item.label} className="sbstat">
          <div className="sbn">
            {item.value}
          </div>
          <div className="sbl">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
