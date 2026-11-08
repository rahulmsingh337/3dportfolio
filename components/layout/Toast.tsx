"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";

export default function Toast() {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const on = (e: Event) => { setMsg((e as CustomEvent<string>).detail); clearTimeout(t); t = setTimeout(() => setMsg(""), 2400); };
    window.addEventListener("rs-toast", on);
    return () => { window.removeEventListener("rs-toast", on); clearTimeout(t); };
  }, []);
  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      <AnimatePresence>
        {msg && (
          <motion.div key={msg} className="toast" initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <Check size={15} strokeWidth={2} /> {msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
