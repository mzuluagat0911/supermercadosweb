import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const fullName = String(formData.get("fullName") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const area = String(formData.get("area") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim() || null;
    const cvFile = formData.get("cv");

    if (!fullName || !phone || !email || !area) {
      return NextResponse.json(
        { error: "Completa todos los campos obligatorios." },
        { status: 400 },
      );
    }

    let cvFileName: string | null = null;
    let cvUrl: string | null = null;

    if (cvFile instanceof File && cvFile.size > 0) {
      if (cvFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "El archivo CV no puede superar 5 MB." },
          { status: 400 },
        );
      }

      if (!ALLOWED_TYPES.includes(cvFile.type)) {
        return NextResponse.json(
          { error: "Formato de CV no permitido. Usa PDF o Word." },
          { status: 400 },
        );
      }

      const uploadsDir = path.join(process.cwd(), "public", "uploads", "cv");
      await mkdir(uploadsDir, { recursive: true });

      const safeName = cvFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const fileName = `${Date.now()}-${safeName}`;
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      await writeFile(path.join(uploadsDir, fileName), buffer);

      cvFileName = cvFile.name;
      cvUrl = `/uploads/cv/${fileName}`;
    }

    const application = await prisma.hrApplication.create({
      data: {
        fullName,
        phone,
        email,
        area,
        message,
        cvFileName,
        cvUrl,
      },
    });

    return NextResponse.json({ success: true, id: application.id });
  } catch {
    return NextResponse.json(
      { error: "No se pudo procesar la solicitud." },
      { status: 500 },
    );
  }
}
