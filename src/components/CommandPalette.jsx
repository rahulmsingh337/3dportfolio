import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, CornerDownLeft } from "lucide-react";
import { asset } from "../utils/assetPath";
import { copyText, toast } from "../utils/toast";
import { isMuted, setMuted, onMuteChange } from "../utils/soundPrefs";
import { playHoverSound } from "../utils/hoverSound";

const EMAIL = "rs58598@gmail.com";
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
const open = (url) => window.open(url, "_blank", "noopener,noreferrer");

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const [muted, setMutedState] = useState(isMuted());
  const input = useRef(null);
  const list = useRef(null);
  const returnFocus = useRef(null);

  useEffect(() => onMuteChange(setMutedState), []);

  const close = useCallback(() => {
    setIsOpen(false); setQ(""); setIdx(0);
    returnFocus.current?.focus?.();
  }, []);

  const items = useMemo(() => [
    ...[["skills", "Capabilities"], ["experience", "Experience"], ["projects", "Selected work"], ["journal", "Insights"], ["awards", "Credentials"], ["contact", "Contact"]]
      .map(([id, label]) => ({ id: "go-" + id, group: "Go to", label, hint: "Section", kw: id, run: () => go(id) })),
    { id: "top", group: "Go to", label: "Top of page", hint: "Home", kw: "hero home start", run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { id: "resume", group: "Actions", label: "Download résumé", hint: "PDF", kw: "cv resume pdf download",
      run: () => { const a = document.createElement("a"); a.href = asset("/resume.pdf"); a.download = ""; document.body.appendChild(a); a.click(); a.remove(); } },
    { id: "email", group: "Actions", label: "Email Rahul", hint: EMAIL, kw: "mail contact hire", run: () => { window.location.href = `mailto:${EMAIL}`; } },
    { id: "copy", group: "Actions", label: "Copy email address", hint: "Clipboard", kw: "mail clipboard",
      run: async () => toast((await copyText(EMAIL)) ? "Email address copied" : "Copy failed. Use rs58598@gmail.com") },
    { id: "li", group: "Links", label: "LinkedIn", hint: "Profile", kw: "social", run: () => open("https://www.linkedin.com/in/rahul-singh-sap-abap/") },
    { id: "gh", group: "Links", label: "GitHub", hint: "Repositories", kw: "code social", run: () => open("https://github.com/rahulmsingh337") },
    { id: "pf", group: "Links", label: "Prompify", hint: "AI prompt app", kw: "ai app", run: () => open("https://prompifytech.vercel.app") },
    { id: "wa", group: "Links", label: "WhatsApp", hint: "Message", kw: "chat phone", run: () => open("https://wa.me/918989805836") },
    { id: "snd", group: "Preferences", label: muted ? "Turn sound on" : "Turn sound off", hint: "Effects", kw: "mute audio sound",
      run: () => { setMuted(!isMuted()); toast(isMuted() ? "Sound off" : "Sound on"); } },
  ], [muted]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((i) => (i.label + " " + i.kw + " " + i.group).toLowerCase().includes(s));
  }, [items, q]);

  // open: Ctrl/Cmd+K, "/" (when not typing), or the nav button
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); returnFocus.current = document.activeElement; setIsOpen((v) => !v); }
      else if (e.key === "/" && !typing && !isOpen) { e.preventDefault(); returnFocus.current = document.activeElement; setIsOpen(true); }
    };
    const onOpen = () => { returnFocus.current = document.activeElement; setIsOpen(true); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("rs-open-palette", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("rs-open-palette", onOpen); };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => input.current?.focus(), 30);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { clearTimeout(t); document.body.style.overflow = prev; };
  }, [isOpen]);

  useEffect(() => { list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" }); }, [idx, results]);

  const run = (item) => { if (!item) return; close(); setTimeout(() => item.run(), 120); };
  const onKeyDown = (e) => {
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(results.length - 1, i + 1)); playHoverSound(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); playHoverSound(); }
    else if (e.key === "Enter") { e.preventDefault(); run(results[idx]); }
    else if (e.key === "Tab") { e.preventDefault(); }
  };

  let lastGroup = "";
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="cmd-bg" onMouseDown={close}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <motion.div className="cmd" role="dialog" aria-modal="true" aria-label="Command palette"
            onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKeyDown}
            initial={{ opacity: 0, y: -14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <div className="cmd-top">
              <Search size={18} strokeWidth={1.6} />
              <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setIdx(0); }} placeholder="Jump to a section, or run an action…"
                role="combobox" aria-expanded="true" aria-controls="cmd-list" aria-autocomplete="list"
                aria-activedescendant={results[idx] ? "cmd-" + results[idx].id : undefined} spellCheck={false} autoComplete="off" />
              <kbd>Esc</kbd>
            </div>
            <ul id="cmd-list" ref={list} role="listbox" className="cmd-list">
              {results.length === 0 && <li className="cmd-empty">No matches for “{q}”</li>}
              {results.map((it, i) => {
                const head = it.group !== lastGroup ? (lastGroup = it.group) : null;
                return (
                  <li key={it.id} role="presentation">
                    {head && <div className="cmd-grp">{head}</div>}
                    <div id={"cmd-" + it.id} role="option" aria-selected={i === idx} className={`cmd-it${i === idx ? " on" : ""}`}
                      onMouseMove={() => idx !== i && setIdx(i)} onClick={() => run(it)}>
                      <span>{it.label}</span>
                      <span className="cmd-hint">{i === idx ? <CornerDownLeft size={14} /> : it.hint}</span>
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
