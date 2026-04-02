
"use client";
import Link from "next/link";

const LINKS = [
  { label: "Moving", href: "/moving" },
  { label: "Landscaping", href: "/landscaping" },
  { label: "Cleaning", href: "/cleaning" },
  { label: "Pool Care", href: "/pool" },
  { label: "Admin", href: "/admin" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--dark)",
        padding: "52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "24px",
        borderTop: "1px solid rgba(255,246,246,0.06)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.3rem",
          fontWeight: 900,
          color: "var(--cream)",
        }}
      >
        Swift<span style={{ color: "var(--teal)" }}>Move</span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
        {LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,246,246,0.35)",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,246,246,0.35)")
            }
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Note */}
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.7rem",
          color: "rgba(255,246,246,0.25)",
          letterSpacing: "0.06em",
        }}
      >
        &copy; {new Date().getFullYear()} SwiftMove Inc. All rights reserved.
      </div>
    </footer>
  );
}