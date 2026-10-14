import { Fragment } from "react";
import { motion } from "motion/react";
import { IS_MOBILE } from "../utils/motion";

const EASE = [0.22, 1, 0.36, 1];

/** Masked word-by-word reveal for the display title. */
function Words({ text, italic, offset = 0 }) {
  return text.split(" ").filter(Boolean).map((w, i) => (
    <Fragment key={w + i}>
      <span className="mask">
        <motion.span className="word" style={italic ? { fontStyle: "italic", color: "var(--gold)" } : undefined}
          initial={{ y: "115%" }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: (offset + i) * 0.07, ease: EASE }}>
          {w}
        </motion.span>
      </span>{" "}
    </Fragment>
  ));
}

/** Shared section heading: numbered eyebrow, serif display title (italic gold accent), optional lede. */
export default function SectionHeader({ n, eyebrow, title, em, srLabel, lede }) {
  if (IS_MOBILE) {
    return (
      <header className="sec-head">
        <div className="eyebrow"><span>{n}</span><span className="rule" /><span>{eyebrow}</span></div>
        <h2 className="display">{srLabel && <span className="sr-only">{srLabel}: </span>}{title}{em && <> <em>{em}</em></>}</h2>
        {lede && <p className="lede">{lede}</p>}
      </header>
    );
  }
  const n1 = title.split(" ").filter(Boolean).length;
  return (
    <header className="sec-head">
      <motion.div className="eyebrow" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: EASE }}>
        <span>{n}</span><span className="rule" /><span>{eyebrow}</span>
      </motion.div>
      <h2 className="display">
        {srLabel && <span className="sr-only">{srLabel}: </span>}
        <span aria-label={`${title}${em ? " " + em : ""}`}>
          <Words text={title} />
          {em && <Words text={em} italic offset={n1} />}
        </span>
      </h2>
      {lede && (
        <motion.p className="lede" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, delay: 0.25, ease: EASE }}>{lede}</motion.p>
      )}
    </header>
  );
}
