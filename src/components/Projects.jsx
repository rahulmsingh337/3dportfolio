import { useEffect, useRef } from "react";

const PROJECTS = [
  {
    num: "01",
    title: "ABAP Cloud RAP Reference",
    desc: "Open-source reference RAP model on SAP BTP ABAP Environment. BO definition, OData V4 service exposure, Fiori Elements UI. A practical starting point for teams adopting RAP architecture.",
    link: "https://github.com/rahulmsingh337/abap-cloud-rap-reference-project",
    linkLabel: "View on GitHub →",
    stack: ["RAP", "OData V4", "SAP BTP", "Fiori Elements", "ABAP Cloud"],
  },
  {
    num: "02",
    title: "S/4HANA Migration Cookbook",
    desc: "Open-source reference for ECC to S/4HANA code migration patterns. Covers HANA remediation, code push-down techniques, and deprecated API replacements — built from real migration experience.",
    link: "https://github.com/rahulmsingh337/s4hana_migration-code-cookbook",
    linkLabel: "View on GitHub →",
    stack: ["S/4HANA", "HANA", "ABAP", "Migration Patterns"],
  },
  {
    num: "03",
    title: "SAP Workflow — Approval Automation",
    desc: "Multi-level approval routing workflow at Infosys. Business object methods, agent determination rules, deadline monitoring — significantly reducing manual intervention in approval chains.",
    link: null,
    stack: ["SAP Workflow", "ABAP", "Business Objects", "Agent Rules"],
  },
  {
    num: "04",
    title: "US Email Automation — BOL & Packing Slip",
    desc: "Led assessment and enhancement of email output automation for Bill of Lading and packing slips. Implemented consolidation logic for multiple POs/DNs into a single document per delivery stop.",
    link: null,
    stack: ["SmartForms", "Adobe Forms", "SAP SD", "Output Mgmt"],
  },
  {
    num: "05",
    title: "LT03 Custom Transaction",
    desc: "End-to-end solution for a standard LT03 transaction limitation. Analysis → POC → prototype → client presentation → approval → delivery. Received direct client appreciation for the approach.",
    link: null,
    stack: ["ABAP", "SAP WM", "Custom TX", "POC Delivery"],
  },
  {
    num: "06",
    title: "SmartShift Automation Tool",
    desc: "Collaborating with Accenture's SmartShift team to build automation tools that streamline SAP business activities and accelerate S/4HANA migration workflows at enterprise scale.",
    link: null,
    stack: ["SmartShift", "ABAP", "Automation", "S/4HANA"],
  },
];

function ProjectCard({ project, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => ref.current.classList.add("visible"), delay);
        io.unobserve(ref.current);
      }
    }, { threshold: 0.1 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal"
      data-hover
      style={{
        background: "var(--surface)",
        border: "1px solid var(--stroke)",
        borderRadius: 20,
        padding: 32,
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.3s, border-color 0.3s",
        cursor: "default",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "rgba(78,155,255,0.3)";
        e.currentTarget.querySelector(".top-line").style.opacity = "1";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--stroke)";
        e.currentTarget.querySelector(".top-line").style.opacity = "0";
      }}
    >
      {/* top accent line */}
      <div className="top-line" style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg,transparent,var(--accent),transparent)",
        opacity: 0, transition: "opacity 0.3s",
      }} />

      <div style={{
        fontFamily: "'Fraunces', serif", fontStyle: "italic",
        fontSize: 52, fontWeight: 300,
        color: "var(--stroke)",
        lineHeight: 1, marginBottom: 24,
        transition: "color 0.3s",
      }}>{project.num}</div>

      <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>
        {project.title}
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, marginBottom: 24 }}>
        {project.desc}
      </p>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          data-hover
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 12, fontWeight: 700, color: "var(--accent)",
            textDecoration: "none", letterSpacing: "0.05em",
            textTransform: "uppercase", transition: "gap 0.2s",
            cursor: "none",
          }}
          onMouseEnter={e => e.currentTarget.style.gap = "14px"}
          onMouseLeave={e => e.currentTarget.style.gap = "8px"}
        >
          {project.linkLabel}
        </a>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: project.link ? 16 : 0 }}>
        {project.stack.map(t => (
          <span key={t} style={{
            fontSize: 11, fontWeight: 700,
            padding: "4px 12px", borderRadius: 100,
            background: "rgba(78,155,255,0.07)",
            border: "1px solid rgba(78,155,255,0.18)",
            color: "var(--accent)", letterSpacing: "0.05em", textTransform: "uppercase",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const headRef = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { headRef.current.classList.add("visible"); io.unobserve(headRef.current); }
    }, { threshold: 0.1 });
    io.observe(headRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="projects" style={{ borderTop: "1px solid var(--stroke)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }}>
        <div ref={headRef} className="reveal">
          <div style={sectionLabel}>
            <span style={{ display: "block", width: 32, height: 1, background: "var(--muted)" }} />
            Projects
          </div>
          <h2 style={sectionHeading}>
            Things I've<br />
            <em style={{ fontStyle: "normal", color: "var(--muted)" }}>shipped</em>
          </h2>
          <p style={sectionSub}>
            From enterprise automation to open-source SAP reference implementations.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20, marginTop: 60,
        }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.num} project={p} delay={i * 80} />)}
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
