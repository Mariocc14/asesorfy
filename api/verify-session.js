// Asesorfy — Verifica que una sesión de Stripe está pagada antes de desbloquear.
// Requiere la variable de entorno STRIPE_SECRET_KEY.

const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  try {
    const id = req.query.session_id;
    if (!id) {
      res.status(400).json({ paid: false, error: 'Falta session_id' });
      return;
    }
    const session = await stripe.checkout.sessions.retrieve(id);
    res.status(200).json({
      paid: session.payment_status === 'paid',
      doc: session.metadata && session.metadata.doc
    });
  } catch (e) {
    res.status(500).json({ paid: false, error: e.message });
  }
};
