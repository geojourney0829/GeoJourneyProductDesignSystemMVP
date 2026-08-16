/**
 * AuthService (M2) — mock authentication behind a provider-agnostic boundary.
 * Level 3 swaps this for Supabase Auth without changing screens or context.
 */
import type { User } from '../types'
import { DEMO_USER } from '../mocks/community'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const AuthService = {
  async signIn(email: string, _password: string): Promise<User> {
    await delay(700)
    if (!email.includes('@')) throw new Error('Enter a valid email address.')
    return { ...DEMO_USER, email }
  },

  async signUp(name: string, email: string, _password: string): Promise<User> {
    await delay(800)
    if (!name.trim()) throw new Error('Please enter your name.')
    if (!email.includes('@')) throw new Error('Enter a valid email address.')
    return {
      ...DEMO_USER,
      id: `u-${Date.now()}`,
      name: name.trim(),
      email,
      bio: '',
      contributions: 0,
      helpfulVotes: 0,
      verified: false,
    }
  },

  async requestPasswordReset(email: string): Promise<void> {
    await delay(700)
    if (!email.includes('@')) throw new Error('Enter a valid email address.')
  },

  guest(): User {
    return {
      ...DEMO_USER,
      id: 'u-guest',
      name: 'Guest',
      email: '',
      bio: '',
      personas: [],
      priorities: [],
      guest: true,
      contributions: 0,
      helpfulVotes: 0,
      verified: false,
    }
  },
}
