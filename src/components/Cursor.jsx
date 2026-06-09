import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const move = e => { el.style.left = e.clientX + "px"; el.style.top = e.clientY + "px"; };
    document.addEventListener("mousemove", move);

    const on  = () => el.classList.add("hovered");
    const off = () => el.classList.remove("hovered");
    const attach = () => {
      document.querySelectorAll("a,button,[data-hover]").forEach(n => {
        n.addEventListener("mouseenter", on);
        n.addEventListener("mouseleave", off);
      });
    };
    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { document.removeEventListener("mousemove", move); obs.disconnect(); };
  }, []);

  return <div ref={ref} className="cursor" />;
}
