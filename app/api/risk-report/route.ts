import prisma  from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getCurrentUser();
    const reports = await prisma.riskReport.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(reports);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();

    const report = await prisma.riskReport.create({
      data: {
        userId: user.id,
        title: body.title,
        description: body.description,
        content: body.content,
        businessType: body.businessType,
        riskLevel: body.riskLevel,
        analysis: body.analysis
      }
    });

    return NextResponse.json(report);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
