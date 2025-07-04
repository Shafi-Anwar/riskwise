'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import Link from 'next/link'
import jsPDF from 'jspdf'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog'

import { Bot, Brain } from 'lucide-react'

export default function ReportPage() {
  const { user } = useUser()
  const router = useRouter()
  const params = useParams()
  const reportId = params.reportId as string

  const [report, setReport] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [summary, setSummary] = useState('')
  const [insights, setInsights] = useState('')
  const [loadingInsights, setLoadingInsights] = useState(false)

  useEffect(() => {
    if (!user || !reportId) return

    fetch(`/api/risk-report/${reportId}`)
      .then((res) => res.json())
      .then((data) => {
        setReport(data)
        return Promise.all([
          fetch('/api/ai/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ report: data }),
          })
            .then(res => res.json())
            .then(res => setSummary(res.summary)),

          fetch('/api/ai/insights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ report: data }),
          })
            .then(res => res.json())
            .then(res => setInsights(res.insights))
        ])
      })
      .catch(() => toast.error('Failed to load report'))
      .finally(() => setLoading(false))
  }, [user, reportId])

  const handleDelete = async () => {
    if (!report) return
    setIsDeleting(true)

    const res = await fetch(`/api/risk-report/${report.id}`, {
      method: 'DELETE',
    })

    setIsDeleting(false)

    if (res.ok) {
      toast.success('Report deleted')
      router.push('/dashboard/reports')
    } else {
      toast.error('Failed to delete report')
    }
  }

  const handleExportPDF = () => {
    if (!report) return
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text(report.title, 14, 22)
    doc.setFontSize(12)
    doc.text(`Business Type: ${report.businessType}`, 14, 34)
    doc.text(`Risk Level: ${report.riskLevel}`, 14, 42)
    doc.text(`Created At: ${new Date(report.createdAt).toLocaleString()}`, 14, 50)

    if (report.description) {
      doc.text('Description:', 14, 62)
      doc.text(report.description, 14, 70)
    }

    doc.text('AI Summary:', 14, 90)
    doc.text(summary || 'No summary available', 14, 98)

    doc.text('AI Insights:', 14, 118)
    doc.text(insights || 'No insights available', 14, 126)

    doc.text('Analysis:', 14, 146)
    doc.text(JSON.stringify(report.analysis, null, 2), 14, 154)

    doc.save(`${report.title}.pdf`)
  }

  if (!user) {
    return <p className="text-center mt-20 text-zinc-500">🔒 Please sign in to view this report.</p>
  }

  if (loading) {
    return <p className="text-center mt-20 text-zinc-500">⏳ Loading report...</p>
  }

  if (!report) {
    return <p className="text-center mt-20 text-red-500">⚠️ Report not found.</p>
  }

  const riskColor =
    report.analysis.score >= 75
      ? 'bg-red-500'
      : report.analysis.score >= 40
        ? 'bg-yellow-500'
        : 'bg-green-500'

  const riskBadge = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-zinc-50 to-white dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 text-zinc-800 dark:text-zinc-200 font-serif px-4 py-12 md:px-10 max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            {report.title} <Bot className="w-5 h-5 text-blue-500" />
          </h1>
          <p className="text-sm text-zinc-500">
            {report.businessType} · Risk Level:{' '}
            <span className={`px-2 py-0.5 text-sm rounded-full ${riskBadge[report.riskLevel as keyof typeof riskBadge]}`}>
              {report.riskLevel.toUpperCase()}
            </span>
          </p>
          <p className="text-xs text-zinc-400">
            Created: {new Date(report.createdAt).toLocaleString()}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-2">Risk Score</h2>
          <div className="w-full h-4 bg-zinc-300 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${riskColor}`}
              style={{ width: `${report.analysis.score}%` }}
            ></div>
          </div>
          <p className="text-sm text-zinc-500 mt-1">Score: {report.analysis.score}%</p>
        </div>

        {report.description && (
          <div>
            <h2 className="text-lg font-medium mb-1">Description</h2>
            <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{report.description}</p>
          </div>
        )}

        {summary && (
          <div>
            <h2 className="text-lg font-medium mb-1">🧠 AI Summary</h2>
            <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap italic">{summary}</p>
          </div>
        )}

        {insights && (
          <div>
            <h2 className="text-lg font-medium mb-1">📌 AI Insights & Recommendations</h2>
            <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap italic flex gap-1">
              <Brain className="w-4 h-4 text-blue-500 mt-1" /> {insights}
            </p>
          </div>
        )}

        <div>
          <h2 className="text-lg font-medium mb-1">AI Analysis (raw)</h2>
          <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md overflow-x-auto text-sm">
            {JSON.stringify(report.analysis, null, 2)}
          </pre>
        </div>

        <div className="flex justify-between mt-6 flex-wrap gap-3">
          <Link href={`/dashboard/reports/report/${report.id}/edit`}>
            <Button variant="outline">Edit</Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Yes, delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button onClick={handleExportPDF} className="ml-auto bg-zinc-800 text-white hover:bg-zinc-700">
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
