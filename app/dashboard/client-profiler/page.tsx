'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type RiskProfile = {
  score: number
  flags: string[]
  recommendation: string
  aiNotes: string
}

export default function ClientProfilerPage() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<RiskProfile | null>(null)

  const handleAnalyze = async () => {
    if (!input.trim()) return toast.error('Please enter a client name, email, or domain.')

    setLoading(true)
    setProfile(null)

    const res = await fetch('/api/client-profiler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    })

    if (res.ok) {
      const data = await res.json()
      setProfile(data)
    } else {
      const { error } = await res.json()
      toast.error(error || 'Something went wrong')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-rose-50 dark:from-zinc-900 dark:to-zinc-950 py-12 px-6 text-zinc-800 dark:text-zinc-200 font-serif">
      <div className="max-w-4xl mx-auto space-y-10">
        <Card className="bg-white/90 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-700 shadow-md">
          <CardContent className="p-6 space-y-5">
            <h1 className="text-3xl font-bold">🔍 Client Risk Profiler</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Enter a client’s email, domain, or name to check for risk signals before working with them.
            </p>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. jane@riskycorp.com or riskycorp.com"
              className="min-h-[100px]"
            />
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            >
              {loading ? 'Analyzing...' : 'Analyze Risk'}
            </Button>
          </CardContent>
        </Card>

        {profile && (
          <Card className="bg-white/90 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-700 shadow-md">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">🧠 AI Risk Summary</h2>
              <p className="text-lg">
                <strong>Risk Score:</strong>{' '}
                <span className="font-mono">{profile.score}%</span>
              </p>
              <p>
                <strong>Recommendation:</strong> {profile.recommendation}
              </p>
              <div>
                <strong>Flags:</strong>
                <ul className="list-disc list-inside mt-2 text-sm">
                  {profile.flags.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded text-sm overflow-x-auto">
                {profile.aiNotes}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
