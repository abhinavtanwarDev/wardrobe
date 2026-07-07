# CLAUDE.md

Guidance for working in this repository. Read this first, then read [ui.md](ui.md) before touching anything visual.

## What this is

A **mobile-first Progressive Web App** for managing a personal wardrobe — a fashion gallery in the spirit of Pinterest, Whering, Indyx, and Apple Photos. The experience is image-first: large outfit photos, masonry grids, smooth scrolling, and AI that quietly assists without ever feeling like a chatbot.

This is a **phone app that happens to run in the browser**. Design and build every screen for a thumb on a small screen first, then let it scale up. It must be installable, work offline, and feel like a premium native app.

## The golden rule: UI lives in ui.md

**[ui.md](ui.md) is the single source of truth for all UI, styling, and interaction design.** Before creating or changing any screen, component, layout, animation, color, or spacing decision, read ui.md and follow it exactly. If a request conflicts with ui.md, flag it rather than silently diverging. If ui.md is silent on something, match the closest precedent already in the codebase.

Non-negotiables pulled from ui.md (read the file for the full rationale):

- **Never generic.** If a page could pass as a Dribbble shot, it ships. If it looks like a CRUD form or admin dashboard, redesign it.
- **Animate everything.** No UI ever changes instantly. Buttons scale on press, cards lift, images fade in, inputs animate, screens transition. Use **Framer Motion** with spring animations and shared layout transitions.
- **8px spacing system**, generous padding, nothing touching screen edges.
- **Neutral palette + one accent color.** Slate / stone / off-white / warm gray. No rainbow.
- **Lucide icons only.** Never emoji as icons.
- **Cards, not rectangles** — subtle shadows, rounded corners, soft borders, depth.
- **Buttons:** tactile, rounded-xl, comfortable height, real elevation. Never square.
- **Dark mode on every screen.** Always.
- **44px minimum touch target.** Always.
- **Bottom navigation**, FABs where appropriate, skeleton loaders (not spinners), and thoughtful empty states (illustrate + explain + one CTA).
- **AI language stays human.** "Added to your wardrobe," not "AI detected your shirt." Never expose technical AI terms to the user.

## Responsiveness

Design for the **smallest phone first** (~360px wide), then scale up with Tailwind breakpoints. Every screen must look intentional across the full range of mobile devices — small Androids, standard phones, large phones, and notched/safe-area devices.

- Use fluid layouts (flex/grid), relative units, and `max-width` on media; never fixed pixel widths that overflow narrow screens.
- Respect safe areas: use `env(safe-area-inset-*)` for the bottom nav, FABs, and full-bleed content so nothing sits under the notch or home indicator.
- Test mental model: iPhone SE (narrow) → iPhone Pro Max → large Android. Tablet/desktop is a bonus, never the priority.
- Touch targets ≥ 44px; spacing stays comfortable for thumbs.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** (strict mode)
- **Tailwind CSS v4** — imported via `@import "tailwindcss"` in [src/styles/globals.css](src/styles/globals.css); design tokens live in [src/styles/tokens.css](src/styles/tokens.css)
- **Serwist** (`@serwist/next`) for the service worker / offline / PWA behavior — SW source is [src/app/sw.ts](src/app/sw.ts), built to `public/sw.js`
- **Framer Motion** (`framer-motion`) for animation — installed and used across every screen (springs, `AnimatePresence`, drag, shared `layout`/`layoutId` transitions). Motion components are client-only.
- **Lucide** (`lucide-react`) for icons — installed; icons only, never emoji.
- **`clsx` + `tailwind-merge`** via the [`cn()`](src/lib/cn.ts) helper for conditional/merged class names.
- Path alias: `@/*` → `src/*`

## Project structure

```
src/
  app/              App Router: /, /onboarding, /home, api routes, sw.ts, offline page
  components/
    ui/             Reusable primitives: ArrowPill, Logo, PillNav, SplashScreen,
                    ThemeToggle, Button, Card
    layout/         BottomNav, InstallPrompt, OfflineBanner, UpdateToast
  features/         Feature modules — colocate feature UI + logic here
    welcome/        WelcomeScreen, OrbitGallery, CategoryChips (reusable chip row)
    onboarding/     OnboardingCarousel + slides.ts
    home/           HomeScreen (wardrobe grid)
    items/          ItemsList (scaffold data-fetch sample)
  hooks/            Reusable hooks — useTheme, useInstallPrompt, useOnlineStatus
  lib/              cn() + constants
  styles/           globals.css, tokens.css
  types/            Shared TypeScript types
```

- **Reusable primitives go in `components/ui`; feature-specific UI goes in `features/<name>`.** Never duplicate UI — extract a component (e.g. `CategoryChips` takes an `items` prop so welcome and home share it).
- Keep the App Router structure; new screens are new routes under `src/app`.
- The scaffold `Header`/`Footer` were removed from the root layout; each screen owns its own chrome (`PillNav`, `BottomNav`). `layout.tsx` renders only PWA overlays (`OfflineBanner`, `InstallPrompt`, `UpdateToast`) around the page, plus a pre-hydration theme script.

## App flow & screens

The product is a linear first-run flow that ends on the app home:

**Splash → Welcome (`/`) → Onboarding (`/onboarding`) → Home (`/home`)**

- **Splash** — [`SplashScreen`](src/components/ui/SplashScreen.tsx) plays the animated [`Logo`](src/components/ui/Logo.tsx) over the welcome screen, then dismisses. (Currently replays each `/` load; not session-gated.)
- **Welcome** — [`WelcomeScreen`](src/features/welcome/WelcomeScreen.tsx): the "Editorial Orbit" hero — [`OrbitGallery`](src/features/welcome/OrbitGallery.tsx) rings garment tiles around a central upload CTA, [`PillNav`](src/components/ui/PillNav.tsx) on top, an [`ArrowPill`](src/components/ui/ArrowPill.tsx) → `/onboarding`.
- **Onboarding** — [`OnboardingCarousel`](src/features/onboarding/OnboardingCarousel.tsx): swipeable 4-slide intro (drag, directional transitions, per-slide ambient glow, progress bar, animated dots). Finish/Skip → `/home`.
- **Home** — [`HomeScreen`](src/features/home/HomeScreen.tsx): masonry wardrobe grid, collection chips, FAB, and [`BottomNav`](src/components/layout/BottomNav.tsx).

Beyond the first-run flow, the app surfaces live at `/today` (weather styling feed), `/home` (wardrobe), `/outfits` (+ `/outfits/new` creator: Dress Me shuffle + hand-pick grid), `/planner` (+ trips/packing), `/insights`, and `/profile` — all reading one shared mock dataset in [data.ts](src/features/wardrobe/data.ts). Garment imagery is self-contained SVG flat-lay illustrations ([`GarmentArt`](src/components/ui/GarmentArt.tsx), rendered by [`GarmentTile`](src/components/ui/GarmentTile.tsx)) — no external image hosts, offline-safe. AI, weather, and image capture are styled dummy placeholders awaiting real APIs.

## Theming & tokens

- Semantic color tokens live in [tokens.css](src/styles/tokens.css) (`--background`, `--foreground`, `--muted`, `--card`, `--border`, `--accent`, `--nav`, …); dark mode is a token swap on the `.dark` class.
- [globals.css](src/styles/globals.css) maps tokens to Tailwind utilities via `@theme inline` (`bg-background`, `text-muted`, `bg-accent`, etc.) and registers class-based dark mode with `@custom-variant dark`. **Use these utilities/tokens — don't hard-code hex colors.**
- Dark mode is driven by [`useTheme`](src/hooks/useTheme.ts) (`useSyncExternalStore`, no hydration mismatch) + a pre-hydration script in `layout.tsx` that applies the saved/system theme before paint.
- Reduced motion is honored globally in `globals.css`.

## Conventions

- **TypeScript strict** — no `any`, type props explicitly, prefer named exports for components.
- **Client vs server components** — default to Server Components; add `"use client"` only when a component needs interactivity, browser APIs, or animation. Framer Motion components are client-only.
- **Styling is Tailwind utility classes.** Extend tokens in `tokens.css`; don't hard-code the accent color inline — reference the token. Note: existing scaffold components (e.g. `Button.tsx`) still use raw blue/gray utilities from the starter — bring them in line with ui.md (neutral + accent, rounded-xl, tactile) as you touch them.
- **PWA is load-bearing.** Don't break the service worker, manifest, install prompt, offline page, or update toast. SW is disabled in dev (`NODE_ENV === "development"`); test PWA behavior against a production build.
- Match the surrounding code's style, naming, and comment density.

## Commands

```bash
npm run dev            # dev server (webpack; SW disabled)
npm run build          # production build (webpack)
npm run start          # serve production build (use this to test PWA/offline/install)
npm run lint           # eslint
npm run typecheck      # tsc --noEmit
npm run format         # prettier --write
npm run generate-icons # regenerate PWA icons from source
```

**Before considering any change done:** run `npm run typecheck` and `npm run lint`, and verify the change in the running app (for PWA/offline behavior, against `npm run build && npm run start`, not dev).

## Git workflow

- `master` is the integration branch; feature work happens on `feature/*` branches.
- When a feature set is complete and green (`typecheck` + `lint` + `build` pass), integrate it into `master` and push to `origin`.

## Definition of done for any UI work

1. Read ui.md and followed it.
2. Mobile-first, responsive across small→large phones, safe areas respected.
3. Every interaction animated (Framer Motion), dark mode works, touch targets ≥ 44px.
4. Reused/extracted components instead of duplicating.
5. `typecheck` + `lint` pass; behavior verified in the app.
6. It looks like a premium consumer product — not a CRUD app.
