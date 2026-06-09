import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["Build", "Migrate", "Optimize"];

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const startRef = useRef(performance.now());
  const DURATION = 2800;

  useEffect(() => {
    let raf;
    const tick = (now) => {
      const elapsed = now - startRef.current;
      const next = Math.min(100, Math.floor((elapsed / DURATION) * 100));
      setCount(next);
      if (next < 100) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 420);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % WORDS.length), 933);
    return () => clearInterval(t);
  }, []);

  return (
    <div id="loader">
      {/* top-left label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute", top: 32, left: 40,
          fontSize: 11, letterSpacing: "0.3em",
          color: "var(--muted)", textTransform: "uppercase",
        }}
      >
        Portfolio
      </motion.div>

      {/* center word */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        textAlign: "center",
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.75, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: "clamp(36px, 7vw, 72px)",
              color: "var(--text)",
              lineHeight: 1,
            }}
          >
            {WORDS[wordIdx]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* bottom-right counter */}
      <div style={{
        position: "absolute", bottom: 40, right: 48,
        fontFamily: "'Fraunces', serif",
        fontStyle: "italic",
        fontSize: "clamp(64px, 12vw, 140px)",
        color: "var(--text)",
        opacity: 0.1,
        lineHeight: 1,
        tabularNums: true,
        letterSpacing: "-4px",
      }}>
        {String(count).padStart(3, "0")}
      </div>

      {/* progress bar */}
      <div className="loader-progress-bar" style={{ width: `${count}%` }} />
    </div>
  );
}
