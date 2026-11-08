"use client";

import { Fragment, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";

const TEXT = "Every enterprise carries years of custom code. I take that weight and turn it into a clean core: lighter, upgrade-ready, and built to last.";
const HIGHLIGHT = new Set(["clean", "core:", "lighter,", "upgrade-ready,", "built", "to", "last."]);

/** Pinned manifesto: words ignite with scroll progress while LEGACY and CORE zoom through each other behind. */
export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const words = q(".mw");
      gsap.set(words, { opacity: 0.4, y: 22, scale: 0.985 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.7 } });
      tl.to(words, { opacity: 1, y: 0, scale: 1, ease: "none", stagger: { each: 0.1 } }, 0)
        .to(q(".mf-legacy"), { scale: 1.7, opacity: 0, xPercent: -8, ease: "power1.in" }, 0)
        .fromTo(q(".mf-core"), { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 0.3, ease: "power1.out" }, 0.25)
        .to(q(".mf-bar"), { scaleX: 1, ease: "none" }, 0);
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="manifesto" ref={root} className="mf" data-section="Idea" data-num="01">
      <div className="mf-pin">
        <div className="mf-layer mf-legacy" aria-hidden="true">LEGACY</div>
        <div className="mf-layer mf-core" aria-hidden="true">CORE</div>
        <div className="wrap mf-body">
          <p className="eyebrow">The idea</p>
          <p className="mf-text">
            {TEXT.split(" ").map((w, i) => (
              <Fragment key={i}><span className={`mw${HIGHLIGHT.has(w) ? " hl" : ""}`}>{w}</span>{" "}</Fragment>
            ))}
          </p>
          <div className="mf-prog" aria-hidden="true"><i className="mf-bar" /></div>
        </div>
      </div>
    </section>
  );
}
