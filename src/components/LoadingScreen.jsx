import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const WORDS = ["Build", "Migrate", "Optimise", "Deploy"];

export default function LoadingScreen({ onComplete }) {
  const [count, setCount]     = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const t0 = useRef(performance.now());
  const DURATION = 2800;

  useEffect(() => {
    let raf;
    const tick = now => {
      const pct = Math.min(100, Math.floor(((now - t0.current) / DURATION) * 100));
      setCount(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 420);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 700);
    return () => clearInterval(t);
  }, []);

  return (
    <div id="loader">
      {/* top label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ position:"absolute",top:32,left:40,fontFamily:"'JetBrains Mono',monospace",
          fontSize:11,letterSpacing:"0.3em",color:"rgba(255,255,255,0.3)",textTransform:"uppercase" }}>
        Portfolio · 2026
      </motion.div>

      {/* centre word */}
      <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center" }}>
        <AnimatePresence mode="wait">
          <motion.div key={wordIdx}
            initial={{ opacity:0, y:24, filter:"blur(8px)" }}
            animate={{ opacity:0.8, y:0, filter:"blur(0px)" }}
            exit={{ opacity:0, y:-24, filter:"blur(8px)" }}
            transition={{ duration:0.35, ease:"easeOut" }}
            style={{ fontFamily:"'Fraunces',serif",fontStyle:"italic",
              fontSize:"clamp(40px,8vw,80px)",color:"#fff",lineHeight:1 }}>
            {WORDS[wordIdx]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* bottom-right counter */}
      <div style={{ position:"absolute",bottom:48,right:48,
        fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(56px,10vw,120px)",
        color:"#fff",opacity:0.06,lineHeight:1,letterSpacing:"-3px" }}>
        {String(count).padStart(3,"0")}
      </div>

      {/* progress bar */}
      <div className="loader-bar" style={{ width:`${count}%` }} />
    </div>
  );
}
