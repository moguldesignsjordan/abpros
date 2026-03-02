// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const BRAND = {
  dark: "#080150",
  accent: "#85ff00",
  midnight: "#03002e",
};

const T = {
  dark: {
    navBg: "rgba(8,1,80,0.97)",
    navLink: "rgba(255,255,255,0.7)",
    mobileMenuBg: BRAND.dark,
    mobileLink: "#fff",
    mobileBorder: "rgba(255,255,255,0.05)",
  },
  light: {
    navBg: "rgba(255,255,255,0.97)",
    navLink: "rgba(0,0,0,0.6)",
    mobileMenuBg: "#fff",
    mobileLink: BRAND.dark,
    mobileBorder: "rgba(0,0,0,0.06)",
  },
};

const SunIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
);
const MoonIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
);
const MenuIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
);
const XIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
);

export default function Navbar({ theme, setTheme }) {
  const t = T[theme];
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  // On non-home pages, hash links go to /#section
  const sectionHref = (hash) => isHome ? hash : `/${hash}`;

  const navLinks = [
    { label: "About", href: sectionHref("#about") },
    { label: "Services", href: sectionHref("#services") },
    { label: "Portfolio", href: sectionHref("#projects") },
    { label: "Testimonials", href: sectionHref("#testimonials") },
    { label: "Contact", href: sectionHref("#contact") },
  ];

  // On inner pages the hero is gone, so always show themed links
  // On home, links are light when over hero (not scrolled), themed when scrolled
  const alwaysScrolled = !isHome;
  const isScrolledState = scrolled || alwaysScrolled;
  const linkColor = isScrolledState ? t.navLink : "rgba(255,255,255,0.7)";
  const toggleBorder = isScrolledState && theme === "light" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)";
  const toggleColor = isScrolledState && theme === "light" ? BRAND.dark : "#fff";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          background: isScrolledState ? t.navBg : "transparent",
          backdropFilter: isScrolledState ? "blur(20px)" : "none",
          borderBottom: isScrolledState ? `1px solid ${theme === "dark" ? "rgba(133,255,0,0.1)" : "rgba(0,0,0,0.06)"}` : "1px solid transparent",
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: isScrolledState ? 64 : 80, transition: "height 0.4s ease" }}>
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <img src="/logo.png" alt="AB PRO LLC" style={{ height: isScrolledState ? 36 : 44, width: "auto", transition: "height 0.4s ease", objectFit: "contain" }} />
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-desktop">
            {navLinks.map((l) => (
              isHome ? (
                <a key={l.label} href={l.href} style={{ color: linkColor, textDecoration: "none", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", transition: "color 0.3s" }}
                  onMouseEnter={e => e.target.style.color = BRAND.accent}
                  onMouseLeave={e => e.target.style.color = linkColor}
                >{l.label}</a>
              ) : (
                <Link key={l.label} to={l.href} style={{ color: linkColor, textDecoration: "none", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", transition: "color 0.3s" }}
                  onMouseEnter={e => e.target.style.color = BRAND.accent}
                  onMouseLeave={e => e.target.style.color = linkColor}
                >{l.label}</Link>
              )
            ))}
            <Link to="/projects" style={{ color: linkColor, textDecoration: "none", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", transition: "color 0.3s" }}
              onMouseEnter={e => e.target.style.color = BRAND.accent}
              onMouseLeave={e => e.target.style.color = linkColor}
            >Projects</Link>

            {/* Theme toggle */}
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} style={{
              background: "none", border: `1px solid ${toggleBorder}`,
              color: toggleColor, width: 36, height: 36,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.3s", borderRadius: 4, flexShrink: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = BRAND.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = toggleBorder}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            {isHome ? (
              <a href="#contact" style={{
                background: BRAND.accent, color: BRAND.dark, padding: "10px 24px",
                fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none", transition: "transform 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 30px ${BRAND.accent}40`; }}
                onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
              >Get Estimate</a>
            ) : (
              <Link to="/#contact" style={{
                background: BRAND.accent, color: BRAND.dark, padding: "10px 24px",
                fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                textDecoration: "none", transition: "transform 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 30px ${BRAND.accent}40`; }}
                onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
              >Get Estimate</Link>
            )}
          </nav>

          <div style={{ display: "none", alignItems: "center", gap: 12 }} className="nav-mobile-btns">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} style={{
              background: "none", border: "none", color: toggleColor, cursor: "pointer", padding: 4,
            }}>
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", color: toggleColor, cursor: "pointer" }}>
              {mobileOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ background: t.mobileMenuBg, padding: "24px", borderTop: `1px solid ${t.mobileBorder}` }}>
            {navLinks.map((l) => (
              isHome ? (
                <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} style={{ display: "block", color: t.mobileLink, textDecoration: "none", padding: "12px 0", fontSize: 16, fontWeight: 500, borderBottom: `1px solid ${t.mobileBorder}` }}>{l.label}</a>
              ) : (
                <Link key={l.label} to={l.href} onClick={() => setMobileOpen(false)} style={{ display: "block", color: t.mobileLink, textDecoration: "none", padding: "12px 0", fontSize: 16, fontWeight: 500, borderBottom: `1px solid ${t.mobileBorder}` }}>{l.label}</Link>
              )
            ))}
            <Link to="/projects" onClick={() => setMobileOpen(false)} style={{ display: "block", color: t.mobileLink, textDecoration: "none", padding: "12px 0", fontSize: 16, fontWeight: 500, borderBottom: `1px solid ${t.mobileBorder}` }}>Projects</Link>
            {isHome ? (
              <a href="#contact" onClick={() => setMobileOpen(false)} style={{ display: "block", background: BRAND.accent, color: BRAND.dark, padding: "14px", textAlign: "center", fontWeight: 700, marginTop: 16, fontSize: 14, textDecoration: "none" }}>Get Your Free Estimate</a>
            ) : (
              <Link to="/#contact" onClick={() => setMobileOpen(false)} style={{ display: "block", background: BRAND.accent, color: BRAND.dark, padding: "14px", textAlign: "center", fontWeight: 700, marginTop: 16, fontSize: 14, textDecoration: "none" }}>Get Your Free Estimate</Link>
            )}
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btns { display: flex !important; }
        }
      `}</style>
    </>
  );
}