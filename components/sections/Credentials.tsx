"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { revealMasksOnScroll } from "@/lib/anim";
import { useIsoLayoutEffect } from "@/hooks/useIsoLayoutEffect";
import { CERTS, INSTA_IMAGES, RECOGNITION, thumb, type Credential } from "@/lib/data/credentials";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { playFlip, playHover } from "@/lib/sound";
import MaskText from "@/components/ui/MaskText";

type Viewer = { images: string[]; i: number } | null;

function Tile({ c, onOpen }: { c: Credential; onOpen: () => void }) {
  return (
    <div className="tile glass" data-tile>
      <button type="button" className="tile-main" onClick={() => { playFlip(); onOpen(); }} onPointerEnter={playHover} aria-haspopup="dialog">
        <span className="tile-img"><Image src={thumb(c.image)} alt="" width={96} height={72} sizes="96px" /></span>
        <span className="tile-txt"><b>{c.title}</b><small>{c.issuer}</small></span>
      </button>
      {c.href && <a className="tile-verify" href={c.href} target="_blank" rel="noreferrer">Verify <ArrowUpRight size={13} /></a>}
    </div>
  );
}

export default function Credentials() {
  const root = useRef<HTMLElement>(null);
  const [viewer, setViewer] = useState<Viewer>(null);
  const { lock } = useSmoothScroll();
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = (images: string[], i = 0) => { returnFocus.current = document.activeElement as HTMLElement; setViewer({ images, i }); lock(true); };
  const close = useCallback(() => { setViewer(null); lock(false); returnFocus.current?.focus?.(); }, [lock]);
  const step = useCallback((d: number) => setViewer((v) => (v ? { ...v, i: (v.i + d + v.images.length) % v.images.length } : v)), []);

  useEffect(() => {
    if (!viewer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewer, close, step]);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const head = revealMasksOnScroll(el.querySelector(".cr-h"), "top 80%");
      const batches = ScrollTrigger.batch(el.querySelectorAll("[data-tile]"), {
        start: "top 92%", once: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 44, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.9, ease: "power3.out" }),
      });
      return () => { head?.kill(); batches.forEach((b) => b.kill()); };
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="credentials" ref={root} className="cr" data-section="Credentials" data-num="07">
      <div className="wrap">
        <header className="cr-head">
          <p className="eyebrow">Proof</p>
          <MaskText as="h2" className="display cr-h" text="Certified &" em="recognised" />
          <p className="lede">Exams passed, badges you can verify, and the quarterly awards that came from the people I worked with.</p>
        </header>

        <h3 className="cr-sub mono">Certifications</h3>
        <div className="tiles">{CERTS.map((c, i) => <Tile key={c.title} c={c} onOpen={() => open(CERTS.map((x) => x.image), i)} />)}</div>

        <h3 className="cr-sub mono">Recognition</h3>
        <div className="tiles">
          {RECOGNITION.map((c, i) => <Tile key={c.title + c.issuer} c={c} onOpen={() => open(RECOGNITION.map((x) => x.image), i)} />)}
          <div className="tile glass tile-insta" data-tile>
            <button type="button" className="tile-main" onClick={() => { playFlip(); open(INSTA_IMAGES, 0); }} onPointerEnter={playHover} aria-haspopup="dialog">
              <span className="tile-num grad">16×</span>
              <span className="tile-txt"><b>Consecutive INSTA Rewards</b><small>Infosys · 9 award photos</small></span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {viewer && (
          <motion.div className="lb" role="dialog" aria-modal="true" aria-label="Credential viewer" onClick={close}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <button className="lb-x" onClick={close} aria-label="Close viewer"><X size={20} /></button>
            {viewer.images.length > 1 && (
              <>
                <button className="lb-n prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous"><ChevronLeft size={22} /></button>
                <button className="lb-n next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next"><ChevronRight size={22} /></button>
              </>
            )}
            <motion.div key={viewer.i} className="lb-img" onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              <Image src={viewer.images[viewer.i]} alt="Credential or award" width={1400} height={1000} sizes="90vw" />
            </motion.div>
            <span className="lb-count">{viewer.i + 1} / {viewer.images.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
