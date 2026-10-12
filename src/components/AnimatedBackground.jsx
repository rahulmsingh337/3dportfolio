import { useEffect, useRef } from "react";

/**
 * Spatial background (visionOS-style depth).
 * - Deep, calm base with soft coloured light orbs at different "depths"
 * - Orbs shift with the mouse and the scroll at different speeds (parallax)
 * - A faint perspective floor grid gives the scene a ground plane
 * - Static, very low grain; no WebGL, no animated overlays, nothing bright behind text
 */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

// rgb, peak alpha, size, left, top, parallax depth (px), drift animation
const ORBS = [
  { c: "99,102,241",  a: 0.60, size: "64vmax", x: "-14%", y: "-20%", depth: 26, anim: "sp-drift-a 40s ease-in-out infinite" },
  { c: "34,211,238",  a: 0.30, size: "46vmax", x: "56%",  y: "6%",   depth: 46, anim: "sp-drift-b 48s ease-in-out infinite" },
  { c: "168,85,247",  a: 0.38, size: "56vmax", x: "-10%", y: "50%",  depth: 36, anim: "sp-drift-c 54s ease-in-out infinite" },
  { c: "59,130,246",  a: 0.30, size: "42vmax", x: "60%",  y: "56%",  depth: 60, anim: "sp-drift-a 46s ease-in-out infinite reverse" },
];

export default function AnimatedBackground() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let tx = 0, ty = 0, cx = 0, cy = 0, sp = 0, raf = 0, running = false;
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--mx", cx.toFixed(4));
      el.style.setProperty("--my", cy.toFixed(4));
      el.style.setProperty("--sp", sp.toFixed(4));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(tick);
      else running = false;
    };
    const kick = () => { if (!running) { running = true; raf = requestAnimationFrame(tick); } };
    const onMove = (e) => { tx = (e.clientX / window.innerWidth) * 2 - 1; ty = (e.clientY / window.innerHeight) * 2 - 1; kick(); };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      sp = max > 0 ? window.scrollY / max - 0.5 : 0; // -0.5 (top) .. +0.5 (bottom), bounded
      kick();
    };

    if (fine) window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="sp-root">
      <div className="sp-light" />

      {ORBS.map((o, i) => (
        <div
          key={i}
          className="sp-orb"
          style={{
            left: o.x, top: o.y, width: o.size, height: o.size,
            transform: `translate3d(calc(var(--mx, 0) * ${o.depth}px), calc(var(--my, 0) * ${o.depth}px + var(--sp, 0) * ${-o.depth * 7}px), 0)`,
          }}
        >
          <div
            className="sp-orb-core"
            style={{
              background: `radial-gradient(closest-side, rgba(${o.c},${o.a}) 0%, rgba(${o.c},${(o.a * 0.45).toFixed(3)}) 42%, rgba(${o.c},0) 100%)`,
              animation: o.anim,
            }}
          />
        </div>
      ))}

      <div className="sp-floor" />
      <div className="sp-vignette" />
      <div className="sp-grain" style={{ backgroundImage: NOISE }} />

      <style>{`
        .sp-root{position:fixed;inset:0;z-index:-10;overflow:hidden;pointer-events:none;
          background:linear-gradient(180deg,#080c1c 0%,#060916 55%,#04060f 100%);}
        .sp-light{position:absolute;inset:0;
          background:radial-gradient(ellipse 70% 42% at 50% -8%,rgba(190,205,255,.14),transparent 70%);}
        .sp-orb{position:absolute;will-change:transform;}
        .sp-orb-core{position:absolute;inset:0;will-change:transform;}
        .sp-floor{position:absolute;left:-25%;right:-25%;bottom:-8%;height:60vh;
          transform-origin:50% 100%;transform:perspective(720px) rotateX(64deg);
          background-image:
            linear-gradient(rgba(150,165,255,.24) 1px,transparent 1px),
            linear-gradient(90deg,rgba(150,165,255,.24) 1px,transparent 1px);
          background-size:72px 72px;
          -webkit-mask-image:linear-gradient(to top,#000 0%,rgba(0,0,0,.5) 40%,transparent 92%);
                  mask-image:linear-gradient(to top,#000 0%,rgba(0,0,0,.5) 40%,transparent 92%);
          opacity:.75;}
        .sp-vignette{position:absolute;inset:0;
          background:radial-gradient(ellipse at 50% 45%,transparent 38%,rgba(3,5,12,.70) 100%);}
        .sp-grain{position:absolute;inset:0;opacity:.035;mix-blend-mode:overlay;}
        @keyframes sp-drift-a{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(4%,6%) scale(1.07)}}
        @keyframes sp-drift-b{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-6%,4%) scale(1.10)}}
        @keyframes sp-drift-c{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(5%,-5%) scale(1.06)}}
        @media (prefers-reduced-motion:reduce){.sp-orb-core{animation:none!important}}
      `}</style>
    </div>
  );
}
