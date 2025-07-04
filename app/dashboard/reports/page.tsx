'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

type RiskReport = {
  id: string
  title: string
  riskLevel: string
  businessType: string
  createdAt: string
}

export default function ReportsPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [reports, setReports] = useState<RiskReport[]>([])

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in')
    }
  }, [user, isLoaded])

  useEffect(() => {
    if (!user) return
    fetch('/api/risk-report')
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch(() => toast.error('Failed to load reports'))
  }, [user])

  const grouped = reports.reduce((acc, report) => {
    const key = report.riskLevel.toLowerCase()
    if (!acc[key]) acc[key] = []
    acc[key].push(report)
    return acc
  }, {} as Record<string, RiskReport[]>)

  const riskColors = {
    low: 'bg-green-100 dark:bg-green-900/40',
    medium: 'bg-yellow-100 dark:bg-yellow-900/40',
    high: 'bg-red-100 dark:bg-red-900/40',
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-[#fffaf3] dark:bg-[#1f1e1c] text-zinc-800 dark:text-zinc-200 font-serif">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">📋 Your Reports</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-md">All your submitted risk reports organized by severity.</p>
        </div>

        {['high', 'medium', 'low'].map((level) => (
          grouped[level]?.length > 0 && (
            <section key={level}>
              <h2 className="text-2xl font-semibold capitalize mb-4">
                {level} Risk Reports
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {grouped[level].map((report) => (
                  <Link key={report.id} href={`/dashboard/report/${report.id}`}>
                    <Card
                      className={`transition duration-300 hover:shadow-xl rounded-lg border-none cursor-pointer ${riskColors[level as keyof typeof riskColors]}`}
                    >
                      <CardContent className="p-5 space-y-1">
                        <h3 className="text-xl font-semibold">{report.title}</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {report.businessType} • {new Date(report.createdAt).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )
        ))}

        {reports.length === 0 && (
          <p className="text-center text-zinc-500 dark:text-zinc-400 italic">No reports yet. Start by creating one from your dashboard.</p>
        )}
      </div>
    </div>
  )
}
