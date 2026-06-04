"use client";

import React, { useState, useEffect } from "react";
import LandingStyles from "@/app/components/landing/LandingStyles";
import LandingNav from "@/app/components/landing/LandingNav";
import LandingHero from "@/app/components/landing/LandingHero";
import TrustSection from "@/app/components/landing/TrustSection";
import FeaturesSection from "@/app/components/landing/FeaturesSection";
import HowItWorksSection from "@/app/components/landing/HowItWorksSection";
import StatsBand from "@/app/components/landing/StatsBand";
import PricingSection from "@/app/components/landing/PricingSection";
import TestimonialsSection from "@/app/components/landing/TestimonialsSection";
import FinalCta from "@/app/components/landing/FinalCta";
import Footer from "@/app/components/landing/Footer";

export default function HomePage() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    // Scroll reveal: observe elements with `.rv` and add `.vis` when visible
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("vis");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    // Close menu on Escape
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setNavOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    // Prevent background scroll when mobile menu is open
    document.body.style.overflow = navOpen ? "hidden" : "";
  }, [navOpen]);

  return (
    <>
      <LandingStyles />
      <LandingNav open={navOpen} setOpen={setNavOpen} />
      <main>
        <LandingHero />
        <TrustSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsBand />
        <PricingSection />
        <TestimonialsSection />
        <FinalCta />
        <Footer />
      </main>
    </>
  );
}
