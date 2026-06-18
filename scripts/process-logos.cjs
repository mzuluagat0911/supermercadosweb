const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const logosDir = path.join(__dirname, "../public/images/logos");
const sourceDir = path.join(logosDir, "source");

const SOURCES = {
  "el-ahorro.png": [
    path.join(sourceDir, "el-ahorro-original.png"),
    path.join(process.env.HOME, "Downloads/LOGO AHORRO_Mesa de trabajo 1 copia.png"),
  ],
  "del-centro.png": [
    path.join(sourceDir, "del-centro-original.png"),
    path.join(
      process.env.HOME,
      "Downloads/Logo supermercado del centro RGB borde blanco_1 copia.png",
    ),
  ],
};

function resolveSource(candidates) {
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error(`No se encontró archivo fuente para: ${candidates.join(" | ")}`);
}

function isBackgroundPixel(r, g, b, a) {
  if (a < 20) return true;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max === 0 ? 0 : (max - min) / max;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  if (r < 70 && g < 70 && b < 70) return true;
  if (luminance < 55 && saturation < 0.35) return true;

  return false;
}

async function cleanupBackground(inputPath, outputPath, maxWidth) {
  const { data, info } = await sharp(inputPath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixels = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  const visited = new Uint8Array(width * height);
  const queue = [];

  const pushIfBackground = (x, y) => {
    const index = y * width + x;
    if (visited[index]) return;

    const offset = index * channels;
    const r = pixels[offset];
    const g = pixels[offset + 1];
    const b = pixels[offset + 2];
    const a = pixels[offset + 3];

    if (!isBackgroundPixel(r, g, b, a)) return;

    visited[index] = 1;
    queue.push(index);
  };

  for (let x = 0; x < width; x++) {
    pushIfBackground(x, 0);
    pushIfBackground(x, height - 1);
  }

  for (let y = 0; y < height; y++) {
    pushIfBackground(0, y);
    pushIfBackground(width - 1, y);
  }

  while (queue.length > 0) {
    const index = queue.pop();
    const x = index % width;
    const y = Math.floor(index / width);
    const offset = index * channels;
    pixels[offset + 3] = 0;

    if (x > 0) pushIfBackground(x - 1, y);
    if (x < width - 1) pushIfBackground(x + 1, y);
    if (y > 0) pushIfBackground(x, y - 1);
    if (y < height - 1) pushIfBackground(x, y + 1);
  }

  await sharp(Buffer.from(pixels), {
    raw: { width, height, channels },
  })
    .trim({ threshold: 5 })
    .png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
    .toFile(outputPath);
}

async function main() {
  for (const [outputName, candidates] of Object.entries(SOURCES)) {
    const sourcePath = resolveSource(candidates);

    const outputPath = path.join(logosDir, outputName);
    const maxWidth = outputName === "el-ahorro.png" ? 720 : 760;

    await cleanupBackground(sourcePath, outputPath, maxWidth);
    console.log(`Logo optimizado: ${outputName}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
