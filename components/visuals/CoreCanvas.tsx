"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import { clamp, lerp, smoothstep } from "@/lib/anim";

type Particle = { sx: number; sy: number; ring: number; a0: number; R: number; delay: number; size: number; phase: number; sp: number };

const RINGS = [0.065, 0.14, 0.215, 0.295, 0.365];     // radius as a fraction of min(width, height)
const SHARE = [0.1, 0.16, 0.22, 0.26, 0.26];        // share of particles per ring
const WARM = [255, 140, 92];
const RING_COL = [[200, 170, 255], [170, 130, 255], [140, 130, 255], [110, 150, 255], [91, 140, 255]];
const BUCKETS = 16;
const COLORS = RING_COL.map((c) => Array.from({ length: BUCKETS }, (_, b) => {
  const t = b / (BUCKETS - 1);
  return `rgba(${Math.round(lerp(WARM[0], c[0], t))},${Math.round(lerp(WARM[1], c[1], t))},${Math.round(lerp(WARM[2], c[2], t))},${lerp(0.62, 0.95, t).toFixed(2)})`;
}));

function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Scroll-scrubbed particle morph: a chaotic cloud of "legacy" nodes (warm) is remediated into concentric
 * "clean core" rings (cool) as `progress` goes 0 → 1. Canvas 2D, DPR-capped, one draw loop that only runs
 * while the canvas is on screen; static final frame for reduced motion.
 */
export default function CoreCanvas({ progress }: { progress: MutableRefObject<number> }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 1, H = 1, S = 1, cx = 0, cy = 0, raf = 0, visible = false, disp = reduced ? 1 : 0;
    let parts: Particle[] = [];
    let X = new Float32Array(0), Y = new Float32Array(0), T = new Float32Array(0);
    const ringStart: number[] = [], ringCount: number[] = [];

    const build = () => {
      const r = cv.getBoundingClientRect();
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      S = Math.min(W, H);
      const wide = W >= 900;
      cx = wide ? W * 0.66 : W * 0.5; cy = wide ? H * 0.5 : H * 0.4;
      const N = W < 640 ? 320 : W < 1024 ? 520 : 780;
      const rnd = rng(7);
      const g = () => (rnd() + rnd() + rnd() - 1.5) / 1.5;
      const clumps = Array.from({ length: 7 }, () => ({ x: rnd() * W, y: rnd() * H, s: 0.05 + rnd() * 0.08 }));
      parts = []; ringStart.length = 0; ringCount.length = 0;
      SHARE.forEach((share, ring) => {
        const count = Math.round(N * share);
        ringStart.push(parts.length); ringCount.push(count);
        for (let k = 0; k < count; k++) {
          const c = clumps[(rnd() * clumps.length) | 0];
          const loose = rnd() < 0.22;
          parts.push({
            sx: loose ? rnd() * W : c.x + g() * W * c.s * 2.2, sy: loose ? rnd() * H : c.y + g() * H * c.s * 2.2,
            ring, a0: (k / count) * Math.PI * 2 + (rnd() - 0.5) * 0.08, R: RINGS[ring] * S * (1 + (rnd() - 0.5) * 0.03),
            delay: rnd(), size: (ring === 0 ? 1.5 : 1.1) + rnd() * 1.3, phase: rnd() * 6.28, sp: 0.5 + rnd() * 0.8,
          });
        }
      });
      X = new Float32Array(parts.length); Y = new Float32Array(parts.length); T = new Float32Array(parts.length);
    };

    const draw = (time: number, p: number) => {
      ctx.clearRect(0, 0, W, H);
      const n = parts.length;
      const zoom = 1 + smoothstep(clamp((p - 0.8) / 0.2)) * 0.18;
      const core = smoothstep(clamp((p - 0.45) / 0.4));

      if (core > 0.01) {
        const rad = S * 0.34 * zoom;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(170,140,255,${(0.55 * core).toFixed(3)})`);
        g.addColorStop(0.4, `rgba(91,140,255,${(0.18 * core).toFixed(3)})`);
        g.addColorStop(1, "rgba(91,140,255,0)");
        ctx.fillStyle = g; ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
      }

      for (let i = 0; i < n; i++) {
        const q = parts[i];
        const t = ease(clamp((p - (0.14 + q.delay * 0.4)) / 0.3));
        const ang = q.a0 + time * 0.00018 * (q.ring % 2 ? 1 : -1) * (1 + q.ring * 0.35) * t;
        const tx = cx + Math.cos(ang) * q.R * zoom, ty = cy + Math.sin(ang) * q.R * zoom * 0.86;
        const dx = Math.sin(time * 0.0006 * q.sp + q.phase) * 14 * (1 - t), dy = Math.cos(time * 0.0005 * q.sp + q.phase) * 14 * (1 - t);
        X[i] = lerp(q.sx + dx, tx, t); Y[i] = lerp(q.sy + dy, ty, t); T[i] = t;
      }

      // legacy links: tangled, warm, fade as nodes settle
      const buckets = [new Path2D(), new Path2D(), new Path2D()];
      for (let i = 0; i < n; i += 2) {
        const j = (i * 7 + 13) % n;
        const a = 1 - Math.max(T[i], T[j]);
        if (a < 0.15) continue;
        const b = buckets[a > 0.7 ? 2 : a > 0.4 ? 1 : 0];
        b.moveTo(X[i], Y[i]); b.lineTo(X[j], Y[j]);
      }
      ctx.lineWidth = 0.7;
      ["rgba(255,150,110,0.05)", "rgba(255,150,110,0.1)", "rgba(255,150,110,0.16)"].forEach((s, k) => { ctx.strokeStyle = s; ctx.stroke(buckets[k]); });

      // ring links: clean, cool, appear as rings form
      const ringAlpha = smoothstep(clamp((p - 0.55) / 0.3));
      if (ringAlpha > 0.02) {
        const rp = new Path2D();
        ringStart.forEach((s, r) => {
          const c = ringCount[r];
          for (let k = 0; k < c; k++) {
            const i = s + k, j = s + ((k + 1) % c);
            if (Math.min(T[i], T[j]) < 0.7) continue;
            rp.moveTo(X[i], Y[i]); rp.lineTo(X[j], Y[j]);
          }
        });
        ctx.strokeStyle = `rgba(130,160,255,${(0.24 * ringAlpha).toFixed(3)})`; ctx.lineWidth = 0.8; ctx.stroke(rp);
      }

      const sz = W < 640 ? 0.9 : 1;
      for (let i = 0; i < n; i++) {
        const q = parts[i];
        const s = q.size * (0.85 + T[i] * 0.5) * sz;
        ctx.fillStyle = COLORS[q.ring][Math.min(BUCKETS - 1, (T[i] * (BUCKETS - 1)) | 0)];
        ctx.beginPath(); ctx.arc(X[i], Y[i], s, 0, 6.2832); ctx.fill();
      }

      // satellites: "released APIs" orbiting the finished core
      const sat = smoothstep(clamp((p - 0.72) / 0.2));
      if (sat > 0.01) {
        for (let s = 0; s < 5; s++) {
          const a = time * 0.0004 * (1 + s * 0.2) + s * 1.26;
          const rr = S * (0.46 + (s % 2) * 0.05) * zoom;
          const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr * 0.86;
          ctx.fillStyle = `rgba(150,180,255,${(0.16 * sat).toFixed(3)})`; ctx.beginPath(); ctx.arc(x, y, 11, 0, 6.2832); ctx.fill();
          ctx.fillStyle = `rgba(215,228,255,${sat.toFixed(3)})`; ctx.beginPath(); ctx.arc(x, y, 3.2, 0, 6.2832); ctx.fill();
        }
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      disp += (progress.current - disp) * 0.08;
      draw(now, disp);
    };
    const start = () => { if (!raf && !reduced) raf = requestAnimationFrame(frame); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    build();
    if (reduced) draw(0, 1);
    const ro = new ResizeObserver(() => { build(); if (reduced) draw(0, 1); });
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); }, { rootMargin: "100px" });
    io.observe(cv);
    const onVis = () => { if (document.hidden) stop(); else if (visible) start(); };
    document.addEventListener("visibilitychange", onVis);

    return () => { stop(); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, [progress]);

  return <canvas ref={ref} className="cs-canvas" aria-hidden="true" />;
}
