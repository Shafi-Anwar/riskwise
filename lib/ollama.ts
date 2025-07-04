export async function summarizeWithOllama({
  title,
  description,
  analysis,
}: {
  title: string
  description: string
  analysis: any
}) {
  const prompt = `
Summarize this risk report into one helpful paragraph:

Title: ${title}
Description: ${description}

Analysis:
${JSON.stringify(analysis, null, 2)}

Summary:
`

  try {
    const res = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        messages: [{ role: 'user', content: prompt }],
        stream: false,
      }),
    })

    const data = await res.json()
    return data?.message?.content || 'AI summary not available.'
  } catch (error) {
    console.error('Ollama AI error:', error)
    return 'AI failed to summarize.'
  }
}
