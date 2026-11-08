import { SITE } from "./site";

export type SceneId = "eam" | "massprint" | "lt03" | "rap" | "prompify";
export type Scene = {
  id: SceneId; n: string; title: string; name: string; kicker: string; desc: string; outcome: string; tags: string[];
  cta: { label: string; href: string; external: boolean };
};

const talk = (subject: string) => `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;

export const SCENES: Scene[] = [
  { id: "eam", n: "01", title: "Maintenance, in motion", name: "SAP EAM Fiori Enhancements — F2173 & F2175", kicker: "SAP EAM · S/4HANA · Accenture",
    desc: "Maintenance planners spend their days in two Fiori apps: Manage Maintenance Orders (F2173) and Schedule Maintenance Orders & Operations (F2175). I enhanced both, so planning and order execution run more smoothly.",
    outcome: "Supported Maintenance Phase 9 cutover and go-live with zero critical defects.",
    tags: ["SAP EAM", "F2173", "F2175", "SAP Fiori", "S/4HANA"], cta: { label: "Discuss similar work", href: talk("EAM Fiori enhancements"), external: false } },
  { id: "massprint", n: "02", title: "Print the batch, not the burden", name: "Maintenance Order Mass-Printing Solution", kicker: "SAP EAM · Fiori · Accenture",
    desc: "Printing one maintenance order is trivial; printing a whole batch used to be a chore. I designed and built an enterprise-scale mass-printing capability inside Fiori that takes the manual effort out of it for maintenance teams.",
    outcome: "Eliminated manual print effort for maintenance operations teams.",
    tags: ["SAP EAM", "Mass Printing", "SAP Fiori", "ABAP", "Clean Core"], cta: { label: "Discuss similar work", href: talk("Mass-printing solution"), external: false } },
  { id: "lt03", n: "03", title: "A €50K problem, solved in-house", name: "LT03 Custom Transaction", kicker: "SAP WM · ABAP · Infosys",
    desc: "A limitation in LT03 was blocking the client, and a third-party fix carried a €50K+ price tag. I led the proof of concept, then built a custom ABAP transaction instead: delivered on time, zero post-go-live defects, and a formal client appreciation letter.",
    outcome: "€50K+ third-party tool cost avoided. Client appreciation letter.",
    tags: ["ABAP", "SAP WM", "Custom TX", "Client Delivery"], cta: { label: "Discuss similar work", href: talk("Custom ABAP transaction"), external: false } },
  { id: "rap", n: "04", title: "A reference for the next developer", name: "ABAP Cloud RAP Reference", kicker: "Open source · RAP · SAP BTP",
    desc: "A hands-on RAP model on the SAP BTP ABAP Environment: business object, OData V4 service and Fiori Elements UI, all in one place. It’s used as onboarding material for 3 developers at Accenture.",
    outcome: "Adopted as onboarding material for 3 Accenture developers.",
    tags: ["RAP", "OData V4", "SAP BTP", "Fiori Elements", "Clean Core"], cta: { label: "View on GitHub", href: `${SITE.github}/abap-cloud-rap-reference-project`, external: true } },
  { id: "prompify", n: "05", title: "When SAP meets AI", name: "Prompify — AI Prompt Engineering App", kicker: "Full-stack · Gemini API · Live",
    desc: "Prompify turns rough ideas into well-structured AI prompts. It’s a full-stack app (React, TypeScript, Firebase Auth, Gemini API, Express) and a reminder that SAP and AI skills can live in the same engineer.",
    outcome: "Live at prompifytech.vercel.app",
    tags: ["React", "TypeScript", "Gemini API", "Firebase", "AI/ML"], cta: { label: "Open Prompify", href: SITE.prompify, external: true } },
];

export type IndexItem = { id: string; title: string; blurb: string; outcome: string; tag: string; href?: string };

export const INDEX_ITEMS: IndexItem[] = [
  { id: "fscm", tag: "S/4HANA", title: "FSCM Impact Assessment", blurb: "Know what breaks before you convert: the FSCM field-mapping behind an S/4HANA move.", outcome: "A migration readiness assessment supporting go-live planning." },
  { id: "bol", tag: "SAP SD", title: "BOL & Packing Slip Email Automation", blurb: "Ending the same Bill of Lading email firing again and again.", outcome: "~200 duplicate emails/month eliminated · 30% faster output processing." },
  { id: "copa", tag: "FI/CO", title: "COPA Report Reconciliation", blurb: "Four hours of month-end reconciliation, replaced by a report.", outcome: "~4 hours/month saved on manual reconciliation." },
  { id: "s4", tag: "Open source", title: "S/4HANA Migration Cookbook", blurb: "An open-source cookbook for the ECC-to-S/4HANA journey.", outcome: "HANA remediation patterns, Clean Core practices and AMDP templates.", href: `${SITE.github}/s4hana_migration-code-cookbook` },
];
