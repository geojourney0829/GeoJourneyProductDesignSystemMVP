# GeoJourney — Core Vertical Slice (Milestone 1)

## Context

The attached master spec (`src/imports/pasted_text/geo-journey-plan.md`) describes **GeoJourney**, a
"travel operating system" — plan, compare, discover, save, travel, remember. It is a Level-1 **mock**
build: everything behaves as if real, backed by structured mock service/data layers, provider-agnostic,
with Supabase deferred to a later phase. No payments, no ticketing — the product ends at a "View Deal"
external-link placeholder.

The current repo is a greenfield Vite + React 19 + Tailwind v4 scaffold; `src/App.tsx` is only a
placeholder dot-grid demo. This milestone replaces it with the real application shell.

Per the user's scoping decision, this milestone delivers a **deep, functional core vertical slice**
plus the foundations (brand, tokens, responsive shell, navigation, reusable component kit). Remaining
areas (community, expenses, journal, weather, safety, settings, dark mode, offline) are reachable but
**stubbed** with polished empty/coming-soon states, ready to grow in later milestones.

### Core slice flow (fully functional)
Splash → Onboarding (Discover → Persona → Priorities) → Home → AI Planner → Generated Trip →
Route (intelligence + along-route discovery) → Comparison (modes + offers) → **Save selection** →
Trip Workspace (Overview / Itinerary / Map / Saved / Expenses / Journal tabs) → **Basic Expense entry**.
Overview + Itinerary + Saved + basic Expenses are **real functional state**; Map is stylized; Journal
is light. Selected offers and expense state persist for the session (AppContext).

### Refinements applied (from geo-journey-plan-refinement.md)
This plan incorporates the refinement pass: keep Milestone-1 scope and all prior good decisions
(exact color system, Inter, responsive shell, reusable kit, clean service separation, Mumbai→Goa mock
data, deterministic arithmetic, no Figma-Make lock-in, provider-agnostic services, lightweight mock map)
and additionally — (1) reserve extension points for the full future product, (2) strengthen Comparison,
(3) add functional basic expenses, (4) structured `TripPlan` AI model, (5) map behind a `MapService`
abstraction, (6) `StorageService` boundary, (7) full responsive rules from the start, (8) documented
future screen inventory, (9) preserve the Level 1/2/3 strategy with no frontend redesign between levels.

## Design foundations

- **Brand palette (from spec, non-negotiable):** Primary `#0B5FFF`, Primary Dark `#0849CC`,
  Cyan `#10BEEA` (maps/route/discovery), Green `#16B978` (positive/eco/confirmed), Indigo `#4257D6`
  (secondary/analytics), **AI Purple `#7C4DFF` — AI only**, Red `#EF4444` — danger/emergency only.
  Background `#F6F9FC`, Surface `#FFFFFF`, text `#0F172A`/`#475569`/`#64748B`, border `#E2E8F0`.
  Dark mode tokens per spec (bg `#0F172A`, surface `#172033`).
- **Typography:** Inter (public Google Font) via `@import` at the top of `src/index.css`. Type scale
  mapped to spec (Display 44/52, H1 32/40, H2 24/32, H3 20/28, Body 16/24, Label 13/18 semibold,
  Route Score 32/36 bold).
- **Radii:** 8 controls, 12 buttons/inputs, 16 cards, 20 feature cards, 24 hero, 999 pills.
- **Spacing:** 4px base scale (Tailwind default aligns).
- Call `create_make_theme` at implementation start with a 1–2 sentence GeoJourney summary, then reconcile
  its output with the spec's fixed tokens (spec wins on color/type) when authoring the theme block.
- **Logo:** original GeoJourney mark — location pin + route line + compass cue, drawn as inline SVG
  component (`Logo.tsx`) with `symbol` / `wordmark` / `mono` / `inverse` variants; recognizable at 24px.
  No airplane, no globe. Used in header/sidebar/splash and as favicon.

## Architecture

Keep UI separate from data access; mock provider logic separate from future live logic; no Figma-Make
lock-in so the code can be exported to GitHub later.

```
src/
  index.css                 # Inter @import, @theme tokens, radii, base styles, dark block
  main.tsx                  # unchanged entry
  App.tsx                   # AppShell + router host + global providers
  brand/Logo.tsx            # brand mark variants
  lib/
    router.tsx              # tiny hash/state router (no dep) OR react-router if approved
    format.ts               # currency (₹), distance, duration, date helpers (deterministic, NOT AI)
  types/                    # domain models: Offer, Trip, Route, Place, Persona, Expense, ...
    index.ts                # includes Offer contract (provider, sourceType MOCK|PUBLIC|API|..., retrievedAt)
  services/                 # provider-agnostic service boundaries (async, return Promises)
    index.ts                # service registry / exports
    TripService.ts  RouteService.ts  ComparisonService.ts  LocationService.ts
    AIOrchestrator.ts       # deterministic-first; returns mock "AI" itineraries + insights
    ProviderAdapterService.ts  # normalizes mock offers -> Offer contract
    (stubs) WeatherService, SafetyService, ExpenseService, CommunityService, ...
  mocks/                    # structured mock data ONLY (no random values in components)
    trips.ts  routes.ts  offers.ts  places.ts  personas.ts  mumbai-goa.ts (canonical journey)
  state/
    AppContext.tsx          # onboarding persona/priorities, current trip, saved items, toasts
  components/ui/            # reusable kit: Button, Input, Search, Chip, FilterChip, Badge, Rating,
                            # Avatar, Card primitives, Modal, BottomSheet, Toast, Skeleton,
                            # EmptyState, ErrorState, Tabs, ScoreDial, MapCanvas (stylized SVG map)
  components/nav/           # MobileBottomNav, DesktopSidebar, TabletRail, TopBar
  components/cards/         # PlaceCard, HotelCard, RouteCard, OfferCard, ComparisonCard, AICard,
                            # TripCard, ExpenseCard, TimelineItem, WeatherCard(stub), SafetyCard(stub)
  screens/
    Splash.tsx  onboarding/{Discover,Persona,Priorities}.tsx
    Home.tsx  Explore.tsx(light)
    planner/{Planner,Generating,GeneratedTrip}.tsx
    route/{RoutePlanner,RouteResults}.tsx
    compare/{ComparisonHub,OfferDetail}.tsx
    trip/{TripWorkspace + tab panels}.tsx
    stubs/{Community,Expenses,Journal,Safety,Weather,Settings,Profile}.tsx  # polished coming-soon
```

- **Router:** lightweight built-in state/hash router (zero new deps) is sufficient for a prototype and
  keeps export clean. (The `react-router` skill is available if the user later prefers URL routes.)
- **Map:** no external tiles/keys. `MapCanvas` renders a stylized SVG map surface (OSM-style abstract
  geography) with route polyline + pins — MapLibre/OSRM-compatible concepts documented in code comments
  as the future swap point. Cyan is the map/route color.
- **AIOrchestrator / AIService boundary:** deterministic-first. Arithmetic (distance, budget, route
  score, price sort) is computed in `format.ts`/services, never "AI". The orchestrator returns a
  **structured `TripPlan` object** (not raw text) that all AI UI consumes:
  `{ summary, source, destination, dates, travelMode, budget, routeSummary, routeScore, days[], stops[],
  restaurants[], attractions[], hotelSuggestions[], estimatedExpenses[], packingSuggestions[],
  weatherNotes[], safetyNotes[] }`. Staged AI states (Idle→Generating→Analyzing→Finding Routes→Finding
  Places→Optimizing Budget→Result), AI Purple only. The `AIService` boundary lets mock generation be
  swapped for browser AI / Gemini / Workers AI / Ollama later without touching screens.
- **MapService abstraction:** the Route UI depends on `MapService` (route geometry, pins, bounds),
  **never on the SVG implementation directly**. Milestone 1 backs it with the stylized `MapCanvas` SVG;
  future swap path Mock SVG → MapLibre → real routing/map provider reuses the same UI.
- **StorageService boundary:** `upload/download/delete/getUrl/createUploadUrl` interface exists as a
  seam even though large-file storage isn't implemented now. Media architecture stays out of UI
  components; future providers (Supabase Storage, Cloudflare R2, S3-compatible, self-hosted,
  user-owned) attach behind it. Media metadata kept separate from data rows (per spec).
- **Comparison (core differentiator — built functionally in M1):** mock comparison flows for
  **Car, Bike, Flight, Train, Bus, and Hotels**, with working ranking modes `CHEAPEST`, `FASTEST`,
  `BEST_VALUE`, `BEST_RATED`, `BEST_FLEXIBLE`, `BEST_FOR_USER` (last one weights by the user's persona/
  priorities from onboarding). Ranking is deterministic in `ComparisonService`.
- **Offer contract & sourceType:** every result carries the full contract
  `{ id, provider, providerType, productType, title, price, currency, duration, rating, cancellation,
  amenities, availability, bookingUrl, sourceType, retrievedAt }`. `sourceType ∈
  {MOCK, PUBLIC, API, AFFILIATE, WIDGET, MANUAL}` — all `MOCK` in M1. Shows visible "Demo/Test Data" +
  "Checked recently / Price checked at [time]"; never implies a guaranteed price. "View Deal" is an
  external-link placeholder that clearly signals external redirect. No real provider APIs in M1.
- **Basic Expenses (functional in M1):** Add Expense form (Category / Amount / Date / Description);
  categories Fuel, Food, Stay, Toll, Shopping, Misc. Trip Workspace shows **Trip Budget / Total Spent /
  Remaining** from real AppContext + `ExpenseService` state (not hard-coded). Sums via `format.ts`,
  not AI. Advanced analytics deferred.

## Canonical mock data
Mumbai → Goa, 18–20 Oct, Bike, ₹15,000 budget, 590 km, Route Score 88/100 (Safety 92, Road 84,
Weather 90, Traffic 81), 3-day itinerary (Mumbai→Ratnagiri→North Goa→Goa exploration), stops
(Riverstone Café, viewpoint, fuel, lunch, sunset, stay). Comparison across Bike/Car/Flight/Train/Bus
+ hotel/train/bus offers. All flagged demo/test.

## Responsive strategy (intentional, not stretched)
- **Mobile 390:** one column, 16px padding, bottom nav (Home/Explore/Trips/Community/Profile), bottom
  sheets for detail/save.
- **Tablet 834:** navigation rail, map/content split, two-column where useful.
- **Desktop 1440+:** left sidebar (full nav list), 12-col feel, ~1200–1280px content max, optional right
  contextual panel; large map/content compositions. Breakpoint work at ~768 and ~1024.

## States, motion, a11y
- Loading (skeletons, route-calc, AI generation, comparison), error (no results, AI/route/location
  unavailable, retry — never brick the whole app), empty (no trips/saved/expenses/etc.) states built as
  reusable components.
- Motion: fade/slide/scale via CSS transitions + a small `useTransition`-style page transition; durations
  150–500ms per spec; no bounce/spin. Respect `prefers-reduced-motion`.
- A11y: semantic controls, visible focus rings (`--ring`), AA contrast, touch targets ≥44px, labels not
  color-only (icons/text on scores, badges, alerts), aria labels on icon buttons.

## Implementation order (this milestone)
1. `index.css` tokens + Inter + base; `Logo.tsx`; favicon.
2. UI kit (`components/ui`) + nav components + `AppShell`/router in `App.tsx`.
3. Types + mocks (Mumbai→Goa) + services (TripService, RouteService, ComparisonService, AIOrchestrator,
   ProviderAdapterService) + `AppContext`.
4. Splash → Onboarding (Persona/Priorities persisted to context).
5. Home (greeting, search, AI card, quick actions, recent trips, along-route, recommended).
6. Planner → Generating (AI states) → Generated Trip (actions).
7. Route Results (map + intelligence ScoreDial + along-route discovery + alerts).
8. Comparison Hub (Car/Bike/Flight/Train/Bus/Hotels, 6 ranking modes incl. BEST_FOR_USER, Offer
   contract + demo labels, View Deal placeholder) → Offer Detail → Save selection to trip.
9. Trip Workspace tabs (Overview/Itinerary/Saved real; Map via MapService; **basic Expenses functional**
   — Add Expense + Budget/Spent/Remaining; Journal light).
10. Stub screens (Community/Expenses/Journal/Safety/Weather/Settings/Profile) with polished coming-soon.
11. Responsive + loading/empty/error + motion + a11y pass over the slice.

## Future product architecture — reserved extension points
Milestone 1 does not implement every module, but the architecture **explicitly reserves seams** so
adding them later needs no core rewrite. Each future module gets a documented boundary now:
- **Services (stubbed interfaces in `services/`):** AuthService, ProfileService, TravelPersonaService,
  ReviewService, CommentService, CommunityService, SocialService (followers/following), WeatherService,
  SafetyService, NotificationService, JournalService, AnalyticsService, GamificationService,
  OfflineService, StorageService, DatabaseService, ProviderAdapterService (booking redirects/provider
  integrations). Each exports typed method signatures returning mock data or `notImplemented()`.
- **Routes:** the router's route table lists every future screen id (below) pointing to stub screens,
  so navigation targets already resolve.
- **Components:** card/detail component slots (ReviewCard, CommentThread, NotificationItem, BadgeChip,
  AnalyticsTile) scaffolded as light components consumed by stubs.

## Future screen inventory (stubbed in M1, extension points documented)
Authentication (Login/Signup/Forgot/Guest/Verify) · Explore · AI Assistant · Route states ·
Comparison states · Hotel screens · Flight screens · Train screens · Bus screens · Place detail ·
Community map · Add location · Community feed · Social profile (followers/following) · Journal ·
Weather · Safety · Emergency (SOS) · Notifications · Saved · Settings (incl. dark mode, privacy,
data export, account deletion, AI prefs, offline) · Offline states · Analytics · Gamification.
Each is reachable and renders a polished coming-soon/empty state with a comment marking its future home.

## Level 1 / 2 / 3 strategy (frontend stable across all three)
- **Level 1 (this milestone):** mock services + structured data; everything behaves as real.
- **Level 2:** provider adapters swap MOCK for PUBLIC/test sources behind the same service/Offer
  contract; UI unchanged. `sourceType` + "Checked recently" labels already carry this.
- **Level 3:** approved provider APIs, Supabase/production storage, secure keys, RLS, caching,
  monitoring, data export, account deletion. Migration must not require redesigning the core UX —
  guaranteed by the service/adapter/StorageService/MapService/AIService boundaries above.

## Explicitly deferred (documented assumptions)
- Supabase/auth backend (mock auth + guest mode UI only), real weather/safety data, full community
  social graph, expenses analytics depth, journal story builder, dark-mode full audit, offline service
  worker, gamification points/leaderboards. Architecture leaves seams (service stubs, Offer sourceType,
  StorageService concept in comments) so these attach without redesigning the core UX.
- No new heavy deps unless needed; charts (if any expense/analytics viz) would use `recharts`.

## Verification
- Dev server already runs on `$PORT`; verify no build/type errors after the slice lands (single
  typecheck/build run, not per-file).
- **M1 success criterion:** a user completes the full flow on mock data and returns to the Trip
  Workspace with selected items **and** basic expense state preserved for the session:
  Splash auto-advances → onboarding selections persist → Home reflects persona → Planner generates a
  structured `TripPlan` (AI states cycle) → Generated Trip → Route shows 88/100 + map + discoveries →
  Comparison ranks across all 6 modes and shows demo-data + View-Deal external notice → Save adds the
  offer to the trip → Trip Workspace tabs switch, show saved items/itinerary, and Add Expense updates
  Budget/Spent/Remaining live.
- Check three viewports (390 / 834 / 1440) transform layout (not just scale).
- Confirm AI Purple appears only on AI surfaces and Red only on danger/emergency.
```
