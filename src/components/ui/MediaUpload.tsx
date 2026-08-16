import { useRef, useState } from 'react'
import { StorageService } from '../../services'
import type { MediaUploadState } from '../../types'

/**
 * Provider-agnostic media uploader. Uses the StorageService seam (mock),
 * with idle / uploading / success / error states. No storage provider is
 * hard-coded in the UI.
 */
export function MediaUpload({
  photos,
  onChange,
  max = 4,
}: {
  photos: string[]
  onChange: (photos: string[]) => void
  max?: number
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<MediaUploadState>('idle')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')

  const pick = () => inputRef.current?.click()

  const handleFile = async (file?: File) => {
    if (!file) return
    setState('uploading')
    setProgress(0)
    setError('')
    try {
      const result = await StorageService.upload(file, setProgress)
      onChange([...photos, result.url])
      setState('success')
      setTimeout(() => setState('idle'), 1200)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
      setState('error')
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {photos.map((url, i) => (
          <div key={url + i} className="relative h-20 w-20 overflow-hidden rounded-[12px] bg-[var(--color-surface-2)]">
            <img src={url} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
            <button
              aria-label="Remove photo"
              onClick={() => onChange(photos.filter((_, idx) => idx !== i))}
              className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/60 text-[11px] text-white"
            >
              ✕
            </button>
          </div>
        ))}

        {photos.length < max && (
          <button
            onClick={pick}
            disabled={state === 'uploading'}
            className="grid h-20 w-20 place-items-center rounded-[12px] border-2 border-dashed border-[var(--color-line)] text-[var(--color-muted)] transition-colors hover:border-[#0B5FFF] disabled:opacity-60"
            style={{ borderColor: state === 'error' ? '#EF4444' : undefined }}
          >
            {state === 'uploading' ? (
              <span className="text-[11px] font-semibold" style={{ color: '#0B5FFF' }}>
                {progress}%
              </span>
            ) : state === 'success' ? (
              <span style={{ color: '#16B978' }}>✓</span>
            ) : (
              <span className="flex flex-col items-center gap-0.5 text-[11px]">
                <span className="text-lg">＋</span>
                Photo
              </span>
            )}
          </button>
        )}
      </div>

      {state === 'uploading' && (
        <div className="mt-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-[var(--color-surface-2)]">
          <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: '#0B5FFF' }} />
        </div>
      )}
      {state === 'error' && (
        <p className="mt-2 text-[13px]" style={{ color: '#EF4444' }}>
          {error} ·{' '}
          <button className="underline" onClick={pick}>
            Retry
          </button>
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  )
}
