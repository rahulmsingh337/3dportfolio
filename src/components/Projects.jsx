import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers, Zap, BarChart3, Mail, Terminal, Database, X, ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { IS_MOBILE } from "../utils/motion";
import { playHoverSound } from "../utils/hoverSound";
import { playFlipSound } from "../utils/flipSound";

const PROJECTS = [
  { id: "eam", cat: "s4", icon: Layers, title: "SAP EAM Fiori Enhancements — F2173 & F2175",
    blurb: "Two Fiori apps that maintenance planners live in, extended so planning and execution run smoother.",
    desc: "Maintenance planners spend their days in two Fiori apps: Manage Maintenance Orders (F2173) and Schedule Maintenance Orders & Operations (F2175). I enhanced both, so planning and order execution run more smoothly.",
    tags: ["SAP EAM", "F2173", "F2175", "SAP Fiori", "S/4HANA"],
    outcome: "Supported Maintenance Phase 9 cutover and go-live with zero critical defects." },
  { id: "massprint", cat: "s4", icon: BarChart3, title: "Maintenance Order Mass-Printing Solution",
    blurb: "Printing hundreds of maintenance orders, without hundreds of manual steps.",
    desc: "Printing one maintenance order is trivial; printing a whole batch used to be a chore. I designed and built an enterprise-scale mass-printing capability inside Fiori that takes the manual effort out of it for maintenance teams.",
    tags: ["SAP EAM", "Mass Printing", "SAP Fiori", "ABAP", "Clean Core"],
    outcome: "Eliminated manual print effort for maintenance operations teams." },
  { id: "fscm", cat: "s4", icon: Database, title: "FSCM Impact Assessment & S/4HANA Conversion Analysis",
    blurb: "Know what breaks before you convert: the FSCM field-mapping behind an S/4HANA move.",
    desc: "Before you convert, you have to know what will break. I mapped FSCM fields during the S/4HANA migration, assessed the impact on custom objects, and worked with solution architects through design and testing cycles.",
    tags: ["FSCM", "S/4HANA", "Migration Assessment", "Custom Code", "Impact Analysis"],
    outcome: "A comprehensive migration readiness assessment supporting business go-live planning." },
  { id: "lt03", cat: "custom", icon: Terminal, title: "LT03 Custom Transaction",
    blurb: "A blocked process, a €50K+ quote, and a custom transaction that made the quote unnecessary.",
    desc: "A limitation in LT03 was blocking the client, and a third-party fix carried a €50K+ price tag. I led the proof of concept, then built a custom ABAP transaction instead: delivered on time, zero post-go-live defects, and a formal client appreciation letter.",
    tags: ["ABAP", "SAP WM", "Custom TX", "Client Delivery"],
    outcome: "€50K+ third-party tool cost avoided. Client appreciation letter." },
  { id: "bol", cat: "custom", icon: Mail, title: "US Email Automation — BOL & Packing Slip",
    blurb: "Ending the same Bill of Lading email firing again and again: ~200 duplicates a month.",
    desc: "The same Bill of Lading and packing-slip emails kept firing more than once. I led the output-automation fix and added PO/DN consolidation logic, ending ~200 duplicate email triggers a month.",
    tags: ["Email Automation", "SmartForms", "SAP SD", "BOL"],
    outcome: "~200 duplicate emails/month eliminated · 30% output processing time reduction." },
  { id: "copa", cat: "custom", icon: Database, title: "COPA Report Reconciliation",
    blurb: "Four hours of month-end reconciliation, replaced by a report.",
    desc: "Month-end reconciliation used to be a 4-hour manual exercise. I built a report that reads frozen index data from background jobs and calculates FI, CO-PA and statistical values against posting dates.",
    tags: ["FI/CO", "CO-PA", "Background Jobs", "Financial Reporting"],
    outcome: "~4 hours/month saved on manual reconciliation per period." },
  { id: "rap", cat: "oss", icon: Layers, title: "ABAP Cloud RAP Reference",
    blurb: "A hands-on RAP reference on BTP, from business object to Fiori Elements UI.",
    desc: "A hands-on RAP model on the SAP BTP ABAP Environment: business object, OData V4 service and Fiori Elements UI, all in one place. It’s used as onboarding material for 3 developers at Accenture.",
    tags: ["RAP", "OData V4", "SAP BTP", "Fiori Elements", "Clean Core"],
    outcome: "Adopted as onboarding material for 3 Accenture developers.",
    link: "https://github.com/rahulmsingh337/abap-cloud-rap-reference-project" },
  { id: "s4", cat: "oss", icon: Zap, title: "S/4HANA Migration Cookbook",
    blurb: "An open-source cookbook for the ECC-to-S/4HANA journey.",
    desc: "An open-source cookbook for ECC-to-S/4HANA work: HANA remediation patterns, Clean Core practices and AMDP migration templates, drawn from general SAP migration practice.",
    tags: ["S/4HANA", "HANA", "Clean Core", "AMDP", "Migration"],
    outcome: "Open-source reference for ECC-to-S/4HANA migration patterns.",
    link: "https://github.com/rahulmsingh337/s4hana_migration-code-cookbook" },
  { id: "prompify", cat: "oss", icon: Zap, title: "Prompify — AI Prompt Engineering App",
    blurb: "A full-stack AI app that turns rough ideas into well-structured prompts.",
    desc: "Prompify turns rough ideas into well-structured AI prompts. It’s a full-stack app (React, TypeScript, Firebase Auth, Gemini API, Express) and a reminder that SAP and AI skills can live in the same engineer.",
    tags: ["React", "TypeScript", "Gemini API", "Firebase", "AI/ML"],
    outcome: "Live at prompifytech.vercel.app",
    link: "https://prompifytech.vercel.app" },
];

function Modal({ p, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = prev; };
  }, [onClose]);
  const Icon = p.icon;
  return (
    <motion.div className="modal-bg" role="dialog" aria-modal="true" aria-label={p.title}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={onClose}>
      <motion.div className="modal" onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
        <button className="modal-x" onClick={onClose} aria-label="Close"><X size={16} /></button>
        <span className="cap-ic"><Icon size={20} strokeWidth={1.5} /></span>
        <h3>{p.title}</h3>
        <p>{p.desc}</p>
        <div className="proj-tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        <div className="modal-out"><b>Outcome</b><span>{p.outcome}</span></div>
        {p.link && <a className="textlink" href={p.link} target="_blank" rel="noreferrer">View project <ArrowUpRight size={14} /></a>}
      </motion.div>
    </motion.div>
  );
}

const FILTERS = [
  { id: "all", label: "All" },
  { id: "s4", label: "S/4HANA & EAM" },
  { id: "custom", label: "Custom development" },
  { id: "oss", label: "Open source & AI" },
];
const EASE = [0.22, 1, 0.36, 1];

export default function Projects() {
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState("all");
  const shown = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);
  const count = (id) => (id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.cat === id).length);

  return (
    <section id="projects" className="sec wrap">
      <SectionHeader n="03" eyebrow="Selected work" srLabel="SAP Projects" title="Work that" em="shipped"
        lede="Built inside live S/4HANA programmes, plus a few things I made on my own time because they needed to exist." />

      <div className="filters" role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button key={f.id} role="tab" aria-selected={filter === f.id} className={`chip${filter === f.id ? " on" : ""}`}
            onMouseEnter={playHoverSound} onClick={() => { setFilter(f.id); playFlipSound(); }}>
            {f.label} <small>{count(f.id)}</small>
          </button>
        ))}
      </div>

      <motion.div layout={!IS_MOBILE} className="grid-3" transition={{ layout: { duration: 0.5, ease: EASE } }}>
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p, i) => {
            const Icon = p.icon;
            const body = (
              <>
                <div className="proj-top">
                  <span className="proj-n">{String(i + 1).padStart(2, "0")}</span>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <div className="proj-tags">{p.tags.slice(0, 3).map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                <div className="proj-out"><div><b>Outcome</b>{p.outcome}</div></div>
              </>
            );
            return IS_MOBILE ? (
              <button key={p.id} className="card proj" onClick={() => setOpen(p)} onMouseEnter={playHoverSound}>{body}</button>
            ) : (
              <motion.button key={p.id} layout className="card proj" onClick={() => setOpen(p)} onMouseEnter={playHoverSound}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease: EASE, layout: { duration: 0.5, ease: EASE } }}>
                {body}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>{open && <Modal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
