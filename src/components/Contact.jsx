import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rahulmsingh337/" },
  { label: "GitHub", href: "https://github.com/rahulmsingh337" },
  { label: "Website", href: "https://rahulmsingh337.github.io/" },
];

export default function Contact() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section id="contact" style={{
      borderTop: "1px solid var(--stroke)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Marquee */}
      <div style={{ overflow: "hidden", padding: "20px 0", borderBottom: "1px solid var(--stroke)" }}>
        <div ref={marqueeRef} style={{ display: "flex", width: "max-content" }}>
          {Array(16).fill("BUILDING THE FUTURE •").map((t, i) => (
            <span key={i} style={{
              fontFamily: "'Fraunces', serif", fontStyle: "italic",
              fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 300,
              color: "var(--text)", opacity: 0.05,
              padding: "0 36px", whiteSpace: "nowrap",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* BG glow */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "80%", height: "60%",
        background: "radial-gradient(ellipse at 50% 100%,rgba(78,155,255,0.07) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 1200, margin: "0 auto",
        padding: "100px 40px 60px",
        textAlign: "center",
      }}>
        <div style={{
          fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase",
          color: "var(--muted)", marginBottom: 32,
        }}>
          Let's Connect
        </div>

        <h2 style={{
          fontFamily: "'Fraunces', serif", fontStyle: "italic",
          fontSize: "clamp(48px, 9vw, 110px)",
          lineHeight: 0.93, letterSpacing: "-3px",
          color: "var(--text)", marginBottom: 52,
        }}>
          Let's build<br />something.
        </h2>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 }}>
          <a
            href="mailto:rs58598@gmail.com"
            data-hover
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 13, fontWeight: 700,
              padding: "14px 28px", borderRadius: 100,
              background: "var(--text)", color: "var(--bg)",
              textDecoration: "none", cursor: "none",
              transition: "all 0.3s", letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--text)"; e.currentTarget.style.color = "var(--bg)"; }}
          >
            Email me ↗
          </a>

          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              data-hover
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 13, fontWeight: 600,
                padding: "14px 28px", borderRadius: 100,
                border: "1px solid var(--stroke)", color: "var(--muted)",
                textDecoration: "none", cursor: "none",
                transition: "all 0.3s", letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--stroke)"; e.currentTarget.style.color = "var(--muted)"; }}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Footer bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 36, borderTop: "1px solid var(--stroke)",
          fontSize: 12, color: "var(--muted)",
          flexWrap: "wrap", gap: 16,
        }}>
          <div>Rahul Singh — SAP ABAP Lead · Noida, India</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "var(--green)",
              boxShadow: "0 0 8px var(--green)",
              display: "inline-block",
            }} className="animate-pulse-dot" />
            Available for opportunities
          </div>
          <div>+91-8989805836</div>
        </div>
      </div>
    </section>
  );
}
