// Asesorfy — utilidades compartidas para las funciones de contacto y alertas (Brevo).
// Variables de entorno (Vercel → Settings → Environment Variables):
//   BREVO_API_KEY        clave de API v3 de Brevo (obligatoria para enviar y suscribir)
//   BREVO_SENDER_EMAIL   remitente verificado en Brevo (p. ej. hola@asesorfy.app)
//   BREVO_SENDER_NAME    nombre del remitente (por defecto "Asesorfy")
//   BREVO_LIST_ID        id numérico de la lista de contactos de Asesorfy (alertas normativas)
//   CONTACT_TO           buzón que recibe las consultas (por defecto hola@asesorfy.app)

const ALLOWED_ORIGINS = ['https://asesorfy.app', 'https://www.asesorfy.app'];

function isAllowedOrigin(origin) {
  if (!origin) return true; // llamadas same-origin sin cabecera Origin
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  return /^https:\/\/asesorfy[a-z0-9-]*\.vercel\.app$/.test(origin);
}

function readBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  return req.body;
}

function isEmail(s) {
  return typeof s === 'string' && s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
}

function clean(s, max) {
  // Elimina caracteres de control (salvo tabulador y saltos de línea) y recorta.
  return String(s == null ? '' : s).replace(/[^\P{Cc}\t\n\r]/gu, '').trim().slice(0, max);
}

// Límite básico por IP dentro de la misma instancia (suficiente contra el spam tonto).
const hits = new Map();
function rateLimited(req, max, windowMs) {
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || (req.socket && req.socket.remoteAddress) || 'anon';
  const now = Date.now();
  const list = (hits.get(ip) || []).filter(t => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > max;
}

async function brevo(path, payload) {
  const key = process.env.BREVO_API_KEY;
  if (!key) { const e = new Error('not_configured'); e.code = 'not_configured'; throw e; }
  const r = await fetch('https://api.brevo.com/v3' + path, {
    method: 'POST',
    headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!r.ok) {
    const txt = await r.text().catch(() => '');
    const e = new Error('brevo_' + r.status + ' ' + txt.slice(0, 200)); e.code = 'brevo'; e.status = r.status; throw e;
  }
  return r.status === 204 ? {} : r.json().catch(() => ({}));
}

async function upsertContact(email, attributes, source) {
  const listId = parseInt(process.env.BREVO_LIST_ID || '', 10);
  const payload = {
    email,
    attributes: Object.assign({ ORIGEN: source || 'web', FECHA_ALTA: new Date().toISOString().slice(0, 10) }, attributes || {}),
    updateEnabled: true
  };
  if (listId) payload.listIds = [listId];
  try {
    return await brevo('/contacts', payload);
  } catch (e) {
    // Un contacto ya existente se trata como éxito.
    if (e.status === 400 && /duplicate|already exist/i.test(e.message)) return {};
    throw e;
  }
}

function sender() {
  return {
    name: process.env.BREVO_SENDER_NAME || 'Asesorfy',
    email: process.env.BREVO_SENDER_EMAIL || 'hola@asesorfy.app'
  };
}

module.exports = { isAllowedOrigin, readBody, isEmail, clean, rateLimited, brevo, upsertContact, sender };
