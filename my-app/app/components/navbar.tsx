"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  { name: "Moving", href: "/moving" },
  { name: "Landscaping", href: "/landscaping" },
  { name: "Cleaning", href: "/cleaning" },
  { name: "Pool Maintenance", href: "/pool" },
  { name: "Plumbing", href: "/plumbing" },
  { name: "Electrical", href: "/electrical" },
  { name: "Painting", href: "/painting" },
  { name: "Roofing", href: "/roofing" },
  { name: "HVAC", href: "/hvac" },
  { name: "Carpentry", href: "/carpentry" },
  { name: "Pest Control", href: "/pest-control" },
  { name: "Junk Removal", href: "/junk-removal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        padding: scrolled ? "14px 52px" : "24px 52px",
        background: "rgba(26,46,53,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,246,246,0.1)",
      }}
    >
      <div className="flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.5rem",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            color: "var(--cream)",
            textDecoration: "none",
          }}
        >
          Easy<span style={{ color: "var(--teal)" }}>Way</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-9">
 {["About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.76rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,246,246,0.8)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,246,246,0.8)")}
            >
              {item}
            </Link>
          ))}
          {/* Services dropdown */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.76rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: dropdownOpen ? "var(--teal)" : "rgba(255,246,246,0.8)",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.3s",
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
              onMouseLeave={(e) => {
                if (!dropdownOpen) e.currentTarget.style.color = "rgba(255,246,246,0.8)";
              }}
            >
              Services
              <ChevronDown
                size={13}
                style={{
                  transition: "transform 0.3s",
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {/* Dropdown panel */}
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 18px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(26,46,53,0.98)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,246,246,0.1)",
                  borderRadius: "6px",
                  padding: "8px",
                  minWidth: "200px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                }}
              >
                {SERVICES.map((s) => (
                  <Link
                    key={s.name}
                    href={s.href}
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: "block",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 400,
                      letterSpacing: "0.08em",
                      color: "rgba(255,246,246,0.7)",
                      textDecoration: "none",
                      padding: "10px 16px",
                      borderRadius: "4px",
                      transition: "background 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(140,199,196,0.1)";
                      e.currentTarget.style.color = "var(--teal)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(255,246,246,0.7)";
                    }}
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Static links */}
         
        </div>

        {/* Call Now CTA */}
        <a
          href="tel:7734485995"
          className="hidden md:flex items-center gap-2"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.76rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--cream)",
            background: "var(--teal, #8cc7c4)",
            border: "1.5px solid var(--teal, #8cc7c4)",
            padding: "10px 22px",
            borderRadius: "3px",
            textDecoration: "none",
            transition: "background 0.3s, border-color 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--teal)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--teal, #8cc7c4)";
            e.currentTarget.style.color = "var(--cream)";
          }}
        >
          <Phone size={13} />
          (773) 448-5995
        </a>

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
          className="md:hidden mt-4 flex flex-col gap-1 p-4 rounded-lg"
          style={{
            background: "rgba(26,46,53,0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,246,246,0.1)",
          }}
        >
          {/* Mobile services accordion */}
          <button
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,246,246,0.8)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "12px 12px",
              width: "100%",
              borderRadius: "4px",
            }}
          >
            Services
            <ChevronDown
              size={14}
              style={{
                transition: "transform 0.3s",
                transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                color: "var(--teal)",
              }}
            />
          </button>

          {mobileServicesOpen && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2px",
                padding: "4px 8px 8px",
              }}
            >
              {SERVICES.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: "rgba(255,246,246,0.6)",
                    textDecoration: "none",
                    padding: "8px 10px",
                    borderRadius: "3px",
                  }}
                >
                  {s.name}
                </Link>
              ))}
            </div>
          )}

          {["About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,246,246,0.8)",
                textDecoration: "none",
                padding: "12px 12px",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}

          <a
            href="tel:7734485995"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--dark)",
              background: "var(--teal, #8cc7c4)",
              padding: "13px 20px",
              borderRadius: "3px",
              textDecoration: "none",
              marginTop: "8px",
            }}
            onClick={() => setMenuOpen(false)}
          >
            <Phone size={13} />
            (773) 448-5995
          </a>
        </div>
      )}
    </nav>
  );
}