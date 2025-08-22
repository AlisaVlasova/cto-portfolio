import fs from "fs";
import path from "path";
import sharp from "sharp";

const PAGES_DIR = path.join(process.cwd(), "public");

async function processFolder(folderPath) {
  const files = fs.readdirSync(folderPath);

  let index = 1;
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;

    // пропускаємо вже нормалізовані imgX.jpeg
    if (/^img\d+\.jpeg$/.test(file)) {
      continue;
    }

    const srcPath = path.join(folderPath, file);
    const destPath = path.join(folderPath, `img${index}.jpeg`);
    const tmpPath = path.join(folderPath, `tmp-${file}`);

    fs.renameSync(srcPath, tmpPath);

    try {
      await sharp(tmpPath)
        .jpeg({ quality: 90 })
        .toFile(destPath);

      fs.unlinkSync(tmpPath);
      console.log(`✅ ${file} → ${path.basename(destPath)}`);
      index++;
    } catch (err) {
      console.error("❌ Error processing", file, err);
      // відновлюємо, якщо щось пішло не так
      if (fs.existsSync(tmpPath)) {
        fs.renameSync(tmpPath, srcPath);
      }
    }
  }
}

async function main() {
  if (!fs.existsSync(PAGES_DIR)) {
    console.error("❌ Pages directory not found:", PAGES_DIR);
    process.exit(1);
  }

  const subfolders = fs.readdirSync(PAGES_DIR);
  for (const folder of subfolders) {
    const folderPath = path.join(PAGES_DIR, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      console.log(`📂 Processing ${folder}...`);
      await processFolder(folderPath);
    }
  }
  console.log("🎉 All images normalized");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
