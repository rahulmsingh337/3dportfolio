import { motion } from "motion/react";

const ENTRIES = [
  {
    id: 1,
    title: "ECC to S/4HANA: What nobody tells you about HANA remediation",
    category: "Migration",
    categoryColor: "#22D3EE",
    readTime: "8 min read",
    date: "Mar 2026",
    icon: "⚡",
    href: "https://github.com/rahulmsingh337/s4hana_migration-code-cookbook",
  },
  {
    id: 2,
    title: "Building your first RAP model on SAP BTP ABAP Environment",
    category: "ABAP Cloud",
    categoryColor: "#6366F1",
    readTime: "12 min read",
    date: "Feb 2026",
    icon: "🔷",
    href: "https://github.com/rahulmsingh337/abap-cloud-rap-reference-project",
  },
  {
    id: 3,
    title: "OData V4 vs V2: When to upgrade and how to migrate gracefully",
    category: "OData",
    categoryColor: "#D8B4FE",
    readTime: "6 min read",
    date: "Jan 2026",
    icon: "🔗",
    href: "https://www.linkedin.com/in/rahul-singh-sap-abap/",
  },
  {
    id: 4,
    title: "SAP Workflow in 2026: still relevant or replaced by BTP workflows?",
    category: "Workflow",
    categoryColor: "#3dd68c",
    readTime: "5 min read",
    date: "Dec 2025",
    icon: "📊",
    href: "https://www.linkedin.com/in/rahul-singh-sap-abap/",
  },
];

export default function Journal() {
  return (
    <section id="journal" style={{
      padding: "100px 0",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>

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
              display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20,
            }}>
              <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.15)" }}/>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
                letterSpacing: "0.35em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}>Recent Thoughts</span>
            </div>
            <h2 style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "clamp(36px,5vw,64px)", fontWeight: 700,
              color: "#fff", letterSpacing: "-2px", lineHeight: 1.05,
            }}>
              SAP{" "}
              <em style={{
                fontFamily: "'Fraunces',serif", fontStyle: "italic", fontWeight: 300,
              }}>insights</em>
            </h2>
            <p style={{
              fontFamily: "'Inter',sans-serif", fontSize: 15,
              color: "rgba(255,255,255,0.35)", maxWidth: 480,
              lineHeight: 1.7, marginTop: 14,
            }}>
              Technical deep-dives, migration patterns, and learnings from 5+ years in the SAP trenches.
            </p>
          </div>

          <a href="https://www.linkedin.com/in/rahul-singh-sap-abap/" target="_blank"
            rel="noreferrer" data-hover style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700,
              padding: "12px 24px", borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none", cursor: "none", transition: "all 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#6366F1";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}>
            View all on LinkedIn →
          </a>
        </motion.div>

        {/* Entry Pills */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ENTRIES.map((entry, i) => (
            <motion.a
              key={entry.id}
              href={entry.href}
              target="_blank"
              rel="noreferrer"
              data-hover
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: "easeOut" }}
              whileHover={{ x: 6 }}
              style={{
                display: "flex", alignItems: "center",
                gap: 24, padding: "20px 28px",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                textDecoration: "none", cursor: "none",
                transition: "background 0.3s, border-color 0.3s",
                flexWrap: "wrap",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              {/* icon */}
              <div style={{
                width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                background: "rgba(15,23,42,0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }}>
                {entry.icon}
              </div>

              {/* title */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 600,
                  color: "#fff", lineHeight: 1.3,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {entry.title}
                </div>
              </div>

              {/* meta right */}
              <div style={{
                display: "flex", alignItems: "center", gap: 16, flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
                  fontWeight: 700, padding: "4px 12px", borderRadius: 100,
                  background: `${entry.categoryColor}15`,
                  border: `1px solid ${entry.categoryColor}35`,
                  color: entry.categoryColor,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}>
                  {entry.category}
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
                  color: "rgba(255,255,255,0.25)", whiteSpace: "nowrap",
                }}>
                  {entry.readTime}
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
                  color: "rgba(255,255,255,0.2)", whiteSpace: "nowrap",
                }}>
                  {entry.date}
                </span>
                <span style={{
                  fontSize: 16, color: "rgba(255,255,255,0.2)",
                  transition: "color 0.2s",
                }}>↗</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
