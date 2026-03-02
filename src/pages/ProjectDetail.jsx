// src/pages/ProjectDetail.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectBySlug, urlFor } from "../lib/sanity";

// ─── CONFIG ─────────────────────────────────────────────────
const BRAND = {
  dark: "#080150",
  accent: "#85ff00",
  light: "#f8f9fa",
  midnight: "#03002e",
};

// ─── PORTABLE TEXT RENDERER ─────────────────────────────────
// Simple renderer for Sanity's block content (no extra dependency needed)
function PortableText({ blocks }) {
  if (!blocks) return null;

  return blocks.map((block, i) => {
    // Image block
    if (block._type === "image") {
      const imgUrl = urlFor(block).width(1200).url();
      return (
        <figure key={i} style={{ margin: "40px 0" }}>
          <img
            src={imgUrl}
            alt={block.caption || "Project photo"}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
          {block.caption && (
            <figcaption style={{
              fontSize: 13,
              color: "#999",
              marginTop: 12,
              fontStyle: "italic",
              textAlign: "center",
            }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    // Text blocks
    if (block._type === "block") {
      const text = block.children
        ?.map((child) => {
          let content = child.text || "";
          if (child.marks?.includes("strong")) content = `<strong>${content}</strong>`;
          if (child.marks?.includes("em")) content = `<em>${content}</em>`;
          return content;
        })
        .join("");

      const style = {
        normal: {
          fontSize: 17,
          fontWeight: 300,
          color: "#555",
          lineHeight: 1.9,
          marginBottom: 24,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
        h2: {
          fontFamily: "'Outfit', sans-serif",
          fontSize: 32,
          fontWeight: 700,
          color: BRAND.dark,
          lineHeight: 1.2,
          marginTop: 48,
          marginBottom: 20,
        },
        h3: {
          fontFamily: "'Outfit', sans-serif",
          fontSize: 24,
          fontWeight: 600,
          color: BRAND.dark,
          lineHeight: 1.3,
          marginTop: 36,
          marginBottom: 16,
        },
        blockquote: {
          fontSize: 18,
          fontWeight: 400,
          color: BRAND.dark,
          lineHeight: 1.7,
          padding: "24px 32px",
          borderLeft: `4px solid ${BRAND.accent}`,
          background: `${BRAND.accent}08`,
          margin: "32px 0",
          fontStyle: "italic",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
      };

      const Tag = block.style === "h2" ? "h2" : block.style === "h3" ? "h3" : block.style === "blockquote" ? "blockquote" : "p";
      return (
        <Tag
          key={i}
          style={style[block.style] || style.normal}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }

    return null;
  });
}

// ─── LIGHTBOX ───────────────────────────────────────────────
function Lightbox({ images, currentIndex, onClose, onNav }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNav]);

  const img = images[currentIndex];
  if (!img) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "zoom-out",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "none",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontSize: 24,
          padding: 8,
        }}
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onNav(-1); }}
            style={{
              position: "absolute",
              left: 20,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNav(1); }}
            style={{
              position: "absolute",
              right: 20,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </>
      )}

      <img
        src={urlFor(img).width(1400).url()}
        alt={img.caption || "Project photo"}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90vw",
          maxHeight: "85vh",
          objectFit: "contain",
          cursor: "default",
        }}
      />

      {/* Counter */}
      <div style={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        color: "rgba(255,255,255,0.5)",
        fontSize: 13,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────
export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProjectBySlug(slug)
      .then((data) => {
        setProject(data);
        setLoading(false);
        setTimeout(() => setHeroLoaded(true), 100);
      })
      .catch((err) => {
        console.error("Failed to fetch project:", err);
        setLoading(false);
      });
  }, [slug]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const navigateLightbox = (dir) => {
    if (!project?.gallery) return;
    setLightboxIndex((prev) =>
      (prev + dir + project.gallery.length) % project.gallery.length
    );
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND.light,
      }}>
        <div style={{
          width: 48,
          height: 48,
          border: `3px solid ${BRAND.accent}30`,
          borderTopColor: BRAND.accent,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND.light,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 700, color: BRAND.dark, marginBottom: 16 }}>Project Not Found</h2>
        <p style={{ color: "#888", marginBottom: 32 }}>The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/projects" style={{
          padding: "14px 32px",
          background: BRAND.accent,
          color: BRAND.dark,
          textDecoration: "none",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>
          Back to Projects
        </Link>
      </div>
    );
  }

  const coverUrl = project.coverImage
    ? urlFor(project.coverImage).width(1920).height(900).fit("crop").url()
    : null;

  const formattedDate = project.completionDate
    ? new Date(project.completionDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : null;

  return (
    <div style={{ background: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      {/* ─── HERO IMAGE ──────────────────────────────────────── */}
      <section style={{
        position: "relative",
        height: "70vh",
        minHeight: 500,
        maxHeight: 700,
        overflow: "hidden",
      }}>
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 1.2s cubic-bezier(0.22,1,0.36,1)",
              transform: heroLoaded ? "scale(1)" : "scale(1.1)",
            }}
          />
        ) : (
          <div style={{
            width: "100%",
            height: "100%",
            background: `linear-gradient(135deg, ${BRAND.dark}, ${BRAND.midnight})`,
          }} />
        )}

        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(8,1,80,0.95) 0%, rgba(8,1,80,0.3) 40%, transparent 100%)",
        }} />

        {/* Back button */}
        <Link
          to="/projects"
          style={{
            position: "absolute",
            top: 100,
            left: 24,
            zIndex: 20,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 600,
            transition: "all 0.3s",
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M5 12l7 7M5 12l7-7"/>
          </svg>
          All Projects
        </Link>

        {/* Title overlay */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "60px 24px 48px",
          zIndex: 10,
        }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{
              display: "inline-block",
              padding: "6px 16px",
              background: BRAND.accent,
              color: BRAND.dark,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}>
              {project.category}
            </div>

            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#fff",
              margin: 0,
            }}>
              {project.title}
            </h1>

            {/* Meta info */}
            <div style={{
              display: "flex",
              gap: 32,
              marginTop: 20,
              flexWrap: "wrap",
            }}>
              {project.location && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                  <svg width="14" height="14" fill="none" stroke={BRAND.accent} strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {project.location}
                </div>
              )}
              {formattedDate && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                  <svg width="14" height="14" fill="none" stroke={BRAND.accent} strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                  Completed {formattedDate}
                </div>
              )}
              {project.client && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                  <svg width="14" height="14" fill="none" stroke={BRAND.accent} strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  {project.client}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT ─────────────────────────────────────────── */}
      <section style={{ padding: "64px 24px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Tags */}
          {project.tags?.length > 0 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  padding: "6px 16px",
                  background: `${BRAND.accent}12`,
                  color: BRAND.dark,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  border: `1px solid ${BRAND.accent}25`,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Rich text body */}
          <PortableText blocks={project.description} />
        </div>
      </section>

      {/* ─── PHOTO GALLERY ───────────────────────────────────── */}
      {project.gallery?.length > 0 && (
        <section style={{
          padding: "80px 24px",
          background: BRAND.light,
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: BRAND.accent }}>Gallery</span>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 36, fontWeight: 700, color: BRAND.dark, marginTop: 8 }}>Project Photos</h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 12,
            }}>
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  onClick={() => openLightbox(i)}
                  style={{
                    position: "relative",
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    cursor: "zoom-in",
                    background: "#eee",
                  }}
                >
                  <img
                    src={urlFor(img).width(600).height(450).fit("crop").url()}
                    alt={img.caption || `Photo ${i + 1}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  />
                  {img.caption && (
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "32px 16px 12px",
                      background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
                      color: "#fff",
                      fontSize: 13,
                    }}>
                      {img.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section style={{
        padding: "80px 24px",
        background: BRAND.dark,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 16,
          }}>
            Ready to Start <span style={{ color: BRAND.accent }}>Your Project?</span>
          </h2>
          <p style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.7,
            marginBottom: 36,
          }}>
            Get a free, no-obligation estimate from our team.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "18px 36px",
                background: BRAND.accent,
                color: BRAND.dark,
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              Get Estimate
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <a
              href="tel:2488641784"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "18px 36px",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                fontWeight: 500,
                fontSize: 14,
                textDecoration: "none",
                transition: "all 0.3s",
              }}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              (248) 864-1784
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && project.gallery && (
        <Lightbox
          images={project.gallery}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNav={navigateLightbox}
        />
      )}
    </div>
  );
}