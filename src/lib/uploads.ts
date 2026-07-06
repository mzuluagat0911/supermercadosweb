import { mkdir, writeFile } from "fs/promises";
import path from "path";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export async function saveUploadedImage(file: File, folder: "banners" | "stores") {
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("La imagen no puede superar 5 MB.");
  }

  if (!IMAGE_TYPES.includes(file.type)) {
    throw new Error("Formato no permitido. Usa JPG, PNG, WebP o SVG.");
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(uploadsDir, { recursive: true });

  const extension = path.extname(file.name) || ".jpg";
  const safeBase = path.basename(file.name, extension).replace(/[^a-zA-Z0-9._-]/g, "_");
  const fileName = `${Date.now()}-${safeBase}${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, fileName), buffer);

  return `/uploads/${folder}/${fileName}`;
}
