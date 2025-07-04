import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { title, description, businessType } = await req.json()

  const prompt = `
  Analyze the following business risk context:

  Business Type: ${businessType}
  Title: ${title}
  Description: ${description}

  Give a clear analysis of risk level (low, medium, high), a score from 0 to 100, and list any warning flags.

  Respond in JSON:
  {
    "score": number,
    "riskLevel": "low" | "medium" | "high",
    "flags": string[]
  }
  `

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt,
        stream: false,
      }),
    })

    const data = await response.json()
    const match = data.response.match(/{[\s\S]*}/)
    const parsed = match ? JSON.parse(match[0]) : null

    if (!parsed) {
      return NextResponse.json({ error: 'Invalid AI response' }, { status: 500 })
    }

    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Ollama Error:', error)
    return NextResponse.json({ error: 'AI failed' }, { status: 500 })
  }
}
