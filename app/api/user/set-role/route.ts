// app/api/user/set-role/route.ts

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { role } = await req.json();

  if (!["freelancer", "business"].includes(role)) {
    return new Response("Invalid role", { status: 400 });
  }

  await prisma.user.update({
    where: { clerkId: userId },
    data: { role },
  });

  return new Response("Role updated", { status: 200 });
}
