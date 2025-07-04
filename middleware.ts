// middleware.ts

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/",             // Landing page
  "/sign-in(.*)",  // Custom sign-in route
  "/sign-up(.*)",  // Custom sign-up route
  "/api/webhook(.*)", // Optional: public webhook (if needed)
])

export default clerkMiddleware(async (auth, req) => {
  // Protect everything except public routes
  if (!isPublicRoute(req)) {
    const { userId } = await auth()
    if (!userId) {
      // If user not signed in, redirect to custom sign-in
      return Response.redirect(new URL("/sign-in", req.url))
    }
  }
})

export const config = {
  matcher: [
    // Run on all routes except static files
    "/((?!_next|.*\\..*).*)",
    "/",
    "/api/(.*)",
  ],
}
