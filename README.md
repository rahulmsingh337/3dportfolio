# Rahul Singh — scroll-driven portfolio

A cinematic, scroll-driven portfolio. Concept: **From Legacy to Clean Core** — the page is one story, told by scroll.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis · Motion (overlays only) · Lucide.
No Three.js: the immersive scene is a Canvas 2D particle morph (same impact, a fraction of the cost).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Scroll choreography

| Section | What scroll does | Tech |
|---|---|---|
| Hero | Masked headline reveal; cursor-reactive depth layers; content recedes on scroll | GSAP timeline + `quickTo`, ScrollTrigger scrub |
| Manifesto (pinned) | Words ignite by progress while LEGACY / CORE zoom through each other | ScrollTrigger scrub, sticky stage |
| Impact | Counters scrubbed to scroll position | ScrollTrigger scrub |
| Capabilities | Pinned horizontal travel; per-card depth, tilt and flip | ScrollTrigger pin + per-frame `--d` depth |
| Work | Five "scenes": visual expands from an inset mask; scroll progress (`--p`) drives each visual in pure CSS | ScrollTrigger scrub → CSS variable |
| Clean Core | ~780 particles collapse from a tangled cloud into concentric rings; three captions | Canvas 2D, scrubbed progress |
| Journey | Sticky year reel, drawing line, masked milestone cards | ScrollTrigger |
| Credentials | Staggered batch reveal, keyboard-accessible viewer | ScrollTrigger.batch, Motion |
| Final CTA | Oversized type scales in, light swells, magnetic CTA | ScrollTrigger scrub, CSS conic gradient |

## Responsive tiers (`gsap.matchMedia`, see `lib/gsap.ts`)

- **Desktop (≥1024px):** full cinematic experience.
- **Tablet (768–1023px):** pinned storytelling kept; pointer-driven effects simplified.
- **Mobile (<768px):** purpose-built — capabilities become a native swipe carousel, scenes stack, canvas density drops (320 particles), hero entrance is skipped so content is visible at first paint.
- **`prefers-reduced-motion`:** Lenis off, no pinning or scrubbing, every section renders statically with all content visible.

## Performance & accessibility notes

- Transform/opacity only; one rAF loop for the backdrop, one for the canvas (paused off-screen and when the tab is hidden).
- ScrollTriggers are created inside `gsap.matchMedia()` and reverted on unmount.
- Lighthouse (local production build): desktop 100 / 100 / 100 / 100; mobile 100 accessibility, best practices and SEO, real first/largest paint ≈ 1.2 s on a slow test machine (simulated-throttle performance score is lower).
- Server-rendered content: all copy is in the HTML; JS only adds motion. A `js-fail` fallback reveals content if scripts never run.
- Semantic landmarks, skip link, focus-managed menu / palette / viewer, ARIA on flip cards, `⌘/Ctrl+K` command palette, sound toggle (default on, persisted).

## Structure

```
app/              layout, page, globals.css (tokens/UI), sections.css (sections)
components/
  sections/       Hero, Manifesto, Stats, Capabilities, Work(+Scene), CoreStory, Journey, Credentials, FinalCTA
  visuals/        PortraitFlip, CoreCanvas, SceneVisuals
  layout/         Backdrop, Nav (+menu), ScrollProgress, CommandPalette, Toast, Footer
  ui/             MaskText, MagneticButton, TiltCard, Icons
  providers/      SmoothScroll (Lenis ↔ GSAP ticker)
hooks/  lib/      gsap setup, animation helpers, sound, events, content data (lib/data/*)
```

Content lives in `lib/data/*` — edit copy and numbers there, not in components.

## Deploying

Not deployed. When ready: this replaces the current Vite site, so set the Vercel project's framework preset to Next.js (the old `vercel.json` Vite settings must be removed), and preview on a branch before promoting to production.
