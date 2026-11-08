"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Top progress line plus a quiet "where am I" label driven by `data-section` markers. */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bar.current, { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.2 } });
      document.querySelectorAll<HTMLElement>("[data-section]").forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec, start: "top 55%", end: "bottom 55%",
          onToggle: (self) => { if (self.isActive && label.current) label.current.textContent = `${sec.dataset.num ?? ""}  ${sec.dataset.section ?? ""}`; },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="progress" aria-hidden="true"><div ref={bar} className="progress-bar" /></div>
      <div ref={label} className="where" aria-hidden="true">00  Intro</div>
    </>
  );
}
