import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      include: { album: { select: { title: true } } },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ photos })
  } catch {
    return NextResponse.json({ photos: [] })
  }
}
