/**
 * AIOrchestrator / AIService boundary.
 *
 * Decision order (per spec): deterministic logic -> browser AI -> cache ->
 * Workers AI -> Gemini -> Ollama -> deterministic fallback.
 * Milestone 1 returns a structured TripPlan from deterministic mock generation.
 * Real providers plug in behind `generatePlan` without changing screens.
 *
 * The AI layer ONLY interprets/explains structured data — arithmetic lives in
 * lib/format.ts and the domain services.
 */
import type { AIState, TripPlan, TravelProfile } from '../types'
import { buildMumbaiGoaPlan } from '../mocks/mumbai-goa'
import { HOTEL_OFFERS } from '../mocks/offers'

export const AI_STATE_SEQUENCE: { state: AIState; label: string }[] = [
  { state: 'generating', label: 'Understanding your request' },
  { state: 'analyzing', label: 'Analyzing preferences' },
  { state: 'finding-routes', label: 'Finding the best routes' },
  { state: 'finding-places', label: 'Discovering places along the way' },
  { state: 'optimizing-budget', label: 'Optimizing your budget' },
]

export const AIOrchestrator = {
  /**
   * Simulates a structured AI trip generation. `onState` reports staged
   * progress so the UI can show calm, intelligent AI states.
   */
  async generatePlan(
    prompt: string,
    profile: TravelProfile | undefined,
    onState: (s: AIState, label: string) => void,
  ): Promise<TripPlan> {
    for (const step of AI_STATE_SEQUENCE) {
      onState(step.state, step.label)
      await delay(650)
    }
    // Deterministic mock plan (Mumbai -> Goa canonical journey).
    const plan = buildMumbaiGoaPlan(HOTEL_OFFERS)
    onState('result', 'Your journey is ready')
    return plan
  },

  /** Short natural-language insight over structured data (no arithmetic). */
  budgetInsight(spent: number, budget: number): string {
    if (budget <= 0) return 'Add a budget to unlock spending insights.'
    const ratio = spent / budget
    if (ratio < 0.5) return "You're pacing well below your planned budget — room for a treat."
    if (ratio < 0.85) return "You're on track with your planned daily spending."
    if (ratio <= 1) return "You're close to your budget — keep an eye on extras."
    return "You've gone over budget — consider trimming misc spends."
  },
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
