import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers, Zap, BarChart3, Mail, Terminal, Database, X, ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { IS_MOBILE } from "../utils/motion";
import { playHoverSound } from "../utils/hoverSound";

const PROJECTS = [
  { id: "eam", icon: Layers, title: "SAP EAM Fiori Enhancements — F2173 & F2175",
    desc: "Delivered enhancements for SAP EAM Fiori apps F2173 (Manage Maintenance Orders) and F2175 (Schedule Maintenance Orders & Operations). Improved maintenance planning and order execution processes.",
    tags: ["SAP EAM", "F2173", "F2175", "SAP Fiori", "S/4HANA"],
    outcome: "Supported Maintenance Phase 9 cutover and go-live with zero critical defects." },
  { id: "massprint", icon: BarChart3, title: "Maintenance Order Mass-Printing Solution",
    desc: "Designed and implemented enterprise-scale mass-printing capability for maintenance orders integrated with SAP Fiori applications. Streamlined operational execution and reduced manual effort for maintenance teams.",
    tags: ["SAP EAM", "Mass Printing", "SAP Fiori", "ABAP", "Clean Core"],
    outcome: "Eliminated manual print effort for maintenance operations teams." },
  { id: "fscm", icon: Database, title: "FSCM Impact Assessment & S/4HANA Conversion Analysis",
    desc: "Performed FSCM field-mapping analysis during SAP S/4HANA migration. Identified custom object impacts and remediation requirements. Collaborated with solution architects during design and testing cycles.",
    tags: ["FSCM", "S/4HANA", "Migration Assessment", "Custom Code", "Impact Analysis"],
    outcome: "Comprehensive migration readiness assessment supporting business go-live planning." },
  { id: "lt03", icon: Terminal, title: "LT03 Custom Transaction",
    desc: "Led end-to-end POC for a client-blocking LT03 limitation. Built a custom ABAP transaction that avoided a €50K+ third-party tool purchase. Zero post-go-live defects. Received formal client appreciation letter.",
    tags: ["ABAP", "SAP WM", "Custom TX", "Client Delivery"],
    outcome: "€50K+ third-party tool cost avoided. Client appreciation letter." },
  { id: "bol", icon: Mail, title: "US Email Automation — BOL & Packing Slip",
    desc: "Led enhancement of email output automation for Bill of Lading and packing slips. Implemented PO/DN consolidation logic eliminating ~200 duplicate email triggers per month.",
    tags: ["Email Automation", "SmartForms", "SAP SD", "BOL"],
    outcome: "~200 duplicate emails/month eliminated · 30% output processing time reduction." },
  { id: "copa", icon: Database, title: "COPA Report Reconciliation",
    desc: "Reconciliation report fetching frozen index data from background jobs, calculating FI, CO-PA, and Statistical values against posting dates. Replaced a 4-hour manual monthly process.",
    tags: ["FI/CO", "CO-PA", "Background Jobs", "Financial Reporting"],
    outcome: "~4 hours/month saved on manual reconciliation per period." },
  { id: "rap", icon: Layers, title: "ABAP Cloud RAP Reference",
    desc: "Reference RAP model on SAP BTP ABAP Environment — BO definition, OData V4 service, Fiori Elements UI. Adopted as internal onboarding material for 3 developers at Accenture.",
    tags: ["RAP", "OData V4", "SAP BTP", "Fiori Elements", "Clean Core"],
    outcome: "Adopted as onboarding material for 3 Accenture developers.",
    link: "https://github.com/rahulmsingh337/abap-cloud-rap-reference-project" },
  { id: "s4", icon: Zap, title: "S/4HANA Migration Cookbook",
    desc: "Open-source SAP migration reference covering HANA remediation patterns, Clean Core best practices, and AMDP migration templates. Patterns drawn from general SAP migration practice.",
    tags: ["S/4HANA", "HANA", "Clean Core", "AMDP", "Migration"],
    outcome: "Open-source reference for ECC-to-S/4HANA migration patterns.",
    link: "https://github.com/rahulmsingh337/s4hana_migration-code-cookbook" },
  { id: "prompify", icon: Zap, title: "Prompify — AI Prompt Engineering App",
    desc: "Full-stack AI prompt optimisation app (React/TypeScript, Firebase Auth, Gemini API, Express backend). Demonstrates SAP + AI convergence and full-stack capability beyond the SAP stack.",
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

export default function Projects() {
  const [open, setOpen] = useState(null);
  return (
    <section id="projects" className="sec wrap">
      <SectionHeader n="03" eyebrow="Selected work" srLabel="SAP Projects" title="Impact &" em="innovation"
        lede="Delivery from live S/4HANA programmes, plus open-source references and tools built in my own time." />
      <div className="grid-3">
        {PROJECTS.map((p, i) => {
          const Icon = p.icon;
          const body = (
            <>
              <div className="proj-top">
                <span className="proj-n">{String(i + 1).padStart(2, "0")}</span>
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <h3>{p.title}</h3>
              <p style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.desc}</p>
              <div className="proj-tags">{p.tags.slice(0, 3).map((t) => <span className="tag" key={t}>{t}</span>)}</div>
              <div className="proj-out"><div><b>Outcome</b>{p.outcome}</div></div>
            </>
          );
          return IS_MOBILE ? (
            <button key={p.id} className="card proj" onClick={() => setOpen(p)} onMouseEnter={playHoverSound}>{body}</button>
          ) : (
            <motion.button key={p.id} className="card proj" onClick={() => setOpen(p)} onMouseEnter={playHoverSound}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}>
              {body}
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence>{open && <Modal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
