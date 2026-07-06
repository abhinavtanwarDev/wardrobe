import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ICONS_DIR = path.join(process.cwd(), "public", "icons");
const SOURCE_ICON = path.join(ICONS_DIR, "icon.svg");
const SOURCE_MASKABLE = path.join(ICONS_DIR, "icon-maskable.svg");

const SIZES = [192, 256, 384, 512];

async function generate() {
  await mkdir(ICONS_DIR, { recursive: true });

  for (const size of SIZES) {
    await sharp(SOURCE_ICON)
      .resize(size, size)
      .png()
      .toFile(path.join(ICONS_DIR, `icon-${size}x${size}.png`));
    console.log(`Generated icon-${size}x${size}.png`);
  }

  await sharp(SOURCE_MASKABLE)
    .resize(512, 512)
    .png()
    .toFile(path.join(ICONS_DIR, "icon-maskable-512x512.png"));
  console.log("Generated icon-maskable-512x512.png");

  await sharp(SOURCE_ICON)
    .resize(180, 180)
    .flatten({ background: "#2563eb" })
    .png()
    .toFile(path.join(ICONS_DIR, "apple-touch-icon.png"));
  console.log("Generated apple-touch-icon.png");
}

generate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
