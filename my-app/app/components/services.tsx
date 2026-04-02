"use client";

import { Truck, Leaf, Sparkles, Waves, ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    num: "01",
    icon: <Truck size={20} />,
    name: "Moving Services",
    desc: "Pick your items room by room and get an instant quote based on ZIP code distance and volume.",
    href: "/moving",
    bg: "var(--purple)",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=70",
  },
  {
    num: "02",
    icon: <Leaf size={20} />,
    name: "Landscaping",
    desc: "Transform your outdoor spaces with expert planting, design, and ongoing yard maintenance.",
    href: "/landscaping",
    bg: "#2a7a6e",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=70",
  },
  {
    num: "03",
    icon: <Sparkles size={20} />,
    name: "Cleaning Services",
    desc: "Deep cleans, recurring plans, and move-in/out packages tailored to your lifestyle.",
    href: "/cleaning",
    bg: "var(--dark)",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=70",
  },
  {
    num: "04",
    icon: <Waves size={20} />,
    name: "Pool Maintenance",
    desc: "Year-round pool care subscriptions keeping your water safe, clean, and crystal clear.",
    href: "/pool",
    bg: "var(--red)",
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=70",
  },
];

function ServiceCard({ service }: { service: (typeof SERVICES)[0] }) {
  return (
    <Link
      href={service.href}
      className="service-card group"
      style={{
        position: "relative",
        overflow: "hidden",
        height: "460px",
        cursor: "pointer",
        background: service.bg,
        textDecoration: "none",
        display: "block",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${service.img}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1), opacity 0.4s",
        }}
        className="service-card-img"
      />

      {/* Glass overlay on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(26,46,53,0.0)",
          backdropFilter: "blur(0px)",
          transition: "background 0.4s, backdrop-filter 0.4s",
        }}
        className="service-glass-layer"
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "34px 30px",
        }}
      >
        {/* Big number */}
        <span
          className="service-num"
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            fontFamily: "'Playfair Display', serif",
            fontSize: "4.5rem",
            fontWeight: 900,
            color: "rgba(255,246,246,0.1)",
            lineHeight: 1,
          }}
        >
          {service.num}
        </span>

        {/* Icon — glass pill */}
        <div
          className="service-icon-wrap"
          style={{
            width: "46px",
            height: "46px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "18px",
            color: "var(--teal)",
            background: "rgba(255,246,246,0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1.5px solid rgba(255,246,246,0.2)",
            borderRadius: "4px",
          }}
        >
          {service.icon}
        </div>

        {/* Name */}
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.55rem",
            fontWeight: 700,
            color: "var(--cream)",
            lineHeight: 1.2,
            marginBottom: "10px",
          }}
        >
          {service.name}
        </h3>

        {/* Desc — reveals on hover */}
        <p
          className="service-desc"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            color: "rgba(255,246,246,0.6)",
            lineHeight: 1.72,
            fontWeight: 300,
          }}
        >
          {service.desc}
        </p>

        {/* Arrow */}
        <div
          className="service-arrow flex items-center gap-2 mt-5"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,246,246,0.55)",
          }}
        >
          Explore <ArrowRight size={13} />
        </div>
      </div>

      <style jsx>{`
        .service-card:hover .service-card-img {
          transform: scale(1.07);
          opacity: 0.18;
        }
        .service-card:hover .service-glass-layer {
          background: rgba(26,46,53,0.15);
          backdrop-filter: blur(4px);
        }
        .service-card:hover .service-num {
          color: rgba(255,246,246,0.22);
        }
        .service-card:hover .service-icon-wrap {
          transform: scale(1.12) rotate(-4deg);
          border-color: var(--teal);
        }
        .service-card:hover .service-desc {
          max-height: 80px;
          opacity: 1;
        }
        .service-card:hover .service-arrow {
          transform: translateX(0);
          opacity: 1;
        }
        .service-desc {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.5s ease, opacity 0.4s ease;
        }
        .service-arrow {
          transform: translateX(-10px);
          opacity: 0;
          transition: transform 0.4s, opacity 0.4s;
        }
        .service-icon-wrap {
          transition: transform 0.4s, border-color 0.4s;
        }
        .service-num {
          transition: color 0.4s;
        }
      `}</style>
    </Link>
  );
}

export default function ServicesGrid() {
  return (
    <section style={{ background: "var(--cream)", padding: "110px 52px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "64px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
            fontWeight: 900,
            color: "var(--dark)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          What We
          <br />
          <em style={{ fontStyle: "italic", color: "var(--purple)" }}>Offer</em>
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.92rem",
            color: "rgba(26,46,53,0.5)",
            maxWidth: "260px",
            lineHeight: 1.75,
            fontWeight: 300,
            textAlign: "right",
          }}
        >
          Four services. One trusted team. Wherever you are in the United States.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2px",
        }}
      >
        {SERVICES.map((s) => (
          <ServiceCard key={s.num} service={s} />
        ))}
      </div>
    </section>
  );
}