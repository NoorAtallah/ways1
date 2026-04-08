"use client";

import { MapPin, Zap, BadgePercent, ShieldCheck, SlidersHorizontal, ClipboardList } from "lucide-react";

const REASONS = [
  {
    icon: <Zap size={22} />,
    title: "Instant Confirmation",
    desc: "See live availability and pricing, then lock in your booking in seconds — no waiting, no back-and-forth.",
  },
  {
    icon: <MapPin size={22} />,
    title: "Nationwide Coverage",
    desc: "From coast to coast, our vetted teams are ready to serve you wherever you are across the United States.",
  },
  {
    icon: <SlidersHorizontal size={22} />,
    title: "Tailored to You",
    desc: "Choose exactly what you need  services, extras, add-ons  built around how you actually live.",
  },
  {
    icon: <BadgePercent size={22} />,
    title: "Online-Only Savings",
    desc: "Book through our website and automatically save 10% on every order, every time. No codes needed.",
  },
  {
    icon: <ClipboardList size={22} />,
    title: "Full Transparency",
    desc: "Review every detail scope, notes, and preferences before you confirm. No surprises on the day.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Secure Checkout",
    desc: "Your payment information is fully encrypted and protected. Book with complete confidence.",
  },
];

export default function WhyBookOnline() {
  return (
    <section style={{ background: "var(--cream)", padding: "110px 52px" }}>
      {/* Header */}
      <div style={{ maxWidth: "560px", marginBottom: "72px" }}>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--purple)",
            fontWeight: 500,
            display: "block",
            marginBottom: "16px",
          }}
        >
          Why Book Online
        </span>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
            fontWeight: 900,
            color: "var(--dark)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          Smarter Booking,{" "}
          <em style={{ fontStyle: "italic", color: "var(--purple)" }}>
            Better Results
          </em>
        </h2>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "rgba(26,46,53,0.1)",
          border: "1px solid rgba(26,46,53,0.1)",
        }}
      >
        {REASONS.map((item) => (
          <div
            key={item.title}
            style={{
              background: "var(--cream)",
              padding: "42px 36px",
              transition: "background 0.4s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(26,46,53,0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--cream)";
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.5px solid rgba(26,46,53,0.18)",
                borderRadius: "4px",
                color: "var(--purple)",
                marginBottom: "24px",
              }}
            >
              {item.icon}
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.18rem",
                fontWeight: 700,
                color: "var(--dark)",
                lineHeight: 1.25,
                marginBottom: "12px",
              }}
            >
              {item.title}
            </h3>

            {/* Desc */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: "rgba(26,46,53,0.5)",
                lineHeight: 1.75,
                fontWeight: 300,
                margin: 0,
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}