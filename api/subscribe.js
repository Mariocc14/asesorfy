// Asesorfy — Alta en las alertas normativas por email (lista de contactos de Brevo).
const { isAllowedOrigin, readBody, isEmail, clean, rateLimited, upsertContact } = require('./_brevo');

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'Método no permitido' }); return; }
  if (!isAllowedOrigin(req.headers.origin)) { res.status(403).json({ ok: false, error: 'Origen no permitido' }); return; }
  if (rateLimited(req, 8, 10 * 60 * 1000)) { res.status(429).json({ ok: false, error: 'Demasiados intentos. Espera unos minutos.' }); return; }

  const b = readBody(req);
  if (clean(b.website, 100)) { res.status(200).json({ ok: true }); return; } // honeypot
  const email = clean(b.email, 254).toLowerCase();
  const source = clean(b.source, 120) || 'web';
  const consent = b.consent === true || b.consent === 'true' || b.consent === 'on';
  if (!isEmail(email)) { res.status(400).json({ ok: false, error: 'Escribe un email válido.' }); return; }
  if (!consent) { res.status(400).json({ ok: false, error: 'Necesitamos tu consentimiento para enviarte las alertas.' }); return; }

  try {
    await upsertContact(email, { CONSENTIMIENTO: 'alertas-normativas' }, source);
    res.status(200).json({ ok: true });
  } catch (e) {
    if (e.code === 'not_configured') { res.status(503).json({ ok: false, error: 'not_configured' }); return; }
    res.status(502).json({ ok: false, error: 'No se pudo completar el alta. Escríbenos a hola@asesorfy.app.' });
  }
};
