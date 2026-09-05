import { useEffect, useRef } from "react";

// Lightweight mobile shader — simple gradient + glow
const FRAG_MOBILE = `
precision mediump float;
uniform vec2  u_res;
uniform vec2  u_mouse;
uniform float u_time;

float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5); }

float noise(vec2 p){
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}

float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.+vec2(1.7,9.2); a*=.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy/u_res;
  float t  = u_time*.10;

  float f  = fbm(uv*2.+t);
  float f2 = fbm(uv*1.5+vec2(f)+t*.8);

  vec3 col = vec3(0.01,0.02,0.06);
  col += vec3(0.06,0.04,0.28)*smoothstep(.2,.6,f2);
  col += vec3(0.0 ,0.22,0.65)*smoothstep(.45,.8,f2)*.7;
  col *= .75;

  vec2  md = uv - u_mouse/u_res;
  md.y = -md.y;
  float d  = length(md);
  col += vec3(.12,.10,.55)*exp(-d*d*1.5)*.6;
  col += vec3(.05,.40,.80)*exp(-d*d*5.)*.5;
  col += vec3(.60,.80,1.)*exp(-d*d*20.)*.4;

  float vig = 1.-smoothstep(.3,.9,length(uv-.5)*1.5);
  col *= vig;
  col  = col/(col+.9);
  col  = pow(col,vec3(.88));
  gl_FragColor = vec4(col,1.);
}
`;

// Full quality desktop shader
const FRAG_DESKTOP = `
precision highp float;
uniform vec2  u_res;
uniform vec2  u_mouse;
uniform float u_time;

#define N 7

mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
vec2 hash22(vec2 p){
  p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));
  return -1.+2.*fract(sin(p)*43758.5453);
}
float gnoise(vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(dot(hash22(i),f),dot(hash22(i+vec2(1,0)),f-vec2(1,0)),u.x),
             mix(dot(hash22(i+vec2(0,1)),f-vec2(0,1)),dot(hash22(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p,float t){
  float v=0.,a=.55,freq=1.;mat2 R=rot(.37);
  for(int i=0;i<N;i++){v+=a*gnoise(p*freq+t*(.12-.02*float(i)));p=R*p;freq*=2.07;a*=.47;}
  return v;
}
vec2 curl2(vec2 p,float t){
  float e=.003;
  return vec2((fbm(p+vec2(0,e),t)-fbm(p,t))/e,-(fbm(p+vec2(e,0),t)-fbm(p,t))/e);
}
float warpFbm(vec2 p,float t){
  vec2 q=vec2(fbm(p,t),fbm(p+vec2(5.2,1.3),t*.9));
  vec2 r=vec2(fbm(p+4.*q+vec2(1.7,9.2),t*.75),fbm(p+4.*q+vec2(8.3,2.8),t*.6));
  vec2 c=curl2(p+2.5*r,t*.5);
  return fbm(p+3.*r+c*.8,t*.4);
}
vec3 pal(float t,float tm){
  vec3 c=vec3(0.);
  c+=vec3(.01,.015,.06)*smoothstep(-.1,.25,t);
  c+=vec3(.06,.04,.28)*smoothstep(.15,.50,t);
  c+=vec3(0.,.28,.72)*smoothstep(.38,.70,t)*.9;
  c+=vec3(.42,.08,.72)*smoothstep(.50,.80,t)*.55;
  c+=vec3(.35,.60,1.)*smoothstep(.65,.88,t)*.60;
  c+=vec3(.85,.92,1.)*smoothstep(.80,1.,t)*.45;
  return c;
}
vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  float asp=u_res.x/u_res.y;
  vec2 st=uv*vec2(asp,1.);
  float tm=u_time;
  vec2 mst=vec2(u_mouse.x/u_res.x*asp,1.-u_mouse.y/u_res.y);
  vec2 md=st-mst; float mDist=length(md);

  float field=warpFbm(st*1.1,tm);
  float f01=clamp(field*.5+.5,0.,1.);
  vec3 col=pal(f01,tm);

  float fine=abs(sin(warpFbm(st*2.2+.5,tm)*18.+tm));
  fine=pow(1.-fine,10.); col+=vec3(.25,.55,1.)*fine*.18;
  float ribbon=abs(sin(warpFbm(st*.7,tm*.8)*7.+tm*.6));
  ribbon=pow(1.-ribbon,6.); col+=vec3(.15,.3,.85)*ribbon*.12;

  col+=vec3(.12,.10,.55)*exp(-mDist*mDist*.65)*.80;
  col+=vec3(.08,.35,.90)*exp(-mDist*mDist*3.5)*.75;
  col+=vec3(.10,.65,.95)*exp(-mDist*mDist*12.)*.65;
  col+=vec3(.75,.90,1.)*exp(-mDist*mDist*45.)*.90;
  col+=vec3(1.,1.,1.)*exp(-mDist*mDist*150.)*.55;

  float r0=exp(-pow(mDist-.10,2.)*180.)*.40;
  float r1=exp(-pow(mDist-.22,2.)*100.)*.26;
  float r2=exp(-pow(mDist-.38,2.)*65.)*.16;
  col+=vec3(.40,.30,1.)*r0+vec3(.20,.50,.95)*r1+vec3(.10,.40,.80)*r2;

  float dv=length(uv-.5);
  col*=1.-smoothstep(.28,.95,dv*1.55);
  col*=.975+.025*sin(uv.y*u_res.y*.9+tm*4.);
  col*=.72; col=aces(col);
  col=col*col*(3.-2.*col);
  col=pow(col,vec3(.82));
  gl_FragColor=vec4(col,1.);
}
`;

const VERT = `attribute vec2 a_pos;void main(){gl_Position=vec4(a_pos,0.,1.);}`;

function buildGL(canvas, fragSrc) {
  const gl = canvas.getContext("webgl", {
    antialias: false, alpha: false,
    powerPreference: "high-performance",
    failIfMajorPerformanceCaveat: false,
  });
  if (!gl) return null;

  const mk = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
      console.warn(gl.getShaderInfoLog(s));
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, mk(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, fragSrc));
  gl.linkProgram(prog); gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
  const aloc = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(aloc);
  gl.vertexAttribPointer(aloc, 2, gl.FLOAT, false, 0, 0);

  return {
    gl,
    uRes:   gl.getUniformLocation(prog, "u_res"),
    uMouse: gl.getUniformLocation(prog, "u_mouse"),
    uTime:  gl.getUniformLocation(prog, "u_time"),
  };
}

export default function AnimatedBackground() {
  const cvs   = useRef(null);
  const mouse  = useRef({ x: 0, y: 0 });
  const tgt    = useRef({ x: 0, y: 0 });
  const raf    = useRef(null);

  useEffect(() => {
    const canvas = cvs.current;

    // Detect mobile — use lightweight shader
    const isMobile = window.innerWidth < 768 ||
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

    // Mobile: lower resolution cap for performance
    const DPR_CAP = isMobile ? 1.0 : 1.5;
    const LERP    = isMobile ? 0.06 : 0.032;
    const fragSrc = isMobile ? FRAG_MOBILE : FRAG_DESKTOP;

    const ctx = buildGL(canvas, fragSrc);
    if (!ctx) return;
    const { gl, uRes, uMouse, uTime } = ctx;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = "100vw";
      canvas.style.height = "100vh";
      gl.viewport(0, 0, canvas.width, canvas.height);
      tgt.current   = { x: canvas.width / 2, y: canvas.height / 2 };
      mouse.current = { x: canvas.width / 2, y: canvas.height / 2 };
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const dpr = () => Math.min(window.devicePixelRatio || 1, DPR_CAP);
    const mv  = e => { mouse.current = { x: e.clientX * dpr(), y: e.clientY * dpr() }; };
    const tc  = e => {
      mouse.current = {
        x: e.touches[0].clientX * dpr(),
        y: e.touches[0].clientY * dpr(),
      };
    };
    window.addEventListener("mousemove", mv,  { passive: true });
    window.addEventListener("touchmove",  tc,  { passive: true });

    // Mobile: throttle to ~30fps to save battery
    const TARGET_FPS = isMobile ? 30 : 60;
    const FRAME_MS   = 1000 / TARGET_FPS;
    let lastFrame = 0;
    const t0 = performance.now();

    const draw = (now) => {
      raf.current = requestAnimationFrame(draw);
      if (now - lastFrame < FRAME_MS) return;
      lastFrame = now;

      tgt.current.x += (mouse.current.x - tgt.current.x) * LERP;
      tgt.current.y += (mouse.current.y - tgt.current.y) * LERP;

      const t = (now - t0) / 1000;
      gl.uniform2f(uRes,   canvas.width, canvas.height);
      gl.uniform2f(uMouse, tgt.current.x, tgt.current.y);
      gl.uniform1f(uTime,  t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("touchmove", tc);
    };
  }, []);

  return (
    <canvas ref={cvs} style={{
      position: "fixed", inset: 0, zIndex: -10,
      display: "block", background: "#020617",
    }}/>
  );
}
