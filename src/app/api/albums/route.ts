import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const albums = await prisma.album.findMany({
      include: { _count: { select: { photos: true } } },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ albums })
  } catch {
    return NextResponse.json({ albums: [] })
  }
}
