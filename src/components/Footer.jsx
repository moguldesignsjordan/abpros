// src/components/Footer.jsx
import { Link, useLocation } from "react-router-dom";

const BRAND = {
  dark: "#080150",
  accent: "#85ff00",
  midnight: "#03002e",
};

const PhoneIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
);
const MailIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
);
const MapPinIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
);

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const sectionHref = (hash) => isHome ? hash : `/${hash}`;

  return (
    <footer style={{ padding: "64px 24px 32px", background: BRAND.midnight, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <img src="/logo.png" alt="AB PRO LLC" style={{ height: 40, width: "auto", objectFit: "contain" }} />
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>Full-service contractors serving Metro Detroit homeowners and businesses since 2009.</p>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>Navigation</h4>
            {["About", "Services", "Portfolio", "Testimonials", "Contact"].map(l => {
              const href = sectionHref(`#${l.toLowerCase()}`);
              return isHome ? (
                <a key={l} href={href} style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "none", padding: "6px 0", transition: "color 0.3s" }}
                  onMouseEnter={e => e.target.style.color = BRAND.accent}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
                >{l}</a>
              ) : (
                <Link key={l} to={href} style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "none", padding: "6px 0", transition: "color 0.3s" }}
                  onMouseEnter={e => e.target.style.color = BRAND.accent}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
                >{l}</Link>
              );
            })}
            <Link to="/projects" style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "none", padding: "6px 0", transition: "color 0.3s" }}
              onMouseEnter={e => e.target.style.color = BRAND.accent}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
            >Projects</Link>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.4)", fontSize: 14 }}><span style={{ color: BRAND.accent }}><PhoneIcon /></span> (248) 864-1784</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.4)", fontSize: 14 }}><span style={{ color: BRAND.accent }}><MailIcon /></span> Info@abprojectllc.com</div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "rgba(255,255,255,0.4)", fontSize: 14 }}><span style={{ color: BRAND.accent, marginTop: 2 }}><MapPinIcon /></span> 17515 W Nine Mile Rd,<br/>Southfield, MI 48075</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© {new Date().getFullYear()} AB PRO LLC. All rights reserved.</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>Created with Mogul Design Agency</p>
        </div>
      </div>
    </footer>
  );
}