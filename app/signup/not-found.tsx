import React from "react";

export default function SignupNotFound() {
  return (
    <div className="box-outer" style={{ textAlign: "center", padding: "40px 20px" }}>
      <h1>404 - Page Not Found</h1>
      <p className="sub">We couldn't find the signup resource you were looking for.</p>
      <a href="/signup" className="btn-main" style={{ display: "inline-block", textDecoration: "none" }}>
        Return to Signup
      </a>
    </div>
  );
}