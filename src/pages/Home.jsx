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

// ─── ICONS ──────────────────────────────────────────────────────────
const Icons = {
  Shield: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Phone: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  ArrowRight: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  ArrowDown: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>,
  Check: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>,
  HardHat: () => <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M2 18h20M4 18v-2a8 8 0 0116 0v2M9 12V8M15 12V8M12 12V4"/></svg>,
  Wrench: () => <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  Clipboard: () => <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>,
  MapPin: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Mail: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>,
  Star: () => <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Quote: () => <svg width="32" height="32" fill="currentColor" opacity="0.15" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z"/></svg>,
  Menu: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>,
  X: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  Send: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
  Clock: () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Users: () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  Building: () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/></svg>,
  Award: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  Zap: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
};

// ─── SCROLL ANIMATION ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", direction = "up" }) {
  const [ref, visible] = useInView(0.1);
  const transforms = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(40px)", right: "translateX(-40px)" };
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translate(0)" : transforms[direction], transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s` }}>
      {children}
    </div>
  );
}

// ─── DECORATIVE COMPONENTS ──────────────────────────────────────────
function FloatingParticles({ count = 15, color = BRAND.accent }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {[...Array(count)].map((_, i) => (
        <div key={i} style={{ position: "absolute", width: Math.random() * 4 + 2, height: Math.random() * 4 + 2, background: color, borderRadius: "50%", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() * 0.3 + 0.1, animation: `particleFloat ${Math.random() * 10 + 15}s ease-in-out infinite`, animationDelay: `${Math.random() * 5}s` }} />
      ))}
    </div>
  );
}

function GridOverlay({ opacity = 0.03 }) {
  return <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(133,255,0,${opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(133,255,0,${opacity}) 1px, transparent 1px)`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 70%)", pointerEvents: "none" }} />;
}

function TrustBadges({ loaded }) {
  const badges = [{ icon: "15+", label: "Years Experience" }, { icon: "500+", label: "Projects Completed" }, { icon: "5.0", label: "Google Rating", showStars: true }];
  return (
    <div style={{ display: "flex", gap: 32, marginTop: 48, opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 1s", flexWrap: "wrap" }}>
      {badges.map((badge, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none", paddingLeft: i > 0 ? 32 : 0 }}>
          <span style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: BRAND.accent, letterSpacing: "-0.02em" }}>{badge.icon}</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {badge.showStars && <div style={{ display: "flex", gap: 2 }}>{[...Array(5)].map((_, j) => <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill={BRAND.accent} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}</div>}
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500, letterSpacing: "0.02em" }}>{badge.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ENHANCED HERO ──────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const handleMouseMove = (e) => { const rect = e.currentTarget.getBoundingClientRect(); setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height }); };

  return (
    <section id="hero" onMouseMove={handleMouseMove} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", background: `linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.85) 50%, rgba(10,10,10,0.9) 100%), url('/hero-bg.jpg') center/cover no-repeat`, overflow: "hidden", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Animated gradient orbs */}
      <div style={{ position: "absolute", top: `${20 + mousePos.y * 10}%`, right: `${5 + mousePos.x * 5}%`, width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${BRAND.accent}12, transparent 60%)`, filter: "blur(100px)", transition: "top 0.5s ease-out, right 0.5s ease-out" }} />
      <div style={{ position: "absolute", bottom: `${-5 + mousePos.y * 5}%`, left: `${-10 + mousePos.x * 8}%`, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${BRAND.accent}08, transparent 60%)`, filter: "blur(80px)", transition: "bottom 0.5s ease-out, left 0.5s ease-out" }} />
      
      {/* Diagonal accent line */}
      <div style={{ position: "absolute", top: 0, right: "20%", width: 1, height: "100%", background: `linear-gradient(to bottom, transparent, ${BRAND.accent}20, transparent)`, transform: "rotate(-15deg) scaleY(1.5)", transformOrigin: "top" }} />
      
      <GridOverlay />
      <FloatingParticles />
      
      {/* Corner accent */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, borderLeft: `1px solid ${BRAND.accent}15`, borderBottom: `1px solid ${BRAND.accent}15`, opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.5s" }}>
        <div style={{ position: "absolute", bottom: -4, left: -4, width: 8, height: 8, background: BRAND.accent, borderRadius: "50%" }} />
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1400, margin: "0 auto", padding: "140px 48px 100px", width: "100%" }}>
        <div style={{ maxWidth: 860 }}>
          {/* Badge */}
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 24px", background: `linear-gradient(135deg, rgba(133,255,0,0.12), rgba(133,255,0,0.04))`, border: "1px solid rgba(133,255,0,0.25)", borderRadius: 100, marginBottom: 40, backdropFilter: "blur(10px)" }}>
              <div style={{ width: 6, height: 6, background: BRAND.accent, borderRadius: "50%", boxShadow: `0 0 10px ${BRAND.accent}`, animation: "pulse 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: BRAND.accent, textTransform: "uppercase" }}>Licensed · Bonded · Insured</span>
            </div>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(44px, 7vw, 88px)", fontWeight: 500, lineHeight: 1.02, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 32px", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s" }}>
            Full-Service Contractors<br />For{" "}<span style={{ color: BRAND.accent, position: "relative", display: "inline-block" }}>Detroit<span style={{ position: "absolute", bottom: 4, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${BRAND.accent}, transparent)`, borderRadius: 2 }} /></span>{" "}Homeowners<span style={{ color: "rgba(255,255,255,0.2)" }}>.</span><br /><span style={{ color: "rgba(255,255,255,0.4)" }}>&</span> Businesses<span style={{ color: BRAND.accent }}>.</span>
          </h1>

          {/* Description */}
          <p style={{ fontSize: "clamp(18px, 2vw, 21px)", fontWeight: 400, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 580, margin: "0 0 44px", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.6s" }}>
            Detroit's premier full-service contractors. Quality craftsmanship, honest pricing, and community-rooted values since 2009.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.22,1,0.36,1) 0.8s" }}>
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "20px 40px", background: BRAND.accent, color: BRAND.dark, fontWeight: 700, fontSize: 14, letterSpacing: "0.02em", textDecoration: "none", transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-4px)"; e.target.style.boxShadow = `0 20px 50px ${BRAND.accent}40`; }} onMouseLeave={(e) => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}>
              <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 12 }}>Get Your Free Estimate <Icons.ArrowRight /></span>
            </a>
            <a href="tel:2488641784" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "20px 40px", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontWeight: 500, fontSize: 14, textDecoration: "none", transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", background: "rgba(255,255,255,0.02)", backdropFilter: "blur(10px)" }} onMouseEnter={(e) => { e.target.style.borderColor = BRAND.accent; e.target.style.background = "rgba(133,255,0,0.08)"; e.target.style.transform = "translateY(-4px)"; }} onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.background = "rgba(255,255,255,0.02)"; e.target.style.transform = ""; }}>
              <Icons.Phone /> (248) 864-1784
            </a>
          </div>

          <TrustBadges loaded={loaded} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: loaded ? 0.5 : 0, transition: "opacity 1s ease 1.4s" }}>
        <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "#fff", textTransform: "uppercase", fontWeight: 500 }}>Explore</span>
        <div style={{ width: 24, height: 40, border: "1px solid rgba(255,255,255,0.3)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 8 }}>
          <div style={{ width: 3, height: 8, background: BRAND.accent, borderRadius: 2, animation: "scrollDot 1.5s ease-in-out infinite" }} />
        </div>
      </div>

      {/* Side accent text */}
      <div style={{ position: "absolute", right: 48, top: "50%", transform: "translateY(-50%) rotate(90deg)", transformOrigin: "center", fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase", fontWeight: 600, opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1s" }}>Est. 2009 — Detroit, MI</div>

      <style>{`
        @keyframes particleFloat { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(10px, -20px); } 50% { transform: translate(-10px, 10px); } 75% { transform: translate(20px, 5px); } }
        @keyframes scrollDot { 0%, 100% { opacity: 0; transform: translateY(0); } 50% { opacity: 1; transform: translateY(12px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; box-shadow: 0 0 10px ${BRAND.accent}; } 50% { opacity: 0.6; box-shadow: 0 0 20px ${BRAND.accent}; } }
      `}</style>
    </section>
  );
}

// ─── ENHANCED STATS BAR ─────────────────────────────────────────────
function StatsBar({ theme }) {
  const t = T[theme];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const stats = [
    { num: "1,200+", label: "Projects Completed", icon: <Icons.Building /> },
    { num: "15+", label: "Years Experience", icon: <Icons.Clock /> },
    { num: "100%", label: "Satisfaction Focus", icon: <Icons.Award /> },
    { num: "500+", label: "Happy Clients", icon: <Icons.Users /> },
  ];

  return (
    <section style={{ position: "relative", zIndex: 20, maxWidth: 1400, margin: "-60px auto 0", padding: "0 48px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", background: t.statsBg, border: `1px solid ${t.statsBorder}`, borderRadius: 2, overflow: "hidden", boxShadow: "0 25px 80px rgba(0,0,0,0.15)", transition: "all 0.4s ease" }}>
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} style={{ padding: "40px 32px", background: hoveredIndex === i ? t.statsCardHover : t.statsCardBg, display: "flex", alignItems: "center", gap: 24, borderLeft: i > 0 ? `1px solid ${t.statsBorder}` : "none", transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", cursor: "default", position: "relative", overflow: "hidden" }}>
              {/* Background glow */}
              <div style={{ position: "absolute", top: "50%", left: "50%", width: 200, height: 200, background: `radial-gradient(circle, ${BRAND.accent}15, transparent 70%)`, borderRadius: "50%", transform: `translate(-50%, -50%) scale(${hoveredIndex === i ? 1 : 0})`, transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)", pointerEvents: "none" }} />
              {/* Icon */}
              <div style={{ position: "relative", width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${BRAND.accent}15, ${BRAND.accent}05)`, border: `1px solid ${BRAND.accent}25`, display: "flex", alignItems: "center", justifyContent: "center", color: BRAND.accent, flexShrink: 0, transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", transform: hoveredIndex === i ? "scale(1.1)" : "scale(1)" }}>{s.icon}</div>
              {/* Content */}
              <div style={{ position: "relative" }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 700, color: t.statsNum, letterSpacing: "-0.02em", transition: "all 0.4s", lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: t.statsLabel, textTransform: "uppercase", letterSpacing: "0.12em", transition: "color 0.4s" }}>{s.label}</div>
              </div>
              {/* Accent line */}
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 3, background: BRAND.accent, transform: `scaleX(${hoveredIndex === i ? 1 : 0})`, transformOrigin: "left", transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)" }} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── ENHANCED ABOUT ─────────────────────────────────────────────────
function About({ theme }) {
  const t = T[theme];
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const features = [
    { text: "Residential & Commercial", icon: <Icons.Building /> },
    { text: "Fully Licensed & Insured", icon: <Icons.Shield /> },
    { text: "Transparent Quoting", icon: <Icons.Clipboard /> },
    { text: "On-Time Completion", icon: <Icons.Clock /> },
    { text: "15+ Year Track Record", icon: <Icons.Award /> },
    { text: "Post-Project Warranty", icon: <Icons.Zap /> },
  ];

  return (
    <section id="about" style={{ position: "relative", padding: "140px 48px", background: t.aboutBg, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.4s ease", overflow: "hidden" }}>
      {/* Decorative elements */}
      <div style={{ position: "absolute", top: 100, right: -100, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${BRAND.accent}08, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -50, left: -50, width: 300, height: 300, border: `1px solid ${BRAND.accent}10`, borderRadius: "50%", pointerEvents: "none" }} />
      
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }} className="about-grid">
        <Reveal>
          <div>
            {/* Section label */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, ${BRAND.accent}, transparent)` }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: BRAND.accent }}>About AB Pro</span>
            </div>
            {/* Heading */}
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.025em", color: t.aboutHeading, margin: "0 0 28px", transition: "color 0.4s" }}>
              We Listen. We Build.<br /><span style={{ color: BRAND.accent, position: "relative", display: "inline-block" }}>We Deliver<span style={{ position: "absolute", bottom: 2, left: 0, width: "100%", height: 4, background: `${BRAND.accent}30`, borderRadius: 2 }} /></span><span style={{ color: BRAND.accent }}>.</span>
            </h2>
            {/* Description */}
            <p style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.85, color: t.aboutText, maxWidth: 540, marginBottom: 48, transition: "color 0.4s" }}>
              We're more than contractors — we're your neighbors. For over 15 years, we've built a reputation in Metro Detroit for doing things right. No cutting corners, no hidden fees. Just reliable service, high craftsmanship, and honest pricing that respects your budget.
            </p>
            {/* CTA */}
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "18px 36px", background: BRAND.dark, color: "#fff", fontWeight: 600, fontSize: 14, letterSpacing: "0.02em", textDecoration: "none", transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 15px 40px rgba(8,1,80,0.3)"; }} onMouseLeave={(e) => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}>
              Learn More About Us <Icons.ArrowRight />
            </a>
          </div>
        </Reveal>
        
        {/* Features grid */}
        <Reveal delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} onMouseEnter={() => setHoveredFeature(i)} onMouseLeave={() => setHoveredFeature(null)} style={{ padding: "28px 24px", background: hoveredFeature === i ? `linear-gradient(135deg, ${BRAND.accent}12, ${BRAND.accent}04)` : theme === "dark" ? "rgba(8,1,80,0.03)" : "rgba(8,1,80,0.02)", border: `1px solid ${hoveredFeature === i ? `${BRAND.accent}30` : "rgba(8,1,80,0.08)"}`, borderRadius: 4, transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", cursor: "default", transform: hoveredFeature === i ? "translateY(-4px)" : "translateY(0)" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${BRAND.accent}15`, display: "flex", alignItems: "center", justifyContent: "center", color: BRAND.accent, marginBottom: 16, transition: "all 0.4s", transform: hoveredFeature === i ? "scale(1.1)" : "scale(1)" }}>{f.icon}</div>
                <span style={{ fontSize: 14, fontWeight: 600, color: t.aboutFeature, transition: "color 0.4s", lineHeight: 1.4 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; gap: 60px !important; } }`}</style>
    </section>
  );
}

// ─── ENHANCED SERVICES ──────────────────────────────────────────────
function Services({ theme }) {
  const t = T[theme];
  const [hovered, setHovered] = useState(null);
  const services = [
    { title: "Complete Rehabs", icon: <Icons.HardHat />, desc: "From gutting interiors to modern finishes: kitchens, bathrooms, basements, and full-home transformations.", features: ["Kitchen & Bath Renovations", "Basement Finishing", "Whole-Home Remodels"] },
    { title: "Full Renovations", icon: <Icons.Wrench />, desc: "Small fixes, emergency repairs, and everything in-between to keep your property safe and functional.", features: ["Structural Repairs", "Emergency Services", "Code Compliance Updates"] },
    { title: "Project Management", icon: <Icons.Clipboard />, desc: "Expert planning, oversight, scheduling, and permit coordination so your project runs smoothly from day one.", features: ["Timeline & Budget Control", "Permit Management", "Subcontractor Coordination"] },
  ];

  return (
    <section id="services" style={{ position: "relative", padding: "140px 48px", background: t.servicesBg, fontFamily: "'Plus Jakarta Sans', sans-serif", overflow: "hidden", transition: "background 0.4s ease" }}>
      <FloatingParticles count={10} />
      <GridOverlay opacity={0.02} />
      
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 10 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, transparent, ${BRAND.accent})` }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: BRAND.accent }}>Our Expertise</span>
              <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, ${BRAND.accent}, transparent)` }} />
            </div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.025em", color: t.servicesHeading, margin: "0 0 20px", transition: "color 0.4s" }}>Full-Service <span style={{ color: BRAND.accent }}>Contractors</span></h2>
            <p style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: t.servicesText, maxWidth: 600, margin: "0 auto", transition: "color 0.4s" }}>Clarity and consistency lead to great outcomes. Here's how we serve Metro Detroit.</p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ padding: "48px 40px", border: `1px solid ${hovered === i ? `${BRAND.accent}40` : t.servicesCardBorder}`, background: hovered === i ? "rgba(133,255,0,0.03)" : t.servicesCardBg, transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", position: "relative", overflow: "hidden", cursor: "default", height: "100%", display: "flex", flexDirection: "column", transform: hovered === i ? "translateY(-8px)" : "translateY(0)" }}>
                {/* Top accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, width: hovered === i ? "100%" : "0%", height: 3, background: BRAND.accent, transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)" }} />
                {/* Icon */}
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${BRAND.accent}20, ${BRAND.accent}05)`, border: `1px solid ${BRAND.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", color: BRAND.accent, marginBottom: 28, transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", transform: hovered === i ? "scale(1.1)" : "scale(1)" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 26, fontWeight: 600, color: t.servicesHeading, marginBottom: 16, transition: "color 0.4s" }}>{s.title}</h3>
                <p style={{ fontSize: 15, fontWeight: 400, color: t.servicesText, lineHeight: 1.8, marginBottom: 28, flex: 1, transition: "color 0.4s" }}>{s.desc}</p>
                <div style={{ borderTop: `1px solid ${t.servicesCardBorder}`, paddingTop: 24 }}>
                  {s.features.map((f, fi) => (
                    <div key={fi} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, fontSize: 13, fontWeight: 500, color: t.servicesFeatureText, transition: "color 0.4s" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND.accent, flexShrink: 0 }} />{f}
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

// ─── ENHANCED PROCESS ───────────────────────────────────────────────
function Process({ theme }) {
  const t = T[theme];
  const [hoveredStep, setHoveredStep] = useState(null);
  const steps = [
    { num: "01", title: "Consultation", desc: "We visit your property, listen to your vision, and assess the scope of work with no obligation.", icon: <Icons.Users /> },
    { num: "02", title: "Proposal", desc: "You receive a transparent, itemized quote with clear timelines and no hidden fees.", icon: <Icons.Clipboard /> },
    { num: "03", title: "Build", desc: "Our skilled crews get to work with regular updates and open communication throughout.", icon: <Icons.HardHat /> },
    { num: "04", title: "Deliver", desc: "We walk you through the finished project and ensure everything meets your standards.", icon: <Icons.Award /> },
  ];

  return (
    <section id="process" style={{ position: "relative", padding: "140px 48px", background: t.processBg, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.4s ease", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: -200, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${BRAND.accent}06, transparent 70%)`, filter: "blur(80px)", pointerEvents: "none" }} />
      
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 10 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, transparent, ${BRAND.accent})` }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: BRAND.accent }}>How We Work</span>
              <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, ${BRAND.accent}, transparent)` }} />
            </div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.025em", color: t.processHeading, margin: "0 0 20px", transition: "color 0.4s" }}>A Simple, <span style={{ color: BRAND.accent }}>Proven Process</span></h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, position: "relative" }} className="process-grid">
          {/* Connection line */}
          <div style={{ position: "absolute", top: 64, left: "12.5%", width: "75%", height: 2, background: `linear-gradient(90deg, ${BRAND.accent}30, ${BRAND.accent}30)`, zIndex: 0 }} className="process-line" />
          
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div onMouseEnter={() => setHoveredStep(i)} onMouseLeave={() => setHoveredStep(null)} style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
                <div style={{ width: 100, height: 100, margin: "0 auto 32px", borderRadius: "50%", background: hoveredStep === i ? `linear-gradient(135deg, ${BRAND.accent}, ${BRAND.accent}cc)` : "#fff", border: `3px solid ${BRAND.accent}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", transform: hoveredStep === i ? "scale(1.1)" : "scale(1)", boxShadow: hoveredStep === i ? `0 20px 50px ${BRAND.accent}40` : "0 10px 30px rgba(0,0,0,0.08)", color: hoveredStep === i ? BRAND.dark : BRAND.accent }}>{step.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: BRAND.accent, letterSpacing: "0.15em", marginBottom: 12 }}>STEP {step.num}</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 600, color: t.processHeading, marginBottom: 16, transition: "color 0.4s" }}>{step.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: t.processText, transition: "color 0.4s" }}>{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 1000px) { .process-grid { grid-template-columns: repeat(2, 1fr) !important; } .process-line { display: none !important; } } @media (max-width: 600px) { .process-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ─── ENHANCED GALLERY ───────────────────────────────────────────────
function Gallery({ theme }) {
  const t = T[theme];
  const [projects, setProjects] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  useEffect(() => { getFeaturedProjects(6).then(setProjects).catch(console.error); }, []);

  return (
    <section id="projects" style={{ position: "relative", padding: "140px 48px", background: t.galleryBg, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.4s ease" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, ${BRAND.accent}, transparent)` }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: BRAND.accent }}>Our Portfolio</span>
              </div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.025em", color: t.galleryHeading, margin: 0, transition: "color 0.4s" }}>Highlights of <span style={{ color: BRAND.accent }}>Our Work</span></h2>
            </div>
            <Link to="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 32px", background: t.galleryBtnBg, color: t.galleryBtnText, fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)" }} onMouseEnter={(e) => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 15px 40px rgba(8,1,80,0.2)"; }} onMouseLeave={(e) => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}>View All Projects <Icons.ArrowRight /></Link>
          </div>
        </Reveal>

        {projects.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 8 }}>
            {projects.map((p, i) => {
              const isHovered = hoveredId === p._id;
              const imageUrl = p.coverImage ? urlFor(p.coverImage).width(800).height(600).fit("crop").url() : null;
              return (
                <Link to={`/projects/${p.slug.current}`} key={p._id} style={{ textDecoration: "none", position: "relative", aspectRatio: (i === 0 || i === 3) ? "2/1" : "1/1", overflow: "hidden", cursor: "pointer", gridColumn: (i === 0 || i === 3) ? "span 2" : "span 1", background: BRAND.dark, borderRadius: 4 }} className="gallery-item" onMouseEnter={() => setHoveredId(p._id)} onMouseLeave={() => setHoveredId(null)}>
                  {imageUrl ? (
                    <img src={imageUrl} alt={p.title} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)", transform: isHovered ? "scale(1.08)" : "scale(1)" }} />
                  ) : (
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${BRAND.dark}, ${BRAND.midnight})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="48" height="48" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    </div>
                  )}
                  <div style={{ position: "absolute", inset: 0, background: isHovered ? "linear-gradient(to top, rgba(8,1,80,0.95), rgba(8,1,80,0.4))" : "linear-gradient(to top, rgba(0,0,0,0.7), transparent)", transition: "all 0.4s ease" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 28, transform: isHovered ? "translateY(0)" : "translateY(10px)", opacity: isHovered ? 1 : 0.9, transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
                    <span style={{ display: "inline-block", padding: "6px 14px", background: `${BRAND.accent}20`, border: `1px solid ${BRAND.accent}40`, borderRadius: 50, fontSize: 10, fontWeight: 600, color: BRAND.accent, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>{p.category}</span>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 600, color: "#fff", margin: 0 }}>{p.title}</h3>
                  </div>
                  <div style={{ position: "absolute", top: 20, right: 20, width: 48, height: 48, borderRadius: "50%", background: BRAND.accent, display: "flex", alignItems: "center", justifyContent: "center", color: BRAND.dark, transform: isHovered ? "scale(1) rotate(0)" : "scale(0) rotate(-90deg)", transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)" }}><Icons.ArrowRight /></div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 8 }}>
            {[0,1,2,3,4,5].map((i) => (
              <div key={i} style={{ aspectRatio: (i === 0 || i === 3) ? "2/1" : "1/1", gridColumn: (i === 0 || i === 3) ? "span 2" : "span 1", background: `linear-gradient(135deg, ${["#1a1a3e","#2a1a4e","#1a2a3e","#3a1a2e","#0a2a3e","#1a3a2e"][i]}, ${BRAND.dark})`, position: "relative", overflow: "hidden", borderRadius: 4 }} className="gallery-item">
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 60, height: 60, border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.2)" }}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`@media (max-width: 768px) { .gallery-item { grid-column: span 1 !important; aspect-ratio: 1/1 !important; } }`}</style>
    </section>
  );
}

// ─── ENHANCED TESTIMONIALS ──────────────────────────────────────────
function Testimonials({ theme }) {
  const t = T[theme];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const reviews = [
    { name: "Marcus T.", loc: "Southfield, MI", text: "AB Pro completely transformed our kitchen. The team was professional, the pricing was transparent, and the result exceeded our expectations. Highly recommend!", rating: 5 },
    { name: "Sarah K.", loc: "Detroit, MI", text: "We hired AB Pro for a full basement finish. They handled permits, stayed on schedule, and communicated every step of the way. Five stars all around.", rating: 5 },
    { name: "James R.", loc: "Royal Oak, MI", text: "After getting three quotes, AB Pro offered the best value with the most detailed plan. The quality of their work speaks for itself. Our go-to contractors now.", rating: 5 },
  ];

  return (
    <section id="testimonials" style={{ position: "relative", padding: "140px 48px", background: t.testimonialsBg, fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.4s ease", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${BRAND.accent}08, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />
      
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 10 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, transparent, ${BRAND.accent})` }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: BRAND.accent }}>Testimonials</span>
              <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, ${BRAND.accent}, transparent)` }} />
            </div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.025em", color: t.testimonialsHeading, margin: "0 0 20px", transition: "color 0.4s" }}>What Our <span style={{ color: BRAND.accent }}>Clients Say</span></h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 32 }}>
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} style={{ padding: 40, background: t.testimonialCardBg, border: `1px solid ${hoveredIndex === i ? `${BRAND.accent}30` : t.testimonialCardBorder}`, borderRadius: 4, position: "relative", height: "100%", display: "flex", flexDirection: "column", transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", transform: hoveredIndex === i ? "translateY(-8px)" : "translateY(0)", boxShadow: hoveredIndex === i ? "0 25px 60px rgba(0,0,0,0.1)" : "none" }}>
                <div style={{ position: "absolute", top: 28, right: 32, color: BRAND.accent }}><Icons.Quote /></div>
                <div style={{ display: "flex", gap: 3, marginBottom: 24 }}>
                  {Array.from({ length: r.rating }).map((_, si) => (<span key={si} style={{ color: "#FFB800" }}><Icons.Star /></span>))}
                </div>
                <p style={{ fontSize: 16, fontWeight: 400, color: t.testimonialText, lineHeight: 1.85, flex: 1, marginBottom: 28, fontStyle: "italic", transition: "color 0.4s" }}>"{r.text}"</p>
                <div style={{ borderTop: `1px solid ${t.testimonialDivider}`, paddingTop: 24 }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 16, color: t.testimonialName, marginBottom: 4, transition: "color 0.4s" }}>{r.name}</div>
                  <div style={{ fontSize: 13, color: t.testimonialLoc, display: "flex", alignItems: "center", gap: 6 }}><Icons.MapPin /> {r.loc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ENHANCED CONTACT ───────────────────────────────────────────────
function Contact({ theme }) {
  const t = T[theme];
  const [status, setStatus] = useState("");
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => { e.preventDefault(); setStatus("submitting"); setTimeout(() => setStatus("success"), 1500); };

  const inputStyle = (name) => ({
    width: "100%", padding: "16px 20px", fontSize: 15, fontFamily: "'Plus Jakarta Sans', sans-serif",
    border: `1px solid ${focused === name ? BRAND.accent : t.inputBorder}`,
    background: t.inputBg, color: t.inputText, outline: "none", borderRadius: 4,
    transition: "border-color 0.3s, background 0.3s",
  });

  return (
    <section id="contact" style={{ position: "relative", padding: "140px 48px", background: t.contactBg, fontFamily: "'Plus Jakarta Sans', sans-serif", overflow: "hidden" }}>
      <FloatingParticles count={12} />
      <GridOverlay opacity={0.015} />
      
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }} className="contact-grid">
          <Reveal>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, ${BRAND.accent}, transparent)` }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: BRAND.accent }}>Get an Estimate</span>
              </div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.025em", color: t.contactHeading, margin: "0 0 24px" }}>Ready to Start <br /><span style={{ color: BRAND.accent }}>Your Project?</span></h2>
              <p style={{ fontSize: 18, lineHeight: 1.8, color: t.contactText, marginBottom: 48 }}>Don't wait for small problems to become big headaches. Fill out the form and our team will get back to you with a comprehensive, no-obligation estimate.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {[
                  { icon: <Icons.Phone />, label: "Call Us", value: "(248) 864-1784", href: "tel:2488641784" },
                  { icon: <Icons.Mail />, label: "Email", value: "Info@abprojectllc.com", href: "mailto:Info@abprojectllc.com" },
                  { icon: <Icons.MapPin />, label: "Office", value: "17515 W Nine Mile Rd, Southfield, MI", href: null },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${BRAND.accent}15`, border: `1px solid ${BRAND.accent}25`, display: "flex", alignItems: "center", justifyContent: "center", color: BRAND.accent }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: t.contactLabel, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{c.label}</div>
                      {c.href ? <a href={c.href} style={{ fontSize: 17, fontWeight: 500, color: t.contactValue, textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = BRAND.accent} onMouseLeave={e => e.target.style.color = t.contactValue}>{c.value}</a> : <span style={{ fontSize: 17, fontWeight: 500, color: t.contactValue }}>{c.value}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {status === "success" ? (
              <div style={{ padding: 64, border: `1px solid ${BRAND.accent}30`, background: `${BRAND.accent}08`, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 400 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${BRAND.accent}20`, display: "flex", alignItems: "center", justifyContent: "center", color: BRAND.accent, marginBottom: 24 }}><Icons.Check /></div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 600, color: t.contactHeading, marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ fontSize: 15, color: t.contactText, marginBottom: 32 }}>We've received your request and will be in touch shortly.</p>
                <button onClick={() => setStatus("")} style={{ background: "none", border: `1px solid ${BRAND.accent}40`, color: BRAND.accent, padding: "12px 28px", cursor: "pointer", fontSize: 14, fontWeight: 600, borderRadius: 4 }}>Send Another Message</button>
              </div>
            ) : (
              <div style={{ padding: 48, border: `1px solid ${t.formCardBorder}`, background: t.formCardBg, borderRadius: 4 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }} className="form-grid">
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: t.contactLabel, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Full Name</label>
                    <input type="text" placeholder="John Doe" style={inputStyle("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: t.contactLabel, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Email</label>
                    <input type="email" placeholder="john@example.com" style={inputStyle("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: t.contactLabel, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Service Needed</label>
                    <select style={{ ...inputStyle("service"), appearance: "none", cursor: "pointer" }} onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}>
                      <option value="" style={{ background: t.selectBg }}>Select a service...</option>
                      <option value="Kitchen Remodel" style={{ background: t.selectBg }}>Kitchen Remodel</option>
                      <option value="Bathroom Remodel" style={{ background: t.selectBg }}>Bathroom Remodel</option>
                      <option value="Full Rehab" style={{ background: t.selectBg }}>Full Rehab</option>
                      <option value="Gas Line" style={{ background: t.selectBg }}>Gas Line Installation</option>
                      <option value="Commercial" style={{ background: t.selectBg }}>Commercial Project</option>
                      <option value="Other" style={{ background: t.selectBg }}>Other</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: t.contactLabel, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Message</label>
                  <textarea rows={5} placeholder="Tell us about your project..." style={{ ...inputStyle("msg"), resize: "vertical" }} onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)} />
                </div>
                <button onClick={handleSubmit} disabled={status === "submitting"} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, width: "100%", padding: "20px", background: BRAND.accent, color: BRAND.dark, border: "none", fontSize: 15, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.02em", cursor: "pointer", transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", borderRadius: 4, opacity: status === "submitting" ? 0.7 : 1 }} onMouseEnter={e => { if (status !== "submitting") { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = `0 15px 40px ${BRAND.accent}40`; } }} onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}>
                  {status === "submitting" ? "Sending..." : <>Send Message <Icons.Send /></>}
                </button>
              </div>
            )}
          </Reveal>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } .form-grid { grid-template-columns: 1fr !important; } }`}</style>
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