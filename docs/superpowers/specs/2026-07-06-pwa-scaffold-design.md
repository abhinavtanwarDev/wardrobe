# PWA Scaffold Design

Date: 2026-07-06

## Purpose

Scaffold a brand-new, production-ready Progressive Web App in `d:\wardrobeApp` (currently empty). This is a generic PWA foundation — not wardrobe-domain-specific — meant to be extended later.

## Stack

- **Next.js 15+**, App Router, TypeScript (`strict: true`)
- **@serwist/next** for the service worker (successor to `next-pwa`; actively maintained, native App Router support, Workbox under the hood). Disabled in development via its `disable` option to avoid cache confusion.
- **Tailwind CSS** with a base config and design tokens in `src/styles/`
- **ESLint + Prettier**, kept consistent (Prettier as the formatting source of truth, ESLint for lint rules only)
- **npm** as the package manager (pnpm is not installed on this machine; noted as a documented fallback path in the README)
- **sharp** (devDependency only) to generate the icon set from one master SVG — no puppeteer/browser-based asset generator, no network dependency

## Folder Structure

```
src/
  app/                  # routes, layouts, metadata (App Router)
    api/items/route.ts  # mock JSON endpoint for the sample page
    offline/page.tsx    # offline fallback page
    layout.tsx
    page.tsx
  components/
    ui/                 # Button, Card, Modal
    layout/             # Header, Footer, Nav, InstallPrompt
  features/             # feature-sliced modules (empty scaffold folder + .gitkeep)
  hooks/                # useOnlineStatus, useInstallPrompt
  lib/                  # utilities, constants
  styles/               # globals.css, tokens.css
  types/                # shared TypeScript types
public/
  icons/                # generated PWA icon set
  manifest.webmanifest
scripts/
  generate-icons.mjs    # sharp-based icon generator, run once (or re-run after swapping branding)
```

## PWA Essentials

- **Manifest**: `name`, `short_name`, `description`, `theme_color`, `background_color`, `display: standalone`, `start_url`, `id`, icons at 192/256/384/512 + maskable variants + apple-touch-icon. Placeholder branding ("PWA App" / neutral blue theme) since this isn't wardrobe-specific yet.
- **Service worker** (via `@serwist/next`):
  - Precache app shell + static assets
  - Runtime caching: `StaleWhileRevalidate` for static assets/images, `NetworkFirst` for `/api/*` with cache fallback
  - Offline fallback page at `/offline`, served on failed navigation
  - Update flow: detect a waiting service worker and show a "New version available — Refresh" toast instead of auto-updating
- **Install experience**: `InstallPrompt` component listening for `beforeinstallprompt`, with an iOS Safari fallback (manual "Add to Home Screen" instructions since iOS doesn't fire that event), dismissible and remembered via `localStorage`
- **Online/offline indicator**: `useOnlineStatus` hook (wraps `navigator.onLine` + `online`/`offline` events) + a banner shown when offline
- **Meta tags**: viewport, theme-color, `apple-mobile-web-app-capable`, description, manifest link — via Next's `metadata` export in `app/layout.tsx`

## Sample Page / Data Flow

- `app/api/items/route.ts` returns a small mock JSON list (demonstrates a cacheable API route)
- A client component on the home page fetches `/api/items` and renders the list
- Serwist's `NetworkFirst` strategy on that route means the last successful response is served from cache when offline — demonstrates offline-capable data fetching without a data-fetching library (plain `fetch` + `useState`/`useEffect`, no SWR/react-query, to keep dependencies minimal)
- The same home page renders the `InstallPrompt` and the offline banner, so one page demonstrates all three required behaviors

## Quality & Tooling

- `strict: true` in `tsconfig.json`
- npm scripts: `dev`, `build`, `start`, `lint`, `format`, `typecheck`
- `.env.example` documenting any env vars used (none required for this generic scaffold beyond `NEXT_PUBLIC_APP_URL`, added for future use)
- Zero TypeScript errors required before considering the scaffold done

## Deliverables

1. Fully scaffolded project (all files, installable via `npm install`)
2. `README.md`: setup, dev/build/preview commands, how caching strategies work, how to test offline mode (DevTools → Network → Offline), how to test install on Android/iOS/desktop, how to customize manifest/icons
3. Summary of which skills were consulted (`nextjs`, `progressive-web-app`) and any deviations from their examples, with reasons

## Out of Scope

- Wardrobe-specific domain features (deferred — this is a generic scaffold per explicit confirmation)
- Push notifications (not requested)
- Any backend/database beyond the mock `/api/items` route
