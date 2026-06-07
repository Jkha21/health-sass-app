import React from "react";

const COMPANY_LINKS = [
  { title: "Product", links: ["Features", "Pricing", "Security", "Integrations", "Changelog"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Cookie Policy"] },
];

export default function Footer() {
  return (
    <>
      <footer>
        <div className="fbrand">
          <div className="flog">
            <svg viewBox="0 0 27 27" fill="none">
              <path d="M13.5 1.5L24 7.5v12l-10.5 6L3 19.5v-12z" stroke="rgba(255,255,255,.7)" strokeWidth="1.4" fill="none" />
              <path d="M13.5 7L19.5 10.5v7L13.5 21 7.5 17.5v-7z" stroke="rgba(255,255,255,.38)" strokeWidth="1" fill="none" />
            </svg>
            Salford &amp; Co.
          </div>
          <p>Smart health management for the modern workforce. Your digital record, always at hand.</p>
        </div>
        {COMPANY_LINKS.map((section) => (
          <div key={section.title} className="fcol">
            <h4>{section.title}</h4>
            {section.links.map((item) => (
              <a key={item} href="#">
                {item}
              </a>
            ))}
          </div>
        ))}
      </footer>
      <div className="fbot">
        <p>© 2026 Salford &amp; Co. All rights reserved.</p>
        <div>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </>
  );
}
