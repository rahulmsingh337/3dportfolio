import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { playHoverSound } from "../utils/hoverSound";

/** Thin gold reading-progress line + back-to-top button. */
export default function ScrollUI() {
  const bar = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(4)})`;
      setShow(window.scrollY > 900);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return (
    <>
      <div className="progress" aria-hidden="true"><i ref={bar} /></div>
      <button className={`to-top${show ? " show" : ""}`} aria-label="Back to top" tabIndex={show ? 0 : -1}
        onMouseEnter={playHoverSound}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <ArrowUp size={18} strokeWidth={1.6} />
      </button>
    </>
  );
}
