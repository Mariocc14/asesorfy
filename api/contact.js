// Asesorfy — Formulario de contacto: envía la consulta por email (Brevo transaccional)
// y, si el usuario lo pide, lo da de alta en las alertas normativas.
const { isAllowedOrigin, readBody, isEmail, clean, rateLimited, brevo, upsertContact, sender } = require('./_brevo');

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'Método no permitido' }); return; }
  if (!isAllowedOrigin(req.headers.origin)) { res.status(403).json({ ok: false, error: 'Origen no permitido' }); return; }
  if (rateLimited(req, 5, 10 * 60 * 1000)) { res.status(429).json({ ok: false, error: 'Demasiados envíos. Espera unos minutos.' }); return; }

  const b = readBody(req);
  if (clean(b.website, 100)) { res.status(200).json({ ok: true }); return; } // honeypot: los bots rellenan "website"

  const name = clean(b.name, 120);
  const email = clean(b.email, 254).toLowerCase();
  const message = clean(b.message, 4000);
  const subscribe = b.subscribe === true || b.subscribe === 'true' || b.subscribe === 'on';
  const page = clean(b.page, 200);

  if (!name || !isEmail(email) || message.length < 10) {
    res.status(400).json({ ok: false, error: 'Revisa el nombre, el email y el mensaje (mínimo 10 caracteres).' });
    return;
  }

  try {
    await brevo('/smtp/email', {
      sender: sender(),
      to: [{ email: process.env.CONTACT_TO || 'hola@asesorfy.app', name: 'Asesorfy' }],
      replyTo: { email, name },
      subject: 'Consulta web de ' + name,
      textContent:
        'Nombre: ' + name + '\nEmail: ' + email + '\nPágina: ' + (page || '-') + '\nAlertas: ' + (subscribe ? 'sí' : 'no') +
        '\n\n' + message + '\n\n— Enviado desde el formulario de asesorfy.app',
      tags: ['asesorfy', 'contacto']
    });
    if (subscribe) {
      try { await upsertContact(email, { NOMBRE: name }, 'contacto'); } catch (e) { /* no bloquea la consulta */ }
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    if (e.code === 'not_configured') { res.status(503).json({ ok: false, error: 'not_configured' }); return; }
    res.status(502).json({ ok: false, error: 'No se pudo enviar la consulta. Escríbenos a hola@asesorfy.app.' });
  }
};
