(function () {
  var TOKEN = 'phc_QPwTqqZbVEIwjiRz7bRvM2W8PXmBEgyjpIjHLq0zJQH';
  var initialized = false;

  function init() {
    if (initialized) return;
    initialized = true;
    !function (t, e) {
      var o, n, p, r;
      if (e.__SV || (window.posthog && window.posthog.__loaded)) return;
      window.posthog = e; e._i = [];
      e.init = function (i, s, a) {
        function g(t, e) { var o = e.split('.'); if (o.length === 2) { t = t[o[0]]; e = o[1]; } t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments))); }; }
        p = t.createElement('script'); p.type = 'text/javascript'; p.crossOrigin = 'anonymous'; p.async = true;
        p.src = s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js';
        r = t.getElementsByTagName('script')[0]; r.parentNode.insertBefore(p, r);
        var u = e; if (a !== undefined) u = e[a] = []; else a = 'posthog';
        u.people = u.people || []; u.toString = function () { return 'posthog'; }; u.people.toString = function () { return 'posthog.people'; };
        o = 'capture register register_once get_distinct_id opt_in_capturing opt_out_capturing'.split(' ');
        for (n = 0; n < o.length; n++) g(u, o[n]); e._i.push([i, s, a]);
      };
      e.__SV = 1;
    }(document, window.posthog || []);

    window.posthog.init(TOKEN, {
      api_host: 'https://eu.i.posthog.com',
      defaults: '2026-05-30',
      person_profiles: 'identified_only',
      persistence: 'localStorage+cookie',
      autocapture: false,
      capture_pageview: true,
      capture_pageleave: true,
      disable_session_recording: true,
      loaded: function (ph) { ph.register({ site: 'asesorfy', domain: location.hostname }); }
    });
  }

  window.asesorfyTrack = function (name, properties) {
    if (!initialized || !window.posthog) return;
    window.posthog.capture(name, Object.assign({ site: 'asesorfy', domain: location.hostname }, properties || {}));
  };

  document.addEventListener('DOMContentLoaded', function () {
    var originalConsent = window.ckSet;
    window.ckSet = function (accepted) {
      if (originalConsent) originalConsent(accepted);
      if (accepted) init();
    };

    try { if (localStorage.getItem('asesorfy_cookies') === 'accepted') init(); } catch (e) {}

    document.addEventListener('click', function (event) {
      var target = event.target.closest && event.target.closest('a,button');
      if (!target) return;
      var href = target.getAttribute('href') || '';
      if (/^(mailto:|tel:|https:\/\/cal\.com)/.test(href)) {
        window.asesorfyTrack('contact_cta_clicked', { destination: href.split('?')[0], label: (target.textContent || '').trim().slice(0, 80) });
      }
    });
  });
}());
