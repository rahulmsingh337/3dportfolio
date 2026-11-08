"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { STATS } from "@/lib/data/stats";
import { playHover } from "@/lib/sound";

/** Counters scrubbed to scroll position (scrolling back down un-counts). Final values are in the HTML. */
export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      el.querySelectorAll<HTMLElement>("[data-stat]").forEach((cell) => {
        const num = cell.querySelector<HTMLElement>("[data-num]");
        const to = Number(cell.dataset.stat);
        if (!num) return;
        const obj = { v: 0 };
        num.textContent = "0";
        gsap.to(obj, { v: to, ease: "none", onUpdate: () => { num.textContent = String(Math.round(obj.v)); },
          scrollTrigger: { trigger: cell, start: "top 94%", end: "top 52%", scrub: 0.5 } });
        gsap.fromTo(cell, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, ease: "none", scrollTrigger: { trigger: cell, start: "top 98%", end: "top 70%", scrub: true } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="section stats" data-section="Impact" data-num="02" aria-label="Impact at a glance">
      <div className="wrap">
        <div className="stats-grid glass">
          {STATS.map((s) => (
            <div key={s.label} className="stat" data-stat={s.value} onPointerEnter={playHover}>
              <div className="stat-n">{s.prefix}<span data-num>{s.value}</span><sup className="grad">{s.suffix}</sup></div>
              <div className="stat-l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
