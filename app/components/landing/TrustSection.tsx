import React from "react";

const TRUSTED = ["Meridian", "Vantage Health", "Orion Corp", "NovaPharma", "Crestline", "Apexwell"];

export default function TrustSection() {
  return (
    <div className="trust">
      <p>Trusted by forward-thinking teams at</p>
      <div className="lrow">
        {TRUSTED.map((label) => (
          <span key={label} className="flogo">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
