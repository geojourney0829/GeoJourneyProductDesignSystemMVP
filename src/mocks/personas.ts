import type { PersonaId, PriorityId } from '../types'

export const PERSONAS: { id: PersonaId; label: string; emoji: string; blurb: string }[] = [
  { id: 'budget', label: 'Budget Traveler', emoji: '🪙', blurb: 'Maximise every rupee' },
  { id: 'luxury', label: 'Luxury Traveler', emoji: '✨', blurb: 'Comfort and premium stays' },
  { id: 'biker', label: 'Biker', emoji: '🏍️', blurb: 'Two wheels, open roads' },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧', blurb: 'Safe, easy, together' },
  { id: 'solo', label: 'Solo', emoji: '🧭', blurb: 'Freedom to roam' },
  { id: 'adventure', label: 'Adventure', emoji: '⛰️', blurb: 'Off the beaten path' },
  { id: 'photographer', label: 'Photographer', emoji: '📷', blurb: 'Chasing the light' },
  { id: 'food', label: 'Food Explorer', emoji: '🍜', blurb: 'Eat like a local' },
]

export const PRIORITIES: { id: PriorityId; label: string; icon: string }[] = [
  { id: 'lower-cost', label: 'Lower Cost', icon: '↓' },
  { id: 'save-time', label: 'Save Time', icon: '⚡' },
  { id: 'scenic', label: 'Scenic Routes', icon: '🌄' },
  { id: 'food', label: 'Great Food', icon: '🍽️' },
  { id: 'comfort', label: 'Comfort', icon: '🛋️' },
  { id: 'safety', label: 'Safety', icon: '🛡️' },
  { id: 'hidden-gems', label: 'Hidden Gems', icon: '💎' },
  { id: 'photography', label: 'Photography', icon: '📸' },
  { id: 'local', label: 'Local Experiences', icon: '📍' },
  { id: 'flexible', label: 'Flexible Booking', icon: '🔁' },
]
