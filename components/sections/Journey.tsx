"use client";

import { useRef } from "react";
import { gsap, MQ } from "@/lib/gsap";
import { revealMasksOnScroll } from "@/lib/anim";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { MILESTONES } from "@/lib/data/timeline";
import MaskText from "@/components/ui/MaskText";

/**
 * Timeline: a sticky year "reel" turns as each milestone passes the reading line, a gold line draws down the
 * list, and every milestone opens from a clip mask. Mobile keeps the line and reveals but drops the sticky reel.
 */
export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const head = revealMasksOnScroll(q(".jr-h")[0], "top 80%");
      gsap.fromTo(q(".jr-line i"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: q(".jr-list")[0], start: "top 60%", end: "bottom 60%", scrub: true } });
      q(".jr-item").forEach((item) => {
        gsap.fromTo(item.querySelector(".jr-card"), { clipPath: "inset(0 0 100% 0)", autoAlpha: 0, y: 40 },
          { clipPath: "inset(0 0 0% 0)", autoAlpha: 1, y: 0, ease: "none", scrollTrigger: { trigger: item, start: "top 88%", end: "top 55%", scrub: 0.4 } });
      });
      return () => { head?.kill(); };
    });

    mm.add(MQ.pinned, () => {
      const years = q(".jr-years")[0];
      const org = q(".jr-org")[0];
      const items = q<HTMLElement>(".jr-item");
      const count = items.length;
      items.forEach((item, i) => {
        gsap.timeline({ scrollTrigger: { trigger: item, start: "top 58%", end: "bottom 58%", onToggle: (self) => {
          if (!self.isActive) return;
          gsap.to(years, { yPercent: -(i / count) * 100, duration: 0.9, ease: "expo.out", overwrite: true });
          if (org) { org.textContent = item.dataset.org ?? ""; gsap.fromTo(org, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 }); }
        } } });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="journey" ref={root} className="jr" data-section="Journey" data-num="06">
      <div className="wrap">
        <header className="jr-head">
          <p className="eyebrow">The journey</p>
          <MaskText as="h2" className="display jr-h" text="Ten years," em="one thread" />
          <p className="lede">From mechanical engineering to leading an S/4HANA transformation: the milestones that shaped how I work.</p>
        </header>
        <div className="jr-grid">
          <div className="jr-left" aria-hidden="true">
            <div className="jr-reel"><div className="jr-years">{MILESTONES.map((m) => <span key={m.year}>{m.year}</span>)}</div></div>
            <p className="jr-org">{MILESTONES[0].org}</p>
          </div>
          <ol className="jr-list">
            <div className="jr-line" aria-hidden="true"><i /></div>
            {MILESTONES.map((m) => (
              <li key={m.year} className="jr-item" data-org={m.org}>
                <div className="jr-card">
                  <div className="jr-meta"><span className="jr-y">{m.year}</span><span className="tag">{m.org}</span></div>
                  <h3 className="jr-t">{m.title}</h3>
                  <p className="jr-p">{m.text}</p>
                  {m.facts && <div className="jr-f">{m.facts.map((f) => <span className="tag" key={f}>{f}</span>)}</div>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
