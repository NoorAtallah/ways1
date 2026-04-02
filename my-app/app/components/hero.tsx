"use client";

import { useEffect, useRef, useCallback } from "react";
import { Truck, Leaf, Sparkles, Waves, ArrowRight } from "lucide-react";

declare const gsap: any;
declare const THREE: any;

const SLIDES = [
  {
    id: 0,
    tag: "Moving Services",
    title: "Move Smarter",
    titleItalic: "Live Better",
    desc: "Room-by-room planning, instant quotes, and a crew that treats your belongings like their own.",
    cta: "Plan Your Move",
    href: "/moving",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=80",
    thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=60",
    thumbLabel: "Moving",
  },
  {
    id: 1,
    tag: "Landscaping",
    title: "Your Yard,",
    titleItalic: "Reimagined",
    desc: "From lawn care to full garden design — we bring lasting beauty to every outdoor space.",
    cta: "Get a Free Quote",
    href: "/landscaping",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1800&q=80",
    thumb: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=60",
    thumbLabel: "Landscaping",
  },
  {
    id: 2,
    tag: "Cleaning Services",
    title: "Spotless Homes,",
    titleItalic: "Every Time",
    desc: "Deep cleans, move-in/out, recurring schedules — all tailored to how you actually live.",
    cta: "Book a Clean",
    href: "/cleaning",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1800&q=80",
    thumb: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&q=60",
    thumbLabel: "Cleaning",
  },
  {
    id: 3,
    tag: "Pool Maintenance",
    title: "Crystal Clear",
    titleItalic: "All Season",
    desc: "Weekly care, chemical balancing, and seasonal services that keep your pool flawless.",
    cta: "Start a Plan",
    href: "/pool",
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1800&q=80",
    thumb: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=300&q=60",
    thumbLabel: "Pool Care",
  },
];

const SLIDE_DURATION = 6000;
const TRANSITION_DURATION = 2.5;
const PROGRESS_INTERVAL = 50;

const splitToSpans = (text: string): string =>
  text
    .split("")
    .map((c) => `<span style="display:inline-block;opacity:0">${c === " " ? "&nbsp;" : c}</span>`)
    .join("");

// Per-slide text entrance animations matching the reference
const runTextAnim = (idx: number, chars: NodeListOf<Element>, desc: HTMLElement) => {
  switch (idx % 4) {
    case 0:
      gsap.set(chars, { y: 20, opacity: 0 });
      gsap.to(chars, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
      gsap.fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
      break;
    case 1:
      gsap.set(chars, { y: -20, opacity: 0 });
      gsap.to(chars, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "back.out(1.7)" });
      gsap.fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
      break;
    case 2:
      gsap.set(chars, { filter: "blur(10px)", scale: 1.4, opacity: 0 });
      gsap.to(chars, { filter: "blur(0px)", scale: 1, opacity: 1, duration: 1, stagger: { amount: 0.5, from: "random" }, ease: "power2.out" });
      gsap.fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" });
      break;
    case 3:
      gsap.set(chars, { scale: 0, opacity: 0 });
      gsap.to(chars, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: "back.out(1.5)" });
      gsap.fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
      break;
  }
};

export default function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const S = useRef({
    currentIndex: 0,
    isTransitioning: false,
    texturesLoaded: false,
    sliderEnabled: false,
    slideTextures: [] as any[],
    shaderMaterial: null as any,
    renderer: null as any,
    scene: null as any,
    camera: null as any,
    progressAnim: null as any,
    slideTimer: null as any,
  });

  // ── TIMER ────────────────────────────────────────────────────
  const stopTimer = useCallback(() => {
    const s = S.current;
    if (s.progressAnim) clearInterval(s.progressAnim);
    if (s.slideTimer) clearTimeout(s.slideTimer);
    s.progressAnim = null;
    s.slideTimer = null;
  }, []);

  const resetFill = useCallback((idx: number, instant = false) => {
    const fill = document.querySelectorAll(".sm-nav-fill")[idx] as HTMLElement;
    if (!fill) return;
    if (instant) {
      fill.style.transition = "none";
      fill.style.width = "0%";
    } else {
      fill.style.transition = "opacity 0.3s ease";
      fill.style.opacity = "0";
      setTimeout(() => { fill.style.width = "0%"; }, 300);
    }
  }, []);

  const startTimer = useCallback((delay = 0) => {
    const s = S.current;
    stopTimer();
    if (!s.sliderEnabled || !s.texturesLoaded) return;
    const begin = () => {
      let prog = 0;
      const step = (100 / SLIDE_DURATION) * PROGRESS_INTERVAL;
      s.progressAnim = setInterval(() => {
        if (!s.sliderEnabled) { stopTimer(); return; }
        prog += step;
        const fill = document.querySelectorAll(".sm-nav-fill")[s.currentIndex] as HTMLElement;
        if (fill) { fill.style.width = `${Math.min(prog, 100)}%`; fill.style.opacity = "1"; }
        if (prog >= 100) {
          clearInterval(s.progressAnim);
          s.progressAnim = null;
          resetFill(s.currentIndex);
          if (!s.isTransitioning) navigateTo((s.currentIndex + 1) % SLIDES.length); // eslint-disable-line
        }
      }, PROGRESS_INTERVAL);
    };
    if (delay > 0) s.slideTimer = setTimeout(begin, delay);
    else begin();
  }, [stopTimer, resetFill]); // eslint-disable-line

  // ── TEXT ─────────────────────────────────────────────────────
  const textOut = useCallback(() => {
    const title = document.getElementById("sm-title");
    const desc = document.getElementById("sm-desc");
    if (!title || !desc) return;
    gsap.to(title.querySelectorAll("span"), { y: -20, opacity: 0, duration: 0.4, stagger: 0.015, ease: "power2.in" });
    gsap.to(desc, { y: -10, opacity: 0, duration: 0.35, ease: "power2.in" });
    gsap.to(["#sm-tag", "#sm-cta"], { opacity: 0, y: -6, duration: 0.3, ease: "power2.in" });
  }, []);

  const textIn = useCallback((idx: number) => {
    setTimeout(() => {
      const slide = SLIDES[idx];
      const title = document.getElementById("sm-title");
      const desc = document.getElementById("sm-desc");
      const tag = document.getElementById("sm-tag");
      const cta = document.getElementById("sm-cta") as HTMLAnchorElement | null;
      if (!title || !desc || !tag || !cta) return;

      const tagSpan = tag.querySelector("span");
      if (tagSpan) tagSpan.textContent = slide.tag;
      const ctaSpan = cta.querySelector("span");
      if (ctaSpan) ctaSpan.textContent = slide.cta;
      cta.href = slide.href;

      title.innerHTML =
        splitToSpans(slide.title) +
        `<br/><em style="font-style:italic;color:var(--teal)">` +
        splitToSpans(slide.titleItalic) +
        `</em>`;
      desc.textContent = slide.desc;
      gsap.set(desc, { opacity: 0, y: 20 });

      runTextAnim(idx, title.querySelectorAll("span"), desc);
      gsap.fromTo(tag, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      gsap.fromTo(cta, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.35, ease: "power2.out" });
    }, 450);
  }, []);

  // ── NAVIGATE ─────────────────────────────────────────────────
  const navigateTo = useCallback((targetIdx: number) => {
    const s = S.current;
    if (s.isTransitioning || targetIdx === s.currentIndex || !s.texturesLoaded) return;
    stopTimer();
    resetFill(s.currentIndex, true);

    const from = s.slideTextures[s.currentIndex];
    const to = s.slideTextures[targetIdx];
    if (!from || !to) return;

    s.isTransitioning = true;
    s.shaderMaterial.uniforms.uTexture1.value = from;
    s.shaderMaterial.uniforms.uTexture2.value = to;
    s.shaderMaterial.uniforms.uTexture1Size.value = from.userData.size;
    s.shaderMaterial.uniforms.uTexture2Size.value = to.userData.size;

    textOut();
    textIn(targetIdx);

    // Update UI
    document.querySelectorAll(".sm-nav-item").forEach((el, i) => {
      el.classList.toggle("active", i === targetIdx);
      (el as HTMLElement).style.opacity = i === targetIdx ? "1" : "0.45";
    });
    document.querySelectorAll(".sm-thumb").forEach((el, i) =>
      el.classList.toggle("active", i === targetIdx)
    );
    const num = document.getElementById("sm-num");
    if (num) num.textContent = String(targetIdx + 1).padStart(2, "0");

    s.currentIndex = targetIdx;

    gsap.fromTo(
      s.shaderMaterial.uniforms.uProgress,
      { value: 0 },
      {
        value: 1,
        duration: TRANSITION_DURATION,
        ease: "power2.inOut",
        onComplete: () => {
          s.shaderMaterial.uniforms.uProgress.value = 0;
          s.shaderMaterial.uniforms.uTexture1.value = to;
          s.shaderMaterial.uniforms.uTexture1Size.value = to.userData.size;
          s.isTransitioning = false;
          startTimer(100);
        },
      }
    );
  }, [stopTimer, resetFill, textOut, textIn, startTimer]);

  // ── THREE.JS BOOTSTRAP ───────────────────────────────────────
  useEffect(() => {
    const loadScript = (src: string, g: string) =>
      new Promise<void>((res, rej) => {
        if ((window as any)[g]) { res(); return; }
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          const t = setInterval(() => { if ((window as any)[g]) { clearInterval(t); res(); } }, 50);
          setTimeout(() => { clearInterval(t); rej(); }, 10000);
          return;
        }
        const el = document.createElement("script");
        el.src = src;
        el.onload = () => setTimeout(res, 100);
        el.onerror = rej;
        document.head.appendChild(el);
      });

    const boot = async () => {
      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js", "gsap");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", "THREE");
      } catch { return; }

      const s = S.current;
      const canvas = document.getElementById("sm-canvas") as HTMLCanvasElement;
      if (!canvas) return;

      s.scene = new THREE.Scene();
      s.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      s.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
      s.renderer.setSize(window.innerWidth, window.innerHeight);
      s.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const vertexShader = `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `;
      const fragmentShader = `
        uniform sampler2D uTexture1, uTexture2;
        uniform float uProgress;
        uniform vec2 uResolution, uTexture1Size, uTexture2Size;
        varying vec2 vUv;

        vec2 coverUV(vec2 uv, vec2 texSize) {
          vec2 s = uResolution / texSize;
          float scale = max(s.x, s.y);
          vec2 scaledSize = texSize * scale;
          vec2 offset = (uResolution - scaledSize) * 0.5;
          return (uv * uResolution - offset) / scaledSize;
        }

        void main() {
          float progress = uProgress;
          float time = progress * 5.0;
          vec2 uv1 = coverUV(vUv, uTexture1Size);
          vec2 uv2 = coverUV(vUv, uTexture2Size);

          float maxR = length(uResolution) * 0.85;
          float br = progress * maxR;
          vec2 p = vUv * uResolution;
          vec2 c = uResolution * 0.5;
          float d = length(p - c);
          float nd = d / max(br, 0.001);
          float param = smoothstep(br + 3.0, br - 3.0, d);

          vec4 img;
          if (param > 0.0) {
            float ro = 0.08 * pow(smoothstep(0.3, 1.0, nd), 1.5);
            vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
            vec2 distUV = uv2 - dir * ro;
            distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * nd * param;
            float ca = 0.02 * pow(smoothstep(0.3, 1.0, nd), 1.2);
            img = vec4(
              texture2D(uTexture2, distUV + dir * ca * 1.2).r,
              texture2D(uTexture2, distUV + dir * ca * 0.2).g,
              texture2D(uTexture2, distUV - dir * ca * 0.8).b,
              1.0
            );
            float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
            img.rgb += rim * 0.1;
          } else {
            img = texture2D(uTexture2, uv2);
          }

          vec4 oldImg = texture2D(uTexture1, uv1);
          if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
          gl_FragColor = mix(oldImg, img, param);
        }
      `;

      s.shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTexture1: { value: null },
          uTexture2: { value: null },
          uProgress: { value: 0 },
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uTexture1Size: { value: new THREE.Vector2(1, 1) },
          uTexture2Size: { value: new THREE.Vector2(1, 1) },
        },
        vertexShader,
        fragmentShader,
      });

      s.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), s.shaderMaterial));

      // Load textures sequentially
      const loader = new THREE.TextureLoader();
      for (const slide of SLIDES) {
        try {
          await new Promise<void>((res, rej) =>
            loader.load(slide.img, (t: any) => {
              t.minFilter = t.magFilter = THREE.LinearFilter;
              t.userData = { size: new THREE.Vector2(t.image.width, t.image.height) };
              s.slideTextures.push(t);
              res();
            }, undefined, rej)
          );
        } catch { console.warn("Texture failed:", slide.img); }
      }

      if (s.slideTextures.length >= 2) {
        s.shaderMaterial.uniforms.uTexture1.value = s.slideTextures[0];
        s.shaderMaterial.uniforms.uTexture2.value = s.slideTextures[1];
        s.shaderMaterial.uniforms.uTexture1Size.value = s.slideTextures[0].userData.size;
        s.shaderMaterial.uniforms.uTexture2Size.value = s.slideTextures[1].userData.size;
        s.texturesLoaded = true;
        s.sliderEnabled = true;
        gsap.to("#sm-canvas", { opacity: 1, duration: 0.8 });
        startTimer(500);
      }

      // Render loop
      const render = () => { requestAnimationFrame(render); s.renderer.render(s.scene, s.camera); };
      render();

      // Resize
      const onResize = () => {
        s.renderer.setSize(window.innerWidth, window.innerHeight);
        s.shaderMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopTimer(); else if (!s.isTransitioning) startTimer();
      });

      // Animate initial text
      const title = document.getElementById("sm-title");
      const desc = document.getElementById("sm-desc");
      if (title && desc) {
        title.innerHTML =
          splitToSpans(SLIDES[0].title) +
          `<br/><em style="font-style:italic;color:var(--teal)">` +
          splitToSpans(SLIDES[0].titleItalic) +
          `</em>`;
        desc.textContent = SLIDES[0].desc;
        const chars = title.querySelectorAll("span");
        gsap.fromTo(chars, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.03, ease: "power3.out", delay: 0.4 });
        gsap.fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.7 });
        gsap.fromTo("#sm-tag", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.3 });
        gsap.fromTo("#sm-cta", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.6 });
      }

      return () => { window.removeEventListener("resize", onResize); stopTimer(); };
    };

    boot();
  }, []); // eslint-disable-line

  return (
    <section
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "var(--dark)" }}
    >
      {/* THREE.js canvas */}
      <canvas
        id="sm-canvas"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0 }}
      />

      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          background: "linear-gradient(to top, rgba(26,46,53,0.9) 0%, rgba(26,46,53,0.25) 50%, transparent 100%)",
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div style={{ position: "absolute", bottom: "130px", left: "56px", zIndex: 5, maxWidth: "680px" }}>

        {/* Glass tag */}
        <div
          id="sm-tag"
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            marginBottom: "20px", opacity: 0,
            background: "rgba(140,199,196,0.1)", backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(140,199,196,0.3)",
            padding: "6px 14px", borderRadius: "3px",
          }}
        >
          <Truck size={13} style={{ color: "var(--teal)" }} />
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--teal)" }}>
            {SLIDES[0].tag}
          </span>
        </div>

        {/* Title */}
        <h1
          id="sm-title"
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(3rem,5.8vw,5.2rem)",
            fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em",
            color: "var(--cream)", marginBottom: "18px", minHeight: "2.1em",
          }}
        />

        {/* Description */}
        <p
          id="sm-desc"
          style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", fontWeight: 300,
            color: "rgba(255,246,246,0.72)", lineHeight: 1.75,
            maxWidth: "420px", marginBottom: "34px", opacity: 0,
          }}
        />

        {/* CTA */}
        <a
          id="sm-cta"
          href={SLIDES[0].href}
          style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", fontWeight: 500,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--cream)", background: "var(--red)",
            padding: "14px 26px", borderRadius: "3px", textDecoration: "none",
            opacity: 0, transition: "background 0.3s, transform 0.3s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--purple)"; e.currentTarget.style.transform = "translateX(4px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--red)"; e.currentTarget.style.transform = "translateX(0)"; }}
        >
          <span>{SLIDES[0].cta}</span>
          <ArrowRight size={15} />
        </a>
      </div>

      {/* ── VERTICAL NAV — right side ── */}
      <nav style={{ position: "absolute", right: "56px", top: "50%", transform: "translateY(-50%)", zIndex: 5, display: "flex", flexDirection: "column", gap: "22px" }}>
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`sm-nav-item${i === 0 ? " active" : ""}`}
            onClick={() => navigateTo(i)}
            style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", opacity: i === 0 ? 1 : 0.4, transition: "opacity 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => { if (!e.currentTarget.classList.contains("active")) e.currentTarget.style.opacity = "0.4"; }}
          >
            <div style={{ width: "48px", height: "1.5px", background: "rgba(255,246,246,0.18)", borderRadius: "2px", overflow: "hidden" }}>
              <div
                className="sm-nav-fill"
                style={{ height: "100%", width: "0%", opacity: 0, background: "linear-gradient(to right, var(--teal), var(--cream))", transition: "width 0.1s linear, opacity 0.3s ease" }}
              />
            </div>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cream)", whiteSpace: "nowrap" }}>
              {slide.thumbLabel}
            </span>
          </div>
        ))}
      </nav>

      {/* ── COUNTER — glass box ── */}
      <div style={{
        position: "absolute", left: "56px", bottom: "52px", zIndex: 5,
        display: "flex", alignItems: "center", gap: "10px",
        background: "rgba(26,46,53,0.4)", backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,246,246,0.1)",
        borderRadius: "4px", padding: "10px 18px",
      }}>
        <span id="sm-num" style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 700, color: "var(--cream)", lineHeight: 1 }}>01</span>
        <div style={{ width: "1px", height: "22px", background: "rgba(255,246,246,0.2)", transform: "rotate(20deg)" }} />
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "rgba(255,246,246,0.4)", fontWeight: 300, alignSelf: "flex-end", paddingBottom: "2px" }}>
          {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── THUMBNAILS — bottom right ── */}
      <div style={{ position: "absolute", right: "160px", bottom: "52px", zIndex: 5, display: "flex", gap: "12px", alignItems: "flex-end" }}>
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`sm-thumb${i === 0 ? " active" : ""}`}
            onClick={() => navigateTo(i)}
            style={{
              position: "relative", height: "60px", borderRadius: "4px",
              overflow: "hidden", cursor: "pointer", flexShrink: 0,
            }}
          >
            <div style={{ width: "100%", height: "100%", backgroundImage: `url('${slide.thumb}')`, backgroundSize: "cover", backgroundPosition: "center", transition: "transform 0.5s" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(26,46,53,0.15)" }} />
            <span className="sm-thumb-num" style={{ position: "absolute", top: "5px", left: "7px", fontFamily: "'Playfair Display',serif", fontSize: "0.6rem", color: "var(--teal)", fontWeight: 700 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="sm-thumb-label" style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 6px 5px", background: "linear-gradient(transparent,rgba(26,46,53,0.85))", fontFamily: "'DM Sans',sans-serif", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cream)" }}>
              {slide.thumbLabel}
            </span>
          </div>
        ))}
      </div>

      {/* ── PROGRESS BAR ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(255,246,246,0.08)", zIndex: 5 }}>
        <div id="sm-global-progress" style={{ height: "100%", background: "linear-gradient(to right,var(--teal),var(--red))", width: "0%" }} />
      </div>

      {/* Thumb + nav active state styles */}
      <style>{`
        .sm-thumb {
          width: 88px;
          border: 2px solid transparent;
          transform: translateY(0);
          box-shadow: none;
          transition: width 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.4s, transform 0.4s, box-shadow 0.4s;
        }
        .sm-thumb.active {
          width: 128px !important;
          border-color: var(--teal) !important;
          transform: translateY(-8px) !important;
          box-shadow: 0 8px 28px rgba(140,199,196,0.25) !important;
        }
        .sm-thumb-num { opacity: 0; transition: opacity 0.3s; }
        .sm-thumb-label { opacity: 0; transition: opacity 0.3s; }
        .sm-thumb.active .sm-thumb-num,
        .sm-thumb.active .sm-thumb-label,
        .sm-thumb:hover .sm-thumb-label { opacity: 1; }
        .sm-nav-item.active { opacity: 1 !important; }
      `}</style>
    </section>
  );
}