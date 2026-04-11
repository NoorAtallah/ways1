"use client";

import { ArrowRight } from "lucide-react";

const SLIDES = [
  {
    id: 0,
    tag: "Moving Services",
    title: "Move Smarter,",
    titleItalic: "Live Better",
    desc: "Room-by-room planning, instant quotes, and a crew that cares.",
    cta: "Plan Your Move",
    href: "/moving",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    position: "tl",
  },
  {
    id: 1,
    tag: "Landscaping",
    title: "Your Yard,",
    titleItalic: "Reimagined",
    desc: "From lawn care to full garden design — lasting beauty outdoors.",
    cta: "Get a Free Quote",
    href: "/landscaping",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
    position: "tr",
  },
  {
    id: 2,
    tag: "Cleaning Services",
    title: "Spotless Homes,",
    titleItalic: "Every Time",
    desc: "Deep cleans and recurring schedules tailored to how you live.",
    cta: "Book a Clean",
    href: "/cleaning",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80",
    position: "bl",
  },
  {
    id: 3,
    tag: "Pool Maintenance",
    title: "Crystal Clear,",
    titleItalic: "All Season",
    desc: "Weekly care and balancing that keeps your pool flawless year-round.",
    cta: "Start a Plan",
    href: "/pool",
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80",
    position: "br",
  },
];

const contentPos: Record<string, React.CSSProperties> = {
  tl: { top: 36, left: 36 },
  tr: { top: 36, right: 36, textAlign: "right", alignItems: "flex-end" },
  bl: { bottom: 36, left: 36 },
  br: { bottom: 36, right: 36, textAlign: "right", alignItems: "flex-end" },
};

const overlayDir: Record<string, string> = {
  tl: "135deg",
  tr: "225deg",
  bl: "45deg",
  br: "315deg",
};

const transformOrigin: Record<string, string> = {
  tl: "bottom right",
  tr: "bottom left",
  bl: "top right",
  br: "top left",
};

export default function HeroGrid() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 72px)",
        minHeight: 0,
        background: "#1a2e35",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 3,
        fontFamily: "'DM Sans', sans-serif",
        marginTop: "70px",
      }}
    >
      {SLIDES.map((slide) => (
        <a
          key={slide.id}
          href={slide.href}
          style={{
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            textDecoration: "none",
            transformOrigin: transformOrigin[slide.position],
            transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
            (e.currentTarget as HTMLElement).style.zIndex = "10";
            const bg = e.currentTarget.querySelector(".panel-bg") as HTMLElement;
            if (bg) bg.style.transform = "scale(1.06)";
            const desc = e.currentTarget.querySelector(".panel-desc") as HTMLElement;
            if (desc) { desc.style.maxHeight = "60px"; desc.style.opacity = "1"; }
            const cta = e.currentTarget.querySelector(".panel-cta") as HTMLElement;
            if (cta) { cta.style.opacity = "1"; cta.style.transform = "translateY(0)"; }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLElement).style.zIndex = "1";
            const bg = e.currentTarget.querySelector(".panel-bg") as HTMLElement;
            if (bg) bg.style.transform = "scale(1)";
            const desc = e.currentTarget.querySelector(".panel-desc") as HTMLElement;
            if (desc) { desc.style.maxHeight = "0"; desc.style.opacity = "0"; }
            const cta = e.currentTarget.querySelector(".panel-cta") as HTMLElement;
            if (cta) { cta.style.opacity = "0"; cta.style.transform = "translateY(8px)"; }
          }}
        >
          {/* Background image */}
          <div
            className="panel-bg"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${slide.img}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
            }}
          />

          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(${overlayDir[slide.position]}, rgba(10,20,24,0.6) 0%, rgba(10,20,24,0.1) 100%)`,
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              maxWidth: 300,
              ...contentPos[slide.position],
            }}
          >
            {/* Number */}
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "0.65rem",
                color: "rgba(255,246,246,0.3)",
                letterSpacing: "0.1em",
                marginBottom: 2,
              }}
            >
              {String(slide.id + 1).padStart(2, "0")}
            </span>

            {/* Tag */}
            <span
              style={{
                fontSize: "0.63rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(140,199,196,0.9)",
                fontWeight: 500,
              }}
            >
              {slide.tag}
            </span>

            {/* Title */}
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.2rem, 2vw, 1.75rem)",
                fontWeight: 800,
                color: "#FFF6F6",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {slide.title}
              <br />
              <em style={{ fontStyle: "italic", color: "var(--teal, #8cc7c4)" }}>
                {slide.titleItalic}
              </em>
            </h2>

            {/* Description — hidden until hover */}
            <p
              className="panel-desc"
              style={{
                fontSize: "0.82rem",
                color: "rgba(255,246,246,0.65)",
                lineHeight: 1.6,
                maxHeight: 0,
                overflow: "hidden",
                opacity: 0,
                margin: 0,
                transition: "max-height 0.6s ease, opacity 0.55s ease 0.08s",
              }}
            >
              {slide.desc}
            </p>

            {/* CTA */}
            <span
              className="panel-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 4,
                padding: "10px 18px",
                border: "1.5px solid rgba(255,246,246,0.35)",
                borderRadius: 3,
                color: "#FFF6F6",
                fontSize: "0.68rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "transparent",
                opacity: 0,
                transform: "translateY(8px)",
                transition:
                  "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s, background 0.3s, border-color 0.3s",
                width: "fit-content",
              }}
            >
              {slide.cta}
              <ArrowRight size={13} />
            </span>
          </div>
        </a>
      ))}

      {/* Cross lines */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 3,
          background: "rgba(255,246,246,0.1)",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          zIndex: 20,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 3,
          background: "rgba(255,246,246,0.1)",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 20,
        }}
      />
    </section>
  );
}