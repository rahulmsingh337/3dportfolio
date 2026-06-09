import { useEffect, useRef } from "react";
import { useScroll, useSpring } from "motion/react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scrollSmooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let width, height;
    const GRID = 80;
    let particles = [], signals = [], gridNodes = [];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      gridNodes = [];
      for (let x = 0; x < width + GRID; x += GRID)
        for (let y = 0; y < height + GRID; y += GRID)
          if (Math.random() > 0.85) gridNodes.push({ x, y, pulse: Math.random() * Math.PI });

      particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 2 + 1.5,
        baseOpacity: Math.random() * 0.35 + 0.15,
      }));
    };

    const createSignal = () => {
      if (signals.length >= 40 || !gridNodes.length) return;
      const n = gridNodes[Math.floor(Math.random() * gridNodes.length)];
      const dir = Math.random() > 0.5 ? "h" : "v";
      const off = (Math.random() > 0.5 ? 1 : -1) * GRID;
      signals.push({
        x: n.x, y: n.y,
        tx: dir === "h" ? n.x + off : n.x,
        ty: dir === "v" ? n.y + off : n.y,
        progress: 0, speed: 0.008 + Math.random() * 0.012,
        type: Math.random() > 0.5 ? "cyan" : "indigo",
      });
    };

    const animate = () => {
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      const scroll = scrollSmooth.get();
      const scrollOffset = scroll * 500;
      const hue = scroll * 60;

      // Grid
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,255,0.018)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += GRID) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
      for (let y = -(scrollOffset % GRID); y < height; y += GRID) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
      ctx.stroke();

      // Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.99; p.vy *= 0.99;
        if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.strokeStyle = `rgba(99,102,241,${0.1 - d / 1100})`;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }

        const mx = mouse.current.x - p.x, my = mouse.current.y - p.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 140) {
          const f = (140 - md) / 140;
          p.vx -= (mx / md) * f * 0.7; p.vy -= (my / md) * f * 0.7;
          ctx.globalAlpha = p.baseOpacity + f * 0.5;
        } else { ctx.globalAlpha = p.baseOpacity; }

        ctx.fillStyle = scroll > 0.5 ? "#22D3EE" : "#6366F1";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Vignette
      const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
      grad.addColorStop(0, "rgba(15,23,42,0)"); grad.addColorStop(1, "rgba(2,6,23,0.88)");
      ctx.fillStyle = grad; ctx.fillRect(0, 0, width, height);

      // Grid nodes
      gridNodes.forEach(n => {
        n.pulse += 0.03;
        const op = 0.04 + Math.sin(n.pulse) * 0.08;
        const s = 2.5 + Math.sin(n.pulse) * 1.5;
        ctx.fillStyle = `hsla(${240 + hue},70%,60%,${op})`;
        ctx.fillRect(n.x - s/2, n.y - (scrollOffset % height) - s/2, s, s);
      });

      // Signals
      if (Math.random() > 0.83) createSignal();
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.progress += s.speed;
        const cx = s.x + (s.tx - s.x) * s.progress;
        const cy = s.y + (s.ty - s.y) * s.progress - (scrollOffset % height);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - (scrollOffset % height));
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = s.type === "cyan"
          ? `hsla(${180+hue},70%,60%,0.3)` : `hsla(${240+hue},70%,60%,0.4)`;
        ctx.lineWidth = 1; ctx.globalAlpha = (1 - s.progress) * 0.6; ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#fff"; ctx.fillRect(cx - 1, cy - 1, 2, 2);
        if (s.progress >= 1) signals.splice(i, 1);
      }

      raf = requestAnimationFrame(animate);
    };

    const onMouse = e => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const onResize = () => init();
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", onResize);
    init(); raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [scrollSmooth]);

  return <canvas ref={canvasRef} style={{ position:"fixed",inset:0,zIndex:-10,width:"100vw",height:"100vh",background:"#020617" }} />;
}
