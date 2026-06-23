# Asesorfy — Cómo poner la web online en Vercel con pagos de Stripe

Todo está ya programado. Estos son los pasos que tienes que dar **tú** (requieren tus cuentas y tu tarjeta; yo no puedo hacerlos por ti). En total, una tarde.

---

## Qué hay en la carpeta

```
index.html              · Web principal (carrusel de documentos)
documentos.html         · Catálogo con buscador
generador.html          · Generador interactivo + pago Stripe
blog.html + blog-*.html · Blog y 4 artículos
documentos/             · PDFs sueltos (muestras)
package.json            · Dependencia de Stripe
api/
  ├─ create-checkout-session.js  · Crea el pago (precio fijado en servidor)
  └─ verify-session.js           · Verifica que el pago se completó
```

La web es estática; las dos funciones de `api/` son el "backend mínimo" que Vercel ejecuta sin servidor.

---

## Paso 1 — Crea las cuentas (gratis)

1. **Vercel**: regístrate en https://vercel.com (con tu GitHub o email).
2. **Stripe**: crea cuenta en https://stripe.com. Empieza en **modo test** (no cobra de verdad).

## Paso 2 — Sube el proyecto a Vercel

Opción rápida (sin Git):
1. En Vercel, pulsa **Add New → Project → Deploy** y arrastra esta carpeta completa.

Opción recomendada (con GitHub, para poder actualizar fácil):
1. Sube esta carpeta a un repositorio de GitHub.
2. En Vercel: **Add New → Project → Import** y selecciona el repo.
3. Framework Preset: **Other** (es estático). Pulsa **Deploy**.

Vercel detecta solo la carpeta `api/` como funciones e instala Stripe gracias al `package.json`.

## Paso 3 — Pon tu clave secreta de Stripe

1. En Stripe → **Developers → API keys**, copia la **Secret key** (en test empieza por `sk_test_...`).
2. En Vercel → tu proyecto → **Settings → Environment Variables**, añade:
   - **Name:** `STRIPE_SECRET_KEY`
   - **Value:** tu `sk_test_...`
3. Pulsa **Save** y luego **Redeploy** (Deployments → ... → Redeploy) para que tome la variable.

> ⚠️ La clave secreta va SOLO aquí, nunca en el código ni en el navegador. Por eso hace falta el backend.

## Paso 4 — Prueba el pago (modo test)

1. Abre tu web de Vercel, entra en un documento y pulsa **Pagar**.
2. En la pantalla de Stripe usa la tarjeta de prueba: **4242 4242 4242 4242**, fecha futura cualquiera, CVC cualquiera.
3. Al pagar, vuelves al generador con el documento **desbloqueado** y listo para descargar (Vista PDF / imprimir).

## Paso 5 — Conecta tu dominio

1. Compra `asesorfy.es` (en cualquier registrador: Namecheap, Dinahosting, IONOS...).
2. En Vercel → **Settings → Domains → Add**, escribe `asesorfy.es`.
3. Vercel te dirá qué apuntar (un registro A o CNAME) en el panel de tu registrador. Lo copias y listo (tarda unos minutos en propagar).

## Paso 6 — Pasar a cobrar de verdad

1. En Stripe, completa la **activación de la cuenta** (datos fiscales y cuenta bancaria).
2. Cambia a **modo live**, copia la **Secret key** real (`sk_live_...`).
3. Sustituye `STRIPE_SECRET_KEY` en Vercel por la clave live y **Redeploy**.
4. A partir de ahí, los pagos son reales y el dinero entra en tu cuenta de Stripe.

---

## Notas importantes

- **Precios:** se fijan en el servidor (`api/create-checkout-session.js`), no en el navegador, para que nadie los manipule. Si cambias un precio, edítalo ahí (en céntimos: 5,99€ = `599`) **y** en la web.
- **Entrega del documento:** ahora, tras pagar, el documento se desbloquea y se descarga vía "imprimir a PDF". Más adelante conviene enviarlo también por email automático (con un webhook de Stripe) y, si quieres, generar el PDF en el servidor. Es el siguiente paso natural.
- **Endurecer seguridad:** el desbloqueo verifica la sesión de pago con `verify-session`. Para mayor robustez, lo ideal es añadir un **webhook** de Stripe que confirme el pago de forma definitiva. No es imprescindible para arrancar.
- **Aviso legal y RGPD:** antes de vender de verdad, añade páginas de Aviso legal, Política de privacidad, Términos de compra y Política de cookies. Son obligatorias para un ecommerce en España.
