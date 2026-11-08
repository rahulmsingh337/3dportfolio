"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { revealMasksOnScroll } from "@/lib/anim";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import MaskText from "@/components/ui/MaskText";
import CoreCanvas from "@/components/visuals/CoreCanvas";

const STAGES = [
  { n: "01", t: "Legacy landscape", d: "Years of custom code, tangled together. Every object is a risk the first time you upgrade." },
  { n: "02", t: "Remediation", d: "HANA remediation, ATC findings cleared, 60+ custom objects reworked. Each one steps out of the chaos." },
  { n: "03", t: "Clean Core", d: "Released APIs, ABAP Cloud and RAP. A core with a ~30% smaller custom footprint that upgrades without drama." },
];

/** The immersive scene: scroll progress drives the particle morph (canvas) and the three captions. */
export default function CoreStory() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const head = revealMasksOnScroll(q(".cs-h")[0], "top 75%");
      const caps = q(".cs-cap");
      gsap.set(caps, { autoAlpha: 0, y: 36 });
      gsap.set(caps[0], { autoAlpha: 1, y: 0 });
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.5 } });
      tl.to(caps[0], { autoAlpha: 0, y: -36, duration: 0.06 }, 0.3)
        .fromTo(caps[1], { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.06 }, 0.34)
        .to(caps[1], { autoAlpha: 0, y: -36, duration: 0.06 }, 0.64)
        .fromTo(caps[2], { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.06 }, 0.68);
      tl.duration(1);
      const st = ScrollTrigger.create({
        trigger: el, start: "top top", end: "bottom bottom",
        onUpdate: (self) => { progress.current = self.progress; el.dataset.stage = self.progress < 0.34 ? "1" : self.progress < 0.68 ? "2" : "3"; },
      });
      return () => { head?.kill(); st.kill(); };
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="story" ref={root} className="cs" data-section="Clean Core" data-num="05" data-stage="1">
      <div className="cs-pin">
        <CoreCanvas progress={progress} />
        <div className="wrap cs-ui">
          <header>
            <p className="eyebrow">The transformation</p>
            <MaskText as="h2" className="display cs-h" text="From legacy to" em="clean core" />
          </header>
          <div className="cs-bottom">
            <div className="cs-caps">
              {STAGES.map((s) => (
                <div className="cs-cap" key={s.n}><span className="cs-n">{s.n}</span><h3>{s.t}</h3><p>{s.d}</p></div>
              ))}
            </div>
            <ol className="cs-dots" aria-hidden="true">{STAGES.map((s) => <li key={s.n}><i />{s.t}</li>)}</ol>
          </div>
        </div>
      </div>
    </section>
  );
}
