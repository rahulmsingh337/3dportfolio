import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useScrub } from "../utils/scrub";

/** One word of the display title: rises out of a mask as the header scrolls into view (scrubbed). */
function Word({ p, i, n, italic, children }) {
  const start = Math.min(0.5, (i / Math.max(1, n)) * 0.55);
  const y = useTransform(p, [start, Math.min(1, start + 0.5)], ["118%", "0%"]);
  return (
    <>
      <span className="mask">
        <motion.span className="word" style={{ y, ...(italic ? { fontStyle: "italic", color: "var(--gold)" } : null) }}>{children}</motion.span>
      </span>{" "}
    </>
  );
}

const split = (title, em) => [
  ...title.split(" ").filter(Boolean).map((w) => ({ w })),
  ...(em ? em.split(" ").filter(Boolean).map((w) => ({ w, italic: true })) : []),
];

function ScrubHeader({ n, eyebrow, title, em, srLabel, lede }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 94%", "start 52%"] });
  const eo = useTransform(p, [0, 0.35], [0, 1]);
  const ey = useTransform(p, [0, 0.35], [16, 0]);
  const lo = useTransform(p, [0.45, 1], [0, 1]);
  const ly = useTransform(p, [0.45, 1], [20, 0]);
  const words = split(title, em);
  return (
    <header ref={ref} className="sec-head">
      <motion.div className="eyebrow" style={{ opacity: eo, y: ey }}>
        <span>{n}</span><span className="rule" /><span>{eyebrow}</span>
      </motion.div>
      <h2 className="display">
        {srLabel && <span className="sr-only">{srLabel}: </span>}
        <span aria-label={`${title}${em ? " " + em : ""}`}>
          {words.map((o, i) => <Word key={o.w + i} p={p} i={i} n={words.length} italic={o.italic}>{o.w}</Word>)}
        </span>
      </h2>
      {lede && <motion.p className="lede" style={{ opacity: lo, y: ly }}>{lede}</motion.p>}
    </header>
  );
}

function StaticHeader({ n, eyebrow, title, em, srLabel, lede }) {
  return (
    <header className="sec-head">
      <div className="eyebrow"><span>{n}</span><span className="rule" /><span>{eyebrow}</span></div>
      <h2 className="display">
        {srLabel && <span className="sr-only">{srLabel}: </span>}
        {title}{em && <> <em>{em}</em></>}
      </h2>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}

/** Shared section heading: numbered eyebrow, serif display title (italic gold accent), optional lede. */
export default function SectionHeader(props) {
  return useScrub() ? <ScrubHeader {...props} /> : <StaticHeader {...props} />;
}
