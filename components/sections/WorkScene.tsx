"use client";

import { useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { revealMasks } from "@/lib/anim";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import type { Scene } from "@/lib/data/projects";
import MagneticButton from "@/components/ui/MagneticButton";
import MaskText from "@/components/ui/MaskText";
import TiltCard from "@/components/ui/TiltCard";

/**
 * One project "scene": a sticky stage where the visual expands out of a mask while scroll progress (`--p`)
 * drives the visual itself; text lifts in word by word. Alternating composition via `flip`.
 */
export default function WorkScene({ scene, flip, children }: { scene: Scene; flip?: boolean; children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const frame = q(".sc-frame")[0];
      const desktop = window.matchMedia("(min-width: 768px)").matches;

      gsap.timeline({ scrollTrigger: { trigger: el, start: "top 62%", once: true } })
        .add(revealMasks(q(".sc-title")[0]) ?? gsap.to({}, {}), 0)
        .fromTo(q("[data-sc-in]"), { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.09, ease: "power3.out" }, 0.25);

      // Visual expands out of an inset mask as the scene arrives
      gsap.fromTo(frame, { clipPath: "inset(17% 13% 17% 13% round 46px)", scale: 0.88 },
        { clipPath: "inset(0% 0% 0% 0% round 30px)", scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 88%", end: desktop ? "top 12%" : "top 40%", scrub: 0.6 } });
      gsap.to(q(".sc-n"), { yPercent: -30, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });

      // Scene progress → CSS variable consumed by the visual
      gsap.fromTo(el, { "--p": 0 }, { "--p": 1, ease: "none", scrollTrigger: { trigger: el, start: desktop ? "top 55%" : "top 80%", end: desktop ? "bottom 75%" : "bottom 35%", scrub: 0.5 } });

      // Leaves quietly
      if (desktop) gsap.to(frame, { scale: 0.93, yPercent: -4, ease: "none", scrollTrigger: { trigger: el, start: "bottom 78%", end: "bottom 18%", scrub: true } });
    });
    return () => mm.revert();
  }, []);

  return (
    <article ref={root} id={`scene-${scene.id}`} className={`scene${flip ? " flip" : ""}`} data-scene={scene.id} style={{ "--p": 1 } as React.CSSProperties}>
      <div className="sc-sticky">
        <div className="wrap sc-grid">
          <div className="sc-visual"><TiltCard max={5}><div className="sc-frame">{children}</div></TiltCard></div>
          <div className="sc-text">
            <span className="sc-n" aria-hidden="true">{scene.n}</span>
            <p className="eyebrow" data-sc-in>{scene.kicker}</p>
            <MaskText as="h3" className="display sc-title" text={scene.title} />
            <p className="sc-name" data-sc-in>{scene.name}</p>
            <p className="sc-desc" data-sc-in>{scene.desc}</p>
            <p className="sc-out" data-sc-in><b>Outcome</b>{scene.outcome}</p>
            <div className="sc-tags" data-sc-in>{scene.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
            <div className="sc-cta" data-sc-in>
              <MagneticButton href={scene.cta.href} external={scene.cta.external} variant="ghost">{scene.cta.label} <ArrowUpRight size={16} /></MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
