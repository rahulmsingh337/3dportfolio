import { useEffect, useRef, useState } from "react";

const WORDS = ["Build", "Migrate", "Optimise", "Deploy"];

export default function LoadingScreen({ onComplete }) {
  const [count, setCount]     = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const t0 = useRef(performance.now());

  useEffect(() => {
    let raf;
    const tick = now => {
      const pct = Math.min(100, Math.floor(((now - t0.current) / 2000) * 100));
      setCount(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 300);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div id="loader" style={{
      position:"fixed", inset:0, zIndex:9999,
      background:"#020617",
      display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      <div style={{
        position:"absolute", top:28, left:36,
        fontFamily:"'JetBrains Mono',monospace",
        fontSize:11, letterSpacing:"0.3em",
        color:"rgba(255,255,255,0.25)", textTransform:"uppercase",
      }}>
        Portfolio · 2026
      </div>

      <div style={{
        fontFamily:"'Fraunces',serif", fontStyle:"italic",
        fontSize:"clamp(48px,10vw,96px)",
        color:"#fff", lineHeight:1,
        textAlign:"center",
        textShadow:"0 0 40px rgba(99,102,241,0.4)",
        transition:"opacity 0.25s",
      }}>
        {WORDS[wordIdx]}
      </div>

      <div style={{
        position:"absolute", bottom:48, right:44,
        fontFamily:"'JetBrains Mono',monospace",
        fontSize:"clamp(48px,8vw,100px)",
        color:"#fff", opacity:0.06, lineHeight:1,
        letterSpacing:"-3px",
      }}>
        {String(count).padStart(3,"0")}
      </div>

      {/* Progress bar */}
      <div style={{
        position:"absolute", bottom:0, left:0,
        height:2, width:`${count}%`,
        background:"linear-gradient(90deg,#6366F1,#22D3EE)",
        boxShadow:"0 0 12px rgba(99,102,241,0.6)",
        transition:"width 0.04s linear",
      }}/>
    </div>
  );
}
