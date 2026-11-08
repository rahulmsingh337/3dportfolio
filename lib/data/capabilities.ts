export type CapabilityIcon = "terminal" | "layers" | "bot" | "database" | "shield" | "layout";
export type Capability = { id: string; title: string; desc: string; proof: string; tags: string[]; icon: CapabilityIcon };

export const CAPABILITIES: Capability[] = [
  { id: "transformation", icon: "terminal", title: "S/4HANA Transformation & EAM",
    desc: "Moving from ECC means finding every custom object that won’t survive the trip. I remediate code for HANA, clear the ATC findings, and carry SAP EAM Fiori apps (F2173, F2175) through cutover and hypercare.",
    proof: "60+ ABAP objects remediated. F2173 & F2175 EAM Fiori enhancements. Maintenance Phase 9 cutover & hypercare. Zero critical post-go-live defects.",
    tags: ["S/4HANA", "SAP EAM", "F2173 / F2175", "Maintenance Management"] },
  { id: "cleancore", icon: "layers", title: "ABAP Cloud & Clean Core",
    desc: "Extend SAP without touching its core. ABAP Cloud, RAP, CDS views and OData V4 on the SAP BTP ABAP Environment, built on released APIs so upgrades stay boring.",
    proof: "SAP Certified Back-End Developer – ABAP Cloud (C_ABAPD_2601). ~30% custom footprint reduction via Clean Core extensibility.",
    tags: ["ABAP Cloud", "Clean Core", "CDS Views", "RAP"] },
  { id: "ai", icon: "bot", title: "SAP AI & Emerging Tech",
    desc: "Where SAP meets generative AI. I’m certified as an SAP Generative AI Developer, and I build with Gemini, Firebase and React. Prompify is the proof of concept.",
    proof: "SAP Certified Generative AI Developer. Full-stack AI app live at prompifytech.vercel.app (Firebase Auth, Gemini API, Express).",
    tags: ["Gemini API", "Firebase", "AI/ML in SAP", "React"] },
  { id: "integration", icon: "database", title: "Integration & Interfaces",
    desc: "Systems that talk without shouting. ALE/IDoc, RFC, BAPIs, Proxies, BRF+ and SAP Workflow, stitched into flows that keep working after the project team leaves.",
    proof: "End-to-end ALE/IDoc integration across 3 client landscapes. ~40% workflow processing time reduction.",
    tags: ["ALE/IDoc", "RFC", "BAPIs", "SAP Workflow"] },
  { id: "performance", icon: "shield", title: "Performance & Quality",
    desc: "Fast code, fewer surprises. SQL Trace, ABAP Runtime Analysis, ATC and memory analysis find the slow spots; SmartShift and ABAP Unit keep migrations honest.",
    proof: "~35% migration effort reduction with SmartShift tooling. Code reviews across an 11-person team.",
    tags: ["SQL Trace", "ATC", "SmartShift", "ABAP Unit"] },
  { id: "forms", icon: "layout", title: "Forms, Output & Modules",
    desc: "The documents customers actually see. SmartForms, Adobe Forms and SAPscript output across FICO, MM, SD and CO-PA, built to be right the first time.",
    proof: "~200 duplicate email triggers per month eliminated. 30% output processing time reduction.",
    tags: ["SmartForms", "Adobe Forms", "SAPscript", "CO-PA"] },
];
