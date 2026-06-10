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

// ── hash / noise ──────────────────────────────────
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
        dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
    mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
        dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p  = p * 2.0 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

// ── palette ───────────────────────────────────────
vec3 palette(float t) {
  vec3 a = vec3(0.05, 0.04, 0.12);
  vec3 b = vec3(0.06, 0.05, 0.18);
  vec3 c = vec3(0.40, 0.30, 0.60);
  vec3 d = vec3(0.00, 0.20, 0.50);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 uv  = gl_FragCoord.xy / u_resolution;
  vec2 uvm = uv * vec2(u_resolution.x / u_resolution.y, 1.0);

  // Mouse in [0,1] space, smoothed
  vec2 mouse = u_mouse / u_resolution;
  mouse.y    = 1.0 - mouse.y;

  float t = u_time * 0.18;

  // ── Base FBM field ────────────────────────────
  vec2 q = vec2(fbm(uvm + t), fbm(uvm + vec2(1.3, 6.7) + t * 0.8));
  vec2 r = vec2(fbm(uvm + 4.0 * q + vec2(1.7, 9.2) + t * 0.6),
                fbm(uvm + 4.0 * q + vec2(8.3, 2.8) + t * 0.5));
  float field = fbm(uvm + 4.0 * r);

  // ── Mouse glow ────────────────────────────────
  vec2  md   = uvm - mouse * vec2(u_resolution.x / u_resolution.y, 1.0);
  float dist = length(md);
  float glow = exp(-dist * dist * 2.8);          // wide soft glow
  float sharp= exp(-dist * dist * 14.0);          // tight bright core

  // Ripple ring emanating from cursor
  float ring = exp(-pow(dist - 0.18, 2.0) * 80.0) * 0.4;

  // Shift the field toward cursor
  field += glow * 0.55;

  // ── Colour ────────────────────────────────────
  vec3 col = palette(field * 0.6 + t * 0.12);

  // Cursor bloom colours
  vec3 bloomCol  = vec3(0.38, 0.42, 1.0);   // indigo
  vec3 coreCol   = vec3(0.55, 0.75, 1.0);   // bright cyan-white
  vec3 ringCol   = vec3(0.25, 0.55, 1.0);

  col += bloomCol * glow  * 0.55;
  col += coreCol  * sharp * 0.90;
  col += ringCol  * ring;

  // Ambient aurora streaks
  float aurora = smoothstep(0.3, 0.7, fbm(vec2(uvm.x * 3.0, t * 0.4)));
  col += vec3(0.05, 0.02, 0.18) * aurora * 0.4;

  // Darken overall so content pops
  col *= 0.72;

  // Vignette
  float vig = 1.0 - smoothstep(0.35, 1.1, length(uv - 0.5) * 1.5);
  col *= vig;

  // Tone-map
  col = col / (col + 0.9);
  col = pow(col, vec3(0.88));

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: 0, y: 0 });
  const target    = useRef({ x: 0, y: 0 });   // smoothed
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    // ── compile shaders ───────────────────────────
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER,   VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]),
      gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uRes   = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uTime  = gl.getUniformLocation(prog, "u_time");

    // ── resize ────────────────────────────────────
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = "100vw";
      canvas.style.height = "100vh";
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── mouse / touch tracking ────────────────────
    const onMove = e => {
      mouse.current.x = e.clientX * (canvas.width  / window.innerWidth);
      mouse.current.y = e.clientY * (canvas.height / window.innerHeight);
    };
    const onTouch = e => {
      const t = e.touches[0];
      mouse.current.x = t.clientX * (canvas.width  / window.innerWidth);
      mouse.current.y = t.clientY * (canvas.height / window.innerHeight);
    };
    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("touchmove",  onTouch, { passive: true });

    // Initialise target to centre
    target.current = { x: canvas.width / 2, y: canvas.height / 2 };
    mouse.current  = { x: canvas.width / 2, y: canvas.height / 2 };

    // ── render loop ───────────────────────────────
    const start = performance.now();
    const LERP  = 0.055;   // smoothing (lower = more lag = dreamy)

    const render = () => {
      // Smooth mouse
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
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0, zIndex: -10,
        display: "block", background: "#020617",
      }}
    />
  );
}
