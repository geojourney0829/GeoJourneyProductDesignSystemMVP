import { useState } from 'react'
import { useRouter } from '../../lib/router'
import { useApp } from '../../state/AppContext'
import { Avatar, Badge, Button, Rating } from '../../components/ui/primitives'
import { EmptyState } from '../../components/ui/states'

type DetailTab = 'overview' | 'reviews' | 'comments'

export default function PlaceDetail() {
  const { route } = useRouter()
  const {
    communityLocations,
    reviews,
    comments,
    addReview,
    toggleHelpful,
    addComment,
    report,
    user,
    profile,
    wishlist,
    toggleWishlist,
    addWishlistToTrip,
  } = useApp()

  const id = route.params?.id ?? ''
  const loc = communityLocations.find((l) => l.id === id)

  const [tab, setTab] = useState<DetailTab>('overview')
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [commentText, setCommentText] = useState('')

  const placeReviews = reviews.filter((r) => r.targetId === id)
  const placeComments = comments.filter((c) => c.targetId === id)
  const isSaved = wishlist.some((p) => p.id === id)

  if (!loc) {
    return (
      <div className="px-4 pt-10">
        <EmptyState icon="🔍" title="Place not found" message="This location may have been removed." />
      </div>
    )
  }

  const authorName = user?.name ?? profile.name

  const submitReview = () => {
    if (!reviewText.trim()) return
    addReview({
      targetId: id,
      author: authorName,
      authorVerified: user?.verified ?? false,
      rating: reviewRating,
      text: reviewText.trim(),
      date: new Date().toISOString().slice(0, 10),
      photos: [],
    })
    setReviewText('')
    setReviewRating(5)
  }

  const submitComment = () => {
    if (!commentText.trim()) return
    addComment({
      targetId: id,
      author: authorName,
      text: commentText.trim(),
      date: new Date().toISOString().slice(0, 10),
    })
    setCommentText('')
  }

  return (
    <div className="mx-auto w-full max-w-3xl pb-8">
      {/* Hero */}
      <div className="relative mb-4 h-64 overflow-hidden bg-[var(--color-surface-2)] lg:rounded-[20px]">
        <img src={loc.image} alt={loc.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="mb-1.5 flex flex-wrap gap-1.5">
                {loc.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] text-white backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h1 className="text-h2 text-white drop-shadow-sm">{loc.name}</h1>
              <div className="mt-1 flex items-center gap-3">
                {loc.rating > 0 ? (
                  <Rating value={loc.rating} count={loc.reviewCount} />
                ) : (
                  <span className="text-[13px] text-white/70">No ratings yet</span>
                )}
                {loc.openNow && (
                  <span className="text-[13px] font-semibold" style={{ color: '#4ADE80' }}>
                    ● Open now
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => toggleWishlist(loc)}
              aria-label={isSaved ? 'Remove from saved' : 'Save place'}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/20 text-xl backdrop-blur-sm transition-transform hover:scale-110"
            >
              {isSaved ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-0">
        {/* Contributor strip */}
        <div className="mb-4 flex items-center justify-between rounded-[12px] border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Avatar name={loc.contributor} size={32} />
            <div>
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-ink)]">
                {loc.contributor}
                {loc.contributorVerified && <Badge tone="cyan">✓</Badge>}
              </div>
              <div className="text-[12px] text-[var(--color-muted)]">
                Contributed · {loc.updatedAt}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[var(--color-muted)]">👍 {loc.helpfulVotes}</span>
            <button
              onClick={() => report(loc.name)}
              className="text-[12px] text-[var(--color-muted)] underline hover:text-[#EF4444]"
            >
              Report
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex gap-1 rounded-[12px] bg-[var(--color-surface-2)] p-1">
          {(
            [
              { id: 'overview', label: 'Overview' },
              { id: 'reviews', label: `Reviews (${placeReviews.length})` },
              { id: 'comments', label: `Q&A (${placeComments.length})` },
            ] as { id: DetailTab; label: string }[]
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex-1 rounded-[10px] py-2 text-[13px] font-semibold transition-all"
              style={{
                backgroundColor: tab === t.id ? 'var(--color-surface)' : 'transparent',
                color: tab === t.id ? 'var(--color-ink)' : 'var(--color-muted)',
                boxShadow: tab === t.id ? '0 1px 4px rgba(15,23,42,0.08)' : 'none',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="space-y-5">
            <p className="text-[15px] leading-relaxed text-[var(--color-ink-2)]">
              {loc.description}
            </p>

            {loc.photos.length > 1 && (
              <div>
                <div className="mb-2 text-[13px] font-semibold text-[var(--color-ink-2)]">Photos</div>
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {loc.photos.map((ph, i) => (
                    <div
                      key={i}
                      className="h-32 w-48 shrink-0 overflow-hidden rounded-[12px] bg-[var(--color-surface-2)]"
                    >
                      <img
                        src={ph}
                        alt={`Photo ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => addWishlistToTrip(loc)}>
                🧳 Add to Trip
              </Button>
              <Button className="flex-1" onClick={() => setTab('reviews')}>
                ✍️ Write Review
              </Button>
            </div>
          </div>
        )}

        {/* Reviews */}
        {tab === 'reviews' && (
          <div className="space-y-4">
            <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
              <div className="mb-2 text-[14px] font-semibold text-[var(--color-ink)]">
                Your Review
              </div>
              <div className="mb-2.5 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="text-xl transition-transform hover:scale-110"
                    style={{ color: star <= reviewRating ? '#F59E0B' : 'var(--color-line)' }}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience…"
                rows={3}
                className="w-full resize-none rounded-[12px] border border-[var(--color-line)] bg-[var(--color-surface-2)] p-3 text-[14px] text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[#0B5FFF]"
              />
              <Button block className="mt-3" onClick={submitReview} disabled={!reviewText.trim()}>
                Post Review
              </Button>
            </div>

            {placeReviews.length === 0 ? (
              <EmptyState
                icon="⭐"
                title="No reviews yet"
                message="Be the first to review this place."
              />
            ) : (
              placeReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] p-4"
                >
                  <div className="mb-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar name={rev.author} size={28} />
                      <div>
                        <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-ink)]">
                          {rev.author}
                          {rev.authorVerified && <Badge tone="cyan">✓</Badge>}
                        </div>
                        <div className="text-[11px] text-[var(--color-muted)]">{rev.date}</div>
                      </div>
                    </div>
                    <div className="text-[#F59E0B]">
                      {'★'.repeat(rev.rating)}
                      <span className="text-[var(--color-line)]">
                        {'★'.repeat(5 - rev.rating)}
                      </span>
                    </div>
                  </div>
                  <p className="text-[14px] leading-relaxed text-[var(--color-ink-2)]">{rev.text}</p>
                  {rev.photos.length > 0 && (
                    <div className="mt-2.5 flex gap-2">
                      {rev.photos.map((ph, i) => (
                        <div
                          key={i}
                          className="h-20 w-24 overflow-hidden rounded-[10px] bg-[var(--color-surface-2)]"
                        >
                          <img src={ph} alt="" className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 flex items-center gap-4">
                    <button
                      onClick={() => toggleHelpful(rev.id)}
                      className="flex items-center gap-1.5 text-[12px] text-[var(--color-muted)] transition-colors hover:text-[#0B5FFF]"
                    >
                      👍 Helpful ({rev.helpful})
                    </button>
                    <button
                      onClick={() => report(rev.author)}
                      className="text-[12px] text-[var(--color-muted)] transition-colors hover:text-[#EF4444]"
                    >
                      Report
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Comments / Q&A */}
        {tab === 'comments' && (
          <div className="space-y-3">
            <div className="rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Ask a question or share a tip…"
                rows={2}
                className="w-full resize-none rounded-[12px] border border-[var(--color-line)] bg-[var(--color-surface-2)] p-3 text-[14px] text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[#0B5FFF]"
              />
              <Button block className="mt-2" onClick={submitComment} disabled={!commentText.trim()}>
                Post
              </Button>
            </div>

            {placeComments.length === 0 ? (
              <EmptyState
                icon="💬"
                title="No questions yet"
                message="Ask something about this place."
              />
            ) : (
              placeComments.map((c) => (
                <div
                  key={c.id}
                  className="flex gap-3 rounded-[16px] border border-[var(--color-line)] bg-[var(--color-surface)] p-4"
                >
                  <Avatar name={c.author} size={28} />
                  <div>
                    <span className="text-[13px] font-semibold text-[var(--color-ink)]">
                      {c.author}
                    </span>
                    <span className="ml-1.5 text-[12px] text-[var(--color-muted)]">· {c.date}</span>
                    <p className="mt-1 text-[14px] text-[var(--color-ink-2)]">{c.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
