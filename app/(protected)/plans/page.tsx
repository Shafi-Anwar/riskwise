// app/(protected)/plans/page.tsx
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function PlansPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Your Plans</h1>
      <p>This is a protected page visible only to logged-in users.</p>
    </div>
  )
}
