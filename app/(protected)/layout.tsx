import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function ProtectedPage() {
  const { userId } =await  auth()

  if (!userId) {
    redirect("/sign-in") // <-- This is the correct way to redirect unauthenticated users
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">This is a protected page</h1>
    </div>
  )
}
