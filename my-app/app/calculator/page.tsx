"use client";

import { useState } from "react";
import { ArrowRight, ShoppingCart, X, Plus, Minus } from "lucide-react";

const SECTIONS = [
  {
    name: "Bedroom",
    items: [
      { name: "King Bed", cuft: 70, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80" },
      { name: "Queen Bed", cuft: 60, img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80" },
      { name: "Twin Bed", cuft: 40, img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&q=80" },
      { name: "Nightstand", cuft: 10, img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80" },
      { name: "Dresser", cuft: 25, img: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=400&q=80" },
      { name: "Wardrobe", cuft: 35, img: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&q=80" },
    ],
  },
  {
    name: "Living Room",
    items: [
      { name: "Sofa", cuft: 30, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
      { name: "Armchair", cuft: 15, img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80" },
      { name: "Coffee Table", cuft: 20, img: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80" },
      { name: 'TV (50")', cuft: 10, img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80" },
      { name: "TV Stand", cuft: 20, img: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&q=80" },
      { name: "Bookcase", cuft: 25, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
    ],
  },
  {
    name: "Kitchen",
    items: [
      { name: "Dining Table", cuft: 35, img: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&q=80" },
      { name: "Chair", cuft: 10, img: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&q=80" },
      { name: "Microwave", cuft: 8, img: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&q=80" },
      { name: "Refrigerator", cuft: 45, img: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80" },
      { name: "Stove/Oven", cuft: 40, img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
    ],
  },
  {
    name: "Office",
    items: [
      { name: "Desk", cuft: 25, img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80" },
      { name: "Office Chair", cuft: 12, img: "https://images.unsplash.com/photo-1589884629038-b631346a23c0?w=400&q=80" },
      { name: "Filing Cabinet", cuft: 15, img: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400&q=80" },
      { name: "Bookshelf", cuft: 20, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
      { name: "Monitor", cuft: 5, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80" },
    ],
  },
  {
    name: "Boxes",
    items: [
      { name: "Large Box", cuft: 15, img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80" },
      { name: "Medium Box", cuft: 10, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80" },
      { name: "Small Box", cuft: 5, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
    ],
  },
  {
    name: "Garage",
    items: [
      { name: "Toolbox", cuft: 12, img: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&q=80" },
      { name: "Bike", cuft: 20, img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80" },
      { name: "Shelving Unit", cuft: 25, img: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&q=80" },
      { name: "Lawn Mower", cuft: 35, img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80" },
      { name: "Grill", cuft: 30, img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80" },
    ],
  },
];

type Counts = Record<string, number>;

function getEstimate(cuft: number) {
  if (cuft === 0) return null;
  if (cuft <= 200) return { truck: "Small (10 ft)", hours: "2–3 hrs", price: "$299–$399" };
  if (cuft <= 500) return { truck: "Medium (16 ft)", hours: "3–5 hrs", price: "$449–$599" };
  if (cuft <= 900) return { truck: "Large (20 ft)", hours: "5–7 hrs", price: "$649–$849" };
  return { truck: "XL (26 ft)", hours: "7–10 hrs", price: "$899–$1,199" };
}

export default function MovingCalculator() {
  const [counts, setCounts] = useState<Counts>({});
  const [activeSection, setActiveSection] = useState("Bedroom");
  const [cartOpen, setCartOpen] = useState(false);

  const inc = (key: string) => setCounts((c) => ({ ...c, [key]: (c[key] || 0) + 1 }));
  const dec = (key: string) => setCounts((c) => ({ ...c, [key]: Math.max(0, (c[key] || 0) - 1) }));

  const totalCuft = SECTIONS.flatMap((s) =>
    s.items.map((item) => (counts[`${s.name}__${item.name}`] || 0) * item.cuft)
  ).reduce((a, b) => a + b, 0);

  const totalItems = Object.values(counts).reduce((a, b) => a + b, 0);
  const estimate = getEstimate(totalCuft);
  const currentSection = SECTIONS.find((s) => s.name === activeSection)!;

  return (
    <main style={{
      minHeight: "100vh",
      background: "var(--dark, #1a2e35)",
      fontFamily: "'DM Sans', sans-serif",
      paddingTop: "72px",
    }}>

      {/* ── Top bar ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "36px 52px 0",
      }}>
        <div>
          <p style={{
            fontSize: "0.6rem", letterSpacing: "0.22em",
            textTransform: "uppercase", color: "rgba(140,199,196,0.7)",
            fontWeight: 500, margin: "0 0 8px",
          }}>Moving Calculator</p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 800, color: "#FFF6F6",
            lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0,
          }}>
            What are you{" "}
            <em style={{ fontStyle: "italic", color: "var(--teal, #8cc7c4)" }}>taking?</em>
          </h1>
        </div>

        {/* Cart button */}
        <button
          onClick={() => setCartOpen(true)}
          style={{
            position: "relative",
            display: "flex", alignItems: "center", gap: 10,
            padding: "13px 24px",
            background: totalItems > 0 ? "var(--teal, #8cc7c4)" : "rgba(255,246,246,0.05)",
            border: `1.5px solid ${totalItems > 0 ? "var(--teal, #8cc7c4)" : "rgba(255,246,246,0.1)"}`,
            borderRadius: 4,
            color: totalItems > 0 ? "var(--dark, #1a2e35)" : "rgba(255,246,246,0.3)",
            fontSize: "0.75rem", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          <ShoppingCart size={16} />
          {totalItems > 0
            ? `${totalItems} item${totalItems !== 1 ? "s" : ""} · ${totalCuft} cu.ft`
            : "Your move list"}
        </button>
      </div>

      {/* ── Section tabs ── */}
      <div style={{
        display: "flex",
        padding: "28px 52px 0",
        borderBottom: "1px solid rgba(255,246,246,0.07)",
        overflowX: "auto",
        gap: 0,
      }}>
        {SECTIONS.map((s) => {
          const sectionCount = s.items.reduce(
            (a, item) => a + (counts[`${s.name}__${item.name}`] || 0), 0
          );
          const active = s.name === activeSection;
          return (
            <button
              key={s.name}
              onClick={() => setActiveSection(s.name)}
              style={{
                padding: "12px 24px",
                background: "none",
                border: "none",
                borderBottom: `2px solid ${active ? "var(--teal, #8cc7c4)" : "transparent"}`,
                color: active ? "#FFF6F6" : "rgba(255,246,246,0.4)",
                fontSize: "0.75rem",
                fontWeight: active ? 600 : 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "color 0.2s, border-color 0.2s",
                display: "flex", alignItems: "center", gap: 8,
                marginBottom: -1,
              }}
            >
              {s.name}
              {sectionCount > 0 && (
                <span style={{
                  background: "var(--teal, #8cc7c4)",
                  color: "var(--dark, #1a2e35)",
                  fontSize: "0.58rem", fontWeight: 800,
                  borderRadius: 99,
                  padding: "1px 7px",
                }}>
                  {sectionCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Image cards grid ── */}
      <div style={{
        padding: "36px 52px 96px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
        gap: 16,
      }}>
        {currentSection.items.map((item) => {
          const key = `${activeSection}__${item.name}`;
          const count = counts[key] || 0;

          return (
            <div
              key={item.name}
              style={{
                borderRadius: 8,
                overflow: "hidden",
                border: `1.5px solid ${count > 0 ? "var(--teal, #8cc7c4)" : "rgba(255,246,246,0.07)"}`,
                background: "#0e1f28",
                transition: "border-color 0.25s",
              }}
              onMouseEnter={(e) => {
                if (count === 0)
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,246,246,0.18)";
              }}
              onMouseLeave={(e) => {
                if (count === 0)
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,246,246,0.07)";
              }}
            >
              {/* Photo */}
              <div style={{
                position: "relative",
                height: 155,
                backgroundImage: `url('${item.img}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: count > 0 ? "rgba(10,20,24,0.25)" : "rgba(10,20,24,0.45)",
                  transition: "background 0.25s",
                }} />
                {count > 0 && (
                  <div style={{
                    position: "absolute", top: 10, right: 10,
                    background: "var(--teal, #8cc7c4)",
                    color: "var(--dark, #1a2e35)",
                    fontWeight: 800, fontSize: "0.82rem",
                    width: 28, height: 28, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {count}
                  </div>
                )}
              </div>

              {/* Card body */}
              <div style={{ padding: "14px 14px 16px" }}>
                <p style={{
                  margin: "0 0 2px", fontSize: "0.9rem",
                  fontWeight: 600, color: "#FFF6F6",
                }}>
                  {item.name}
                </p>
                <p style={{
                  margin: "0 0 14px", fontSize: "0.7rem",
                  color: "rgba(140,199,196,0.55)",
                }}>
                  {item.cuft} cu.ft
                </p>

                {/* Counter row */}
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <button
                    onClick={() => dec(key)}
                    style={{
                      width: 34, height: 34, borderRadius: 4,
                      border: "1px solid rgba(255,246,246,0.1)",
                      background: count > 0 ? "rgba(255,246,246,0.05)" : "transparent",
                      color: count > 0 ? "rgba(255,246,246,0.7)" : "rgba(255,246,246,0.15)",
                      cursor: count > 0 ? "pointer" : "default",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s",
                    }}
                  >
                    <Minus size={13} />
                  </button>

                  <span style={{
                    fontSize: "1.05rem", fontWeight: 700,
                    color: count > 0 ? "var(--teal, #8cc7c4)" : "rgba(255,246,246,0.18)",
                    minWidth: 28, textAlign: "center",
                    transition: "color 0.2s",
                  }}>
                    {count}
                  </span>

                  <button
                    onClick={() => inc(key)}
                    style={{
                      width: 34, height: 34, borderRadius: 4,
                      border: "1px solid rgba(140,199,196,0.35)",
                      background: "rgba(140,199,196,0.08)",
                      color: "var(--teal, #8cc7c4)",
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(140,199,196,0.2)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(140,199,196,0.08)")}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Cart drawer ── */}
      {cartOpen && (
        <>
          <div
            onClick={() => setCartOpen(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.55)",
              zIndex: 100,
              backdropFilter: "blur(4px)",
            }}
          />
          <div style={{
            position: "fixed", top: 0, right: 0, bottom: 0,
            width: 400,
            background: "#0e1f28",
            borderLeft: "1px solid rgba(255,246,246,0.08)",
            zIndex: 101,
            display: "flex", flexDirection: "column",
            padding: "32px 28px",
            overflowY: "auto",
          }}>
            {/* Drawer header */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: 28,
            }}>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.4rem", fontWeight: 700,
                color: "#FFF6F6", margin: 0,
              }}>
                Your move list
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                style={{
                  background: "none", border: "none",
                  color: "rgba(255,246,246,0.35)", cursor: "pointer",
                  padding: 4,
                }}
              >
                <X size={20} />
              </button>
            </div>

            {totalItems === 0 ? (
              <p style={{
                color: "rgba(255,246,246,0.22)", fontSize: "0.88rem",
                lineHeight: 1.6,
              }}>
                No items added yet. Go back and select what you're moving.
              </p>
            ) : (
              <>
                {/* Item rows */}
                <div style={{
                  display: "flex", flexDirection: "column",
                  gap: 8, flex: 1, overflowY: "auto",
                }}>
                  {SECTIONS.map((s) =>
                    s.items
                      .filter((item) => (counts[`${s.name}__${item.name}`] || 0) > 0)
                      .map((item) => {
                        const key = `${s.name}__${item.name}`;
                        const count = counts[key];
                        return (
                          <div key={key} style={{
                            display: "flex", alignItems: "center", gap: 12,
                            padding: "10px 12px",
                            background: "rgba(255,246,246,0.03)",
                            border: "1px solid rgba(255,246,246,0.07)",
                            borderRadius: 6,
                          }}>
                            <div style={{
                              width: 46, height: 46, borderRadius: 4, flexShrink: 0,
                              backgroundImage: `url('${item.img}')`,
                              backgroundSize: "cover", backgroundPosition: "center",
                            }} />
                            <div style={{ flex: 1 }}>
                              <p style={{ margin: 0, fontSize: "0.85rem", color: "#FFF6F6", fontWeight: 500 }}>
                                {item.name}
                              </p>
                              <p style={{ margin: "2px 0 0", fontSize: "0.68rem", color: "rgba(140,199,196,0.55)" }}>
                                {item.cuft} × {count} = {item.cuft * count} cu.ft
                              </p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <button onClick={() => dec(key)} style={{
                                width: 24, height: 24, borderRadius: 3,
                                border: "1px solid rgba(255,246,246,0.1)",
                                background: "none", color: "rgba(255,246,246,0.5)",
                                cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                <Minus size={10} />
                              </button>
                              <span style={{
                                fontSize: "0.88rem", fontWeight: 700,
                                color: "var(--teal, #8cc7c4)",
                                minWidth: 16, textAlign: "center",
                              }}>
                                {count}
                              </span>
                              <button onClick={() => inc(key)} style={{
                                width: 24, height: 24, borderRadius: 3,
                                border: "1px solid rgba(140,199,196,0.3)",
                                background: "rgba(140,199,196,0.08)",
                                color: "var(--teal, #8cc7c4)",
                                cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                <Plus size={10} />
                              </button>
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>

                {/* Estimate panel */}
                <div style={{
                  marginTop: 20,
                  padding: "20px",
                  background: "rgba(140,199,196,0.05)",
                  border: "1px solid rgba(140,199,196,0.14)",
                  borderRadius: 6,
                }}>
                  {[
                    { label: "Total volume", value: `${totalCuft} cu.ft` },
                    ...(estimate ? [
                      { label: "Truck size", value: estimate.truck },
                      { label: "Est. time", value: estimate.hours },
                    ] : []),
                  ].map(({ label, value }) => (
                    <div key={label} style={{
                      display: "flex", justifyContent: "space-between",
                      marginBottom: 10,
                    }}>
                      <span style={{ fontSize: "0.73rem", color: "rgba(255,246,246,0.35)", letterSpacing: "0.07em" }}>
                        {label}
                      </span>
                      <span style={{ fontSize: "0.85rem", color: "#FFF6F6", fontWeight: 600 }}>
                        {value}
                      </span>
                    </div>
                  ))}
                  {estimate && (
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      paddingTop: 12,
                      borderTop: "1px solid rgba(255,246,246,0.07)",
                    }}>
                      <span style={{ fontSize: "0.73rem", color: "rgba(255,246,246,0.35)", letterSpacing: "0.07em" }}>
                        Est. price
                      </span>
                      <span style={{
                        fontSize: "1.15rem", fontWeight: 800,
                        color: "var(--teal, #8cc7c4)",
                      }}>
                        {estimate.price}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  style={{
                    marginTop: 14,
                    display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 8,
                    padding: "15px 20px",
                    background: "var(--teal, #8cc7c4)",
                    border: "1.5px solid var(--teal, #8cc7c4)",
                    borderRadius: 4,
                    color: "var(--dark, #1a2e35)",
                    fontSize: "0.76rem", fontWeight: 700,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer",
                    transition: "all 0.3s",
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
                  Book this move <ArrowRight size={15} />
                </button>

                <p style={{
                  marginTop: 12, fontSize: "0.67rem",
                  color: "rgba(255,246,246,0.18)",
                  textAlign: "center", lineHeight: 1.5,
                }}>
                  Estimates are approximate. Final price confirmed on booking.
                </p>
              </>
            )}
          </div>
        </>
      )}
    </main>
  );
}