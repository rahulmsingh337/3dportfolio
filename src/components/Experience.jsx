import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ScrubIn from "./ScrubIn";
import { useScrub } from "../utils/scrub";
import SectionHeader from "./SectionHeader";

const JOBS = [
  { company: "Accenture", role: "SAP ABAP Lead | S/4HANA Transformation",
    period: "Dec 2025 – Present", location: "Noida, UP", current: true,
    points: [
      "Lead the technical side of an S/4HANA transformation: remediated 60+ custom ABAP objects for HANA and cleared the ATC critical findings standing between the client and Clean Core.",
      "Shipped enhancements to SAP EAM Fiori apps F2173 (Manage Maintenance Orders) and F2175 (Schedule Maintenance Orders & Operations), keeping maintenance planning and scheduling moving.",
      "Designed and built an enterprise-scale mass-printing solution for maintenance orders inside Fiori, then stayed through the Maintenance Phase 9 cutover: data validation, reconciliation and hypercare.",
      "Built CDS views, OData V4 services and RAP-based Fiori apps on SAP BTP, trimming the custom footprint ~30% by moving to released APIs and Clean Core extensibility.",
      "Mentor an 11-person team on RAP, CDS, OData V4, Clean Core and ABAP Cloud, and lead the technical reviews that keep quality consistent.",
      "Help shape the conversion plan itself: FSCM field-mapping analysis, custom-object impact assessment and ABAP Cloud adoption.",
      "Stay through go-live. Cutover, hypercare and production support, with zero critical post-go-live defects across major transformation initiatives.",
    ],
    tech: ["S/4HANA Transformation", "SAP EAM", "ABAP Cloud", "Clean Core", "RAP", "CDS Views", "OData V4", "SAP Fiori", "SAP BTP", "AMDP", "SmartShift", "ATC", "TDD"] },
  { company: "Infosys", role: "SAP ABAP Consultant | Infosys Certified Fiori Consultant",
    period: "May 2021 – Dec 2025", location: "Noida, UP", current: false,
    points: [
      "Rose from ABAP Developer to AMS Track Lead in 18 months, leading technical delivery across 3 concurrent application-management projects for global manufacturing and logistics clients.",
      "Wrote 20+ reports (Classical, Interactive, ALV/SALV) and interfaces (Proxies, RFC, IDocs, Web Dynpro) for FICO, MM and SD.",
      "Designed a multi-level approval workflow that cut manual processing time ~40% for a 500+ user business unit.",
      "Modernised legacy code with ABAP 7.5 techniques, cutting average program runtime by 25–35%.",
      "Built a custom LT03 transaction that avoided a €50K+ third-party tool and earned a formal client appreciation letter.",
      "Recognised with 16 consecutive INSTA Rewards, 5× Unit Rise Awards, Best Performer and the ACE COE Performer Award.",
    ],
    tech: ["SAP Fiori", "Web Dynpro", "ALE/IDocs", "Adobe Forms", "ABAP 7.5", "BAPIs", "SAP Workflow", "BRF+", "CO-PA", "OOABAP"] },
];

// Bold the numbers that carry the story (60+, ~30%, 25–35%, €50K+, 500+ …)
const NUM = /(~?\d+(?:–\d+)?[%+×]|€\d+K\+|\bzero critical post-go-live defects)/g;
const emph = (t) => t.split(NUM).map((s, i) => (i % 2 ? <b key={i}>{s}</b> : s));

function Rail({ listRef }) {
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 72%", "end 58%"] });
  const grow = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <div className="rail" aria-hidden="true"><motion.i style={{ scaleY: grow }} /></div>;
}

function Job({ j }) {
  const scrub = useScrub();
  const list = useRef(null);
  return (
    <article className="job">
      <div className="job-meta">
        <h3 className="job-co">{j.company}</h3>
        <p className="job-role">{j.role}</p>
        <div className="job-when"><span>{j.period}</span><span>{j.location}</span></div>
        {j.current && <span className="job-now"><i />Current role</span>}
      </div>
      <div>
        <div className="job-list" ref={list}>
          {scrub && <Rail listRef={list} />}
          <ul>
            {j.points.map((p) => (
              <ScrubIn as="li" key={p} from={{ x: -26, y: 0, opacity: 0.65 }} range={["start 90%", "start 60%"]}>{emph(p)}</ScrubIn>
            ))}
          </ul>
        </div>
        <div className="job-tech">{j.tech.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
      </div>
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="sec wrap">
      <SectionHeader n="02" eyebrow="Professional path" srLabel="SAP Professional Experience" title="From keeping SAP running to" em="reinventing it" />
      <div>{JOBS.map((j) => <Job key={j.company} j={j} />)}</div>
    </section>
  );
}
