"use client";

import { useState } from "react";
import { Bot, Database, Layers, Layout, Shield, Terminal } from "lucide-react";
import type { Capability, CapabilityIcon } from "@/lib/data/capabilities";
import { playFlip, playHover } from "@/lib/sound";

const ICONS: Record<CapabilityIcon, typeof Bot> = { terminal: Terminal, layers: Layers, bot: Bot, database: Database, shield: Shield, layout: Layout };

/** One capability: flips (click / Enter / Space) to show the delivered impact. `--d` (set by the section) drives depth. */
export default function CapabilityCard({ c, index }: { c: Capability; index: number }) {
  const [on, setOn] = useState(false);
  const Icon = ICONS[c.icon];
  const flip = () => { setOn((v) => !v); playFlip(); };
  return (
    <div className="cap-card" data-cap>
      <div className={`cap-flip${on ? " on" : ""}`} role="button" tabIndex={0} aria-pressed={on} onClick={flip} onPointerEnter={playHover}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } }}>
        <div className="cap-face" aria-hidden={on}>
          <span className="cap-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div className="cap-top"><span className="cap-ic"><Icon size={22} strokeWidth={1.4} /></span><span className="cap-idx">{String(index + 1).padStart(2, "0")} / 06</span></div>
          <h3 className="cap-title">{c.title}</h3>
          <p className="cap-desc">{c.desc}</p>
          <span className="cap-hint">Tap to flip ↻</span>
        </div>
        <div className="cap-face back" aria-hidden={!on}>
          <span className="cap-label">Impact</span>
          <p className="cap-proof">{c.proof}</p>
          <div className="cap-tags">{c.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
        </div>
      </div>
    </div>
  );
}
