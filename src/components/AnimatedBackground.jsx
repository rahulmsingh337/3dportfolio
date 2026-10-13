import { useEffect, useRef } from "react";

/**
 * Spatial background that reacts to the cursor (visionOS-style depth).
 *  - Soft light that follows the pointer at two speeds (fast core, slow halo)
 *  - A grid that lights up around the pointer
 *  - Colour orbs at different depths with strong mouse parallax + bounded scroll parallax
 *  - A floor plane that tilts with the mouse; a click flares the light
 *  - No WebGL, nothing bright behind text; static grain only
 */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")";

// rgb, peak alpha, size, left, top, mouse-parallax depth (px at screen edge), drift animation
const ORBS = [
  { c: "99,102,241",  a: 0.60, size: "64vmax", x: "-14%", y: "-20%", depth: 70,  anim: "sp-drift-a 40s ease-in-out infinite" },
  { c: "34,211,238",  a: 0.30, size: "46vmax", x: "56%",  y: "6%",   depth: 120, anim: "sp-drift-b 48s ease-in-out infinite" },
  { c: "168,85,247",  a: 0.38, size: "56vmax", x: "-10%", y: "50%",  depth: 95,  anim: "sp-drift-c 54s ease-in-out infinite" },
  { c: "59,130,246",  a: 0.30, size: "42vmax", x: "60%",  y: "56%",  depth: 160, anim: "sp-drift-a 46s ease-in-out infinite reverse" },
];

export default function AnimatedBackground() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let W = window.innerWidth, H = window.innerHeight;
    const T = { x: W * 0.74, y: H * 0.36, mx: 0, my: 0 };   // targets
    let gx = T.x, gy = T.y, hx = T.x, hy = T.y;            // fast glow / slow halo (px)
    let mx = 0, my = 0, sp = 0, gs = 1, gsT = 1, gi = 0, giT = 0;           // parallax, scroll progress, intensity
    let lx = T.x, ly = T.y, raf = 0, running = false;

    const write = () => {
      const s = el.style;
      s.setProperty("--gx", gx.toFixed(1)); s.setProperty("--gy", gy.toFixed(1));
      s.setProperty("--hx", hx.toFixed(1)); s.setProperty("--hy", hy.toFixed(1));
      s.setProperty("--mx", mx.toFixed(4)); s.setProperty("--my", my.toFixed(4));
      s.setProperty("--sp", sp.toFixed(4)); s.setProperty("--gs", gs.toFixed(3)); s.setProperty("--gi", gi.toFixed(3));
    };

    const tick = () => {
      gx += (T.x - gx) * 0.17;  gy += (T.y - gy) * 0.17;     // quick, responsive
      hx += (T.x - hx) * 0.05;  hy += (T.y - hy) * 0.05;     // slow, trailing
      mx += (T.mx - mx) * 0.07; my += (T.my - my) * 0.07;
      gsT += (1 - gsT) * 0.07;  gs += (gsT - gs) * 0.14;     // flare decays back to 1
      giT += (0 - giT) * 0.014; gi += (giT - gi) * 0.12;    // lit grid fades out when the pointer rests
      write();
      const busy =
        Math.abs(T.x - gx) > 0.4 || Math.abs(T.y - gy) > 0.4 ||
        Math.abs(T.x - hx) > 0.4 || Math.abs(T.y - hy) > 0.4 ||
        Math.abs(T.mx - mx) > 0.002 || Math.abs(T.my - my) > 0.002 ||
        Math.abs(gsT - 1) > 0.002 || Math.abs(gs - 1) > 0.002 || gi > 0.01 || giT > 0.01;
      if (busy) raf = requestAnimationFrame(tick); else running = false;
    };
    const kick = () => { if (!running) { running = true; raf = requestAnimationFrame(tick); } };

    const onMove = (e) => {
      T.x = e.clientX; T.y = e.clientY;
      T.mx = (e.clientX / W) * 2 - 1; T.my = (e.clientY / H) * 2 - 1;
      const v = Math.hypot(e.clientX - lx, e.clientY - ly);   // faster movement -> brighter, larger light
      lx = e.clientX; ly = e.clientY;
      gsT = Math.max(gsT, Math.min(1.5, 1 + v / 70));
      giT = 1;
      kick();
    };
    const onDown = () => { gsT = 1.75; kick(); };              // click flare
    const onLeave = () => { T.x = W * 0.74; T.y = H * 0.36; T.mx = 0; T.my = 0; kick(); };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      sp = max > 0 ? window.scrollY / max - 0.5 : 0;           // bounded -0.5 .. +0.5
      kick();
    };
    const onResize = () => { W = window.innerWidth; H = window.innerHeight; };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    write(); onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
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
            transform: `translate3d(calc(var(--mx, 0) * ${-o.depth}px), calc(var(--my, 0) * ${-o.depth}px + var(--sp, 0) * ${-o.depth * 3}px), 0)`,
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
      <div className="sp-gridlit" />
      <div className="sp-halo" />
      <div className="sp-glow" />
      <div className="sp-vignette" />
      <div className="sp-grain" style={{ backgroundImage: NOISE }} />

      <style>{`
        .sp-root{position:fixed;inset:0;z-index:-10;overflow:hidden;pointer-events:none;
          background:linear-gradient(180deg,#080c1c 0%,#060916 55%,#04060f 100%);}
        .sp-light{position:absolute;inset:0;
          background:radial-gradient(ellipse 70% 42% at 50% -8%,rgba(190,205,255,.14),transparent 70%);}
        .sp-orb{position:absolute;will-change:transform;}
        .sp-orb-core{position:absolute;inset:0;will-change:transform;}

        /* floor plane tilts with the mouse */
        .sp-floor{position:absolute;left:-25%;right:-25%;bottom:-8%;height:60vh;
          transform-origin:50% 100%;
          transform:perspective(720px) rotateX(calc(64deg + var(--my,0) * -6deg)) rotateZ(calc(var(--mx,0) * 3deg)) translateX(calc(var(--mx,0) * -40px));
          background-image:
            linear-gradient(rgba(150,165,255,.24) 1px,transparent 1px),
            linear-gradient(90deg,rgba(150,165,255,.24) 1px,transparent 1px);
          background-size:72px 72px;
          -webkit-mask-image:linear-gradient(to top,#000 0%,rgba(0,0,0,.5) 40%,transparent 92%);
                  mask-image:linear-gradient(to top,#000 0%,rgba(0,0,0,.5) 40%,transparent 92%);
          opacity:.75;will-change:transform;}

        /* grid that lights up around the pointer */
        .sp-gridlit{position:absolute;inset:0;
          background-image:
            linear-gradient(rgba(170,185,255,.20) 1px,transparent 1px),
            linear-gradient(90deg,rgba(170,185,255,.20) 1px,transparent 1px);
          background-size:56px 56px;opacity:var(--gi,0);
          -webkit-mask-image:radial-gradient(circle calc(190px * var(--gs,1)) at calc(var(--gx,0) * 1px) calc(var(--gy,0) * 1px),#000 0%,rgba(0,0,0,.45) 45%,transparent 100%);
                  mask-image:radial-gradient(circle calc(190px * var(--gs,1)) at calc(var(--gx,0) * 1px) calc(var(--gy,0) * 1px),#000 0%,rgba(0,0,0,.45) 45%,transparent 100%);}

        /* light that follows the pointer: slow halo + fast core */
        .sp-halo{position:absolute;left:0;top:0;width:58vmax;height:58vmax;margin:-29vmax 0 0 -29vmax;
          transform:translate3d(calc(var(--hx,0) * 1px),calc(var(--hy,0) * 1px),0) scale(calc(0.92 + (var(--gs,1) - 1) * 0.5));
          background:radial-gradient(closest-side,rgba(129,140,248,.34),rgba(99,102,241,.14) 45%,rgba(99,102,241,0) 100%);
          opacity:calc(0.55 + var(--gi,0) * 0.45);will-change:transform;}
        .sp-glow{position:absolute;left:0;top:0;width:26vmax;height:26vmax;margin:-13vmax 0 0 -13vmax;
          transform:translate3d(calc(var(--gx,0) * 1px),calc(var(--gy,0) * 1px),0) scale(calc(0.9 + (var(--gs,1) - 1) * 0.7));
          background:radial-gradient(closest-side,rgba(103,232,249,.26),rgba(167,139,250,.12) 50%,rgba(167,139,250,0) 100%);
          opacity:calc(0.22 + var(--gi,0) * 0.78);will-change:transform;}

        .sp-vignette{position:absolute;inset:0;
          background:radial-gradient(ellipse at 50% 45%,transparent 38%,rgba(3,5,12,.70) 100%);}
        .sp-grain{position:absolute;inset:0;opacity:.035;mix-blend-mode:overlay;}
        @keyframes sp-drift-a{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(4%,6%) scale(1.07)}}
        @keyframes sp-drift-b{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-6%,4%) scale(1.10)}}
        @keyframes sp-drift-c{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(5%,-5%) scale(1.06)}}
        @media (prefers-reduced-motion:reduce){.sp-orb-core{animation:none!important}}
        @media (pointer:coarse){.sp-gridlit{display:none}}
      `}</style>
    </div>
  );
}
