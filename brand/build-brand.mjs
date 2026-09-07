/**
 * Genera los recursos de marca del portfolio:
 *   - public/og-image.png        tarjeta de vista previa al compartir el link
 *   - public/apple-touch-icon.png  icono para iOS (Safari no lee el SVG)
 *   - public/favicon-32.png      respaldo para navegadores viejos
 *
 *   node brand/build-brand.mjs      (o bien: npm run brand, desde frontend/)
 *
 * Sin dependencias de npm: usa el Chrome/Chromium instalado, igual que el CV.
 */
import { execFileSync } from 'node:child_process';
import { deflateSync, inflateSync } from 'node:zlib';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publico = join(raiz, 'frontend', 'public');

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
].filter(Boolean);

function buscarNavegador() {
  const encontrado = CANDIDATOS.find((ruta) => existsSync(ruta));
  if (encontrado) return encontrado;
  throw new Error(
    'No encontre Chrome ni Chromium. Indicame la ruta con CHROME_PATH=/ruta/a/chrome',
  );
}

/** Devuelve el CSS de Google Fonts con las tipografias ya en base64. */
async function incrustarFuentes(html) {
  const enlace = html.match(/<link\s+href="(https:\/\/fonts\.googleapis\.com[^"]+)"/);
  if (!enlace) return html;

  try {
    const css = await fetch(enlace[1], { headers: { 'User-Agent': UA } }).then((r) => {
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

    let resuelto = css;
    for (const [url, dataUri] of descargas) resuelto = resuelto.split(url).join(dataUri);
    console.log(`  ${descargas.length} archivos de fuente incrustados`);

    return html
      .replace(/\s*<link rel="preconnect"[^>]*>/g, '')
      .replace(/\s*<link\s+href="https:\/\/fonts\.googleapis\.com[^>]*>/g, `<style>${resuelto}</style>`);
  } catch (error) {
    console.warn(`  Aviso: sigo sin incrustar fuentes (${error.message})`);
    return html;
  }
}

// Chrome interpreta --window-size como el tamano de la VENTANA, no del viewport:
// descuenta el marco (unos 90 px de alto) y rellena el resto de la captura con el
// color de fondo. Por eso pedimos una ventana con margen de sobra y recortamos.
const MARGEN_VENTANA = 260;

const TABLA_CRC = Uint32Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) c = TABLA_CRC[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(tipo, datos) {
  const largo = Buffer.alloc(4);
  largo.writeUInt32BE(datos.length);
  const cuerpo = Buffer.concat([Buffer.from(tipo, 'ascii'), datos]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(cuerpo));
  return Buffer.concat([largo, cuerpo, crc]);
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}

/** Recorta un PNG a las primeras `filas` lineas. Soporta el formato que emite Chrome. */
function recortarPng(origen, destino, filas) {
  const png = readFileSync(origen);
  let ancho = 0, alto = 0, profundidad = 0, tipoColor = 0, entrelazado = 0;
  const trozosIdat = [];

  for (let i = 8; i < png.length; ) {
    const largo = png.readUInt32BE(i);
    const tipo = png.toString('ascii', i + 4, i + 8);
    const datos = png.subarray(i + 8, i + 8 + largo);
    if (tipo === 'IHDR') {
      ancho = datos.readUInt32BE(0);
      alto = datos.readUInt32BE(4);
      profundidad = datos[8];
      tipoColor = datos[9];
      entrelazado = datos[12];
    } else if (tipo === 'IDAT') trozosIdat.push(datos);
    i += 12 + largo;
  }

  const canales = { 0: 1, 2: 3, 4: 2, 6: 4 }[tipoColor];
  if (!canales || profundidad !== 8 || entrelazado !== 0) {
    throw new Error(`formato PNG inesperado (tipo ${tipoColor}, ${profundidad} bits)`);
  }
  if (filas > alto) throw new Error(`la captura salio de ${alto} px, se pedian ${filas}`);

  const bpp = canales;
  const anchoFila = ancho * bpp;
  const crudo = inflateSync(Buffer.concat(trozosIdat));
  const salida = Buffer.alloc(filas * (anchoFila + 1));
  let previa = Buffer.alloc(anchoFila);

  for (let y = 0; y < filas; y++) {
    const filtro = crudo[y * (anchoFila + 1)];
    const fila = crudo.subarray(y * (anchoFila + 1) + 1, (y + 1) * (anchoFila + 1));
    const actual = Buffer.alloc(anchoFila);

    for (let x = 0; x < anchoFila; x++) {
      const a = x >= bpp ? actual[x - bpp] : 0;
      const b = previa[x];
      const c = x >= bpp ? previa[x - bpp] : 0;
      const v = fila[x];
      actual[x] =
        (filtro === 0 ? v
        : filtro === 1 ? v + a
        : filtro === 2 ? v + b
        : filtro === 3 ? v + ((a + b) >> 1)
        : v + paeth(a, b, c)) & 0xff;
    }

    salida[y * (anchoFila + 1)] = 0; // reescribimos sin filtro
    actual.copy(salida, y * (anchoFila + 1) + 1);
    previa = actual;
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(ancho, 0);
  ihdr.writeUInt32BE(filas, 4);
  ihdr[8] = 8;
  ihdr[9] = tipoColor;

  writeFileSync(destino, Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(salida, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]));
}

function capturar(navegador, htmlPath, destino, ancho, alto) {
  const bruto = `${destino}.bruto.png`;
  execFileSync(
    navegador,
    [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--hide-scrollbars',
      `--window-size=${ancho},${alto + MARGEN_VENTANA}`,
      `--screenshot=${bruto}`,
      `file://${htmlPath}`,
    ],
    { stdio: 'pipe' },
  );
  if (!existsSync(bruto)) throw new Error(`no se genero ${destino}`);

  try {
    recortarPng(bruto, destino, alto);
  } finally {
    rmSync(bruto, { force: true });
  }
  console.log(`  ${destino.replace(raiz + '/', '')} (${ancho}x${alto}, ${Math.round(readFileSync(destino).length / 1024)} kB)`);
}

/** Envuelve el favicon SVG en una pagina del tamano pedido, para exportarlo a PNG. */
function paginaDelIcono(lado) {
  const svg = readFileSync(join(publico, 'favicon.svg'), 'utf8');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0}
    html,body{width:${lado}px;height:${lado}px;overflow:hidden}
    svg{width:${lado}px;height:${lado}px;display:block}
  </style></head><body>${svg}</body></html>`;
}

async function main() {
  const navegador = buscarNavegador();
  console.log(`Navegador: ${navegador}`);

  const temporal = join(tmpdir(), `brand-${Date.now()}`);
  mkdirSync(temporal, { recursive: true });

  try {
    const og = join(temporal, 'og.html');
    writeFileSync(og, await incrustarFuentes(readFileSync(join(raiz, 'brand', 'og-image.html'), 'utf8')));
    capturar(navegador, og, join(publico, 'og-image.png'), 1200, 630);

    for (const [lado, nombre] of [[180, 'apple-touch-icon.png'], [32, 'favicon-32.png']]) {
      const ruta = join(temporal, `icon-${lado}.html`);
      writeFileSync(ruta, paginaDelIcono(lado));
      capturar(navegador, ruta, join(publico, nombre), lado, lado);
    }
  } finally {
    rmSync(temporal, { recursive: true, force: true });
  }

  console.log('Listo.');
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
