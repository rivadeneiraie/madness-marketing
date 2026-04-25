/**
 * Genera propuesta-comercial-seismiles.pdf a partir del HTML del mismo directorio.
 * Las imágenes se cargan desde GitHub (requiere internet).
 *
 * Uso: node resources/company-document/generate-pdf.js
 */

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const HTML_FILE = path.resolve(__dirname, "propuesta-comercial-seismiles.html");
const PDF_FILE = path.resolve(__dirname, "propuesta-comercial-seismiles.pdf");

(async () => {
  if (!fs.existsSync(HTML_FILE)) {
    console.error("No se encontró el archivo HTML:", HTML_FILE);
    process.exit(1);
  }

  console.log("Iniciando browser...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Cargar el HTML como file:// para que los estilos inline funcionen.
  // Las imágenes son URLs de GitHub — puppeteer las descarga normalmente.
  const fileUrl = "file:///" + HTML_FILE.replace(/\\/g, "/");
  console.log("Cargando:", fileUrl);

  await page.goto(fileUrl, {
    waitUntil: "networkidle0", // espera a que las imágenes de GitHub carguen
    timeout: 60000,
  });

  console.log("Generando PDF...");
  await page.pdf({
    path: PDF_FILE,
    format: "A4",
    printBackground: true, // imprescindible para fondos oscuros y gradientes
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();

  const sizeKB = Math.round(fs.statSync(PDF_FILE).size / 1024);
  console.log(`✓ PDF generado: ${PDF_FILE} (${sizeKB} KB)`);
})();
