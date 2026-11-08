"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CornerDownLeft, Search } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/data/site";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { toast } from "@/lib/events";
import { isMuted, playHover, setMuted, useMuted } from "@/lib/sound";

type Item = { id: string; group: string; label: string; hint: string; kw: string; run: () => void };
const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const muted = useMuted();
  const { scrollTo, lock } = useSmoothScroll();
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => { setIsOpen(false); setQ(""); setIdx(0); lock(false); returnFocus.current?.focus?.(); }, [lock]);
  const show = useCallback(() => { returnFocus.current = document.activeElement as HTMLElement; setIsOpen(true); lock(true); }, [lock]);

  const items = useMemo<Item[]>(() => [
    ...NAV_LINKS.map((l) => ({ id: `go-${l.id}`, group: "Go to", label: l.label, hint: "Section", kw: l.id, run: () => scrollTo(`#${l.id}`, { duration: 1.8 }) })),
    { id: "top", group: "Go to", label: "Top of page", hint: "Home", kw: "hero home start", run: () => scrollTo(0, { duration: 1.8 }) },
    { id: "resume", group: "Actions", label: "Download résumé", hint: "PDF", kw: "cv resume pdf download",
      run: () => { const a = document.createElement("a"); a.href = SITE.resume; a.download = ""; document.body.appendChild(a); a.click(); a.remove(); } },
    { id: "email", group: "Actions", label: "Email Rahul", hint: SITE.email, kw: "mail contact hire", run: () => { window.location.href = `mailto:${SITE.email}`; } },
    { id: "li", group: "Links", label: "LinkedIn", hint: "Profile", kw: "social", run: () => open(SITE.linkedin) },
    { id: "gh", group: "Links", label: "GitHub", hint: "Repositories", kw: "code social", run: () => open(SITE.github) },
    { id: "pf", group: "Links", label: "Prompify", hint: "AI prompt app", kw: "ai app", run: () => open(SITE.prompify) },
    { id: "wa", group: "Links", label: "WhatsApp", hint: "Message", kw: "chat phone", run: () => open(SITE.whatsapp) },
    { id: "snd", group: "Preferences", label: muted ? "Turn sound on" : "Turn sound off", hint: "Effects", kw: "mute audio sound", run: () => { setMuted(!isMuted()); toast(isMuted() ? "Sound off" : "Sound on"); } },
  ], [muted, scrollTo]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? items.filter((i) => `${i.label} ${i.kw} ${i.group}`.toLowerCase().includes(s)) : items;
  }, [items, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      const typing = !!el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); if (isOpen) close(); else show(); }
      else if (e.key === "/" && !typing && !isOpen) { e.preventDefault(); show(); }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("rs-open-palette", show);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("rs-open-palette", show); };
  }, [isOpen, close, show]);

  useEffect(() => { if (isOpen) { const t = setTimeout(() => input.current?.focus(), 30); return () => clearTimeout(t); } }, [isOpen]);
  useEffect(() => { list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" }); }, [idx, results]);

  const run = (it?: Item) => { if (!it) return; close(); window.setTimeout(it.run, 160); };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(results.length - 1, i + 1)); playHover(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); playHover(); }
    else if (e.key === "Enter") { e.preventDefault(); run(results[idx]); }
    else if (e.key === "Tab") e.preventDefault();
  };

  let lastGroup = "";
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="cmd-bg" onMouseDown={close} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <motion.div className="cmd" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKeyDown}
            initial={{ opacity: 0, y: -14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.99 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <div className="cmd-top">
              <Search size={18} strokeWidth={1.6} />
              <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setIdx(0); }} placeholder="Jump to a section, or run an action…"
                role="combobox" aria-expanded="true" aria-controls="cmd-list" aria-autocomplete="list" aria-activedescendant={results[idx] ? `cmd-${results[idx].id}` : undefined} spellCheck={false} autoComplete="off" />
              <kbd>Esc</kbd>
            </div>
            <ul id="cmd-list" ref={list} role="listbox" className="cmd-list" data-lenis-prevent>
              {results.length === 0 && <li className="cmd-empty">No matches for “{q}”</li>}
              {results.map((it, i) => {
                const head = it.group !== lastGroup ? (lastGroup = it.group) : null;
                return (
                  <li key={it.id} role="presentation">
                    {head && <div className="cmd-grp">{head}</div>}
                    <div id={`cmd-${it.id}`} role="option" aria-selected={i === idx} className={`cmd-it${i === idx ? " on" : ""}`} onMouseMove={() => idx !== i && setIdx(i)} onClick={() => run(it)}>
                      <span>{it.label}</span><span className="cmd-hint">{i === idx ? <CornerDownLeft size={14} /> : it.hint}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="cmd-foot"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> select</span><span><kbd>Esc</kbd> close</span></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
