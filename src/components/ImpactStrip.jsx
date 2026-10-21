import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { playHoverSound } from "../utils/hoverSound";
import { useScrub } from "../utils/scrub";

const STATS = [
  { v: 5,  pre: "",  suf: "+",  label: "Years of ABAP delivery" },
  { v: 60, pre: "",  suf: "+",  label: "Custom objects remediated" },
  { v: 50, pre: "€", suf: "K+", label: "Third-party spend avoided" },
  { v: 16, pre: "",  suf: "×",  label: "Consecutive INSTA awards" },
  { v: 40, pre: "",  suf: "%",  label: "Less manual workflow time" },
  { v: 30, pre: "",  suf: "%",  label: "Lighter custom footprint" },
];

/** Time-based count-up (phones / reduced motion). */
function Count({ to, pre, suf, run, reduced }) {
  const [n, setN] = useState(reduced ? to : 0);
  useEffect(() => {
    if (!run || reduced) return;
    let raf; const t0 = performance.now(); const D = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / D);
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, reduced]);
  return <>{pre}{n}<sup>{suf}</sup></>;
}

function StatScrub({ s, i }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 98%", "start 55%"] });
  const y = useTransform(p, [0, 1], [46 + (i % 3) * 16, 0]);
  const opacity = useTransform(p, [0, 0.5], [0.78, 1]);
  const n = useTransform(p, (v) => Math.round(Math.min(1, v / 0.92) * s.v));
  return (
    <motion.div ref={ref} className="stat" style={{ y, opacity }} onMouseEnter={playHoverSound}>
      <div className="stat-n">{s.pre}<motion.span>{n}</motion.span><sup>{s.suf}</sup></div>
      <div className="stat-l">{s.label}</div>
    </motion.div>
  );
}

function StatStatic({ s, run, reduced }) {
  return (
    <div className="stat" onMouseEnter={playHoverSound}>
      <div className="stat-n"><Count to={s.v} pre={s.pre} suf={s.suf} run={run} reduced={reduced} /></div>
      <div className="stat-l">{s.label}</div>
    </div>
  );
}

export default function ImpactStrip() {
  const scrub = useScrub();
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section aria-label="Impact at a glance" className="wrap" style={{ paddingBottom: "clamp(40px,6vw,88px)" }}>
      <div className="impact" ref={ref}>
        {STATS.map((s, i) => scrub ? <StatScrub key={s.label} s={s} i={i} /> : <StatStatic key={s.label} s={s} run={run} reduced={reduced} />)}
      </div>
    </section>
  );
}
