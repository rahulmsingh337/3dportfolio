"use client";

import { useEffect, useRef } from "react";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

type Orb = { rgb: string; a: number; size: string; x: string; y: string; depth: number; anim: string };
const ORBS: Orb[] = [
  { rgb: "70,100,255", a: 0.5, size: "64vmax", x: "-14%", y: "-22%", depth: 70, anim: "bd-a 42s ease-in-out infinite" },
  { rgb: "155,107,255", a: 0.34, size: "52vmax", x: "56%", y: "4%", depth: 120, anim: "bd-b 50s ease-in-out infinite" },
  { rgb: "91,140,255", a: 0.3, size: "56vmax", x: "-10%", y: "50%", depth: 95, anim: "bd-c 56s ease-in-out infinite" },
  { rgb: "208,137,255", a: 0.22, size: "42vmax", x: "60%", y: "58%", depth: 160, anim: "bd-a 48s ease-in-out infinite reverse" },
];

/**
 * Fixed atmospheric layer: colour orbs with pointer + scroll parallax, a pointer-following light and a grid
 * that lights up near the cursor. Pure CSS variables updated from one rAF loop (no React state, no WebGL).
 */
export default function Backdrop() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let W = window.innerWidth, H = window.innerHeight;
    const T = { x: W * 0.72, y: H * 0.38, mx: 0, my: 0 };
    let gx = T.x, gy = T.y, hx = T.x, hy = T.y, mx = 0, my = 0, sp = 0, gs = 1, gsT = 1, gi = 0, giT = 0;
    let lx = T.x, ly = T.y, raf = 0, running = false;

    const write = () => {
      const s = el.style;
      s.setProperty("--gx", gx.toFixed(1)); s.setProperty("--gy", gy.toFixed(1));
      s.setProperty("--hx", hx.toFixed(1)); s.setProperty("--hy", hy.toFixed(1));
      s.setProperty("--mx", mx.toFixed(4)); s.setProperty("--my", my.toFixed(4));
      s.setProperty("--sp", sp.toFixed(4)); s.setProperty("--gs", gs.toFixed(3)); s.setProperty("--gi", gi.toFixed(3));
    };
    const tick = () => {
      gx += (T.x - gx) * 0.17; gy += (T.y - gy) * 0.17;
      hx += (T.x - hx) * 0.05; hy += (T.y - hy) * 0.05;
      mx += (T.mx - mx) * 0.07; my += (T.my - my) * 0.07;
      gsT += (1 - gsT) * 0.07; gs += (gsT - gs) * 0.14;
      giT += (0 - giT) * 0.014; gi += (giT - gi) * 0.12;
      write();
      const busy = Math.abs(T.x - gx) > 0.4 || Math.abs(T.y - gy) > 0.4 || Math.abs(T.x - hx) > 0.4 || Math.abs(T.y - hy) > 0.4 ||
        Math.abs(T.mx - mx) > 0.002 || Math.abs(T.my - my) > 0.002 || Math.abs(gsT - 1) > 0.002 || Math.abs(gs - 1) > 0.002 || gi > 0.01 || giT > 0.01;
      if (busy) raf = requestAnimationFrame(tick); else running = false;
    };
    const kick = () => { if (!running) { running = true; raf = requestAnimationFrame(tick); } };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      T.x = e.clientX; T.y = e.clientY; T.mx = (e.clientX / W) * 2 - 1; T.my = (e.clientY / H) * 2 - 1;
      gsT = Math.max(gsT, Math.min(1.5, 1 + Math.hypot(e.clientX - lx, e.clientY - ly) / 70));
      lx = e.clientX; ly = e.clientY; giT = 1; kick();
    };
    const onDown = () => { gsT = 1.75; kick(); };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      sp = max > 0 ? window.scrollY / max - 0.5 : 0;
      kick();
    };
    const onResize = () => { W = window.innerWidth; H = window.innerHeight; };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    write(); onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={root} className="bd" aria-hidden="true">
      <div className="bd-top" />
      {ORBS.map((o, i) => (
        <div key={i} className="bd-orb" style={{ left: o.x, top: o.y, width: o.size, height: o.size,
          transform: `translate3d(calc(var(--mx,0) * ${-o.depth}px), calc(var(--my,0) * ${-o.depth}px + var(--sp,0) * ${-o.depth * 3}px), 0)` }}>
          <div className="bd-core" style={{ background: `radial-gradient(closest-side, rgba(${o.rgb},${o.a}) 0%, rgba(${o.rgb},${(o.a * 0.42).toFixed(3)}) 42%, rgba(${o.rgb},0) 100%)`, animation: o.anim }} />
        </div>
      ))}
      <div className="bd-floor" />
      <div className="bd-grid" />
      <div className="bd-halo" />
      <div className="bd-glow" />
      <div className="bd-vig" />
      <div className="bd-grain" style={{ backgroundImage: GRAIN }} />
    </div>
  );
}
