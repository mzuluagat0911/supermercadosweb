import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const stores = await prisma.store.findMany({
    where: { active: true },
    orderBy: [{ brand: "asc" }, { sortOrder: "asc" }],
  });
  return NextResponse.json(stores);
}
