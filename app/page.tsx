'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import AutoDarkMode from "@/components/AutoDarkMode";
import { useAuth, UserButton } from "@clerk/nextjs";
export default function LandingPage() {
  const { isSignedIn } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 text-zinc-800 dark:text-zinc-200 font-serif text-base md:text-lg leading-relaxed">
      <AutoDarkMode />

      {/* Header */}
      <header className="py-8 border-b border-zinc-300 dark:border-zinc-800">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-700 dark:text-zinc-100">RiskWise</h1>
         {isSignedIn ? (
  <UserButton />
) : (
  <div className="space-x-3">
    <Link href="/sign-in">
      <Button variant="ghost" className="text-lg">Sign In</Button>
    </Link>
    <Link href="/sign-up">
      <Button className="bg-zinc-700 text-white hover:bg-zinc-600 px-5 py-2 text-lg">
        Get Started
      </Button>
    </Link>
  </div>
)}

        </div>
      </header>

      <main className="py-28 container mx-auto px-6">

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-28">
          <h2 className="text-6xl font-bold mb-8 leading-tight">
            Detect risk before it costs you.
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-loose">
            RiskWise helps freelancers and agency owners identify risky clients, prevent burnout, and safeguard payments—using smart AI insights.
          </p>
          <p className="text-lg text-zinc-500 dark:text-zinc-500 mb-10 italic">
            Secure work. Smart choices. Zero regrets.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-zinc-800 text-white hover:bg-zinc-700 px-6 py-4 text-lg rounded-xl shadow-lg transition-all hover:scale-[1.03]">
              Start Risk Assessment
            </Button>
          </Link>
        </section>

        {/* About Us */}
        <section className="mb-28 text-center max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-6">Built for creators, consultants & closers</h3>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6 leading-loose">
            RiskWise was crafted by freelancers, consultants, and agency founders who learned the hard way. Our platform helps you spot red flags in projects, clients, and contracts before things go south.
          </p>
          <p className="text-lg text-zinc-500 dark:text-zinc-500 italic">
            Know the risk. Win the deal smartly.
          </p>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-8 mb-28">
          {[
            {
              title: "🔍 Client Risk Profiler",
              desc: "Describe a new lead or upload chat history. Our AI scans for red flags and predicts ghosting or payment delays."
            },
            {
              title: "📊 Project Scope Analyzer",
              desc: "Check if your project brief has vague timelines, undefined deliverables, or hidden risk triggers."
            },
            {
              title: "💰 Payment Risk Radar",
              desc: "Track incoming payments and alert you to late payers or contracts without proper payment terms."
            },
            {
              title: "🔥 Burnout Detector",
              desc: "Integrates with your calendar to show if you're overbooked or on the verge of burnout based on time and workload."
            },
            {
              title: "📁 Contract Clause Checker",
              desc: "Upload your agreement, and we’ll highlight risky or missing clauses like IP, non-payment, and termination policies."
            },
            {
              title: "🧠 Trust Score Engine",
              desc: "Every client or project gets a dynamic Trust Score—powered by risk signals and past data—to guide your next move."
            }
          ].map((feature, i) => (
            <Card key={i} className="transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl bg-white/90 dark:bg-zinc-900/70 border border-zinc-300 dark:border-zinc-700 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Pricing Plans */}
        <section className="mb-28 max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Simple plans, serious protection</h3>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-xl mx-auto">
            Whether you’re solo or scaling your team, RiskWise grows with your risk profile.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Starter",
                price: "Free",
                description: "Perfect for new freelancers testing the waters.",
                features: [
                  "Client Risk Scanner (basic)",
                  "2 reports/month",
                  "AI Burnout Alerts",
                  "Email support"
                ],
                button: "Start Free"
              },
              {
                title: "Pro Freelancer",
                price: "$29/mo",
                description: "Stay protected while scaling your solo business.",
                features: [
                  "Unlimited risk scans",
                  "Contract risk audits",
                  "Payment flagging system",
                  "Priority support"
                ],
                button: "Upgrade Now"
              },
              {
                title: "Agency Shield",
                price: "$79/mo",
                description: "Best for agencies managing multiple clients and projects.",
                features: [
                  "Client Trust Dashboard",
                  "Team workload monitoring",
                  "Red flag alerts across all projects",
                  "Dedicated risk strategist access"
                ],
                button: "Start Trial"
              }
            ].map((plan, idx) => (
              <Card key={idx} className="transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl bg-white/95 dark:bg-zinc-900/70 border border-zinc-300 dark:border-zinc-700 backdrop-blur-md">
                <CardContent className="p-8 flex flex-col h-full">
                  <h4 className="text-3xl font-semibold mb-2">{plan.title}</h4>
                  <p className="text-2xl font-bold mb-3">{plan.price}</p>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-loose">{plan.description}</p>
                  <ul className="text-left space-y-3 mb-8 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {plan.features.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                  <Button className="mt-auto bg-zinc-800 text-white hover:bg-zinc-700 px-5 py-2 text-lg transition-all hover:scale-[1.03]">
                    {plan.button}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-28 max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Trusted by smart independents</h3>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6">
            "RiskWise helped me avoid a $3,000 loss from a client who always ‘sounded nice’. Now every client gets scanned first."
          </p>
          <p className="text-lg text-zinc-500 dark:text-zinc-500 italic">— Alina R., UX Designer & Consultant</p>
        </section>

        {/* Contact */}
        <section className="text-center">
          <h3 className="text-4xl font-bold mb-6">Avoid regret. Start assessing risk now.</h3>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto leading-loose">
            Whether you freelance or run an agency, RiskWise gives you the clarity to grow with confidence. Let's build your risk-free future.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-zinc-800 text-white hover:bg-zinc-700 px-6 py-4 text-lg rounded-xl shadow-md transition-all hover:scale-[1.03]">
              Contact Us
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-zinc-500 text-base border-t border-zinc-300 dark:border-zinc-800 mt-28">
        &copy; {new Date().getFullYear()} RiskWise · Freelance Smart. Grow Fearlessly.
      </footer>
    </div>
  );
}
