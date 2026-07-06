import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveUploadedImage } from "@/lib/uploads";

export async function GET() {
  const banners = await prisma.banner.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(banners);
}

export async function POST(request: NextRequest) {
  try {
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

    let imageUrl = String(formData.get("imageUrl") ?? "").trim();

    if (imageFile instanceof File && imageFile.size > 0) {
      imageUrl = await saveUploadedImage(imageFile, "banners");
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Debes subir una imagen para el banner." },
        { status: 400 },
      );
    }

    const banner = await prisma.banner.create({
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
    const message = error instanceof Error ? error.message : "Error al crear banner.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
