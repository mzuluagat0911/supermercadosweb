import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveUploadedImage } from "@/lib/uploads";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const banner = await prisma.banner.findUnique({ where: { id } });

  if (!banner) {
    return NextResponse.json({ error: "Banner no encontrado." }, { status: 404 });
  }

  return NextResponse.json(banner);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const existing = await prisma.banner.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Banner no encontrado." }, { status: 404 });
    }

    const formData = await request.formData();
    const tag = String(formData.get("tag") ?? "").trim() || null;
    const title = String(formData.get("title") ?? "").trim();
    const body = String(formData.get("body") ?? "").trim();
    const ctaText = String(formData.get("ctaText") ?? "").trim();
    const ctaLink = String(formData.get("ctaLink") ?? "").trim() || null;
    const ctaType = String(formData.get("ctaType") ?? "LINK");
    const sortOrder = Number(formData.get("sortOrder") ?? 0);
    const active = formData.get("active") === "true";
    const imageFile = formData.get("image");

    if (!title || !body || !ctaText) {
      return NextResponse.json(
        { error: "Título, descripción y texto del botón son obligatorios." },
        { status: 400 },
      );
    }

    let imageUrl = existing.imageUrl;

    if (imageFile instanceof File && imageFile.size > 0) {
      imageUrl = await saveUploadedImage(imageFile, "banners");
    }

    const banner = await prisma.banner.update({
      where: { id },
      data: {
        tag,
        title,
        body,
        imageUrl,
        ctaText,
        ctaLink,
        ctaType: ctaType as "OFFERS" | "WHATSAPP" | "STORES" | "CATALOG" | "LINK",
        sortOrder,
        active,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al actualizar banner.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  try {
    await prisma.banner.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "No se pudo eliminar el banner." }, { status: 404 });
  }
}
