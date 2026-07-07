# Core Feature Screens — Design Spec

**Date:** 2026-07-07
**Status:** Approved for implementation (autonomous session; user requested "research competitors and create screens for all possible features, dummy placeholders for AI/image APIs")

## Goal

Take the app from a first-run flow (Splash → Welcome → Onboarding → Home) to a full wardrobe manager: every core surface a competitive app ships, built with the existing design system, mock data, and placeholder visuals. No AI or image APIs — every "smart" surface is a styled dummy that the real services can later plug into.

## Research summary (what competitors do)

Researched: Whering, Indyx, Stylebook, Acloset, Cladwell, Pureple, GetWardrobe, Combyne, Smart Closet, plus Pinterest/Apple Photos gallery patterns.

- Every serious app converges on **4 core surfaces: Closet, Outfits, Plan (calendar), Insights/Profile**, plus an always-one-tap-away add-item entry.
- **Whering "Dress Me"** (slot-machine category sliders + shuffle) is the single most-loved interaction in the category.
- **Weather-based daily outfit picks** (Cladwell: 3/morning; Acloset: sectioned suggestion feed) are table stakes.
- **Calendar logging** powers everything (wear counts, cost-per-wear, unworn items) — must be one tap.
- **Packing lists** auto-populated from outfits (Stylebook/Smart Closet) are a beloved utility.
- **Stats** are the most differentiated area, and nobody does them *beautifully* — open lane.
- Top complaints to design against: tedious upload (offer link/receipt/batch capture paths), boring AI suggestions, cluttered "engineer UI", paywalls mid-flow.

## Navigation

Replace the 3-item placeholder BottomNav with **5 real routes**:

| Tab | Route | Icon | Purpose |
|---|---|---|---|
| Today | `/today` | Sparkles | Daily styling feed: weather + outfit picks |
| Wardrobe | `/home` | LayoutGrid | Masonry closet (existing, upgraded) |
| Outfits | `/outfits` | Layers | Lookbooks + saved outfits + creator entry |
| Planner | `/planner` | CalendarDays | Outfit calendar + trips/packing |
| Profile | `/profile` | User | Account, insights entry, settings |

BottomNav items become Next `Link`s driven by the route (active state from prop as today). FAB on Wardrobe → `/items/new`; FAB on Outfits → `/outfits/new`.

## Screens

1. **Today (`/today`)** — greeting + weather card (dummy: 24° Partly cloudy, Gurugram), "Your three picks" swipeable outfit cards with Yayy/Nayy-style actions (visual only), sectioned rows à la Acloset: "For today's weather", "Featuring: <hero piece>", "Least worn lately". All suggestions come from mock data; copy stays human ("Picked for a warm afternoon").
2. **Wardrobe (`/home`)** — existing masonry upgraded to real mock items (name, brand, category, wear count), category chips filter the grid, count header derived from data, tiles link to item detail with a `layoutId` shared-element transition. Search button opens an animated search overlay (client-side filter).
3. **Item detail (`/items/[id]`)** — full-bleed placeholder visual, name/brand, chip row of attributes (category, color, season, status), stat row (wears, cost per wear, last worn), "Outfits featuring this" horizontal carousel, actions (Edit, Add to outfit — visual). Status pill (Clean / In laundry / Lent out) à la Stylebook.
4. **Add item (`/items/new`)** — capture-choice screen designed against the #1 churn driver: Camera, Photo library, Paste a product link, Forward a receipt (all dummy actions that advance to the details step), then a details form (name, category picker chips, color swatches, brand, price, seasons) with "We'll fill most of this for you" helper copy. Save returns to wardrobe.
5. **Outfits (`/outfits`)** — occasion lookbooks (Work, Weekend, Date night, Travel) as horizontal cards + masonry of saved outfit collages (2×2 piece tiles), each with occasion tag and wear count.
6. **Outfit creator (`/outfits/new`)** — Whering-style **Dress Me**: stacked category sliders (Outerwear / Top / Bottom / Shoes) swiped independently, big Shuffle button (slot-machine spring animation), lock toggle per slot, Save look sheet (name + occasion chips).
7. **Outfit detail (`/outfits/[id]`)** — collage hero, pieces list linking to item details, occasion/season chips, "Wear today" one-tap log + "Plan for a day" (visual).
8. **Planner (`/planner`)** — month calendar grid with outfit-dot markers and inline weather icons on the coming week, tapping a day shows its planned outfit in a bottom card; Trips section with packing-list cards (progress ring of packed items) → **Trip packing (`/planner/trips/[id]`)**: outfit-derived checklist with tap-to-check animation, plus extras (chargers etc.).
9. **Insights (`/insights`)** — editorial stats: wardrobe value hero, closet utilization ring, cost-per-wear best/worst list, most/least-worn pieces, color palette breakdown bar. Reached from Profile (and a teaser card on Today).
10. **Profile (`/profile`)** — avatar/name header, insights teaser card, settings rows (Theme toggle inline, Notifications, Install app, Data & privacy — visual), sign out (visual).

## Architecture

- **Data layer:** `src/features/wardrobe/data.ts` — shared TypeScript types (`WardrobeItem`, `Outfit`, `Trip`, `PlannedDay`, `WeatherSnapshot`) + one mock dataset used by every screen, so counts/stats/suggestions all agree. Helpers (`getItem`, `getOutfit`, `costPerWear`) live beside the data. Placeholder visuals stay CSS gradients; each item carries `gradient` + Lucide `icon` like today's `PIECES`.
- **Shared UI:** extract `GarmentTile` (gradient placeholder tile, sizes/aspects) and `OutfitCollage` (2×2 grid of piece tiles) into `components/ui`; reuse `CategoryChips` (add controlled `value/onChange` support), `ArrowPill`, `BottomNav`. Bring `Button`/`Card` in line with tokens if touched.
- **Routing:** new App Router routes; screens are client components under `src/features/<name>/`, pages stay thin server components. Dynamic routes use `generateStaticParams`-free client lookup by param (mock data, `notFound()` on miss).
- **Everything animated:** springs, stagger, `layoutId` shared transitions, `AnimatePresence` for overlays/sheets; dark mode via tokens; 44px targets; safe-area padding — per ui.md.

## Error handling & testing

No backend: unknown ids render Next's `notFound()`. Verification = `npm run typecheck`, `npm run lint`, `npm run build`, and manual flow-through of every route in the running app. No unit tests (pure presentational mock screens), matching the repo's current state.

## Out of scope

Real AI/weather/image APIs, auth, persistence, social feed/resale surfaces, drag-and-drop collage canvas (slider builder ships first), push notifications.
