// app/api/risk-report/[id]/route.ts

import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await  auth()

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const report = await prisma.riskReport.findFirst({
      where: {
        id: params.id,
        user: { clerkId: userId }, // match report belongs to logged-in user
      },
    })

    if (!report) {
      return new NextResponse('Not Found', { status: 404 })
    }

    return NextResponse.json(report)
  } catch (err) {
    return new NextResponse('Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } =await auth()

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const deleted = await prisma.riskReport.deleteMany({
      where: {
        id: params.id,
        user: { clerkId: userId },
      },
    })

    if (deleted.count === 0) {
      return new NextResponse('Not Found', { status: 404 })
    }

    return new NextResponse('Deleted', { status: 200 })
  } catch (err) {
    return new NextResponse('Server Error', { status: 500 })
  }
}
