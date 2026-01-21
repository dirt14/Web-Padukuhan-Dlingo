import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// GET single article
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const article = await prisma.article.findUnique({
      where: { id }
    })

    if (!article) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json({ article })
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json({ error: 'Gagal mengambil data artikel' }, { status: 500 })
  }
}

// PUT update article
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { title, content, excerpt, category, tags, status, image } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Judul dan konten wajib diisi' }, { status: 400 })
    }

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({ where: { id } })
    if (!existingArticle) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 })
    }

    // Generate new slug if title changed
    let slug = existingArticle.slug
    if (title !== existingArticle.title) {
      slug = generateSlug(title)
      let counter = 1
      while (await prisma.article.findFirst({ where: { slug, NOT: { id } } })) {
        slug = `${generateSlug(title)}-${counter}`
        counter++
      }
    }

    // Update publishedAt if status changes to PUBLISHED
    let publishedAt = existingArticle.publishedAt
    if (status === 'PUBLISHED' && existingArticle.status !== 'PUBLISHED') {
      publishedAt = new Date()
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        category: category || 'LAINNYA',
        tags: tags || null,
        image: image || null,
        status: status || 'DRAFT',
        publishedAt
      }
    })

    return NextResponse.json({ article })
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json({ error: 'Gagal memperbarui artikel' }, { status: 500 })
  }
}

// DELETE article
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    await prisma.article.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Artikel berhasil dihapus' })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json({ error: 'Gagal menghapus artikel' }, { status: 500 })
  }
}
