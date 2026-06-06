"use client";

import React from "react";
import { useRouter } from "next/navigation";
import LandingDashboard from "./LandingDashboard";

export default function LandingHero() {
  const router = useRouter();

  return (
    <section className="hero">
      <div>
        <div className="eyebrow">
          <span className="dot" />
          Trusted by 2,000+ companies worldwide
        </div>
        <h1>
          Smart Health for
          <br />
          a <em>Stronger</em>
          <br />
          Workforce
        </h1>
        <p>
          Salford & Co. brings digital health management to your organisation — unified records, real-time wellness
          insights, and proactive care that keeps your team at peak performance.
        </p>
        <div className="hbtns">
          <button className="btn-p" type="button" onClick={() => router.push("/login")}>Start Free Trial</button>
          <button className="btn-s" type="button" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            Watch Demo
          </button>
        </div>
        <div className="hstats">
          <div>
            <div className="stat-n">
              98<em>%</em>
            </div>
            <div className="stat-l">Employee satisfaction</div>
          </div>
          <div>
            <div className="stat-n">
              3.4<em>×</em>
            </div>
            <div className="stat-l">Faster record access</div>
          </div>
          <div>
            <div className="stat-n">
              40<em>%</em>
            </div>
            <div className="stat-l">Fewer sick days</div>
          </div>
        </div>
      </div>

      <div className="rv">
        <LandingDashboard />
      </div>
    </section>
  );
}
