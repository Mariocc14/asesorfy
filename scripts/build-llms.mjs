/* Genera llms.txt (formato llmstxt.org) a partir de las páginas del sitio.
   Uso: node scripts/build-llms.mjs [raíz]   (por defecto, la raíz del repo)
   Nunca se edita llms.txt a mano: se regenera en cada publicación. */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || path.join(path.dirname(new URL(import.meta.url).pathname), ".."));
const DOMAIN = "https://asesorfy.app";
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");
const meta = (html, re) => html.match(re)?.[1]?.replace(/&amp;/g, "&").replace(/&quot;/g, '"').trim() || "";
const cleanTitle = (t) => t.replace(/\s*[|·—-]\s*Asesorfy\s*$/i, "").trim();

const page = (f) => {
  const html = read(f);
  return {
    file: f,
    title: cleanTitle(meta(html, /<title>([^<]+)<\/title>/)),
    description: meta(html, /<meta name="description" content="([^"]+)"/),
    date: meta(html, /"datePublished":"(\d{4}-\d{2}-\d{2})"/) || meta(html, /"datePublished":\s*"(\d{4}-\d{2}-\d{2})"/) || meta(html, /article:published_time" content="(\d{4}-\d{2}-\d{2})"/) || "",
  };
};

const statics = [
  ["index.html", "Inicio"], ["documentos.html", "Catálogo de documentos"], ["generador.html", "Generador de documentos (pago único)"],
  ["calculadora-rentabilidad-alquiler.html", "Calculadora de rentabilidad del alquiler"], ["asesoria.html", "Asesoría de 30 minutos por videollamada (20 €)"],
].filter(([f]) => fs.existsSync(path.join(root, f))).map(([f, label]) => ({ ...page(f), label }));

const casos = fs.existsSync(path.join(root, "casos")) ? fs.readdirSync(path.join(root, "casos")).filter(f => f.endsWith(".html")).sort().map(f => page(`casos/${f}`)) : [];
const posts = fs.readdirSync(root).filter(f => /^blog-.*\.html$/.test(f)).map(page)
  .sort((a, b) => (b.date || "0000").localeCompare(a.date || "0000") || a.file.localeCompare(b.file));
const legal = ["aviso-legal.html", "privacidad.html", "condiciones.html", "cookies.html"].filter(f => fs.existsSync(path.join(root, f)));

const line = (p, label) => `- [${label || p.title}](${DOMAIN}/${p.file})${p.description ? `: ${p.description}` : ""}${p.date ? ` (${p.date})` : ""}`;

const out = `# Asesorfy

> Documentos legales para propietarios y pequeños caseros en España, redactados sobre el Código Civil, la Ley de Arrendamientos Urbanos (LAU), la Ley 12/2023 de Vivienda y la Ley Orgánica 1/2025 (MASC). Contratos de alquiler de vivienda habitual, habitación y temporada, kit de impago con Oferta Vinculante Confidencial, calculadora de rentabilidad, asesoría de 30 minutos y guías gratuitas actualizadas a la normativa vigente. Solo normativa española. Contenido informativo, no asesoramiento jurídico personalizado.

Productos (pago único, entrega en Word): contrato de larga duración 5,99 €, contrato de habitación 9,99 €, contrato de temporada 9,99 €, Kit Impago + MASC 29 €. Asesoría por videollamada: 20 € / 30 min.

## Páginas principales

${statics.map(p => line(p, p.label)).join("\n")}

## Modelos por situación

${casos.map(p => line(p)).join("\n")}

## Guías del blog (más recientes primero)

${posts.map(p => line(p)).join("\n")}

## Legal

${legal.map(f => `- [${cleanTitle(meta(read(f), /<title>([^<]+)<\/title>/)) || f}](${DOMAIN}/${f})`).join("\n")}

## Optional

- [Sitemap](${DOMAIN}/sitemap.xml)
- [robots.txt](${DOMAIN}/robots.txt)
`;

fs.writeFileSync(path.join(root, "llms.txt"), out);
console.log(`llms.txt: ${statics.length} páginas, ${casos.length} modelos, ${posts.length} guías.`);
