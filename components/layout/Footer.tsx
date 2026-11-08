"use client";

import { ArrowUp } from "lucide-react";
import { SITE } from "@/lib/data/site";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { playHover } from "@/lib/sound";

export default function Footer() {
  const { scrollTo } = useSmoothScroll();
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span className="avail"><i />Available for opportunities · {SITE.location}</span>
        <nav className="foot-links" aria-label="Footer">
          <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="ulink">LinkedIn</a>
          <a href={SITE.github} target="_blank" rel="noreferrer" className="ulink">GitHub</a>
          <a href={SITE.resume} className="ulink">Résumé</a>
          <button type="button" className="foot-top" onClick={() => scrollTo(0, { duration: 2 })} onPointerEnter={playHover} aria-label="Back to top"><ArrowUp size={16} /></button>
        </nav>
      </div>
    </footer>
  );
}
