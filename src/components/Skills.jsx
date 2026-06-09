import { useEffect, useRef } from "react";

const SKILLS = [
  {
    icon: "⚡",
    title: "Core ABAP & S/4HANA",
    desc: "ABAP 7.5, OO-ABAP, ECC to S/4HANA migration, HANA remediation, code push-down, AMDP.",
    tags: ["ABAP 7.5", "OO-ABAP", "AMDP", "S/4HANA", "ECC Migration", "Code Push-Down"],
  },
  {
    icon: "🔷",
    title: "Modern SAP / Cloud",
    desc: "CDS Views, RAP programming model, OData V2/V4, SAP Fiori, UI5, SAP BTP ABAP Environment.",
    tags: ["CDS Views", "RAP", "OData V4", "Fiori", "SAP BTP", "ABAP Cloud"],
  },
  {
    icon: "🔗",
    title: "Integration & Interfaces",
    desc: "ALE/IDoc, RFC, BAPIs, Proxies, external API integration, BRF+, SAP Workflow automation.",
    tags: ["ALE/IDoc", "RFC", "BAPIs", "Proxies", "BRF+", "SAP Workflow"],
  },
  {
    icon: "📊",
    title: "Performance & Tooling",
    desc: "SQL Trace, ABAP Runtime Analysis, ATC, Eclipse ADT, SmartShift, system dump analysis.",
    tags: ["SQL Trace", "ATC", "Eclipse ADT", "SmartShift", "Runtime Analysis"],
  },
  {
    icon: "📄",
    title: "Forms & Output",
    desc: "SmartForms, Adobe Forms, SAPscript, Web Dynpro for complex business output management.",
    tags: ["SmartForms", "Adobe Forms", "SAPscript", "Web Dynpro", "ALV/SALV"],
  },
  {
    icon: "🏢",
    title: "SAP Modules",
    desc: "Functional exposure across FICO, MM, SD — translating business requirements to technical specs.",
    tags: ["SAP FICO", "SAP MM", "SAP SD", "Data Dictionary", "Enhancements"],
  },
];

function SkillCard({ skill, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add("visible"), delay);
        io.unobserve(el);
      }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal" data-hover style={{
      background: "var(--bg)",
      padding: 32,
      transition: "background 0.3s",
      cursor: "default",
    }}
    onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
    onMouseLeave={e => e.currentTarget.style.background = "var(--bg)"}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: "linear-gradient(135deg,rgba(78,155,255,0.15),rgba(137,170,204,0.08))",
        border: "1px solid rgba(78,155,255,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20, marginBottom: 20,
      }}>{skill.icon}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>
        {skill.title}
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, marginBottom: 16 }}>
        {skill.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {skill.tags.map(t => (
          <span key={t} style={{
            fontSize: 11, fontWeight: 600,
            padding: "4px 10px", borderRadius: 100,
            background: "var(--surface2)",
            border: "1px solid var(--stroke)",
            color: "var(--muted)", letterSpacing: "0.02em",
            transition: "all 0.2s",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const headRef = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { headRef.current.classList.add("visible"); io.unobserve(headRef.current); }
    }, { threshold: 0.1 });
    io.observe(headRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="skills" style={{ borderTop: "1px solid var(--stroke)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }}>
        <div ref={headRef} className="reveal">
          <div style={sectionLabel}>
            <span style={{ display: "block", width: 32, height: 1, background: "var(--muted)" }} />
            Technical Arsenal
          </div>
          <h2 style={sectionHeading}>
            What I <em style={{ fontStyle: "normal", color: "var(--muted)" }}>work</em><br />with daily
          </h2>
          <p style={sectionSub}>
            Deep expertise across the SAP stack — from legacy ABAP to modern cloud-native RAP architecture.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 1,
          background: "var(--stroke)",
          border: "1px solid var(--stroke)",
          borderRadius: 20,
          overflow: "hidden",
          marginTop: 60,
        }}>
          {SKILLS.map((s, i) => <SkillCard key={s.title} skill={s} delay={i * 80} />)}
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
const sectionSub = { fontSize: 15, color: "var(--muted)", maxWidth: 480, lineHeight: 1.7 };
