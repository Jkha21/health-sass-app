"use client"; // <--- Add this at the absolute top

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="box-outer text-center">
      <h2 className="text-red">Something went wrong!</h2>
      <button className="btn-main mt-4" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}