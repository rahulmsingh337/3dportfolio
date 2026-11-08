"use client";

import { useRef } from "react";
import { gsap, MQ } from "@/lib/gsap";
import { revealMasksOnScroll } from "@/lib/anim";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { CAPABILITIES } from "@/lib/data/capabilities";
import MaskText from "@/components/ui/MaskText";
import CapabilityCard from "./CapabilityCard";

/**
 * Desktop/tablet: the section pins and vertical scroll drives the cards sideways, with per-card depth.
 * Mobile: a native scroll-snap carousel (no pinning), same cards.
 */
export default function Capabilities() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current, pinEl = pin.current, tr = track.current;
    if (!el || !pinEl || !tr) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const t = revealMasksOnScroll(el.querySelector(".cap-h"), "top 80%");
      return () => { t?.kill(); };
    });

    mm.add(MQ.pinned, () => {
      const cards = Array.from(tr.querySelectorAll<HTMLElement>("[data-cap]"));
      const dist = () => Math.max(0, tr.scrollWidth - window.innerWidth);
      // Depth from each card's current position. Runs on the tween (every frame while scrub catches up), not only on scroll events.
      const depth = () => {
        const x = Number(gsap.getProperty(tr, "x")) || 0;
        const vw = window.innerWidth;
        cards.forEach((card) => {
          const center = card.offsetLeft + card.offsetWidth / 2 + x;
          card.style.setProperty("--d", Math.max(-1.4, Math.min(1.4, (center - vw / 2) / (vw / 2))).toFixed(3));
        });
      };
      gsap.to(tr, {
        x: () => -dist(), ease: "none", onUpdate: depth,
        scrollTrigger: {
          trigger: el, start: "top top", end: () => `+=${dist() + window.innerHeight * 0.25}`, pin: pinEl, scrub: 0.9,
          anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => { if (bar.current) bar.current.style.transform = `scaleX(${self.progress.toFixed(4)})`; },
          onRefresh: depth,
        },
      });
      depth();
      return () => cards.forEach((c) => c.style.removeProperty("--d"));
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="capabilities" ref={root} className="cap" data-section="Capabilities" data-num="03">
      <div ref={pin} className="cap-pin">
        <header className="wrap cap-head">
          <p className="eyebrow">Capabilities</p>
          <MaskText as="h2" className="display cap-h" text="Sharp tools for" em="heavy landscapes" />
          <p className="lede">Six disciplines, each with a result behind it. Tap a card to see what it delivered.</p>
        </header>
        <div ref={track} className="cap-track">
          {CAPABILITIES.map((c, i) => <CapabilityCard key={c.id} c={c} index={i} />)}
        </div>
        <div className="wrap cap-prog" aria-hidden="true"><span>01</span><div className="cap-bar"><span ref={bar} /></div><span>06</span></div>
      </div>
    </section>
  );
}
