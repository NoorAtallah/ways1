"use client";

import { Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section
      style={{
        background: "var(--cream)",
        padding: "110px 52px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "center",
      }}
    >
      {/* Left */}
      <div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
            fontWeight: 900,
            color: "var(--dark)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "20px",
          }}
        >
          Ready to Get
          <br />
          <em style={{ fontStyle: "italic", color: "var(--red)" }}>Started?</em>
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.95rem",
            color: "rgba(26,46,53,0.52)",
            lineHeight: 1.78,
            fontWeight: 300,
            maxWidth: "380px",
          }}
        >
          Get an instant quote in minutes — no phone calls, no waiting. Pick
          your service and we will handle the rest from start to finish.
        </p>
      </div>

      {/* Right — glass card with buttons */}
      <div
        style={{
          background: "rgba(26,46,53,0.04)",
          backdropFilter: "blur(0px)",
          border: "1px solid rgba(26,46,53,0.08)",
          borderRadius: "8px",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(26,46,53,0.35)",
            marginBottom: "6px",
          }}
        >
          Choose where to start
        </p>

        <Link
          href="/moving"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--cream)",
            background: "var(--dark)",
            padding: "18px 24px",
            borderRadius: "4px",
            textDecoration: "none",
            transition: "background 0.3s, transform 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--red)";
            e.currentTarget.style.transform = "translateX(4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--dark)";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          <span className="flex items-center gap-3">
            <Calculator size={16} />
            Calculate Moving Cost
          </span>
          <ArrowRight size={16} />
        </Link>

        <Link
          href="/cleaning"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--dark)",
            background: "transparent",
            padding: "18px 24px",
            borderRadius: "4px",
            border: "1.5px solid rgba(26,46,53,0.15)",
            textDecoration: "none",
            transition: "border-color 0.3s, color 0.3s, background 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--teal)";
            e.currentTarget.style.color = "var(--purple)";
            e.currentTarget.style.background = "rgba(140,199,196,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(26,46,53,0.15)";
            e.currentTarget.style.color = "var(--dark)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          Book a Cleaning
          <ArrowRight size={16} />
        </Link>

        <Link
          href="/services"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--dark)",
            background: "transparent",
            padding: "18px 24px",
            borderRadius: "4px",
            border: "1.5px solid rgba(26,46,53,0.15)",
            textDecoration: "none",
            transition: "border-color 0.3s, color 0.3s, background 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(26,46,53,0.3)";
            e.currentTarget.style.color = "var(--dark)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(26,46,53,0.15)";
          }}
        >
          Browse All Services
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}