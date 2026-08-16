/**
 * Service registry & reserved extension points.
 *
 * Milestone 1 implements: AIOrchestrator, ComparisonService, RouteService,
 * MapService, ExpenseService (via AppContext), TripService (mock data).
 *
 * The stubs below reserve boundaries for the full future product so adding
 * them later does not require rewriting the core architecture. They return
 * `notImplemented()` and are documented Level 2/3 seams.
 */
export { AIOrchestrator, AI_STATE_SEQUENCE } from './AIOrchestrator'
export { ComparisonService, RANK_MODES } from './ComparisonService'
export { RouteService } from './RouteService'
export { MapService } from './MapService'

function notImplemented(name: string): never {
  throw new Error(`${name} is not implemented in Milestone 1 (reserved extension point).`)
}

/** StorageService — media stays out of UI; providers: Supabase/R2/S3/self-hosted. */
export const StorageService = {
  upload: () => notImplemented('StorageService.upload'),
  download: () => notImplemented('StorageService.download'),
  delete: () => notImplemented('StorageService.delete'),
  getUrl: () => notImplemented('StorageService.getUrl'),
  createUploadUrl: () => notImplemented('StorageService.createUploadUrl'),
}

/** Reserved service boundaries for future milestones (Level 2/3). */
export const AuthService = { signIn: () => notImplemented('AuthService.signIn') }
export const ProfileService = { get: () => notImplemented('ProfileService.get') }
export const ReviewService = { list: () => notImplemented('ReviewService.list') }
export const CommentService = { list: () => notImplemented('CommentService.list') }
export const CommunityService = { feed: () => notImplemented('CommunityService.feed') }
export const SocialService = { followers: () => notImplemented('SocialService.followers') }
export const WeatherService = { forecast: () => notImplemented('WeatherService.forecast') }
export const SafetyService = { alerts: () => notImplemented('SafetyService.alerts') }
export const NotificationService = { list: () => notImplemented('NotificationService.list') }
export const JournalService = { entries: () => notImplemented('JournalService.entries') }
export const AnalyticsService = { summary: () => notImplemented('AnalyticsService.summary') }
export const GamificationService = { badges: () => notImplemented('GamificationService.badges') }
export const OfflineService = { sync: () => notImplemented('OfflineService.sync') }
export const ProviderAdapterService = {
  // Normalizes provider payloads -> Offer contract. MOCK for now.
  normalize: () => notImplemented('ProviderAdapterService.normalize'),
}
