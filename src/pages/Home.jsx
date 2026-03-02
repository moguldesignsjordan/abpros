// src/pages/Home.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getFeaturedProjects, urlFor } from "../lib/sanity";

// ─── CONFIG ─────────────────────────────────────────────────────────
const BRAND = {
  dark: "#080150",
  accent: "#85ff00",
  light: "#f8f9fa",
  midnight: "#03002e",
  slate: "#1a1a2e",
};

// ─── THEME SYSTEM ───────────────────────────────────────────────────

const T = {
  dark: {
    navBg: "rgba(8,1,80,0.97)",
    navLink: "rgba(255,255,255,0.7)",
    mobileMenuBg: BRAND.dark,
    mobileLink: "#fff",
    mobileBorder: "rgba(255,255,255,0.05)",
    statsBg: BRAND.dark,
    statsBorder: "rgba(133,255,0,0.15)",
    statsCardBg: "rgba(255,255,255,0.02)",
    statsCardHover: "rgba(133,255,0,0.05)",
    statsNum: "#fff",
    statsLabel: "rgba(255,255,255,0.4)",
    aboutBg: "#fff",
    aboutHeading: BRAND.dark,
    aboutText: "#666",
    aboutFeature: BRAND.dark,
    servicesBg: BRAND.dark,
    servicesHeading: "#fff",
    servicesText: "rgba(255,255,255,0.5)",
    servicesCardBg: "rgba(255,255,255,0.02)",
    servicesCardBorder: "rgba(255,255,255,0.06)",
    servicesFeatureText: "rgba(255,255,255,0.6)",
    processBg: BRAND.light,
    processHeading: BRAND.dark,
    processText: "#888",
    galleryBg: "#fff",
    galleryHeading: BRAND.dark,
    galleryBtnBg: BRAND.dark,
    galleryBtnText: "#fff",
    testimonialsBg: BRAND.light,
    testimonialsHeading: BRAND.dark,
    testimonialCardBg: "#fff",
    testimonialCardBorder: "#eee",
    testimonialText: "#555",
    testimonialName: BRAND.dark,
    testimonialLoc: "#999",
    testimonialDivider: "#f0f0f0",
    contactBg: BRAND.dark,
    contactHeading: "#fff",
    contactText: "rgba(255,255,255,0.5)",
    contactLabel: "rgba(255,255,255,0.3)",
    contactValue: "#fff",
    inputBg: "rgba(255,255,255,0.03)",
    inputBorder: "rgba(255,255,255,0.1)",
    inputText: "#fff",
    inputPlaceholder: "rgba(255,255,255,0.25)",
    formCardBg: "rgba(255,255,255,0.02)",
    formCardBorder: "rgba(255,255,255,0.06)",
    footerBg: BRAND.midnight,
    footerText: "rgba(255,255,255,0.4)",
    footerHeading: "rgba(255,255,255,0.6)",
    footerDivider: "rgba(255,255,255,0.06)",
    footerCopy: "rgba(255,255,255,0.3)",
    pageBg: BRAND.dark,
    scrollTrack: BRAND.midnight,
    mobileBtn: "#fff",
    selectBg: BRAND.dark,
  },
  light: {
    navBg: "rgba(255,255,255,0.97)",
    navLink: "rgba(0,0,0,0.6)",
    mobileMenuBg: "#fff",
    mobileLink: BRAND.dark,
    mobileBorder: "rgba(0,0,0,0.06)",
    statsBg: "#fff",
    statsBorder: "rgba(8,1,80,0.12)",
    statsCardBg: "rgba(8,1,80,0.02)",
    statsCardHover: "rgba(133,255,0,0.08)",
    statsNum: BRAND.dark,
    statsLabel: "rgba(8,1,80,0.45)",
    aboutBg: "#f8f9fa",
    aboutHeading: BRAND.dark,
    aboutText: "#555",
    aboutFeature: BRAND.dark,
    servicesBg: "#fff",
    servicesHeading: BRAND.dark,
    servicesText: "#666",
    servicesCardBg: "#f8f9fa",
    servicesCardBorder: "rgba(0,0,0,0.08)",
    servicesFeatureText: "#555",
    processBg: "#f0f1f5",
    processHeading: BRAND.dark,
    processText: "#777",
    galleryBg: "#f8f9fa",
    galleryHeading: BRAND.dark,
    galleryBtnBg: BRAND.dark,
    galleryBtnText: "#fff",
    testimonialsBg: "#fff",
    testimonialsHeading: BRAND.dark,
    testimonialCardBg: "#f8f9fa",
    testimonialCardBorder: "#e8e8e8",
    testimonialText: "#555",
    testimonialName: BRAND.dark,
    testimonialLoc: "#999",
    testimonialDivider: "#e8e8e8",
    contactBg: BRAND.dark,
    contactHeading: "#fff",
    contactText: "rgba(255,255,255,0.5)",
    contactLabel: "rgba(255,255,255,0.3)",
    contactValue: "#fff",
    inputBg: "rgba(255,255,255,0.03)",
    inputBorder: "rgba(255,255,255,0.1)",
    inputText: "#fff",
    inputPlaceholder: "rgba(255,255,255,0.25)",
    formCardBg: "rgba(255,255,255,0.02)",
    formCardBorder: "rgba(255,255,255,0.06)",
    footerBg: BRAND.midnight,
    footerText: "rgba(255,255,255,0.4)",
    footerHeading: "rgba(255,255,255,0.6)",
    footerDivider: "rgba(255,255,255,0.06)",
    footerCopy: "rgba(255,255,255,0.3)",
    pageBg: "#ffffff",
    scrollTrack: "#e8e8e8",
    mobileBtn: BRAND.dark,
    selectBg: BRAND.dark,
  },
};

// ─── ICONS (inline SVG for zero deps) ───────────────────────────────
const Icons = {
  Shield: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  Phone: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  ),
  ArrowDown: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
  ),
  Check: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
  ),
  HardHat: () => (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M2 18h20M4 18v-2a8 8 0 0116 0v2M9 12V8M15 12V8M12 12V4"/></svg>
  ),
  Wrench: () => (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
  ),
  Clipboard: () => (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>
  ),
  MapPin: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  Mail: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
  ),
  Star: () => (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  ),
  Quote: () => (
    <svg width="32" height="32" fill="currentColor" opacity="0.15" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z"/></svg>
  ),
  Menu: () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
  ),
  X: () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
  ),
  Send: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
  ),
  Clock: () => (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
  ),
  Users: () => (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
  ),
  Building: () => (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/></svg>
  ),
  Sun: () => (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
  ),
  Moon: () => (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
  ),
};

// ─── SCROLL ANIMATION HOOK ──────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", direction = "up" }) {
  const [ref, visible] = useInView(0.1);
  const transforms = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(40px)", right: "translateX(-40px)" };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : transforms[direction],
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── HERO SECTION (your hero-bg.jpg preserved) ──────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section id="hero" style={{
      position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/hero-bg.jpg') center/cover no-repeat`,
      overflow: "hidden", fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px)` }} />
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${BRAND.accent}15, transparent 70%)`, filter: "blur(80px)" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${BRAND.accent}10, transparent 70%)`, filter: "blur(60px)" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "120px 24px 80px", width: "100%" }}>
        <div style={{ maxWidth: 800 }}>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", background: "rgba(133,255,0,0.08)", border: "1px solid rgba(133,255,0,0.2)", borderRadius: 50, marginBottom: 32 }}>
              <Icons.Shield />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: BRAND.accent, textTransform: "uppercase" }}>Licensed · Bonded · Insured</span>
            </div>
          </div>

          <h1 style={{
            fontFamily: "'Outfit', sans-serif", fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 800,
            lineHeight: 1.02, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 28px",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s",
          }}>
            Build{" "}
            <span style={{ color: BRAND.accent, position: "relative" }}>
              Better
              <span style={{ position: "absolute", bottom: -4, left: 0, right: 0, height: 4, background: BRAND.accent, opacity: 0.3 }} />
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>.</span>
            <br />
            Live Better
            <span style={{ color: BRAND.accent }}>.</span>
          </h1>

          <p style={{
            fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 300, color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7, maxWidth: 560, margin: "0 0 48px",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.6s",
          }}>
            Detroit's premier full-service contractors. Quality craftsmanship, honest pricing, and community-rooted values since 2009.
          </p>

          <div style={{
            display: "flex", gap: 16, flexWrap: "wrap",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.8s",
          }}>
            <a href="#contact" style={{
              display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 36px",
              background: BRAND.accent, color: BRAND.dark, fontWeight: 700, fontSize: 14,
              letterSpacing: "0.02em", textDecoration: "none", transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = `0 12px 40px ${BRAND.accent}50`; }}
              onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
            >
              Get Your Free Estimate <Icons.ArrowRight />
            </a>
            <a href="tel:2488641784" style={{
              display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 36px",
              border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontWeight: 500, fontSize: 14,
              textDecoration: "none", transition: "all 0.3s", background: "rgba(255,255,255,0.03)",
            }}
              onMouseEnter={e => { e.target.style.borderColor = BRAND.accent; e.target.style.background = "rgba(133,255,0,0.05)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.background = "rgba(255,255,255,0.03)"; }}
            >
              <Icons.Phone /> (248) 864-1784
            </a>
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: loaded ? 0.4 : 0, transition: "opacity 1s ease 1.2s",
        animation: "float 2s ease-in-out infinite",
      }}>
        <span style={{ fontSize: 10, letterSpacing: "0.15em", color: "#fff", textTransform: "uppercase" }}>Scroll</span>
        <Icons.ArrowDown />
      </div>

      <style>{`
        @keyframes float { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
      `}</style>
    </section>
  );
}

// ─── STATS BAR ──────────────────────────────────────────────────────
function StatsBar({ theme }) {
  const t = T[theme];
  const stats = [
    { num: "1,200+", label: "Projects Completed", icon: <Icons.Building /> },
    { num: "15+", label: "Years Experience", icon: <Icons.Clock /> },
    { num: "100%", label: "Satisfaction Focus", icon: <Icons.Star /> },
    { num: "500+", label: "Happy Clients", icon: <Icons.Users /> },
  ];

  return (
    <section style={{ position: "relative", zIndex: 20, maxWidth: 1280, margin: "-48px auto 0", padding: "0 24px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2, background: t.statsBg, border: `1px solid ${t.statsBorder}`, transition: "all 0.4s ease" }}>
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ padding: "32px 28px", background: t.statsCardBg, display: "flex", alignItems: "center", gap: 20, borderLeft: i > 0 ? `1px solid ${t.statsBorder}` : "none", transition: "background 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = t.statsCardHover}
              onMouseLeave={e => e.currentTarget.style.background = t.statsCardBg}
            >
              <div style={{ color: BRAND.accent, opacity: 0.7 }}>{s.icon}</div>
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 700, color: t.statsNum, letterSpacing: "-0.02em", transition: "color 0.4s" }}>{s.num}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: t.statsLabel, textTransform: "uppercase", letterSpacing: "0.1em", transition: "color 0.4s" }}>{s.label}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── ABOUT SECTION ──────────────────────────────────────────────────
function About({ theme }) {
  const t = T[theme];
  const features = ["Residential & Commercial", "Fully Licensed & Insured", "Transparent Quoting", "On-Time Completion", "15+ Year Track Record", "Post-Project Warranty"];
  return (
    <section id="about" style={{ padding: "120px 24px", background: t.aboutBg, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.4s ease" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: 80, alignItems: "center" }} className="about-grid">
        <Reveal>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 40, height: 2, background: BRAND.accent }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: t.aboutHeading }}>About AB Pro</span>
            </div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", color: t.aboutHeading, margin: "0 0 24px", transition: "color 0.4s" }}>
              We Listen. We Build.<br /><span style={{ color: BRAND.accent }}>We Deliver.</span>
            </h2>
            <p style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.8, color: t.aboutText, maxWidth: 600, marginBottom: 40, transition: "color 0.4s" }}>
              We're more than contractors — we're your neighbors. For over 15 years, we've built a reputation in Metro Detroit for doing things right. No cutting corners, no hidden fees. Just reliable service, high craftsmanship, and honest pricing that respects your budget.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {features.map((f, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${BRAND.accent}18`, display: "flex", alignItems: "center", justifyContent: "center", color: BRAND.accent, flexShrink: 0 }}><Icons.Check /></div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: t.aboutFeature, transition: "color 0.4s" }}>{f}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`@media (min-width: 900px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ─── SERVICES SECTION ───────────────────────────────────────────────
function Services({ theme }) {
  const t = T[theme];
  const [hovered, setHovered] = useState(null);
  const services = [
    { title: "Complete Rehabs", icon: <Icons.HardHat />, desc: "From gutting interiors to modern finishes: kitchens, bathrooms, basements, and full-home transformations.", features: ["Kitchen & Bath Renovations", "Basement Finishing", "Whole-Home Remodels"] },
    { title: "Full Renovations", icon: <Icons.Wrench />, desc: "Small fixes, emergency repairs, and everything in-between to keep your property safe and functional.", features: ["Structural Repairs", "Emergency Services", "Code Compliance Updates"] },
    { title: "Project Management", icon: <Icons.Clipboard />, desc: "Expert planning, oversight, scheduling, and permit coordination so your project runs smoothly from day one.", features: ["Timeline & Budget Control", "Permit Management", "Subcontractor Coordination"] },
  ];

  return (
    <section id="services" style={{ padding: "120px 24px", background: t.servicesBg, fontFamily: "'Plus Jakarta Sans', sans-serif", position: "relative", overflow: "hidden", transition: "background 0.4s ease" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", background: `linear-gradient(180deg, ${BRAND.accent}05, transparent 50%)` }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: BRAND.accent }}>Our Expertise</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 700, color: t.servicesHeading, marginTop: 12, letterSpacing: "-0.02em", transition: "color 0.4s" }}>Full-Service Contractors</h2>
            <p style={{ maxWidth: 540, margin: "20px auto 0", fontSize: 16, fontWeight: 300, color: t.servicesText, lineHeight: 1.7, transition: "color 0.4s" }}>Clarity and consistency lead to great outcomes. Here's how we serve Metro Detroit.</p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ padding: 48, border: `1px solid ${hovered === i ? `${BRAND.accent}40` : t.servicesCardBorder}`, background: hovered === i ? "rgba(133,255,0,0.03)" : t.servicesCardBg, transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", position: "relative", overflow: "hidden", cursor: "default", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: hovered === i ? "100%" : "0%", height: 2, background: BRAND.accent, transition: "width 0.6s ease" }} />
                <div style={{ color: hovered === i ? BRAND.accent : t.servicesText, transition: "color 0.3s", marginBottom: 28 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 700, color: t.servicesHeading, marginBottom: 16, transition: "color 0.4s" }}>{s.title}</h3>
                <p style={{ fontSize: 14, fontWeight: 300, color: t.servicesText, lineHeight: 1.8, marginBottom: 28, flex: 1, transition: "color 0.4s" }}>{s.desc}</p>
                <div style={{ borderTop: `1px solid ${t.servicesCardBorder}`, paddingTop: 24 }}>
                  {s.features.map((f, fi) => (
                    <div key={fi} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 13, fontWeight: 500, color: t.servicesFeatureText, transition: "color 0.4s" }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: BRAND.accent, flexShrink: 0 }} />{f}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS SECTION ────────────────────────────────────────────────
function Process({ theme }) {
  const t = T[theme];
  const steps = [
    { num: "01", title: "Consultation", desc: "We visit your property, listen to your vision, and assess the scope of work with no obligation." },
    { num: "02", title: "Proposal", desc: "You receive a transparent, itemized quote with clear timelines and no hidden fees." },
    { num: "03", title: "Build", desc: "Our skilled crews get to work with regular updates and open communication throughout." },
    { num: "04", title: "Deliver", desc: "We walk you through the finished project and ensure everything meets your standards." },
  ];

  return (
    <section style={{ padding: "120px 24px", background: t.processBg, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.4s ease" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: BRAND.accent }}>How We Work</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 700, color: t.processHeading, marginTop: 12, letterSpacing: "-0.02em", transition: "color 0.4s" }}>A Simple, Proven Process</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ position: "relative", padding: "0 8px" }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 72, fontWeight: 900, color: `${BRAND.accent}15`, lineHeight: 1, marginBottom: -20, position: "relative", zIndex: 0 }}>{s.num}</div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: t.processHeading, marginBottom: 12, transition: "color 0.4s" }}>{s.title}</h3>
                  <p style={{ fontSize: 14, fontWeight: 400, color: t.processText, lineHeight: 1.8, transition: "color 0.4s" }}>{s.desc}</p>
                </div>
                {i < steps.length - 1 && (<div className="process-arrow" style={{ position: "absolute", top: 40, right: -16, color: `${BRAND.accent}40` }}><Icons.ArrowRight /></div>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .process-arrow { display: none; } }`}</style>
    </section>
  );
}

// ─── GALLERY SECTION (Sanity CMS powered) ───────────────────────────
function Gallery({ theme }) {
  const t = T[theme];
  const [projects, setProjects] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    getFeaturedProjects(6).then(setProjects).catch(console.error);
  }, []);

  return (
    <section id="projects" style={{ padding: "120px 24px", background: t.galleryBg, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.4s ease" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: BRAND.accent }}>Our Portfolio</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 700, color: t.galleryHeading, marginTop: 12, letterSpacing: "-0.02em", transition: "color 0.4s" }}>Highlights of Our Work</h2>
          </div>
        </Reveal>

        {projects.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 8 }}>
            {projects.map((p, i) => {
              const isHovered = hoveredId === p._id;
              const imageUrl = p.coverImage ? urlFor(p.coverImage).width(800).height(600).fit("crop").url() : null;
              return (
                <Link to={`/projects/${p.slug.current}`} key={p._id} style={{ textDecoration: "none", position: "relative", aspectRatio: (i === 0 || i === 3) ? "2/1" : "1/1", overflow: "hidden", cursor: "pointer", gridColumn: (i === 0 || i === 3) ? "span 2" : "span 1", background: BRAND.dark }} className="gallery-item" onMouseEnter={() => setHoveredId(p._id)} onMouseLeave={() => setHoveredId(null)}>
                  {imageUrl ? (
                    <img src={imageUrl} alt={p.title} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)", transform: isHovered ? "scale(1.08)" : "scale(1)" }} />
                  ) : (
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${BRAND.dark}, ${BRAND.midnight})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="48" height="48" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    </div>
                  )}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent 60%)", opacity: isHovered ? 1 : 0, transition: "opacity 0.4s ease", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: BRAND.accent, marginBottom: 8 }}>{p.category}</span>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>{p.title}</h3>
                      <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 8 }}>
            {[0,1,2,3,4,5].map((i) => (
              <div key={i} style={{ aspectRatio: (i === 0 || i === 3) ? "2/1" : "1/1", gridColumn: (i === 0 || i === 3) ? "span 2" : "span 1", background: `linear-gradient(135deg, ${["#1a1a3e","#2a1a4e","#1a2a3e","#3a1a2e","#0a2a3e","#1a3a2e"][i]}, ${BRAND.dark})`, position: "relative", overflow: "hidden" }} className="gallery-item">
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 60, height: 60, border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.2)" }}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link to="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", background: t.galleryBtnBg, color: t.galleryBtnText, textDecoration: "none", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", transition: "all 0.3s", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >View All Projects <Icons.ArrowRight /></Link>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .gallery-item { grid-column: span 1 !important; aspect-ratio: 1/1 !important; } }`}</style>
    </section>
  );
}

// ─── TESTIMONIALS SECTION ───────────────────────────────────────────
function Testimonials({ theme }) {
  const t = T[theme];
  const reviews = [
    { name: "Marcus T.", loc: "Southfield, MI", text: "AB Pro completely transformed our kitchen. The team was professional, the pricing was transparent, and the result exceeded our expectations. Highly recommend!", rating: 5 },
    { name: "Sarah K.", loc: "Detroit, MI", text: "We hired AB Pro for a full basement finish. They handled permits, stayed on schedule, and communicated every step of the way. Five stars all around.", rating: 5 },
    { name: "James R.", loc: "Royal Oak, MI", text: "After getting three quotes, AB Pro offered the best value with the most detailed plan. The quality of their work speaks for itself. Our go-to contractors now.", rating: 5 },
  ];

  return (
    <section id="testimonials" style={{ padding: "120px 24px", background: t.testimonialsBg, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.4s ease" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: BRAND.accent }}>Testimonials</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 700, color: t.testimonialsHeading, marginTop: 12, letterSpacing: "-0.02em", transition: "color 0.4s" }}>What Our Clients Say</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div style={{ padding: 40, background: t.testimonialCardBg, border: `1px solid ${t.testimonialCardBorder}`, position: "relative", height: "100%", display: "flex", flexDirection: "column", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${BRAND.accent}40`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.testimonialCardBorder; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              >
                <div style={{ position: "absolute", top: 28, right: 32, color: BRAND.accent }}><Icons.Quote /></div>
                <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                  {Array.from({ length: r.rating }).map((_, si) => (<span key={si} style={{ color: "#FFB800" }}><Icons.Star /></span>))}
                </div>
                <p style={{ fontSize: 15, fontWeight: 400, color: t.testimonialText, lineHeight: 1.8, flex: 1, marginBottom: 28, transition: "color 0.4s" }}>"{r.text}"</p>
                <div style={{ borderTop: `1px solid ${t.testimonialDivider}`, paddingTop: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: t.testimonialName, transition: "color 0.4s" }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: t.testimonialLoc, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}><Icons.MapPin /> {r.loc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION (themed) ───────────────────────────────────────
function Contact({ theme }) {
  const isDark = theme === "dark";
  const [status, setStatus] = useState("");
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1500);
  };

  const bg = isDark ? BRAND.dark : "#fff";
  const headingColor = isDark ? "#fff" : BRAND.dark;
  const textColor = isDark ? "rgba(255,255,255,0.5)" : "#666";
  const labelColor = isDark ? "rgba(255,255,255,0.3)" : "#999";
  const valueColor = isDark ? "#fff" : BRAND.dark;
  const inputBg = isDark ? "rgba(255,255,255,0.03)" : "#f8f9fa";
  const inputBorderDefault = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const inputTextColor = isDark ? "#fff" : BRAND.dark;
  const formBg = isDark ? "rgba(255,255,255,0.02)" : "#f8f9fa";
  const formBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const optionBg = isDark ? BRAND.dark : "#fff";
  const glowColor = isDark ? `${BRAND.accent}08` : `${BRAND.accent}06`;

  const inputStyle = (name) => ({
    width: "100%", padding: "16px 20px", fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif",
    border: `1px solid ${focused === name ? BRAND.accent : inputBorderDefault}`,
    background: inputBg, color: inputTextColor, outline: "none",
    transition: "border-color 0.3s, background 0.3s",
  });

  return (
    <section id="contact" style={{ padding: "120px 24px", background: bg, fontFamily: "'Plus Jakarta Sans', sans-serif", position: "relative", overflow: "hidden", transition: "background 0.4s ease" }}>
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${glowColor}, transparent 70%)`, filter: "blur(60px)" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }} className="contact-grid">
          <Reveal>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: BRAND.accent }}>Get an Estimate</span>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 700, color: headingColor, marginTop: 12, letterSpacing: "-0.02em", marginBottom: 24, transition: "color 0.4s" }}>
                Ready to Start Your<br /><span style={{ color: BRAND.accent }}>Project?</span>
              </h2>
              <p style={{ fontSize: 16, fontWeight: 300, color: textColor, lineHeight: 1.8, maxWidth: 480, marginBottom: 48, transition: "color 0.4s" }}>
                Don't wait for small problems to become big headaches. Fill out the form and our team will get back to you with a comprehensive, no-obligation estimate.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {[
                  { icon: <Icons.Phone />, label: "Call Us", value: "(248) 864-1784", href: "tel:2488641784" },
                  { icon: <Icons.Mail />, label: "Email", value: "Info@abprojectllc.com", href: "mailto:Info@abprojectllc.com" },
                  { icon: <Icons.MapPin />, label: "Office", value: "17515 W Nine Mile Rd, Southfield, MI", href: null },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                    <div style={{ width: 44, height: 44, border: `1px solid ${BRAND.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", color: BRAND.accent, flexShrink: 0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: labelColor, marginBottom: 4, transition: "color 0.4s" }}>{c.label}</div>
                      {c.href ? (
                        <a href={c.href} style={{ fontSize: 17, fontWeight: 400, color: valueColor, textDecoration: "none", transition: "color 0.3s" }}
                          onMouseEnter={e => e.target.style.color = BRAND.accent}
                          onMouseLeave={e => e.target.style.color = valueColor}
                        >{c.value}</a>
                      ) : (
                        <span style={{ fontSize: 17, fontWeight: 400, color: valueColor, transition: "color 0.4s" }}>{c.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {status === "success" ? (
              <div style={{ padding: 64, border: `1px solid ${BRAND.accent}30`, background: `${BRAND.accent}08`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 400 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${BRAND.accent}20`, display: "flex", alignItems: "center", justifyContent: "center", color: BRAND.accent, marginBottom: 24 }}><Icons.Check /></div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 700, color: headingColor, marginBottom: 12, transition: "color 0.4s" }}>Message Sent!</h3>
                <p style={{ fontSize: 15, color: textColor, marginBottom: 32, transition: "color 0.4s" }}>We've received your request and will be in touch shortly.</p>
                <button onClick={() => setStatus("")} style={{ background: "none", border: `1px solid ${BRAND.accent}40`, color: BRAND.accent, padding: "10px 24px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Send Another Message</button>
              </div>
            ) : (
              <div style={{ padding: 48, border: `1px solid ${formBorder}`, background: formBg, transition: "all 0.4s ease" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: labelColor, marginBottom: 8, transition: "color 0.4s" }}>Full Name</label>
                    <input type="text" placeholder="John Doe" style={inputStyle("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: labelColor, marginBottom: 8, transition: "color 0.4s" }}>Email</label>
                    <input type="email" placeholder="john@example.com" style={inputStyle("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: labelColor, marginBottom: 8, transition: "color 0.4s" }}>Service Needed</label>
                    <select style={{ ...inputStyle("service"), appearance: "none", cursor: "pointer" }} onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}>
                      <option value="" style={{ background: optionBg }}>Select a service...</option>
                      <option value="Kitchen Remodel" style={{ background: optionBg }}>Kitchen Remodel</option>
                      <option value="Bathroom Remodel" style={{ background: optionBg }}>Bathroom Remodel</option>
                      <option value="Full Rehab" style={{ background: optionBg }}>Full Rehab</option>
                      <option value="Gas Line" style={{ background: optionBg }}>Gas Line Installation</option>
                      <option value="Commercial" style={{ background: optionBg }}>Commercial Project</option>
                      <option value="Other" style={{ background: optionBg }}>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: labelColor, marginBottom: 8, transition: "color 0.4s" }}>Message</label>
                    <textarea rows={4} placeholder="Tell us about your project..." style={{ ...inputStyle("msg"), resize: "vertical" }} onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)} />
                  </div>
                  <button onClick={handleSubmit} disabled={status === "submitting"} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "18px", background: BRAND.accent, color: BRAND.dark, border: "none", fontSize: 14, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.04em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s", opacity: status === "submitting" ? 0.7 : 1 }}
                    onMouseEnter={e => { if (status !== "submitting") { e.target.style.boxShadow = `0 8px 30px ${BRAND.accent}40`; e.target.style.transform = "translateY(-2px)"; } }}
                    onMouseLeave={e => { e.target.style.boxShadow = ""; e.target.style.transform = ""; }}
                  >
                    {status === "submitting" ? "Sending..." : <><span>Send Message</span> <Icons.Send /></>}
                  </button>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </div>
      <style>{`@media (min-width: 900px) { .contact-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────
export default function ABProRedesign() {
  const { theme } = useOutletContext();

  return (
    <>
      <Hero />
      <StatsBar theme={theme} />
      <About theme={theme} />
      <Services theme={theme} />
      <Process theme={theme} />
      <Gallery theme={theme} />
      <Testimonials theme={theme} />
      <Contact theme={theme} />
    </>
  );
}