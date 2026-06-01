import Link from "next/link";

export default function NotFound() {
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
      <h2 style={{ fontSize: "3rem", marginBottom: "1rem", fontFamily: "var(--font-unbounded, 'Unbounded', sans-serif)", color: "var(--main-color, #ea580c)" }}>404</h2>
      <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontFamily: "var(--font-unbounded, 'Unbounded', sans-serif)" }}>Page Not Found</h3>
      <p style={{ marginBottom: "2rem", opacity: 0.8 }}>The page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="btn">
        Return Home
      </Link>
    </div>
  );
}
