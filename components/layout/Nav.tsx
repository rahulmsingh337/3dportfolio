"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, Volume2, VolumeX } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/data/site";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { openPalette, toast } from "@/lib/events";
import { playHover, setMuted, useMuted, isMuted } from "@/lib/sound";
import { IconGitHub, IconLinkedIn } from "@/components/ui/Icons";

const isMac = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [mac, setMac] = useState(false);
  const muted = useMuted();
  const { scrollTo, lock } = useSmoothScroll();
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => setMac(isMac()), []);

  const close = useCallback(() => { setOpen(false); lock(false); menuBtn.current?.focus(); }, [lock]);
  const toggle = useCallback(() => { setOpen((v) => { lock(!v); return !v; }); }, [lock]);

  useEffect(() => {
    const onOpen = () => { setOpen(true); lock(true); };
    window.addEventListener("rs-open-menu", onOpen);
    return () => window.removeEventListener("rs-open-menu", onOpen);
  }, [lock]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => firstLink.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); window.removeEventListener("keydown", onKey); };
  }, [open, close]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false); lock(false);
    window.setTimeout(() => scrollTo(`#${id}`, { duration: 1.8 }), 380);
  };

  const w = typeof window !== "undefined" ? window.innerWidth : 1440;
  const h = typeof window !== "undefined" ? window.innerHeight : 900;
  const r = Math.hypot(w, h);

  return (
    <>
      <header className="nav">
        <a href="#hero" className="nav-logo" title="Back to top" onClick={(e) => { e.preventDefault(); scrollTo(0, { duration: 1.8 }); }}>
          <span className="nav-mark">RS</span><span className="nav-name">Rahul Singh</span>
        </a>
        <div className="nav-right">
          <button className="nav-ic" onClick={openPalette} onPointerEnter={playHover} aria-label={`Command palette ${mac ? "⌘K" : "Ctrl K"}`}>
            <Search size={15} strokeWidth={1.7} /><span className="nav-kbd">{mac ? "⌘K" : "Ctrl K"}</span>
          </button>
          <button className="nav-ic" aria-pressed={!muted} aria-label={muted ? "Turn sound on" : "Turn sound off"} onClick={() => { setMuted(!isMuted()); toast(isMuted() ? "Sound off" : "Sound on"); }}>
            {muted ? <VolumeX size={15} strokeWidth={1.7} /> : <Volume2 size={15} strokeWidth={1.7} />}
          </button>
          <button ref={menuBtn} className="nav-menu" aria-expanded={open} aria-controls="site-menu" onClick={toggle} onPointerEnter={playHover}>
            <span>{open ? "Close" : "Menu"}</span><i /><i />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav id="site-menu" className="menu" aria-label="Site" role="dialog" aria-modal="true"
            initial={{ clipPath: `circle(0px at ${w - 70}px 38px)` }} animate={{ clipPath: `circle(${r}px at ${w - 70}px 38px)` }} exit={{ clipPath: `circle(0px at ${w - 70}px 38px)` }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
            <ul className="menu-list">
              {NAV_LINKS.map((l, i) => (
                <motion.li key={l.id} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                  <a ref={i === 0 ? firstLink : undefined} href={`#${l.id}`} onClick={go(l.id)} onPointerEnter={playHover}>
                    <span className="menu-n">{String(i + 1).padStart(2, "0")}</span><span className="menu-t">{l.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="menu-foot">
              <a href={`mailto:${SITE.email}`} className="ulink">{SITE.email}</a>
              <span className="menu-soc">
                <a href={SITE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><IconLinkedIn /></a>
                <a href={SITE.github} target="_blank" rel="noreferrer" aria-label="GitHub"><IconGitHub /></a>
              </span>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
