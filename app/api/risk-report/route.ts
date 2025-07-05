// app/api/risk-report/route.ts

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

// GET all reports for logged-in user
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reports = await prisma.riskReport.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reports); // ✅ return raw array
}

// POST to create a new report
export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, description, businessType, riskLevel, analysis } = body;

  const newReport = await prisma.riskReport.create({
    data: {
      title,
      description,
      businessType,
      riskLevel,
      analysis,
      userId,
    },
  });

  return NextResponse.json(newReport);
}
