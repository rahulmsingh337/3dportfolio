import type { CSSProperties } from "react";

/** Typed helper for inline CSS custom properties: style={vars({ "--i": 2 })} */
export const vars = (o: Record<string, string | number>) => o as CSSProperties;
