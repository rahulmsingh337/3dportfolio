import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const rng  = ringRef.current;

    // Smooth ring follow
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      rng.style.left = ring.current.x + "px";
      rng.style.top  = ring.current.y + "px";
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    const move = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + "px";
      dot.style.top  = e.clientY + "px";
    };
    const down = () => rng.classList.add("clicked");
    const up   = () => rng.classList.remove("clicked");

    // Magnetic hover targets
    const onEnter = () => rng.classList.add("hovered");
    const onLeave = () => rng.classList.remove("hovered");

    const attach = () => {
      document.querySelectorAll("a,button,[data-hover]").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mousemove",  move);
    document.addEventListener("mousedown",  down);
    document.addEventListener("mouseup",    up);

    return () => {
      cancelAnimationFrame(raf.current);
      document.removeEventListener("mousemove",  move);
      document.removeEventListener("mousedown",  down);
      document.removeEventListener("mouseup",    up);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
