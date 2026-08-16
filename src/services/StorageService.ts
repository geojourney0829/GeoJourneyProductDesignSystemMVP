/**
 * StorageService (M2) — media abstraction with mock upload.
 * Providers (Supabase Storage, R2, S3, self-hosted, user-owned) plug in behind
 * this boundary; UI depends only on these methods and never hard-codes a provider.
 * Media metadata is kept separate from database rows.
 */

export interface UploadResult {
  url: string
  width: number
  height: number
  provider: string
}

const PROVIDER = 'mock' // future: 'supabase' | 'r2' | 's3' | 'self-hosted'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const StorageService = {
  provider: PROVIDER,

  /** Mock upload. Returns a local object URL so previews work in the prototype. */
  async upload(file: File, onProgress?: (pct: number) => void): Promise<UploadResult> {
    for (let pct = 15; pct <= 90; pct += 25) {
      await delay(220)
      onProgress?.(pct)
    }
    await delay(200)
    // Simulate a rare failure for oversized files to exercise the error state.
    if (file.size > 12 * 1024 * 1024) throw new Error('File too large (max 12MB).')
    onProgress?.(100)
    return {
      url: URL.createObjectURL(file),
      width: 800,
      height: 600,
      provider: PROVIDER,
    }
  },

  async delete(_url: string): Promise<void> {
    await delay(150)
  },

  getUrl(pathOrUrl: string): string {
    return pathOrUrl
  },

  async createUploadUrl(): Promise<string> {
    await delay(100)
    return `mock://upload/${Date.now()}`
  },
}
