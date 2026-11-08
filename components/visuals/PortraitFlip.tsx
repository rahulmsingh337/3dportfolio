"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Trophy } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { playFlip } from "@/lib/sound";

const CHIPS = ["BTP", "OData", "GenAI", "CDS", "RAP", "S/4HANA"];

/**
 * Hero portrait: tilts with the pointer, flips to the award photo (hover on mouse, tap on touch), and is
 * circled by tech chips on an ellipse (front half passes over the photo, back half behind it).
 */
export default function PortraitFlip() {
  const wrap = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const chips = useRef<(HTMLSpanElement | null)[]>([]);
  const lastPointer = useRef("mouse");
  const [flipped, setFlipped] = useState(false);
  const [armBack, setArmBack] = useState(false);

  // Orbit: one gsap ticker callback, cached dimensions (no layout reads per frame).
  useEffect(() => {
    const w = wrap.current;
    if (!w) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = w.clientWidth, H = w.clientHeight;
    const ro = new ResizeObserver(() => { W = w.clientWidth; H = w.clientHeight; });
    ro.observe(w);
    const place = (seconds: number) => {
      const small = W < 360;                       // phones: keep the orbit inside the viewport
      const rx = (W / 2) * (small ? 1.0 : 1.19), ry = (H / 2) * (small ? 1.0 : 1.09);
      const base = reduced ? 0.6 : seconds * ((Math.PI * 2) / 26);
      chips.current.forEach((el, i) => {
        if (!el) return;
        const a = base + i * ((Math.PI * 2) / CHIPS.length);
        const depth = (Math.sin(a) + 1) / 2;
        el.style.transform = `translate(-50%,-50%) translate3d(${(Math.cos(a) * rx).toFixed(1)}px,${(Math.sin(a) * ry).toFixed(1)}px,0) scale(${(0.86 + 0.14 * depth).toFixed(3)})`;
        el.style.opacity = (0.55 + 0.45 * depth).toFixed(2);
        el.style.zIndex = depth > 0.5 ? "3" : "0";
      });
    };
    place(0);
    if (!reduced) gsap.ticker.add(place);
    const idle = window.requestIdleCallback ? window.requestIdleCallback(() => setArmBack(true), { timeout: 9000 }) : window.setTimeout(() => setArmBack(true), 8000);
    return () => {
      gsap.ticker.remove(place);
      ro.disconnect();
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number); else clearTimeout(idle as number);
    };
  }, []);

  // Pointer tilt
  useEffect(() => {
    const el = tilt.current, w = wrap.current;
    if (!el || !w) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.7, ease: "power3" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.7, ease: "power3" });
    gsap.set(el, { transformPerspective: 1200 });
    const move = (e: PointerEvent) => {
      const r = w.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 12);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
    };
    const leave = () => { rx(0); ry(0); };
    w.addEventListener("pointermove", move);
    w.addEventListener("pointerleave", leave);
    return () => { w.removeEventListener("pointermove", move); w.removeEventListener("pointerleave", leave); };
  }, []);

  const toggle = () => { setFlipped((f) => !f); playFlip(); };

  return (
    <div ref={wrap} className="pf">
      {CHIPS.map((c, i) => <span key={c} ref={(el) => { chips.current[i] = el; }} className="pf-chip" aria-hidden="true">{c}</span>)}
      <i className="pf-corner tl" /><i className="pf-corner br" />
      <div ref={tilt} className="pf-tilt">
        <div className={`pf-flip${flipped ? " on" : ""}`} role="button" tabIndex={0} aria-pressed={flipped}
          onPointerDown={(e) => { lastPointer.current = e.pointerType; setArmBack(true); }} onFocus={() => setArmBack(true)}
          onPointerEnter={(e) => { setArmBack(true); if (e.pointerType === "mouse") { setFlipped(true); playFlip(); } }}
          onPointerLeave={(e) => { if (e.pointerType === "mouse") { setFlipped(false); playFlip(); } }}
          onClick={() => { if (lastPointer.current !== "mouse") toggle(); }}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}>
          <div className="pf-face" aria-hidden={flipped}>
            <Image src="/rahul-880.webp" alt="Rahul Singh" width={880} height={1320} preload fetchPriority="high" sizes="(max-width: 767px) 280px, 460px" />
            <span className="pf-pill">Hover / tap to flip ↻</span>
            <div className="pf-cap"><div><strong>Rahul Singh</strong><span>SAP ABAP Lead · Noida</span></div><i /></div>
          </div>
          <div className="pf-face back" aria-hidden={!flipped}>
            {armBack && <Image src="/rahul-award-880.webp" alt="Rahul Singh receiving the Unit Rise Award" width={880} height={1320} sizes="(max-width: 767px) 280px, 460px" />}
            <div className="pf-cap"><div><strong className="pf-trophy"><Trophy size={15} strokeWidth={1.6} /> Unit Rise Award Recipient</strong><span>Infosys · EAS SAP Unit</span></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
