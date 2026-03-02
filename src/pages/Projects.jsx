// src/pages/Projects.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAllProjects, urlFor } from "../lib/sanity";

// ─── CONFIG ─────────────────────────────────────────────────
const BRAND = {
  dark: "#080150",
  accent: "#85ff00",
  light: "#f8f9fa",
  midnight: "#03002e",
};

// ─── SCROLL ANIMATION ───────────────────────────────────────
function useInView(threshold = 0.1) {
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

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── PROJECT CARD ───────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(800).height(600).fit("crop").url()
    : null;

  return (
    <Reveal delay={index * 0.08}>
      <Link
        to={`/projects/${project.slug.current}`}
        style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <article style={{
          position: "relative",
          overflow: "hidden",
          background: BRAND.dark,
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hovered ? "0 32px 64px rgba(0,0,0,0.2)" : "0 4px 20px rgba(0,0,0,0.08)",
        }}>
          {/* Cover Image */}
          <div style={{
            position: "relative",
            aspectRatio: "4/3",
            overflow: "hidden",
          }}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={project.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                  transform: hovered ? "scale(1.08)" : "scale(1)",
                }}
              />
            ) : (
              <div style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(135deg, ${BRAND.dark}, ${BRAND.midnight})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="48" height="48" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                </svg>
              </div>
            )}

            {/* Category Badge */}
            <div style={{
              position: "absolute",
              top: 16,
              left: 16,
              padding: "6px 14px",
              background: BRAND.accent,
              color: BRAND.dark,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              {project.category}
            </div>

            {/* Gradient Overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(8,1,80,0.95) 0%, rgba(8,1,80,0.4) 40%, transparent 70%)",
              opacity: hovered ? 1 : 0.7,
              transition: "opacity 0.4s ease",
            }} />
          </div>

          {/* Card Content */}
          <div style={{
            padding: "28px 28px 32px",
            position: "relative",
            marginTop: -60,
            zIndex: 2,
          }}>
            {project.location && (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: BRAND.accent,
                marginBottom: 10,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {project.location}
              </div>
            )}

            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: 12,
            }}>
              {project.title}
            </h3>

            {project.shortDescription && (
              <p style={{
                fontSize: 14,
                fontWeight: 300,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
                marginBottom: 20,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                {project.shortDescription}
              </p>
            )}

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: BRAND.accent,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: "gap 0.3s ease",
              ...(hovered ? { gap: 12 } : {}),
            }}>
              View Project
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </div>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}

// ─── MAIN PROJECTS PAGE ─────────────────────────────────────
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", "Complete Rehabs", "Renovations", "Commercial", "Maintenance"];

  useEffect(() => {
    getAllProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
  }, []);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div style={{
      minHeight: "100vh",
      background: BRAND.light,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      {/* Hero Banner */}
      <section style={{
        position: "relative",
        padding: "160px 24px 100px",
        background: `linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.midnight} 100%)`,
        overflow: "hidden",
        textAlign: "center",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px)`,
        }} />
        <div style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.accent}12, transparent 70%)`,
          filter: "blur(80px)",
        }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 18px",
              background: "rgba(133,255,0,0.08)",
              border: "1px solid rgba(133,255,0,0.2)",
              borderRadius: 50,
              marginBottom: 24,
            }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: BRAND.accent, textTransform: "uppercase" }}>Our Portfolio</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#fff",
              margin: "0 0 20px",
            }}>
              Our <span style={{ color: BRAND.accent }}>Projects</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto",
            }}>
              Explore our latest construction projects across Metro Detroit. Every project tells a story of craftsmanship and commitment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter Bar */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(248,249,250,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        padding: "16px 24px",
      }}>
        <div style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          gap: 8,
          flexWrap: "wrap",
        }}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveFilter(c)}
              style={{
                padding: "10px 24px",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                border: `1px solid ${activeFilter === c ? BRAND.dark : "#ddd"}`,
                cursor: "pointer",
                background: activeFilter === c ? BRAND.dark : "transparent",
                color: activeFilter === c ? "#fff" : "#888",
                transition: "all 0.3s",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <section style={{ padding: "64px 24px 120px", maxWidth: 1280, margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "120px 0" }}>
            <div style={{
              width: 48,
              height: 48,
              border: `3px solid ${BRAND.accent}30`,
              borderTopColor: BRAND.accent,
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 20px",
            }} />
            <p style={{ color: "#888", fontSize: 14 }}>Loading projects...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "120px 0" }}>
            <p style={{ color: "#888", fontSize: 16 }}>No projects found in this category yet.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: 32,
          }}>
            {filtered.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}