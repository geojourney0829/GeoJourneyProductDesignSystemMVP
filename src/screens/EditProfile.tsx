import { useState } from 'react'
import { useRouter } from '../lib/router'
import { useApp } from '../state/AppContext'
import { Avatar, Button, Chip, Input } from '../components/ui/primitives'
import { PERSONAS, PRIORITIES } from '../mocks/personas'
import type { PersonaId, PriorityId } from '../types'

export default function EditProfile() {
  const { back } = useRouter()
  const { user, profile, updateUser, setName, setPersonas, setPriorities, toast } = useApp()

  const [name, setNameLocal] = useState(user?.name ?? profile.name)
  const [bio, setBio] = useState(user?.bio ?? '')
  const [personas, setPersonasLocal] = useState<PersonaId[]>(user?.personas ?? profile.personas)
  const [priorities, setPrioritiesLocal] = useState<PriorityId[]>(
    user?.priorities ?? profile.priorities,
  )
  const [saving, setSaving] = useState(false)
  const [nameError, setNameError] = useState('')

  const togglePersona = (id: PersonaId) =>
    setPersonasLocal((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    )

  const togglePriority = (id: PriorityId) =>
    setPrioritiesLocal((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    )

  const save = async () => {
    if (!name.trim()) {
      setNameError('Name is required')
      return
    }
    setSaving(true)
    await new Promise((r) => setTimeout(r, 480))
    if (user) {
      updateUser({ name: name.trim(), bio, personas, priorities })
    } else {
      setName(name.trim())
      setPersonas(personas)
      setPriorities(priorities)
    }
    toast('Profile updated')
    setSaving(false)
    back()
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-10 lg:px-8">
      <div className="mb-6 flex items-center gap-4">
        <Avatar name={name || 'A'} size={72} />
        <div>
          <div className="text-[17px] font-semibold text-[var(--color-ink)]">
            {name || 'Your name'}
          </div>
          <div className="text-[13px] text-[var(--color-muted)]">GeoJourney member</div>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <Input
            label="Display Name"
            value={name}
            onChange={(e) => {
              setNameLocal(e.target.value)
              if (nameError) setNameError('')
            }}
            placeholder="Your name"
            icon="👤"
          />
          {nameError && (
            <p className="mt-1 text-[13px]" style={{ color: '#EF4444' }}>
              {nameError}
            </p>
          )}
        </div>

        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-[var(--color-ink-2)]">
            Bio
          </span>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell fellow travelers about yourself…"
            rows={3}
            className="w-full resize-none rounded-[12px] border border-[var(--color-line)] bg-[var(--color-surface)] p-3.5 text-[15px] text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[#0B5FFF]"
          />
        </label>

        <div>
          <div className="mb-2 text-[13px] font-semibold text-[var(--color-ink-2)]">
            Travel Style
          </div>
          <div className="flex flex-wrap gap-2">
            {PERSONAS.map((p) => (
              <Chip key={p.id} active={personas.includes(p.id)} onClick={() => togglePersona(p.id)}>
                {p.emoji} {p.label}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 text-[13px] font-semibold text-[var(--color-ink-2)]">Priorities</div>
          <div className="flex flex-wrap gap-2">
            {PRIORITIES.map((p) => (
              <Chip
                key={p.id}
                active={priorities.includes(p.id)}
                onClick={() => togglePriority(p.id)}
              >
                {p.icon} {p.label}
              </Chip>
            ))}
          </div>
        </div>

        <Button block size="lg" loading={saving} onClick={save} disabled={!name.trim()}>
          Save Changes
        </Button>
      </div>
    </div>
  )
}
