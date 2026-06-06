import type { Metadata } from "next";
import "./globals.css";

// Next.js will automatically detect app/icon.png and apply it!
export const metadata: Metadata = {
  title: "HealthSync",
  description: "Smart health management for smarter work",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}