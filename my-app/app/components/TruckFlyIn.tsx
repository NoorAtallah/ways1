"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TruckFlyIn() {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = React.useState(1440);

  React.useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Truck flies in from left, exits to right
  const x = useTransform(
    scrollYProgress,
    [0.1, 0.8],
    [`-${5 * screenWidth}px`, `${2.5 * screenWidth}px`]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.7, 0.8],
    [0, 1, 1, 0]
  );

  // Subtle text fade tied to scroll
  const textOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.65, 0.8],
    [0, 1, 1, 0]
  );

  const textY = useTransform(
    scrollYProgress,
    [0.15, 0.35],
    ["30px", "0px"]
  );

  return (
    <div
      ref={targetRef}
      style={{
        position: "relative",
        height: "200vh",
        background: "var(--cream)",
      }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(44,104,123,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Road line */}
        <div
          style={{
            position: "absolute",
            bottom: "28%",
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(to right, transparent, rgba(44,104,123,0.15) 20%, rgba(44,104,123,0.15) 80%, transparent)",
          }}
        />

        {/* Dashed road center line */}
        <div
          style={{
            position: "absolute",
            bottom: "calc(28% + 12px)",
            left: 0,
            right: 0,
            height: "2px",
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(140,199,196,0.2) 0px, rgba(140,199,196,0.2) 40px, transparent 40px, transparent 80px)",
          }}
        />

        {/* Static text — center */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, position: "relative", zIndex: 10, textAlign: "center" }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--teal)",
              marginBottom: "16px",
            }}
          >
            Moving Services
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--dark)",
              maxWidth: "700px",
            }}
          >
            Your life, moved
            <br />
            <em style={{ fontStyle: "italic", color: "var(--purple)" }}>
              with care
            </em>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              fontWeight: 300,
              color: "rgba(26,46,53,0.55)",
              lineHeight: 1.75,
              marginTop: "20px",
              maxWidth: "420px",
              margin: "20px auto 0",
            }}
          >
            From a single room to an entire home — we handle every piece,
            every mile, every detail.
          </p>
        </motion.div>

        {/* Moving truck SVG — flies across */}
        <motion.div
          style={{
            x,
            opacity,
            position: "absolute",
            bottom: "22%",
            left: 0,
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          {/* Truck SVG */}
          <svg
            viewBox="0 0 520 200"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "clamp(320px, 36vw, 520px)", height: "auto", filter: "drop-shadow(0 12px 32px rgba(44,104,123,0.18))" }}
          >
            {/* Trailer body */}
            <rect x="10" y="40" width="320" height="130" rx="6" fill="#2C687B" />
            {/* Trailer side detail */}
            <rect x="20" y="52" width="300" height="106" rx="4" fill="#245a6b" />
            {/* SwiftMove logo on trailer */}
            <rect x="60" y="75" width="200" height="60" rx="4" fill="rgba(255,246,246,0.06)" />
            <text x="160" y="100" textAnchor="middle" fontFamily="serif" fontSize="18" fontWeight="900" fill="#FFF6F6">Swift</text>
            <text x="160" y="122" textAnchor="middle" fontFamily="serif" fontSize="18" fontWeight="900" fill="#8CC7C4">Move</text>
            {/* Trailer stripe */}
            <rect x="10" y="148" width="320" height="8" rx="0" fill="#8CC7C4" opacity="0.4" />
            {/* Trailer door lines */}
            <line x1="160" y1="40" x2="160" y2="170" stroke="rgba(255,246,246,0.12)" strokeWidth="1.5" />
            <line x1="100" y1="40" x2="100" y2="170" stroke="rgba(255,246,246,0.08)" strokeWidth="1" />
            <line x1="220" y1="40" x2="220" y2="170" stroke="rgba(255,246,246,0.08)" strokeWidth="1" />

            {/* Cab body */}
            <rect x="330" y="70" width="150" height="100" rx="8" fill="#1a2e35" />
            {/* Cab roof curve */}
            <path d="M330 78 Q340 48 390 45 L470 55 Q490 60 480 78 Z" fill="#1a2e35" />
            {/* Windshield */}
            <path d="M340 76 Q348 52 392 50 L462 58 Q476 62 468 76 Z" fill="#8CC7C4" opacity="0.35" />
            {/* Windshield glare */}
            <path d="M348 72 Q354 56 385 53 L420 57 Q384 62 360 74 Z" fill="rgba(255,246,246,0.15)" />
            {/* Cab door */}
            <rect x="338" y="90" width="55" height="72" rx="3" fill="#152530" />
            {/* Door window */}
            <rect x="344" y="95" width="43" height="35" rx="3" fill="#8CC7C4" opacity="0.2" />
            {/* Door handle */}
            <rect x="370" y="138" width="16" height="3" rx="1.5" fill="#8CC7C4" opacity="0.5" />
            {/* Cab side stripe */}
            <rect x="330" y="148" width="150" height="6" rx="0" fill="#8CC7C4" opacity="0.35" />
            {/* Headlight */}
            <rect x="472" y="82" width="16" height="10" rx="3" fill="#FFF6F6" opacity="0.9" />
            <rect x="472" y="82" width="16" height="10" rx="3" fill="#FFF6F6" opacity="0.4" style={{ filter: "blur(4px)" }} />
            {/* Grill */}
            <rect x="472" y="95" width="16" height="30" rx="2" fill="#2C687B" />
            <line x1="476" y1="95" x2="476" y2="125" stroke="rgba(255,246,246,0.2)" strokeWidth="1" />
            <line x1="480" y1="95" x2="480" y2="125" stroke="rgba(255,246,246,0.2)" strokeWidth="1" />
            <line x1="484" y1="95" x2="484" y2="125" stroke="rgba(255,246,246,0.2)" strokeWidth="1" />

            {/* Wheels — trailer */}
            <circle cx="80" cy="175" r="22" fill="#1a2e35" />
            <circle cx="80" cy="175" r="14" fill="#2C687B" />
            <circle cx="80" cy="175" r="5" fill="#8CC7C4" />
            <circle cx="200" cy="175" r="22" fill="#1a2e35" />
            <circle cx="200" cy="175" r="14" fill="#2C687B" />
            <circle cx="200" cy="175" r="5" fill="#8CC7C4" />
            {/* Wheels — cab rear */}
            <circle cx="370" cy="175" r="22" fill="#1a2e35" />
            <circle cx="370" cy="175" r="14" fill="#2C687B" />
            <circle cx="370" cy="175" r="5" fill="#8CC7C4" />
            {/* Wheel — cab front */}
            <circle cx="460" cy="175" r="22" fill="#1a2e35" />
            <circle cx="460" cy="175" r="14" fill="#2C687B" />
            <circle cx="460" cy="175" r="5" fill="#8CC7C4" />

            {/* Undercarriage */}
            <rect x="30" y="168" width="280" height="8" rx="2" fill="#152530" />
            <rect x="340" y="168" width="140" height="8" rx="2" fill="#152530" />

            {/* Exhaust pipe */}
            <rect x="476" y="50" width="8" height="30" rx="3" fill="#152530" />
            {/* Exhaust smoke puffs */}
            <circle cx="480" cy="44" r="6" fill="rgba(26,46,53,0.12)" />
            <circle cx="484" cy="36" r="5" fill="rgba(26,46,53,0.08)" />
            <circle cx="478" cy="28" r="4" fill="rgba(26,46,53,0.05)" />
          </svg>

          {/* Dust / motion trail */}
          <div
            style={{
              position: "absolute",
              right: "calc(100% - clamp(320px,36vw,520px) - 10px)",
              bottom: "8px",
              width: "120px",
              height: "20px",
              background:
                "linear-gradient(to left, rgba(140,199,196,0.12), transparent)",
              borderRadius: "50%",
              filter: "blur(6px)",
            }}
          />
        </motion.div>

        {/* Glass pill — bottom stat */}
        <motion.div
          style={{
            opacity: textOpacity,
            position: "absolute",
            bottom: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 15,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              background: "rgba(26,46,53,0.06)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(44,104,123,0.15)",
              borderRadius: "60px",
              padding: "14px 36px",
            }}
          >
            {[
              { num: "500+", label: "Moves completed" },
              { num: "48 states", label: "Coverage" },
              { num: "4.9★", label: "Customer rating" },
            ].map((stat, i) => (
              <React.Fragment key={i}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "var(--dark)",
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.68rem",
                      color: "rgba(26,46,53,0.45)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
                {i < 2 && (
                  <div
                    style={{
                      width: "1px",
                      height: "30px",
                      background: "rgba(44,104,123,0.2)",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}