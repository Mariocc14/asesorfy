/* Asesorfy: comportamiento de la home de empresas y de las herramientas gratis. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var track = function (n, p) { try { if (window.asesorfyTrack) window.asesorfyTrack(n, p || {}); } catch (e) {} };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var norm = function (s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
  var post = function (url, body) {
    return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { d.status = r.status; return d; }); });
  };

  /* ---------- Menú del móvil ---------- */
  var mb = $('.menu-btn'), nav = $('#nav');
  if (mb && nav) {
    mb.addEventListener('click', function () { var o = !nav.classList.contains('open'); nav.classList.toggle('open', o); mb.setAttribute('aria-expanded', o); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); mb.focus(); } });
  }
  $$('[data-cta]').forEach(function (a) { a.addEventListener('click', function () { track('cta_click', { cta: a.getAttribute('data-cta') }); }); });

  /* ---------- Buscador de la home ---------- */
  var sf = $('[data-search]');
  if (sf && window.ASESORFY_INDEX) {
    var input = $('input', sf), box = $('.answers', sf), sel = -1, results = [];
    var STOP = { de: 1, la: 1, el: 1, los: 1, las: 1, un: 1, una: 1, y: 1, o: 1, a: 1, en: 1, para: 1, por: 1, mi: 1, tu: 1, que: 1, con: 1, del: 1, al: 1, se: 1, me: 1, como: 1, hacer: 1, quiero: 1, necesito: 1 };
    var docs = window.ASESORFY_INDEX.map(function (d) { return { d: d, t: norm(d.t), k: norm(d.k), x: norm(d.d) }; });
    var KIND = { tool: 'Herramienta gratis', doc: 'Documento', guide: 'Guía' };
    var ICN = {
      tool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16M6 16l9.5-9.5a2.1 2.1 0 0 1 3 3L9 19H6z"/></svg>',
      doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
      guide: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/></svg>'
    };
    var near = function (a, b) { // distancia de edición <= 1
      if (Math.abs(a.length - b.length) > 1) return false;
      var i = 0, j = 0, diff = 0;
      while (i < a.length && j < b.length) {
        if (a[i] === b[j]) { i++; j++; continue; }
        if (++diff > 1) return false;
        if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
      }
      return diff + (a.length - i) + (b.length - j) <= 1;
    };
    var hit = function (tok, field) {
      if (field.indexOf(tok) !== -1) return 1;
      if (tok.length < 5) return 0;
      var words = field.split(/[^a-z0-9ñ]+/);
      for (var i = 0; i < words.length; i++) { var w = words[i]; if (w.length > 3 && (near(tok, w) || near(tok, w.slice(0, tok.length)))) return .7; }
      return 0;
    };
    var search = function (q) {
      var toks = norm(q).split(/[^a-z0-9ñ]+/).filter(function (t) { return t.length > 1 && !STOP[t]; });
      if (!toks.length) return [];
      return docs.map(function (o) {
        var s = 0, matched = 0;
        toks.forEach(function (t) {
          var h = hit(t, o.t) * 3 + hit(t, o.k) * 2 + hit(t, o.x);
          if (h) matched++;
          s += h;
        });
        if (!matched) return null;
        s *= matched / toks.length;
        if (o.d.g === 'tool') s *= 1.35; else if (o.d.g === 'doc') s *= 1.15;
        return { o: o.d, s: s };
      }).filter(Boolean).sort(function (a, b) { return b.s - a.s; }).slice(0, 7).map(function (r) { return r.o; });
    };
    var mark = function (text, q) {
      var toks = norm(q).split(/[^a-z0-9ñ]+/).filter(function (t) { return t.length > 2 && !STOP[t]; });
      var out = esc(text);
      if (!toks.length) return out;
      var n = norm(out), res = '', i = 0;
      while (i < out.length) {
        var best = 0;
        toks.forEach(function (t) { if (n.substr(i, t.length) === t && (i === 0 || /[^a-z0-9ñ]/.test(n[i - 1]))) best = Math.max(best, t.length); });
        if (best) { res += '<mark>' + out.substr(i, best) + '</mark>'; i += best; } else { res += out[i]; i++; }
      }
      return res;
    };
    var render = function () {
      var q = input.value.trim();
      if (q.length < 2) { box.hidden = true; input.setAttribute('aria-expanded', 'false'); return; }
      results = search(q); sel = results.length ? 0 : -1;
      box.innerHTML = results.length ? results.map(function (r, i) {
        return '<a role="option" id="ans-' + i + '" href="' + esc(r.u) + '" aria-selected="' + (i === sel) + '"><span class="a-ic ' + r.g + '">' + ((r.i && window.ASESORFY_ICONS && window.ASESORFY_ICONS[r.i]) || ICN[r.g]) + '</span><span><b>' + mark(r.t, q) + '</b><small>' + esc(r.d) + '</small></span><span class="a-kind">' + KIND[r.g] + '</span></a>';
      }).join('') : '<div class="a-none">No encontramos nada con esas palabras. Prueba con «contrato», «privacidad» o «cookies», o <a href="#contacto">cuéntanos qué necesitas</a>.</div>';
      box.hidden = false; input.setAttribute('aria-expanded', 'true');
      if (sel >= 0) input.setAttribute('aria-activedescendant', 'ans-0'); else input.removeAttribute('aria-activedescendant');
    };
    var move = function (d) {
      if (!results.length) return;
      sel = (sel + d + results.length) % results.length;
      $$('a', box).forEach(function (a, i) { a.setAttribute('aria-selected', i === sel); if (i === sel) a.scrollIntoView({ block: 'nearest' }); });
      input.setAttribute('aria-activedescendant', 'ans-' + sel);
    };
    var tmr;
    input.addEventListener('input', function () { render(); clearTimeout(tmr); tmr = setTimeout(function () { if (input.value.trim().length > 2) track('home_search', { q: input.value.trim().slice(0, 80), results: results.length }); }, 1200); });
    input.addEventListener('focus', render);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Escape') { box.hidden = true; input.setAttribute('aria-expanded', 'false'); }
    });
    sf.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!results.length) render();
      var r = results[Math.max(sel, 0)];
      if (r) { track('home_search_go', { q: input.value.trim().slice(0, 80), to: r.u }); location.href = r.u; }
      else input.focus();
    });
    box.addEventListener('click', function (e) { var a = e.target.closest('a[role=option]'); if (a) track('home_search_go', { q: input.value.trim().slice(0, 80), to: a.getAttribute('href') }); });
    document.addEventListener('click', function (e) { if (!sf.contains(e.target)) { box.hidden = true; input.setAttribute('aria-expanded', 'false'); } });
    $$('.chips [data-q]').forEach(function (b) {
      b.addEventListener('click', function () { input.value = b.getAttribute('data-q'); input.focus(); render(); track('home_chip', { q: input.value }); });
    });
  }

  /* ---------- Contacto ---------- */
  var cf = $('[data-contact]');
  if (cf) cf.addEventListener('submit', function (e) {
    e.preventDefault();
    var err = $('.err', cf), btn = $('button[type=submit]', cf), f = new FormData(cf);
    err.textContent = '';
    if (!f.get('consent')) { err.textContent = 'Marca la casilla para que podamos responderte.'; return; }
    btn.disabled = true; btn.textContent = 'Enviando…';
    post('/api/contact', { name: f.get('name'), email: f.get('email'), message: f.get('message'), website: f.get('website'), page: location.pathname })
      .then(function (d) {
        if (d.ok) { cf.innerHTML = '<h3 style="font-size:20px;margin-bottom:6px">Recibido</h3><p style="color:var(--muted)">Te respondemos en uno o dos días laborables.</p>'; track('contact_sent', { page: location.pathname }); }
        else { err.textContent = d.error === 'not_configured' ? 'Escríbenos a hola@asesorfy.app mientras activamos el formulario.' : (d.error || 'No se pudo enviar. Inténtalo de nuevo.'); }
      })
      .catch(function () { err.textContent = 'No se pudo enviar. Inténtalo de nuevo.'; })
      .then(function () { if (btn.isConnected) { btn.disabled = false; btn.textContent = 'Enviar mensaje'; } });
  });

  /* ---------- Generadores de textos legales ---------- */
  var gf = $('form[data-gen]');
  if (gf) {
    var kind = gf.getAttribute('data-gen'), sheet = $('.sheet'), lastText = '', first = true;
    var read = function () {
      var f = new FormData(gf), d = { usos: {}, cookies: [] };
      f.forEach(function (v, k) {
        if (k === 'usos') d.usos[v] = true;
        else if (k === 'cookies') d.cookies.push(v);
        else d[k] = v;
      });
      d.internacional = !!f.get('internacional');
      return d;
    };
    var draw = function () {
      var d = read();
      $$('[data-only]', gf).forEach(function (el) { el.hidden = el.getAttribute('data-only') !== d.tipo; });
      var html = window.AsesorfyLegal[kind](d);
      if (html === lastText) return;
      lastText = html;
      sheet.innerHTML = html;
    };
    var ready = function () { if (window.AsesorfyLegal) { draw(); } else setTimeout(ready, 40); };
    ready();
    gf.addEventListener('input', function () { draw(); if (first) { first = false; track('generator_start', { tool: kind }); } });
    gf.addEventListener('change', draw);
    var plain = function () { return sheet.innerText.replace(/\n{3,}/g, '\n\n').trim(); };
    var download = function (name, type, content) {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([content], { type: type }));
      a.download = name; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    };
    var file = gf.getAttribute('data-file');
    var wrapDoc = function (body) { return '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>' + esc(file) + '</title><style>body{font:15px/1.6 Georgia,serif;max-width:760px;margin:40px auto;padding:0 20px;color:#1d2a3d}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:6px;text-align:left;vertical-align:top}</style></head><body>' + body + '</body></html>'; };
    $$('[data-act]').forEach(function (b) {
      b.addEventListener('click', function () {
        var act = b.getAttribute('data-act'), label = b.textContent;
        if (act === 'copy') {
          var done = function () { b.textContent = 'Copiado'; setTimeout(function () { b.textContent = label; }, 1600); };
          if (navigator.clipboard && window.ClipboardItem) {
            navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([sheet.innerHTML], { type: 'text/html' }), 'text/plain': new Blob([plain()], { type: 'text/plain' }) })]).then(done, function () { navigator.clipboard.writeText(plain()).then(done); });
          } else if (navigator.clipboard) navigator.clipboard.writeText(plain()).then(done);
        } else if (act === 'html') download(file + '.html', 'text/html;charset=utf-8', wrapDoc(sheet.innerHTML));
        else if (act === 'doc') download(file + '.doc', 'application/msword', '﻿' + wrapDoc(sheet.innerHTML));
        track('generator_export', { tool: kind, how: act });
      });
    });
  }

  /* ---------- Revisor de contratos y traductor legal ---------- */
  var af = $('form[data-ai]');
  if (af) {
    var tool = af.getAttribute('data-ai'), ta = $('textarea', af), out = $('[data-result]'), errEl = $('.err', af), btnA = $('button[type=submit]', af);
    var countEl = $('[data-count]', af), fileIn = $('input[type=file]', af), fileMsg = $('[data-file-msg]', af), MAX = 60000;
    var count = function () { var n = ta.value.length; countEl.textContent = n.toLocaleString('es-ES') + ' / 60.000 caracteres'; countEl.style.color = n > MAX ? 'var(--bad)' : ''; };
    ta.addEventListener('input', count); count();
    var load = function (src) { return new Promise(function (ok, ko) { var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = ko; document.head.appendChild(s); }); };
    fileIn.addEventListener('change', function () {
      var f = fileIn.files[0]; if (!f) return;
      fileMsg.textContent = 'Leyendo ' + f.name + '…';
      var name = f.name.toLowerCase(), job;
      if (name.endsWith('.txt')) job = f.text();
      else if (name.endsWith('.docx')) job = load('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js').then(function () { return f.arrayBuffer(); }).then(function (b) { return window.mammoth.extractRawText({ arrayBuffer: b }); }).then(function (r) { return r.value; });
      else if (name.endsWith('.pdf')) job = load('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js').then(function () {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        return f.arrayBuffer();
      }).then(function (b) { return window.pdfjsLib.getDocument({ data: b }).promise; }).then(function (pdf) {
        var pages = []; for (var i = 1; i <= Math.min(pdf.numPages, 60); i++) pages.push(pdf.getPage(i).then(function (p) { return p.getTextContent(); }).then(function (c) { return c.items.map(function (it) { return it.str; }).join(' '); }));
        return Promise.all(pages).then(function (t) { return t.join('\n\n'); });
      });
      else { fileMsg.textContent = 'Sube un PDF, un Word (.docx) o un .txt.'; return; }
      job.then(function (text) {
        text = String(text || '').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
        if (text.length < 50) { fileMsg.textContent = 'No hemos podido leer texto en el archivo. Si es un escaneo, copia y pega el texto.'; return; }
        ta.value = text; count(); fileMsg.textContent = f.name + ' cargado';
        track('ai_file_loaded', { tool: tool, type: name.split('.').pop() });
      }).catch(function () { fileMsg.textContent = 'No hemos podido leer el archivo. Prueba a copiar y pegar el texto.'; });
    });

    var list = function (title, items) { return items && items.length ? '<h3>' + title + '</h3><ul>' + items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' : ''; };
    var riskHtml = function (x) { return '<div class="risk"><div class="ref"><span class="badge ' + esc(x.gravedad) + '">' + esc(x.gravedad) + '</span>' + esc(x.clausula) + '</div><p>' + esc(x.problema) + '</p><p class="todo"><b>Qué hacer:</b> ' + esc(x.que_hacer) + '</p></div>'; };
    var pairHtml = function (x) { return '<div class="pair"><q>' + esc(x.original) + '</q><p>' + esc(x.claro) + '</p></div>'; };
    var tally = function (c) {
      return tool === 'revisar'
        ? [c.riesgos > 1 ? (c.riesgos - 1) + ' cláusulas más a revisar' : '', c.faltan ? c.faltan + ' puntos que faltan' : '', c.preguntas ? c.preguntas + ' preguntas antes de firmar' : '']
        : [c.partes > 1 ? (c.partes - 1) + ' partes más explicadas' : '', c.obligaciones ? c.obligaciones + ' obligaciones' : '', c.derechos ? c.derechos + ' derechos' : '', c.ojo ? c.ojo + ' puntos de atención' : ''];
    };
    var showPreview = function (p, token) {
      var head = '<div class="verdict">' + (tool === 'revisar' ? '<span class="badge ' + esc(p.nivel_riesgo) + '">Riesgo ' + esc(p.nivel_riesgo) + '</span>' : '') + '<span class="res-type">' + esc(p.tipo) + '</span></div><p class="res-sum">' + esc(p.resumen) + '</p>';
      var firstItem = p.primero ? (tool === 'revisar' ? '<h3 style="font-size:17px;margin:0 0 4px">La cláusula más importante</h3>' + riskHtml(p.primero) : pairHtml(p.primero)) : '';
      var chips = tally(p.cuentas).filter(Boolean).map(function (t) { return '<span>' + t + '</span>'; }).join('');
      out.innerHTML = '<div class="res">' + head + firstItem + '</div>' +
        '<form class="lock" novalidate><div class="tally">' + chips + '</div><h3>Recibe el informe completo gratis</h3><p>Te lo enviamos por email y lo ves aquí al momento.</p>' +
        '<div class="inline"><label class="field" style="margin:0;flex:1"><span class="hp">Email</span><input type="email" name="email" placeholder="tu@email.com" autocomplete="email" required></label><button class="btn" type="submit">Ver informe completo</button></div>' +
        '<label class="consent" style="margin-top:10px"><input type="checkbox" name="marketing"> Quiero recibir novedades legales de Asesorfy (opcional).</label>' +
        '<p style="font-size:12.5px;margin:0">Usamos tu email para enviarte este informe. <a href="/privacidad.html">Privacidad</a>.</p><div class="err" role="alert"></div></form>' +
        '<p class="note">Análisis orientativo generado con inteligencia artificial. No es asesoramiento jurídico.</p>';
      var lf = $('.lock', out);
      lf.addEventListener('submit', function (e) {
        e.preventDefault();
        var le = $('.err', lf), lb = $('button', lf), email = $('input[name=email]', lf).value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { le.textContent = 'Escribe un email válido.'; return; }
        lb.disabled = true; lb.textContent = 'Enviando…'; le.textContent = '';
        post('/api/herramienta-informe', { token: token, email: email, marketing: $('input[name=marketing]', lf).checked })
          .then(function (d) {
            if (!d.ok) { le.textContent = d.error || 'No se pudo enviar. Inténtalo de nuevo.'; lb.disabled = false; lb.textContent = 'Ver informe completo'; return; }
            showFull(d.report, d.sent, email);
            track('ai_report_unlocked', { tool: tool, sent: !!d.sent });
          })
          .catch(function () { le.textContent = 'No se pudo enviar. Inténtalo de nuevo.'; lb.disabled = false; lb.textContent = 'Ver informe completo'; });
      });
    };
    var showFull = function (r, sent, email) {
      var h = '<div class="verdict">' + (tool === 'revisar' ? '<span class="badge ' + esc(r.nivel_riesgo) + '">Riesgo ' + esc(r.nivel_riesgo) + '</span>' : '') + '<span class="res-type">' + esc(tool === 'revisar' ? r.tipo_contrato : r.tipo_texto) + '</span></div><p class="res-sum">' + esc(r.resumen) + '</p>';
      if (tool === 'revisar') {
        h += (r.riesgos || []).length ? '<h3>Cláusulas a revisar</h3>' + r.riesgos.map(riskHtml).join('') : '<p>No hemos visto cláusulas especialmente arriesgadas.</p>';
        h += list('Lo que falta', (r.faltan || []).map(function (f) { return f.punto + ': ' + f.por_que; }));
        h += list('Preguntas antes de firmar', r.preguntas);
      } else {
        h += (r.explicacion || []).length ? '<h3>Parte por parte</h3>' + r.explicacion.map(pairHtml).join('') : '';
        h += list('Lo que te obliga', r.obligaciones) + list('Lo que te permite', r.derechos) + list('Ojo con esto', r.ojo);
      }
      out.innerHTML = '<div class="res">' + (sent ? '<p class="badge bajo" style="margin-bottom:14px">Enviado a ' + esc(email) + '</p>' : '') + h + '</div><p class="note">Análisis orientativo generado con inteligencia artificial. No es asesoramiento jurídico: antes de firmar algo importante, consúltalo con un abogado.</p>';
      out.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    af.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = ta.value.trim(); errEl.textContent = '';
      if (text.length < 200) { errEl.textContent = 'Pega un texto más largo: al menos un par de párrafos.'; return; }
      if (text.length > MAX) { errEl.textContent = 'El texto es demasiado largo. Pega como máximo unas 25 páginas.'; return; }
      btnA.disabled = true; var label = btnA.textContent; btnA.textContent = 'Analizando…';
      out.innerHTML = '<div class="loading"><p>' + (tool === 'revisar' ? 'Leyendo el contrato y buscando cláusulas de riesgo…' : 'Leyendo el texto y traduciéndolo a lenguaje claro…') + ' Suele tardar entre 20 y 40 segundos.</p><div class="line" style="width:92%"></div><div class="line" style="width:78%"></div><div class="line" style="width:85%"></div><div class="line" style="width:60%"></div></div>';
      if (window.matchMedia('(max-width: 900px)').matches) out.scrollIntoView({ behavior: 'smooth', block: 'start' });
      track('ai_run', { tool: tool, chars: text.length });
      post('/api/herramienta-ia', { tool: tool, text: text, website: (af.querySelector('[name=website]') || {}).value || '' })
        .then(function (d) {
          if (!d.ok) { out.innerHTML = '<div class="empty"><h3>No se pudo analizar</h3><p>' + esc(d.error || 'Inténtalo de nuevo en un momento.') + '</p></div>'; track('ai_error', { tool: tool, status: d.status }); return; }
          if (!d.preview.es_valido) { out.innerHTML = '<div class="empty"><h3>Esto no parece un texto legal</h3><p>' + esc(d.preview.motivo || 'Pega un contrato o un texto legal.') + '</p></div>'; return; }
          showPreview(d.preview, d.token);
          track('ai_preview', { tool: tool });
        })
        .catch(function () { out.innerHTML = '<div class="empty"><h3>No se pudo analizar</h3><p>Revisa tu conexión e inténtalo de nuevo.</p></div>'; })
        .then(function () { btnA.disabled = false; btnA.textContent = label; });
    });
  }
})();
