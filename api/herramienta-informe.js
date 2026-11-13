// Asesorfy: desbloquea el informe completo del revisor o del traductor y lo envía por email.
const { isAllowedOrigin, readBody, isEmail, clean, rateLimited, brevo, upsertContact, sender } = require('./_brevo');
const { open } = require('./_legal_ai');

const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const GRAV = { alta: '#b42318', media: '#b54708', baja: '#475467' };

function list(title, items) {
  if (!items || !items.length) return '';
  return `<h2 style="font:600 17px Georgia,serif;color:#0e1a2b;margin:26px 0 8px">${esc(title)}</h2><ul style="margin:0;padding-left:20px">${items.map(i => `<li style="margin:0 0 6px">${esc(i)}</li>`).join('')}</ul>`;
}

function html(tool, r) {
  const head = tool === 'revisar' ? 'Revisión de tu contrato' : 'Tu texto legal, en lenguaje claro';
  let body = `<p style="margin:0 0 6px;color:#5b6776;font-size:13px;text-transform:uppercase;letter-spacing:.08em">${esc(tool === 'revisar' ? r.tipo_contrato : r.tipo_texto)}</p>
<h1 style="font:600 24px Georgia,serif;color:#0e1a2b;margin:0 0 12px">${head}</h1>
<p style="margin:0 0 8px">${esc(r.resumen)}</p>`;
  if (tool === 'revisar') {
    body += `<p style="margin:12px 0 0"><b>Riesgo global: ${esc(r.nivel_riesgo)}</b></p>`;
    if (r.riesgos && r.riesgos.length) {
      body += `<h2 style="font:600 17px Georgia,serif;color:#0e1a2b;margin:26px 0 8px">Cláusulas a revisar</h2>` + r.riesgos.map(x => `
<div style="border-left:3px solid ${GRAV[x.gravedad] || '#475467'};padding:4px 0 4px 12px;margin:0 0 14px">
<div style="font-size:12px;font-weight:700;color:${GRAV[x.gravedad] || '#475467'};text-transform:uppercase">Gravedad ${esc(x.gravedad)} · ${esc(x.clausula)}</div>
<div style="margin:4px 0">${esc(x.problema)}</div>
<div style="color:#1d2a3d"><b>Qué hacer:</b> ${esc(x.que_hacer)}</div></div>`).join('');
    }
    body += list('Lo que falta', (r.faltan || []).map(f => f.punto + ': ' + f.por_que));
    body += list('Preguntas antes de firmar', r.preguntas);
  } else {
    if (r.explicacion && r.explicacion.length) {
      body += `<h2 style="font:600 17px Georgia,serif;color:#0e1a2b;margin:26px 0 8px">Parte por parte</h2>` + r.explicacion.map(x => `
<div style="margin:0 0 14px"><div style="color:#5b6776;font-style:italic">«${esc(x.original)}»</div><div style="margin-top:3px">${esc(x.claro)}</div></div>`).join('');
    }
    body += list('Lo que te obliga', r.obligaciones);
    body += list('Lo que te permite', r.derechos);
    body += list('Ojo con esto', r.ojo);
  }
  return `<div style="font:15px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#1d2a3d;max-width:640px;margin:0 auto;padding:24px">
${body}
<p style="margin:30px 0 0;padding-top:16px;border-top:1px solid #e6eaf0;color:#5b6776;font-size:13px">Este informe lo ha generado una inteligencia artificial a partir del texto que pegaste. Es información orientativa, no asesoramiento jurídico: antes de firmar algo importante, consúltalo con un abogado.<br>Asesorfy · <a href="https://asesorfy.app/herramientas" style="color:#1f5fa6">Más herramientas gratis</a></p></div>`;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'Método no permitido' }); return; }
  if (!isAllowedOrigin(req.headers.origin)) { res.status(403).json({ ok: false, error: 'Origen no permitido' }); return; }
  if (rateLimited(req, 8, 15 * 60 * 1000)) { res.status(429).json({ ok: false, error: 'Demasiados intentos. Espera unos minutos.' }); return; }

  const b = readBody(req);
  const email = clean(b.email, 254).toLowerCase();
  const marketing = b.marketing === true || b.marketing === 'true' || b.marketing === 'on';
  if (!isEmail(email)) { res.status(400).json({ ok: false, error: 'Escribe un email válido.' }); return; }

  let data;
  try { data = open(b.token); } catch (e) {
    res.status(400).json({ ok: false, error: 'El análisis ha caducado. Vuelve a analizar el texto.' }); return;
  }

  const subject = data.tool === 'revisar' ? 'La revisión de tu contrato' : 'Tu texto legal, en lenguaje claro';
  let sent = false;
  try {
    await brevo('/smtp/email', { sender: sender(), to: [{ email }], subject, htmlContent: html(data.tool, data.report) });
    sent = true;
    if (marketing) await upsertContact(email, { CONSENTIMIENTO: 'novedades-legales' }, data.tool === 'revisar' ? 'revisor-contratos' : 'traductor-legal').catch(() => {});
  } catch (e) {
    if (e.code !== 'not_configured') console.error('herramienta-informe', e && e.message);
  }
  // El informe se enseña en pantalla aunque el email falle: no hacemos pagar el error al usuario.
  res.status(200).json({ ok: true, sent, tool: data.tool, report: data.report });
};
