import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, Mail } from "lucide-react";
import { asset } from "../utils/assetPath";
import { IS_MOBILE } from "../utils/motion";
import { IconLinkedIn, IconGitHub, IconPrompify } from "./Icons";

const ROLES = ["SAP ABAP Lead", "S/4HANA Transformation", "ABAP Cloud Certified", "EAM Specialist", "GenAI Developer"];
const EASE = [0.22, 1, 0.36, 1];
const rise = (d) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: d, ease: EASE } });

export default function Hero() {
  const [i, setI] = useState(0);
  const tilt = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROLES.length), 3200);
    return () => clearInterval(t);
  }, []);

  const onMove = (e) => {
    if (IS_MOBILE || !tilt.current) return;
    const r = tilt.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tilt.current.style.setProperty("--ty", (x * 6).toFixed(2) + "deg");
    tilt.current.style.setProperty("--tx", (-y * 6).toFixed(2) + "deg");
  };
  const onLeave = () => {
    if (!tilt.current) return;
    tilt.current.style.setProperty("--ty", "0deg");
    tilt.current.style.setProperty("--tx", "0deg");
  };

  return (
    <section id="hero" className="hero">
      <div className="wrap hero-grid">
        <div>
          <motion.div className="eyebrow" {...rise(0.05)}>
            <span>Accenture</span><span className="rule" /><span>Noida, India</span>
          </motion.div>

          <motion.h1 className="hero-name" aria-label="Rahul Singh, SAP ABAP Lead" {...rise(0.15)}>
            Rahul<br />Singh
          </motion.h1>

          <motion.p className="hero-role" aria-live="polite" {...rise(0.3)}>
            <AnimatePresence mode="wait">
              <motion.span key={i} style={{ display: "inline-block" }}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE }}>
                {ROLES[i]}
              </motion.span>
            </AnimatePresence>
          </motion.p>

          <motion.p className="hero-lede" {...rise(0.42)}>
            5+ years delivering SAP S/4HANA transformation, ABAP Cloud &amp; Clean Core modernization at Accenture &amp; Infosys.
            EAM · RAP · CDS · OData V4 · Fiori · Custom Code Remediation.
          </motion.p>

          <motion.div className="hero-cta" {...rise(0.54)}>
            <a href="#projects" className="btn btn-primary">View selected work</a>
            <a href={asset("/resume.pdf")} download className="btn btn-ghost"><Download size={16} /> Résumé</a>
          </motion.div>

          <motion.div className="hero-meta" {...rise(0.66)}>
            <div className="soc">
              <a href="https://www.linkedin.com/in/rahul-singh-sap-abap/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><IconLinkedIn /></a>
              <a href="https://github.com/rahulmsingh337" target="_blank" rel="noreferrer" aria-label="GitHub"><IconGitHub /></a>
              <a href="https://prompifytech.vercel.app" target="_blank" rel="noreferrer" aria-label="Prompify"><IconPrompify /></a>
              <a href="mailto:rs58598@gmail.com" aria-label="Email"><Mail size={18} /></a>
            </div>
            <div className="creds"><b>SAP Certified</b> · ABAP Cloud · Generative AI · S/4HANA Conversion</div>
          </motion.div>
        </div>

        <motion.div className="portrait-wrap" {...rise(0.3)} onMouseMove={onMove} onMouseLeave={onLeave}>
          <span className="corner tl" /><span className="corner br" />
          <div className="portrait" ref={tilt}>
            <img src={asset("/rahul.jpg")} alt="Rahul Singh" width={900} height={1350} decoding="async" fetchPriority="high" />
            <div className="portrait-cap">
              <div><strong>Rahul Singh</strong><span>SAP ABAP Lead · Noida</span></div>
              <i aria-hidden="true" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
