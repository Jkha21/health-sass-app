import React from "react";

export default function SignupLoading() {
  return (
    <div 
      style={{
        display: "flex", 
        minHeight: "100vh", 
        alignItems: "center", 
        justifyContent: "center", 
        background: "#c85828"
      }}
    >
      {/* Reusing your template's CSS spinner class */}
      <div className="btn-spin" style={{ display: "block", width: "40px", height: "40px" }}></div>
    </div>
  );
}