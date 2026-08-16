import { useState } from 'react'
import { useRouter } from '../../lib/router'
import { useApp } from '../../state/AppContext'
import { Button, Input } from '../../components/ui/primitives'
import { MediaUpload } from '../../components/ui/MediaUpload'
import { COMMUNITY_CATEGORIES } from '../../mocks/community'
import type { CommunityCategory, CommunityLocation, PlaceCategory } from '../../types'

const CATEGORY_PLACE_MAP: Record<CommunityCategory, PlaceCategory> = {
  food: 'restaurant',
  scenic: 'viewpoint',
  'hidden-gem': 'hidden-gem',
  hotel: 'hotel',
  fuel: 'fuel',
  attraction: 'historical',
  safety: 'fuel',
}

let seq = 800
const nextLocId = () => `loc-${seq++}`

export default function AddLocation() {
  const { back } = useRouter()
  const { user, profile, addCommunityLocation } = useApp()

  const [name, setName] = useState('')
  const [category, setCategory] = useState<CommunityCategory>('food')
  const [description, setDescription] = useState('')
  const [tagsRaw, setTagsRaw] = useState('')
  const [photos, setPhotos] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({})

  const validate = () => {
    const e: { name?: string; description?: string } = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!description.trim()) e.description = 'Description is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (status: 'published' | 'draft') => {
    if (!validate()) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))

    const tags = tagsRaw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const contributor = user?.name ?? profile.name
    const fallbackImage =
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&auto=format'

    const loc: CommunityLocation = {
      id: nextLocId(),
      name: name.trim(),
      category: CATEGORY_PLACE_MAP[category],
      communityCategory: category,
      rating: 0,
      reviewCount: 0,
      distanceKm: Math.round(Math.random() * 500 + 100),
      tags,
      image: photos[0] ?? fallbackImage,
      photos,
      lat: Math.random() * 0.6 + 0.2,
      lng: Math.random() * 0.6 + 0.2,
      description: description.trim(),
      contributor,
      contributorVerified: user?.verified ?? false,
      helpfulVotes: 0,
      updatedAt: new Date().toISOString().slice(0, 10),
      status,
    }

    addCommunityLocation(loc)
    setSaving(false)
    back()
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-10 lg:px-8">
      <div className="mb-6">
        <h1 className="text-h2 text-[var(--color-ink)]">Add a Place</h1>
        <p className="text-[14px] text-[var(--color-muted)]">Share a hidden gem with fellow travelers</p>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <Input
            label="Place Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (errors.name) setErrors((p) => ({ ...p, name: undefined }))
            }}
            placeholder="e.g. Amboli Mist Viewpoint"
            icon="📍"
          />
          {errors.name && (
            <p className="mt-1 text-[13px]" style={{ color: '#EF4444' }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <div className="mb-2 text-[13px] font-semibold text-[var(--color-ink-2)]">Category</div>
          <div className="flex flex-wrap gap-2">
            {COMMUNITY_CATEGORIES.map((cat) => {
              const active = category === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className="inline-flex items-center gap-1.5 rounded-[999px] border px-3.5 py-1.5 text-[13px] font-semibold transition-all"
                  style={{
                    borderColor: active ? '#0B5FFF' : 'var(--color-line)',
                    backgroundColor: active ? '#0B5FFF14' : 'var(--color-surface)',
                    color: active ? '#0B5FFF' : 'var(--color-ink-2)',
                  }}
                >
                  {cat.icon} {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="mb-1.5 text-[13px] font-semibold text-[var(--color-ink-2)]">Description</div>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
              if (errors.description) setErrors((p) => ({ ...p, description: undefined }))
            }}
            placeholder="What makes this place special? Any tips for fellow travelers?"
            rows={4}
            className="w-full resize-none rounded-[12px] border bg-[var(--color-surface)] p-3.5 text-[15px] text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[#0B5FFF]"
            style={{
              borderColor: errors.description ? '#EF4444' : 'var(--color-line)',
            }}
          />
          {errors.description && (
            <p className="mt-1 text-[13px]" style={{ color: '#EF4444' }}>
              {errors.description}
            </p>
          )}
        </div>

        {/* Tags */}
        <Input
          label="Tags (comma-separated)"
          value={tagsRaw}
          onChange={(e) => setTagsRaw(e.target.value)}
          placeholder="e.g. Seafood, Sunset, Local"
          icon="🏷️"
        />

        {/* Photos */}
        <div>
          <div className="mb-2 text-[13px] font-semibold text-[var(--color-ink-2)]">Photos</div>
          <MediaUpload photos={photos} onChange={setPhotos} max={4} />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => submit('draft')}
            loading={saving}
          >
            Save as Draft
          </Button>
          <Button className="flex-1" onClick={() => submit('published')} loading={saving}>
            Publish
          </Button>
        </div>
      </div>
    </div>
  )
}
