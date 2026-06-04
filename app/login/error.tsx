"use client";
import React from "react";

export default function LoginError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="right">
      <div className="box">
        <h1 className="text-red-400">Something went wrong</h1>
        <p className="sub">{error?.message ?? "Unexpected error."}</p>
        <div className="mt-4">
          <button className="btn-main" onClick={() => reset()}>Try again</button>
        </div>
      </div>
    </div>
  );
}
