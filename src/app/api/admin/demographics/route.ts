import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/db'
import { authOptions } from '@/lib/auth'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// GET - Fetch demographics data
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const demographics = await prisma.demographics.findFirst({
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(demographics)
  } catch (error) {
    console.error('Error fetching demographics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch demographics' },
      { status: 500 }
    )
  }
}

// POST - Create/Update demographics (upsert)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { year, totalPopulation, maleCount, femaleCount, ageData, educationData, occupationData, rtData } = body

    // Validate required fields (use explicit check for undefined/null to allow 0 values)
    if (year === undefined || year === null ||
        totalPopulation === undefined || totalPopulation === null ||
        maleCount === undefined || maleCount === null ||
        femaleCount === undefined || femaleCount === null) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate JSON data
    try {
      if (ageData) JSON.parse(typeof ageData === 'string' ? ageData : JSON.stringify(ageData))
      if (educationData) JSON.parse(typeof educationData === 'string' ? educationData : JSON.stringify(educationData))
      if (occupationData) JSON.parse(typeof occupationData === 'string' ? occupationData : JSON.stringify(occupationData))
      if (rtData) JSON.parse(typeof rtData === 'string' ? rtData : JSON.stringify(rtData))
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON data format' },
        { status: 400 }
      )
    }

    // Delete old demographics data
    await prisma.demographics.deleteMany({})

    // Create new demographics record
    const demographics = await prisma.demographics.create({
      data: {
        year: parseInt(year),
        totalPopulation: parseInt(totalPopulation),
        maleCount: parseInt(maleCount),
        femaleCount: parseInt(femaleCount),
        ageData: typeof ageData === 'string' ? ageData : JSON.stringify(ageData),
        educationData: typeof educationData === 'string' ? educationData : JSON.stringify(educationData),
        occupationData: typeof occupationData === 'string' ? occupationData : JSON.stringify(occupationData),
        rtData: rtData ? (typeof rtData === 'string' ? rtData : JSON.stringify(rtData)) : null
      }
    })

    return NextResponse.json({
      message: 'Demographics data updated successfully',
      data: demographics
    })
  } catch (error) {
    console.error('Error updating demographics:', error)
    return NextResponse.json(
      { error: 'Failed to update demographics' },
      { status: 500 }
    )
  }
}
