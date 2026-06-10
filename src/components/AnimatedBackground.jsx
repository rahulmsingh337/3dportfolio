import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: window.innerWidth/2, y: window.innerHeight/2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, raf;
    let particles = [], connections = [], orbs = [];
    let t = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initScene();
    };

    const initScene = () => {
      // Floating orbs (aurora blobs)
      orbs = Array.from({ length: 5 }, (_, i) => ({
        x: W * (0.1 + i * 0.2),
        y: H * (0.2 + Math.random() * 0.6),
        r: 180 + Math.random() * 220,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        hue: [240, 260, 200, 280, 220][i],
        phase: Math.random() * Math.PI * 2,
      }));

      // Particles
      particles = Array.from({ length: 120 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        hue: Math.random() > 0.5 ? 240 : 200,
        depth: Math.random(),
      }));
    };

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      // Deep background
      const bg = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W * 0.8);
      bg.addColorStop(0, "rgba(15,23,42,0.98)");
      bg.addColorStop(1, "rgba(2,6,23,1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── Aurora orbs ──
      orbs.forEach(o => {
        o.phase += 0.005;
        o.x += o.vx + Math.sin(o.phase * 0.7) * 0.3;
        o.y += o.vy + Math.cos(o.phase * 0.5) * 0.2;

        // Mouse attraction
        const dx = mouse.current.x - o.x;
        const dy = mouse.current.y - o.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 400) { o.vx += dx/d * 0.01; o.vy += dy/d * 0.01; }
        o.vx *= 0.98; o.vy *= 0.98;

        // Bounce
        if (o.x < -o.r) o.x = W + o.r;
        if (o.x > W+o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r;
        if (o.y > H+o.r) o.y = -o.r;

        const pulse = 0.04 + Math.sin(t + o.phase) * 0.02;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0,   `hsla(${o.hue},80%,60%,${pulse})`);
        g.addColorStop(0.4, `hsla(${o.hue+20},70%,50%,${pulse*0.5})`);
        g.addColorStop(1,   `hsla(${o.hue},60%,40%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI*2);
        ctx.fill();
      });

      // ── Grid ──
      ctx.strokeStyle = "rgba(99,102,241,0.04)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      const offX = (t * 20) % gridSize;
      const offY = (t * 10) % gridSize;
      ctx.beginPath();
      for (let x = -offX; x < W + gridSize; x += gridSize) {
        ctx.moveTo(x, 0); ctx.lineTo(x, H);
      }
      for (let y = -offY; y < H + gridSize; y += gridSize) {
        ctx.moveTo(0, y); ctx.lineTo(W, y);
      }
      ctx.stroke();

      // ── Particles + connections ──
      particles.forEach((p, i) => {
        // Depth-based parallax with mouse
        const mx = (mouse.current.x - W/2) / W;
        const my = (mouse.current.y - H/2) / H;
        const px = p.x + mx * p.depth * 30;
        const py = p.y + my * p.depth * 20;

        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        // Connections
        for (let j = i+1; j < particles.length; j++) {
          const q = particles[j];
          const qx = q.x + mx * q.depth * 30;
          const qy = q.y + my * q.depth * 20;
          const dx = px - qx, dy = py - qy;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 100) {
            ctx.globalAlpha = (1 - dist/100) * 0.12;
            ctx.strokeStyle = p.hue === 240
              ? `rgba(99,102,241,1)` : `rgba(34,211,238,1)`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(px, py); ctx.lineTo(qx, qy);
            ctx.stroke();
          }
        }
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.hue === 240 ? "#6366F1" : "#22D3EE";
        ctx.beginPath();
        ctx.arc(px, py, p.size * (0.5 + p.depth * 0.5), 0, Math.PI*2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // ── Mouse ripple ──
      const rippleR = 120 + Math.sin(t * 3) * 20;
      const rg = ctx.createRadialGradient(
        mouse.current.x, mouse.current.y, 0,
        mouse.current.x, mouse.current.y, rippleR
      );
      rg.addColorStop(0,   "rgba(99,102,241,0.08)");
      rg.addColorStop(0.5, "rgba(34,211,238,0.04)");
      rg.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, rippleR, 0, Math.PI*2);
      ctx.fill();

      // ── Vignette ──
      const vig = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*0.8);
      vig.addColorStop(0,   "rgba(2,6,23,0)");
      vig.addColorStop(0.7, "rgba(2,6,23,0.2)");
      vig.addColorStop(1,   "rgba(2,6,23,0.85)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    };

    const onMouse = e => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", resize);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0, zIndex: -10,
        width: "100vw", height: "100vh",
        background: "#020617",
      }}
    />
  );
}
