# Asesorfy

Documentos legales para propietarios en España, actualizados a la normativa de 2026.
Web estática + generador interactivo de documentos + pago con Stripe (funciones serverless en Vercel).

## Estructura

```
index.html                 Web principal (carrusel de documentos)
documentos.html            Catálogo con buscador
generador.html             Generador interactivo + pago Stripe
blog.html, blog-*.html     Blog y artículos (SEO)
documentos/                PDFs de muestra
package.json               Dependencia de Stripe
api/
  ├─ create-checkout-session.js   Crea el pago (precio fijado en el servidor)
  └─ verify-session.js            Verifica el pago antes de desbloquear
```

## Despliegue (resumen)

1. Importa este repositorio en **Vercel** (Framework Preset: *Other*).
2. En Vercel → Settings → Environment Variables, añade `STRIPE_SECRET_KEY` con tu clave de Stripe.
3. Redeploy. Conecta tu dominio en Settings → Domains.

Pasos detallados en **LEEME-despliegue.md**.

## Notas

- Los precios se fijan en el servidor (`api/create-checkout-session.js`), en céntimos.
- Pendiente para producción: email automático tras el pago (webhook de Stripe) y páginas legales (aviso legal, privacidad, términos, cookies).
- Contenido informativo; no constituye asesoramiento jurídico. Normativa: España.

## Blog automático (tarea diaria)

Cada día una tarea programada de Claude escribe, valida y publica un artículo SEO/AEO del blog.

```
editorial/topic-queue.json     Cola de temas (pending → done). Se rellena sola cuando quedan menos de 5.
plan-editorial-seo.md          Checklists SEO y AEO/GEO + log de publicaciones.
scripts/blog-worktree.sh       open | publish <ruta> "<msg>" | close <ruta>. Trabaja en /tmp, nunca en este directorio.
scripts/validate-blog.mjs      Valida meta, canonical, JSON-LD (Article + FAQPage espejo), tablas, fuentes, enlaces, sitemap, llms.txt.
scripts/build-llms.mjs         Regenera llms.txt (contexto para ChatGPT, Perplexity, Claude…). No editar a mano.
llms.txt                       Índice del sitio en formato llmstxt.org.
```

Cada push a `main` despliega en Vercel. Para probar a mano: `node scripts/validate-blog.mjs . blog-<slug>.html`.
