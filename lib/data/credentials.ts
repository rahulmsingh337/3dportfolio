export type Credential = { title: string; issuer: string; image: string; href?: string };
const credly = (id: string) => `https://www.credly.com/badges/${id}`;

export const CERTS: Credential[] = [
  { title: "SAP Certified Back-End Developer – ABAP Cloud (C_ABAPD_2601)", issuer: "SAP SE · Apr 2026", image: "/cert-abap-cloud.webp" },
  { title: "SAP Certified – SAP Generative AI Developer", issuer: "SAP SE · Sep 2026", image: "/cert-genai.webp", href: credly("cab1bb32-9291-400d-82d3-e8fd8327b0c0") },
  { title: "SAP Certified – SAP S/4HANA Conversion and SAP System Upgrade", issuer: "SAP SE · Sep 2026", image: "/cert-s4hana-upgrade.webp", href: credly("1b8a388a-5611-4175-9e26-c9916ed5b442") },
  { title: "SAP Certified – Positioning SAP Business AI Platform", issuer: "SAP SE · Sep 2026", image: "/cert-btp-ai.webp", href: credly("d1912d28-7b2a-437f-b88f-b9a67b841a61") },
  { title: "SAP Certified – Positioning the Autonomous Enterprise", issuer: "SAP SE · Oct 2026", image: "/cert-autonomous.webp", href: credly("13bb62a4-9d1a-478f-8b73-830b1a6c942d") },
  { title: "SAP S/4HANA Functional Professional", issuer: "Infosys", image: "/cert-sap-func.webp" },
  { title: "SAP S/4HANA Technical Professional", issuer: "Infosys", image: "/cert-sap-tech.webp" },
];
export const RECOGNITION: Credential[] = [
  { title: "COE ACE", issuer: "Individual · H1-FY26", image: "/cert-coe-ace.webp" },
  { title: "Eureka", issuer: "Individual · H1-FY26", image: "/cert-eureka.webp" },
  { title: "Rookie of the Quarter", issuer: "RISE Awards · H1-FY26", image: "/cert-rookie.webp" },
  { title: "Rookie of the Quarter", issuer: "RISE Awards · FY25 Q2", image: "/ach-unit-rise.webp" },
  { title: "Client Appreciation Letter", issuer: "Global Logistics Client · Jan 2024", image: "/award-1.webp" },
];
export const INSTA_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `/award-${n}.webp`);
export const thumb = (src: string) => src.replace(/\.webp$/, "-t.webp");
