import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_time;

#define PI 3.14159265359
#define TAU 6.28318530718

// ── Utilities ─────────────────────────────────────────────────
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

vec2 hash2(vec2 p) {
  p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}

// Smooth noise
float snoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(
    mix(dot(hash2(i+vec2(0,0)),f-vec2(0,0)),
        dot(hash2(i+vec2(1,0)),f-vec2(1,0)), u.x),
    mix(dot(hash2(i+vec2(0,1)),f-vec2(0,1)),
        dot(hash2(i+vec2(1,1)),f-vec2(1,1)), u.x), u.y);
}

// Curl noise — gives fluid flow without divergence
vec2 curl(vec2 p, float t) {
  float eps = 0.01;
  float n1 = snoise(vec2(p.x, p.y + eps) + t);
  float n2 = snoise(vec2(p.x, p.y - eps) + t);
  float n3 = snoise(vec2(p.x + eps, p.y) + t);
  float n4 = snoise(vec2(p.x - eps, p.y) + t);
  float x = (n1 - n2) / (2.0 * eps);
  float y = (n3 - n4) / (2.0 * eps);
  return normalize(vec2(x, y));
}

// FBM with curl-warped domain
float fbm(vec2 p, float t) {
  float v = 0.0, a = 0.6;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 7; i++) {
    v += a * snoise(p + t * 0.15);
    p  = rot * p * 2.1 + shift;
    a *= 0.48;
  }
  return v;
}

// Deep palette — midnight to vivid
vec3 palette(float t, vec2 uv) {
  // Base: deep navy
  vec3 col = vec3(0.01, 0.02, 0.06);
  
  // Layer 1: indigo veins
  col += vec3(0.18, 0.12, 0.55) * smoothstep(0.0, 0.6, t);
  
  // Layer 2: electric cyan highlights
  col += vec3(0.0, 0.55, 0.75) * smoothstep(0.4, 0.85, t) * 0.7;
  
  // Layer 3: violet bloom
  col += vec3(0.45, 0.1, 0.65) * smoothstep(0.55, 1.0, t) * 0.5;
  
  // Layer 4: white core at peaks
  col += vec3(0.6, 0.75, 1.0) * smoothstep(0.78, 1.0, t) * 0.35;
  
  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float asp = u_resolution.x / u_resolution.y;
  vec2 st = uv * vec2(asp, 1.0);
  
  // Mouse in screen space
  vec2 mouse = u_mouse / u_resolution;
  mouse.y = 1.0 - mouse.y;
  mouse.x *= asp;
  
  float t = u_time * 0.12;

  // ── Flow field — triple warped FBM ───────────────────────
  // First warp pass
  vec2 q = vec2(
    fbm(st + vec2(0.0, 0.0), t),
    fbm(st + vec2(5.2, 1.3), t * 0.9)
  );
  
  // Second warp pass
  vec2 r = vec2(
    fbm(st + 3.5*q + vec2(1.7, 9.2), t * 0.7),
    fbm(st + 3.5*q + vec2(8.3, 2.8), t * 0.6)
  );
  
  // Third warp pass — extra depth
  vec2 s = vec2(
    fbm(st + 2.8*r + vec2(3.1, 5.7), t * 0.5),
    fbm(st + 2.8*r + vec2(6.4, 1.1), t * 0.4)
  );
  
  float field = fbm(st + 3.0*s, t * 0.3);
  
  // ── Curl-based flow lines ────────────────────────────────
  vec2 flowDir = curl(st * 1.5 + r, t * 0.2);
  float flow = dot(flowDir, normalize(vec2(1.0, 0.5)));
  field += flow * 0.18;
  
  // ── Mouse interaction ────────────────────────────────────
  vec2  md    = st - mouse;
  float dist  = length(md);
  
  // Wide aurora bloom around cursor
  float bloom = exp(-dist * dist * 1.8) * 0.7;
  
  // Medium glow ring
  float glow  = exp(-dist * dist * 6.0) * 0.5;
  
  // Sharp bright core
  float core  = exp(-dist * dist * 22.0) * 0.8;
  
  // Ripple rings emanating outward
  float ring1 = exp(-pow(dist - 0.12, 2.0) * 120.0) * 0.35;
  float ring2 = exp(-pow(dist - 0.24, 2.0) * 80.0)  * 0.2;
  float ring3 = exp(-pow(dist - 0.38, 2.0) * 60.0)  * 0.12;
  
  // Push flow field toward cursor
  field += bloom * 0.65;
  field += glow  * 0.35;
  
  // ── Base colour from field ───────────────────────────────
  float f = field * 0.5 + 0.5; // remap to [0,1]
  vec3 col = palette(f, uv);
  
  // ── Cursor light contributions ───────────────────────────
  // Bloom: wide indigo/violet halo
  col += vec3(0.22, 0.18, 0.80) * bloom * 0.65;
  
  // Glow: cyan mid
  col += vec3(0.05, 0.65, 0.90) * glow  * 0.55;
  
  // Core: bright white-cyan spike
  col += vec3(0.7,  0.88, 1.0)  * core  * 0.90;
  
  // Rings: concentric indigo
  col += vec3(0.35, 0.28, 1.0)  * ring1;
  col += vec3(0.20, 0.45, 0.85) * ring2;
  col += vec3(0.10, 0.30, 0.70) * ring3;
  
  // ── Animated energy streamlines ─────────────────────────
  // Thin bright veins following flow
  float vein = abs(sin(field * 12.0 + t * 1.5));
  vein = pow(1.0 - vein, 8.0); // sharpen
  col += vec3(0.3, 0.6, 1.0) * vein * 0.12;
  
  // ── Particle sparkles ────────────────────────────────────
  vec2 grid = fract(st * 18.0) - 0.5;
  vec2 cell = floor(st * 18.0);
  float sparkRnd = hash(cell + floor(t * 2.0));
  if (sparkRnd > 0.94) {
    float sparkD = length(grid);
    float spark = exp(-sparkD * sparkD * 60.0);
    col += vec3(0.7, 0.85, 1.0) * spark * 0.45 * (0.5 + 0.5 * sin(t * 8.0 + sparkRnd * TAU));
  }
  
  // ── Colour grading ───────────────────────────────────────
  // Darken base so content pops
  col *= 0.68;
  
  // Vignette — stronger at edges
  float vig = length(uv - 0.5);
  col *= 1.0 - smoothstep(0.35, 1.05, vig * 1.6);
  
  // Subtle horizontal scan shimmer
  float scan = 0.97 + 0.03 * sin(uv.y * u_resolution.y * 0.8 + t * 3.0);
  col *= scan;
  
  // Tone map (ACES-inspired)
  col = col * (2.51 * col + 0.03) / (col * (2.43 * col + 0.59) + 0.14);
  col = clamp(col, 0.0, 1.0);
  
  // Gamma
  col = pow(col, vec3(0.85));
  
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: 0, y: 0 });
  const target    = useRef({ x: 0, y: 0 });
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        console.error(gl.getShaderInfoLog(s));
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER,   VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes   = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uTime  = gl.getUniformLocation(prog, "u_time");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = "100vw";
      canvas.style.height = "100vh";
      gl.viewport(0, 0, canvas.width, canvas.height);
      target.current = { x: canvas.width/2, y: canvas.height/2 };
      mouse.current  = { x: canvas.width/2, y: canvas.height/2 };
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = e => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      mouse.current.x = e.clientX * dpr;
      mouse.current.y = e.clientY * dpr;
    };
    const onTouch = e => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      mouse.current.x = e.touches[0].clientX * dpr;
      mouse.current.y = e.touches[0].clientY * dpr;
    };
    window.addEventListener("mousemove", onMove,  { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    const start = performance.now();
    const LERP  = 0.038; // slower = more cinematic drag

    const render = () => {
      target.current.x += (mouse.current.x - target.current.x) * LERP;
      target.current.y += (mouse.current.y - target.current.y) * LERP;
      const elapsed = (performance.now() - start) / 1000;
      gl.uniform2f(uRes,   canvas.width, canvas.height);
      gl.uniform2f(uMouse, target.current.x, target.current.y);
      gl.uniform1f(uTime,  elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("touchmove",  onTouch);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position:"fixed", inset:0, zIndex:-10,
      display:"block", background:"#020617",
    }}/>
  );
}
