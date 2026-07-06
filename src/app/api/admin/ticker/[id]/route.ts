import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
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

    const item = await prisma.promoTickerItem.update({
      where: { id },
      data: { emoji, text, href, sortOrder, active },
    });

    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "No se pudo actualizar." }, { status: 404 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  try {
    await prisma.promoTickerItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "No se pudo eliminar." }, { status: 404 });
  }
}
