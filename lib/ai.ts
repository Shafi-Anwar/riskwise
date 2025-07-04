export async function summarizeReportWithAI(report: {
  title: string
  description: string
  analysis: any
}) {
  try {
    const res = await fetch('/api/ai/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    })

    const data = await res.json()
    return data.summary || 'Unable to summarize.'
  } catch (err) {
    console.error('AI summary error:', err)
    return 'AI summary failed.'
  }
}
