// Asesorfy: revisor de contratos y traductor legal. Devuelve el resumen gratuito
// y el informe completo cifrado (se desbloquea con el email en /api/herramienta-informe).
const { isAllowedOrigin, readBody, clean, rateLimited } = require('./_brevo');
const { MAX_CHARS, analyze, preview, seal } = require('./_legal_ai');

const TOOLS = ['revisar', 'traducir'];

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'Método no permitido' }); return; }
  if (!isAllowedOrigin(req.headers.origin)) { res.status(403).json({ ok: false, error: 'Origen no permitido' }); return; }

  const b = readBody(req);
  if (clean(b.website, 100)) { res.status(200).json({ ok: false, error: 'No se pudo analizar.' }); return; } // honeypot
  const tool = TOOLS.includes(b.tool) ? b.tool : null;
  if (!tool) { res.status(400).json({ ok: false, error: 'Herramienta no válida.' }); return; }
  const text = clean(b.text, MAX_CHARS + 1);
  if (text.length < 200) { res.status(400).json({ ok: false, error: 'Pega un texto más largo: al menos un par de párrafos.' }); return; }
  if (text.length > MAX_CHARS) { res.status(400).json({ ok: false, error: 'El texto es demasiado largo. Pega como máximo unas 25 páginas (60.000 caracteres).' }); return; }
  if (rateLimited(req, 5, 15 * 60 * 1000)) { res.status(429).json({ ok: false, error: 'Has hecho varios análisis seguidos. Espera unos minutos y vuelve a probar.' }); return; }

  try {
    const report = await analyze(tool, text);
    const out = { ok: true, preview: preview(tool, report) };
    if (report.es_valido) out.token = seal({ tool, report, exp: Date.now() + 2 * 60 * 60 * 1000 });
    res.status(200).json(out);
  } catch (e) {
    if (e.code === 'not_configured') { res.status(503).json({ ok: false, error: 'La herramienta no está disponible ahora mismo. Escríbenos a hola@asesorfy.app.' }); return; }
    if (e.code === 'refusal') { res.status(422).json({ ok: false, error: 'No podemos analizar este texto. Prueba con otro documento.' }); return; }
    if (e.code === 'too_long') { res.status(422).json({ ok: false, error: 'El análisis ha salido demasiado largo. Prueba con una parte del documento.' }); return; }
    console.error('herramienta-ia', tool, e && e.message);
    res.status(502).json({ ok: false, error: 'No se pudo completar el análisis. Inténtalo de nuevo en un momento.' });
  }
};
