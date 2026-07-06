import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.promoTickerItem.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const emoji = String(body.emoji ?? "").trim();
    const text = String(body.text ?? "").trim();
    const href = body.href ? String(body.href).trim() : null;
    const sortOrder = Number(body.sortOrder ?? 0);
    const active = body.active !== false;

    if (!emoji || !text) {
      return NextResponse.json(
        { error: "Emoji y texto son obligatorios." },
        { status: 400 },
      );
    }

    const item = await prisma.promoTickerItem.create({
      data: { emoji, text, href, sortOrder, active },
    });

    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "No se pudo crear el mensaje." }, { status: 500 });
  }
}
