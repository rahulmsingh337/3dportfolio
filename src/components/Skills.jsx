import { motion } from "motion/react";
import { Terminal, Layers, Database, Layout, Shield, Bot } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { IS_MOBILE } from "../utils/motion";

const CAPS = [
  { icon: Terminal, title: "S/4HANA Transformation & EAM",
    desc: "SAP S/4HANA transformation, custom code remediation, HANA optimization, SAP EAM — F2173/F2175 Fiori apps, Maintenance Cutover & Hypercare.",
    proof: "60+ ABAP objects remediated. F2173 & F2175 EAM Fiori enhancements. Maintenance Phase 9 cutover & hypercare. Zero critical post-go-live defects." },
  { icon: Layers, title: "ABAP Cloud & Clean Core",
    desc: "ABAP Cloud development, Clean Core extensibility, CDS Views, RAP (RESTful ABAP Programming), OData V2/V4, SAP BTP ABAP Environment, Released APIs.",
    proof: "SAP Certified Back-End Developer – ABAP Cloud (C_ABAPD_2601). ~30% custom footprint reduction via Clean Core extensibility." },
  { icon: Bot, title: "SAP AI & Emerging Tech",
    desc: "Integrating AI capabilities into SAP workflows. Built Prompify, a Gemini API-powered prompt optimisation app.",
    proof: "SAP Certified Generative AI Developer. Full-stack AI app live at prompifytech.vercel.app (Firebase Auth, Gemini API, Express)." },
  { icon: Database, title: "Integration & Interfaces",
    desc: "ALE/IDoc, RFC, BAPIs, Proxies, external API integration, BRF+, SAP Integration Suite, SAP Workflow automation.",
    proof: "End-to-end ALE/IDoc integration across 3 client landscapes. ~40% workflow processing time reduction." },
  { icon: Shield, title: "Performance & Quality",
    desc: "SQL Trace, ABAP Runtime Analysis, ATC, ABAP Memory Analysis, SmartShift, system dump analysis.",
    proof: "~35% migration effort reduction with SmartShift tooling. Code reviews across an 11-person team." },
  { icon: Layout, title: "Forms, Output & Modules",
    desc: "SmartForms, Adobe Forms, SAPscript, Output Management across SAP FICO, MM, SD, CO-PA.",
    proof: "~200 duplicate email triggers per month eliminated. 30% output processing time reduction." },
];

export default function Skills() {
  return (
    <section id="skills" className="sec wrap">
      <SectionHeader n="01" eyebrow="Capabilities" srLabel="SAP ABAP Skills" title="Core" em="competencies"
        lede="Six disciplines, each backed by delivered outcomes on live enterprise programmes." />
      <div className="grid-3">
        {CAPS.map((c, i) => {
          const Icon = c.icon;
          const body = (
            <>
              <div className="cap-top">
                <span className="cap-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="cap-ic"><Icon size={20} strokeWidth={1.5} /></span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="cap-proof"><div><b>Evidence</b>{c.proof}</div></div>
            </>
          );
          return IS_MOBILE ? (
            <article key={c.title} className="card cap">{body}</article>
          ) : (
            <motion.article key={c.title} className="card cap"
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}>
              {body}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
