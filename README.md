# Odd Creatives & Management  premium stack build

The same site, rebuilt on the stack you asked for: **Next.js (App Router) +
React + Tailwind CSS + GSAP + Framer Motion + Lenis + Three.js / React
Three Fiber.** Inspired by the interaction quality of sites like dogstudio.co
and oddcreatives.com  nothing copied, no lifted layouts or assets.

## Run it

```bash
npm install
npm run dev
```

Pages: `/`, `/services`, `/portfolio`, `/about`, `/contact`, and a case-study
page per project at `/work/[slug]`.

## How each library is actually used (not just installed)

- **Tailwind CSS**  the entire visual system. Brand tokens (`ink`, `red`,
  `yellow`, `bg`, `panel`, `line`, `muted`) are registered in
  `tailwind.config.js` so every component uses `bg-red`, `text-yellow`, etc.
  instead of one-off hex values.
- **Lenis**  `components/SmoothScroll.tsx` mounts once in the root layout
  and drives Lenis off GSAP's own ticker (`gsap.ticker.add`), which is the
  standard fix for Lenis/ScrollTrigger disagreeing about scroll position.
  `lenis.on("scroll", ScrollTrigger.update)` keeps GSAP in sync.
- **GSAP + ScrollTrigger**  used where scrubbed, scroll-position-linked
  motion matters: the hero's parallax scene drift, the About page's
  scroll-filled timeline line, and the staggered line-reveals on headings
  (`PageHero`, `Hero`).
- **Framer Motion**  used for everything state-driven and gesture-driven:
  the custom cursor (spring-following motion values), the mobile sidebar
  (`AnimatePresence` slide-in/out), magnetic buttons, card tilt on hover,
  `whileInView` reveals across most grids, and the portfolio's filter +
  quick-view modal transitions. `app/template.tsx` fades each route in/out
  on navigation.
- **Three.js / React Three Fiber**  `components/Hero3DScene.tsx` is the
  hero's real 3D layer: six floating low-poly shapes (icosahedron / torus /
  box) in the brand's three colors, drifting on their own plus reacting to
  the cursor, with a camera rig that gently follows pointer position. It's
  dynamically imported with `ssr:false` (three.js needs `window`) and is
  skipped entirely below 768px or under `prefers-reduced-motion`  see
  `components/Hero3DCanvas.tsx`  replaced there by a much cheaper static
  CSS gradient so phones still get a considered hero, not a placeholder.

## Structure

Same content structure as the previous build (service categories, featured
Web Dev/IT spotlight, portfolio with case studies, team, testimonials,
process timeline, etc.)  `lib/*.ts` files carry the editable data, exactly
as before:

- `lib/serviceCategories.ts`, `lib/work.ts`, `lib/team.ts`, `lib/clients.ts`
- `components/Hero.tsx` + `Hero3DScene.tsx` + `Hero3DCanvas.tsx`  the hero
- `components/ServiceCategories.tsx`  the 4 expandable category cards
- `components/PortfolioGrid.tsx`  filterable masonry + quick-view modal
- `components/Nav.tsx` + `MobileSidebar.tsx`  transparent-on-hero nav,
  full off-canvas mobile menu

## Honest notes on scope and trade-offs

- The **3D hero is the real showpiece**  that's where "award-winning first
  impression" money is best spent. The rest of the site reuses the same
  visual language (Tailwind tokens, Framer Motion reveals, occasional GSAP
  scrub) rather than adding a WebGL scene to every section  stacking 3D
  everywhere tends to hurt performance far more than it helps the story.
- **Testimonials, case-study numbers, and team bios remain placeholders** 
  same honest caveat as the previous build: these are drafted examples, not
  real client quotes or your actual team, and shouldn't be published as-is.
- **Tech stack chips are plain marks, not official logos**  React, AWS,
  Shopify, etc. are trademarks; swap in licensed partner badges only if
  you actually hold them.
- Performance: the R3F scene uses `dpr={[1, 1.6]}` capping and is gated off
  on mobile/reduced-motion. On very low-end desktops it may still be worth
  trimming shape count further (`components/Hero3DScene.tsx`, `shapeDefs`).
