import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveUploadedImage } from "@/lib/uploads";

export async function GET() {
  const items = await prisma.separataItem.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = String(formData.get("title") ?? "").trim();
    const link = String(formData.get("link") ?? "").trim() || null;
    const sortOrder = Number(formData.get("sortOrder") ?? 0);
    const active = formData.get("active") === "true";
    const imageFile = formData.get("image");

    if (!title) {
      return NextResponse.json({ error: "El título es obligatorio." }, { status: 400 });
    }

    let imageUrl = String(formData.get("imageUrl") ?? "").trim();

    if (imageFile instanceof File && imageFile.size > 0) {
      imageUrl = await saveUploadedImage(imageFile, "separata");
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Debes subir una imagen 1080×1080 para la separata." },
        { status: 400 },
      );
    }

    const item = await prisma.separataItem.create({
      data: { title, link, imageUrl, sortOrder, active },
    });

    return NextResponse.json(item);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al crear la separata.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
