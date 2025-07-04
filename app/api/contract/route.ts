import prisma  from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getCurrentUser();
    const contracts = await prisma.contract.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(contracts);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();

    const contract = await prisma.contract.create({
      data: {
        userId: user.id,
        title: body.title,
        content: body.content,
      }
    });

    return NextResponse.json(contract);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
