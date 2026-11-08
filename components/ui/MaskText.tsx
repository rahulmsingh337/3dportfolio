import type { ElementType } from "react";

type Props = { as?: ElementType; text: string; em?: string; className?: string; label?: string };

/**
 * Server-rendered, word-masked text. Words are fully present in the HTML (SEO / no-JS safe); CSS hides
 * them below the mask only when JS is running, and GSAP lifts them in (see lib/anim.ts).
 */
export default function MaskText({ as: Tag = "span", text, em, className, label }: Props) {
  const words = text.split(" ").filter(Boolean);
  const emWords = em ? em.split(" ").filter(Boolean) : [];
  return (
    <Tag className={className} aria-label={label ?? `${text}${em ? " " + em : ""}`}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden="true"><span className="mask"><span className="mask-in">{w}</span></span>{" "}</span>
      ))}
      {emWords.map((w, i) => (
        <span key={`em-${w}-${i}`} aria-hidden="true"><span className="mask"><span className="mask-in grad">{w}</span></span>{i < emWords.length - 1 ? " " : ""}</span>
      ))}
    </Tag>
  );
}
