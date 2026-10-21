import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useScrub } from "../utils/scrub";

function Scrubbed({ as, from, range, children, ...rest }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: range });
  const y = useTransform(p, [0, 1], [from.y ?? 32, 0]);
  const x = useTransform(p, [0, 1], [from.x ?? 0, 0]);
  const opacity = useTransform(p, [0, 1], [from.opacity ?? 0.65, 1]);
  const scale = useTransform(p, [0, 1], [from.scale ?? 1, 1]);
  const Tag = motion[as];
  return <Tag ref={ref} style={{ y, x, opacity, scale }} {...rest}>{children}</Tag>;
}

/**
 * Scroll-linked entrance: transform/opacity follow the element's position in the viewport (scrubbed, not time-based).
 * On phones and for reduced-motion users it renders a plain element and creates no scroll trackers at all.
 */
export default function ScrubIn({ as = "div", from = {}, range = ["start 92%", "start 62%"], children, ...rest }) {
  const scrub = useScrub();
  if (!scrub) { const Tag = as; return <Tag {...rest}>{children}</Tag>; }
  return <Scrubbed as={as} from={from} range={range} {...rest}>{children}</Scrubbed>;
}
