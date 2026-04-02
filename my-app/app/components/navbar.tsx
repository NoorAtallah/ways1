"use client";

import { useState, useEffect } from "react";
import { Calculator, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        padding: scrolled ? "14px 52px" : "24px 52px",
        background: scrolled
          ? "rgba(26,46,53,0.55)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,246,246,0.1)"
          : "none",
      }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 900, letterSpacing: "-0.02em", color: "var(--cream)", textDecoration: "none" }}>
          Swift<span style={{ color: "var(--teal)" }}>Move</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-9">
          {["Moving", "Landscaping", "Cleaning", "Pool Care"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.76rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,246,246,0.8)", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,246,246,0.8)")}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/quote"
          className="hidden md:flex items-center gap-2"
          style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.76rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--cream)",
            background: "rgba(255,246,246,0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1.5px solid rgba(255,246,246,0.25)",
            padding: "10px 22px", borderRadius: "3px", textDecoration: "none",
            transition: "background 0.3s, border-color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--red)";
            e.currentTarget.style.borderColor = "var(--red)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,246,246,0.08)";
            e.currentTarget.style.borderColor = "rgba(255,246,246,0.25)";
          }}
        >
          <Calculator size={14} />
          Get a Quote
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          style={{ color: "var(--cream)", background: "none", border: "none", cursor: "pointer" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden mt-4 flex flex-col gap-4 p-6 rounded-lg"
          style={{
            background: "rgba(26,46,53,0.75)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,246,246,0.12)",
          }}
        >
          {["Moving", "Landscaping", "Cleaning", "Pool Care"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,246,246,0.8)", textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link
            href="/quote"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--cream)", background: "var(--red)", padding: "12px 20px", borderRadius: "3px", textDecoration: "none", textAlign: "center" }}
            onClick={() => setMenuOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}