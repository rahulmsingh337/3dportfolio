"use client";

import { useRef } from "react";
import { Mail } from "lucide-react";
import { gsap, MQ } from "@/lib/gsap";
import { revealMasksOnScroll } from "@/lib/anim";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { SITE } from "@/lib/data/site";
import MaskText from "@/components/ui/MaskText";
import MagneticButton from "@/components/ui/MagneticButton";
import { IconGitHub, IconLinkedIn } from "@/components/ui/Icons";

/** The finale: oversized type scales in, a rotating light swells, and a magnetic CTA arrives last. */
export default function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const t = revealMasksOnScroll(q(".cta-h")[0], "top 70%");
      return () => { t?.kill(); };
    });

    mm.add(MQ.pinned, () => {
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6 } })
        .fromTo(q(".cta-h"), { scale: 0.7, yPercent: 14 }, { scale: 1, yPercent: 0 }, 0)
        .fromTo(q(".cta-light"), { scale: 0.45, opacity: 0.25 }, { scale: 1.3, opacity: 1 }, 0)
        .fromTo(q(".cta-in"), { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, stagger: 0.12 }, 0.3);
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="cta" data-section="Contact" data-num="08">
      <div className="cta-pin">
        <div className="cta-light" aria-hidden="true" />
        <div className="wrap cta-body">
          <p className="eyebrow">Let’s talk</p>
          <MaskText as="h2" className="display cta-h" text="Ready to give your SAP landscape a" em="second act?" />
          <p className="lede cta-in">Planning an S/4HANA move, wrestling with years of custom code, or building on ABAP Cloud? I’d like to hear about it. Based in {SITE.location}, working with global teams.</p>
          <div className="cta-actions cta-in">
            <MagneticButton href={`mailto:${SITE.email}`} strength={0.4} className="btn-xl"><Mail size={18} /> Start a conversation</MagneticButton>
            <MagneticButton href={SITE.linkedin} external variant="ghost"><IconLinkedIn width={18} height={18} /> LinkedIn</MagneticButton>
            <MagneticButton href={SITE.github} external variant="ghost"><IconGitHub width={18} height={18} /> GitHub</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
