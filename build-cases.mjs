/* Genera landings de casos de uso reales para los documentos de Asesorfy. */
import fs from "node:fs";

const DOMAIN = "https://asesorfy.app";
const TODAY = "2026-07-21";
const LAU = "https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003";
const CC = "https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763";
const MASC = "https://www.boe.es/eli/es/lo/2025/01/02/1/con";
const NRUA = "https://www.boe.es/buscar/act.php?id=BOE-A-2024-26931";

const pages = [
  {
    slug:"modelo-contrato-alquiler-vivienda-habitual", category:"Vivienda habitual",
    title:"Modelo de contrato de alquiler de vivienda habitual 2026",
    meta:"Crea un contrato de alquiler de vivienda habitual conforme a la LAU: duración, prórrogas, fianza, desistimiento e IRAV. Modelo editable.",
    intro:"Un contrato de vivienda habitual debe reflejar el uso permanente del inmueble y respetar las reglas imperativas de la LAU. Este modelo organiza las cláusulas esenciales y te permite personalizar los datos antes de descargarlo.",
    key:"contrato-larga", product:"Contrato de larga duración", price:"5,99 €", law:"Ley de Arrendamientos Urbanos, especialmente arts. 9, 10, 11, 18 y 36.", lawUrl:LAU,
    checklist:["Identidad de todas las partes y dirección completa","Renta, forma de pago y actualización aplicable","Duración inicial y régimen de prórrogas","Fianza, garantías adicionales e inventario"],
    clauses:["Destino exclusivo como vivienda habitual","Desistimiento del inquilino y posible indemnización","Reparto de suministros, comunidad e IBI","Conservación, obras, mascotas y subarriendo"],
    mistakes:["Usar un contrato de temporada cuando la necesidad es permanente","Acortar por contrato las prórrogas legales del inquilino","Cobrar garantías sin distinguir fianza y garantía adicional"],
    faqs:[{q:"¿Cuánto dura como mínimo?",a:"La duración inicial puede pactarse libremente, pero la LAU reconoce prórrogas obligatorias cuando el plazo es inferior al mínimo legal aplicable."},{q:"¿La fianza es obligatoria?",a:"Sí. En vivienda habitual la LAU exige una mensualidad de renta como fianza en metálico."}],
    related:["contrato-alquiler-vivienda-con-mascotas","contrato-alquiler-temporada-por-trabajo"]
  },
  {
    slug:"contrato-alquiler-vivienda-con-mascotas", category:"Vivienda habitual",
    title:"Contrato de alquiler con mascotas: modelo y cláusulas",
    meta:"Modelo de contrato de alquiler con mascotas: autorización, responsabilidad por daños, convivencia e inventario dentro de un contrato de vivienda LAU.",
    intro:"Permitir mascotas no exige crear un contrato distinto, pero sí conviene describir con precisión la autorización, la responsabilidad por daños y las reglas de convivencia. La cláusula debe integrarse en un contrato de vivienda habitual válido.",
    key:"contrato-larga", product:"Contrato de larga duración", price:"5,99 €", law:"LAU para el contrato de vivienda y autonomía de la voluntad dentro de sus límites.", lawUrl:LAU,
    checklist:["Especie y número de animales autorizados","Estado inicial de suelos, puertas y mobiliario","Seguro o garantía adicional, si se pacta legalmente","Normas de comunidad que deban respetarse"],
    clauses:["Autorización expresa para los animales identificados","Responsabilidad por daños y molestias acreditadas","Obligación de limpieza y cumplimiento de normas","Procedimiento para incorporar otra mascota"],
    mistakes:["Aplicar una prohibición ambigua que contradice lo hablado","Confundir daños reales con desgaste ordinario","Imponer penalizaciones automáticas desproporcionadas"],
    faqs:[{q:"¿Puede el propietario prohibir mascotas?",a:"Puede pactarse una prohibición o autorización en el contrato, respetando la normativa aplicable y sin introducir condiciones abusivas."},{q:"¿Se puede pedir más fianza?",a:"La fianza legal es de una mensualidad; además puede pactarse una garantía adicional dentro de los límites de la LAU."}],
    related:["modelo-contrato-alquiler-vivienda-habitual","contrato-alquiler-habitacion-piso-compartido"]
  },
  {
    slug:"contrato-alquiler-habitacion-estudiantes", category:"Alquiler de habitación",
    title:"Contrato de alquiler de habitación para estudiantes 2026",
    meta:"Modelo de contrato de habitación para estudiantes: duración del curso, zonas comunes, gastos, inventario, convivencia y devolución de fianza.",
    intro:"El alquiler de una habitación a un estudiante necesita identificar la habitación de uso exclusivo, las zonas compartidas y el periodo académico. Una causa clara y un inventario reducen conflictos al terminar el curso.",
    key:"contrato-habitacion", product:"Contrato de habitación", price:"9,99 €", law:"Código Civil y pactos del contrato; la calificación final depende del uso real.", lawUrl:CC,
    checklist:["Habitación exacta y mobiliario entregado","Fechas del curso y condiciones de prórroga","Reparto de luz, agua, internet y limpieza","Acceso a cocina, baño y otras zonas comunes"],
    clauses:["Uso personal por el estudiante identificado","Normas de convivencia y descanso","Visitas, llaves y prohibición de cesión","Inventario con fotografías y devolución de fianza"],
    mistakes:["No diferenciar el espacio privado de las zonas comunes","Dejar los suministros sin fórmula de reparto","Usar una duración indefinida cuando se pretende cubrir un curso"],
    faqs:[{q:"¿Se aplica siempre la LAU?",a:"El alquiler aislado de una habitación suele articularse mediante el Código Civil, aunque la calificación depende de las circunstancias reales y del contenido del acuerdo."},{q:"¿Conviene incluir inventario?",a:"Sí. Un inventario firmado y, si es posible, fotografías fechadas ayudan a distinguir daños de desgaste normal."}],
    related:["contrato-alquiler-habitacion-piso-compartido","contrato-alquiler-temporada-estudiantes"]
  },
  {
    slug:"contrato-alquiler-habitacion-piso-compartido", category:"Alquiler de habitación",
    title:"Contrato de habitación en piso compartido: modelo 2026",
    meta:"Genera un contrato de habitación para piso compartido con zonas comunes, gastos, visitas, limpieza, inventario y reglas de convivencia.",
    intro:"En un piso compartido, los conflictos suelen nacer de asuntos que un contrato genérico no concreta: suministros, limpieza, visitas, uso de zonas comunes o sustitución de ocupantes. Esta versión pone esos puntos en primer plano.",
    key:"contrato-habitacion", product:"Contrato de habitación", price:"9,99 €", law:"Código Civil, autonomía de la voluntad y reglas generales del arrendamiento.", lawUrl:CC,
    checklist:["Descripción de cada habitación y espacios compartidos","Cuota o fórmula para repartir suministros","Normas acordadas de limpieza y convivencia","Quién responde de daños en zonas comunes"],
    clauses:["Uso exclusivo de la habitación asignada","Calendario o sistema de gastos compartidos","Visitas, pernoctas y límites de ocupación","Salida anticipada y sustitución del ocupante"],
    mistakes:["Firmar un único contrato sin aclarar la responsabilidad de cada ocupante","No documentar el estado de las zonas comunes","Permitir sustituciones sin consentimiento escrito"],
    faqs:[{q:"¿Cada inquilino debe tener su contrato?",a:"Puede formalizarse por habitaciones o mediante un acuerdo conjunto. Lo importante es que la responsabilidad y el espacio asignado queden claros."},{q:"¿Quién paga un daño en una zona común?",a:"Dependerá de quién lo causó y de lo pactado. El contrato debe evitar atribuciones automáticas que no puedan justificarse."}],
    related:["contrato-alquiler-habitacion-estudiantes","contrato-alquiler-vivienda-con-mascotas"]
  },
  {
    slug:"contrato-alquiler-temporada-por-trabajo", category:"Alquiler de temporada",
    title:"Contrato de alquiler de temporada por trabajo 2026",
    meta:"Modelo de contrato de temporada por desplazamiento laboral: causa temporal, domicilio habitual, duración, fianza y documentación recomendable.",
    intro:"El desplazamiento laboral puede justificar un alquiler de temporada cuando existe una necesidad transitoria y el inmueble no se convierte en la residencia permanente del arrendatario. La causa debe ser real, concreta y coherente con la duración.",
    key:"contrato-temporada", product:"Contrato de temporada", price:"9,99 €", law:"Art. 3 LAU para uso distinto de vivienda y art. 36 para la fianza.", lawUrl:LAU,
    checklist:["Empresa, proyecto o motivo del desplazamiento","Fecha prevista de inicio y finalización","Domicilio habitual que se mantiene","Documento que permita acreditar la temporalidad"],
    clauses:["Causa laboral descrita de forma concreta","Destino temporal y exclusión de vivienda permanente","Duración vinculada al desplazamiento","Fianza de dos mensualidades y suministros"],
    mistakes:["Escribir solo «por temporada» sin explicar la causa","Encadenar contratos para ocultar una necesidad permanente","Confiar únicamente en la duración corta para definir el contrato"],
    faqs:[{q:"¿Basta con que dure once meses?",a:"No. La duración no convierte por sí sola un alquiler en temporal; debe existir una causa transitoria real y acreditable."},{q:"¿Qué fianza corresponde?",a:"Para un arrendamiento de uso distinto del de vivienda, el artículo 36 LAU establece dos mensualidades."}],
    related:["contrato-alquiler-temporada-estudiantes","modelo-contrato-alquiler-vivienda-habitual"]
  },
  {
    slug:"contrato-alquiler-temporada-estudiantes", category:"Alquiler de temporada",
    title:"Contrato de alquiler de temporada para estudiantes 2026",
    meta:"Modelo de contrato de temporada para estudiantes: curso académico, causa temporal, domicilio habitual, duración, fianza e inventario.",
    intro:"Cuando se alquila una vivienda completa durante un curso, los estudios pueden constituir la causa temporal. Conviene identificar el centro, el periodo académico y el domicilio habitual para que el contrato refleje la realidad.",
    key:"contrato-temporada", product:"Contrato de temporada", price:"9,99 €", law:"Art. 3 LAU para la causa temporal y art. 36 para la fianza.", lawUrl:LAU,
    checklist:["Centro y programa de estudios","Fechas del curso o prácticas","Domicilio habitual fuera del inmueble","Inventario y ocupantes autorizados"],
    clauses:["Causa académica y periodo concreto","Uso de la vivienda por estudiantes identificados","Reparto de renta y responsabilidad si son varios","Entrega de llaves, inventario y salida"],
    mistakes:["Confundir alquiler de vivienda completa con habitación","No identificar a todos los ocupantes","Mantener el contrato indefinidamente tras desaparecer la causa"],
    faqs:[{q:"¿Es lo mismo que alquilar una habitación?",a:"No necesariamente. Esta página se refiere al alquiler temporal de una vivienda completa; una habitación aislada puede tener otro régimen contractual."},{q:"¿Hace falta acreditar los estudios?",a:"No hay un único documento obligatorio para todos los casos, pero conservar matrícula, admisión o prácticas ayuda a acreditar la causa expresada."}],
    related:["contrato-alquiler-habitacion-estudiantes","contrato-alquiler-temporada-por-trabajo"]
  },
  {
    slug:"oferta-vinculante-confidencial-impago-alquiler", category:"Impago y MASC",
    title:"Oferta vinculante confidencial por impago de alquiler",
    meta:"Crea una oferta vinculante confidencial por impago: deuda, propuesta de pago o entrega, plazo de un mes y prueba de envío conforme al art. 17.",
    intro:"La oferta vinculante confidencial permite proponer una solución concreta al impago y, si cumple los requisitos legales, puede servir para acreditar el intento negociador previo exigible antes de determinadas demandas civiles.",
    key:"ovc-impago", product:"Kit Impago + MASC", price:"29 €", law:"Artículo 17 de la Ley Orgánica 1/2025 y reglas generales sobre MASC.", lawUrl:MASC,
    checklist:["Contrato, mensualidades e importe exacto de la deuda","Identidad y domicilio válido del destinatario","Propuesta que el propietario esté dispuesto a cumplir","Medio que pruebe contenido, recepción y fecha"],
    clauses:["Pago íntegro o calendario claramente definido","Alternativa de entrega voluntaria del inmueble","Plazo de aceptación de un mes o superior","Carácter confidencial y forma de aceptación"],
    mistakes:["Enviar un recordatorio sin una oferta concreta","No poder acreditar el contenido remitido","Mencionar el contenido confidencial en una demanda posterior"],
    faqs:[{q:"¿Cuánto tiempo tiene el inquilino para aceptar?",a:"El artículo 17 prevé un mes, salvo que quien formula la oferta conceda un plazo mayor."},{q:"¿Sirve un mensaje informal?",a:"El medio debe permitir acreditar identidad, recepción, fecha y contenido. Por eso suele preferirse una comunicación fehaciente."}],
    related:["masc-impago-alquiler-antes-desahucio","modelo-contrato-alquiler-vivienda-habitual"]
  },
  {
    slug:"masc-impago-alquiler-antes-desahucio", category:"Impago y MASC",
    title:"MASC por impago de alquiler antes del desahucio",
    meta:"Qué preparar para un MASC por impago de alquiler: cálculo de deuda, propuesta, prueba de recepción, plazo y documentación para el abogado.",
    intro:"Antes de iniciar determinadas acciones civiles por impago puede ser necesario acreditar un intento de solución negociada. El kit organiza la deuda y una oferta de pago o entrega, pero no sustituye la estrategia procesal de un abogado.",
    key:"ovc-impago", product:"Kit Impago + MASC", price:"29 €", law:"Ley Orgánica 1/2025 sobre medios adecuados de solución de controversias.", lawUrl:MASC,
    checklist:["Contrato y justificantes de todos los impagos","Cálculo separado de rentas y otras cantidades","Dirección donde pueda acreditarse la recepción","Cronología de comunicaciones anteriores"],
    clauses:["Importe reclamado y periodos incluidos","Solución propuesta y condiciones de aceptación","Plazo y canal para responder","Reserva de acciones si no hay acuerdo"],
    mistakes:["Iniciar la demanda sin revisar el requisito de procedibilidad","Mezclar deuda no documentada o cálculos contradictorios","Usar una comunicación que no deja prueba de recepción"],
    faqs:[{q:"¿El MASC evita siempre el juicio?",a:"No. Busca una solución previa; si no hay aceptación, puede permitir continuar con la acción que corresponda cuando se hayan cumplido los requisitos."},{q:"¿Necesito abogado?",a:"Para cuantías superiores a 2.000 € y para la fase judicial pueden existir exigencias de asistencia letrada. En un caso de desahucio conviene revisar la estrategia con un profesional."}],
    related:["oferta-vinculante-confidencial-impago-alquiler","modelo-contrato-alquiler-vivienda-habitual"]
  }
];

const esc = value => String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const css = `:root{--ink:#0e1a2b;--muted:#5b6776;--line:#e2e8f0;--soft:#f6f8fb;--accent:#1f5fa6;--dark:#163f6e;--ok:#1d7a52}*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,sans-serif;color:var(--ink);line-height:1.65;background:#fff}a{color:var(--accent)}.wrap{max-width:920px;margin:auto;padding:0 24px}header{border-bottom:1px solid var(--line);position:sticky;top:0;background:rgba(255,255,255,.94);z-index:3}.nav{height:64px;display:flex;align-items:center;justify-content:space-between}.brand{font-family:Fraunces,serif;font-size:21px;font-weight:600;text-decoration:none;color:var(--ink)}.navlinks{display:flex;gap:16px;font-size:14px}.navlinks a{text-decoration:none;color:#334155}.hero{padding:66px 0 34px}.eyebrow{text-transform:uppercase;letter-spacing:.14em;color:var(--accent);font-weight:700;font-size:12px}h1,h2{font-family:Fraunces,Georgia,serif;line-height:1.16}h1{font-size:clamp(34px,6vw,54px);margin:14px 0 18px}h2{font-size:28px;margin:54px 0 18px}.lead{font-size:19px;color:var(--muted);max-width:720px}.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:28px 0}.fact,.card{border:1px solid var(--line);border-radius:14px;padding:20px;background:var(--soft)}.fact b{display:block;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:5px}.cta{display:inline-block;background:var(--accent);color:#fff;text-decoration:none;font-weight:700;padding:14px 22px;border-radius:10px;margin-top:8px}.cta:hover{background:var(--dark)}.price{margin-left:12px;color:var(--muted);font-size:14px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.card h3{margin:0 0 12px;font-size:18px}.card ul,.check{margin:0;padding-left:20px}.card li,.check li{margin:8px 0}.source{border-left:4px solid var(--accent);padding:14px 18px;background:#eef4fb}.faq details{border:1px solid var(--line);border-radius:12px;padding:15px 18px;margin:10px 0}.faq summary{font-weight:700;cursor:pointer}.related{display:grid;grid-template-columns:1fr 1fr;gap:12px}.related a{border:1px solid var(--line);border-radius:10px;padding:16px;text-decoration:none;font-weight:600}.note{font-size:13px;color:var(--muted);margin-top:34px}footer{margin-top:64px;padding:30px 0;background:var(--ink);color:#a5b4c7;font-size:13px}@media(max-width:700px){.facts,.grid,.related{grid-template-columns:1fr}.navlinks{display:none}}`;

function render(p) {
  const url=`${DOMAIN}/casos/${p.slug}.html`;
  const faqs=p.faqs.map(f=>({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}));
  const schema={"@context":"https://schema.org","@graph":[
    {"@type":"WebPage","name":p.title,"description":p.meta,"url":url,"dateModified":TODAY,"inLanguage":"es-ES"},
    {"@type":"Product","name":p.product,"description":p.intro,"url":url,"brand":{"@type":"Brand","name":"Asesorfy"},"offers":{"@type":"Offer","price":p.price.replace(" €","").replace(",","."),"priceCurrency":"EUR","availability":"https://schema.org/InStock","url":`${DOMAIN}/generador.html#${p.key}`}},
    {"@type":"FAQPage","mainEntity":faqs},
    {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":`${DOMAIN}/`},{"@type":"ListItem","position":2,"name":"Documentos","item":`${DOMAIN}/documentos.html`},{"@type":"ListItem","position":3,"name":p.title,"item":url}]}
  ]};
  const related=p.related.map(slug=>pages.find(x=>x.slug===slug)).filter(Boolean);
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(p.title)} | Asesorfy</title><meta name="description" content="${esc(p.meta)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:site_name" content="Asesorfy"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.meta)}"><meta property="og:url" content="${url}"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><style>${css}</style><script type="application/ld+json">${JSON.stringify(schema)}</script><script defer src="/_vercel/insights/script.js"></script><script defer src="../posthog-analytics.js"></script></head><body><header><div class="wrap nav"><a class="brand" href="../index.html">● Asesorfy</a><nav class="navlinks"><a href="../documentos.html">Documentos</a><a href="../calculadora-rentabilidad-alquiler.html">Calculadora</a><a href="../blog.html">Blog</a><a href="../asesoria.html">Asesoría</a></nav></div></header><main class="wrap"><section class="hero"><span class="eyebrow">${esc(p.category)} · Modelo actualizado</span><h1>${esc(p.title)}</h1><p class="lead">${esc(p.intro)}</p><div class="facts"><div class="fact"><b>Documento</b>${esc(p.product)}</div><div class="fact"><b>Precio</b>${esc(p.price)} · pago único</div><div class="fact"><b>Actualización</b>Revisado el 21 de julio de 2026</div></div><a class="cta" href="../generador.html#${p.key}">Personalizar el documento →</a><span class="price">Vista previa antes de pagar</span></section><section><h2>Qué debes preparar</h2><ul class="check">${p.checklist.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section><section><h2>Cláusulas que conviene revisar</h2><div class="grid">${p.clauses.map((x,i)=>`<div class="card"><h3>${String(i+1).padStart(2,"0")}</h3>${esc(x)}</div>`).join("")}</div></section><section><h2>Errores frecuentes</h2><div class="card"><ul>${p.mistakes.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></section><section><h2>Base legal</h2><p class="source">${esc(p.law)} <a href="${p.lawUrl}" target="_blank" rel="noopener noreferrer">Consultar texto oficial en el BOE</a>.${p.key==="contrato-temporada"?` Consulta también el <a href="${NRUA}" target="_blank" rel="noopener noreferrer">RD 1312/2024 consolidado</a>: el procedimiento estatal NRUA fue anulado por el Tribunal Supremo en 2026.`:""}</p></section><section class="faq"><h2>Preguntas frecuentes</h2>${p.faqs.map(f=>`<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</section><section><h2>Casos relacionados</h2><div class="related">${related.map(x=>`<a href="${x.slug}.html">${esc(x.title)} →</a>`).join("")}</div></section><p class="note"><strong>Aviso legal.</strong> Modelo informativo y orientativo; no constituye asesoramiento jurídico personalizado. La calificación y las obligaciones aplicables dependen de las circunstancias reales, la fecha y, cuando corresponda, la normativa autonómica o local.</p><div style="text-align:center"><a class="cta" href="../generador.html#${p.key}">Crear ${esc(p.product.toLowerCase())} →</a></div></main><footer><div class="wrap">© 2026 Asesorfy · Documentos legales para propietarios · Normativa española</div></footer></body></html>`;
}

fs.mkdirSync("casos",{recursive:true});
for (const page of pages) fs.writeFileSync(`casos/${page.slug}.html`,render(page));

let sitemap=fs.readFileSync("sitemap.xml","utf8");
sitemap=sitemap.replace(/\n?\s*<!-- Programmatic use-case pages -->[\s\S]*?<!-- End programmatic use-case pages -->\s*/g,"\n");
const urls=pages.map(p=>`  <url><loc>${DOMAIN}/casos/${p.slug}.html</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("\n");
sitemap=sitemap.replace("</urlset>",`  <!-- Programmatic use-case pages -->\n${urls}\n  <!-- End programmatic use-case pages -->\n</urlset>`);
fs.writeFileSync("sitemap.xml",sitemap);
console.log(`Generadas ${pages.length} landings de casos y actualizado sitemap.xml`);
