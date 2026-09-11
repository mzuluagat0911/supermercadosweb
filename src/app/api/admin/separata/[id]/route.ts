import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveUploadedImage } from "@/lib/uploads";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const item = await prisma.separataItem.findUnique({ where: { id } });

  if (!item) {
    return NextResponse.json({ error: "Ítem no encontrado." }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const existing = await prisma.separataItem.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Ítem no encontrado." }, { status: 404 });
    }

    const formData = await request.formData();
    const title = String(formData.get("title") ?? "").trim();
    const link = String(formData.get("link") ?? "").trim() || null;
    const sortOrder = Number(formData.get("sortOrder") ?? 0);
    const active = formData.get("active") === "true";
    const imageFile = formData.get("image");

    if (!title) {
      return NextResponse.json({ error: "El título es obligatorio." }, { status: 400 });
    }

    let imageUrl = existing.imageUrl;

    if (imageFile instanceof File && imageFile.size > 0) {
      imageUrl = await saveUploadedImage(imageFile, "separata");
    }

    const item = await prisma.separataItem.update({
      where: { id },
      data: { title, link, imageUrl, sortOrder, active },
    });

    return NextResponse.json(item);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al actualizar la separata.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  try {
    await prisma.separataItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "No se pudo eliminar el ítem." }, { status: 404 });
  }
}
