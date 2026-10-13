import { useEffect, useState } from "react";

/** Minimal intro: monogram + hairline progress (~1.1s). Skipped for reduced-motion users. */
export default function LoadingScreen({ onComplete }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { onComplete(); return; }
    let raf, done = false; const t0 = performance.now(); const D = 1100;
    const finish = () => { if (!done) { done = true; onComplete(); } };
    const tick = (t) => {
      const v = Math.min(1, (t - t0) / D);
      setP(v);
      if (v < 1) raf = requestAnimationFrame(tick); else setTimeout(finish, 180);
    };
    raf = requestAnimationFrame(tick);
    const guard = setTimeout(finish, 2500);
    return () => { cancelAnimationFrame(raf); clearTimeout(guard); };
  }, [onComplete]);
  return (
    <div role="status" aria-label="Loading"
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#05070d", display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center", opacity: 0.4 + p * 0.6, transition: "opacity .3s" }}>
        <div style={{ width: 76, height: 76, borderRadius: "50%", border: "1px solid rgba(217,196,156,.55)", display: "grid", placeItems: "center",
          font: "italic 400 27px/1 var(--f-display)", color: "#d9c49c", margin: "0 auto 30px" }}>RS</div>
        <div style={{ width: 150, height: 1, background: "rgba(255,255,255,.12)", margin: "0 auto", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${p * 100}%`, background: "#d9c49c" }} />
        </div>
      </div>
    </div>
  );
}
