// Pointer effects: card spotlight + magnetic buttons. Fine pointers only; skipped for reduced motion.
export function initFx() {
  if (typeof window === "undefined") return () => {};
  const fine = window.matchMedia("(pointer: fine)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) return () => {};

  const SPOT = ".card, .flipc, .stat";
  const MAG = ".btn, .nav-cta, .soc a";
  let mx = -9999, my = -9999, raf = 0, lastSpot = null;

  const frame = () => {
    raf = 0;
    // READ phase (all layout reads first, so styles written below never force a re-layout mid-frame)
    const el = document.elementFromPoint(mx, my)?.closest?.(SPOT);
    const spotRect = el ? el.getBoundingClientRect() : null;
    const reads = [];
    document.querySelectorAll(MAG).forEach((b) => {
      const r = b.getBoundingClientRect();
      if (r.bottom < -80 || r.top > window.innerHeight + 80) return;
      reads.push([b, r]);
    });
    // WRITE phase
    if (lastSpot && lastSpot !== el) lastSpot = null;
    if (el) {
      el.style.setProperty("--sx", (mx - spotRect.left).toFixed(0) + "px");
      el.style.setProperty("--sy", (my - spotRect.top).toFixed(0) + "px");
      lastSpot = el;
    }
    // magnetic: buttons lean toward the pointer when it gets close
    reads.forEach(([b, r]) => {
      const dx = mx - (r.left + r.width / 2), dy = my - (r.top + r.height / 2);
      const reach = Math.max(r.width, r.height) / 2 + 44;
      const d = Math.hypot(dx, dy);
      if (d < reach) {
        const f = 0.5 + (1 - d / reach);
        const cl = (v, m) => Math.max(-m, Math.min(m, v));
        b.style.setProperty("--bx", cl(dx * 0.2 * f, 9).toFixed(1) + "px");
        b.style.setProperty("--by", cl(dy * 0.28 * f, 7).toFixed(1) + "px");
        b._mag = true;
      } else if (b._mag) {
        b.style.setProperty("--bx", "0px"); b.style.setProperty("--by", "0px"); b._mag = false;
      }
    });
  };
  const onMove = (e) => {
    if (e.pointerType === "touch") return;
    mx = e.clientX; my = e.clientY;
    if (!raf) raf = requestAnimationFrame(frame);
  };
  const onLeave = () => { mx = -9999; my = -9999; if (!raf) raf = requestAnimationFrame(frame); };
  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("mouseleave", onLeave);
  return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); document.removeEventListener("mouseleave", onLeave); };
}
