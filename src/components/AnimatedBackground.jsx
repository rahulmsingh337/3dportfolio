import { useEffect, useRef, useState } from "react";

// Desktop-only WebGL shader
const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;
const FRAG = `
precision highp float;
uniform vec2 u_res,u_mouse;uniform float u_time;
vec2 h22(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.+2.*fract(sin(p)*43758.5);}
float gn(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(dot(h22(i),f),dot(h22(i+vec2(1,0)),f-vec2(1,0)),u.x),mix(dot(h22(i+vec2(0,1)),f-vec2(0,1)),dot(h22(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);}
float fbm(vec2 p,float t){float v=0.,a=.55;mat2 R=mat2(cos(.37),sin(.37),-sin(.37),cos(.37));for(int i=0;i<7;i++){v+=a*gn(p+t*(.12-.02*float(i)));p=R*p*2.07;a*=.47;}return v;}
float wfbm(vec2 p,float t){vec2 q=vec2(fbm(p,t),fbm(p+vec2(5.2,1.3),t*.9));vec2 r=vec2(fbm(p+4.*q+vec2(1.7,9.2),t*.75),fbm(p+4.*q+vec2(8.3,2.8),t*.6));return fbm(p+3.*r,t*.4);}
vec3 pal(float t){vec3 c=vec3(0.);c+=vec3(.01,.015,.06)*smoothstep(-.1,.25,t);c+=vec3(.06,.04,.28)*smoothstep(.15,.5,t);c+=vec3(0.,.28,.72)*smoothstep(.38,.7,t)*.9;c+=vec3(.42,.08,.72)*smoothstep(.5,.8,t)*.55;c+=vec3(.35,.6,1.)*smoothstep(.65,.88,t)*.6;c+=vec3(.85,.92,1.)*smoothstep(.8,1.,t)*.45;return c;}
vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res,st=uv*vec2(u_res.x/u_res.y,1.);
  float tm=u_time,f01=clamp(wfbm(st*1.1,tm)*.5+.5,0.,1.);
  vec3 col=pal(f01);
  float fine=pow(1.-abs(sin(wfbm(st*2.2+.5,tm)*18.+tm)),10.);col+=vec3(.25,.55,1.)*fine*.18;
  float rb=pow(1.-abs(sin(wfbm(st*.7,tm*.8)*7.+tm*.6)),6.);col+=vec3(.15,.3,.85)*rb*.12;
  vec2 mst=vec2(u_mouse.x/u_res.x*(u_res.x/u_res.y),1.-u_mouse.y/u_res.y),md=st-mst;float d=length(md);
  col+=vec3(.12,.10,.55)*exp(-d*d*.65)*.8+vec3(.08,.35,.9)*exp(-d*d*3.5)*.75+vec3(.1,.65,.95)*exp(-d*d*12.)*.65+vec3(.75,.9,1.)*exp(-d*d*45.)*.9+vec3(1.)*exp(-d*d*150.)*.55;
  col+=vec3(.4,.3,1.)*exp(-pow(d-.1,2.)*180.)*.4+vec3(.2,.5,.95)*exp(-pow(d-.22,2.)*100.)*.26+vec3(.1,.4,.8)*exp(-pow(d-.38,2.)*65.)*.16;
  col*=1.-smoothstep(.28,.95,length(uv-.5)*1.55);col*=.72;col=aces(col);col=col*col*(3.-2.*col);col=pow(col,vec3(.82));
  gl_FragColor=vec4(col,1.);
}`;

// Pure CSS animated background for mobile — zero JS overhead
function MobileBackground() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: -10,
      background: "#020617",
      overflow: "hidden",
    }}>
      {/* Animated aurora blobs — pure CSS, GPU composited */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(30,20,120,0.7) 0%, transparent 70%)",
      }}/>
      <div style={{
        position: "absolute", width: "200%", height: "200%",
        top: "-50%", left: "-50%",
        background: "radial-gradient(ellipse 40% 40% at 30% 60%, rgba(10,50,180,0.5) 0%, transparent 60%)",
        animation: "mob-blob1 8s ease-in-out infinite",
      }}/>
      <div style={{
        position: "absolute", width: "200%", height: "200%",
        top: "-50%", left: "-50%",
        background: "radial-gradient(ellipse 35% 45% at 70% 30%, rgba(60,10,160,0.4) 0%, transparent 60%)",
        animation: "mob-blob2 11s ease-in-out infinite",
      }}/>
      <div style={{
        position: "absolute", width: "200%", height: "200%",
        top: "-50%", left: "-50%",
        background: "radial-gradient(ellipse 50% 30% at 50% 80%, rgba(0,80,200,0.35) 0%, transparent 60%)",
        animation: "mob-blob3 14s ease-in-out infinite",
      }}/>
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }}/>
      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 30%, rgba(2,6,23,0.85) 100%)",
      }}/>
      <style>{`
        @keyframes mob-blob1 {
          0%,100%{transform:translate(0%,0%) scale(1);}
          33%{transform:translate(8%,-6%) scale(1.08);}
          66%{transform:translate(-5%,8%) scale(0.95);}
        }
        @keyframes mob-blob2 {
          0%,100%{transform:translate(0%,0%) scale(1);}
          33%{transform:translate(-10%,5%) scale(1.1);}
          66%{transform:translate(7%,-8%) scale(0.92);}
        }
        @keyframes mob-blob3 {
          0%,100%{transform:translate(0%,0%) scale(1);}
          50%{transform:translate(-6%,-10%) scale(1.12);}
        }
      `}</style>
    </div>
  );
}

function WebGLBackground() {
  const cvs  = useRef(null);
  const mpos = useRef({ x: 0, y: 0 });
  const tgt  = useRef({ x: 0, y: 0 });
  const raf  = useRef(null);

  useEffect(() => {
    const canvas = cvs.current;
    const gl = canvas.getContext("webgl", { antialias:false, alpha:false, powerPreference:"high-performance" });
    if (!gl) return;

    const mkS = (t,s) => { const sh=gl.createShader(t); gl.shaderSource(sh,s); gl.compileShader(sh); return sh; };
    const prog = gl.createProgram();
    gl.attachShader(prog, mkS(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, mkS(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const al = gl.getAttribLocation(prog,"a");
    gl.enableVertexAttribArray(al); gl.vertexAttribPointer(al,2,gl.FLOAT,false,0,0);

    const uR=gl.getUniformLocation(prog,"u_res");
    const uM=gl.getUniformLocation(prog,"u_mouse");
    const uT=gl.getUniformLocation(prog,"u_time");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio||1, 1.5);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width="100vw"; canvas.style.height="100vh";
      gl.viewport(0,0,canvas.width,canvas.height);
      tgt.current = mpos.current = { x:canvas.width/2, y:canvas.height/2 };
    };
    resize();
    window.addEventListener("resize", resize, { passive:true });

    const dpr = () => Math.min(window.devicePixelRatio||1,1.5);
    const mv = e => { mpos.current={x:e.clientX*dpr(),y:e.clientY*dpr()}; };
    window.addEventListener("mousemove", mv, { passive:true });

    const t0 = performance.now();
    const draw = (now) => {
      raf.current = requestAnimationFrame(draw);
      tgt.current.x += (mpos.current.x - tgt.current.x) * 0.032;
      tgt.current.y += (mpos.current.y - tgt.current.y) * 0.032;
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform2f(uM, tgt.current.x, tgt.current.y);
      gl.uniform1f(uT, (now-t0)/1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mv);
    };
  }, []);

  return <canvas ref={cvs} style={{ position:"fixed",inset:0,zIndex:-10,display:"block",background:"#020617" }}/>;
}

export default function AnimatedBackground() {
  const [isMobile] = useState(() =>
    typeof window !== "undefined" &&
    (window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent))
  );
  return isMobile ? <MobileBackground /> : <WebGLBackground />;
}
