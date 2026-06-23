// Asesorfy — Crea una sesión de pago de Stripe Checkout.
// El precio NUNCA lo decide el cliente: lo fija el servidor según el documento.
// Requiere la variable de entorno STRIPE_SECRET_KEY (configúrala en Vercel).

const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Catálogo y precios en céntimos de euro (fuente de verdad en el servidor).
const PRODUCTS = {
  'contrato-larga':      { name: 'Contrato de larga duración',  amount: 599 },
  'contrato-habitacion': { name: 'Contrato de habitación 2026', amount: 999 },
  'contrato-temporada':  { name: 'Contrato de temporada 2026',  amount: 999 },
  'ovc-impago':          { name: 'Kit Impago + MASC 2026',      amount: 2900 }
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }
  try {
    // Vercel parsea el body JSON automáticamente; por si acaso, lo contemplamos.
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const doc = body.doc;
    const product = PRODUCTS[doc];
    if (!product) {
      res.status(400).json({ error: 'Documento no válido' });
      return;
    }

    const proto = (req.headers['x-forwarded-proto'] || 'https');
    const origin = req.headers.origin || (proto + '://' + req.headers.host);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'eur',
          product_data: { name: 'Asesorfy — ' + product.name },
          unit_amount: product.amount
        }
      }],
      // Al pagar, Stripe devuelve al generador con el documento desbloqueado.
      success_url: origin + '/generador.html?doc=' + doc + '&paid=1&session_id={CHECKOUT_SESSION_ID}#' + doc,
      cancel_url: origin + '/generador.html#' + doc,
      metadata: { doc: doc }
    });

    res.status(200).json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
