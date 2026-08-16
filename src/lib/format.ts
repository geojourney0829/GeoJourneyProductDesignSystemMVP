/**
 * Deterministic formatting & arithmetic helpers.
 * IMPORTANT: all currency / distance / duration / score math lives here,
 * never in the AI layer (per spec).
 */
import type { Expense } from '../types'

export function money(amount: number, currency = '₹'): string {
  return `${currency}${amount.toLocaleString('en-IN')}`
}

export function km(distance: number): string {
  return `${distance.toLocaleString('en-IN')} km`
}

export function minutesToDuration(mins: number): string {
  if (mins <= 0) return '—'
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ''}`.trim() : `${m}m`
}

export function formatDateRange(start: string, end: string): string {
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }
  const s = new Date(start).toLocaleDateString('en-IN', opts)
  const e = new Date(end).toLocaleDateString('en-IN', opts)
  return s === e ? s : `${s} – ${e}`
}

export function relativeChecked(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.max(1, Math.round(diffMs / 60000))
  if (mins < 60) return `Checked ${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `Checked ${hrs}h ago`
  return `Checked ${Math.round(hrs / 24)}d ago`
}

export function sumExpenses(expenses: Expense[]): number {
  return expenses.reduce((total, e) => total + e.amount, 0)
}
