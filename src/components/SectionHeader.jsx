import { motion } from "motion/react";
import { IS_MOBILE } from "../utils/motion";

/** Shared section heading: numbered eyebrow, serif display title (italic gold accent), optional lede. */
export default function SectionHeader({ n, eyebrow, title, em, srLabel, lede }) {
  const inner = (
    <>
      <div className="eyebrow"><span>{n}</span><span className="rule" /><span>{eyebrow}</span></div>
      <h2 className="display">
        {srLabel && <span className="sr-only">{srLabel}: </span>}
        {title}{em && <> <em>{em}</em></>}
      </h2>
      {lede && <p className="lede">{lede}</p>}
    </>
  );
  if (IS_MOBILE) return <header className="sec-head">{inner}</header>;
  return (
    <motion.header
      className="sec-head"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {inner}
    </motion.header>
  );
}
