import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(locations)
  } catch (error) {
    console.error('Erreur dans GET /api/locations :', error)
    return NextResponse.json(
      { error: 'Erreur lors du chargement des lieux' },
      { status: 500 }
    )
  }
}
