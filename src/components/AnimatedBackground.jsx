import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_position;
void main(){gl_Position=vec4(a_position,0.,1.);}
`;

const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform vec2  u_mouse;
uniform float u_time;

#define PI  3.14159265359
#define TAU 6.28318530718
#define N   7

// ── math helpers ─────────────────────────────────────────────
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}

float hash11(float p){return fract(sin(p)*43758.5453);}
float hash21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
vec2  hash22(vec2 p){
  p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));
  return -1.+2.*fract(sin(p)*43758.5453);
}

// Gradient noise
float gnoise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(dot(hash22(i),f),
                 dot(hash22(i+vec2(1,0)),f-vec2(1,0)),u.x),
             mix(dot(hash22(i+vec2(0,1)),f-vec2(0,1)),
                 dot(hash22(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);
}

// 7-octave FBM with rotating basis
float fbm(vec2 p,float t){
  float v=0.,a=.55,freq=1.;
  mat2 R=rot(.37);
  for(int i=0;i<N;i++){
    v+=a*gnoise(p*freq+t*(.12-.02*float(i)));
    p=R*p; freq*=2.07; a*=.47;
  }
  return v;
}

// Curl of scalar potential → divergence-free velocity field
vec2 curl2(vec2 p,float t){
  float e=.003;
  float f0=fbm(p,t);
  float fx=fbm(p+vec2(e,0.),t);
  float fy=fbm(p+vec2(0.,e),t);
  return vec2((fy-f0)/e,-(fx-f0)/e);
}

// ── domain-warped FBM ─────────────────────────────────────────
float warpFbm(vec2 p,float t){
  // pass 1
  vec2 q=vec2(fbm(p+vec2(0.,0.),t),
              fbm(p+vec2(5.2,1.3),t*.9));
  // pass 2
  vec2 r=vec2(fbm(p+4.*q+vec2(1.7,9.2),t*.75),
              fbm(p+4.*q+vec2(8.3,2.8),t*.6));
  // pass 3 — curl warp
  vec2 c=curl2(p+2.5*r,t*.5);
  // pass 4 — final
  return fbm(p+3.*r+c*.8,t*.4);
}

// ── film-quality palette ──────────────────────────────────────
vec3 pal(float t,float tm){
  // Five-stop grade:
  //  0.0  → absolute black
  //  0.2  → deep midnight navy
  //  0.45 → rich indigo
  //  0.68 → electric cobalt / cyan
  //  0.85 → violet-white bloom
  //  1.0  → pure white peak
  vec3 c = vec3(0.);
  c += vec3(0.01,0.015,0.06) * smoothstep(-0.1,0.25,t);
  c += vec3(0.06,0.04,0.28)  * smoothstep(0.15,0.50,t);
  c += vec3(0.0 ,0.28,0.72)  * smoothstep(0.38,0.70,t)*0.9;
  c += vec3(0.42,0.08,0.72)  * smoothstep(0.50,0.80,t)*0.55;
  c += vec3(0.35,0.60,1.00)  * smoothstep(0.65,0.88,t)*0.60;
  c += vec3(0.85,0.92,1.00)  * smoothstep(0.80,1.00,t)*0.45;
  // time-breathing hue drift
  float drift=sin(tm*.07)*0.06;
  c=mix(c,c.zyx*vec3(1.,0.8,1.),drift);
  return c;
}

// ── Voronoi for crystalline caustic streaks ───────────────────
vec2 voronoi(vec2 p){
  vec2 b=floor(p),f=fract(p);
  float md=8.;vec2 mg=vec2(0.);
  for(int j=-2;j<=2;j++)for(int i=-2;i<=2;i++){
    vec2 g=vec2(i,j);
    vec2 o=hash22(b+g)*.5+.5;
    o=.5+.5*sin(u_time*.4+TAU*o);
    float d=length(g+o-f);
    if(d<md){md=d;mg=g+o-f;}
  }
  return vec2(md,dot(mg,mg));
}

// ── ACES tone map ─────────────────────────────────────────────
vec3 aces(vec3 x){
  return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);
}

void main(){
  vec2 uv  = gl_FragCoord.xy / u_res;
  float asp= u_res.x/u_res.y;
  vec2 st  = uv*vec2(asp,1.);
  vec2 ctr = vec2(asp*.5,.5);

  float tm = u_time;

  // ── Mouse ─────────────────────────────────────────────────
  vec2 mst = vec2(u_mouse.x/u_res.x*asp, 1.-u_mouse.y/u_res.y);
  vec2 md  = st-mst;
  float mDist = length(md);
  float mAng  = atan(md.y,md.x);

  // ── Primary flow field ────────────────────────────────────
  float field = warpFbm(st*1.1,tm);
  float f01   = field*.5+.5;

  // ── Voronoi caustics overlay ──────────────────────────────
  vec2 vp = st*2.5+vec2(tm*.04,tm*.03);
  vec2 vor= voronoi(vp);
  float caustic = exp(-vor.x*5.)*0.22;
  float causticEdge = smoothstep(.35,.42,vor.x) - smoothstep(.42,.52,vor.x);
  f01 += caustic*.18 + causticEdge*.06;
  f01  = clamp(f01,0.,1.);

  // ── Base colour ───────────────────────────────────────────
  vec3 col = pal(f01, tm);

  // Caustic light leak (cyan-white)
  col += vec3(.1,.6,.9)*caustic*1.1;
  col += vec3(.4,.5,1.)*causticEdge*.35;

  // ── Flow energy lines (lambda detail) ────────────────────
  // Fine: high-frequency ridges
  float fine = abs(sin(warpFbm(st*2.2+.5,tm)*18.+tm));
  fine = pow(1.-fine,10.);
  col += vec3(.25,.55,1.)*fine*.18;

  // Coarse: low-frequency ribbons
  float ribbon = abs(sin(warpFbm(st*.7,tm*.8)*7.+tm*.6));
  ribbon = pow(1.-ribbon,6.);
  col += vec3(.15,.3,.85)*ribbon*.12;

  // ── Cursor — 5-layer lighting system ─────────────────────
  // 1. Outer aurora (very wide, low intensity)
  float aura  = exp(-mDist*mDist*.65);
  col += vec3(.12,.10,.55)*aura*.80;

  // 2. Mid bloom
  float bloom = exp(-mDist*mDist*3.5);
  col += vec3(.08,.35,.90)*bloom*.75;

  // 3. Inner glow
  float glow  = exp(-mDist*mDist*12.);
  col += vec3(.10,.65,.95)*glow*.65;

  // 4. Bright core
  float core  = exp(-mDist*mDist*45.);
  col += vec3(.75,.90,1.00)*core*.90;

  // 5. Hot-spot specular
  float spec  = exp(-mDist*mDist*150.);
  col += vec3(1.00,1.00,1.00)*spec*.55;

  // ── Concentric ripple rings ───────────────────────────────
  float rings[4];
  rings[0] = exp(-pow(mDist-.10,2.)*180.)*.40;
  rings[1] = exp(-pow(mDist-.22,2.)*100.)*.26;
  rings[2] = exp(-pow(mDist-.38,2.)* 65.)*.16;
  rings[3] = exp(-pow(mDist-.58,2.)* 40.)*.09;
  vec3 rc0=vec3(.40,.30,1.0);
  vec3 rc1=vec3(.20,.50,.95);
  vec3 rc2=vec3(.10,.40,.80);
  vec3 rc3=vec3(.05,.25,.65);
  col += rc0*rings[0]+rc1*rings[1]+rc2*rings[2]+rc3*rings[3];

  // ── Angular light spikes from cursor ─────────────────────
  float numSpikes = 6.;
  float spikeAng  = mod(mAng+tm*.08, TAU/numSpikes);
  float spike = exp(-pow(abs(spikeAng-TAU/numSpikes*.5),2.)*80.);
  spike *= exp(-mDist*mDist*1.2);
  col += vec3(.30,.55,1.)*spike*.20;

  // ── Cursor-distorted field boost ─────────────────────────
  // Flow near cursor gets a saturation lift
  float proximity = exp(-mDist*mDist*2.5);
  col = mix(col, col*vec3(.6,.8,1.8)*1.25, proximity*.35);

  // ── Sparkle field ────────────────────────────────────────
  // Two layers — fine + coarse
  for(int gi=0;gi<2;gi++){
    float sc = gi==0 ? 22. : 10.;
    vec2 sgrid = fract(st*sc)-.5;
    vec2 scell = floor(st*sc);
    float rnd  = hash21(scell+float(gi)*37.+floor(tm*1.5)*11.);
    if(rnd>.90){
      float sd   = length(sgrid);
      float si   = exp(-sd*sd*55.)*(.4+.6*sin(tm*6.+rnd*TAU));
      float sz   = gi==0?.30:.55;
      col += vec3(.7,.87,1.)*si*sz*(1.+proximity*.8);
    }
  }

  // ── Depth vignette (soft + hard) ─────────────────────────
  float dv = length(uv-.5);
  float vig = 1.-smoothstep(.28,.95,dv*1.55);
  float vig2= 1.-smoothstep(.55,1.30,dv*1.80);
  col *= vig*.65+vig2*.35;

  // ── CRT horizontal scan flicker ──────────────────────────
  float scan = .975+.025*sin(uv.y*u_res.y*.9+tm*4.);
  col *= scan;

  // ── Luminance-based tone + grade ─────────────────────────
  col *= .72; // pull overall exposure down for contrast
  col = aces(col);

  // Subtle S-curve contrast
  col = col*col*(3.-2.*col);

  // Gamma 0.82 — slightly bright for screen
  col = pow(col,vec3(.82));

  gl_FragColor = vec4(col,1.);
}
`;

export default function AnimatedBackground() {
  const cvs   = useRef(null);
  const mouse = useRef({ x:0, y:0 });
  const tgt   = useRef({ x:0, y:0 });
  const raf   = useRef(null);

  useEffect(() => {
    const canvas = cvs.current;
    const gl = canvas.getContext("webgl",{antialias:false,alpha:false,powerPreference:"high-performance"});
    if(!gl){ console.warn("WebGL not available"); return; }

    const mkShader=(type,src)=>{
      const s=gl.createShader(type);
      gl.shaderSource(s,src); gl.compileShader(s);
      if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))
        console.error("Shader:",gl.getShaderInfoLog(s));
      return s;
    };
    const prog=gl.createProgram();
    gl.attachShader(prog,mkShader(gl.VERTEX_SHADER,VERT));
    gl.attachShader(prog,mkShader(gl.FRAGMENT_SHADER,FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,buf);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    const aloc=gl.getAttribLocation(prog,"a_position");
    gl.enableVertexAttribArray(aloc);
    gl.vertexAttribPointer(aloc,2,gl.FLOAT,false,0,0);

    const uRes  =gl.getUniformLocation(prog,"u_res");
    const uMouse=gl.getUniformLocation(prog,"u_mouse");
    const uTime =gl.getUniformLocation(prog,"u_time");

    const resize=()=>{
      const dpr=Math.min(window.devicePixelRatio||1,1.5);
      canvas.width =window.innerWidth *dpr;
      canvas.height=window.innerHeight*dpr;
      canvas.style.width="100vw"; canvas.style.height="100vh";
      gl.viewport(0,0,canvas.width,canvas.height);
      tgt.current={x:canvas.width/2,y:canvas.height/2};
      mouse.current={x:canvas.width/2,y:canvas.height/2};
    };
    resize();
    window.addEventListener("resize",resize,{passive:true});

    const dpr=()=>Math.min(window.devicePixelRatio||1,1.5);
    const mv=e=>{mouse.current={x:e.clientX*dpr(),y:e.clientY*dpr()};};
    const tc=e=>{mouse.current={x:e.touches[0].clientX*dpr(),y:e.touches[0].clientY*dpr()};};
    window.addEventListener("mousemove",mv,{passive:true});
    window.addEventListener("touchmove",tc,{passive:true});

    const t0=performance.now();
    const L=0.032; // cinematic lag

    const draw=()=>{
      tgt.current.x+=(mouse.current.x-tgt.current.x)*L;
      tgt.current.y+=(mouse.current.y-tgt.current.y)*L;
      const t=(performance.now()-t0)/1000;
      gl.uniform2f(uRes,canvas.width,canvas.height);
      gl.uniform2f(uMouse,tgt.current.x,tgt.current.y);
      gl.uniform1f(uTime,t);
      gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
      raf.current=requestAnimationFrame(draw);
    };
    raf.current=requestAnimationFrame(draw);

    return()=>{
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize",resize);
      window.removeEventListener("mousemove",mv);
      window.removeEventListener("touchmove",tc);
    };
  },[]);

  return(
    <canvas ref={cvs} style={{
      position:"fixed",inset:0,zIndex:-10,
      display:"block",background:"#020617",
    }}/>
  );
}
