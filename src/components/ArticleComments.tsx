'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Send, Reply, User, Calendar, Loader2, ChevronDown, ChevronUp } from 'lucide-react'

interface Comment {
  id: string
  content: string
  authorName: string
  authorEmail?: string | null
  createdAt: string
  replies?: Comment[]
}

interface ArticleCommentsProps {
  articleSlug: string
}

// Komponen Form Komentar
function CommentForm({
  onSubmit,
  isReply = false,
  parentId,
  onCancel,
  isSubmitting
}: {
  onSubmit: (data: { content: string; authorName: string; authorEmail?: string; parentId?: string }) => Promise<void>
  isReply?: boolean
  parentId?: string
  onCancel?: () => void
  isSubmitting: boolean
}) {
  const [content, setContent] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !authorName.trim()) return

    await onSubmit({
      content: content.trim(),
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim() || undefined,
      parentId
    })

    setContent('')
    if (!isReply) {
      // Hanya reset nama & email jika bukan reply (untuk kenyamanan user)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${isReply ? 'mt-3' : ''}`}>
      <div className="space-y-4">
        {!isReply && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-gray-400">(opsional)</span>
              </label>
              <input
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder="email@contoh.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {isReply && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Nama Anda *"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <input
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder="Email (opsional)"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        <div>
          {!isReply && (
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Komentar / Pertanyaan <span className="text-red-500">*</span>
            </label>
          )}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={isReply ? "Tulis balasan..." : "Tulis komentar atau pertanyaan Anda..."}
            rows={isReply ? 2 : 4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={isSubmitting || !content.trim() || !authorName.trim()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {isReply ? 'Kirim Balasan' : 'Kirim Komentar'}
          </button>
          {isReply && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Batal
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

// Komponen Single Comment dengan balasan
function CommentItem({
  comment,
  onReply,
  depth = 0
}: {
  comment: Comment
  onReply: (parentId: string, data: { content: string; authorName: string; authorEmail?: string }) => Promise<void>
  depth?: number
}) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showReplies, setShowReplies] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleReply = async (data: { content: string; authorName: string; authorEmail?: string }) => {
    setIsSubmitting(true)
    try {
      await onReply(comment.id, data)
      setShowReplyForm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const maxDepth = 2 // Batasi kedalaman reply
  const hasReplies = comment.replies && comment.replies.length > 0

  return (
    <div className={`${depth > 0 ? 'ml-6 md:ml-10 border-l-2 border-gray-100 pl-4' : ''}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{comment.authorName}</h4>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(comment.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-gray-700 whitespace-pre-wrap mb-3">
          {comment.content}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {depth < maxDepth && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              <Reply className="h-4 w-4" />
              Balas
            </button>
          )}
          {hasReplies && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              {showReplies ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Sembunyikan {comment.replies!.length} balasan
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Lihat {comment.replies!.length} balasan
                </>
              )}
            </button>
          )}
        </div>

        {/* Reply Form */}
        {showReplyForm && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <CommentForm
              onSubmit={handleReply}
              isReply
              parentId={comment.id}
              onCancel={() => setShowReplyForm(false)}
              isSubmitting={isSubmitting}
            />
          </div>
        )}
      </div>

      {/* Nested Replies */}
      {hasReplies && showReplies && (
        <div className="mt-3 space-y-3">
          {comment.replies!.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Komponen Utama
export default function ArticleComments({ articleSlug }: ArticleCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/articles/${articleSlug}/comments`)
      if (!response.ok) throw new Error('Gagal memuat komentar')
      const data = await response.json()
      setComments(data)
    } catch {
      setError('Gagal memuat komentar')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [articleSlug])

  const handleSubmitComment = async (data: { content: string; authorName: string; authorEmail?: string; parentId?: string }) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/articles/${articleSlug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Gagal mengirim komentar')
      }

      // Refresh comments
      await fetchComments()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengirim komentar')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReply = async (parentId: string, data: { content: string; authorName: string; authorEmail?: string }) => {
    await handleSubmitComment({ ...data, parentId })
  }

  return (
    <div className="mt-8">
      <div className="card p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Komentar & Pertanyaan</h2>
            <p className="text-sm text-gray-500">
              {comments.length} komentar
            </p>
          </div>
        </div>

        {/* Comment Form */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4">Tulis Komentar atau Pertanyaan</h3>
          <CommentForm onSubmit={handleSubmitComment} isSubmitting={isSubmitting} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Comments List */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Semua Komentar</h3>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onReply={handleReply}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
