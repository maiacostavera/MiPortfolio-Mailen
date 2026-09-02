/**
 * Genera el CV en PDF a partir de cv/cv.html.
 *
 *   node cv/build-cv.mjs        (o bien: npm run cv, desde frontend/)
 *
 * No necesita dependencias de npm: usa el Chromium/Chrome que ya tengas
 * instalado. Antes de imprimir descarga las tipografias de Google Fonts y las
 * incrusta en el HTML, asi el PDF queda igual en cualquier maquina.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entrada = join(raiz, 'cv', 'cv.html');
const salida = join(raiz, 'frontend', 'public', 'cv-mailen-acosta-vera.pdf');

const FUENTES =
  'https://fonts.googleapis.com/css2' +
  '?family=IBM+Plex+Mono:wght@400;500' +
  '&family=Inter:wght@300;400;500;600' +
  '&family=Playfair+Display:wght@400;500;600' +
  '&display=swap';

// Chrome sirve woff2 solo si el User-Agent es de un navegador moderno.
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const CANDIDATOS = [
  process.env.CHROME_PATH,
  '/opt/pw-browsers/chromium',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
].filter(Boolean);

function buscarNavegador() {
  const encontrado = CANDIDATOS.find((ruta) => existsSync(ruta));
  if (encontrado) return encontrado;
  throw new Error(
    'No encontre Chrome ni Chromium. Instalalo, o indicame la ruta con:\n' +
      '  CHROME_PATH=/ruta/a/chrome node cv/build-cv.mjs',
  );
}

/** Descarga la hoja de Google Fonts y devuelve el CSS con las fuentes en base64. */
async function fuentesIncrustadas() {
  const css = await fetch(FUENTES, { headers: { 'User-Agent': UA } }).then((r) => {
    if (!r.ok) throw new Error(`Google Fonts respondio ${r.status}`);
    return r.text();
  });

  const urls = [...new Set(css.match(/https:\/\/fonts\.gstatic\.com[^)]+/g) ?? [])];
  const descargas = await Promise.all(
    urls.map(async (url) => {
      const buffer = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
      return [url, `data:font/woff2;base64,${buffer.toString('base64')}`];
    }),
  );

  let resultado = css;
  for (const [url, dataUri] of descargas) resultado = resultado.split(url).join(dataUri);
  console.log(`  ${descargas.length} archivos de fuente incrustados`);
  return resultado;
}

async function main() {
  const navegador = buscarNavegador();
  console.log(`Navegador: ${navegador}`);

  let html = readFileSync(entrada, 'utf8');

  try {
    const css = await fuentesIncrustadas();
    // Reemplazamos los <link> remotos por el CSS ya resuelto.
    html = html
      .replace(/\s*<link rel="preconnect"[^>]*>/g, '')
      .replace(/\s*<link\s+href="https:\/\/fonts\.googleapis\.com[^>]*>/g, `<style>${css}</style>`);
  } catch (error) {
    console.warn(`  Aviso: sigo sin incrustar fuentes (${error.message})`);
  }

  const temporal = join(tmpdir(), `cv-${Date.now()}`);
  mkdirSync(temporal, { recursive: true });
  const htmlTemporal = join(temporal, 'cv.html');
  writeFileSync(htmlTemporal, html);

  try {
    execFileSync(
      navegador,
      [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--no-pdf-header-footer',
        '--virtual-time-budget=6000',
        `--print-to-pdf=${salida}`,
        `file://${htmlTemporal}`,
      ],
      { stdio: 'pipe' },
    );
  } finally {
    rmSync(temporal, { recursive: true, force: true });
  }

  if (!existsSync(salida)) throw new Error('Chrome no genero el PDF');
  const kb = Math.round(readFileSync(salida).length / 1024);
  console.log(`Listo: ${salida} (${kb} kB)`);
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
