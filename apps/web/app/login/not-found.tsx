import React from "react";
import Link from "next/link";

export default function LoginNotFound() {
  return (
    <div className="right">
      <div className="box">
        <h1>Page not found</h1>
        <p className="sub">The login page could not be found.</p>
        <p className="mt-4"><Link href="/">Go home</Link></p>
      </div>
    </div>
  );
}
