"use client";

import { useRef } from "react";
import { Star, ThumbsUp } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Michael T.",
    date: "2 days ago",
    rating: 5,
    service: "Moving Services",
    text: "The crew showed up on time, wrapped everything carefully, and had us settled into the new place faster than I expected. Absolutely zero damage. Would recommend to anyone moving across state.",
    helpful: 12,
    avatar: "MT",
  },
  {
    id: 2,
    name: "Sandra R.",
    date: "4 days ago",
    rating: 5,
    service: "Cleaning Services",
    text: "Booked a deep clean before listing my home. The team was thorough, professional, and left every room spotless. My realtor was genuinely impressed. Worth every penny.",
    helpful: 8,
    avatar: "SR",
  },
  {
    id: 3,
    name: "James O.",
    date: "1 week ago",
    rating: 5,
    service: "Pool Maintenance",
    text: "Been using their pool plan for three months now. Water is always crystal clear, they show up like clockwork, and they actually flag issues before they become problems. Great service.",
    helpful: 19,
    avatar: "JO",
  },
  {
    id: 4,
    name: "Laura M.",
    date: "1 week ago",
    rating: 4,
    service: "Landscaping",
    text: "Our backyard went from overgrown and embarrassing to something we actually want to spend time in. The design team listened carefully and delivered exactly what we had in mind.",
    helpful: 6,
    avatar: "LM",
  },
  {
    id: 5,
    name: "David K.",
    date: "2 weeks ago",
    rating: 5,
    service: "Moving Services",
    text: "Second time using SwiftMove and they delivered again. Friendly team, no hidden fees, and the online booking made everything so easy. This is how a moving company should operate.",
    helpful: 24,
    avatar: "DK",
  },
  {
    id: 6,
    name: "Priya N.",
    date: "2 weeks ago",
    rating: 5,
    service: "Cleaning Services",
    text: "I have a recurring bi-weekly clean and it is genuinely one of the best decisions I have made. Consistent team, consistent quality. My home has never felt this well kept.",
    helpful: 11,
    avatar: "PN",
  },
  {
    id: 7,
    name: "Carlos B.",
    date: "3 weeks ago",
    rating: 4,
    service: "Pool Maintenance",
    text: "Very happy with the service. They sorted out a persistent algae problem that two other companies had failed to fix. Chemical levels have been perfect ever since.",
    helpful: 9,
    avatar: "CB",
  },
  {
    id: 8,
    name: "Emily W.",
    date: "1 month ago",
    rating: 5,
    service: "Landscaping",
    text: "They transformed our front yard for a spring refresh. Clean edges, healthy plants, and they even gave us a simple care guide to keep it looking good. Exceptional attention to detail.",
    helpful: 15,
    avatar: "EW",
  },
];

const GOOGLE_G = (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
    <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2c-7.6 0-14.2 4.5-17.7 11.1z"/>
    <path fill="#FBBC05" d="M24 46c5.5 0 10.5-1.9 14.4-5l-6.7-5.5C29.5 37.1 26.9 38 24 38c-6 0-11.1-4-12.9-9.5l-7 5.4C7.9 41.6 15.4 46 24 46z"/>
    <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.7-2.6 5-5 6.5l6.7 5.5C41.6 36.8 44.5 30.8 44.5 24c0-1.3-.2-2.7-.5-4z"/>
  </svg>
);

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= rating ? "#4285F4" : "transparent"}
          stroke={i <= rating ? "#4285F4" : "rgba(26,46,53,0.2)"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[0] }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid rgba(26,46,53,0.09)",
        borderRadius: "8px",
        padding: "28px 26px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        width: "320px",
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      {/* Avatar + name + Google G */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "var(--purple)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            {review.avatar}
          </div>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--dark)", margin: 0 }}>
              {review.name}
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(26,46,53,0.4)", margin: 0 }}>
              {review.date}
            </p>
          </div>
        </div>
        {GOOGLE_G}
      </div>

      {/* Stars + service tag */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <StarRow rating={review.rating} />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--purple)",
            background: "rgba(99,92,199,0.08)",
            padding: "3px 10px",
            borderRadius: "3px",
            fontWeight: 500,
          }}
        >
          {review.service}
        </span>
      </div>

      {/* Text */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.82rem",
          color: "rgba(26,46,53,0.6)",
          lineHeight: 1.72,
          fontWeight: 300,
          margin: 0,
          flex: 1,
        }}
      >
        "{review.text}"
      </p>

      {/* Helpful */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          paddingTop: "10px",
          borderTop: "1px solid rgba(26,46,53,0.06)",
        }}
      >
        <ThumbsUp size={12} color="rgba(26,46,53,0.3)" />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "rgba(26,46,53,0.35)" }}>
          {review.helpful} found this helpful
        </span>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.clientX - startX.current;
    trackRef.current.scrollLeft = scrollStart.current - dx;
  };

  const stopDrag = () => {
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.style.cursor = "grab";
      trackRef.current.style.userSelect = "";
    }
  };

  return (
    <section style={{ background: "var(--cream)", padding: "110px 0 110px" }}>
      {/* Header */}
      <div
        style={{
          padding: "0 52px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "64px",
          flexWrap: "wrap",
          gap: "32px",
        }}
      >
        {/* Left */}
        <div>
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
            Customer Reviews
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
            What Our Clients
            <br />
            <em style={{ fontStyle: "italic", color: "var(--purple)" }}>Are Saying</em>
          </h2>
        </div>

        {/* Google rating badge */}
        <div
          style={{
            background: "#fff",
            border: "1px solid rgba(26,46,53,0.09)",
            borderRadius: "8px",
            padding: "24px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            minWidth: "210px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {GOOGLE_G}
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "var(--dark)" }}>
              Google Reviews
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "5px" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", fontWeight: 900, color: "var(--dark)", lineHeight: 1 }}>
              4.9
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(26,46,53,0.35)", paddingBottom: "3px" }}>
              / 5
            </span>
          </div>
          <StarRow rating={5} size={16} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "rgba(26,46,53,0.4)", margin: 0, textAlign: "center" }}>
            Based on 240+ verified reviews
          </p>
        </div>
      </div>

      {/* Scrollable track — full width, no clipping on sides */}
      <div style={{ position: "relative" }}>
        {/* Left fade */}
        <div
          style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: 80,
            background: "linear-gradient(to right, var(--cream), transparent)",
            zIndex: 2, pointerEvents: "none",
          }}
        />
        {/* Right fade */}
        <div
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: 80,
            background: "linear-gradient(to left, var(--cream), transparent)",
            zIndex: 2, pointerEvents: "none",
          }}
        />

        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "scroll",
            overflowY: "hidden",
            paddingLeft: "52px",
            paddingRight: "52px",
            paddingBottom: "8px",
            cursor: "grab",
            /* hide scrollbar cross-browser */
            scrollbarWidth: "none",
          }}
        >
          <style>{`
            .reviews-track::-webkit-scrollbar { display: none; }
          `}</style>
          {REVIEWS.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>

      {/* Hint */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.65rem",
          color: "rgba(26,46,53,0.25)",
          letterSpacing: "0.1em",
          textAlign: "center",
          marginTop: "24px",
          textTransform: "uppercase",
        }}
      >
        Drag to scroll · Showing 4 &amp; 5 star reviews only
      </p>
    </section>
  );
}