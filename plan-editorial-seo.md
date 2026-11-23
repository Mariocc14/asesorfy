# Plan editorial SEO/AEO — Asesorfy

Este archivo guía la publicación diaria de artículos del blog. Cada día se elige el **siguiente tema no publicado** del backlog, se marca como hecho y se registra en el log del final.

---

## Backlog de temas (orden de prioridad)

Marca con [x] cuando se publique. Cada tema indica la palabra clave principal y el producto al que enlaza.

### Clúster Impago → enlaza a generador.html#ovc-impago
- [x] Cómo desahuciar a un inquilino que no paga en 2026 (guía paso a paso) — kw: "desahucio por impago 2026"
- [x] Burofax por impago de alquiler: cómo enviarlo y qué poner — kw: "burofax impago alquiler"
- [x] Qué es la Oferta Vinculante Confidencial (OVC) y cómo usarla — kw: "oferta vinculante confidencial"
- [x] Cuánto tarda un desahucio por impago en 2026 — kw: "cuanto tarda un desahucio"
- [x] Ficheros de inquilinos morosos (FIM, ASNEF): cómo funcionan — kw: "fichero inquilinos morosos"
- [x] Reclamar las rentas atrasadas tras el desahucio — kw: "reclamar rentas impagadas"

### Clúster Habitación → enlaza a generador.html#contrato-habitacion
- [x] Fianza en el alquiler de habitación: cuánto y cómo se devuelve — kw: "fianza alquiler habitacion"
- [x] Normas de convivencia en piso compartido (con modelo) — kw: "normas convivencia piso compartido"
- [x] Empadronarse en una habitación alquilada: ¿se puede? — kw: "empadronarse habitacion alquilada"
- [x] Alquiler de habitaciones e IRPF: cómo tributa — kw: "alquiler habitaciones declaracion renta"

### Clúster Temporada → enlaza a generador.html#contrato-temporada
- [x] Alquiler de temporada vs alquiler turístico: diferencias clave — kw: "alquiler temporada o turistico"
- [x] Número de registro NRUA paso a paso (Ventanilla Única) — kw: "numero registro alquiler nrua"
- [x] El modelo informativo anual de febrero del registro de arrendamientos — kw: "modelo anual registro arrendamientos"

### Clúster Larga duración → enlaza a generador.html#contrato-larga
- [x] Inquilino no paga suministros: titularidad, prueba y reclamación — kw: "inquilino no paga suministros"
- [x] Vender un piso alquilado: contrato, tanteo y retracto — kw: "vender piso alquilado"
- [x] Recuperar una vivienda alquilada para uso propio (art. 9.3 LAU) — kw: "recuperar vivienda alquilada uso propio"
- [x] ¿Se pueden prohibir mascotas en un alquiler? Cláusulas y límites — kw: "prohibir mascotas alquiler"
- [x] Subarrendar una habitación: permiso, límites y respuesta del propietario — kw: "subarrendar una habitacion"
- [x] Recibo de alquiler: obligación, contenido y modelo — kw: "recibo de alquiler"
- [x] Garantía adicional del alquiler: depósito, aval bancario o fiador — kw: "garantia adicional alquiler"
- [x] Reparaciones y obras en la vivienda alquilada: quién paga cada avería (casero vs. inquilino, art. 21 LAU) — kw: "reparaciones alquiler quien paga"
- [x] Inventario anexo al contrato: muebles, estado y fotos — kw: "inventario contrato alquiler"
- [x] Duración del contrato de alquiler en 2026: prórrogas de la LAU — kw: "duracion contrato alquiler 2026"
- [x] Cómo hacer un contrato de alquiler de vivienda paso a paso — kw: "como hacer contrato de alquiler"
- [x] Devolución de la fianza: plazos y descuentos por desperfectos — kw: "devolucion fianza alquiler"
- [x] Desistimiento del inquilino: preaviso y penalización (art. 11 LAU) — kw: "desistimiento contrato alquiler inquilino"
- [x] IBI, comunidad y suministros: ¿quién paga en el alquiler? — kw: "quien paga ibi alquiler"
- [x] Zonas tensionadas: qué son y cómo afectan al casero — kw: "zonas tensionadas propietario"

### Clúster Subida de renta / fiscalidad → enlaza al artículo IRAV y a documentos.html
- [x] IRAV vs IPC: cuál aplico a mi contrato — kw: "irav o ipc alquiler" (intención ya cubierta por blog-irav.html; no crear otra URL para evitar canibalización)
- [x] Cómo actualizar la renta del alquiler paso a paso (carta modelo) — kw: "carta actualizacion renta alquiler"
- [x] Fiscalidad del alquiler 2026: reducciones del IRPF para propietarios — kw: "reduccion irpf alquiler vivienda"
- [x] Seguro de impago de alquiler: ¿merece la pena? — kw: "seguro impago alquiler"
- [x] Okupación vs inquilino moroso: diferencias legales — kw: "diferencia okupa inquilino moroso"

### Clúster Rentabilidad → enlaza a calculadora-rentabilidad-alquiler.html
- [x] Cómo calcular la rentabilidad del alquiler: bruta, neta y flujo de caja — kw: "calcular rentabilidad alquiler"

---

## Checklist SEO obligatorio (Google)

Cada artículo DEBE cumplir:

1. **Investigación previa:** buscar en la web la normativa española **vigente al día de hoy** y verificar cada dato. Fuentes fiables: BOE, INE, Agencia Tributaria, Ministerio de Vivienda, AEPD. Nada inventado.
2. **Palabra clave principal** en: título (H1), `<title>`, meta description, primer párrafo, una H2 y el slug del archivo.
3. **Slug descriptivo** del archivo: `blog-<palabras-clave-con-guiones>.html` (sin acentos ni mayúsculas).
4. **Estructura:** H1 único, varias H2/H3 con palabras clave semánticas (LSI). Párrafos cortos. Listas cuando aporten.
5. **Longitud:** 1.500–3.200 palabras de valor real (lo exige `scripts/validate-blog.mjs`; no relleno).
6. **Enlaces internos:** al menos 3 a otros artículos del blog y 1 al producto/generador relacionado.
7. **Enlaces externos** a 1–2 fuentes oficiales (BOE, INE…) con `rel="noopener"`.
8. **Meta:** `<title>` (~60 caracteres) y `<meta name="description">` (~155 caracteres) únicos.
9. **Open Graph:** og:title, og:description, og:type=article.
10. **Datos estructurados JSON-LD:** `Article` (con headline, datePublished, author Person `{"@type":"Person","@id":"https://asesorfy.app/sobre.html#mario","name":"Mario Calvo Castillo","url":"https://asesorfy.app/sobre.html"}` y publisher Organization Asesorfy) y, si hay preguntas, `FAQPage`. En un segundo bloque `<script type="application/ld+json">`, después del primero, `BreadcrumbList` (Inicio › Blog › título del artículo).
11. **Imágenes:** si se usan, con `alt` descriptivo (puede omitirse si no hay imágenes).
12. **Canonical:** `<link rel="canonical">` a la URL del artículo.
13. **Disclaimer legal** al final (informativo, no asesoramiento; normativa España).
14. Añadir el artículo a **blog.html** (tarjeta nueva arriba) y a **sitemap.xml**.

## Checklist AEO (indexación en LLMs: ChatGPT, Perplexity, Gemini)

1. **Resumen TL;DR** de 2–3 frases al inicio que responda la pregunta principal de forma directa y citable.
2. **Estructura pregunta-respuesta:** subtítulos en forma de pregunta real; respuesta clara y autocontenida justo debajo.
3. **Definiciones concisas** de los términos clave (un LLM las cita textualmente).
4. **Sección de preguntas frecuentes (FAQ)** al final, con respuestas breves y con JSON-LD `FAQPage`.
5. **Datos concretos y fechas** (artículos de ley, porcentajes, plazos) — los LLM valoran la especificidad verificable.
6. **Citar la fuente** dentro del texto ("según el art. X de la LAU…").
7. **Lenguaje claro y neutral**, sin marketing vacío.

---

---

## Automatización diaria (desde 2026-09-16)

- La cola de temas vive en `editorial/topic-queue.json` (el backlog de arriba queda como histórico: está todo publicado). La tarea programada coge el primer tema con `"status": "pending"`, lo marca `"done"` con `published` y `slug`, y si quedan menos de 5 pendientes añade 5 nuevos.
- Se trabaja en un árbol de trabajo aislado: `scripts/blog-worktree.sh open | publish | close`. El repositorio principal no se toca.
- Validación obligatoria antes de publicar: `node scripts/validate-blog.mjs <raíz> blog-<slug>.html` (SEO clásico + estructura AEO/GEO).
- `llms.txt` se regenera con `node scripts/build-llms.mjs` en cada publicación; no se edita a mano.
- Plantilla de referencia: el artículo más reciente del log (mismo `<head>`, `<style>`, header, footer y clases).

## Checklist AEO/GEO v2 (citación por ChatGPT, Perplexity, Gemini, Claude y AI Overviews)

1. **Respuesta corta primero**: `.lead` de dos o tres frases que ya resuelva la búsqueda, y un `.note` que empiece por "Respuesta corta:" con la respuesta en 40–60 palabras. Es el bloque que copian los asistentes.
2. **Cubrir el abanico de subpreguntas** (query fan-out): antes de escribir, listar 5–10 preguntas relacionadas que un buscador con IA generaría y responder cada una en su propia `<h2>` en forma de pregunta real.
3. **Al menos dos tablas** `.rules` con `<thead>`: comparativas, plazos, quién paga qué, requisitos por caso. Las tablas son lo más citado.
4. **Datos concretos, fechados y con fuente en el texto**: artículo de ley, plazo, porcentaje, cuantía. "Según el art. X de la LAU…", "el INE publicó el IRAV de <mes> en…". Sin cifras inventadas: si no se puede verificar, no se escribe.
5. **Fechas y firma visibles**: `<div class="meta">Publicado y revisado el <time datetime="AAAA-MM-DD">…</time> · Por <a href="sobre.html" rel="author">Mario Calvo Castillo</a> · N min de lectura</div>`, `<meta name="author" content="Mario Calvo Castillo">`, el `<article class="article">` dentro de `<main id="contenido">`, `article:published_time`, `article:modified_time` y `dateModified` en JSON-LD. La frescura pesa mucho en ChatGPT y Perplexity.
6. **FAQ espejo**: 5–8 preguntas `<h3>¿…?` con respuesta directa en 2–3 frases, idénticas en el bloque `FAQPage` del JSON-LD.
7. **Fuentes oficiales consultadas**: sección propia con 2–6 enlaces a BOE, INE, AEAT, ministerios, CGPJ o portales autonómicos, cada uno con una línea que diga qué aporta y la fecha de consulta.
8. **Definiciones extractables**: cada término clave (MASC, OVC, IRAV, gran tenedor, tácita reconducción…) se define en una frase autocontenida la primera vez que aparece.
9. **Enlaces internos con contexto**: 3–6 a guías existentes, 1 al producto o a una herramienta gratis (p. ej. /herramientas/revisar-contrato) en el `.cta`, y un enlace nuevo desde 1–2 artículos antiguos relacionados hacia el nuevo (para que la autoridad fluya).
10. **Tono**: segunda persona, frases cortas, una idea por frase, lenguaje llano y neutro. Sin relleno, sin marketing, sin "no es X, es Y", sin emojis.
11. **Sin keyword stuffing**: la palabra clave va en title, H1, description, primer párrafo, una H2 y el slug; el resto, lenguaje natural con sinónimos.


## Régimen legal vigente: Real Decreto-ley 29/2026 (obligatorio desde el 2026-11-23)

El [Real Decreto-ley 29/2026, de 6 de octubre](https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823) (BOE del 7-10-2026, en vigor el 8-10-2026, [convalidado el 12-11-2026](https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-23755)) reformó la LAU y la LEC. Ningún artículo nuevo puede escribirse con el régimen anterior. Reglas:

1. **Habitación:** desde el 8-10-2026 la habitación que es vivienda habitual es arrendamiento de vivienda de la LAU (art. 2.1) y se rige por lo pactado en el marco del título II (art. 4.2). La habitación de alguien desplazado temporalmente es vivienda temporal (art. 2.3). Prohibido escribir «la habitación no se rige por la LAU / se rige por el Código Civil» salvo como historia del régimen anterior. La suma de rentas de las habitaciones alquiladas a la vez no puede superar la renta del contrato del piso completo (art. 17.9). Para contratos de habitación firmados antes del 8-10-2026 **no hay transitoria específica**: decirlo así, sin inventar la solución.
2. **Temporada:** ya no es «uso distinto del de vivienda (art. 3 LAU)»; el art. 3.2 excluye el alojamiento de personas. Es arrendamiento de vivienda temporal: causa expresa, real y acreditable con prueba a cargo del arrendador (art. 7.2; sin causa → vivienda habitual con efectos retroactivos); más de 31 días y, como regla, hasta 12 meses (art. 9 bis); más de dos contratos temporales consecutivos con las mismas partes o más de 12 meses sin justificación → el primero es vivienda habitual; desistimiento tras 1 mes con 10 días de aviso (art. 11.2); pequeñas reparaciones del arrendador y respuesta en 5 días hábiles (art. 21 bis); contratos temporales sucesivos en la misma vivienda no suben más que el IRAV (art. 17.8). Contratos firmados antes del 8-10-2026: uso distinto hasta su vencimiento y extinción sin prórroga; si se renuevan, régimen nuevo (DT 8.ª LAU). La cesión turística sometida a normativa sectorial no puede superar 31 días (art. 5.e).
3. **Fianza y garantías:** fianza de una mensualidad en todo arrendamiento de vivienda, incluidas habitación y vivienda temporal (art. 36.1); garantía adicional máx. 2 mensualidades (contratos de hasta 5/7 años) y 1 en temporales; **prohibido exigir al inquilino seguros de impago** (art. 36.5); documento de finalización firmado por ambas partes al devolver la vivienda (art. 36.7).
4. **Renta:** sin pacto expreso no hay actualización; pacto sin índice → IRAV; **en todo caso** la subida no puede superar el IRAV (art. 18.1), también en contratos anteriores a la Ley 12/2023 (nueva DT 4.ª de esa ley). Hasta el 31-12-2027 (DF 6.ª): 0 % si la renta supera el límite del sistema de índices de referencia; si no, lo del nuevo pacto y, sin él, máximo 2 %. Nunca escribir que «no existe tope extraordinario».
5. **Gastos:** los tributos de la vivienda (IBI, etc.) no pueden imponerse al inquilino salvo que sea el obligado tributario; sin propiedad horizontal no se imputan gastos de comunidad; los gastos de gestión inmobiliaria y formalización no son repercutibles (art. 20). La STS 5076/2025 sobre IBI solo vale para contratos con la redacción anterior.
6. **Desistimiento:** el art. 11.3 excluye la indemnización al arrendador. No recomendar la cláusula de «una mensualidad por año restante».
7. **Prórrogas:** art. 10 en la redacción del RDL 29/2026 (el RDL 28/2026 fue derogado por el Congreso; no citarlo, ni los RDL 26 y 27/2026). DF 5.ª: prórroga extraordinaria de hasta 2 años para contratos vigentes el 8-10-2026 cuya prórroga obligatoria acabe antes del 31-12-2028, si el inquilino está al corriente 8 meses; incompatible con la del art. 10.3.
8. **Desahucios:** suspensión de procesos con demandado vulnerable sin alternativa habitacional hasta el 31-12-2030 (art. 2 RDL), con compensación al demandante persona física; enervación extraordinaria del art. 22.6 LEC (dos meses para que la Administración ofrezca alternativa o pague; si no, se subroga), compatible con el requerimiento previo de 30 días; aplicable a ejecuciones en curso sin lanzamiento (DT 2.ª). No citar el RDL 2/2026 ni moratorias «hasta el 31-12-2026».
9. **Otros:** forma escrita obligatoria si la pide el inquilino (art. 37.2); reparaciones urgentes con presupuesto y 15 días naturales (art. 21.5); tanteo de 30 días naturales, precio imputado en ventas conjuntas y prohibición de pactar la renuncia (art. 25); gran tenedor = más de 10 inmuebles urbanos residenciales o más de 1.500 m² (art. 3.k Ley 12/2023 tras el art. 4 del RDL). Las CCAA pueden tener normas propias sobre vivienda temporal y habitaciones (DA 12.ª LAU).
10. **IRPF:** el art. 6 del RDL cambia la reducción del art. 23.2 LIRPF para contratos posteriores al 1-12-2026 y reescribe el art. 24 (parentesco) desde el 1-1-2027. Leer el BOE antes de escribir cifras.
11. **Cómo citar:** enlazar el artículo concreto: LAU consolidada `https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003#aN` (el 9 bis, el 21 bis, la DA 12.ª y la DT 8.ª no tienen ancla: enlazar `https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823#a3`), RDL `#a2` (desahucios), `#a4` (Ley 12/2023), `#a5` (LEC), `#df` (DF 5.ª y 6.ª), LEC `https://www.boe.es/buscar/act.php?id=BOE-A-2000-323#a22`. Si algo no se puede confirmar en el BOE, no se afirma.

## Productos, precios y autoría (no inventar)

- Precios y productos: copiar solo de `pricing.md` (contrato de vivienda habitual gratis con email; habitación 9,99 €; temporada 9,99 €; Kit Impago alquiler + MASC 49 €; Kit Impago facturas + MASC 49 €). La asesoría de 30 minutos se retiró el 2026-11-13: no existe `asesoria.html` ni el banner `data-asesoria-banner`; `/asesoria` redirige al revisor de contratos.
- CTA: `generador.html#<producto>`, `documentos.html`, `casos/<slug>.html` o una herramienta gratis (`/herramientas/revisar-contrato`).
- Autor: Person «Mario Calvo Castillo» (`https://asesorfy.app/sobre.html#mario`) con firma visible; publisher, la Organization Asesorfy.

## Log de publicaciones

(Se va rellenando: fecha — archivo — palabra clave)
2026-09-02 — blog-fallecimiento-inquilino-subrogacion-alquiler.html — qué pasa si fallece el inquilino
2026-08-28 — blog-inquilino-obras-sin-permiso.html — inquilino hace obras sin permiso
2026-08-27 — blog-inquilino-no-paga-suministros.html — inquilino no paga suministros
2026-08-26 — blog-vender-piso-alquilado.html — vender piso alquilado
2026-08-25 — blog-recuperar-vivienda-alquilada-uso-propio.html — recuperar vivienda alquilada uso propio
2026-08-24 — blog-prohibir-mascotas-alquiler.html — prohibir mascotas alquiler
2026-08-23 — blog-subarrendar-habitacion.html — subarrendar una habitacion
2026-08-17 — blog-recibo-alquiler.html — recibo de alquiler
2026-08-16 — blog-calcular-rentabilidad-alquiler.html — calcular rentabilidad alquiler
2026-06-25 — blog-desahucio-impago-2026.html — desahucio por impago 2026
2026-06-26 — blog-burofax-impago-alquiler.html — burofax impago alquiler
2026-06-27 — blog-oferta-vinculante-confidencial.html — oferta vinculante confidencial
2026-06-28 — blog-cuanto-tarda-un-desahucio.html — cuanto tarda un desahucio
2026-06-29 — blog-fichero-inquilinos-morosos.html — fichero inquilinos morosos
2026-07-01 — blog-reclamar-rentas-impagadas.html — reclamar rentas impagadas
2026-07-02 — blog-fianza-alquiler-habitacion.html — fianza alquiler habitacion
2026-07-03 — blog-normas-convivencia-piso-compartido.html — normas convivencia piso compartido
2026-07-04 — blog-empadronarse-habitacion-alquilada.html — empadronarse habitacion alquilada
2026-07-05 — blog-alquiler-habitaciones-declaracion-renta.html — alquiler habitaciones declaracion renta
2026-07-06 — blog-alquiler-temporada-o-turistico.html — alquiler temporada o turistico
2026-07-07 — blog-numero-registro-alquiler-nrua.html — numero registro alquiler nrua
2026-07-10 — blog-modelo-informativo-anual-arrendamientos.html — modelo informativo anual registro arrendamientos
2026-07-11 — blog-duracion-contrato-alquiler-2026.html — duracion contrato alquiler 2026
2026-07-15 — blog-como-hacer-contrato-alquiler-vivienda.html — como hacer contrato de alquiler
2026-07-15 — blog-devolucion-fianza-alquiler.html — devolucion fianza alquiler
2026-07-16 — blog-desistimiento-contrato-alquiler-inquilino.html — desistimiento contrato alquiler inquilino
2026-07-17 — blog-quien-paga-ibi-alquiler.html — quien paga ibi alquiler
2026-07-18 — blog-zonas-tensionadas-propietario.html — zonas tensionadas propietario
2026-07-21 — blog-carta-actualizacion-renta-alquiler.html — carta actualizacion renta alquiler
2026-07-22 — blog-reduccion-irpf-alquiler-vivienda.html — reduccion irpf alquiler vivienda
2026-07-23 — blog-seguro-impago-alquiler.html — seguro impago alquiler
2026-07-23 — blog-okupacion-vs-inquilino-moroso.html — diferencia okupa inquilino moroso
2026-07-25 — blog-reparaciones-alquiler-quien-paga.html — reparaciones alquiler quien paga
2026-07-25 — blog-inventario-contrato-alquiler.html — inventario contrato alquiler
2026-07-26 — blog-garantia-adicional-alquiler.html — garantia adicional alquiler
2026-07-28 — blog-certificado-energetico-alquiler.html — certificado energetico alquiler
2026-08-08 — blog-gastos-deducibles-alquiler-irpf.html — gastos deducibles alquiler irpf
2026-08-09 — blog-actualizar-fianza-alquiler.html — actualizar fianza alquiler
2026-06-24 — blog-habitacion.html — habitacion
2026-06-24 — blog-impago.html — impago
2026-06-24 — blog-temporada.html — temporada
