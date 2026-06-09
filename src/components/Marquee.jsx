export default function Marquee() {
  const items = [
    "S/4HANA Migration", "HANA Remediation", "CDS Views",
    "RAP Model", "OData V4", "SAP Workflow", "ABAP Cloud",
    "Performance Tuning", "SAP Fiori", "SmartShift",
  ];
  const doubled = [...items, ...items];

  return (
    <div style={{
      overflow: "hidden",
      borderTop: "1px solid var(--stroke)",
      borderBottom: "1px solid var(--stroke)",
      padding: "18px 0",
      background: "var(--surface)",
    }}>
      <div style={{ display: "flex", width: "max-content" }} className="animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontSize: "clamp(28px, 4.5vw, 56px)",
            fontWeight: 300,
            color: "var(--text)",
            opacity: i % 3 === 0 ? 0.06 : 0.04,
            padding: "0 36px",
            whiteSpace: "nowrap",
          }}>
            {item}
            <span style={{ color: "var(--accent)", opacity: 0.5, marginLeft: 36 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
