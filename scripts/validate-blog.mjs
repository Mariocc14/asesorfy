/* Valida un artículo nuevo del blog de Asesorfy antes de publicarlo. Sin dependencias.
   Uso: node scripts/validate-blog.mjs <raíz del árbol> blog-<slug>.html
   Comprueba SEO clásico (meta, canonical, enlaces, sitemap) y estructura AEO/GEO
   (respuesta corta, tablas, FAQ espejo en JSON-LD, fuentes oficiales, fechas). */
import fs from "node:fs";
import path from "node:path";

const [root, rel] = process.argv.slice(2);
if (!root || !rel) { console.error("uso: validate-blog.mjs <raíz> blog-<slug>.html"); process.exit(2); }
if (!/^blog-[a-z0-9-]+\.html$/.test(rel)) { console.error(`nombre de fichero no válido: ${rel} (blog-<slug-sin-acentos>.html)`); process.exit(1); }

const DOMAIN = "https://asesorfy.app";
const file = path.join(root, rel);
const html = fs.readFileSync(file, "utf8");
const errors = [];
const match = (re) => html.match(re)?.[1]?.trim();
const count = (re) => (html.match(re) || []).length;
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<[^>]+>/g, "").trim();

const title = match(/<title>([^<]+)<\/title>/);
const description = match(/<meta name="description" content="([^"]+)">/);
const canonical = match(/<link rel="canonical" href="([^"]+)">/);
const ogUrl = match(/<meta property="og:url" content="([^"]+)">/);
const published = match(/<meta property="article:published_time" content="([^"]+)">/);
const modified = match(/<meta property="article:modified_time" content="([^"]+)">/);

if (!title) errors.push("falta <title>");
else if (title.length < 40 || title.length > 75) errors.push(`title de ${title.length} caracteres (debe estar entre 40 y 75)`);
if (!description) errors.push("falta meta description");
else if (description.length < 120 || description.length > 170) errors.push(`description de ${description.length} caracteres (debe estar entre 120 y 170)`);
if (canonical !== `${DOMAIN}/${rel}`) errors.push(`canonical incorrecto: ${canonical} (debe ser ${DOMAIN}/${rel})`);
if (ogUrl !== canonical) errors.push("og:url no coincide con canonical");
if (!/^\d{4}-\d{2}-\d{2}$/.test(published || "")) errors.push("falta article:published_time con formato AAAA-MM-DD");
if (!/^\d{4}-\d{2}-\d{2}$/.test(modified || "")) errors.push("falta article:modified_time con formato AAAA-MM-DD");
if (!html.includes('<html lang="es">')) errors.push("falta lang=es");
if (!html.includes('<meta name="author" content="Asesorfy">')) errors.push("falta meta author");
if (!html.includes("/posthog-analytics.js")) errors.push("falta el script de PostHog");
if (!html.includes("/_vercel/insights/script.js")) errors.push("falta Vercel insights");
if (!html.includes('href="/brand.css"')) errors.push("falta brand.css");
if (!html.includes('data-asesoria-banner')) errors.push("falta el banner de asesoría");
if (!html.includes('<p class="lead">')) errors.push("falta el párrafo .lead");
if (!/<div class="note"><strong>Respuesta corta:<\/strong>/.test(html)) errors.push('falta el bloque <div class="note"><strong>Respuesta corta:</strong> …');
if (!/<div class="meta">Publicado y revisado el /.test(html)) errors.push('falta <div class="meta">Publicado y revisado el …');
if (!html.includes('<div class="cta">')) errors.push("falta el bloque .cta");
if (!html.includes('<h2>Preguntas frecuentes</h2>')) errors.push("falta la sección Preguntas frecuentes");
if (!html.includes('<h2>Fuentes oficiales consultadas</h2>')) errors.push("falta la sección Fuentes oficiales consultadas");
if (!html.includes('<ul class="sources">')) errors.push("falta <ul class=\"sources\">");
if (!html.includes('<div class="related">')) errors.push("falta el bloque .related");
if (!html.includes('<p class="disc">')) errors.push("falta el aviso final .disc");
if (!/<\/html>\s*$/.test(html)) errors.push("el HTML no termina en </html>");
if (/<figure\b/.test(html)) errors.push("no se permiten <figure>");
if (count(/<img\b/g) > 1) errors.push("solo se permite la imagen de la marca en la cabecera");
if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(html)) errors.push("hay emojis");
if (/no es [^.]{3,40}, es /i.test(html.replace(/<[^>]+>/g, " "))) errors.push('hay una construcción "no es X, es Y"');

const h2 = count(/<h2>/g);
if (h2 < 7) errors.push(`solo ${h2} secciones <h2> (mínimo 7 incluyendo FAQ y fuentes)`);
const faqBlock = html.split('<h2>Preguntas frecuentes</h2>')[1]?.split('<h2>')[0] || "";
const faqNames = [...faqBlock.matchAll(/<h3>(¿[^<]+)<\/h3>/g)].map(m => decode(m[1]));
if (faqNames.length < 5) errors.push(`solo ${faqNames.length} preguntas frecuentes (mínimo 5)`);

const tables = html.match(/<table class="rules">[\s\S]*?<\/table>/g) || [];
if (tables.length < 2) errors.push(`solo ${tables.length} tablas .rules (mínimo 2)`);
for (const [i, t] of tables.entries()) {
  const rows = (t.match(/<tr>[\s\S]*?<\/tr>/g) || []).map(r => (r.match(/<t[hd]\b/g) || []).length);
  if (!t.includes("<thead>")) errors.push(`tabla ${i + 1} sin <thead>`);
  if (rows.length < 3) errors.push(`tabla ${i + 1} con menos de 2 filas de datos`);
  if (new Set(rows).size > 1) errors.push(`tabla ${i + 1} con filas de distinto número de columnas`);
}
if (!/<div class="table-wrap"><table class="rules">/.test(html) && tables.length) errors.push("las tablas deben ir dentro de <div class=\"table-wrap\">");

const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, " ");
const words = text.split(/\s+/).filter(Boolean).length;
if (words < 1500) errors.push(`solo ${words} palabras de texto (mínimo 1.500)`);
if (words > 3200) errors.push(`${words} palabras: demasiado largo (máximo 3.200)`);

try {
  const ld = JSON.parse(match(/<script type="application\/ld\+json">([\s\S]+?)<\/script>/) || "null");
  const graph = ld?.["@graph"] || [];
  const article = graph.find(n => n["@type"] === "Article");
  const faq = graph.find(n => n["@type"] === "FAQPage");
  if (!article) errors.push("JSON-LD sin Article dentro de @graph");
  else {
    if (article.url !== canonical) errors.push("JSON-LD Article.url no coincide con canonical");
    if (article.mainEntityOfPage !== canonical) errors.push("JSON-LD Article.mainEntityOfPage no coincide con canonical");
    if (article.datePublished !== published) errors.push("JSON-LD datePublished no coincide con article:published_time");
    if (article.dateModified !== modified) errors.push("JSON-LD dateModified no coincide con article:modified_time");
    if (article.inLanguage !== "es-ES") errors.push("JSON-LD Article.inLanguage debe ser es-ES");
    if (article.author?.name !== "Asesorfy" || article.publisher?.name !== "Asesorfy") errors.push("JSON-LD author/publisher deben ser Asesorfy");
  }
  if (!faq) errors.push("JSON-LD sin FAQPage");
  else {
    const names = (faq.mainEntity || []).map(q => q.name?.trim());
    if (names.length !== faqNames.length) errors.push(`FAQPage tiene ${names.length} preguntas y el HTML ${faqNames.length}`);
    for (const n of names) if (!faqNames.includes(n)) errors.push(`pregunta del FAQPage que no está en el HTML: ${n}`);
    for (const q of faq.mainEntity || []) if (!q.acceptedAnswer?.text || q.acceptedAnswer.text.length < 40) errors.push(`respuesta demasiado corta en FAQPage: ${q.name}`);
  }
} catch { errors.push("JSON-LD inválido (JSON mal formado)"); }

// Enlaces internos: cualquier href relativo debe apuntar a un fichero real del sitio.
const internalHrefs = [...html.matchAll(/href="([^"#:?]+)(?:[#?][^"]*)?"/g)].map(m => m[1]).filter(h => !h.startsWith("http") && !h.startsWith("/") && !h.startsWith("mailto"));
for (const h of new Set(internalHrefs)) {
  if (!fs.existsSync(path.join(root, h))) errors.push(`enlace interno roto: ${h}`);
}
const blogLinks = new Set(internalHrefs.filter(h => /^blog-.*\.html$/.test(h) && h !== rel));
if (blogLinks.size < 3) errors.push(`solo ${blogLinks.size} enlaces a otros artículos (mínimo 3 distintos)`);
if (!internalHrefs.some(h => /^(generador\.html|documentos\.html|casos\/.*\.html|asesoria\.html)$/.test(h))) errors.push("no enlaza a ningún producto (generador.html, documentos.html, casos/ o asesoria.html)");
const bodyCta = html.split('<div class="cta">')[1] || "";
if (!/href="(generador\.html(#[a-z-]+)?|documentos\.html|casos\/[a-z0-9-]+\.html|asesoria\.html)"/.test(bodyCta)) errors.push("el .cta debe enlazar a un producto o a la asesoría");

const OFFICIAL = /(boe\.es|ine\.es|agenciatributaria\.gob\.es|sede\.agenciatributaria\.gob\.es|mivau\.gob\.es|mjusticia\.gob\.es|poderjudicial\.es|aepd\.es|registradores\.org|notariado\.org|seg-social\.es|europa\.eu|catastro\.|lamoncloa\.gob\.es|\.gob\.es|\.gencat\.cat|comunidad\.madrid|juntadeandalucia\.es|gva\.es|euskadi\.eus|xunta\.gal|navarra\.es|aragon\.es|castillalamancha\.es|jcyl\.es|carm\.es|caib\.es|gobiernodecanarias\.org|asturias\.es|cantabria\.es|larioja\.org|juntaex\.es|ceuta\.es|melilla\.es)/;
// Solo cuentan los enlaces <a> (no <link> de fuentes ni scripts).
const anchors = [...html.matchAll(/<a\s[^>]*href="(https?:\/\/(?!asesorfy\.app)[^"]+)"[^>]*>/g)];
const external = anchors.map(m => m[1]);
if (new Set(external).size < 2) errors.push(`solo ${new Set(external).size} enlaces externos (mínimo 2)`);
if (!external.some(u => OFFICIAL.test(u))) errors.push("ninguna fuente externa es oficial (BOE, INE, AEAT, ministerios, CGPJ, CCAA…)");
const sourcesBlock = html.split('<ul class="sources">')[1]?.split('</ul>')[0] || "";
if ((sourcesBlock.match(/<li>/g) || []).length < 2) errors.push("la sección de fuentes necesita al menos 2 entradas");
for (const m of anchors) if (!/rel="noopener/.test(m[0])) errors.push(`enlace externo sin rel="noopener": ${m[1]}`);

const index = fs.readFileSync(path.join(root, "blog.html"), "utf8");
const postsStart = index.indexOf('<div class="posts">');
if (!index.includes(`href="${rel}"`)) errors.push("blog.html no enlaza el artículo");
else if (postsStart < 0 || index.indexOf(`href="${rel}"`) !== index.indexOf('<a class="post" href="', postsStart) + '<a class="post" '.length) errors.push("el artículo no es la primera tarjeta de blog.html");
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
if (!sitemap.includes(`<loc>${DOMAIN}/${rel}</loc>`)) errors.push("sitemap.xml no contiene el artículo");
if (!sitemap.includes(`<loc>${DOMAIN}/blog.html</loc><lastmod>${published}</lastmod>`)) errors.push("sitemap.xml: el lastmod de blog.html debe ser la fecha de publicación");
const plan = fs.readFileSync(path.join(root, "plan-editorial-seo.md"), "utf8");
if (!plan.includes(rel)) errors.push("plan-editorial-seo.md no registra el artículo en el log");
const llms = fs.existsSync(path.join(root, "llms.txt")) ? fs.readFileSync(path.join(root, "llms.txt"), "utf8") : "";
if (!llms.includes(`${DOMAIN}/${rel}`)) errors.push("llms.txt no contiene el artículo (ejecuta scripts/build-llms.mjs)");
const queue = fs.existsSync(path.join(root, "editorial/topic-queue.json")) ? JSON.parse(fs.readFileSync(path.join(root, "editorial/topic-queue.json"), "utf8")) : [];
if (!queue.some(t => t.slug === rel)) errors.push("editorial/topic-queue.json: ningún tema marcado como publicado con este slug");
if (queue.filter(t => t.status === "pending").length < 5) errors.push("editorial/topic-queue.json: quedan menos de 5 temas pendientes; añade más");

if (errors.length) { console.error(errors.map(e => `${rel}: ${e}`).join("\n")); process.exit(1); }
console.log(`Artículo válido: ${rel} (${words} palabras, ${tables.length} tablas, ${faqNames.length} FAQ, ${h2} secciones, ${blogLinks.size} enlaces internos, ${new Set(external).size} externos).`);
