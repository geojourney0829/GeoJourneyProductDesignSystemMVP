/**
 * CommunityService (M2) — community locations, reviews and comments.
 * Level 1/2 mock; Level 3 swaps in Supabase tables (locations, reviews,
 * comments) behind the same boundary.
 */
import type { Comment, CommunityLocation, Review } from '../types'
import {
  COMMUNITY_COMMENTS,
  COMMUNITY_LOCATIONS,
  COMMUNITY_REVIEWS,
} from '../mocks/community'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const CommunityService = {
  async getLocations(): Promise<CommunityLocation[]> {
    await delay(400)
    return COMMUNITY_LOCATIONS.filter((l) => l.status === 'published')
  },
  getReviews(targetId: string): Review[] {
    return COMMUNITY_REVIEWS.filter((r) => r.targetId === targetId)
  },
  getComments(targetId: string): Comment[] {
    return COMMUNITY_COMMENTS.filter((c) => c.targetId === targetId)
  },
}

export const ReviewService = {
  list(targetId: string): Review[] {
    return COMMUNITY_REVIEWS.filter((r) => r.targetId === targetId)
  },
}
