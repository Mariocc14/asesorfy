/* Asesorfy: motor de los generadores de textos legales para webs (España).
   Política de privacidad (RGPD art. 13 y LOPDGDD), aviso legal (LSSI-CE art. 10) y
   política de cookies (LSSI-CE art. 22.2 y Guía de cookies de la AEPD, 2023).
   Todo ocurre en el navegador: los datos del formulario no se envían a ningún servidor. */
(function () {
  'use strict';

  var esc = function (s) {
    return String(s == null ? '' : s).trim().replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };
  var hoy = function () {
    return new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  var p = function (t) { return '<p>' + t + '</p>'; };
  var h2 = function (t) { return '<h2>' + t + '</h2>'; };
  var ul = function (items) {
    items = items.filter(Boolean);
    return items.length ? '<ul>' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>' : '';
  };
  var web = function (d) { return esc(d.web || 'este sitio web').replace(/^https?:\/\//, '').replace(/\/$/, ''); };
  var titular = function (d) { return esc(d.nombre) || '[nombre o razón social]'; };
  var sociedad = function (d) { return d.tipo === 'sociedad'; };

  function fichaTitular(d) {
    return ul([
      '<b>Titular:</b> ' + titular(d) + (d.comercial ? ' (nombre comercial: ' + esc(d.comercial) + ')' : ''),
      '<b>' + (sociedad(d) ? 'CIF' : 'NIF') + ':</b> ' + (esc(d.nif) || '[NIF]'),
      '<b>Domicilio:</b> ' + (esc(d.domicilio) || '[domicilio]'),
      '<b>Email:</b> ' + (esc(d.email) || '[email de contacto]'),
      d.telefono ? '<b>Teléfono:</b> ' + esc(d.telefono) : '',
      sociedad(d) && d.registro ? '<b>Datos registrales:</b> ' + esc(d.registro) : '',
      d.dpo ? '<b>Delegado de protección de datos:</b> ' + esc(d.dpo) : ''
    ]);
  }

  /* ---------- Política de privacidad ---------- */
  function privacidad(d) {
    var u = d.usos || {};
    var trat = [];
    if (u.contacto) trat.push(['Responder a tus consultas', 'Cuando nos escribes por el formulario, el email o el teléfono: nombre, datos de contacto y el contenido de tu mensaje.', 'Tu consentimiento al enviarnos la consulta (art. 6.1.a RGPD) y, si nos pides información sobre nuestros servicios, la aplicación de medidas precontractuales (art. 6.1.b RGPD).', 'El tiempo necesario para responderte y, después, hasta un año, salvo que se convierta en una relación comercial.']);
    if (u.clientes) trat.push(['Gestionar pedidos, contratos y facturación', 'Datos identificativos, de contacto, de facturación y del pedido o servicio contratado. Los datos de la tarjeta los trata directamente la pasarela de pago; nosotros no tenemos acceso a ellos.', 'La ejecución del contrato (art. 6.1.b RGPD) y el cumplimiento de obligaciones legales, como las fiscales y contables (art. 6.1.c RGPD).', 'Mientras dure la relación y, después, durante los plazos que exige la ley (por ejemplo, seis años para la documentación contable, según el art. 30 del Código de Comercio).']);
    if (u.cuenta) trat.push(['Gestionar tu cuenta de usuario', 'Los datos que nos das al registrarte (email, nombre, contraseña cifrada) y tu actividad en la cuenta.', 'La ejecución del contrato o de las condiciones de uso que aceptas al registrarte (art. 6.1.b RGPD).', 'Mientras mantengas la cuenta activa. Si la cierras, la borramos salvo lo que debamos conservar por ley.']);
    if (u.newsletter) trat.push(['Enviarte comunicaciones comerciales y la newsletter', 'Tu email y, si nos los das, tu nombre y tus preferencias.', 'Tu consentimiento (art. 6.1.a RGPD y art. 21 LSSI-CE). Puedes retirarlo en cualquier momento desde el enlace de cada email.', 'Hasta que te des de baja.']);
    if (u.empleo) trat.push(['Valorar tu candidatura', 'Los datos de tu currículum y de las entrevistas.', 'Tu consentimiento al enviarnos el currículum (art. 6.1.a RGPD).', 'Un año desde que lo recibimos, salvo que nos pidas borrarlo antes.']);
    if (u.analitica) trat.push(['Medir el uso de la web', 'Datos de navegación (páginas visitadas, dispositivo, origen de la visita) mediante cookies de analítica.', 'Tu consentimiento, que das o rechazas en el aviso de cookies (art. 6.1.a RGPD y art. 22.2 LSSI-CE).', 'Según la duración de cada cookie, indicada en la política de cookies.']);
    if (u.redes) trat.push(['Atenderte en nuestras redes sociales', 'Tu perfil público y los mensajes que nos envíes por la red social.', 'Tu consentimiento al interactuar con nuestro perfil (art. 6.1.a RGPD). Cada red social trata tus datos según su propia política.', 'Mientras sigas nuestro perfil o sea necesario para atender tu mensaje.']);
    if (!trat.length) trat.push(['Gestionar la relación contigo', 'Los datos que nos facilites.', 'Tu consentimiento (art. 6.1.a RGPD).', 'El tiempo necesario para la finalidad para la que se recogieron.']);

    var tabla = '<table><thead><tr><th>Finalidad</th><th>Qué datos</th><th>Base legal</th><th>Cuánto tiempo</th></tr></thead><tbody>' +
      trat.map(function (t) { var L = ['Finalidad', 'Qué datos', 'Base legal', 'Cuánto tiempo']; return '<tr>' + t.map(function (c, i) { return '<td data-label="' + L[i] + '">' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>';

    var proveedores = esc(d.proveedores);
    var out = '<h1>Política de privacidad</h1>' +
      p('<i>Última actualización: ' + hoy() + '</i>') +
      p('En ' + web(d) + ' tratamos tus datos personales con cuidado y conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD). Aquí te explicamos quién los trata, para qué, con qué base legal, durante cuánto tiempo y qué derechos tienes.') +
      h2('1. Quién es el responsable') + fichaTitular(d) +
      h2('2. Para qué usamos tus datos') + p('Solo tratamos los datos necesarios para cada finalidad:') + tabla +
      p('No tomamos decisiones automatizadas ni elaboramos perfiles con efectos jurídicos sobre ti.') +
      h2('3. A quién se comunican') +
      p('No vendemos ni cedemos tus datos a terceros, salvo obligación legal (por ejemplo, a la Agencia Tributaria o a jueces y tribunales). Para prestar el servicio contamos con proveedores que tratan datos por cuenta nuestra (encargados del tratamiento), con los que hemos firmado el contrato que exige el art. 28 RGPD' + (proveedores ? ':' : ', como el alojamiento de la web y las herramientas de email.')) +
      (proveedores ? ul(proveedores.split(/\n|;/).map(function (x) { return x.trim(); })) : '') +
      (d.internacional ? p('Algunos de estos proveedores están fuera del Espacio Económico Europeo. En esos casos, la transferencia se ampara en una decisión de adecuación de la Comisión Europea (como el Marco de Privacidad de Datos UE-EE. UU.) o en las cláusulas contractuales tipo aprobadas por la Comisión.') : p('No realizamos transferencias internacionales de datos fuera del Espacio Económico Europeo.')) +
      h2('4. Tus derechos') +
      p('Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, y retirar el consentimiento que nos hayas dado, sin que ello afecte a la licitud del tratamiento anterior. Escríbenos a ' + (esc(d.email) || '[email]') + ' indicando qué derecho quieres ejercer. Te responderemos en el plazo máximo de un mes.') +
      p('Si consideras que no hemos tratado bien tus datos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).') +
      h2('5. De dónde obtenemos los datos y si son obligatorios') +
      p('Los datos los recibimos directamente de ti. En los formularios marcamos los campos obligatorios: si no los rellenas, no podremos atender tu petición. Al facilitarnos datos de otras personas, confirmas que les has informado y cuentas con su permiso.') +
      h2('6. Menores de edad') +
      p('Esta web no está dirigida a menores de 14 años. Si eres menor de esa edad, no nos envíes tus datos sin el consentimiento de tus padres o tutores (art. 7 LOPDGDD).') +
      h2('7. Seguridad') +
      p('Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a pérdidas, accesos no autorizados o usos indebidos, como el cifrado de las comunicaciones (HTTPS) y el control de accesos.') +
      (u.analitica || u.publicidad ? h2('8. Cookies') + p('Esta web usa cookies propias y de terceros. Puedes ver cuáles y configurarlas en nuestra política de cookies.') : '') +
      h2((u.analitica || u.publicidad ? '9' : '8') + '. Cambios en esta política') +
      p('Podemos actualizar esta política para adaptarla a cambios legales o en nuestros servicios. Publicaremos siempre la versión vigente en esta página, con su fecha de actualización.');
    return out;
  }

  /* ---------- Aviso legal ---------- */
  function avisoLegal(d) {
    var regulada = esc(d.colegio);
    return '<h1>Aviso legal</h1>' +
      p('<i>Última actualización: ' + hoy() + '</i>') +
      h2('1. Datos del titular') +
      p('En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), te informamos de que el sitio web ' + web(d) + ' es titularidad de:') +
      fichaTitular(d) +
      (regulada ? p('<b>Profesión regulada:</b> ' + regulada) : '') +
      (d.autorizacion ? p('<b>Autorización administrativa:</b> ' + esc(d.autorizacion)) : '') +
      h2('2. Objeto') +
      p('Este aviso legal regula el acceso y uso de ' + web(d) + (d.actividad ? ', a través del cual ' + titular(d) + ' ' + esc(d.actividad).replace(/\.$/, '') + '.' : '.') + ' Navegar por la web te atribuye la condición de usuario e implica que aceptas estas condiciones. Si no estás de acuerdo, te pedimos que no la utilices.') +
      h2('3. Condiciones de uso') +
      p('Te comprometes a usar la web y sus contenidos de forma lícita, conforme a la ley, la buena fe y el orden público, y a no emplearlos para actividades ilícitas, para dañar la web o los sistemas de terceros, ni para introducir virus o cualquier otro código dañino.') +
      p('Podemos modificar en cualquier momento, sin previo aviso, la presentación, la configuración y los contenidos de la web, así como estas condiciones.') +
      h2('4. Propiedad intelectual e industrial') +
      p('Los contenidos de la web (textos, imágenes, diseño, logotipos, código fuente y marcas) son propiedad de ' + titular(d) + ' o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa, salvo el uso privado y personal.') +
      h2('5. Responsabilidad') +
      p('Trabajamos para que la información de la web sea exacta y esté actualizada, pero no garantizamos la ausencia de errores ni la disponibilidad continua de la web. No respondemos de los daños derivados del mal uso de la web por parte de los usuarios, de interrupciones técnicas ajenas a nuestro control ni de la presencia de virus pese a haber adoptado las medidas de seguridad razonables.') +
      h2('6. Enlaces') +
      p('La web puede incluir enlaces a sitios de terceros. No controlamos esos sitios ni respondemos de sus contenidos. Si detectas un enlace a contenidos ilícitos, te agradecemos que nos lo comuniques en ' + (esc(d.email) || '[email]') + ' para retirarlo.') +
      h2('7. Protección de datos y cookies') +
      p('El tratamiento de tus datos personales se rige por nuestra política de privacidad, y el uso de cookies, por nuestra política de cookies.') +
      h2('8. Legislación aplicable y jurisdicción') +
      p('Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la ley. Si eres consumidor, serán competentes los de tu domicilio.');
  }

  /* ---------- Política de cookies ---------- */
  var COOKIES = {
    consentimiento: { t: 'Técnica', prov: 'Propia', items: [['Preferencia de cookies', 'Guarda si has aceptado o rechazado las cookies', '1 año']] },
    ga: { t: 'Analítica', prov: 'Google LLC (Google Analytics)', items: [['_ga', 'Distingue a los usuarios de forma anónima', '2 años'], ['_ga_*', 'Mantiene el estado de la sesión', '2 años']] },
    posthog: { t: 'Analítica', prov: 'PostHog Inc. (PostHog)', items: [['ph_*_posthog', 'Identificador anónimo para medir visitas y uso', '1 año']] },
    hotjar: { t: 'Analítica', prov: 'Hotjar Ltd. (Hotjar)', items: [['_hjSessionUser_*', 'Identifica al usuario en distintas visitas', '1 año'], ['_hjSession_*', 'Datos de la sesión actual', '30 minutos']] },
    clarity: { t: 'Analítica', prov: 'Microsoft (Clarity)', items: [['_clck', 'Identificador de usuario de Clarity', '1 año'], ['_clsk', 'Une varias páginas vistas en una sesión', '1 día']] },
    meta: { t: 'Publicidad', prov: 'Meta Platforms (píxel de Meta)', items: [['_fbp', 'Mide y optimiza los anuncios de Facebook e Instagram', '3 meses']] },
    gads: { t: 'Publicidad', prov: 'Google LLC (Google Ads)', items: [['_gcl_au', 'Mide las conversiones de los anuncios', '3 meses']] },
    tiktok: { t: 'Publicidad', prov: 'TikTok (píxel de TikTok)', items: [['_ttp', 'Mide y optimiza los anuncios de TikTok', '13 meses']] },
    linkedin: { t: 'Publicidad', prov: 'LinkedIn (Insight Tag)', items: [['li_sugr, bcookie', 'Identifica el navegador para medir anuncios', 'Hasta 1 año']] },
    hubspot: { t: 'Analítica', prov: 'HubSpot Inc. (HubSpot)', items: [['hubspotutk, __hstc', 'Sigue las visitas para relacionarlas con formularios', '6 meses']] },
    youtube: { t: 'Terceros (contenido)', prov: 'Google LLC (vídeos de YouTube)', items: [['YSC, VISITOR_INFO1_LIVE', 'Reproduce vídeos y recuerda preferencias', 'Sesión / 6 meses']] },
    stripe: { t: 'Técnica', prov: 'Stripe Inc. (pagos)', items: [['__stripe_mid, __stripe_sid', 'Prevención del fraude en los pagos', '1 año / 30 minutos']] }
  };

  function cookies(d) {
    var sel = ['consentimiento'].concat((d.cookies || []).filter(function (k) { return COOKIES[k] && k !== 'consentimiento'; }));
    var filas = [];
    sel.forEach(function (k) {
      var c = COOKIES[k];
      c.items.forEach(function (i) { filas.push('<tr><td data-label="Cookie">' + i[0] + '</td><td data-label="Proveedor">' + (k === 'consentimiento' ? web(d) : c.prov) + '</td><td data-label="Tipo">' + c.t + '</td><td data-label="Finalidad">' + i[1] + '</td><td data-label="Duración">' + i[2] + '</td></tr>'); });
    });
    var soloTecnicas = sel.every(function (k) { return COOKIES[k].t === 'Técnica'; });
    var configurar = esc(d.enlaceConfig) || 'Configurar cookies';
    return '<h1>Política de cookies</h1>' +
      p('<i>Última actualización: ' + hoy() + '</i>') +
      h2('1. Qué son las cookies') +
      p('Las cookies son pequeños archivos que una web guarda en tu navegador para recordar información sobre tu visita. Esta política explica cuáles usa ' + web(d) + ', para qué y cómo puedes configurarlas, conforme al artículo 22.2 de la LSSI-CE y a la Guía sobre el uso de las cookies de la Agencia Española de Protección de Datos.') +
      h2('2. Quién las utiliza') +
      p('El responsable de esta web es ' + titular(d) + (d.nif ? ' (' + esc(d.nif) + ')' : '') + '. Puedes contactar con nosotros en ' + (esc(d.email) || '[email]') + '.') +
      h2('3. Tipos de cookies que usamos') +
      ul([
        '<b>Técnicas:</b> necesarias para que la web funcione y para recordar tu elección sobre las cookies. No requieren tu consentimiento.',
        sel.some(function (k) { return COOKIES[k].t === 'Analítica'; }) ? '<b>Analíticas:</b> nos permiten saber cuántas personas visitan la web y cómo la usan, para mejorarla. Solo se instalan si las aceptas.' : '',
        sel.some(function (k) { return COOKIES[k].t === 'Publicidad'; }) ? '<b>Publicitarias:</b> miden la eficacia de nuestros anuncios y permiten mostrarte publicidad relacionada con tus intereses. Solo se instalan si las aceptas.' : '',
        sel.some(function (k) { return COOKIES[k].t.indexOf('Terceros') === 0; }) ? '<b>De contenido de terceros:</b> se instalan al reproducir contenidos incrustados, como vídeos. Solo se cargan si las aceptas.' : ''
      ]) +
      h2('4. Lista de cookies') +
      '<table><thead><tr><th>Cookie</th><th>Proveedor</th><th>Tipo</th><th>Finalidad</th><th>Duración</th></tr></thead><tbody>' + filas.join('') + '</tbody></table>' +
      (soloTecnicas ? p('Esta web solo usa cookies técnicas, que no requieren consentimiento.') :
        h2('5. Cómo aceptar, rechazar o cambiar tu elección') +
        p('Al entrar en la web te mostramos un aviso para aceptar, rechazar o configurar las cookies que no son técnicas. Rechazar es tan sencillo como aceptar, y la web funciona igual. Puedes cambiar tu elección cuando quieras desde el enlace «' + configurar + '», al pie de cada página.') +
        p('Algunas cookies las instalan terceros, que tratan los datos según sus propias políticas. Cuando alguno está fuera del Espacio Económico Europeo, la transferencia se ampara en las garantías previstas en el RGPD.')) +
      h2(soloTecnicas ? '5. Cómo borrarlas desde el navegador' : '6. Cómo borrarlas desde el navegador') +
      p('También puedes bloquear o eliminar las cookies desde la configuración de tu navegador (Chrome, Safari, Firefox o Edge, en el apartado de privacidad). Si bloqueas las técnicas, puede que algunas partes de la web no funcionen bien.') +
      h2(soloTecnicas ? '6. Cambios' : '7. Cambios') +
      p('Actualizaremos esta política cuando cambien las cookies que usamos. La versión vigente es siempre la publicada en esta página.');
  }

  window.AsesorfyLegal = { privacidad: privacidad, avisoLegal: avisoLegal, cookies: cookies, COOKIES: COOKIES };
})();
