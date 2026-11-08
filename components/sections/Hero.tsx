"use client";

import { useRef } from "react";
import { Download, Mail } from "lucide-react";
import { gsap, MQ } from "@/lib/gsap";
import { revealMasks } from "@/lib/anim";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { SITE } from "@/lib/data/site";
import MagneticButton from "@/components/ui/MagneticButton";
import { IconGitHub, IconLinkedIn, IconSpark } from "@/components/ui/Icons";
import PortraitFlip from "@/components/visuals/PortraitFlip";
import RoleRotator from "./RoleRotator";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { playHover } from "@/lib/sound";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    // Entrance (all motion-allowed viewports)
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.add(revealMasks(q(".hero-h1")[0]) ?? gsap.to({}, {}), 0.1)
        .fromTo(q("[data-h-in]"), { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.09 }, 0.55)
        .fromTo(q(".pf"), { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 1.4, ease: "expo.out" }, 0.3);
    });

    // Scroll: hero content recedes as the story begins (desktop + tablet)
    mm.add(MQ.pinned, () => {
      const st = { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 };
      gsap.to(q(".hero-copy"), { yPercent: -10, scale: 0.93, autoAlpha: 0.08, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero-visual"), { yPercent: 12, scale: 0.86, rotation: 1.5, ease: "none", scrollTrigger: st });
      gsap.to(q(".hero-bgword"), { xPercent: -22, ease: "none", scrollTrigger: st });
    });

    // Cursor: layered depth (children only, so it never fights the scroll transforms on the parents)
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const layers = q<HTMLElement>("[data-par]").map((node) => ({
        depth: Number(node.dataset.par),
        x: gsap.quickTo(node, "x", { duration: 1, ease: "power3" }),
        y: gsap.quickTo(node, "y", { duration: 1, ease: "power3" }),
      }));
      const move = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => { l.x(nx * l.depth); l.y(ny * l.depth); });
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="hero" ref={root} className="hero" data-section="Intro" data-num="00">
      <div className="hero-bgword" aria-hidden="true" data-par="28">S/4HANA</div>
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="eyebrow" data-h-in>Accenture · {SITE.location}</p>
          <h1 className="display hero-h1" aria-label="Rahul Singh, SAP ABAP Lead" data-par="-10">
            {["Rahul", "Singh"].map((w) => (
              <span className="hero-line" key={w} aria-hidden="true"><span className="mask"><span className="mask-in">{w}</span></span></span>
            ))}
          </h1>
          <div data-h-in><RoleRotator /></div>
          <p className="lede hero-lede" data-h-in>
            I help enterprises move from ECC to S/4HANA without dragging the past along: remediating years of custom code, adopting Clean Core,
            and building the new on ABAP Cloud, RAP and Fiori. Five-plus years across Infosys and Accenture.
          </p>
          <div className="hero-cta" data-h-in>
            <MagneticButton href="#work" onClick={() => scrollTo("#work", { duration: 1.8 })}>See the work</MagneticButton>
            <MagneticButton href={SITE.resume} variant="ghost"><Download size={16} /> Résumé</MagneticButton>
          </div>
          <div className="hero-meta" data-h-in>
            <div className="soc">
              <a href={SITE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" onPointerEnter={playHover}><IconLinkedIn /></a>
              <a href={SITE.github} target="_blank" rel="noreferrer" aria-label="GitHub" onPointerEnter={playHover}><IconGitHub /></a>
              <a href={SITE.prompify} target="_blank" rel="noreferrer" aria-label="Prompify" onPointerEnter={playHover}><IconSpark /></a>
              <a href={`mailto:${SITE.email}`} aria-label="Email" onPointerEnter={playHover}><Mail size={18} /></a>
            </div>
            <p className="creds"><b>SAP Certified</b> · ABAP Cloud · Generative AI · S/4HANA Conversion</p>
          </div>
        </div>
        <div className="hero-visual" data-par="14"><PortraitFlip /></div>
      </div>
      <div className="hero-cue" aria-hidden="true" data-h-in><span>Scroll</span><i /></div>
    </section>
  );
}
