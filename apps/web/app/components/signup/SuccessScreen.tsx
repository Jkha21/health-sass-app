"use client";

import React, { useState } from "react";

interface SuccessScreenProps {
  email: string;
  onRedirectToLogin?: () => void;
  onResendEmail?: (email: string) => Promise<void>;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ email, onRedirectToLogin, onResendEmail }) => {
  const [resendStatus, setResendStatus] = useState<"idle" | "loading" | "sent">("idle");

  const handleResendAction = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (resendStatus !== "idle") return;

    setResendStatus("loading");
    try {
      if (onResendEmail) {
        await onResendEmail(email);
      }
      setResendStatus("sent");
      setTimeout(() => setResendStatus("idle"), 3000);
    } catch (error) {
      console.error("Failed to resend email:", error);
      setResendStatus("idle");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "10px", maxWidth: "420px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <style>{`
        :root {
          --accent: #e07840;
          --dark: #0b0705;
          --muted: #7a6858;
          --text: #f0dcc8;
          --accent-h: #e98a58;
        }
      `}</style>
      
      <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "rgba(82, 200, 122, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2fa859", marginBottom: "16px" }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--dark)", margin: "0 0 8px 0", letterSpacing: "-0.02em", fontFamily: "'Outfit', sans-serif" }}>Account Created!</h2>
      <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: "1.5", margin: "0 0 16px 0", letterSpacing: "0.01em" }}>
        We've sent a verification link to your email address. Click it to activate your account.
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(224, 120, 64, 0.08)", padding: "8px 14px", borderRadius: "30px", marginBottom: "20px", fontSize: "13px", fontWeight: 600, color: "var(--muted)", letterSpacing: "0.02em" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        <span>{email}</span>
      </div>

      <button 
        type="button" 
        onClick={onRedirectToLogin || (() => window.location.href = "/login")}
        style={{ width: "100%", padding: "13px", backgroundColor: "var(--accent)", color: "#ffffff", border: "none", borderRadius: "11px", fontSize: "14.5px", fontWeight: 700, cursor: "pointer", marginBottom: "14px", fontFamily: "'Nunito', sans-serif", letterSpacing: "0.02em", transition: "all 0.2s", boxShadow: "0 2px 8px rgba(224, 120, 64, 0.2)" }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.backgroundColor = "var(--accent-h)";
          btn.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.backgroundColor = "var(--accent)";
          btn.style.transform = "translateY(0)";
        }}
      >
        Go to Sign In
      </button>

      <div style={{ fontSize: "12.5px", color: "var(--muted)", letterSpacing: "0.01em" }}>
        Didn't receive it?{" "}
        <button
          onClick={handleResendAction}
          disabled={resendStatus !== "idle"}
          style={{ background: "none", border: "none", color: resendStatus === "sent" ? "#2fa859" : "var(--accent)", cursor: resendStatus === "idle" ? "pointer" : "default", fontWeight: 700, textDecoration: "none", fontFamily: "'Nunito', sans-serif", fontSize: "12.5px", padding: 0, transition: "color 0.2s", opacity: resendStatus === "idle" ? 1 : 0.7 }}
        >
          {resendStatus === "loading" ? "Sending…" : resendStatus === "sent" ? "Sent! Check your inbox" : "Resend email"}
        </button>
      </div>
    </div>
  );
};