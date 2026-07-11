// Asesorfy — Crea una sesión de pago de Stripe Checkout.
// El precio NUNCA lo decide el cliente: lo fija el servidor según el producto.
// Requiere la variable de entorno STRIPE_SECRET_KEY (configúrala en Vercel).

const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Catálogo y precios en céntimos de euro (fuente de verdad en el servidor).
const PRODUCTS = {
  'contrato-larga':      { name: 'Contrato de larga duración',  amount: 599 },
  'contrato-habitacion': { name: 'Contrato de habitación 2026', amount: 999 },
  'contrato-temporada':  { name: 'Contrato de temporada 2026',  amount: 999 },
  'ovc-impago':          { name: 'Kit Impago + MASC 2026',      amount: 2900 },
  'asesoria':            { name: 'Asesoría legal · 30 min',     amount: 2000 }
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
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

    const proto = (req.headers['x-forwarded-proto'] || 'https');
    const origin = req.headers.origin || (proto + '://' + req.headers.host);

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
      payment_method_types: ['card'],
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'eur',
          product_data: { name: name },
          unit_amount: product.amount
        }
      }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: metadata
    });

    res.status(200).json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
