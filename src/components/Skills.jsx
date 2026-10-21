import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Terminal, Layers, Database, Layout, Shield, Bot } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { IS_MOBILE } from "../utils/motion";
import { useScrub } from "../utils/scrub";
import { playFlipSound } from "../utils/flipSound";
import { playHoverSound } from "../utils/hoverSound";

const TAGS = [["S/4HANA", "SAP EAM", "F2173 / F2175", "Maintenance Management", "Asset Management", "Custom Code Remediation"], ["ABAP Cloud", "Clean Core", "CDS Views", "RAP", "OData V4", "SAP BTP"], ["Gemini API", "Firebase", "AI/ML in SAP", "React", "TypeScript"], ["ALE/IDoc", "RFC", "BAPIs", "Proxies", "BRF+", "SAP Workflow"], ["SQL Trace", "ATC", "Eclipse ADT", "SmartShift", "TDD", "ABAP Unit Testing"], ["SmartForms", "Adobe Forms", "SAPscript", "ALV/SALV", "CO-PA", "Solution Manager"]];

const CAPS = [
  { icon: Terminal, title: "S/4HANA Transformation & EAM",
    desc: "Moving from ECC means finding every custom object that won’t survive the trip. I remediate code for HANA, clear the ATC findings, and carry SAP EAM Fiori apps (F2173, F2175) through cutover and hypercare.",
    proof: "60+ ABAP objects remediated. F2173 & F2175 EAM Fiori enhancements. Maintenance Phase 9 cutover & hypercare. Zero critical post-go-live defects." },
  { icon: Layers, title: "ABAP Cloud & Clean Core",
    desc: "Extend SAP without touching its core. ABAP Cloud, RAP, CDS views and OData V4 on the SAP BTP ABAP Environment, built on released APIs so upgrades stay boring.",
    proof: "SAP Certified Back-End Developer – ABAP Cloud (C_ABAPD_2601). ~30% custom footprint reduction via Clean Core extensibility." },
  { icon: Bot, title: "SAP AI & Emerging Tech",
    desc: "Where SAP meets generative AI. I’m certified as an SAP Generative AI Developer, and I build with Gemini, Firebase and React. Prompify is the proof of concept.",
    proof: "SAP Certified Generative AI Developer. Full-stack AI app live at prompifytech.vercel.app (Firebase Auth, Gemini API, Express)." },
  { icon: Database, title: "Integration & Interfaces",
    desc: "Systems that talk without shouting. ALE/IDoc, RFC, BAPIs, Proxies, BRF+ and SAP Workflow, stitched into flows that keep working after the project team leaves.",
    proof: "End-to-end ALE/IDoc integration across 3 client landscapes. ~40% workflow processing time reduction." },
  { icon: Shield, title: "Performance & Quality",
    desc: "Fast code, fewer surprises. SQL Trace, ABAP Runtime Analysis, ATC and memory analysis find the slow spots; SmartShift and ABAP Unit keep migrations honest.",
    proof: "~35% migration effort reduction with SmartShift tooling. Code reviews across an 11-person team." },
  { icon: Layout, title: "Forms, Output & Modules",
    desc: "The documents customers actually see. SmartForms, Adobe Forms and SAPscript output across FICO, MM, SD and CO-PA, built to be right the first time.",
    proof: "~200 duplicate email triggers per month eliminated. 30% output processing time reduction." },
];

function FlipCard({ c, i, bare }) {
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

  return (IS_MOBILE || bare) ? card : (
    <motion.div
      initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}>
      {card}
    </motion.div>
  );
}

const HEAD = {
  n: "01", eyebrow: "Capabilities", srLabel: "SAP ABAP Skills", title: "Sharp tools for", em: "heavy landscapes",
  lede: "Six disciplines, each with a result behind it. Tap a card to see what it delivered.",
};

/** Desktop: the section pins to the screen and the cards travel sideways as you scroll. */
function PinnedSkills() {
  const sec = useRef(null);
  const track = useRef(null);
  const [dist, setDist] = useState(1800);
  const [vh, setVh] = useState(() => window.innerHeight);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
      setVh(window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  const { scrollYProgress } = useScroll({ target: sec, offset: ["start start", "end end"] });
  const sp = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.35 });
  const x = useTransform(sp, [0, 1], [0, -dist]);

  return (
    <section id="skills" ref={sec} className="pin-sec" style={{ height: dist + vh }}>
      <div className="pin">
        <div className="wrap"><SectionHeader {...HEAD} /></div>
        <motion.div className="hscroll" ref={track} style={{ x }}>
          {CAPS.map((c, i) => <div className="hcard" key={c.title}><FlipCard c={c} i={i} bare /></div>)}
        </motion.div>
        <div className="wrap hprog" aria-hidden="true">
          <span>01</span><div className="hbar"><motion.i style={{ scaleX: sp }} /></div><span>06</span>
        </div>
      </div>
    </section>
  );
}

export default function Skills() {
  const scrub = useScrub();
  if (scrub) return <PinnedSkills />;
  return (
    <section id="skills" className="sec wrap">
      <SectionHeader {...HEAD} />
      <div className="grid-3">
        {CAPS.map((c, i) => <FlipCard key={c.title} c={c} i={i} />)}
      </div>
    </section>
  );
}
