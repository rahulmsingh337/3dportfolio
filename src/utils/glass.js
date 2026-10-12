// Shared "spatial UI" frosted-glass surface. Spread into a style object: style={{ ...GLASS, ... }}
export const GLASS = {
  background: "linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
  border: "1px solid rgba(255,255,255,0.13)",
  backdropFilter: "blur(22px) saturate(150%)",
  WebkitBackdropFilter: "blur(22px) saturate(150%)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(255,255,255,0.03), 0 20px 50px -14px rgba(0,0,0,0.55)",
};
