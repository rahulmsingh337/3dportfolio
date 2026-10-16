import { useEffect, useState } from "react";

/** Minimal intro overlay: monogram + hairline progress (~0.8s) then a fade. Page content is already mounted underneath. */
export default function LoadingScreen({ onComplete }) {
  const [p, setP] = useState(0);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { onComplete(); return; }
    let raf, done = false, t2; const t0 = performance.now(); const D = 800;
    const finish = () => { if (!done) { done = true; onComplete(); } };
    const tick = (t) => {
      const v = Math.min(1, (t - t0) / D);
      setP(v);
      if (v < 1) raf = requestAnimationFrame(tick);
      else { setLeaving(true); t2 = setTimeout(finish, 520); }
    };
    raf = requestAnimationFrame(tick);
    const guard = setTimeout(finish, 2600);
    return () => { cancelAnimationFrame(raf); clearTimeout(t2); clearTimeout(guard); };
  }, [onComplete]);
  return (
    <div role="status" aria-label="Loading"
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#05070d", display: "grid", placeItems: "center",
        opacity: leaving ? 0 : 1, transition: "opacity .5s ease", pointerEvents: leaving ? "none" : "auto" }}>
      <div style={{ textAlign: "center", opacity: 0.4 + p * 0.6 }}>
        <div style={{ width: 76, height: 76, borderRadius: "50%", border: "1px solid rgba(217,196,156,.55)", display: "grid", placeItems: "center",
          font: "italic 400 27px/1 var(--f-display)", color: "#d9c49c", margin: "0 auto 30px" }}>RS</div>
        <div style={{ width: 150, height: 1, background: "rgba(255,255,255,.12)", margin: "0 auto", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${p * 100}%`, background: "#d9c49c" }} />
        </div>
      </div>
    </div>
  );
}
