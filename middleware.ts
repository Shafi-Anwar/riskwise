// middleware.ts

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

const isPublicRoute = createRouteMatcher([
  "/", "/sign-in(.*)", "/sign-up(.*)", "/api/webhook(.*)", "/onboarding(.*)"
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  if (!isPublicRoute(req)) {
    if (!userId) {
      return Response.redirect(new URL("/sign-in", req.url))
    }

    // Get user role from DB
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { role: true },
    })

    if (!user || !user.role) {
      return Response.redirect(new URL("/onboarding", req.url))
    }
  }
})
