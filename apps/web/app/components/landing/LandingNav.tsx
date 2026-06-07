"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LandingNavProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function LandingNav({ open, setOpen }: LandingNavProps) {
  const router = useRouter();

  const handleStart = () => {
    setOpen(false);
    router.push("/login");
  };

  return (
    <>
      <nav 
        style={{ 
          backgroundColor: "rgba(18, 18, 18, 0.92)", // Dark background with 92% opacity
          borderBottom: "1px solid rgba(255, 255, 255, 0.15)", 
          backdropFilter: "blur(10px)", // Blurs content underneath for a sleek modern look
          position: "sticky", // Optional: keeps it at the top while scrolling
          top: 0,
          zIndex: 50
        }}
      >
        <div className="n-logo">
          <svg viewBox="0 0 27 27" fill="none">
            <path d="M13.5 1.5L24 7.5v12l-10.5 6L3 19.5v-12z" stroke="rgba(255,255,255,.88)" strokeWidth="1.4" fill="none" />
            <path d="M13.5 7L19.5 10.5v7L13.5 21 7.5 17.5v-7z" stroke="rgba(255,255,255,.52)" strokeWidth="1" fill="none" />
          </svg>
          Salford &amp; Co.
        </div>

        <div className="n-links">
          <Link href="#features">Features</Link>
          <Link href="#how">How it works</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="#reviews">Reviews</Link>
        </div>

        <button className="n-cta" type="button" onClick={handleStart}>
          Get Started Free
        </button>

        <button
          className={`hamburger ${open ? "open" : ""}`}
          id="hbg"
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Matching background update for mobile menu */}
      <div 
        className={`mob-menu${open ? " open" : ""}`} 
        id="mobMenu"
        style={{ backgroundColor: "rgba(18, 18, 18, 0.98)" }} // Even more opaque for readability
      >
        <Link href="#features" className="mob-link" onClick={() => setOpen(false)}>
          Features
        </Link>
        <Link href="#how" className="mob-link" onClick={() => setOpen(false)}>
          How it works
        </Link>
        <Link href="#pricing" className="mob-link" onClick={() => setOpen(false)}>
          Pricing
        </Link>
        <Link href="#reviews" className="mob-link" onClick={() => setOpen(false)}>
          Reviews
        </Link>
        <button className="mob-cta" type="button" onClick={handleStart}>
          Get Started Free
        </button>
      </div>
    </>
  );
}