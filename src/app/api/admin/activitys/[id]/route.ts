import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'
import { slugify } from '@/lib/utils'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const activity = await prisma.activity.findUnique({
      where: { id },
      include: { author: { select: { name: true } } }
    })

    if (!activity) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({ activity })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch activity' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()

    const existing = await prisma.activity.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const slug = data.title !== existing.title
      ? slugify(data.title) + '-' + Date.now().toString(36)
      : existing.slug

    const activity = await prisma.activity.update({
      where: { id },
      data: {
        title: data.title,
        slug,
        description: data.description,
        content: data.content || null,
        image: data.image || null,
        category: data.category,
        schedule: data.schedule || null,
        location: data.location || null,
        responsible: data.responsible || null,
        status: data.status
      }
    })

    // Jika gambar berubah, update atau tambahkan ke galeri
    if (data.image && data.image !== existing.image) {
      // Cek apakah sudah ada foto untuk kegiatan ini
      const existingPhoto = await prisma.photo.findFirst({
        where: { activityId: id }
      })

      if (existingPhoto) {
        // Update foto yang ada
        await prisma.photo.update({
          where: { id: existingPhoto.id },
          data: {
            url: data.image,
            caption: `Foto kegiatan: ${data.title}`
          }
        })
      } else {
        // Buat foto baru
        await prisma.photo.create({
          data: {
            url: data.image,
            caption: `Foto kegiatan: ${data.title}`,
            category: 'KEGIATAN',
            activityId: id
          }
        })
      }
    }

    return NextResponse.json({ activity })
  } catch (error) {
    console.error('Update activity error:', error)
    return NextResponse.json({ error: 'Failed to update activity' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await prisma.activity.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete activity' }, { status: 500 })
  }
}
