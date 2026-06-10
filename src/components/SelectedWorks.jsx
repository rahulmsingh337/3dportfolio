import { useRef } from "react";
import { motion } from "motion/react";

const WORKS = [
  {
    id: "rap",
    title: "ABAP Cloud RAP",
    sub: "SAP BTP · OData V4 · Fiori Elements",
    span: 7,
    aspect: "aspect-[16/9]",
    gradient: "linear-gradient(135deg,#0F172A 0%,#1e1b4b 50%,#0F172A 100%)",
    icon: "⚡",
    tag: "Open Source",
    tagColor: "#6366F1",
  },
  {
    id: "s4",
    title: "S/4HANA Migration",
    sub: "HANA Remediation · Code Push-Down",
    span: 5,
    aspect: "aspect-[4/3]",
    gradient: "linear-gradient(135deg,#0F172A 0%,#164e63 50%,#0F172A 100%)",
    icon: "🔷",
    tag: "Enterprise",
    tagColor: "#22D3EE",
  },
  {
    id: "workflow",
    title: "SAP Workflow Automation",
    sub: "Multi-level Approval · Deadline Monitoring",
    span: 5,
    aspect: "aspect-[4/3]",
    gradient: "linear-gradient(135deg,#0F172A 0%,#1a1a2e 50%,#16213e 100%)",
    icon: "🔗",
    tag: "Automation",
    tagColor: "#D8B4FE",
  },
  {
    id: "smartshift",
    title: "SmartShift Tooling",
    sub: "Accenture · ABAP Automation at Scale",
    span: 7,
    aspect: "aspect-[16/9]",
    gradient: "linear-gradient(135deg,#020617 0%,#0c1445 40%,#020617 100%)",
    icon: "🚀",
    tag: "Accenture",
    tagColor: "#3dd68c",
  },
];

function WorkCard({ work }) {
  const hoverRef = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ gridColumn: `span ${work.span}` }}
      className="bento-col-resp"
    >
      <div
        className="group"
        style={{
          position: "relative", borderRadius: 28, overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
          cursor: "none",
        }}
      >
        {/* bg gradient canvas */}
        <div style={{
          background: work.gradient,
          width: "100%", paddingTop: work.span === 7 ? "56.25%" : "75%",
          position: "relative", overflow: "hidden",
        }}>
          {/* animated grid lines */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}/>
          {/* halftone dots */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.15,
            backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.6) 1px,transparent 1px)",
            backgroundSize: "4px 4px",
          }}/>
          {/* big icon */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: work.span === 7 ? 72 : 56, opacity: 0.12,
            transition: "opacity 0.4s, transform 0.4s",
          }} className="card-icon">
            {work.icon}
          </div>
          {/* hover overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(2,6,23,0.75)",
            backdropFilter: "blur(8px)",
            opacity: 0, transition: "opacity 0.4s",
            display: "flex", alignItems: "center", justifyContent: "center",
          }} className="card-hover-overlay">
            {/* view pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "#fff", borderRadius: 100,
              padding: "12px 24px",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", inset: -2,
                background: "linear-gradient(90deg,#89AACC,#6366F1,#22D3EE,#89AACC)",
                backgroundSize: "200% 100%",
                borderRadius: 100, zIndex: -1,
                animation: "gradient-shift 3s ease infinite",
              }}/>
              <span style={{
                fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 700,
                color: "#020617",
              }}>View —</span>
              <span style={{
                fontFamily: "'Fraunces',serif", fontStyle: "italic",
                fontSize: 14, color: "#020617",
              }}>{work.title}</span>
            </div>
          </div>
        </div>

        {/* card footer */}
        <div style={{
          background: "rgba(15,23,42,0.95)",
          padding: "20px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div>
            <div style={{
              fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 700,
              color: "#fff", marginBottom: 4,
            }}>{work.title}</div>
            <div style={{
              fontFamily: "'Inter',sans-serif", fontSize: 12,
              color: "rgba(255,255,255,0.35)",
            }}>{work.sub}</div>
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
            fontWeight: 700, padding: "5px 12px", borderRadius: 100,
            background: `${work.tagColor}18`,
            border: `1px solid ${work.tagColor}40`,
            color: work.tagColor, letterSpacing: "0.08em", textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}>{work.tag}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SelectedWorks() {
  return (
    <section id="selected-works" style={{
      padding: "100px 0",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", flexWrap: "wrap",
            gap: 24, marginBottom: 56,
          }}
        >
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              marginBottom: 20,
            }}>
              <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.15)" }}/>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
                letterSpacing: "0.35em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}>Selected Work</span>
            </div>
            <h2 style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "clamp(36px,5vw,64px)", fontWeight: 700,
              color: "#fff", letterSpacing: "-2px", lineHeight: 1.05,
            }}>
              Featured{" "}
              <em style={{
                fontFamily: "'Fraunces',serif", fontStyle: "italic",
                fontWeight: 300,
              }}>projects</em>
            </h2>
            <p style={{
              fontFamily: "'Inter',sans-serif", fontSize: 15,
              color: "rgba(255,255,255,0.35)", maxWidth: 480,
              lineHeight: 1.7, marginTop: 14,
            }}>
              A selection of SAP initiatives I've led or built — from open-source references to enterprise automation.
            </p>
          </div>

          <a href="#projects" data-hover style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700,
            padding: "12px 24px", borderRadius: 100,
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.6)",
            textDecoration: "none", cursor: "none",
            transition: "all 0.3s",
            position: "relative", overflow: "hidden",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "#6366F1";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
          }}>
            View all work →
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 20,
        }} className="bento-grid">
          {WORKS.map(w => <WorkCard key={w.id} work={w} />)}
        </div>
      </div>

      <style>{`
        .group:hover .card-hover-overlay { opacity: 1 !important; }
        .group:hover .card-icon { opacity: 0.25 !important; transform: scale(1.1); }
        @media(max-width:768px){
          .bento-grid { grid-template-columns: 1fr !important; }
          .bento-col-resp { grid-column: span 1 !important; }
        }
        @keyframes gradient-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
