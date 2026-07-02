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
- [ ] Normas de convivencia en piso compartido (con modelo) — kw: "normas convivencia piso compartido"
- [ ] Empadronarse en una habitación alquilada: ¿se puede? — kw: "empadronarse habitacion alquilada"
- [ ] Alquiler de habitaciones e IRPF: cómo tributa — kw: "alquiler habitaciones declaracion renta"

### Clúster Temporada → enlaza a generador.html#contrato-temporada
- [ ] Alquiler de temporada vs alquiler turístico: diferencias clave — kw: "alquiler temporada o turistico"
- [ ] Número de registro NRUA paso a paso (Ventanilla Única) — kw: "numero registro alquiler nrua"
- [ ] El modelo informativo anual de febrero del registro de arrendamientos — kw: "modelo anual registro arrendamientos"

### Clúster Larga duración → enlaza a generador.html#contrato-larga
- [ ] Duración del contrato de alquiler en 2026: prórrogas de la LAU — kw: "duracion contrato alquiler 2026"
- [ ] Cómo hacer un contrato de alquiler de vivienda paso a paso — kw: "como hacer contrato de alquiler"
- [ ] Devolución de la fianza: plazos y descuentos por desperfectos — kw: "devolucion fianza alquiler"
- [ ] Desistimiento del inquilino: preaviso y penalización (art. 11 LAU) — kw: "desistimiento contrato alquiler inquilino"
- [ ] IBI, comunidad y suministros: ¿quién paga en el alquiler? — kw: "quien paga ibi alquiler"
- [ ] Zonas tensionadas: qué son y cómo afectan al casero — kw: "zonas tensionadas propietario"

### Clúster Subida de renta / fiscalidad → enlaza al artículo IRAV y a documentos.html
- [ ] IRAV vs IPC: cuál aplico a mi contrato — kw: "irav o ipc alquiler"
- [ ] Cómo actualizar la renta del alquiler paso a paso (carta modelo) — kw: "carta actualizacion renta alquiler"
- [ ] Fiscalidad del alquiler 2026: reducciones del IRPF para propietarios — kw: "reduccion irpf alquiler vivienda"
- [ ] Seguro de impago de alquiler: ¿merece la pena? — kw: "seguro impago alquiler"
- [ ] Okupación vs inquilino moroso: diferencias legales — kw: "diferencia okupa inquilino moroso"

---

## Checklist SEO obligatorio (Google)

Cada artículo DEBE cumplir:

1. **Investigación previa:** buscar en la web la normativa española **vigente al día de hoy** y verificar cada dato. Fuentes fiables: BOE, INE, Agencia Tributaria, Ministerio de Vivienda, AEPD. Nada inventado.
2. **Palabra clave principal** en: título (H1), `<title>`, meta description, primer párrafo, una H2 y el slug del archivo.
3. **Slug descriptivo** del archivo: `blog-<palabras-clave-con-guiones>.html` (sin acentos ni mayúsculas).
4. **Estructura:** H1 único, varias H2/H3 con palabras clave semánticas (LSI). Párrafos cortos. Listas cuando aporten.
5. **Longitud:** 900–1.500 palabras de valor real (no relleno).
6. **Enlaces internos:** 2–4 a otros artículos del blog y al producto/generador relacionado.
7. **Enlaces externos** a 1–2 fuentes oficiales (BOE, INE…) con `rel="noopener"`.
8. **Meta:** `<title>` (~60 caracteres) y `<meta name="description">` (~155 caracteres) únicos.
9. **Open Graph:** og:title, og:description, og:type=article.
10. **Datos estructurados JSON-LD:** `Article` (con headline, datePublished, author Asesorfy, publisher) y, si hay preguntas, `FAQPage`.
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

## Log de publicaciones

(Se va rellenando: fecha — archivo — palabra clave)
2026-06-25 — blog-desahucio-impago-2026.html — desahucio por impago 2026
2026-06-26 — blog-burofax-impago-alquiler.html — burofax impago alquiler
2026-06-27 — blog-oferta-vinculante-confidencial.html — oferta vinculante confidencial
2026-06-28 — blog-cuanto-tarda-un-desahucio.html — cuanto tarda un desahucio
2026-06-29 — blog-fichero-inquilinos-morosos.html — fichero inquilinos morosos
2026-07-01 — blog-reclamar-rentas-impagadas.html — reclamar rentas impagadas
2026-07-02 — blog-fianza-alquiler-habitacion.html — fianza alquiler habitacion
