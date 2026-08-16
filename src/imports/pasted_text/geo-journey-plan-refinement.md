Refine the existing GeoJourney Core Vertical Slice plan before implementation.

DO NOT start building yet.

Keep the existing Milestone 1 scope:

Splash
→ Onboarding
→ Home
→ AI Planner
→ Generated Trip
→ Route
→ Comparison
→ Trip Workspace

Keep all existing good decisions:

* exact GeoJourney color system
* Inter typography
* responsive shell
* reusable UI kit
* clean service separation
* structured Mumbai→Goa mock data
* deterministic arithmetic
* no Figma Make lock-in
* provider-agnostic services
* lightweight initial mock map

Now make the following architectural corrections.

1. PRESERVE FULL FUTURE PRODUCT ARCHITECTURE

Even though Milestone 1 does not fully implement every feature, the architecture must explicitly reserve extension points for all modules in the master specification:

Authentication
Profiles
Travel Personas
Trips
Routes
Locations
Reviews
Comments
Community
Expenses
Weather
Safety
Comparison
Hotels
Flights
Trains
Buses
AI
Journal
Notifications
Offline
Gamification
Analytics
Settings
Storage
Social/Followers
Provider integrations
Booking redirects

Create clear future route/service/component boundaries so adding these later does not require rewriting the core architecture.

2. STRENGTHEN COMPARISON IN MILESTONE 1

Comparison is a core GeoJourney differentiator.

Implement functional MOCK comparison flows for:

Car
Bike
Flight
Train
Bus
Hotels

Support ranking modes:

CHEAPEST
FASTEST
BEST_VALUE
BEST_RATED
BEST_FLEXIBLE
BEST_FOR_USER

Each normalized Offer should conceptually support:

id
provider
providerType
productType
title
price
currency
duration
rating
cancellation
amenities
availability
bookingUrl
sourceType
retrievedAt

sourceType:

MOCK
PUBLIC
API
AFFILIATE
WIDGET
MANUAL

For Milestone 1 all results may use MOCK.

Display a visible:
"Demo/Test Data"
or
"Checked recently"
status as appropriate.

View Deal must behave as an external-link placeholder.

Do not implement real provider APIs yet.

3. ADD BASIC EXPENSE FUNCTIONALITY TO MILESTONE 1

The Trip Workspace should not only be a visual shell.

Implement a simple mock expense flow:

Add Expense
Category
Amount
Date
Description

Categories:

Fuel
Food
Stay
Toll
Shopping
Misc

Show:

Trip Budget
Total Spent
Remaining

Use real local application state/mock service data rather than hard-coded text.

The advanced expense analytics can remain for later milestones.

4. STRENGTHEN AI DATA STRUCTURE

Do not make the AI planner simply return unstructured text.

Create a structured mock TripPlan model containing:

trip summary
source
destination
dates
travel mode
budget
route summary
route score
days
stops
restaurants
attractions
hotel suggestions
estimated expenses
packing suggestions
weather notes
safety notes

The AI UI should consume this structured object.

Create an AIOrchestrator/AIService boundary so later we can replace mock generation with real providers such as browser AI, Gemini, Workers AI or Ollama without redesigning the screens.

5. STRENGTHEN MAP ARCHITECTURE

The Milestone 1 stylized SVG map is acceptable.

However, isolate map functionality behind a MapService or equivalent abstraction.

The Route UI must not depend directly on the SVG implementation.

Future replacement path:

Mock SVG map
→ MapLibre
→ real routing/map provider

The visual UI should remain reusable.

6. STORAGE ARCHITECTURE

Include a StorageService boundary even though large file storage is not fully implemented in Milestone 1.

Future providers:

Supabase Storage
Cloudflare R2
S3-compatible storage
self-hosted storage
user-owned storage

Do not place media architecture directly into UI components.

7. FULL RESPONSIVE ARCHITECTURE

Keep:

390x844 mobile
834x1194 tablet
1440x1024 desktop

The vertical slice should establish responsive rules from the start.

Do not merely stretch mobile.

8. FUTURE SCREEN INVENTORY

Add an explicit future screen inventory to the plan so the full master specification is preserved.

Include future areas:

Authentication
Explore
AI Assistant
Route states
Comparison states
Hotel screens
Flight screens
Train screens
Bus screens
Place detail
Community map
Add location
Community feed
Social profile
Journal
Weather
Safety
Emergency
Notifications
Saved
Settings
Offline
Analytics
Gamification

These can remain stubbed for later but must have documented extension points.

9. MOCK-FIRST / TESTING / PRODUCTION

Keep the three-level strategy:

LEVEL 1:
Mock services and data.

LEVEL 2:
Testing/live-source experimentation.

LEVEL 3:
Production-approved integrations and hardened infrastructure.

The frontend should not need redesign between levels.

10. FIRST MILESTONE SUCCESS CRITERIA

Milestone 1 should provide a genuinely coherent vertical slice:

Splash
→ Onboarding
→ Home
→ AI Planner
→ Generated Trip
→ Route
→ Comparison
→ Save selection
→ Trip Workspace
→ Basic Expense

A user should be able to complete this flow using structured mock data and return to the Trip Workspace with their selected items and basic expense state preserved during the session.

Do not implement the entire future product now.

Do not expand Milestone 1 into dozens of unrelated screens.

The goal is deep functionality in the core journey while keeping every future module architecturally extensible.

After applying these changes, return the revised plan for review.

DO NOT BUILD YET.
