/* Asesorfy — alta en alertas normativas desde cualquier formulario con data-newsletter. */
(function () {
  function setMsg(form, text, ok) {
    var m = form.querySelector('[data-nl-msg]');
    if (!m) return;
    m.textContent = text;
    m.style.display = 'block';
    m.style.color = ok ? '#1d7a52' : '#b3261e';
  }
  function bind(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = (form.querySelector('input[type=email]') || {}).value || '';
      var consent = form.querySelector('input[name=consent]');
      var website = form.querySelector('input[name=website]');
      var btn = form.querySelector('button[type=submit]');
      if (consent && !consent.checked) { setMsg(form, 'Marca la casilla de consentimiento para recibir las alertas.', false); return; }
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Enviando…'; }
      fetch('/api/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, consent: !consent || consent.checked, website: website ? website.value : '', source: form.getAttribute('data-newsletter') || location.pathname })
      })
        .then(function (r) { return r.json().then(function (d) { return { status: r.status, d: d }; }); })
        .then(function (x) {
          if (x.d && x.d.ok) {
            setMsg(form, 'Listo. Te avisaremos cuando cambie algo que afecte a tu alquiler.', true);
            form.reset();
            if (window.asesorfyTrack) asesorfyTrack('newsletter_subscribed', { source: form.getAttribute('data-newsletter') || location.pathname });
          } else if (x.d && x.d.error === 'not_configured') {
            setMsg(form, 'Las alertas se están activando. Mientras tanto, escríbenos a hola@asesorfy.app y te avisamos a mano.', false);
          } else {
            setMsg(form, (x.d && x.d.error) || 'No se pudo completar el alta. Inténtalo de nuevo.', false);
          }
        })
        .catch(function () { setMsg(form, 'No se pudo completar el alta. Inténtalo de nuevo.', false); })
        .then(function () { if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Avisarme'; } });
    });
  }
  function init() { document.querySelectorAll('form[data-newsletter]').forEach(bind); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}());
