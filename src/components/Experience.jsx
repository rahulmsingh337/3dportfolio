import { useEffect, useRef } from "react";

const JOBS = [
  {
    period: "Dec 2025 — Present",
    role: "Software Development Lead",
    company: "Accenture",
    location: "Noida, UP",
    points: [
      "Leading SAP ABAP development and ECC to S/4HANA migration for enterprise clients",
      "HANA remediation on custom ABAP programs to ensure S/4HANA compatibility",
      "Developing and optimizing CDS Views, OData Services, and RAP-based applications",
      "Redesigning legacy ABAP programs for database performance optimization on SAP HANA",
      "Collaborating with SmartShift team to develop automation tools for SAP business activities",
      "Conducting code reviews using ATC, SQL Trace, ABAP Runtime Analysis, system dump analysis",
    ],
    stack: ["S/4HANA", "CDS Views", "RAP", "OData", "HANA Remediation", "SmartShift", "ATC", "Fiori"],
  },
  {
    period: "May 2021 — Dec 2025  ·  4.5 years",
    role: "SAP ABAP Consultant",
    company: "Infosys",
    location: "Noida, UP",
    points: [
      "Top performer in EAS SAP Unit across multiple application management and development projects",
      "AMS Track Lead (Aug 2022 – Dec 2025): resolved P1/P2 incidents, led design discussions, managed project delivery without escalation",
      "Developed classical, interactive, ALV/SALV reports and interface programs (Proxies, RFC, IDocs, Web Dynpro)",
      "Built SAP Workflow solutions with multi-level approval routing, deadline monitoring, agent determination",
      "Integrated SAP with external APIs; data migration via BAPIs to master tables",
      "Earned 16 consecutive INSTA Rewards and 5× Unit Rise Awards for outstanding delivery",
    ],
    stack: ["ABAP 7.5", "SAP Fiori", "OData", "ALE/IDocs", "SmartForms", "Adobe Forms", "SAP Workflow", "BAPIs", "Web Dynpro"],
  },
];

export default function Experience() {
  const headRef = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { headRef.current.classList.add("visible"); io.unobserve(headRef.current); }
    }, { threshold: 0.1 });
    io.observe(headRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="experience" style={{ borderTop: "1px solid var(--stroke)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }}>
        <div ref={headRef} className="reveal">
          <div style={sectionLabel}>
            <span style={{ display: "block", width: 32, height: 1, background: "var(--muted)" }} />
            Career
          </div>
          <h2 style={sectionHeading}>
            Where I've<br />
            <em style={{ fontStyle: "normal", color: "var(--muted)" }}>built things</em>
          </h2>
        </div>

        <div style={{ position: "relative", marginTop: 60 }}>
          {/* vertical line */}
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: 1, background: "var(--stroke)",
          }} />

          {JOBS.map((job, i) => (
            <TimelineItem key={job.company} job={job} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ job, delay }) {
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
    <div ref={ref} className="reveal" style={{ paddingLeft: 48, paddingBottom: 64, position: "relative" }}>
      {/* dot */}
      <div style={{
        position: "absolute", left: -5, top: 8,
        width: 10, height: 10, borderRadius: "50%",
        background: "var(--accent)",
        boxShadow: "0 0 0 4px var(--bg), 0 0 14px rgba(78,155,255,0.5)",
      }} />

      <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>
        {job.period}
      </div>
      <div style={{
        fontFamily: "'Fraunces', serif", fontStyle: "italic",
        fontSize: 26, fontWeight: 300, color: "var(--text)", marginBottom: 4,
      }}>
        {job.role}
      </div>
      <div style={{
        fontSize: 13, fontWeight: 700, color: "var(--accent)",
        letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 24,
      }}>
        {job.company} · {job.location}
      </div>

      <ul style={{ listStyle: "none" }}>
        {job.points.map((pt, i) => (
          <li key={i} style={{
            fontSize: 14, color: "var(--muted)",
            padding: "7px 0 7px 20px",
            position: "relative",
            lineHeight: 1.65,
            borderBottom: i < job.points.length - 1 ? "1px solid var(--stroke)" : "none",
          }}>
            <span style={{ position: "absolute", left: 0, color: "var(--accent)", opacity: 0.6 }}>—</span>
            {pt}
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 20 }}>
        {job.stack.map(t => (
          <span key={t} style={{
            fontSize: 11, fontWeight: 700,
            padding: "4px 12px", borderRadius: 100,
            background: "rgba(78,155,255,0.08)",
            border: "1px solid rgba(78,155,255,0.2)",
            color: "var(--accent)", letterSpacing: "0.05em", textTransform: "uppercase",
          }}>{t}</span>
        ))}
      </div>
    </div>
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
