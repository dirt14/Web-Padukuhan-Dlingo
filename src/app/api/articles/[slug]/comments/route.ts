import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

interface Props {
  params: Promise<{ slug: string }>
}

// GET - Ambil semua komentar artikel
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { slug } = await params

    const article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true }
    })

    if (!article) {
      return NextResponse.json(
        { error: 'Artikel tidak ditemukan' },
        { status: 404 }
      )
    }

    const comments = await prisma.articleComment.findMany({
      where: {
        articleId: article.id,
        status: 'APPROVED',
        parentId: null // Hanya komentar utama (bukan balasan)
      },
      orderBy: { createdAt: 'desc' },
      include: {
        replies: {
          where: { status: 'APPROVED' },
          orderBy: { createdAt: 'asc' },
          include: {
            replies: {
              where: { status: 'APPROVED' },
              orderBy: { createdAt: 'asc' }
            }
          }
        }
      }
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil komentar' },
      { status: 500 }
    )
  }
}

// POST - Tambah komentar baru
export async function POST(request: NextRequest, { params }: Props) {
  try {
    const { slug } = await params
    const body = await request.json()
    const { content, authorName, authorEmail, parentId } = body

    if (!content || !authorName) {
      return NextResponse.json(
        { error: 'Nama dan komentar wajib diisi' },
        { status: 400 }
      )
    }

    const article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true, status: true }
    })

    if (!article || article.status !== 'PUBLISHED') {
      return NextResponse.json(
        { error: 'Artikel tidak ditemukan' },
        { status: 404 }
      )
    }

    // Jika ini adalah balasan, verifikasi parent comment exists
    if (parentId) {
      const parentComment = await prisma.articleComment.findUnique({
        where: { id: parentId }
      })
      if (!parentComment) {
        return NextResponse.json(
          { error: 'Komentar yang ingin dibalas tidak ditemukan' },
          { status: 404 }
        )
      }
    }

    const comment = await prisma.articleComment.create({
      data: {
        content: content.trim(),
        authorName: authorName.trim(),
        authorEmail: authorEmail?.trim() || null,
        articleId: article.id,
        parentId: parentId || null,
        status: 'APPROVED' // Langsung approved, bisa diubah ke PENDING jika perlu moderasi
      },
      include: {
        replies: true
      }
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Gagal menambahkan komentar' },
      { status: 500 }
    )
  }
}
