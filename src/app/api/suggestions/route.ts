import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, category, subject, message } = body

    // Validation
    if (!name || !subject || !message || !category) {
      return NextResponse.json(
        { error: 'Nama, kategori, subjek, dan pesan harus diisi' },
        { status: 400 }
      )
    }

    // Create suggestion
    const suggestion = await prisma.suggestion.create({
      data: {
        name,
        email: email || null,
        phone: phone || null,
        category,
        subject,
        message,
        status: 'PENDING'
      }
    })

    return NextResponse.json({ success: true, data: suggestion }, { status: 201 })
  } catch (error) {
    console.error('Error creating suggestion:', error)
    return NextResponse.json(
      { error: 'Gagal menyimpan saran' },
      { status: 500 }
    )
  }
}
