export type Milestone = { year: string; title: string; org: "VIT" | "Infosys" | "Accenture" | "SAP"; text: string; facts?: string[] };

export const MILESTONES: Milestone[] = [
  { year: "2016", org: "VIT", title: "Engineering first", text: "B.Tech in Mechanical Engineering at Vellore Institute of Technology, where systems thinking started.", facts: ["2016 – 2020"] },
  { year: "2021", org: "Infosys", title: "Into SAP", text: "Moved into SAP through Infosys structured training and joined the EAS SAP Unit as an ABAP Consultant.", facts: ["May 2021"] },
  { year: "2022", org: "Infosys", title: "AMS Track Lead", text: "Rose from ABAP Developer to AMS Track Lead within 18 months, leading delivery across 3 concurrent projects.", facts: ["Aug 2022"] },
  { year: "2023", org: "Infosys", title: "Workflow & LT03", text: "Designed a multi-level approval workflow that cut manual processing ~40%, and built the LT03 transaction that avoided a €50K+ third-party tool.", facts: ["~40% less manual time", "€50K+ avoided"] },
  { year: "2024", org: "Infosys", title: "Automation, quietly at scale", text: "Ended ~200 duplicate Bill of Lading emails a month, and turned a 4-hour monthly traceability exercise into a 2-minute report.", facts: ["~200 emails/month", "4 h → 2 min"] },
  { year: "2025", org: "Accenture", title: "Leading the transformation", text: "Joined Accenture as SAP ABAP Lead for an S/4HANA transformation: 60+ custom objects remediated, ATC findings cleared, an 11-person team mentored.", facts: ["Dec 2025", "60+ objects"] },
  { year: "2026", org: "SAP", title: "Certified, and shipping", text: "ABAP Cloud (C_ABAPD_2601), Generative AI, S/4HANA Conversion & Upgrade, Business AI Platform and Autonomous Enterprise certifications, alongside EAM Fiori enhancements and the Maintenance Phase 9 cutover.", facts: ["5 SAP certifications"] },
];
