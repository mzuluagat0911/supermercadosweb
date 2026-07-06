import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const applications = await prisma.hrApplication.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(applications);
}
