import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const sections = ["hero","skills","experience","projects","awards","contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 180) {
          setActive(sections[i]); break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
      display: "flex", justifyContent: "center", padding: "20px 16px",
    }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        background: "rgba(17,17,17,0.85)",
        backdropFilter: "blur(24px)",
        border: "1px solid var(--stroke)",
        borderRadius: 100,
        padding: "6px 8px",
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
        transition: "box-shadow 0.3s",
      }}>
        {/* Logo */}
        <div data-hover style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "var(--surface2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 13,
          color: "var(--text)", cursor: "none", position: "relative",
          flexShrink: 0,
        }}>
          <div style={{
            position: "absolute", inset: -1.5,
            background: "linear-gradient(135deg,#89AACC,#4E9BFF)",
            borderRadius: "50%", zIndex: -1,
          }} />
          RS
        </div>

        <div style={{ width: 1, height: 20, background: "var(--stroke)", margin: "0 4px" }} />

        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            data-hover
            style={{
              fontSize: 13, fontWeight: 500,
              color: active === l.href.slice(1) ? "var(--text)" : "var(--muted)",
              textDecoration: "none",
              padding: "6px 14px", borderRadius: 100,
              background: active === l.href.slice(1) ? "var(--stroke)" : "transparent",
              transition: "all 0.2s", cursor: "none",
              display: "none",
            }}
            className="nav-desktop-link"
          >
            {l.label}
          </a>
        ))}

        <div style={{ width: 1, height: 20, background: "var(--stroke)", margin: "0 4px" }} />

        <a
          href="mailto:rs58598@gmail.com"
          data-hover
          style={{
            fontSize: 13, fontWeight: 700,
            color: "var(--bg)",
            background: "var(--text)",
            padding: "6px 16px", borderRadius: 100,
            textDecoration: "none", cursor: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "var(--accent)"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--text)"}
        >
          Say hi ↗
        </a>
      </div>

      <style>{`
        @media(min-width:640px){.nav-desktop-link{display:inline-flex !important;align-items:center;}}
      `}</style>
    </nav>
  );
}
