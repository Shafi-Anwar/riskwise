// app/plans/page.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = [
  {
    title: "Basic",
    price: "Free",
    description: "For those who are just beginning — or barely holding on.",
    features: [
      "Risk score (monthly)",
      "Role-based insights",
      "Basic pattern analysis",
      "Email-only support"
    ],
    button: "Stay Aware",
    link: "/checkout/basic"
  },
  {
    title: "Pro",
    price: "$12/mo",
    description: "For those working solo, quietly growing, still unsure.",
    features: [
      "Weekly risk tracking",
      "Burnout & fatigue alerts",
      "Deep behavior audits",
      "Downloadable reports",
      "Priority support"
    ],
    button: "Stay Safer",
    link: "/checkout/pro"
  },
  {
    title: "Premium",
    price: "$29/mo",
    description: "For those building something bigger — and feeling the weight of it.",
    features: [
      "Daily risk analysis",
      "Personalized recovery paths",
      "Offline mode (local analysis)",
      "Private journaling",
      "Early access tools",
      "1-on-1 monthly review"
    ],
    button: "Be Understood",
    link: "/checkout/premium"
  }
]

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950 py-24 px-6 text-zinc-800 dark:text-zinc-200">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Pick a Plan That Reflects Your Journey</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-16 max-w-2xl mx-auto">
          No pressure. No upsell. Just space to grow and tools to help.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <Card key={idx} className="transition-all transform hover:scale-[1.02] hover:shadow-xl bg-white/95 dark:bg-zinc-900/70 border border-zinc-300 dark:border-zinc-700 backdrop-blur-md">
              <CardContent className="p-8 flex flex-col h-full">
                <h2 className="text-3xl font-semibold mb-2">{plan.title}</h2>
                <p className="text-2xl font-bold mb-3">{plan.price}</p>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-loose">{plan.description}</p>
                <ul className="text-left space-y-3 mb-8 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {plan.features.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
                <Link href={plan.link}>
                  <Button className="mt-auto w-full bg-zinc-800 text-white hover:bg-zinc-700 text-lg">
                    {plan.button}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
