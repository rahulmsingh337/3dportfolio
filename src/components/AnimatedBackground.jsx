import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export default function AnimatedBackground() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: -10,
      width: "100vw", height: "100vh",
      background: "#020617",
    }}>
      {/* Spline 3D scene — motion-sensor reactive */}
      <Suspense fallback={
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, #0f1729 0%, #020617 100%)",
        }}/>
      }>
        <Spline
          scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </Suspense>

      {/* Subtle dark overlay so text stays readable */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(2,6,23,0.45)",
        pointerEvents: "none",
      }}/>
    </div>
  );
}
