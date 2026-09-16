// Asesorfy — Crea una sesión de pago de Stripe Checkout.
// El precio NUNCA lo decide el cliente: lo fija el servidor según el producto.
// Requiere la variable de entorno STRIPE_SECRET_KEY (configúrala en Vercel).

const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Catálogo y precios en céntimos de euro (fuente de verdad en el servidor).
const PRODUCTS = {
  'contrato-larga':      { name: 'Contrato de larga duración',  amount: 599,  description: 'Contrato de alquiler de vivienda habitual (LAU) en Word y PDF, con instrucciones de uso.' },
  'contrato-habitacion': { name: 'Contrato de habitación 2026', amount: 999,  description: 'Contrato de alquiler de habitación (Código Civil) en Word y PDF, con anexos de inventario y convivencia.' },
  'contrato-temporada':  { name: 'Contrato de temporada 2026',  amount: 999,  description: 'Contrato de alquiler de temporada (art. 3 LAU) en Word y PDF, con la causa de temporalidad redactada.' },
  'ovc-impago':          { name: 'Kit Impago + MASC 2026',      amount: 2900, description: 'Oferta Vinculante Confidencial (LO 1/2025) en Word y PDF, instrucciones de burofax y checklist para la demanda.' },
  'asesoria':            { name: 'Asesoría legal · 30 min',     amount: 2000, description: 'Orientación de 30 minutos por videollamada sobre tu alquiler.' }
};

// Solo se permite volver a dominios propios: evita que un tercero cree pagos con marca Asesorfy
// que redirijan a su propia web.
const ALLOWED_ORIGINS = ['https://asesorfy.app', 'https://www.asesorfy.app'];
function safeOrigin(req) {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  if (/^https:\/\/asesorfy[a-z0-9-]*\.vercel\.app$/.test(origin)) return origin;
  if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return origin;
  return 'https://asesorfy.app';
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    res.status(503).json({ error: 'Pago no configurado' });
    return;
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const doc = body.doc;
    const product = PRODUCTS[doc];
    if (!product) {
      res.status(400).json({ error: 'Producto no válido' });
      return;
    }

    const origin = safeOrigin(req);
    let name = 'Asesorfy — ' + product.name;
    let metadata = { doc: doc };
    let successUrl, cancelUrl;

    if (doc === 'asesoria') {
      // Reserva de asesoría: incorpora día y hora elegidos.
      const fecha = String(body.fecha || '').slice(0, 20);
      const hora = String(body.hora || '').slice(0, 10);
      name = 'Asesorfy — Asesoría 30 min' + (fecha ? (' (' + fecha + ' ' + hora + ')') : '');
      metadata = { doc: doc, fecha: fecha, hora: hora };
      successUrl = origin + '/asesoria.html?reservado=1&session_id={CHECKOUT_SESSION_ID}';
      cancelUrl = origin + '/asesoria.html';
    } else {
      successUrl = origin + '/generador.html?doc=' + doc + '&paid=1&session_id={CHECKOUT_SESSION_ID}#' + doc;
      cancelUrl = origin + '/generador.html#' + doc;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      // Sin payment_method_types: Stripe ofrece los métodos activados en el panel
      // (tarjeta, Apple Pay, Google Pay, Bizum, Link…). Activa Bizum en Stripe → Settings → Payment methods.
      locale: 'es',
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'eur',
          product_data: { name: name, description: product.description },
          unit_amount: product.amount
        }
      }],
      client_reference_id: doc + '-' + Date.now(),
      custom_text: {
        submit: { message: doc === 'asesoria'
          ? 'Recibirás la confirmación de la cita y el enlace de videollamada por email.'
          : 'Descarga inmediata en Word y PDF al volver a Asesorfy. Al pagar aceptas el inicio inmediato de la descarga y las condiciones de contratación.' }
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: metadata
    });

    res.status(200).json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: 'No se pudo iniciar el pago' });
  }
};
