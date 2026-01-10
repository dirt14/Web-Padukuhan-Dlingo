import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/db'
import { authOptions } from '@/lib/auth'

// PUT - Update suggestion status
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { status } = body

    if (!status || !['PENDING', 'REVIEWED', 'RESPONDED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const suggestion = await prisma.suggestion.update({
      where: { id: params.id },
      data: { status }
    })

    return NextResponse.json({
      message: 'Suggestion updated successfully',
      data: suggestion
    })
  } catch (error) {
    console.error('Error updating suggestion:', error)
    return NextResponse.json(
      { error: 'Failed to update suggestion' },
      { status: 500 }
    )
  }
}

// DELETE - Delete suggestion
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.suggestion.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Suggestion deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting suggestion:', error)
    return NextResponse.json(
      { error: 'Failed to delete suggestion' },
      { status: 500 }
    )
  }
}
