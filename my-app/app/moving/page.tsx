"use client";

import { useState } from "react";
import {
  ArrowRight,
  MapPin,
  Mail,
  User,
  Phone,
  Calendar,
  Truck,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function MovingPage() {
  const [form, setForm] = useState({
    pickupZip: "",
    dropoffZip: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    date: "",
    needVehicle: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Quote request:", form);
    router.push("/calculator");
  };
  // Add this to your useState block at the top:
  const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false);
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--dark, #1a2e35)",
        fontFamily: "'DM Sans', sans-serif",
        paddingTop: "72px",
      }}
    >
      {/* Hero strip */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "72px 52px 64px",
          borderBottom: "1px solid rgba(255,246,246,0.07)",
        }}
      >
        {/* Subtle bg texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(140,199,196,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <p
          style={{
            fontSize: "0.63rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(140,199,196,0.85)",
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          Moving Services
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            fontWeight: 800,
            color: "#FFF6F6",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          Move Smarter,{" "}
          <em style={{ fontStyle: "italic", color: "var(--teal, #8cc7c4)" }}>
            Live Better
          </em>
        </h1>
        <p
          style={{
            marginTop: 20,
            fontSize: "1rem",
            color: "rgba(255,246,246,0.55)",
            maxWidth: 520,
            lineHeight: 1.7,
          }}
        >
          Room-by-room planning, instant quotes, and a crew that cares. Tell us
          about your move and we'll get back to you within the hour.
        </p>
      </div>

      {/* Form section */}
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "64px 32px 96px",
        }}
      >
        {submitted ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              padding: "72px 32px",
              textAlign: "center",
            }}
          >
            <CheckCircle
              size={52}
              color="var(--teal, #8cc7c4)"
              strokeWidth={1.5}
            />
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "2rem",
                fontWeight: 700,
                color: "#FFF6F6",
                margin: 0,
              }}
            >
              Quote Request Sent!
            </h2>
            <p
              style={{
                color: "rgba(255,246,246,0.55)",
                fontSize: "0.95rem",
                maxWidth: 400,
              }}
            >
              We've received your details and will send your personalised quote
              shortly. Check your inbox at{" "}
              <strong style={{ color: "var(--teal, #8cc7c4)" }}>
                {form.email}
              </strong>
              .
            </p>
            <button
              onClick={() => setSubmitted(false)}
              style={{
                marginTop: 8,
                padding: "12px 28px",
                border: "1.5px solid rgba(255,246,246,0.2)",
                borderRadius: 3,
                background: "transparent",
                color: "rgba(255,246,246,0.7)",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Submit another
            </button>
          </div>
        ) : (
          <>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#FFF6F6",
                marginBottom: 40,
                letterSpacing: "-0.01em",
              }}
            >
              Get your free quote
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Zip row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <Field
                  icon={<MapPin size={15} />}
                  label="Pick up zip code"
                  name="pickupZip"
                  value={form.pickupZip}
                  onChange={handleChange}
                  placeholder="e.g. 60601"
                />
                <Field
                  icon={<MapPin size={15} />}
                  label="Drop off zip code"
                  name="dropoffZip"
                  value={form.dropoffZip}
                  onChange={handleChange}
                  placeholder="e.g. 60614"
                />
              </div>

              {/* Email */}
              <Field
                icon={<Mail size={15} />}
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />

              {/* Name row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <Field
                  icon={<User size={15} />}
                  label="First name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Jane"
                />
                <Field
                  icon={<User size={15} />}
                  label="Last name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Smith"
                />
              </div>

              {/* Phone */}
              <Field
                icon={<Phone size={15} />}
                label="Phone number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="(773) 000-0000"
              />

              {/* Date */}
              <Field
                icon={<Calendar size={15} />}
                label="Preferred move date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />

              {/* Vehicle dropdown */}
              {/* Vehicle dropdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,246,246,0.45)",
                    fontWeight: 500,
                  }}
                >
                  Need to move a vehicle?
                </label>
                <div style={{ position: "relative" }}>
                  <Truck
                    size={15}
                    style={{
                      position: "absolute",
                      left: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "rgba(140,199,196,0.6)",
                      pointerEvents: "none",
                      zIndex: 1,
                    }}
                  />
                  <div
                    onClick={() => setVehicleDropdownOpen(!vehicleDropdownOpen)}
                    style={{
                      padding: "14px 44px",
                      background: "rgba(255,246,246,0.04)",
                      border: `1px solid ${vehicleDropdownOpen ? "rgba(140,199,196,0.5)" : "rgba(255,246,246,0.1)"}`,
                      borderRadius: vehicleDropdownOpen ? "4px 4px 0 0" : 4,
                      color: form.needVehicle
                        ? "#FFF6F6"
                        : "rgba(255,246,246,0.3)",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    {form.needVehicle === "yes"
                      ? "Yes"
                      : form.needVehicle === "no"
                        ? "No"
                        : "Select an option"}
                  </div>
                  {/* Chevron */}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    style={{
                      position: "absolute",
                      right: 16,
                      top: "50%",
                      transform: `translateY(-50%) rotate(${vehicleDropdownOpen ? "180deg" : "0deg"})`,
                      pointerEvents: "none",
                      color: "rgba(255,246,246,0.3)",
                      transition: "transform 0.2s",
                    }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M2 4l4 4 4-4" />
                  </svg>
                  {/* Options */}
                  {vehicleDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "#1e3540",
                        border: "1px solid rgba(140,199,196,0.5)",
                        borderTop: "none",
                        borderRadius: "0 0 4px 4px",
                        zIndex: 50,
                        overflow: "hidden",
                      }}
                    >
                      {["yes", "no"].map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setForm({ ...form, needVehicle: opt });
                            setVehicleDropdownOpen(false);
                          }}
                          style={{
                            padding: "13px 16px",
                            color:
                              form.needVehicle === opt
                                ? "var(--teal, #8cc7c4)"
                                : "rgba(255,246,246,0.75)",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            background:
                              form.needVehicle === opt
                                ? "rgba(140,199,196,0.08)"
                                : "transparent",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                              "rgba(140,199,196,0.1)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background =
                              form.needVehicle === opt
                                ? "rgba(140,199,196,0.08)"
                                : "transparent")
                          }
                        >
                          {opt === "yes" ? "Yes" : "No"}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                style={{
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "16px 32px",
                  background: "var(--teal, #8cc7c4)",
                  border: "1.5px solid var(--teal, #8cc7c4)",
                  borderRadius: 3,
                  color: "var(--dark, #1a2e35)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                  transition: "background 0.3s, color 0.3s",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--teal, #8cc7c4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--teal, #8cc7c4)";
                  e.currentTarget.style.color = "var(--dark, #1a2e35)";
                }}
              >
                Get Quote
                <ArrowRight size={15} />
              </button>

              <p
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(255,246,246,0.3)",
                  textAlign: "center",
                  lineHeight: 1.6,
                  marginTop: 4,
                }}
              >
                Submitting sends us an email and creates a lead in the admin
                dashboard.
                <br />
                After getting your quote, you'll be redirected to our pricing
                calculator.
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

/* ── Reusable field ── */
function Field({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,246,246,0.45)",
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "rgba(140,199,196,0.6)",
            pointerEvents: "none",
            display: "flex",
          }}
        >
          {icon}
        </span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "14px 16px 14px 44px",
            background: "rgba(255,246,246,0.04)",
            border: "1px solid rgba(255,246,246,0.1)",
            borderRadius: 4,
            color: "#FFF6F6",
            fontSize: "0.9rem",
            fontFamily: "'DM Sans', sans-serif",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s",
            colorScheme: "dark",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "rgba(140,199,196,0.5)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,246,246,0.1)")
          }
        />
      </div>
    </div>
  );
}
