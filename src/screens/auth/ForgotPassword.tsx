import { useState } from 'react'
import { useRouter } from '../../lib/router'
import { AuthService } from '../../services'
import { Button, Input } from '../../components/ui/primitives'
import { AuthShell } from './AuthShell'

export default function ForgotPassword() {
  const { navigate } = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    setLoading(true)
    setError('')
    try {
      await AuthService.requestPasswordReset(email)
      setSent(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll send a reset link to your email."
      footer={
        <button className="font-semibold text-[#0B5FFF]" onClick={() => navigate('login')}>
          ← Back to sign in
        </button>
      }
    >
      {sent ? (
        <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 text-center">
          <div className="mb-2 text-2xl">📬</div>
          <p className="text-[15px] text-[var(--color-ink-2)]">
            If <span className="font-semibold text-[var(--color-ink)]">{email}</span> is registered, a
            reset link is on its way (demo).
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon="✉️" />
          {error && <p className="text-[13px]" style={{ color: '#EF4444' }}>{error}</p>}
          <Button block size="lg" loading={loading} onClick={submit}>
            Send reset link
          </Button>
        </div>
      )}
    </AuthShell>
  )
}
