import { useState } from "react";
import { motion } from "motion/react";
import { Terminal, Layers, Database, Layout, Shield, Bot } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { IS_MOBILE } from "../utils/motion";
import { playFlipSound } from "../utils/flipSound";
import { playHoverSound } from "../utils/hoverSound";

const TAGS = [["S/4HANA", "SAP EAM", "F2173 / F2175", "Maintenance Management", "Asset Management", "Custom Code Remediation"], ["ABAP Cloud", "Clean Core", "CDS Views", "RAP", "OData V4", "SAP BTP"], ["Gemini API", "Firebase", "AI/ML in SAP", "React", "TypeScript"], ["ALE/IDoc", "RFC", "BAPIs", "Proxies", "BRF+", "SAP Workflow"], ["SQL Trace", "ATC", "Eclipse ADT", "SmartShift", "TDD", "ABAP Unit Testing"], ["SmartForms", "Adobe Forms", "SAPscript", "ALV/SALV", "CO-PA", "Solution Manager"]];

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

function FlipCard({ c, i }) {
  const [on, setOn] = useState(false);
  const Icon = c.icon;
  const flip = () => { setOn((v) => !v); playFlipSound(); };

  const tilt = (e) => {
    if (IS_MOBILE) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--rx", (((e.clientY - r.top - r.height / 2) / r.height) * -8).toFixed(2) + "deg");
    e.currentTarget.style.setProperty("--ry", (((e.clientX - r.left - r.width / 2) / r.width) * 8).toFixed(2) + "deg");
  };
  const untilt = (e) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); };

  const card = (
    <div
      className={`flipc${on ? " on" : ""}`}
      role="button" tabIndex={0} aria-pressed={on}
      onClick={flip}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } }}
      onMouseEnter={playHoverSound}
      onMouseMove={tilt} onMouseLeave={untilt}
    >
      <div className="flipc-in">
        <div className="face cap" aria-hidden={on}>
          <div className="cap-top">
            <span className="cap-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="cap-ic"><Icon size={20} strokeWidth={1.5} /></span>
          </div>
          <h3>{c.title}</h3>
          <p>{c.desc}</p>
          <div className="flip-hint">Tap to flip ↻</div>
        </div>
        <div className="face back" aria-hidden={!on}>
          <div className="back-label">Impact</div>
          <p className="back-proof">{c.proof}</p>
          <div className="proj-tags">{TAGS[i].slice(0, 4).map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        </div>
      </div>
    </div>
  );

  return IS_MOBILE ? card : (
    <motion.div
      initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}>
      {card}
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="sec wrap">
      <SectionHeader n="01" eyebrow="Capabilities" srLabel="SAP ABAP Skills" title="Core" em="competencies"
        lede="Six disciplines. Tap any card to reveal the delivered impact." />
      <div className="grid-3">
        {CAPS.map((c, i) => <FlipCard key={c.title} c={c} i={i} />)}
      </div>
    </section>
  );
}
