import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

/* ---------------- Button ---------------- */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'ai' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  block?: boolean
  icon?: ReactNode
}

const btnBase =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-[12px] transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none'

const btnVariants: Record<ButtonVariant, string> = {
  primary: 'text-white shadow-sm hover:brightness-110',
  secondary:
    'bg-[var(--color-surface)] text-[var(--color-ink)] border border-[var(--color-line)] hover:bg-[var(--color-surface-2)]',
  ghost: 'text-[var(--color-ink-2)] hover:bg-[var(--color-surface-2)]',
  ai: 'text-white shadow-sm hover:brightness-110',
  danger: 'text-white hover:brightness-110',
}

const btnSizes: Record<ButtonSize, string> = {
  sm: 'text-[13px] h-9 px-3.5',
  md: 'text-[15px] h-11 px-5',
  lg: 'text-[15px] h-12 px-6',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  block,
  icon,
  children,
  className = '',
  style,
  ...rest
}: ButtonProps) {
  const bg =
    variant === 'primary'
      ? '#0B5FFF'
      : variant === 'ai'
        ? '#7C4DFF'
        : variant === 'danger'
          ? '#EF4444'
          : undefined
  return (
    <button
      className={`${btnBase} ${btnVariants[variant]} ${btnSizes[size]} ${block ? 'w-full' : ''} ${className}`}
      style={{ backgroundColor: bg, ...style }}
      {...rest}
    >
      {loading ? <Spinner /> : icon}
      {children}
    </button>
  )
}

export function Spinner({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white ${className}`}
    />
  )
}

/* ---------------- Chip / FilterChip ---------------- */
export function Chip({
  active,
  onClick,
  children,
  color = '#0B5FFF',
}: {
  active?: boolean
  onClick?: () => void
  children: ReactNode
  color?: string
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-[999px] border px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-200"
      style={{
        borderColor: active ? color : 'var(--color-line)',
        backgroundColor: active ? `${color}14` : 'var(--color-surface)',
        color: active ? color : 'var(--color-ink-2)',
      }}
    >
      {children}
    </button>
  )
}

/* ---------------- Badge ---------------- */
export function Badge({
  children,
  tone = 'brand',
}: {
  children: ReactNode
  tone?: 'brand' | 'green' | 'cyan' | 'indigo' | 'ai' | 'warning' | 'danger' | 'neutral'
}) {
  const map: Record<string, string> = {
    brand: '#0B5FFF',
    green: '#16B978',
    cyan: '#10BEEA',
    indigo: '#4257D6',
    ai: '#7C4DFF',
    warning: '#F59E0B',
    danger: '#EF4444',
    neutral: '#64748B',
  }
  const c = map[tone]
  return (
    <span
      className="inline-flex items-center gap-1 rounded-[999px] px-2.5 py-1 text-[12px] font-semibold"
      style={{ backgroundColor: `${c}18`, color: c }}
    >
      {children}
    </span>
  )
}

/* ---------------- Rating ---------------- */
export function Rating({ value, count }: { value: number; count?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--color-ink)]">
      <span style={{ color: '#F59E0B' }}>★</span>
      {value.toFixed(1)}
      {count != null && (
        <span className="font-normal text-[var(--color-muted)]">({count.toLocaleString('en-IN')})</span>
      )}
    </span>
  )
}

/* ---------------- Avatar ---------------- */
export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: 'linear-gradient(135deg,#0B5FFF,#10BEEA)',
      }}
    >
      {initials}
    </span>
  )
}

/* ---------------- Card ---------------- */
export function Card({
  children,
  className = '',
  onClick,
  interactive,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  interactive?: boolean
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] ${
        interactive
          ? 'cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-12px_rgba(15,23,42,0.25)]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

/* ---------------- Input ---------------- */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: ReactNode
}
export function Input({ label, icon, className = '', id, ...rest }: InputProps) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-[13px] font-semibold text-[var(--color-ink-2)]">
          {label}
        </span>
      )}
      <span className="relative block">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`h-11 w-full rounded-[12px] border border-[var(--color-line)] bg-[var(--color-surface)] px-3.5 text-[15px] text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[#0B5FFF] ${
            icon ? 'pl-10' : ''
          } ${className}`}
          {...rest}
        />
      </span>
    </label>
  )
}

/* ---------------- Section title ---------------- */
export function SectionTitle({
  title,
  action,
}: {
  title: string
  action?: ReactNode
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-h3 text-[var(--color-ink)]">{title}</h2>
      {action}
    </div>
  )
}
