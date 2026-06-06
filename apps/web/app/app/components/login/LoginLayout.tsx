"use client";

import React from "react";

const extendedAnimations = `
  :root {
    --dark: #0b0705;
    --card: #111009;
    --accent: #e07840;
    --accent-h: #e98a58;
    --text: #f0dcc8;
    --muted: #7a6858;
    --border: rgba(190,140,90,0.14);
    --input-bg: rgba(255,255,255,0.038);
    --focus: rgba(224,120,64,0.18);
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: var(--dark);
    color: var(--text);
    font-family: 'Nunito', sans-serif;
  }

  @media (max-width: 768px) {
    html, body {
      height: auto;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }

  /* Custom Pure Functional Animations */
  @keyframes lfall {
    0% { opacity: 0.92; transform: translateY(-40px) rotate(0deg); }
    90% { opacity: 0.6; }
    100% { opacity: 0; transform: translateY(105vh) rotate(380deg); }
  }

  @keyframes fup {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-7px); }
    40% { transform: translateX(7px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }

  .animate-leaf-fall { animation: lfall linear infinite; }
  .animate-fade-up { animation: fup 0.55s ease both; }
  .animate-shake { animation: shake 0.4s ease !important; }
`;

export default function LoginLayout() {
  return <style dangerouslySetInnerHTML={{ __html: extendedAnimations }} />;
}