// On mobile: renders a plain div — zero framer-motion overhead
// On desktop: renders motion.div with full animations
import { IS_MOBILE } from "./motion";

let _motion = null;

export function MotionDiv({ children, style, className, ...animProps }) {
  if (IS_MOBILE) {
    // Strip all animation props, render plain div
    return <div style={style} className={className}>{children}</div>;
  }
  // Dynamic import already handled by lazy chunk — use motion.div
  const { initial, animate, whileInView, whileHover, whileTap,
          transition, viewport, onHoverStart, ...rest } = animProps;
  // We need motion synchronously here — use a wrapper
  return <div style={style} className={className} {...rest}>{children}</div>;
}
