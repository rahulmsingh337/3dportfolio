import { motion } from "motion/react";
import SectionHeader from "./SectionHeader";
import { IS_MOBILE } from "../utils/motion";

const JOBS = [
  { company: "Accenture", role: "SAP ABAP Lead | S/4HANA Transformation",
    period: "Dec 2025 – Present", location: "Noida, UP", current: true,
    points: [
      "Lead SAP S/4HANA transformation workstreams — HANA remediation of 60+ custom ABAP objects, eliminating ATC critical findings for Clean Core compliance.",
      "Deliver enhancements for SAP EAM Fiori apps F2173 (Manage Maintenance Orders) and F2175 (Schedule Maintenance Orders & Operations); support maintenance planning and scheduling processes.",
      "Design and implement an enterprise-scale maintenance order mass-printing solution integrated with SAP Fiori; support Maintenance Phase 9 cutover, data validation, reconciliation, and hypercare.",
      "Develop CDS Views, OData V4 services, and RAP-based Fiori apps on SAP BTP, reducing custom footprint ~30% via Released API adoption and Clean Core extensibility.",
      "Mentor developers on RAP, CDS Views, OData V4, Clean Core principles, and ABAP Cloud development; lead technical reviews across an 11-person team.",
      "Contribute to ABAP Cloud adoption, FSCM field-mapping analysis, custom object impact assessment, and migration planning for S/4HANA conversion.",
      "Support go-live, hypercare, and cutover activities; deliver production support with zero critical post-go-live defects across major transformation initiatives.",
    ],
    tech: ["S/4HANA Transformation", "SAP EAM", "ABAP Cloud", "Clean Core", "RAP", "CDS Views", "OData V4", "SAP Fiori", "SAP BTP", "AMDP", "SmartShift", "ATC", "TDD"] },
  { company: "Infosys", role: "SAP ABAP Consultant | Infosys Certified Fiori Consultant",
    period: "May 2021 – Dec 2025", location: "Noida, UP", current: false,
    points: [
      "Progressed from ABAP Developer to AMS Track Lead within 18 months — led technical delivery for 3 concurrent application management projects for global manufacturing and logistics clients.",
      "Developed 20+ reports (Classical, Interactive, ALV/SALV) and interface programs (Proxies, RFC, IDocs, Web Dynpro) across SAP FICO, MM, and SD.",
      "Architected SAP Workflow for multi-level approval automation — reduced manual processing time by ~40% across a 500+ user business unit.",
      "Applied ABAP 7.5 modernisation techniques across a legacy codebase — cutting average program runtime by 25–35%.",
      "LT03 custom transaction avoided a €50K+ third-party tool cost; received a formal client appreciation letter.",
      "16 consecutive INSTA Rewards · 5× Unit Rise Awards · Best Performer · ACE COE Performer Award.",
    ],
    tech: ["SAP Fiori", "Web Dynpro", "ALE/IDocs", "Adobe Forms", "ABAP 7.5", "BAPIs", "SAP Workflow", "BRF+", "CO-PA", "OOABAP"] },
];

// Bold the numbers that carry the story (60+, ~30%, 25–35%, €50K+, 500+ …)
const NUM = /(~?\d+(?:–\d+)?[%+×]|€\d+K\+|\bzero critical post-go-live defects)/g;
const emph = (t) => t.split(NUM).map((s, i) => (i % 2 ? <b key={i}>{s}</b> : s));

export default function Experience() {
  return (
    <section id="experience" className="sec wrap">
      <SectionHeader n="02" eyebrow="Professional path" srLabel="SAP Professional Experience" title="The" em="journey" />
      <div>
        {JOBS.map((j) => {
          const body = (
            <>
              <div className="job-meta">
                <h3 className="job-co">{j.company}</h3>
                <p className="job-role">{j.role}</p>
                <div className="job-when"><span>{j.period}</span><span>{j.location}</span></div>
                {j.current && <span className="job-now"><i />Current role</span>}
              </div>
              <div>
                <ul>{j.points.map((p) => <li key={p}>{emph(p)}</li>)}</ul>
                <div className="job-tech">{j.tech.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
              </div>
            </>
          );
          return IS_MOBILE ? (
            <article className="job" key={j.company}>{body}</article>
          ) : (
            <motion.article className="job" key={j.company}
              initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              {body}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
