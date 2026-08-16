# GeoJourney — Milestone 2 (User + Community Foundation)

## Context

M1 (core vertical slice: Splash→Onboarding→Home→AI Planner→Generated Trip→Route→
Comparison→Trip Workspace + basic expenses) is complete and verified. M2 expands it into
the first real **user + community** foundation, using the existing GeoJourney design system
exactly (no new colors/type/spacing) and **preserving all M1 flows**.

Work already completed this milestone (do not redo):
- Types appended in `src/types/index.ts` (User, AuthStatus, CommunityCategory,
  CommunityLocation, Review, Comment, MediaUploadState).
- Mocks: `src/mocks/community.ts` (DEMO_USER, COMMUNITY_CATEGORIES, COMMUNITY_LOCATIONS,
  COMMUNITY_REVIEWS, COMMUNITY_COMMENTS).
- Services promoted from stubs: `AuthService`, `StorageService`, `CommunityService`,
  `ReviewService`, exported from `src/services/index.ts`.
- `src/state/AppContext.tsx` extended: user/authStatus/signInUser/logout/updateUser,
  wishlist (+toggle/is/addToTrip), communityLocations (+add), reviews/comments
  (+addReview/toggleHelpful/addComment/report).
- Router route names added in `src/lib/router.tsx`: login, signup, forgot-password,
  edit-profile, add-location, place-detail.
- `src/components/ui/MediaUpload.tsx` (StorageService seam, idle/uploading/success/error).
- Auth screens: `AuthShell.tsx`, `Login.tsx`, `SignUp.tsx`, `ForgotPassword.tsx`.

## Remaining work

1. **Profile** (`src/screens/profile/EditProfile.tsx`, enhance existing `Profile.tsx`):
   EditProfile edits name/bio/personas/priorities via `updateUser`. Profile surfaces auth
   state, Edit Profile link, Travel Persona + Preferences, My Trips, Saved Places, Reviews,
   Contributions, Achievements (placeholder), and `logout` → `login`.

2. **Community Map** (`src/screens/community/CommunityMap.tsx`, replaces Community stub):
   `MapCanvas` with community pins + category filter chips, selectable pins → place preview
   sheet with save/directions/review/discuss/report; opens PlaceDetail.

3. **Add Location** (`src/screens/community/AddLocation.tsx`): category, location,
   description, `MediaUpload` photos, rating; Publish / Save Draft via `addCommunityLocation`.

4. **Place Detail** (`src/screens/place/PlaceDetail.tsx`): reusable for restaurant/hotel/
   attraction/community; contributor info, reviews, ratings, comments, helpful, report,
   save, directions, add review/comment.

5. **Saved Places** (`src/screens/SavedPlaces.tsx`, replaces Saved stub): wishlist with
   category filter (Restaurants/Hotels/Attractions/Community), Add to Trip, Remove.

6. **App wiring** (`src/App.tsx`): add all new routes to Screen() switch + TITLES; add auth
   screens to FULLSCREEN; replace Community/Saved stub imports with real screens.

## Constraints
- Reuse existing UI kit (primitives, overlays, states, Tabs, MapCanvas, cards) and tokens
  only — no new visual styles. AI Purple stays AI-only; Red danger-only (report actions).
- Do not touch M1 screens/flows beyond the Community/Saved stub swap and Profile enhancement.
- Keep future seams (Weather/Safety/Journal/Offline/Social/Gamification/Analytics/
  Notifications/providers) as reserved stubs — do not implement.

## Verification
- `npx tsc --noEmit` and `npx vite build` clean.
- M1 flow still works end-to-end; M2 navigation reaches all new screens.
- Responsive at 390 / 834 / 1440.
- No unrelated functionality rewritten.
