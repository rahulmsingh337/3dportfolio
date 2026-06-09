import { useEffect, useRef } from "react";

const AWARDS = [
  { icon: "🏆", name: "Unit Rise Award — Rookie of the Quarter", org: "Infosys EAS SAP Unit" },
  { icon: "⭐", name: "Best Performer — EAS SAP Unit", org: "Infosys" },
  { icon: "🎯", name: "ACE COE Performer Award", org: "Infosys EAS SAP Unit" },
  { icon: "🔥", name: "16 Consecutive INSTA Rewards", org: "Infosys — Outstanding Commitment" },
  { icon: "🚀", name: "5× Unit Rise Awards", org: "Infosys SAP Unit" },
  { icon: "💡", name: "AMS Track Lead", org: "Infosys · Aug 2022 – Dec 2025" },
];

const CERTS = [
  "SAP Certified — Back-End Developer (ABAP Cloud)",
  "Data Management & ABAP Services for SAP Cloud Platform",
  "SAP ALE IDocs Certification",
  "Advanced Programming in ABAP",
  "Data Privacy, Data Compliance & Risk",
];

export default function Awards() {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { ref.current.classList.add("visible"); io.unobserve(ref.current); }
    }, { threshold: 0.1 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="awards" style={{ borderTop: "1px solid var(--stroke)", background: "var(--surface)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }}>
        <div ref={ref} className="reveal">
          <div style={sectionLabel}>
            <span style={{ display: "block", width: 32, height: 1, background: "var(--muted)" }} />
            Recognition
          </div>
          <h2 style={sectionHeading}>
            Awards &<br />
            <em style={{ fontStyle: "normal", color: "var(--muted)" }}>honours</em>
          </h2>
        </div>

        {/* Awards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 1,
          background: "var(--stroke)",
          border: "1px solid var(--stroke)",
          borderRadius: 20,
          overflow: "hidden",
          marginTop: 60, marginBottom: 80,
        }}>
          {AWARDS.map(a => (
            <div key={a.name} data-hover style={{
              background: "var(--surface)", padding: 28,
              transition: "background 0.3s", cursor: "default",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--surface2)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--surface)"}
            >
              <div style={{ fontSize: 28, marginBottom: 14 }}>{a.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{a.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{a.org}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div style={sectionLabel}>
          <span style={{ display: "block", width: 32, height: 1, background: "var(--muted)" }} />
          Certifications
        </div>
        <h2 style={{ ...sectionHeading, marginBottom: 48 }}>
          SAP <em style={{ fontStyle: "normal", color: "var(--muted)" }}>Certified</em>
        </h2>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {CERTS.map((c, i) => (
            <div key={c} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "22px 0",
              borderBottom: i < CERTS.length - 1 ? "1px solid var(--stroke)" : "none",
              transition: "padding 0.25s",
              gap: 16,
            }}
            onMouseEnter={e => e.currentTarget.style.paddingLeft = "14px"}
            onMouseLeave={e => e.currentTarget.style.paddingLeft = "0"}
            >
              <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", flex: 1 }}>{c}</span>
              <span style={{
                fontSize: 11, fontWeight: 700,
                padding: "6px 14px", borderRadius: 100,
                background: "rgba(61,214,140,0.1)",
                border: "1px solid rgba(61,214,140,0.25)",
                color: "var(--green)",
                letterSpacing: "0.05em", textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}>SAP Official</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const sectionLabel = {
  display: "inline-flex", alignItems: "center", gap: 12,
  fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase",
  color: "var(--muted)", marginBottom: 24,
};
const sectionHeading = {
  fontFamily: "'Fraunces', serif", fontStyle: "italic",
  fontSize: "clamp(36px,5vw,64px)", lineHeight: 1.05,
  letterSpacing: "-1px", color: "var(--text)", marginBottom: 16,
};
