import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const LINKS = [
  { label: "Home",       href: "#hero",           short: "01" },
  { label: "Skills",     href: "#skills",          short: "02" },
  { label: "Experience", href: "#experience",      short: "03" },
  { label: "Projects",   href: "#projects",        short: "04" },
  { label: "Works",      href: "#selected-works",  short: "05" },
  { label: "Awards",     href: "#awards",          short: "06" },
];

const SvgLinkedIn = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#0A66C2"/>
    <path d="M7 9.5H5v9h2v-9zM6 8.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zM19 13.2c0-2.1-1.1-3.7-3-3.7-1 0-1.7.5-2 1.2V9.5h-2v9h2v-4.8c0-1.1.6-1.9 1.6-1.9 1 0 1.4.8 1.4 1.9v4.8h2V13.2z" fill="white"/>
  </svg>
);
const SvgGitHub = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#24292e"/>
    <path d="M12 3C7 3 3 7.1 3 12.3c0 4.1 2.6 7.6 6.2 8.8.5.1.6-.2.6-.4v-1.5c-2.6.6-3.1-1.2-3.1-1.2-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.6.3-1.1.6-1.3-2.1-.2-4.3-1-4.3-4.6 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.4-.3.8 0 1.6.1 2.4.3 1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 3.6-2.2 4.4-4.3 4.6.3.3.6.8.6 1.7v2.5c0 .2.1.5.6.4C18.4 19.9 21 16.4 21 12.3 21 7.1 17 3 12 3z" fill="white"/>
  </svg>
);

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [active,      setActive]      = useState("hero");
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [hovered,     setHovered]     = useState(null);
  const indicatorRef = useRef(null);
  const navRef       = useRef(null);

  useEffect(() => {
    const ids = ["hero","skills","experience","projects","selected-works","awards","contact"];
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 220) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const close = e => { if (!navRef.current?.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  return (
    <>
      <nav ref={navRef} style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        display: "flex", justifyContent: "center",
        padding: scrolled ? "12px 16px" : "20px 16px",
        transition: "padding 0.4s ease",
        pointerEvents: "none",
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 0,
            pointerEvents: "all",
            background: scrolled
              ? "rgba(2,6,23,0.95)"
              : "rgba(2,6,23,0.7)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 100,
            padding: "5px 5px",
            boxShadow: scrolled
              ? "0 4px 6px -1px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "inset 0 1px 0 rgba(255,255,255,0.04)",
            transition: "all 0.4s ease",
            position: "relative",
          }}
        >
          {/* ── Logo ── */}
          <a href="#hero" data-hover style={{
            width: 38, height: 38, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Fraunces',serif", fontStyle: "italic", fontSize: 14,
            color: "#fff", cursor: "none", position: "relative", flexShrink: 0,
            textDecoration: "none", marginRight: 4,
            transition: "transform 0.3s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            {/* gradient ring — reverses on hover */}
            <div style={{
              position: "absolute", inset: -1.5,
              background: "linear-gradient(135deg,#6366F1,#22D3EE,#D8B4FE)",
              borderRadius: "50%", zIndex: -1,
              animation: "logo-spin 4s linear infinite",
            }}/>
            <div style={{
              position: "absolute", inset: 2,
              background: "#0F172A", borderRadius: "50%", zIndex: 0,
            }}/>
            <span style={{ position: "relative", zIndex: 1 }}>RS</span>
          </a>

          {/* ── Nav links (desktop) ── */}
          <div style={{
            display: "none", alignItems: "center",
            gap: 2, padding: "0 4px",
          }} className="nav-desktop">
            {LINKS.map(l => {
              const isActive = active === l.href.slice(1);
              return (
                <a key={l.href} href={l.href} data-hover
                  onMouseEnter={() => setHovered(l.label)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    position: "relative",
                    fontSize: 12, fontWeight: isActive ? 600 : 400,
                    fontFamily: "'Inter',sans-serif",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.38)",
                    textDecoration: "none",
                    padding: "7px 14px",
                    borderRadius: 100,
                    cursor: "none",
                    transition: "color 0.2s",
                    letterSpacing: "0.01em",
                    zIndex: 1,
                  }}
                >
                  {/* active / hover pill bg */}
                  {(isActive || hovered === l.label) && (
                    <motion.div
                      layoutId="nav-pill"
                      initial={false}
                      style={{
                        position: "absolute", inset: 0,
                        borderRadius: 100, zIndex: -1,
                        background: isActive
                          ? "linear-gradient(135deg,rgba(99,102,241,0.22),rgba(34,211,238,0.12))"
                          : "rgba(255,255,255,0.06)",
                        border: isActive
                          ? "1px solid rgba(99,102,241,0.3)"
                          : "1px solid rgba(255,255,255,0.06)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  {l.label}
                  {/* active dot */}
                  {isActive && (
                    <span style={{
                      position: "absolute", bottom: 4, left: "50%",
                      transform: "translateX(-50%)",
                      width: 3, height: 3, borderRadius: "50%",
                      background: "#6366F1",
                      boxShadow: "0 0 6px #6366F1",
                    }}/>
                  )}
                </a>
              );
            })}
          </div>

          {/* ── Divider ── */}
          <div style={{
            width: 1, height: 22,
            background: "rgba(255,255,255,0.07)",
            margin: "0 6px", flexShrink: 0,
          }} className="nav-divider-d"/>

          {/* ── Social mini icons (desktop) ── */}
          <div style={{
            display: "none", alignItems: "center", gap: 6, marginRight: 6,
          }} className="nav-socials">
            {[
              { href: "https://www.linkedin.com/in/rahul-singh-sap-abap/", icon: <SvgLinkedIn/>, label: "LinkedIn" },
              { href: "https://github.com/rahulmsingh337",                  icon: <SvgGitHub/>,   label: "GitHub"   },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                data-hover title={s.label}
                style={{
                  width: 28, height: 28, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "none", transition: "transform 0.2s, background 0.2s",
                  background: "rgba(255,255,255,0.04)",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.15)"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >{s.icon}</a>
            ))}
          </div>

          {/* ── Say hi CTA ── */}
          <a href="mailto:rs58598@gmail.com" data-hover style={{
            position: "relative", display: "inline-flex",
            alignItems: "center", gap: 6,
            fontFamily: "'Inter',sans-serif",
            fontSize: 12, fontWeight: 700,
            color: "#020617", background: "#fff",
            padding: "7px 18px", borderRadius: 100,
            textDecoration: "none", cursor: "none",
            letterSpacing: "0.02em", flexShrink: 0,
            transition: "all 0.25s",
            overflow: "hidden",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "linear-gradient(135deg,#6366F1,#22D3EE)";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.transform = "scale(1.04)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#020617";
            e.currentTarget.style.transform = "scale(1)";
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#3dd68c",
              boxShadow: "0 0 6px #3dd68c",
              animation: "pulse-dot 2s ease infinite",
              flexShrink: 0,
            }}/>
            Say hi ↗
          </a>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            data-hover
            style={{
              display: "none", width: 36, height: 36,
              alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "50%", cursor: "none",
              marginLeft: 8, flexShrink: 0,
            }}
            className="nav-burger"
            aria-label="Menu"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: menuOpen ? 0 : 4 }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: "block", width: 16, height: 1.5,
                  background: "#fff", borderRadius: 2,
                  transition: "all 0.3s",
                  transform: menuOpen
                    ? i === 0 ? "rotate(45deg) translate(3px,3px)"
                    : i === 2 ? "rotate(-45deg) translate(3px,-3px)"
                    : "scaleX(0)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}/>
              ))}
            </div>
          </button>
        </motion.div>

        {/* ── Mobile dropdown menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                position: "absolute", top: "calc(100% + 8px)",
                left: "50%", transform: "translateX(-50%)",
                width: "min(340px, calc(100vw - 32px))",
                background: "rgba(2,6,23,0.97)",
                backdropFilter: "blur(28px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24, overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
                pointerEvents: "all",
              }}
            >
              {/* top bar */}
              <div style={{
                height: 2,
                background: "linear-gradient(90deg,#6366F1,#22D3EE,#D8B4FE)",
              }}/>
              <div style={{ padding: "12px 8px" }}>
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href} href={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "flex", alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px", borderRadius: 14,
                      textDecoration: "none", cursor: "none",
                      background: active === l.href.slice(1)
                        ? "rgba(99,102,241,0.12)" : "transparent",
                      transition: "background 0.2s",
                      marginBottom: 2,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                    onMouseLeave={e => e.currentTarget.style.background =
                      active === l.href.slice(1) ? "rgba(99,102,241,0.12)" : "transparent"}
                  >
                    <span style={{
                      fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 500,
                      color: active === l.href.slice(1) ? "#fff" : "rgba(255,255,255,0.55)",
                    }}>{l.label}</span>
                    <span style={{
                      fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
                      color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em",
                    }}>{l.short}</span>
                  </motion.a>
                ))}
              </div>
              <div style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                padding: "12px 16px",
                display: "flex", gap: 10,
              }}>
                <a href="mailto:rs58598@gmail.com" style={{
                  flex: 1, textAlign: "center",
                  padding: "10px", borderRadius: 12,
                  background: "linear-gradient(135deg,rgba(99,102,241,0.2),rgba(34,211,238,0.1))",
                  border: "1px solid rgba(99,102,241,0.3)",
                  fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700,
                  color: "#fff", textDecoration: "none",
                }}>Say hi ↗</a>
                <a href="https://www.linkedin.com/in/rahul-singh-sap-abap/" target="_blank"
                  rel="noreferrer" style={{
                    width: 42, height: 42, borderRadius: 12,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>
                  <SvgLinkedIn/>
                </a>
                <a href="https://github.com/rahulmsingh337" target="_blank"
                  rel="noreferrer" style={{
                    width: 42, height: 42, borderRadius: 12,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>
                  <SvgGitHub/>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <style>{`
        @keyframes logo-spin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @media(min-width: 640px) {
          .nav-desktop   { display: inline-flex !important; }
          .nav-socials   { display: inline-flex !important; }
          .nav-divider-d { display: block !important; }
          .nav-burger    { display: none !important; }
        }
        @media(max-width: 639px) {
          .nav-burger    { display: inline-flex !important; }
          .nav-divider-d { display: none !important; }
        }
      `}</style>
    </>
  );
}
