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
  ["index.html", "Inicio: herramientas y documentos legales para empresas"], ["herramientas/index.html", "Herramientas legales gratis"], ["herramientas/revisar-contrato.html", "Revisor de contratos con IA (gratis)"], ["herramientas/traductor-legal.html", "Traductor de textos legales a lenguaje claro (gratis)"], ["herramientas/generador-politica-privacidad.html", "Generador de política de privacidad (gratis)"], ["herramientas/generador-aviso-legal.html", "Generador de aviso legal (gratis)"], ["herramientas/generador-politica-cookies.html", "Generador de política de cookies (gratis)"], ["alquiler.html", "Documentos legales para propietarios (alquiler)"], ["documentos.html", "Catálogo de documentos"], ["generador.html", "Generador de documentos (pago único)"],
  ["calculadora-rentabilidad-alquiler.html", "Calculadora de rentabilidad del alquiler"],
  ["sobre.html", "Quién está detrás de Asesorfy y cómo se revisan los documentos"],
].filter(([f]) => fs.existsSync(path.join(root, f))).map(([f, label]) => ({ ...page(f), label }));

const casos = fs.existsSync(path.join(root, "casos")) ? fs.readdirSync(path.join(root, "casos")).filter(f => f.endsWith(".html")).sort().map(f => page(`casos/${f}`)) : [];
const posts = fs.readdirSync(root).filter(f => /^blog-.*\.html$/.test(f)).map(page)
  .sort((a, b) => (b.date || "0000").localeCompare(a.date || "0000") || a.file.localeCompare(b.file));
const legal = ["aviso-legal.html", "privacidad.html", "condiciones.html", "cookies.html"].filter(f => fs.existsSync(path.join(root, f)));

const url = (f) => f === "index.html" ? `${DOMAIN}/` : f === "herramientas/index.html" ? `${DOMAIN}/herramientas` : f.startsWith("herramientas/") ? `${DOMAIN}/${f.replace(/\.html$/, "")}` : `${DOMAIN}/${f}`;
const line = (p, label) => `- [${label || p.title}](${url(p.file)})${p.description ? `: ${p.description}` : ""}${p.date ? ` (${p.date})` : ""}`;

const out = `# Asesorfy

> Herramientas y documentos legales para empresas, autónomos, propietarios y particulares en España. Herramientas gratis y sin registro: revisor de contratos con IA, traductor de textos legales a lenguaje claro y generadores de política de privacidad, aviso legal y política de cookies. Documentos de pago único redactados sobre el Código Civil, la Ley de Arrendamientos Urbanos (LAU), la Ley 12/2023 de Vivienda, la Ley Orgánica 1/2025 (MASC) y la Ley 3/2004 de morosidad: contratos de alquiler de vivienda habitual, habitación y temporada, y Kit Impago con Oferta Vinculante Confidencial para alquileres y para facturas. Calculadora de rentabilidad del alquiler y guías gratuitas. Solo normativa española. Contenido informativo, no asesoramiento jurídico personalizado: no hay un abogado detrás.

Productos (pago único, IVA incluido, entrega en Word y PDF): contrato de alquiler de vivienda habitual gratis a cambio del email, contrato de habitación 9,99 €, contrato de temporada 9,99 €, Kit Impago alquiler + MASC 49 €, Kit Impago facturas + MASC 49 €. Precios al día en ${DOMAIN}/pricing.md.

## Páginas principales

${statics.map(p => line(p, p.label)).join("\n")}

## Modelos por situación

${casos.map(p => line(p)).join("\n")}

## Guías del blog (más recientes primero)

${posts.map(p => line(p)).join("\n")}

## Legal

${legal.map(f => `- [${cleanTitle(meta(read(f), /<title>([^<]+)<\/title>/)) || f}](${DOMAIN}/${f})`).join("\n")}

## Optional

- [Precios en texto plano](${DOMAIN}/pricing.md)
- [Sitemap](${DOMAIN}/sitemap.xml)
- [robots.txt](${DOMAIN}/robots.txt)
`;

fs.writeFileSync(path.join(root, "llms.txt"), out);
console.log(`llms.txt: ${statics.length} páginas, ${casos.length} modelos, ${posts.length} guías.`);
