You are the lead product designer, UX architect, visual designer, frontend architect, full-stack prototype architect, interaction designer, accessibility specialist and technical product architect for a product called GeoJourney.

IMPORTANT EXECUTION MODE

FIRST:
Use PLAN MODE.

DO NOT immediately generate the full application.

First analyze the complete specification below.

Create a detailed implementation plan covering:

* product architecture
* information architecture
* screen architecture
* component architecture
* responsive architecture
* state architecture
* mock-data architecture
* backend architecture
* Supabase integration
* storage architecture
* AI architecture
* comparison architecture
* route architecture
* community architecture
* prototype transitions
* animation system
* accessibility
* loading/error/empty states
* testing strategy
* implementation order
* dependencies between features
* assumptions
* risks
* features that must remain mocked during this phase
* features that can be implemented functionally now
* areas where the generated backend should remain provider-agnostic

Do not build until the plan is complete.

After the plan is produced, the plan should be structured so it can be reviewed and then executed in controlled milestones inside this same Make project.

==================================================
PRODUCT
=======

Product name:
GeoJourney

Tagline:
Plan the journey, not just the destination.

Deadline:
31 December 2026

PRIMARY OBJECTIVE

Create a real, responsive travel companion application experience rather than a collection of static mockups.

GeoJourney should feel like one connected travel operating system for a traveler.

The core product helps people:

* plan trips
* compare ways to travel
* compare travel offers
* discover places
* build routes
* discover things along routes
* save everything into a trip workspace
* track expenses
* contribute community information
* use AI for planning and personalization
* understand weather
* understand safety information
* create travel memories
* build a journal
* eventually follow external providers for booking

BOOKING MODEL

GeoJourney does NOT process payments or issue tickets in this stage.

The product experience is:

search
→ collect available/test offer information
→ normalize results
→ compare
→ rank
→ explain
→ send user to external provider using booking/deep link

The user completes booking on the provider website.

Do not implement payment processing.

Do not implement provider-side ticket issuance.

Do not implement refunds or cancellations as GeoJourney-owned systems.

==================================================
BUILD LEVELS
============

LEVEL 1 — MOCK

Build a complete functional experience using realistic structured mock data.

Everything should behave as though it were real.

Mock:

* routes
* hotels
* flights
* trains
* buses
* restaurants
* attractions
* community posts
* reviews
* weather
* safety examples
* price offers
* AI results where a real AI provider is not yet required

Use proper service boundaries.

Do NOT hard-code fake values randomly inside individual components.

Instead create structured mock service/data layers.

LEVEL 2 — TESTING

Prepare provider adapters and data sources so current/test/publicly accessible information can later be connected without changing the main UI.

Every comparison result should conceptually support:

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

Never imply that a test or mock price is guaranteed.

Display:
Demo/Test Data
or
Checked recently
where appropriate.

LEVEL 3 — PRODUCTION

The architecture should later support:

* approved provider APIs
* affiliate/deep links
* production storage
* secure API keys
* rate limiting
* caching
* monitoring
* backups
* privacy
* stronger RLS
* account deletion
* data export
* terms/privacy
* production-scale infrastructure

The production migration must not require redesigning the main user experience.

==================================================
DESIGN PHILOSOPHY
=================

PRODUCT PERSONALITY

* adventurous
* intelligent
* premium
* trustworthy
* modern
* calm
* friendly
* discovery-oriented
* travel-focused

The product should feel emotionally exciting while remaining highly usable.

Do not create a generic SaaS dashboard.

Do not make everything a card.

Use visual hierarchy.

Use large photography for emotional storytelling.

Use maps as functional visual surfaces.

Use concise data visualization.

Keep the experience clean despite high information density.

DO NOT copy:
Google Maps
Airbnb
Spotify
Notion
or another existing travel product.

Use those products only as broad inspiration for:

* clarity
* organization
* discovery
* media presentation
* interaction quality

GeoJourney must have its own visual identity.

==================================================
GE0JOURNEY COLOR SYSTEM
=======================

Primary:
#0B5FFF

Primary Dark:
#0849CC

Cyan:
#10BEEA

Green:
#16B978

Indigo:
#4257D6

AI Purple:
#7C4DFF

Background:
#F6F9FC

Surface:
#FFFFFF

Primary Text:
#0F172A

Secondary Text:
#475569

Muted Text:
#64748B

Border:
#E2E8F0

Success:
#16A34A

Warning:
#F59E0B

Danger:
#EF4444

Info:
#0284C7

SEMANTIC COLOR RULES

Blue:
primary GeoJourney brand and major actions

Dark blue:
pressed/strong brand states

Cyan:
maps, route intelligence, discovery and location context

Green:
positive conditions, eco travel, success and confirmed information

Indigo:
secondary information, analytics and navigation support

Purple:
AI ONLY

Red:
emergency, dangerous situations, destructive actions and critical errors ONLY

Do not introduce random accent colors.

Avoid excessive gradients.

==================================================
TYPOGRAPHY
==========

Primary font:
Inter or closest available equivalent.

Styles:

Display:
44px / 52px / Bold

H1:
32px / 40px / Bold

H2:
24px / 32px / Bold

H3:
20px / 28px / Semibold

Body Large:
18px / 26px / Regular

Body:
16px / 24px / Regular

Body Medium:
16px / 24px / Medium

Body Small:
14px / 20px / Regular

Label:
13px / 18px / Semibold

Caption:
12px / 16px / Medium

Button:
15px / 20px / Semibold

Route Score:
32px / 36px / Bold

==================================================
SPACING
=======

Use a 4px base system.

4
8
12
16
20
24
32
40
48
64

==================================================
CORNER RADIUS
=============

8px small controls
12px buttons and inputs
16px normal cards
20px feature cards
24px hero surfaces
999px pills

==================================================
RESPONSIVE DEVICES
==================

Primary Mobile:
390 × 844

Primary Tablet:
834 × 1194

Primary Desktop:
1440 × 1024

Larger Desktop:
1920 × 1080

IMPORTANT:

Do not merely scale mobile into desktop.

Use intentional layout transformations.

MOBILE:

* one primary content column
* 16px outer padding
* bottom navigation
* bottom sheets
* touch-friendly interactions

TABLET:

* navigation rail
* two-column content where useful
* map/content split
* 24–32px outer spacing

DESKTOP:

* left sidebar
* 12-column layout
* 1200–1280px main content max width
* optional contextual right panel
* large map/content compositions

==================================================
DESIGN FILE / SCREEN ORGANIZATION
=================================

Treat screens as separate application states.

Organize the conceptual screen inventory as:

00 Cover

01 Foundations

02 Components

03 Patterns

04 MVP Mobile

05 MVP Tablet

06 MVP Desktop

07 Prototype

08 Comparison

09 AI Experiments

10 Future Features

11 Design QA

12 Archive

Create and use meaningful screen names.

Mobile screen naming convention:
MOB / [number] [feature] / [state]

Examples:
MOB / 01 Splash
MOB / 02 Onboarding / Discover
MOB / 03 Onboarding / Persona
MOB / 07 Home / Default
MOB / 11 Route / Results
MOB / 13 Compare / Hub

==================================================
BRAND / LOGO
============

Create an original GeoJourney logo.

Concept:
geography + route + movement + exploration + compass.

Primary visual concept:
location pin + route line + subtle directional/compass cue.

Requirements:

* recognizable at 24px
* recognizable as app icon
* favicon compatible
* monochrome version
* dark background version
* light background version
* symbol-only version
* horizontal lockup
* visually distinctive
* geometric
* premium
* simple
* no airplane icon
* no generic globe
* no copied travel-company symbol

Create:

1. primary symbol
2. wordmark
3. icon
4. monochrome version
5. inverse version

Use:
#0B5FFF
#10BEEA
#16B978

White versions for dark backgrounds.

The final selected concept should be usable throughout the application.

==================================================
DESIGN SYSTEM / COMPONENTS
==========================

Create/reuse reusable components for:

Button
Input
Search
Location Input
Date Picker
Range Selector
Travel Mode Selector
Chip
Filter Chip
Rating
Badge
Avatar
Place Card
Restaurant Card
Hotel Card
Attraction Card
Route Card
Comparison Card
Offer Card
AI Card
Weather Card
Safety Card
Expense Card
Trip Card
Timeline Item
Community Post
Review Card
Comment
Map Pin
Selected Map Pin
Map Controls
Bottom Sheet
Modal
Dialog
Toast
Skeleton
Empty State
Error State
Success State
Mobile Bottom Navigation
Desktop Sidebar

Each important interactive component should have:

Default
Hover
Pressed
Selected
Disabled
Loading
Success
Error

Use reusable variants.

Use Auto Layout.

Use sensible constraints.

Use semantic naming.

==================================================
NAVIGATION
==========

MOBILE:

Home
Explore
Trips
Community
Profile

DESKTOP:

Home
Explore
Plan Trip
Trips
Community
Saved
Expenses
Journal
Profile
Settings

Primary CTA:
Plan My Trip

==================================================
CORE USER ONBOARDING
====================

Splash

Onboarding Discover

Onboarding Travel Persona

Onboarding Priorities

Travel persona options:

Budget Traveler
Luxury Traveler
Biker
Family
Solo
Adventure
Photographer
Food Explorer

Allow multiple selections where appropriate.

Travel priorities:

Lower Cost
Save Time
Scenic Routes
Great Food
Comfort
Safety
Hidden Gems
Photography
Local Experiences
Flexible Booking

==================================================
AUTHENTICATION
==============

Visual screens:

Login
Signup
Forgot Password
Guest Mode
Account Verification

In the functional prototype:
mock authentication where appropriate.

In backend stage:
prepare Supabase Auth.

==================================================
HOME
====

Home should include:

Header
GeoJourney logo
notifications
profile avatar

Greeting

Destination search

AI planner card

Quick actions:
Explore
Compare
Trips
Expenses

Recent Trips

Along Your Route

Weather

Recommended places

Bottom navigation

AI card:
light lavender
AI Purple #7C4DFF

Headline:
Plan the whole journey with AI

Supporting:
Tell GeoJourney your destination, dates, budget and travel style.

==================================================
TRIP PLANNING
=============

Fields:

Starting point
Destination
Travel date
Return date
One-way
Round trip
Multi-city
Budget
Travel mode
Travel persona
Priority

Natural language AI prompt examples:

"Plan a 3-day Goa trip under ₹15,000."

"Plan a family trip from Mumbai to Manali."

"Plan a scenic bike trip."

"Plan a photography-focused road trip."

"Plan a food-first weekend."

==================================================
AI TRIP PLANNER
===============

AI planner should generate conceptually:

complete itinerary
route
attractions
food stops
hotels
budget breakdown
travel timing
emergency stops
packing suggestions
weather advice
travel warnings
personalized recommendations

AI states:

Idle
Typing
Generating
Analyzing
Finding Routes
Finding Places
Optimizing Budget
Result
Regenerate
Edit Preferences
Error

Use AI Purple ONLY for AI.

AI should feel calm and intelligent, not flashy.

==================================================
GENERATED TRIP
==============

Example:

Mumbai → Goa

3 days
₹14,620 estimated
Bike
590 km

Route Score:
88/100

Day 1
Mumbai → Ratnagiri

Day 2
Ratnagiri → North Goa

Day 3
Goa exploration

Stops:
Breakfast
Fuel
Scenic viewpoint
Lunch
Sunset
Hotel

Actions:

Build This Trip
Change Budget
Make More Scenic
Make More Affordable
Add Food Stops

==================================================
TRAVEL MODES
============

Car
Bike
Train
Flight
Bus
Walking
EV
Local Transport

Alternative routes:

Fastest
Cheapest
Scenic
Adventure
Family Friendly
Bike Friendly

==================================================
ROUTE SYSTEM
============

Route Planner

Source
Destination
Date
Travel mode

Large map.

Route options.

Route Intelligence:

Distance
Travel Time
Fuel Cost
Toll Cost
Road Quality
Safety
Traffic
Weather
Overall Route Score

Example:

88/100

Safety 92
Road Quality 84
Weather 90
Traffic 81

Route alerts:

Road Closure
Flood
Landslide
Construction
Accident
Dangerous Turn

==================================================
ALONG-THE-WAY DISCOVERY
=======================

Discover:

Restaurants
Cafes
Dhabas
Hotels
Hostels
Fuel Stations
EV Chargers
Hospitals
Pharmacies
Mechanics
Puncture Shops
Viewpoints
Lakes
Beaches
Waterfalls
Mountains
Temples
Historical Sites
Hidden Gems

Each discovery should support:

View
Save
Add to Trip
Directions
Review
Share

==================================================
FILTERS
=======

Price
Rating
Distance
Locality
Travel Mode
Amenities
Open Now
Family Friendly
Bike Friendly
Parking
Pet Friendly

Create reusable filtering UI.

==================================================
HOTELS
======

Hotel Listings

Photos

Rating

Reviews

Amenities

Price

Cancellation

Distance

Locality

Family Friendly

Bike Friendly

Parking

Best Deal

Best Value

Best Flexible

Wishlist

View Deal

Provider

Last Checked

Booking redirect

==================================================
RESTAURANTS
===========

Restaurant listings

Rating

Reviews

Cuisine

Price

Distance

Open Now

Local recommendation

Hidden Food Gem

Dhaba

Food Photos

AI recommendation

==================================================
ATTRACTIONS
===========

Popular

Hidden

Community

Historical

Nature

Photography

Local Recommendations

==================================================
COMPARISON ENGINE
=================

This is a core GeoJourney feature.

The product should let a user see multiple travel options in one unified experience.

Example:

Mumbai → Goa

Compare:

Bike
Car
Flight
Train
Bus

Then compare relevant offers:

Hotels
Flights
Trains
Buses

Comparison dimensions:

Price
Duration
Rating
Cancellation
Direct/Non-stop
Baggage
Amenities
Distance
Trust
Personalization
Convenience

Sorting:

Cheapest
Fastest
Best Value
Best Rated
Best Flexible
Best for Me

Offer model:

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

Provider source types:

MOCK
PUBLIC
API
AFFILIATE
WIDGET
MANUAL

Current price UX:

show:
Checked recently
or
Price checked at [time]

Never claim test/mock prices are guaranteed.

Comparison cards should have:

Provider logo/name
Price
Rating
Duration
Cancellation
Amenities
Best Value/Best Price badge
Last checked
View Deal

View Deal should clearly indicate external navigation.

==================================================
COMPARISON CATEGORIES
=====================

Travel modes:

Car
Bike
Flight
Train
Bus

Stays:

Hotels
Hostels

Future:

Activities

==================================================
COMMUNITY MAP
=============

Community map with:

restaurants
viewpoints
waterfalls
hidden gems
fuel
hotels
safety alerts
bike stops
parking
camping
local recommendations

Each community location:

Photo
Name
Category
Rating
Distance
Contributor
Helpful votes
Comments
Updated time
Trust/verification indicator

Actions:

Save
Directions
Review
Discuss
Report

==================================================
COMMUNITY CONTRIBUTIONS
=======================

Add Location

Name
Category
Map location
Photos
Description
Rating

Categories:

Food
Scenic
Hidden Gem
Hotel
Fuel
Attraction
Safety

Primary:
Publish

Secondary:
Save Draft

==================================================
COMMUNITY SOCIAL
================

Followers
Following
Public Travel Profiles
Shared Trips
Travel Stories
Feed
Discussions

User content:

Photo
Caption
Trip
Location
Rating
Review
Comments
Upvotes
Downvotes

Contributor reputation.

==================================================
PROFILE
=======

Profile photo

Name

Bio

Travel persona

Stats:

Trips
Distance
Places
Contributions

Badges:

Explorer
Local Guide
Route Master
Food Expert
Photographer

Sections:

My Trips
Saved Places
Reviews
Journal
Achievements
Settings

==================================================
EXPENSES
========

Expense categories:

Fuel
Food
Hotel
Flight
Train
Toll
Shopping
Misc

Display:

Total

Budget

Actual

Remaining

Budget vs Actual

Daily Spending

Expense Report

AI insight:

example:
"You are currently 18% below your planned daily spending."

AI Purple only for AI insight.

==================================================
TRIP WORKSPACE
==============

Every trip gets a workspace.

Trip sections:

Overview
Itinerary
Map
Saved
Expenses
Journal

Saved items:

Hotels
Restaurants
Attractions
Custom Locations
Notes
Photos
Expenses
Documents
Emergency Contacts

Trip header:

Trip image
Trip name
Dates
Mode
Distance
Budget
Progress

==================================================
ITINERARY
=========

Timeline format:

Day 1
Day 2
Day 3

Each day:

Travel
Meals
Attractions
Stops
Hotel
Notes

Use route-line visual motif.

==================================================
JOURNAL
=======

Auto-create travel memory.

Example:

"My Goa Ride"

Include:

Photos
Route
Places visited
Distance
Expenses
Timeline
Memories

Stats:

590 km
3 days
34 places
₹12,840

Actions:

Create Travel Story
Export Trip Report
Share

==================================================
WEATHER
=======

Current Weather

Route Forecast

Rain Alerts

Storm Alerts

Extreme Weather

Display relevant route weather inside trip and route views.

Do not invent weather.

Use structured/mock data during prototype stage.

==================================================
SAFETY
======

Safety Center

Road closures
Floods
Landslides
Construction
Accidents
Dangerous turns
Scam warnings

Emergency Mode:

SOS
Live Location
Emergency Contacts
Nearest Hospital
Nearest Police
Nearest Mechanic
Nearest Fuel
Offline Emergency Information

Emergency UI:

Very clear
minimal
high contrast
red reserved for danger/emergency

Do not allow AI to invent safety-critical facts.

AI may explain structured safety information.

==================================================
OFFLINE
=======

Create visual states for:

Offline Mode
Offline Maps
Offline Routes
Offline Saved Locations
Offline Itineraries
Offline Emergency Contacts
Sync Pending
Sync Complete

Prototype with visual/demo behavior.

Prepare architecture for future service worker/cache implementation.

==================================================
GAMIFICATION
============

Badges:

Explorer
Local Guide
Route Master
Food Expert
Photographer

Future:

Points
Achievements
Leaderboards

Include gamification visually without making the application childish.

==================================================
ANALYTICS
=========

Display:

Trips Completed
Distance Travelled
States Visited
Countries Visited
Travel Style
Favorite Mode
Community Contributions
Expenses

Create a clean personal travel analytics experience.

==================================================
NOTIFICATIONS
=============

Notification types:

Trip Reminder
Weather
Safety
Community
Saved Offer
Price Update
Trip Progress
AI Insight

Create visual notification center.

==================================================
SETTINGS
========

Profile

Travel Preferences

Persona

Notifications

Language

Appearance

Dark Mode

Privacy

Data Export

Account Deletion

Connected Storage

AI Preferences

Offline Data

==================================================
DARK MODE
=========

Dark background:
#0F172A

Dark surface:
#172033

Primary text:
#F8FAFC

Secondary:
#CBD5E1

Muted:
#94A3B8

Border:
#334155

Keep core brand colors.

Do not invert colors mechanically.

Maintain hierarchy and accessibility.

==================================================
ACCESSIBILITY
=============

Support:

high contrast

clear labels

semantic controls

keyboard accessibility where appropriate

comfortable touch targets

do not communicate critical information through color alone

clear error messages

clear focus states

screen-reader-friendly labels where implementation permits

==================================================
MOTION SYSTEM
=============

Micro:
150–250ms

Normal:
200–350ms

Large:
300–500ms

Use:

fade
slide
scale
Smart Animate style transitions

Do not use excessive bounce or rotation.

Important interactions:

Splash → Onboarding

Onboarding → Home

Home → AI Planner

AI Planner → Generated Trip

Generated Trip → Route

Route → Comparison

Comparison → Offer/Place

Place → Save to Trip

Save → Trip Workspace

Trip → Expenses

Trip → Journal

Map → Bottom Sheet

Map Pin → Place Detail

Comparison → External Provider

==================================================
LOADING STATES
==============

Create:

Skeleton loading

Route calculation

AI generation

Comparison loading

Search loading

Image loading

Community feed loading

Trip loading

==================================================
ERROR STATES
============

Create:

No Internet

Route unavailable

No results

Comparison unavailable

AI unavailable

Location unavailable

Upload failed

Save failed

Session expired

Generic retry state

Do not make the entire application unusable because one feature failed.

==================================================
EMPTY STATES
============

Create:

No Trips

No Saved Places

No Expenses

No Community Posts

No Results

No Notifications

No Journal

No Photos

No Reviews

==================================================
RESPONSIVE RULES
================

Mobile:
390x844

Tablet:
834x1194

Desktop:
1440x1024

Large Desktop:
1920x1080

Mobile:
bottom navigation
one column
bottom sheets
touch-first

Tablet:
navigation rail
two-column layouts where helpful
map/content split

Desktop:
left sidebar
12-column grid
multi-column cards
map + content compositions

Do not simply stretch mobile.

==================================================
BACKEND ARCHITECTURE
====================

For this initial Make build, create a clean backend-aware architecture where appropriate.

Use Supabase only through Figma Make's supported integration.

Keep sensitive credentials out of prompt text and frontend code.

Create conceptual services:

AuthService
UserService
ProfileService
TripService
RouteService
LocationService
ReviewService
CommentService
CommunityService
ExpenseService
WeatherService
SafetyService
ComparisonService
ProviderAdapterService
StorageService
DatabaseService
AIOrchestrator
NotificationService
JournalService
AnalyticsService
OfflineService

Separate UI from data access.

Separate mock provider logic from future live provider logic.

Do not create unnecessary provider lock-in.

IMPORTANT BACKEND LIMITATION:

Use Figma Make's current backend integration only for the initial functional prototype.

The generated backend is not the final production database architecture.

Do not pretend the Make backend is a finished enterprise PostgreSQL schema.

The later engineering phase will move the code into GitHub and a dedicated development environment for proper schema, migrations, RLS, service boundaries and production hardening.

==================================================
SUPABASE
========

Use Supabase integration if backend functionality is required by this prototype.

Conceptual entities:

profiles
travel_personas
trips
trip_members
trip_days
routes
route_stops
locations
location_categories
saved_locations
reviews
comments
expenses
expense_categories
providers
provider_offers
comparison_queries
comparison_results
price_snapshots
media_assets
notifications
journal_entries
safety_alerts

Do not embed media files inside database rows.

Keep media metadata separate.

==================================================
STORAGE
=======

Use StorageService abstraction.

Conceptual methods:

upload
download
delete
getUrl
createUploadUrl

Support future providers:

Supabase Storage
R2
S3-compatible
user-owned storage
self-hosted object storage

Optimize images.

Generate thumbnails.

Keep metadata.

Do not hard-code the application to one storage provider.

==================================================
AI ARCHITECTURE
===============

Create:

AIOrchestrator

Decision order:

1. deterministic logic when AI is unnecessary
2. browser/local AI where appropriate
3. cache
4. Workers AI
5. Gemini
6. Ollama/self-hosted
7. deterministic fallback

AI features:

trip planning
budget insights
food recommendations
route explanation
hotel recommendations
attraction recommendations
safety explanations
review summarization
journal summarization
translation
preference extraction
packing suggestions
personalized suggestions
travel assistant

DO NOT use an LLM for:

distance arithmetic
expense arithmetic
price sorting
route score arithmetic
structured safety facts
availability verification

AI should interpret and explain structured data.

==================================================
MAP ARCHITECTURE
================

Use MapLibre-compatible concepts.

Map data:
OpenStreetMap-derived data

Routing service abstraction:

RoutingService

Possible engines:

OSRM
GraphHopper

Do not hard-code a specific routing provider into the user interface.

==================================================
MOCK DATA REQUIREMENTS
======================

Create a coherent sample journey:

Mumbai → Goa

Dates:
18–20 October

Travel:
Bike

Budget:
₹15,000

Distance:
590 km

Estimated travel:
5–6 hours depending on route

Sample stops:

Ratnagiri
Riverstone Café
Kaas-style viewpoint
Fuel stop
Lunch
Sunset
Goa stay

Use realistic but clearly demo/test data.

==================================================
PROTOTYPE NAVIGATION
====================

Main flow:

Splash
→ Onboarding
→ Persona
→ Priorities
→ Home

Home
→ Explore
→ Planner
→ Trips
→ Community
→ Profile

Planner
→ Generated Trip
→ Route
→ Comparison

Comparison
→ Hotel
→ Flight
→ Train
→ Bus
→ Offer detail
→ external/provider link placeholder

Route
→ place
→ save
→ trip workspace

Trip Workspace
→ itinerary
→ map
→ saved
→ expenses
→ journal

Community
→ map
→ location
→ detail
→ review
→ discussion

Safety
→ safety center
→ emergency

==================================================
PROTOTYPE LINK BEHAVIOR
=======================

Use realistic prototype interactions.

Splash:
automatic transition

Onboarding:
Continue
Skip

Home:
buttons navigate to relevant states

AI:
generation state
result state

Route:
select route

Comparison:
select filter/sort

Offer:
View Deal opens external-link style action

Map:
pin opens place detail

Save:
success toast/sheet

Trip:
tabs change content

Expenses:
add expense opens form

Community:
add location opens contribution flow

==================================================
DESIGN QUALITY REQUIREMENTS
===========================

Prioritize:

* visual hierarchy
* spacing
* alignment
* information architecture
* component reuse
* responsiveness
* accessibility
* travel emotion
* premium appearance
* functional clarity

Avoid:

* random shadows
* excessive rounded corners
* excessive gradients
* excessive color
* clutter
* tiny text
* generic dashboard aesthetic
* unnecessary animations
* duplicate components
* arbitrary spacing
* inconsistent button styles

==================================================
LOGO / BRAND
============

Generate the best original GeoJourney brand mark that satisfies the logo requirements above.

Explore multiple options conceptually.

Select the strongest:

* app icon
* wordmark
* monochrome
* inverse
* favicon

The symbol should remain recognizable when reduced to 24px.

==================================================
CODE QUALITY
============

Even though this is initially generated in Figma Make:

Use:

clear naming
modular components
reusable data structures
service boundaries
mock provider adapters
clean routing
reusable UI
responsive layouts
error boundaries where appropriate
loading states
empty states

Do not create a huge monolithic component.

Avoid duplicate code.

Keep code understandable to a developer who will continue the project in Cursor/VS Code.

==================================================
CODE HANDOFF REQUIREMENT
========================

The resulting application must be organized so that the generated code can later be:

* downloaded
* pushed to GitHub
* opened in Cursor or VS Code
* refactored
* connected to a proper PostgreSQL/Supabase schema
* connected to real providers
* expanded into production architecture

Do not make the architecture dependent on continued Figma Make usage.

==================================================
IMPLEMENTATION ORDER
====================

After this plan is approved, implement in the following sequence:

PHASE 1:
brand
design tokens
global styles
navigation
responsive shell

PHASE 2:
splash
onboarding
auth
home
explore

PHASE 3:
AI planner
trip generation
travel persona
trip creation

PHASE 4:
route planner
route results
route intelligence
map
along-route discovery

PHASE 5:
comparison hub
hotel comparison
flight comparison
train comparison
bus comparison
offer detail

PHASE 6:
trip workspace
itinerary
map
saved
expenses
journal

PHASE 7:
community map
location creation
reviews
ratings
comments
feed
profile

PHASE 8:
weather
safety
emergency
notifications
offline states

PHASE 9:
dark mode
accessibility
loading
empty
error
animation
responsive QA

==================================================
SUCCESS CRITERIA
================

The resulting Make application should:

* look like one coherent GeoJourney product
* have consistent colors
* have consistent typography
* have reusable components
* support mobile
* support tablet
* support desktop
* have a coherent navigation system
* have functioning prototype interactions
* have realistic mock data
* include the comparison experience
* include AI states
* include route states
* include trip workspace
* include community
* include expenses
* include safety
* include journal
* include weather
* include loading/error/empty states
* be structured for later code export and engineering
* not require real commercial APIs for the initial prototype
* not expose sensitive secrets
* not claim mock data is live data

MOST IMPORTANT:

Do not make silent assumptions about missing product requirements.

When there is ambiguity, choose the option most consistent with the GeoJourney product principles and document the assumption in the plan.

Do not remove requested features merely because the specification is large.

Prioritize reusability and modular architecture.

Build a unique GeoJourney identity.

The product should feel like:

DISCOVER
+
COMPARE
+
PLAN
+
SAVE
+
TRAVEL
+
REMEMBER

rather than a generic map or booking app.

END OF MASTER SPECIFICATION.
