import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { summarizeWithOllama } from '@/lib/ollama'

export async function POST(req: NextRequest) {
  const { userId } =await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { title, description, businessType, riskLevel, analysis } = body

  if (!title || !businessType || !riskLevel || !analysis) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // 🧠 Generate summary using Ollama
  const aiSummary = await summarizeWithOllama({ title, description, analysis })

  const newReport = await prisma.riskReport.create({
    data: {
      title,
      description,
      riskLevel,
      businessType,
      analysis,
      userId,
      content: aiSummary, // or provide the appropriate value for 'content'
    },
  })

  return NextResponse.json(newReport)
}
