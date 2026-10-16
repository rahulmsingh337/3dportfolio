import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, Mail, Trophy } from "lucide-react";
import { asset } from "../utils/assetPath";
import { IS_MOBILE } from "../utils/motion";
import { IconLinkedIn, IconGitHub, IconPrompify } from "./Icons";
import { playFlipSound } from "../utils/flipSound";
import { playHoverSound } from "../utils/hoverSound";

const ORBIT = ["BTP", "OData", "GenAI", "CDS", "RAP", "S/4HANA"];
const ROLES = ["SAP ABAP Lead", "S/4HANA Transformation", "ABAP Cloud Certified", "EAM Specialist", "GenAI Developer"];
const EASE = [0.22, 1, 0.36, 1];
const rise = (d) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: d, ease: EASE } });

export default function Hero() {
  const [i, setI] = useState(0);
  const tilt = useRef(null);
  const wrapRef = useRef(null);
  const chipRefs = useRef([]);
  const lastPtr = useRef("mouse");
  const [flipped, setFlipped] = useState(false);
  const [armBack, setArmBack] = useState(false);           // load the award photo only when needed

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROLES.length), 3200);
    const idle = window.requestIdleCallback ? window.requestIdleCallback(() => setArmBack(true), { timeout: 4000 }) : setTimeout(() => setArmBack(true), 3500);
    return () => { clearInterval(t); if (window.cancelIdleCallback) window.cancelIdleCallback(idle); else clearTimeout(idle); };
  }, []);

  // Orbiting tech chips: an ellipse around the portrait; front half passes over the photo edge, back half goes behind it.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let raf;
    let w = wrap.clientWidth, h = wrap.clientHeight;          // cached: no layout read per frame
    const ro = new ResizeObserver(() => { w = wrap.clientWidth; h = wrap.clientHeight; });
    ro.observe(wrap);
    const place = (t) => {
      const k = w < 360 ? 0.05 : 0.11;
      const rx = (w / 2) * (1.12 + k), ry = (h / 2) * (1.05 + k * 0.7);
      const base = reduced ? 0.6 : ((t - t0) / 1000) * ((Math.PI * 2) / 26);
      chipRefs.current.forEach((el, i) => {
        if (!el) return;
        const a = base + i * ((Math.PI * 2) / ORBIT.length);
        const depth = (Math.sin(a) + 1) / 2;                 // 0 = far side, 1 = near side
        el.style.transform = `translate(-50%,-50%) translate3d(${(Math.cos(a) * rx).toFixed(1)}px,${(Math.sin(a) * ry).toFixed(1)}px,0) scale(${(0.86 + 0.14 * depth).toFixed(3)})`;
        el.style.opacity = (0.55 + 0.45 * depth).toFixed(2);
        el.style.zIndex = depth > 0.5 ? 3 : 0;
      });
      if (!reduced) raf = requestAnimationFrame(place);
    };
    raf = requestAnimationFrame(place);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
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

          <h1 className="hero-name" aria-label="Rahul Singh, SAP ABAP Lead">
            {["Rahul", "Singh"].map((w, i) => (
              <span className="mask line" key={w} aria-hidden="true">
                <motion.span style={{ display: "block" }} initial={{ y: "112%" }} animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE }}>{w}</motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="hero-role" aria-live="polite" {...rise(0.2)}>
            <AnimatePresence mode="wait">
              <motion.span key={i} style={{ display: "inline-block" }}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE }}>
                {ROLES[i]}
              </motion.span>
            </AnimatePresence>
          </motion.p>

          <motion.p className="hero-lede" {...rise(0.26)}>
            5+ years delivering SAP S/4HANA transformation, ABAP Cloud &amp; Clean Core modernization at Accenture &amp; Infosys.
            EAM · RAP · CDS · OData V4 · Fiori · Custom Code Remediation.
          </motion.p>

          <motion.div className="hero-cta" {...rise(0.34)}>
            <a href="#projects" className="btn btn-primary" onMouseEnter={playHoverSound}>View selected work</a>
            <a href={asset("/resume.pdf")} download className="btn btn-ghost" onMouseEnter={playHoverSound}><Download size={16} /> Résumé</a>
          </motion.div>

          <motion.div className="hero-meta" {...rise(0.42)}>
            <div className="soc">
              <a href="https://www.linkedin.com/in/rahul-singh-sap-abap/" target="_blank" rel="noreferrer" aria-label="LinkedIn" onMouseEnter={playHoverSound}><IconLinkedIn /></a>
              <a href="https://github.com/rahulmsingh337" target="_blank" rel="noreferrer" aria-label="GitHub" onMouseEnter={playHoverSound}><IconGitHub /></a>
              <a href="https://prompifytech.vercel.app" target="_blank" rel="noreferrer" aria-label="Prompify" onMouseEnter={playHoverSound}><IconPrompify /></a>
              <a href="mailto:rs58598@gmail.com" aria-label="Email" onMouseEnter={playHoverSound}><Mail size={18} /></a>
            </div>
            <div className="creds"><b>SAP Certified</b> · ABAP Cloud · Generative AI · S/4HANA Conversion</div>
          </motion.div>
        </div>

        <motion.div className="portrait-wrap" ref={wrapRef} {...rise(0.3)} onMouseMove={onMove} onMouseLeave={onLeave}>
          {ORBIT.map((t, i) => (
            <span key={t} ref={(el) => (chipRefs.current[i] = el)} className="orbit-chip" aria-hidden="true">{t}</span>
          ))}
          <span className="corner tl" /><span className="corner br" />
          <div className="tilt" ref={tilt}>
            <div
              className={`flipper${flipped ? " is-flipped" : ""}`}
              role="button" tabIndex={0} aria-pressed={flipped}
              onPointerDown={(e) => { lastPtr.current = e.pointerType; }}
              onPointerEnter={(e) => { setArmBack(true); if (e.pointerType === "mouse") { setFlipped(true); playFlipSound(); } }}
              onPointerLeave={(e) => { if (e.pointerType === "mouse") { setFlipped(false); playFlipSound(); } }}
              onClick={() => { if (lastPtr.current !== "mouse") { setFlipped((f) => !f); playFlipSound(); } }}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((f) => !f); playFlipSound(); } }}
            >
              <div className="pface" aria-hidden={flipped}>
                <img src={asset("/rahul-880.webp")} srcSet={`${asset("/rahul-480.webp")} 480w, ${asset("/rahul-880.webp")} 880w`} sizes="(max-width: 899px) 262px, 440px" alt="Rahul Singh" width={880} height={1320} decoding="async" fetchPriority="high" />
                <span className="flip-pill">Hover / tap to flip ↻</span>
                <div className="portrait-cap">
                  <div><strong>Rahul Singh</strong><span>SAP ABAP Lead · Noida</span></div>
                  <i aria-hidden="true" />
                </div>
              </div>
              <div className="pface back" aria-hidden={!flipped}>
                <img src={armBack ? asset("/rahul-award-880.webp") : undefined} srcSet={armBack ? `${asset("/rahul-award-480.webp")} 480w, ${asset("/rahul-award-880.webp")} 880w` : undefined} sizes="(max-width: 899px) 262px, 440px" alt="Rahul Singh receiving the Unit Rise Award" width={880} height={1320} decoding="async" />
                <div className="portrait-cap">
                  <div><strong><Trophy size={15} strokeWidth={1.6} /> Unit Rise Award Recipient</strong><span>Infosys · EAS SAP Unit</span></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
