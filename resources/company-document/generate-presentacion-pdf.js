/**
 * Genera presentacion-seismiles.pdf a partir del HTML del mismo directorio.
 * Formato 16:9 landscape (297×167 mm).
 *
 * Uso: node resources/company-document/generate-presentacion-pdf.js
 */

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const HTML_FILE = path.resolve(__dirname, "presentacion-seismiles.html");
const PDF_FILE = path.resolve(__dirname, "presentacion-seismiles.pdf");

(async () => {
  if (!fs.existsSync(HTML_FILE)) {
    console.error("No se encontró el archivo HTML:", HTML_FILE);
    process.exit(1);
  }

  console.log("Iniciando browser...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const fileUrl = "file:///" + HTML_FILE.replace(/\\/g, "/");
  console.log("Cargando:", fileUrl);

  await page.goto(fileUrl, {
    waitUntil: "networkidle0",
    timeout: 90000,
  });

  console.log("Generando PDF...");
  await page.pdf({
    path: PDF_FILE,
    width: "297mm",
    height: "167mm",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();

  const sizeKB = Math.round(fs.statSync(PDF_FILE).size / 1024);
  console.log(`✓ PDF generado: ${PDF_FILE} (${sizeKB} KB)`);
})();
