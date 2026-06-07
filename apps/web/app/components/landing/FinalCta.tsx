"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function FinalCta() {
  const router = useRouter();

  return (
    <section className="fcta">
      <div className="rv">
        <h2>
          Your healthiest team
          <br />
          starts <em>today</em>
        </h2>
        <p>
          Join 2,000+ companies who've made workforce health
          <br />
          their competitive advantage. Free for 14 days, no card needed.
        </p>
        <div className="btns">
          <button className="btn-p" type="button" onClick={() => router.push("/login")}>
            Start Free 14-Day Trial
          </button>
          <button className="btn-s" type="button">
            Book a Live Demo →
          </button>
        </div>
      </div>
    </section>
  );
}
