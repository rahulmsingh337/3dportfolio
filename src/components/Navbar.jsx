import { useEffect, useState } from "react";
import { Menu, X, Search, Volume2, VolumeX } from "lucide-react";
import { playHoverSound } from "../utils/hoverSound";
import { isMuted, setMuted, onMuteChange } from "../utils/soundPrefs";
import { openPalette, toast } from "../utils/toast";

const LINKS = [
  { id: "skills", label: "Capabilities" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "journal", label: "Insights" },
  { id: "awards", label: "Credentials" },
  { id: "contact", label: "Contact" },
];
const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [muted, setMutedState] = useState(isMuted());

  useEffect(() => onMuteChange(setMutedState), []);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let cur = "";
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = l.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleSound = () => { setMuted(!isMuted()); toast(isMuted() ? "Sound off" : "Sound on"); };

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`} aria-label="Primary">
      <div className="nav-pill">
        <a className="nav-mark" href="#hero" aria-label="RS, Rahul Singh home">RS</a>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? "on" : ""} onMouseEnter={playHoverSound}>{l.label}</a>
          ))}
        </div>
        <button className="nav-ic" onClick={openPalette} aria-label={`Command palette ${isMac ? "⌘K" : "Ctrl K"}`} onMouseEnter={playHoverSound}>
          <Search size={16} strokeWidth={1.7} /><span className="kbd">{isMac ? "⌘K" : "Ctrl K"}</span>
        </button>
        <button className="nav-ic" onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Turn sound off"} aria-pressed={!muted}>
          {muted ? <VolumeX size={16} strokeWidth={1.7} /> : <Volume2 size={16} strokeWidth={1.7} />}
        </button>
        <a className="nav-cta" href="mailto:rs58598@gmail.com" onMouseEnter={playHoverSound}>Let&apos;s talk</a>
        <button className="nav-burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="nav-sheet">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? "on" : ""} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
