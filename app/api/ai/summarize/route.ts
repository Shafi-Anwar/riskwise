import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, description, analysis } = body || {}

  if (!title || !description || !analysis) {
    return NextResponse.json({ error: 'Missing required report fields' }, { status: 400 })
  }

  const prompt = `
You are a business risk analysis assistant.

Summarize the following risk report into one clear, concise, and insightful paragraph that helps users understand their overall risk status and key concerns:

Title: ${title}
Description: ${description}

Risk Analysis:
${JSON.stringify(analysis, null, 2)}

Summary:
`

  try {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        stream: false,
      }),
    })

    const result = await response.json()
    const summary = result?.message?.content || 'No summary returned.'

    return NextResponse.json({ summary })
  } catch (err) {
    console.error('❌ Error communicating with Ollama:', err)
    return NextResponse.json({ error: 'Failed to connect to Ollama' }, { status: 500 })
  }
}
