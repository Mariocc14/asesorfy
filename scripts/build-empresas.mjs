/* Genera la home de empresas (index.html) y las herramientas gratis (herramientas/*.html).
   Uso: node scripts/build-empresas.mjs
   La home anterior de alquiler vive ahora en alquiler.html (no la genera este script).
   Edita los textos aquí y vuelve a ejecutarlo; no edites a mano los HTML generados. */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DOMAIN = "https://asesorfy.app";
const V = "20261113";
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");
const write = (f, s) => { fs.mkdirSync(path.dirname(path.join(root, f)), { recursive: true }); fs.writeFileSync(path.join(root, f), s); };
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const unesc = (s) => String(s ?? "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const meta = (html, re) => unesc(html.match(re)?.[1] || "").trim();

const ICON = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
  tool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h16M6 16l9.5-9.5a2.1 2.1 0 0 1 3 3L9 19H6z"/></svg>',
  t_revisar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4"/><path d="M13 3v5h5v3"/><circle cx="16.5" cy="16.5" r="3"/><path d="M21 21l-2.3-2.3"/></svg>',
  t_traducir: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h9M8.5 3v2M6 5c.5 3 2.5 5.5 5.5 7M11 5c-.8 3.5-3 6.5-6.5 8"/><path d="M13 21l4-9 4 9M14.5 18h5"/></svg>',
  t_privacidad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  t_aviso: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18M7 21h10M5 7h14M5 7l-2.5 6a2.5 2.5 0 0 0 5 0zM19 7l-2.5 6a2.5 2.5 0 0 0 5 0z"/></svg>',
  t_cookies: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.5A9 9 0 1 1 11.5 3a3 3 0 0 0 3.5 3.5 3 3 0 0 0 3.5 3.5 3 3 0 0 0 2.5 2.5z"/><path d="M8.5 9.5h.01M12 15h.01M8 15.5h.01M16 15h.01"/></svg>',
  guide: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/></svg>',
};

/* ---------- Herramientas ---------- */
const TOOLS = [
  { slug: "revisar-contrato", ic: "t_revisar", name: "Revisor de contratos", short: "Revisar un contrato",
    line: "Pega un contrato y descubre qué cláusulas te pueden perjudicar, qué falta y qué preguntar antes de firmar.",
    kw: "revisar contrato clausulas abusivas firmar analizar contrato ia inteligencia artificial servicios proveedor laboral freelance nda confidencialidad compraventa arrendamiento local" },
  { slug: "traductor-legal", ic: "t_traducir", name: "Traductor legal", short: "Entender un texto legal",
    line: "Condiciones, cláusulas o cartas oficiales explicadas parte por parte, en lenguaje claro.",
    kw: "traducir texto legal lenguaje claro entender clausula explicar contrato condiciones generales carta hacienda notificacion jerga juridica" },
  { slug: "generador-politica-privacidad", ic: "t_privacidad", name: "Generador de política de privacidad", short: "Política de privacidad",
    line: "Una política de privacidad para tu web adaptada al RGPD y a la LOPDGDD, lista para copiar.",
    kw: "politica de privacidad rgpd lopd lopdgdd proteccion de datos web texto legal generador gratis formulario newsletter" },
  { slug: "generador-aviso-legal", ic: "t_aviso", name: "Generador de aviso legal", short: "Aviso legal",
    line: "El aviso legal que exige la LSSI para cualquier web de empresa o autónomo, en un minuto.",
    kw: "aviso legal lssi web empresa autonomo datos titular generador gratis texto legal pagina" },
  { slug: "generador-politica-cookies", ic: "t_cookies", name: "Generador de política de cookies", short: "Política de cookies",
    line: "Tu política de cookies con la tabla de cookies de Google Analytics, Meta y compañía, según la guía de la AEPD.",
    kw: "politica de cookies banner aepd google analytics meta pixel lssi generador gratis consentimiento" },
];
const toolUrl = (t) => `/herramientas/${t.slug}`;

/* ---------- Índice del buscador ---------- */
function searchIndex() {
  const items = TOOLS.map((t) => ({ t: t.name, d: t.line, u: toolUrl(t), k: t.kw, g: "tool", i: t.ic }));
  const docs = [
    ["Contrato de alquiler de vivienda (gratis)", "Contrato de larga duración conforme a la LAU, actualizado a 2026.", "/generador.html#contrato-larga", "contrato alquiler vivienda habitual larga duracion lau modelo"],
    ["Kit Impago facturas + MASC", "El escrito obligatorio antes de reclamar en el juzgado a un cliente que no paga sus facturas.", "/generador.html#ovc-deuda", "impago factura facturas cliente no paga deuda cobrar reclamar moroso masc oferta vinculante burofax morosidad"],
    ["Kit Impago alquiler + MASC", "El escrito obligatorio antes de reclamar un impago de alquiler en el juzgado.", "/generador.html#ovc-impago", "impago inquilino no paga desahucio masc oferta vinculante burofax alquiler renta"],
    ["Contrato de alquiler de habitación", "Para alquilar por habitaciones con el régimen legal correcto.", "/generador.html#contrato-habitacion", "habitacion piso compartido contrato alquiler"],
    ["Contrato de alquiler de temporada", "Alquiler por temporada con su causa bien justificada.", "/generador.html#contrato-temporada", "temporada estudiantes trabajo contrato alquiler"],
    ["Calculadora de rentabilidad del alquiler", "Calcula la rentabilidad bruta y neta de un piso alquilado.", "/calculadora-rentabilidad-alquiler.html", "rentabilidad calculadora alquiler inversion piso"],
  ].map(([t, d, u, k]) => ({ t, d, u, k, g: "doc" }));
  const posts = fs.readdirSync(root).filter((f) => /^blog-.*\.html$/.test(f)).map((f) => {
    const html = read(f);
    return { t: meta(html, /<title>([^<]+)<\/title>/).replace(/\s*[|·—-]\s*Asesorfy.*$/i, ""), d: meta(html, /<meta name="description" content="([^"]+)"/), u: "/" + f, k: "", g: "guide" };
  }).filter((p) => p.t);
  return [...items, ...docs, ...posts];
}

/* ---------- Piezas comunes ---------- */
const COOKIE_BANNER = `<div id="ck-banner" style="position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#0e1a2b;color:#dbe3ee;font-family:'Inter',system-ui,sans-serif;font-size:13.5px;padding:14px 18px;display:none;gap:14px;align-items:center;justify-content:center;flex-wrap:wrap;box-shadow:0 -6px 20px rgba(0,0,0,.25)"><span style="max-width:680px">Usamos cookies propias y de terceros (analítica y Stripe) para el funcionamiento del sitio y procesar pagos. <a href="/cookies.html" style="color:#9fc1e8">Más información sobre cookies</a>.</span><span style="display:flex;gap:8px"><button onclick="ckSet(0)" style="background:transparent;border:1px solid #3a4a60;color:#cdd8e6;padding:8px 14px;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px">Rechazar</button><button onclick="ckSet(1)" style="background:#1f5fa6;border:none;color:#fff;padding:8px 16px;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px">Aceptar</button></span></div><script>function ckSet(v){try{localStorage.setItem('asesorfy_cookies',v?'accepted':'rejected');}catch(e){}var b=document.getElementById('ck-banner');if(b)b.style.display='none';}(function(){try{if(!localStorage.getItem('asesorfy_cookies')){var b=document.getElementById('ck-banner');if(b)b.style.display='flex';}}catch(e){}})();</script>`;

function head({ title, desc, url, jsonld = [], extra = "" }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${DOMAIN}${url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="Asesorfy">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${DOMAIN}${url}">
<meta property="og:image" content="${DOMAIN}/assets/og-asesorfy.jpg">
<meta name="twitter:card" content="summary_large_image">
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n")}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/brand.css?v=${V}">
<link rel="stylesheet" href="/assets/site.css?v=${V}">
<link rel="icon" href="/assets/asesorfy-mark.svg" type="image/svg+xml">
${extra}
<script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>
<script defer src="/_vercel/insights/script.js"></script>
<script defer src="/posthog-analytics.js"></script>
<script defer src="/newsletter.js"></script>
</head>`;
}

function header(active) {
  const link = (href, label, key) => `<a href="${href}"${active === key ? ' aria-current="page"' : ""}>${label}</a>`;
  return `<header class="top">
  <div class="wrap bar">
    <a href="/" class="brand" aria-label="Asesorfy, inicio"><img class="brand-mark" src="/assets/asesorfy-mark.svg" alt="" width="32" height="32"><span class="brand-name">Asesor<span class="brand-accent">fy</span></span></a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav" aria-label="Abrir el menú">${ICON.menu}</button>
    <nav class="links" id="nav" aria-label="Principal">
      ${link("/herramientas", "Herramientas", "tools")}
      ${link("/documentos.html", "Documentos", "docs")}
      ${link("/alquiler.html", "Alquiler", "rent")}
      ${link("/blog.html", "Guías", "blog")}
      ${link("/sobre.html", "Sobre Asesorfy", "about")}
      <a class="btn sm" href="/herramientas/revisar-contrato" data-cta="nav">Revisar un contrato</a>
    </nav>
  </div>
</header>`;
}

function footer() {
  return `<footer class="foot">
  <div class="wrap">
    <div class="cols">
      <div>
        <a href="/" class="brand"><img class="brand-mark" src="/assets/asesorfy-mark.svg" alt="" width="32" height="32"><span class="brand-name">Asesor<span class="brand-accent">fy</span></span></a>
        <p>Herramientas y documentos legales para empresas, autónomos y particulares en España. Información clara, no asesoramiento jurídico.</p>
      </div>
      <div><h4>Herramientas</h4><ul>${TOOLS.map((t) => `<li><a href="${toolUrl(t)}">${t.short}</a></li>`).join("")}</ul></div>
      <div><h4>Documentos</h4><ul><li><a href="/generador.html#ovc-deuda">Kit Impago facturas</a></li><li><a href="/generador.html#ovc-impago">Kit Impago alquiler</a></li><li><a href="/generador.html#contrato-larga">Contrato de alquiler gratis</a></li><li><a href="/documentos.html">Todos los documentos</a></li></ul></div>
      <div><h4>Asesorfy</h4><ul><li><a href="/blog.html">Guías</a></li><li><a href="/sobre.html">Quién está detrás</a></li><li><a href="/#contacto">Contacto</a></li><li><a href="mailto:hola@asesorfy.app">hola@asesorfy.app</a></li></ul></div>
    </div>
    <div class="legal"><span>© ${new Date().getFullYear()} Asesorfy · Información orientativa, no asesoramiento jurídico</span><a href="/aviso-legal.html">Aviso legal</a><a href="/privacidad.html">Privacidad</a><a href="/condiciones.html">Condiciones</a><a href="/cookies.html">Cookies</a></div>
  </div>
</footer>
${COOKIE_BANNER}`;
}

const page = (h, body, scripts = "") => `${h}
<body>
<a href="#main" class="skip">Saltar al contenido</a>
${body}
<script src="/herramientas/herramientas.js?v=${V}" defer></script>
${scripts}
</body>
</html>
`;

const faqLd = (faq) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
const appLd = (t, url) => ({ "@context": "https://schema.org", "@type": "WebApplication", name: t.name, url: DOMAIN + url, applicationCategory: "BusinessApplication", operatingSystem: "Web", inLanguage: "es-ES", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }, publisher: { "@id": `${DOMAIN}/#organization` } });
const crumbLd = (name, url) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
  { "@type": "ListItem", position: 1, name: "Inicio", item: DOMAIN + "/" },
  { "@type": "ListItem", position: 2, name: "Herramientas", item: DOMAIN + "/herramientas" },
  ...(url ? [{ "@type": "ListItem", position: 3, name, item: DOMAIN + url }] : []) ] });

const facts = (list) => `<div class="facts">${list.map((f) => `<span>${ICON.check}${f}</span>`).join("")}</div>`;
const faqHtml = (faq) => `<div class="faq">${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>`;
const related = (slug) => `<div class="related">${TOOLS.filter((t) => t.slug !== slug).slice(0, 3).map((t) => `<a href="${toolUrl(t)}"><b>${t.name}</b><span>${t.line}</span></a>`).join("")}</div>`;
const nlBox = (source, text) => `<form class="lock" data-newsletter="${source}" style="margin-top:18px">
  <h3>¿Te avisamos si cambia la ley?</h3>
  <p>${text}</p>
  <div class="inline"><label class="field" style="margin:0;flex:1"><span class="hp">Email</span><input type="email" name="email" placeholder="tu@empresa.com" autocomplete="email" required></label><button class="btn" type="submit">Avisarme</button></div>
  <label class="consent" style="margin-top:10px"><input type="checkbox" name="consent" required><span>Acepto recibir avisos de cambios legales y novedades de Asesorfy. Puedo darme de baja cuando quiera (<a href="/privacidad.html">privacidad</a>).</span></label>
  <input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
  <p data-nl-msg style="display:none;margin:4px 0 0"></p>
</form>`;

/* ---------- Página de herramienta: generadores ---------- */
const HOLDER = `<fieldset>
  <legend>Titular de la web</legend>
  <div class="seg" role="radiogroup" aria-label="Tipo de titular"><label><input type="radio" name="tipo" value="autonomo" checked><span>Autónomo</span></label><label><input type="radio" name="tipo" value="sociedad"><span>Empresa (S.L., S.A.)</span></label></div>
  <label class="field"><span>Nombre o razón social</span><input name="nombre" autocomplete="organization" placeholder="Ej.: Talleres Martín, S.L."></label>
  <div class="row2"><label class="field"><span>NIF o CIF</span><input name="nif" placeholder="B12345678"></label><label class="field"><span>Nombre comercial <small>(opcional)</small></span><input name="comercial" placeholder="Talleres Martín"></label></div>
  <label class="field"><span>Domicilio</span><input name="domicilio" autocomplete="street-address" placeholder="Calle, número, código postal y ciudad"></label>
  <div class="row2"><label class="field"><span>Email de contacto</span><input name="email" type="email" autocomplete="email" placeholder="hola@tuempresa.com"></label><label class="field"><span>Teléfono <small>(opcional)</small></span><input name="telefono" type="tel" autocomplete="tel"></label></div>
  <label class="field"><span>Dirección de la web</span><input name="web" inputmode="url" placeholder="tuempresa.com"></label>
  <label class="field" data-only="sociedad" hidden><span>Datos del Registro Mercantil <small>(opcional)</small></span><input name="registro" placeholder="Registro Mercantil de Córdoba, tomo 1234, folio 56, hoja CO-7890"></label>
</fieldset>`;

const GEN = {
  "generador-politica-privacidad": {
    gen: "privacidad", file: "politica-de-privacidad",
    title: "Generador de política de privacidad gratis (RGPD) | Asesorfy",
    desc: "Crea gratis la política de privacidad de tu web, adaptada al RGPD y a la LOPDGDD. Rellena el formulario y cópiala al momento. Sin registro.",
    h1: "Generador de política de privacidad",
    lede: "Rellena los datos de tu negocio y marca para qué usas los datos de tus visitantes. La política se escribe sola a la derecha, adaptada al RGPD y a la LOPDGDD.",
    form: `${HOLDER}
<fieldset>
  <legend>Qué datos recoge tu web</legend>
  <div class="checks">
    <label class="check"><input type="checkbox" name="usos" value="contacto" checked><span>Formulario de contacto<small>o email y teléfono</small></span></label>
    <label class="check"><input type="checkbox" name="usos" value="clientes"><span>Clientes y pedidos<small>tienda online, contratos, facturas</small></span></label>
    <label class="check"><input type="checkbox" name="usos" value="newsletter"><span>Newsletter<small>o emails comerciales</small></span></label>
    <label class="check"><input type="checkbox" name="usos" value="cuenta"><span>Cuentas de usuario<small>registro e inicio de sesión</small></span></label>
    <label class="check"><input type="checkbox" name="usos" value="analitica"><span>Analítica<small>Google Analytics, PostHog…</small></span></label>
    <label class="check"><input type="checkbox" name="usos" value="publicidad"><span>Publicidad<small>píxel de Meta, Google Ads…</small></span></label>
    <label class="check"><input type="checkbox" name="usos" value="empleo"><span>Currículums<small>ofertas de empleo</small></span></label>
    <label class="check"><input type="checkbox" name="usos" value="redes"><span>Redes sociales<small>perfiles de la empresa</small></span></label>
  </div>
  <label class="field"><span>Proveedores que tratan datos <small>(opcional, uno por línea)</small></span><textarea name="proveedores" rows="3" placeholder="Alojamiento web: Hostinger&#10;Email marketing: Brevo&#10;Pagos: Stripe"></textarea></label>
  <label class="check" style="margin-bottom:14px"><input type="checkbox" name="internacional"><span>Algún proveedor está fuera de la UE<small>por ejemplo, Google, Meta o Mailchimp</small></span></label>
  <label class="field"><span>Delegado de protección de datos <small>(solo si lo tienes)</small></span><input name="dpo" placeholder="dpo@tuempresa.com"></label>
</fieldset>`,
    faq: [
      ["¿Es obligatoria la política de privacidad en mi web?", "Sí, si tu web recoge datos personales de cualquier forma: un formulario de contacto, una newsletter, una tienda o cookies de analítica. El RGPD obliga a informar de quién trata los datos, para qué, con qué base legal, cuánto tiempo y qué derechos tiene la persona."],
      ["¿Este generador sirve para el RGPD y la LOPDGDD?", "Sí. El texto sigue la información que exige el artículo 13 del RGPD y las particularidades de la ley española (LOPDGDD), como la edad mínima de 14 años para consentir. Revísalo y adáptalo si tu actividad tiene tratamientos especiales, como datos de salud."],
      ["¿Dónde pongo la política de privacidad?", "En una página propia, enlazada desde el pie de la web y junto a cada formulario que recoja datos, con una casilla para que la persona confirme que la ha leído."],
      ["¿Guardáis los datos que escribo en el formulario?", "No. El texto se genera en tu navegador y los datos no se envían a ningún servidor."],
      ["¿Necesito también un aviso legal y una política de cookies?", "Casi siempre. Toda web de empresa o autónomo necesita un aviso legal (LSSI) y, si usa cookies que no son técnicas, una política de cookies y un aviso para aceptarlas o rechazarlas. Tienes los dos generadores aquí mismo."],
    ],
    nl: "Te escribimos solo si un cambio legal obliga a actualizar tu política de privacidad.",
  },
  "generador-aviso-legal": {
    gen: "avisoLegal", file: "aviso-legal",
    title: "Generador de aviso legal gratis para tu web (LSSI)",
    desc: "Crea gratis el aviso legal de tu web según el artículo 10 de la LSSI, para empresas y autónomos. Rellena tus datos y cópialo al momento.",
    h1: "Generador de aviso legal",
    lede: "Toda web de empresa o autónomo debe identificar a su titular (artículo 10 de la LSSI). Rellena tus datos y el aviso legal se escribe solo, listo para copiar.",
    form: `${HOLDER}
<fieldset>
  <legend>Tu actividad</legend>
  <label class="field"><span>A qué te dedicas <small>(opcional)</small></span><input name="actividad" placeholder="Ej.: ofrece servicios de reparación de vehículos"></label>
  <label class="field"><span>Profesión regulada <small>(solo si aplica)</small></span><input name="colegio" placeholder="Ej.: Arquitecto, colegiado n.º 123 del Colegio de Arquitectos de Córdoba"></label>
  <label class="field"><span>Autorización administrativa <small>(solo si aplica)</small></span><input name="autorizacion" placeholder="Ej.: agencia de viajes con licencia AV-0000"></label>
</fieldset>`,
    faq: [
      ["¿Es obligatorio el aviso legal?", "Sí, para cualquier web que tenga una actividad económica, aunque no venda online. El artículo 10 de la LSSI obliga a mostrar el nombre del titular, su NIF, su domicilio, un email de contacto y, si es una sociedad, sus datos registrales."],
      ["¿Qué pasa si mi web no tiene aviso legal?", "La LSSI prevé multas por no facilitar la información obligatoria. Además, transmite poca confianza a clientes y proveedores."],
      ["¿Un autónomo tiene que poner su domicilio?", "Sí, la LSSI pide un domicilio. Si trabajas desde casa, puedes usar la dirección de una oficina o un espacio de trabajo donde puedas recibir notificaciones."],
      ["¿Guardáis los datos que escribo?", "No. El texto se genera en tu navegador y no se envía a ningún servidor."],
    ],
    nl: "Te escribimos solo si cambia algo que obligue a actualizar tus textos legales.",
  },
  "generador-politica-cookies": {
    gen: "cookies", file: "politica-de-cookies",
    title: "Generador de política de cookies gratis (guía AEPD)",
    desc: "Crea gratis la política de cookies de tu web con la tabla de cookies de Google Analytics, Meta, Hotjar y más, según la guía de la AEPD.",
    h1: "Generador de política de cookies",
    lede: "Marca las herramientas que usa tu web y obtén la política de cookies con su tabla de cookies, según el artículo 22.2 de la LSSI y la guía de la AEPD.",
    form: `${HOLDER.replace('<legend>Titular de la web</legend>', '<legend>Titular de la web</legend>')}
<fieldset>
  <legend>Qué herramientas usa tu web</legend>
  <div class="checks">
    <label class="check"><input type="checkbox" name="cookies" value="ga"><span>Google Analytics</span></label>
    <label class="check"><input type="checkbox" name="cookies" value="posthog"><span>PostHog</span></label>
    <label class="check"><input type="checkbox" name="cookies" value="hotjar"><span>Hotjar</span></label>
    <label class="check"><input type="checkbox" name="cookies" value="clarity"><span>Microsoft Clarity</span></label>
    <label class="check"><input type="checkbox" name="cookies" value="meta"><span>Píxel de Meta</span></label>
    <label class="check"><input type="checkbox" name="cookies" value="gads"><span>Google Ads</span></label>
    <label class="check"><input type="checkbox" name="cookies" value="tiktok"><span>Píxel de TikTok</span></label>
    <label class="check"><input type="checkbox" name="cookies" value="linkedin"><span>LinkedIn Insight</span></label>
    <label class="check"><input type="checkbox" name="cookies" value="hubspot"><span>HubSpot</span></label>
    <label class="check"><input type="checkbox" name="cookies" value="youtube"><span>Vídeos de YouTube</span></label>
    <label class="check"><input type="checkbox" name="cookies" value="stripe"><span>Pagos con Stripe</span></label>
  </div>
  <label class="field"><span>Texto del enlace para cambiar la elección</span><input name="enlaceConfig" value="Configurar cookies"></label>
</fieldset>`,
    faq: [
      ["¿Necesito una política de cookies?", "Sí, si tu web usa cookies, y casi todas lo hacen. Si además usa cookies que no son técnicas (analítica, publicidad, vídeos incrustados), necesitas también un aviso que permita aceptarlas o rechazarlas antes de instalarlas."],
      ["¿Qué dice la guía de cookies de la AEPD?", "Desde 2023, rechazar las cookies debe ser tan fácil como aceptarlas, en la misma capa del aviso. No vale seguir navegando como aceptación, y la persona debe poder cambiar su elección en cualquier momento."],
      ["¿Las cookies técnicas necesitan consentimiento?", "No. Las estrictamente necesarias para que la web funcione, o para recordar la elección sobre las cookies, están exentas. Aun así hay que mencionarlas en la política."],
      ["¿La tabla de cookies es exacta?", "Incluye los nombres y duraciones habituales de cada herramienta. Comprueba las cookies reales de tu web con las herramientas de desarrollo del navegador, porque pueden cambiar según la configuración."],
      ["¿Guardáis los datos que escribo?", "No. Todo se genera en tu navegador."],
    ],
    nl: "Te escribimos solo si cambian las normas de cookies y hay que actualizar tu política.",
  },
};

function genPage(slug) {
  const g = GEN[slug], t = TOOLS.find((x) => x.slug === slug), url = toolUrl(t);
  const h = head({ title: g.title, desc: g.desc, url, jsonld: [appLd(t, url), faqLd(g.faq), crumbLd(t.name, url)] });
  const body = `${header("tools")}
<main id="main">
  <div class="wrap">
    <nav class="crumbs" aria-label="Migas"><a href="/">Inicio</a> / <a href="/herramientas">Herramientas</a> / ${t.name}</nav>
    <div class="page-head">
      <h1>${g.h1}</h1>
      <p class="lede">${g.lede}</p>
      ${facts(["Gratis y sin registro", "Se genera en tu navegador", "Normativa española vigente"])}
    </div>
    <div class="work">
      <form class="panel" data-gen="${g.gen}" data-file="${g.file}" novalidate>
        ${g.form}
      </form>
      <div class="sheet-wrap">
        <div class="sheet-tools">
          <button class="btn sm" type="button" data-act="copy">Copiar texto</button>
          <button class="btn sm ghost" type="button" data-act="html">Descargar HTML</button>
          <button class="btn sm ghost" type="button" data-act="doc">Descargar Word</button>
        </div>
        <article class="sheet" aria-live="polite" aria-label="Documento generado"></article>
        ${nlBox(slug, g.nl)}
      </div>
    </div>
  </div>
  <section class="soft">
    <div class="wrap">
      <div class="sec-head"><h2>Preguntas frecuentes</h2></div>
      ${faqHtml(g.faq)}
      <p class="disclaimer"><b>Información orientativa.</b> Este texto es un modelo general basado en la normativa española. No sustituye el asesoramiento de un profesional para casos con tratamientos especiales de datos o actividades reguladas.</p>
    </div>
  </section>
  <section>
    <div class="wrap">
      <div class="sec-head"><h2>Más herramientas gratis</h2></div>
      ${related(slug)}
    </div>
  </section>
</main>
${footer()}`;
  return page(h, body, `<script src="/herramientas/generador-legal.js?v=${V}" defer></script>`);
}

/* ---------- Página de herramienta: IA ---------- */
const AI = {
  "revisar-contrato": {
    tool: "revisar",
    title: "Revisar contrato gratis con IA: cláusulas abusivas y riesgos",
    desc: "Pega tu contrato y descubre gratis, en lenguaje claro, qué cláusulas te pueden perjudicar, qué falta y qué preguntar antes de firmar.",
    h1: "Revisa tu contrato antes de firmarlo",
    lede: "Pega el contrato o sube el PDF. En menos de un minuto te decimos qué cláusulas te pueden perjudicar, qué falta y qué conviene preguntar antes de firmar.",
    placeholder: "Pega aquí el texto del contrato: de servicios, de proveedor, laboral, de alquiler, de confidencialidad…",
    button: "Revisar contrato",
    empty: ["El tipo de contrato y un resumen de lo que firmas.", "Las cláusulas de riesgo, ordenadas por gravedad, con qué hacer en cada una.", "Lo que suele incluir este tipo de contrato y aquí falta.", "Las preguntas que conviene hacer antes de firmar."],
    steps: [["Pega o sube el contrato", "Funciona con PDF, Word o texto. Hasta unas 25 páginas."], ["Lo revisamos con IA", "Con criterios del derecho español: cláusulas abusivas, penalizaciones, renovaciones, responsabilidad."], ["Recibe el informe", "Ves el resumen al momento y el informe completo te llega por email."]],
    faq: [
      ["¿Es gratis revisar un contrato?", "Sí. Ves el resumen y la cláusula más importante al momento, y el informe completo te llega gratis por email."],
      ["¿Sustituye a un abogado?", "No. Es una primera revisión orientativa hecha con inteligencia artificial, útil para detectar puntos a negociar o preguntar. Si el contrato es importante, consúltalo con un abogado antes de firmar."],
      ["¿Qué contratos puedo revisar?", "Cualquier contrato en español: de servicios, de proveedor, laborales, de alquiler de vivienda o local, de confidencialidad, de colaboración con autónomos, de compraventa o de distribución, entre otros."],
      ["¿Guardáis mi contrato?", "No. El texto se envía a nuestro proveedor de inteligencia artificial (Anthropic) solo para generar el análisis, y Asesorfy no lo guarda. Anthropic no lo usa para entrenar sus modelos. Aun así, puedes tapar nombres y datos personales antes de pegarlo."],
      ["¿Qué es una cláusula abusiva?", "En contratos con consumidores, es una cláusula no negociada que causa un desequilibrio importante en perjuicio de la persona consumidora, y es nula (artículo 82 del texto refundido de la Ley de Consumidores). Entre empresas no se aplica igual, pero las cláusulas desequilibradas también conviene negociarlas."],
    ],
  },
  "traductor-legal": {
    tool: "traducir",
    title: "Traductor de textos legales a lenguaje claro (gratis)",
    desc: "Pega un contrato, unas condiciones o una carta oficial y te lo explicamos gratis parte por parte, en lenguaje claro: qué te obliga y qué te permite.",
    h1: "Traduce cualquier texto legal a lenguaje claro",
    lede: "Condiciones generales, una cláusula que no entiendes o una carta de Hacienda: pégalo y te lo explicamos parte por parte, con lo que te obliga y lo que te permite.",
    placeholder: "Pega aquí el texto legal: una cláusula, unas condiciones, una notificación…",
    button: "Traducir a lenguaje claro",
    empty: ["Qué es el texto y para qué sirve.", "Cada parte explicada con palabras de todos los días.", "Lo que te obliga y lo que te permite.", "Los puntos a los que conviene prestar atención."],
    steps: [["Pega el texto", "Un contrato, unas condiciones, una cláusula suelta o una carta oficial."], ["Lo traducimos con IA", "Sin jerga: frases cortas y ejemplos cuando hacen falta."], ["Recibe la explicación", "Ves el resumen al momento y la explicación completa te llega por email."]],
    faq: [
      ["¿Qué textos puedo traducir?", "Cualquier texto legal o administrativo en español: contratos, condiciones generales, políticas de privacidad, cartas de la Agencia Tributaria o de la Seguridad Social, notificaciones o cláusulas sueltas."],
      ["¿Es gratis?", "Sí. Ves el resumen al momento y la explicación completa te llega gratis por email."],
      ["¿Es asesoramiento jurídico?", "No. Es una explicación orientativa generada con inteligencia artificial para que entiendas lo que lees. Para decidir qué hacer en un caso concreto, consulta con un profesional."],
      ["¿Guardáis el texto?", "No. El texto se envía a nuestro proveedor de inteligencia artificial (Anthropic) solo para generar la explicación, y Asesorfy no lo guarda. Anthropic no lo usa para entrenar sus modelos."],
    ],
  },
};

function aiPage(slug) {
  const a = AI[slug], t = TOOLS.find((x) => x.slug === slug), url = toolUrl(t);
  const h = head({ title: a.title, desc: a.desc, url, jsonld: [appLd(t, url), faqLd(a.faq), crumbLd(t.name, url)] });
  const body = `${header("tools")}
<main id="main">
  <div class="wrap">
    <nav class="crumbs" aria-label="Migas"><a href="/">Inicio</a> / <a href="/herramientas">Herramientas</a> / ${t.name}</nav>
    <div class="page-head">
      <h1>${a.h1}</h1>
      <p class="lede">${a.lede}</p>
      ${facts(["Gratis", "Resultado en menos de un minuto", "No guardamos tu texto"])}
    </div>
    <div class="work">
      <form class="panel" data-ai="${a.tool}" novalidate>
        <label class="field"><span>Texto</span><textarea name="text" rows="14" placeholder="${esc(a.placeholder)}" required></textarea></label>
        <div class="count" data-count>0 / 60.000 caracteres</div>
        <div class="drop"><label class="btn sm ghost">${ICON.doc}<span>Subir PDF o Word</span><input type="file" accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" hidden></label><span data-file-msg>o pega el texto arriba</span></div>
        <input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="btn" type="submit" style="width:100%">${a.button}</button>
        <div class="err" role="alert"></div>
        <p class="note">Puedes tapar nombres y datos personales antes de pegarlo. El texto se analiza con inteligencia artificial y no se guarda.</p>
      </form>
      <div class="panel" data-result aria-live="polite">
        <div class="empty"><h3>Qué vas a recibir</h3><ol>${a.empty.map((x) => `<li>${x}</li>`).join("")}</ol></div>
      </div>
    </div>
  </div>
  <section class="soft">
    <div class="wrap">
      <div class="sec-head"><h2>Cómo funciona</h2></div>
      <ol class="steps">${a.steps.map(([h3, p]) => `<li><h3>${h3}</h3><p>${p}</p></li>`).join("")}</ol>
    </div>
  </section>
  <section>
    <div class="wrap">
      <div class="sec-head"><h2>Preguntas frecuentes</h2></div>
      ${faqHtml(a.faq)}
      <p class="disclaimer"><b>Información orientativa, no asesoramiento jurídico.</b> El análisis lo genera una inteligencia artificial a partir del texto que pegas y puede contener errores. Antes de firmar o decidir algo importante, consulta con un abogado.</p>
    </div>
  </section>
  <section class="soft">
    <div class="wrap">
      <div class="sec-head"><h2>Más herramientas gratis</h2></div>
      ${related(slug)}
    </div>
  </section>
</main>
${footer()}`;
  return page(h, body);
}

/* ---------- Índice de herramientas ---------- */
function toolsIndex() {
  const url = "/herramientas";
  const h = head({
    title: "Herramientas legales gratis para empresas y autónomos",
    desc: "Revisor de contratos con IA, traductor de textos legales y generadores de política de privacidad, aviso legal y cookies. Gratis y sin registro.",
    url, jsonld: [crumbLd("Herramientas"), { "@context": "https://schema.org", "@type": "ItemList", itemListElement: TOOLS.map((t, i) => ({ "@type": "ListItem", position: i + 1, url: DOMAIN + toolUrl(t), name: t.name })) }],
  });
  const body = `${header("tools")}
<main id="main">
  <div class="wrap">
    <nav class="crumbs" aria-label="Migas"><a href="/">Inicio</a> / Herramientas</nav>
    <div class="page-head">
      <h1>Herramientas legales gratis</h1>
      <p class="lede">Para entender lo que firmas y tener tu web en regla, sin registrarte. Información orientativa basada en la normativa española.</p>
    </div>
    <div class="shelf">
      ${TOOLS.map((t, i) => `<a class="shelf-item${i === 0 ? " lead" : ""}" href="${toolUrl(t)}" data-cta="tools-${t.slug}"><span class="shelf-ic">${ICON[t.ic]}</span><span><b>${t.name}</b><span>${t.line}</span></span><span class="shelf-go">${ICON.arrow}</span></a>`).join("")}
    </div>
    <p class="disclaimer" style="margin-bottom:64px">Asesorfy no es un despacho de abogados. Las herramientas dan información orientativa y modelos generales; para casos concretos o importantes, consulta con un profesional.</p>
  </div>
</main>
${footer()}`;
  return page(h, body);
}

/* ---------- Home ---------- */
function home() {
  const url = "/";
  const idx = searchIndex();
  const guides = idx.filter((x) => x.g === "guide").slice(0, 6);
  const h = head({
    title: "Asesorfy · Herramientas y documentos legales para empresas",
    desc: "Revisa contratos, traduce textos legales y crea la política de privacidad, el aviso legal y las cookies de tu web. Gratis, para empresas y autónomos.",
    url,
    jsonld: [{ "@context": "https://schema.org", "@graph": [
      { "@type": "Organization", "@id": `${DOMAIN}/#organization`, name: "Asesorfy", url: DOMAIN + "/", logo: `${DOMAIN}/assets/asesorfy-mark.svg`, email: "hola@asesorfy.app", areaServed: "ES", founder: { "@type": "Person", name: "Mario Calvo Castillo", url: `${DOMAIN}/sobre.html` }, address: { "@type": "PostalAddress", addressLocality: "Córdoba", addressCountry: "ES" } },
      { "@type": "WebSite", "@id": `${DOMAIN}/#website`, url: DOMAIN + "/", name: "Asesorfy", inLanguage: "es-ES", publisher: { "@id": `${DOMAIN}/#organization` } },
    ] }],
  });
  const chips = [["Política de privacidad", "política de privacidad"], ["Revisar contrato", "revisar contrato"], ["Aviso legal", "aviso legal"], ["Entender una cláusula", "entender clausula"], ["Cookies", "cookies"], ["Inquilino moroso", "inquilino no paga"]];
  const [lead, ...rest] = TOOLS;
  const SNIP = {"traductor-legal": "«Sin perjuicio de lo anterior» → <mark>Aun así</mark>", "generador-politica-privacidad": "Responsable: <mark>Talleres Martín, S.L.</mark> · CIF B14000000", "generador-aviso-legal": "Titular: <mark>tu empresa</mark>, con NIF, domicilio y registro", "generador-politica-cookies": "_ga · Google Analytics · Analítica · <mark>2 años</mark>"};
  const body = `${header("home")}
<main id="main">
  <section class="desk">
    <div class="wrap">
      <h1>¿Qué necesitas resolver hoy?</h1>
      <p class="lede">Herramientas gratis y documentos legales para empresas, autónomos y particulares en España. Escríbelo con tus palabras.</p>
      <form class="ask" role="search" action="/herramientas" data-search>
        <label for="q" class="hp">Busca lo que necesitas</label>
        <span class="ask-ic">${ICON.search}</span>
        <input id="q" name="q" type="search" autocomplete="off" spellcheck="false" placeholder="Ej.: cookies de mi web" aria-controls="answers" aria-expanded="false" aria-autocomplete="list" role="combobox">
        <button class="btn" type="submit">Buscar</button>
        <div class="answers" id="answers" role="listbox" hidden></div>
      </form>
      <div class="chips" aria-label="Búsquedas frecuentes">${chips.map(([l, q]) => `<button type="button" data-q="${esc(q)}">${l}</button>`).join("")}</div>
    </div>
  </section>

  <section class="tools-home">
    <div class="wrap">
      <div class="sec-head"><h2>Cinco herramientas gratis, sin registro</h2><p>Para lo que más se repite en un negocio: entender lo que firmas y tener la web en regla.</p></div>
      <div class="pair-grid">
        <a class="feature-tool" href="${toolUrl(lead)}" data-cta="home-${lead.slug}">
          <div class="clause" aria-hidden="true">
            <p><span class="cl-n">7.2</span> El Cliente renuncia expresamente a cualquier reclamación por retrasos en la entrega, <mark>sea cual sea su causa o duración</mark>.</p>
            <p class="cl-note"><b>Riesgo alto.</b> Te deja sin defensa aunque el retraso sea culpa suya. Pide limitarlo a causas de fuerza mayor.</p>
            <p class="cl-note cl-miss"><b>Falta.</b> No hay plazo de preaviso para darte de baja. Pide fijarlo por escrito, por ejemplo, 30 días.</p>
          </div>
          <h3>${lead.name}</h3>
          <p>${lead.line}</p>
          <span class="go">Revisar un contrato gratis ${ICON.arrow}</span>
        </a>
        <div class="tool-list">
          ${rest.map((t) => `<a href="${toolUrl(t)}" data-cta="home-${t.slug}"><span class="tl-ic">${ICON[t.ic]}</span><span><b>${t.name}</b><span>${t.line}</span><em class="snip">${SNIP[t.slug]}</em></span>${ICON.arrow}</a>`).join("")}
        </div>
      </div>
    </div>
  </section>

  <section class="soft stance">
    <div class="wrap stance-in">
      <h2>Información clara, no asesoramiento</h2>
      <div>
        <p>Asesorfy no es un despacho de abogados. Hacemos herramientas y documentos para que entiendas tus obligaciones legales y resuelvas lo habitual sin perder una mañana.</p>
        <ul>
          <li><b>Basado en la norma.</b> Cada texto parte de la ley española vigente: RGPD, LSSI, LAU, Código Civil.</li>
          <li><b>Tus textos no se guardan.</b> Los generadores funcionan en tu navegador y lo que pegas en el revisor no se almacena.</li>
          <li><b>Te decimos cuándo no basta.</b> Si un caso es importante o poco habitual, te recomendamos consultar con un profesional.</li>
        </ul>
      </div>
    </div>
  </section>

  <section id="recursos" class="rent">
    <div class="wrap rent-in">
      <div>
        <h2>Contratos y escritos, listos para usar</h2>
        <p>Para reclamar un impago antes de ir al juzgado, como exige la ley desde 2025, o para alquilar un piso, una habitación o un local con un contrato al día.</p>
        <a class="btn ghost" href="/documentos.html" data-cta="home-documentos">Ver todos los documentos ${ICON.arrow}</a>
      </div>
      <ul class="rent-list">
        <li><a href="/generador.html#ovc-deuda">Kit Impago facturas <span>Clientes que no pagan</span></a></li>
        <li><a href="/generador.html#ovc-impago">Kit Impago alquiler <span>Inquilinos que no pagan</span></a></li>
        <li><a href="/generador.html#contrato-larga">Contrato de alquiler de vivienda <span>Gratis con tu email</span></a></li>
        <li><a href="/generador.html#contrato-habitacion">Contrato de habitación <span>Piso compartido</span></a></li>
        <li><a href="/generador.html#contrato-temporada">Contrato de temporada <span>Estudiantes o trabajo</span></a></li>
      </ul>
    </div>
  </section>

  <section id="casos" class="soft">
    <div class="wrap">
      <div class="sec-head"><h2>Guías prácticas</h2><p>Explicaciones paso a paso, con la norma citada y actualizadas.</p></div>
      <ul class="guide-list">${guides.map((g) => `<li><a href="${g.u}"><b>${esc(g.t)}</b><span>${esc(g.d)}</span></a></li>`).join("")}</ul>
      <p style="margin-top:22px"><a class="btn ghost" href="/blog.html">Ver todas las guías ${ICON.arrow}</a></p>
    </div>
  </section>

  <section id="contacto">
    <div class="wrap contact-in">
      <div>
        <h2>¿No encuentras lo que buscas?</h2>
        <p>Cuéntanos qué documento o herramienta te haría falta. Leemos todos los mensajes y así decidimos qué hacer después.</p>
        ${nlBox("home", "Te avisamos cuando cambie una norma que afecte a tu web, tus contratos o tus alquileres.")}
      </div>
      <form class="panel" data-contact novalidate>
        <div class="row2"><label class="field"><span>Nombre</span><input name="name" autocomplete="name" required></label><label class="field"><span>Email</span><input name="email" type="email" autocomplete="email" required></label></div>
        <label class="field"><span>Qué necesitas</span><textarea name="message" rows="5" required></textarea></label>
        <label class="consent"><input type="checkbox" name="consent" required><span>He leído la <a href="/privacidad.html">política de privacidad</a> y acepto que Asesorfy use mis datos para responderme.</span></label>
        <input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="btn" type="submit">Enviar mensaje</button>
        <div class="err" role="alert"></div>
      </form>
    </div>
  </section>
</main>
${footer()}
<script>window.ASESORFY_ICONS = ${JSON.stringify(Object.fromEntries(TOOLS.map((x) => [x.ic, ICON[x.ic]])))};window.ASESORFY_INDEX = ${JSON.stringify(idx).replace(/</g, "\\u003c")};</script>`;
  return page(h, body);
}

write("index.html", home());
write("herramientas/index.html", toolsIndex());
for (const s of Object.keys(GEN)) write(`herramientas/${s}.html`, genPage(s));
for (const s of Object.keys(AI)) write(`herramientas/${s}.html`, aiPage(s));
console.log("OK: index.html, herramientas/index.html y", Object.keys(GEN).length + Object.keys(AI).length, "herramientas");
