import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:       "HealthSync",
  description: "Smart health management for smarter work",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}