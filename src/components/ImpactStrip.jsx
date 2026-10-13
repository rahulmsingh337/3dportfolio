import { useEffect, useRef, useState } from "react";

const STATS = [
  { v: 5,  pre: "",  suf: "+",  label: "Years SAP ABAP" },
  { v: 60, pre: "",  suf: "+",  label: "ABAP objects remediated" },
  { v: 50, pre: "€", suf: "K+", label: "Client cost avoided" },
  { v: 16, pre: "",  suf: "×",  label: "Consecutive INSTA awards" },
  { v: 40, pre: "",  suf: "%",  label: "Workflow processing time cut" },
  { v: 30, pre: "",  suf: "%",  label: "Custom footprint reduced" },
];

function Count({ to, pre, suf, run }) {
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

export default function ImpactStrip() {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section aria-label="Impact at a glance" className="wrap" style={{ paddingBottom: "clamp(40px,6vw,88px)" }}>
      <div className="impact" ref={ref}>
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-n"><Count to={s.v} pre={s.pre} suf={s.suf} run={run} /></div>
            <div className="stat-l">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
