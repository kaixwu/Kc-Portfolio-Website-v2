"use client";

import { useEffect } from "react";
import Link from "next/link";

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
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
      color: "var(--text-color, #fff)",
      backgroundColor: "var(--bg-color, #080808)",
      padding: "2rem"
    }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem", fontFamily: "var(--font-unbounded, 'Unbounded', sans-serif)" }}>Something went wrong!</h2>
      <p style={{ marginBottom: "2rem", opacity: 0.8 }}>An unexpected error occurred. Don't worry, it's been logged.</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => reset()}
          className="btn"
          style={{ cursor: "pointer", border: "none" }}
        >
          Try again
        </button>
        <Link href="/" className="btn" style={{ background: "transparent", border: "1px solid var(--main-color, #ea580c)" }}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
