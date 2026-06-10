import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const WORDS = ["Build", "Migrate", "Optimise", "Deploy", "Innovate"];

export default function LoadingScreen({ onComplete }) {
  const [count, setCount]     = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const t0 = useRef(performance.now());

  useEffect(() => {
    let raf;
    const tick = now => {
      const pct = Math.min(100, Math.floor(((now - t0.current) / 2800) * 100));
      setCount(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 420);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i+1) % WORDS.length), 560);
    return () => clearInterval(t);
  }, []);

  return (
    <div id="loader" style={{ display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", height:"100vh" }}>

      {/* Canvas background particles */}
      <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
        {Array.from({length:30}).map((_,i)=>(
          <motion.div key={i}
            initial={{ opacity:0, x:Math.random()*window.innerWidth, y:Math.random()*window.innerHeight }}
            animate={{ opacity:[0,0.6,0],
              x: Math.random()*window.innerWidth,
              y: Math.random()*window.innerHeight }}
            transition={{ duration:3+Math.random()*4, repeat:Infinity, delay:Math.random()*3 }}
            style={{ position:"absolute", width:2, height:2, borderRadius:"50%",
              background: i%2===0 ? "#6366F1" : "#22D3EE" }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}
        style={{ position:"absolute", top:32, left:40,
          fontFamily:"'JetBrains Mono',monospace", fontSize:11,
          letterSpacing:"0.3em", color:"rgba(255,255,255,0.25)",
          textTransform:"uppercase" }}>
        Portfolio · 2026
      </motion.div>

      {/* Centre word with glitch */}
      <AnimatePresence mode="wait">
        <motion.div key={wordIdx}
          initial={{ opacity:0, y:30, filter:"blur(10px)" }}
          animate={{ opacity:0.85, y:0, filter:"blur(0px)" }}
          exit={{ opacity:0, y:-30, filter:"blur(10px)" }}
          transition={{ duration:0.3 }}
          style={{ fontFamily:"'Fraunces',serif", fontStyle:"italic",
            fontSize:"clamp(48px,9vw,100px)", color:"#fff",
            lineHeight:1, textAlign:"center", position:"relative", zIndex:1,
            textShadow:"0 0 40px rgba(99,102,241,0.5)" }}>
          {WORDS[wordIdx]}
        </motion.div>
      </AnimatePresence>

      {/* Progress counter */}
      <div style={{ position:"absolute", bottom:56, right:48,
        fontFamily:"'JetBrains Mono',monospace",
        fontSize:"clamp(64px,10vw,120px)",
        color:"#fff", opacity:0.05, lineHeight:1, letterSpacing:"-3px" }}>
        {String(count).padStart(3,"0")}
      </div>

      {/* Gradient progress bar */}
      <div className="loader-bar" style={{ width:`${count}%` }}/>

      {/* Bottom label */}
      <div style={{ position:"absolute", bottom:32, left:"50%",
        transform:"translateX(-50%)",
        fontFamily:"'JetBrains Mono',monospace", fontSize:10,
        letterSpacing:"0.3em", color:"rgba(255,255,255,0.15)",
        textTransform:"uppercase" }}>
        Loading experience
      </div>
    </div>
  );
}
