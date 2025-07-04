currentUser
import { currentUser } from "@clerk/nextjs/server";
import prisma  from "./prisma";

export async function getCurrentUser() {
  const clerkUser = await currentUser();

  if (!clerkUser || !clerkUser.id) {
    throw new Error("Unauthorized");
  }

  // Try to find user in your DB
  let user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id }
  });

  // If not found, create it
  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || null,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
      }
    });
  }

  return user;
}
