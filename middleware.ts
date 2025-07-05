import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook(.*)",
]);

export default clerkMiddleware(async (authPromise, req) => {
  const { userId } = await authPromise();

  if (isPublicRoute(req)) return;

  if (!userId) {
    return Response.redirect(new URL("/sign-in", req.url));
  }

  // ✅ Don't use Prisma here!
  // You will check role inside a server component/layout/page.
});
