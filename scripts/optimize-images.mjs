import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';

const PRODUCT_SIZES = [400, 800];
const LOGO_SIZES = [200, 400];
const CREST_SIZES = [140, 280];

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function convertToWebP(inputPath, outputDir, baseName, sizes) {
  const results = [];
  for (const width of sizes) {
    const outName = `${baseName}-${width}w.webp`;
    const outPath = join(outputDir, outName);
    try {
      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outPath);
      const info = await stat(outPath);
      const origInfo = await stat(inputPath);
      console.log(`  ${outName}: ${Math.round(info.size / 1024)}KB (was ${Math.round(origInfo.size / 1024)}KB)`);
      results.push({ name: outName, width, path: outPath });
    } catch (e) {
      console.error(`  FAILED ${outName}: ${e.message}`);
    }
  }
  return results;
}

async function main() {
  const root = process.cwd();

  // --- Product images ---
  const productsDir = join(root, 'assets', 'products');
  const productsWebpDir = join(root, 'assets', 'products', 'webp');
  await ensureDir(productsWebpDir);

  const productFiles = (await readdir(productsDir)).filter(f => extname(f) === '.png');
  console.log(`\nConverting ${productFiles.length} product images to WebP...\n`);

  const productMap = {};
  for (const file of productFiles) {
    const inputPath = join(productsDir, file);
    const baseName = basename(file, '.png');
    console.log(`${file}:`);
    const results = await convertToWebP(inputPath, productsWebpDir, baseName, PRODUCT_SIZES);
    productMap[file] = results;
  }

  // --- Crest / Logo images ---
  const assetsDir = join(root, 'assets');
  const assetsWebpDir = join(root, 'assets', 'webp');
  await ensureDir(assetsWebpDir);

  const crestImages = [
    { file: 'crest.png', sizes: CREST_SIZES },
    { file: 'crest-red.png', sizes: CREST_SIZES },
    { file: 'honor-logo.png', sizes: LOGO_SIZES },
  ];

  console.log(`\nConverting crest/logo images to WebP...\n`);
  const assetMap = {};
  for (const { file, sizes } of crestImages) {
    const inputPath = join(assetsDir, file);
    const baseName = basename(file, '.png');
    console.log(`${file}:`);
    const results = await convertToWebP(inputPath, assetsWebpDir, baseName, sizes);
    assetMap[file] = results;
  }

  // --- Write mapping file ---
  const mapping = { products: productMap, assets: assetMap };
  const mappingPath = join(root, 'src', 'constants', 'imageManifest.json');
  await ensureDir(join(root, 'src', 'constants'));
  const { writeFile } = await import('fs/promises');
  await writeFile(mappingPath, JSON.stringify(mapping, null, 2));
  console.log(`\nManifest written to ${mappingPath}`);
  console.log('Done!');
}

main().catch(e => { console.error(e); process.exit(1); });
