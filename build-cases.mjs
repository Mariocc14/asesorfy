/* Genera landings de casos de uso reales para los documentos de Asesorfy.
   Cada página se escribe para responder por sí sola a la búsqueda que la trae:
   contexto legal, qué preparar, cláusulas explicadas, pasos, tabla, errores y FAQ. */
import fs from "node:fs";

const DOMAIN = "https://asesorfy.app";
const TODAY = "2026-09-17";
const TODAY_TXT = "17 de septiembre de 2026";
const LAU = "https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003";
const CC = "https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763";
const MASC = "https://www.boe.es/eli/es/lo/2025/01/02/1/con";
const NRUA = "https://www.boe.es/buscar/act.php?id=BOE-A-2024-26931";
const VIVIENDA = "https://www.boe.es/buscar/act.php?id=BOE-A-2023-12203";
const INE_IRAV = "https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736169807";

const pages = [
  /* ─────────────────────────── VIVIENDA HABITUAL ─────────────────────────── */
  {
    slug: "modelo-contrato-alquiler-vivienda-habitual", category: "Vivienda habitual",
    title: "Modelo de contrato de alquiler de vivienda habitual 2026",
    meta: "Modelo de contrato de alquiler de vivienda habitual conforme a la LAU: duración mínima, prórrogas, fianza, desistimiento e IRAV, explicado cláusula a cláusula.",
    intro: "Un contrato de vivienda habitual se rige por reglas que no puedes cambiar aunque ambas partes firmen lo contrario. Este modelo las respeta, cita su base legal y te deja decidir solo lo que de verdad es negociable.",
    key: "contrato-larga", product: "Contrato de larga duración", price: "Gratis", free: true,
    law: "Ley 29/1994 de Arrendamientos Urbanos, especialmente arts. 9, 10, 11, 18, 20 y 36.", lawUrl: LAU,
    context: [
      "El arrendamiento de vivienda habitual es el único que la Ley de Arrendamientos Urbanos protege con reglas imperativas en favor del inquilino. El artículo 6 de la LAU dice que cualquier pacto que perjudique al arrendatario frente a lo previsto en el Título II es nulo. En la práctica significa que una cláusula puede estar firmada por las dos partes y no valer nada delante de un juez.",
      "Eso cambia la forma de redactar el contrato. No se trata de proteger al propietario apretando cláusulas, porque las que aprietan de más se caen; se trata de dejar bien atados los puntos donde la ley sí admite pacto: la renta y su forma de pago, la duración inicial, el reparto de gastos, las garantías adicionales, el inventario y la necesidad de recuperar la vivienda.",
      "La confusión más cara es firmar un contrato de temporada cuando lo que hay es una necesidad permanente de vivienda. Lo que determina el régimen aplicable no es el título del documento, sino el destino real del inmueble. Si el inquilino vive ahí de forma habitual, se aplica el Título II de la LAU con sus plazos mínimos, aunque el papel diga otra cosa."
    ],
    checklist: [
      "Identidad completa de todas las partes, con DNI o NIE y domicilio para notificaciones",
      "Dirección exacta, superficie y referencia catastral de la vivienda",
      "Renta, día de pago, cuenta bancaria e índice de actualización aplicable",
      "Duración inicial y si se pacta la necesidad de recuperar la vivienda (art. 9.3 LAU)",
      "Importe de la fianza legal y, si la hay, de la garantía adicional",
      "Inventario del mobiliario y estado de entrega, con fotos fechadas",
      "Certificado de eficiencia energética en vigor"
    ],
    clauses: [
      { t: "Destino como vivienda habitual", d: "Debe constar expresamente. Es lo que activa el régimen del Título II de la LAU y lo que evita discusiones posteriores sobre si el contrato era de temporada." },
      { t: "Duración y prórrogas", d: "Aunque pactes un año, el contrato se prorroga por anualidades hasta cinco años, o siete si el arrendador es persona jurídica (art. 9.1 LAU). Superado ese plazo entra la prórroga tácita de hasta tres años más del art. 10.1." },
      { t: "Renta y actualización", d: "La actualización anual solo procede si está pactada. En contratos firmados desde el 26 de mayo de 2023 la referencia es el IRAV que publica el INE, no el IPC." },
      { t: "Fianza y garantía adicional", d: "La fianza legal es de una mensualidad (art. 36 LAU) y debe depositarse en el organismo de tu comunidad autónoma. La garantía adicional es otra cosa y tiene límites propios." },
      { t: "Desistimiento del inquilino", d: "Puede irse pasados seis meses avisando con treinta días (art. 11 LAU). La indemnización de una mensualidad por año restante solo se puede exigir si figura en el contrato." },
      { t: "Gastos y suministros", d: "Los suministros van a nombre del inquilino. Los gastos generales, comunidad e IBI incluidos, solo son repercutibles si se pactan por escrito y constan cuantificados (art. 20 LAU)." },
      { t: "Conservación, obras y subarriendo", d: "El propietario conserva la habitabilidad; las pequeñas reparaciones del uso ordinario son del inquilino. El subarriendo y la cesión necesitan tu consentimiento escrito (art. 8 LAU)." },
      { t: "Necesidad de recuperar la vivienda", d: "Si prevés necesitarla para ti o un familiar de primer grado antes de los cinco años, tiene que estar pactado expresamente en el contrato. Si no se pactó, no puedes invocarlo después." }
    ],
    steps: [
      { t: "Comprueba el régimen que corresponde", d: "Si el inquilino va a vivir ahí de forma permanente, es vivienda habitual. No intentes encajarlo en temporada para acortar plazos: los tribunales miran el uso real." },
      { t: "Reúne la documentación previa", d: "Nota simple o escritura, referencia catastral, certificado energético en vigor y, si la vivienda está en zona declarada tensionada, la renta del contrato anterior." },
      { t: "Fija renta y actualización", d: "Decide el importe y deja escrito con qué índice se actualizará. Sin cláusula de actualización, la renta no sube." },
      { t: "Redacta y revisa las cláusulas", d: "Quita lo que no aplique a tu caso y añade lo que sí: mascotas, inventario, seguro, notificaciones por email. Una cláusula ambigua se interpreta en tu contra." },
      { t: "Firma con inventario y lecturas", d: "Firma dos ejemplares, anexa el inventario con fotos fechadas y anota las lecturas de los contadores el día de la entrega." },
      { t: "Deposita la fianza", d: "Cada comunidad autónoma tiene su organismo y su plazo. No depositarla puede acarrear sanción y te complica descontar desperfectos al final." }
    ],
    table: {
      title: "Los plazos que no puedes perder de vista", caption: "Plazos de la LAU que conviene tener anotados desde el primer día.",
      head: ["Situación", "Plazo", "Base legal"],
      rows: [
        ["Duración mínima si el arrendador es persona física", "5 años", "art. 9.1 LAU"],
        ["Duración mínima si el arrendador es persona jurídica", "7 años", "art. 9.1 LAU"],
        ["Preaviso del inquilino para no renovar", "30 días", "art. 9.1 LAU"],
        ["Prórroga tácita tras el plazo mínimo", "hasta 3 años", "art. 10.1 LAU"],
        ["Preaviso del arrendador para evitar la prórroga tácita", "4 meses", "art. 10.1 LAU"],
        ["Desistimiento del inquilino", "tras 6 meses, avisando 30 días", "art. 11 LAU"]
      ]
    },
    mistakes: [
      { t: "Usar un contrato de temporada para una necesidad permanente", d: "Si el juez aprecia que el destino real era vivienda habitual, aplica los plazos del Título II y el contrato que firmaste no te sirve de nada." },
      { t: "Acortar por contrato las prórrogas legales", d: "Una cláusula que fije dos años improrrogables es nula frente al inquilino. Solo consigue darte una falsa seguridad." },
      { t: "Mezclar fianza y garantía adicional", d: "Son figuras distintas con reglas distintas. Llamar fianza a tres mensualidades es un error frecuente que complica la devolución." },
      { t: "No pactar la actualización de la renta", d: "Sin cláusula, la renta se queda congelada toda la vida del contrato aunque el IRAV suba." },
      { t: "Entregar sin inventario ni fotos", d: "Al final del contrato no podrás justificar qué desperfecto es nuevo y cuál era desgaste ordinario." }
    ],
    faqs: [
      { q: "¿Cuánto dura como mínimo un contrato de vivienda habitual?", a: "Aunque pactes un plazo menor, se prorroga por anualidades hasta cinco años si el arrendador es persona física y siete si es persona jurídica, según el artículo 9.1 de la LAU." },
      { q: "¿La fianza es obligatoria y de cuánto?", a: "Sí. En vivienda habitual la LAU exige una mensualidad de renta en metálico (art. 36) y debe depositarse en el organismo que designe tu comunidad autónoma." },
      { q: "¿Puedo subir la renta cada año?", a: "Solo si la actualización está pactada en el contrato. Para contratos firmados desde el 26 de mayo de 2023 la referencia aplicable es el IRAV publicado por el INE." },
      { q: "¿Puedo recuperar la vivienda antes de los cinco años?", a: "Únicamente si pactaste expresamente la necesidad de ocuparla para ti o un familiar de primer grado, conforme al artículo 9.3 de la LAU, y respetando el preaviso previsto." },
      { q: "¿Qué pasa si el inquilino se quiere ir antes de tiempo?", a: "Puede desistir pasados seis meses avisando con treinta días de antelación. La indemnización de una mensualidad por año que reste solo es exigible si figura en el contrato." }
    ],
    guides: [
      ["blog-duracion-contrato-alquiler-2026.html", "Duración y prórrogas del contrato explicadas"],
      ["blog-como-hacer-contrato-alquiler-vivienda.html", "Cómo hacer un contrato de alquiler paso a paso"],
      ["blog-irav.html", "Cuánto puedes subir el alquiler con el IRAV"],
      ["blog-devolucion-fianza-alquiler.html", "Devolución de la fianza: plazos y descuentos"]
    ],
    related: ["contrato-alquiler-vivienda-con-mascotas", "contrato-alquiler-temporada-por-trabajo"]
  },

  {
    slug: "contrato-alquiler-vivienda-con-mascotas", category: "Vivienda habitual",
    title: "Contrato de alquiler con mascotas: modelo y cláusulas",
    meta: "Cómo regular las mascotas en un contrato de alquiler: autorización expresa, responsabilidad por daños, convivencia, inventario y límites de lo que puedes exigir.",
    intro: "Permitir animales no exige un contrato distinto, pero sí una cláusula precisa. La diferencia entre un acuerdo que aguanta y uno que no está en describir qué se autoriza, quién responde de los daños y qué ocurre si aparece otro animal.",
    key: "contrato-larga", product: "Contrato de larga duración", price: "Gratis", free: true,
    law: "LAU para el contrato de vivienda y autonomía de la voluntad del art. 1255 del Código Civil dentro de sus límites.", lawUrl: LAU,
    context: [
      "La Ley de Arrendamientos Urbanos no regula las mascotas. Eso deja el asunto en manos de lo que pacten las partes, con el límite de que la cláusula no puede ser abusiva ni vaciar de contenido el uso de la vivienda. De ahí que la redacción importe tanto: una prohibición genérica y desproporcionada tiene más papeletas de discutirse que una autorización condicionada y concreta.",
      "Conviene separar dos planos que suelen confundirse. Uno es el contrato entre tú y el inquilino. Otro son los estatutos de la comunidad de propietarios, que pueden contener sus propias reglas sobre animales en zonas comunes. El contrato no puede autorizar lo que la comunidad prohíbe, y el inquilino debe conocer esas normas.",
      "La Ley 7/2023 de protección de los derechos y el bienestar de los animales cambió el marco general de la tenencia responsable en España. No obliga a ningún propietario a aceptar animales en su vivienda alquilada, pero sí refuerza la idea de que el animal es un ser sintiente y no un objeto, lo que aconseja huir de cláusulas que impongan su retirada automática."
    ],
    checklist: [
      "Especie, número y, si procede, identificación de los animales autorizados",
      "Estado inicial de suelos, puertas, mobiliario y jardín, con fotos",
      "Normas de la comunidad de propietarios sobre animales",
      "Seguro de responsabilidad civil, si se pacta",
      "Garantía adicional dentro de los límites legales, si se acuerda"
    ],
    clauses: [
      { t: "Autorización expresa e identificada", d: "Nombra especie y número. Una autorización genérica para «mascotas» convierte en discutible la llegada de un segundo animal." },
      { t: "Responsabilidad por daños acreditados", d: "El inquilino responde de los daños que cause el animal. La clave es la palabra acreditados: sin inventario ni fotos iniciales, no hay forma de probarlos." },
      { t: "Convivencia y normas de comunidad", d: "Remite expresamente a los estatutos de la comunidad y a las ordenanzas municipales sobre tenencia de animales." },
      { t: "Higiene y olores", d: "Obligación de mantener la vivienda en condiciones y de reparar los daños por orina o arañazos antes de la devolución." },
      { t: "Nuevos animales", d: "Procedimiento para solicitar y autorizar por escrito la incorporación de otro animal durante el contrato." },
      { t: "Seguro de responsabilidad civil", d: "Puedes pactar que el inquilino contrate y mantenga un seguro que cubra los daños del animal a terceros." }
    ],
    steps: [
      { t: "Decide antes de publicar el anuncio", d: "Aceptar animales amplía mucho la demanda. Si vas a permitirlos, dilo en el anuncio y ahórrate visitas fallidas." },
      { t: "Consulta los estatutos de la comunidad", d: "Comprueba si hay limitaciones en zonas comunes antes de autorizar nada en el contrato." },
      { t: "Documenta el estado de entrega", d: "Fotografía suelos, rodapiés, puertas, sofás y jardín. Es la única prueba útil si al final hay discusión." },
      { t: "Redacta la cláusula concreta", d: "Especie, número, responsabilidad, higiene y procedimiento para nuevos animales. Evita automatismos como la resolución inmediata." },
      { t: "Revisa en la salida con el mismo criterio", d: "Compara con las fotos iniciales y distingue el desgaste ordinario del daño imputable al animal." }
    ],
    table: {
      title: "Qué puedes pactar y qué es mejor evitar", caption: "Qué se puede pactar y qué conviene evitar en la cláusula de mascotas.",
      head: ["Pacto", "Recomendable", "Por qué"],
      rows: [
        ["Autorizar especie y número concretos", "Sí", "Evita discusiones sobre animales añadidos después"],
        ["Exigir seguro de responsabilidad civil", "Sí", "Traslada el riesgo frente a terceros sin coste para ti"],
        ["Fianza extra llamada «por mascota»", "No", "La fianza legal es una mensualidad; lo demás es garantía adicional y tiene sus límites"],
        ["Resolución automática del contrato", "No", "Una penalización desproporcionada puede declararse abusiva"],
        ["Prohibición total sin matices", "Depende", "Es pactable, pero conviene que sea clara desde el anuncio para no generar conflicto"]
      ]
    },
    mistakes: [
      { t: "Prohibir de palabra y autorizar de hecho", d: "Si el contrato prohíbe animales pero tú sabías que había un perro y no dijiste nada, la prohibición pierde fuerza." },
      { t: "Confundir daño con desgaste", d: "El desgaste ordinario por el uso es tuyo. Solo el daño real y probado se descuenta de la fianza." },
      { t: "Imponer penalizaciones automáticas", d: "Las cláusulas penales desproporcionadas se moderan judicialmente al amparo del artículo 1154 del Código Civil." },
      { t: "Olvidar las normas de la comunidad", d: "El inquilino puede encontrarse con una prohibición que tú nunca le mencionaste, y el conflicto acaba en tu tejado." }
    ],
    faqs: [
      { q: "¿Puede el propietario prohibir mascotas en el alquiler?", a: "Sí, puede pactarse una prohibición o una autorización condicionada en el contrato, siempre que la cláusula sea clara y no imponga consecuencias desproporcionadas." },
      { q: "¿Se puede pedir más fianza por tener animales?", a: "La fianza legal sigue siendo una mensualidad. Cualquier importe adicional es una garantía adicional distinta, sujeta a sus propios límites, y conviene llamarla por su nombre en el contrato." },
      { q: "¿Qué pasa si el inquilino trae una mascota sin permiso?", a: "Es un incumplimiento contractual si el contrato lo prohibía. Antes de resolver, lo razonable es requerirlo por escrito y dejar constancia; la resolución exige valorar la gravedad del incumplimiento." },
      { q: "¿Quién paga los daños que causa el animal?", a: "El inquilino responde de los daños que pueda acreditarse que causó el animal, más allá del desgaste ordinario. Sin inventario ni fotos de la entrega es muy difícil demostrarlo." },
      { q: "¿Debo avisar a la comunidad de propietarios?", a: "No hay obligación general de avisar, pero sí conviene comprobar los estatutos: pueden contener limitaciones sobre animales en zonas comunes que el inquilino debe conocer." }
    ],
    guides: [
      ["blog-prohibir-mascotas-alquiler.html", "¿Se pueden prohibir mascotas en un alquiler?"],
      ["blog-inventario-contrato-alquiler.html", "El inventario del contrato, con modelo"],
      ["blog-devolucion-fianza-alquiler.html", "Qué se puede descontar de la fianza"],
      ["blog-reparaciones-alquiler-quien-paga.html", "Reparaciones: casero o inquilino"]
    ],
    related: ["modelo-contrato-alquiler-vivienda-habitual", "contrato-alquiler-habitacion-piso-compartido"]
  },

  /* ──────────────────────────────── HABITACIÓN ──────────────────────────────── */
  {
    slug: "contrato-alquiler-habitacion-estudiantes", category: "Alquiler de habitación",
    title: "Contrato de alquiler de habitación para estudiantes 2026",
    meta: "Modelo de contrato de habitación para estudiantes: curso académico, zonas comunes, reparto de gastos, inventario, convivencia y devolución de la fianza.",
    intro: "Alquilar una habitación a un estudiante no se rige por la LAU sino por el Código Civil, y eso cambia todo: la duración, la fianza y las reglas de convivencia las fijas tú en el contrato. Si no las escribes, no existen.",
    key: "contrato-habitacion", product: "Contrato de habitación", price: "9,99 €",
    law: "Código Civil, arts. 1255 y 1542 y siguientes. La LAU no se aplica al alquiler de habitación.", lawUrl: CC,
    context: [
      "El arrendamiento de una habitación con uso compartido de zonas comunes no es un arrendamiento de vivienda. La jurisprudencia viene entendiendo que, al no cederse el uso de la vivienda completa, queda fuera del ámbito de la Ley de Arrendamientos Urbanos y se rige por la libertad de pactos del artículo 1255 del Código Civil y, en lo no pactado, por los artículos 1542 y siguientes.",
      "La consecuencia práctica es doble. Por un lado tienes mucha más libertad: puedes fijar la duración que quieras, la fianza que acuerdes y las normas de convivencia que consideres. Por otro, pierdes la red de seguridad de la ley: lo que no esté escrito en el contrato no se presume, y ante un conflicto solo cuenta el papel.",
      "En el alquiler a estudiantes esto se nota sobre todo en la duración. Un contrato por curso académico, de septiembre a junio, es perfectamente válido, pero hay que decidir y escribir qué ocurre con los meses de verano, si el estudiante puede dejar sus cosas y si la habitación queda reservada para el curso siguiente."
    ],
    checklist: [
      "Identificación de la habitación concreta y de las zonas de uso compartido",
      "Fechas exactas de inicio y fin, ajustadas al curso académico",
      "Renta mensual, día de pago y forma de cobro",
      "Fórmula de reparto de suministros e internet",
      "Fianza acordada y condiciones de devolución",
      "Inventario del mobiliario de la habitación y de las zonas comunes",
      "Normas de convivencia firmadas como anexo"
    ],
    clauses: [
      { t: "Objeto: habitación y zonas comunes", d: "Identifica la habitación por número o descripción y enumera las zonas compartidas. Es lo que deja claro que no se arrienda la vivienda completa." },
      { t: "Duración por curso académico", d: "Fechas concretas de inicio y fin, sin prórroga tácita. Si quieres renovar para el curso siguiente, que sea por acuerdo escrito." },
      { t: "Renta y gastos", d: "Deja escrito si la renta incluye suministros o si se reparten, y con qué criterio: partes iguales, por consumo o cuota fija mensual." },
      { t: "Fianza y devolución", d: "Aquí no rige el art. 36 de la LAU. Fija el importe, el plazo de devolución y qué se puede descontar, con referencia al inventario." },
      { t: "Convivencia", d: "Horarios de descanso, limpieza por turnos, visitas y pernoctas. Va como anexo firmado para que sea exigible." },
      { t: "Prohibición de subarriendo y cesión", d: "Sin tu consentimiento escrito, el estudiante no puede ceder la habitación a un compañero durante un cuatrimestre fuera." },
      { t: "Desistimiento y preaviso", d: "Si permites salir antes de terminar el curso, fija los días de preaviso y las consecuencias. Sin cláusula, la situación queda abierta." }
    ],
    steps: [
      { t: "Decide el régimen antes de redactar", d: "Si alquilas la vivienda completa a un grupo de estudiantes, es otro contrato distinto. Este modelo es para habitaciones individuales con zonas comunes." },
      { t: "Fija el calendario del curso", d: "Inicio, fin y qué ocurre en verano. Es la fuente número uno de malentendidos con estudiantes." },
      { t: "Define el reparto de gastos", d: "Cuota fija mensual o reparto por consumo. La cuota fija evita discusiones, pero calcúlala con margen." },
      { t: "Prepara inventario y normas", d: "Fotografía la habitación y las zonas comunes. Redacta las normas de convivencia y hazlas firmar como anexo." },
      { t: "Comprueba las obligaciones autonómicas", d: "Algunas comunidades y ayuntamientos tienen requisitos sobre alquiler por habitaciones. Revísalos antes de anunciar." },
      { t: "Entrega llaves con recibo", d: "Anota cuántos juegos entregas y prohíbe las copias sin autorización." }
    ],
    table: {
      title: "Habitación o vivienda completa: qué cambia", caption: "Diferencias que más importan entre alquilar una habitación y alquilar la vivienda completa.",
      head: ["Aspecto", "Habitación (Código Civil)", "Vivienda habitual (LAU)"],
      rows: [
        ["Norma aplicable", "Arts. 1255 y 1542 y ss. CC", "Título II de la LAU"],
        ["Duración mínima", "La que pactes", "5 o 7 años por prórrogas"],
        ["Fianza", "La que acuerdes", "1 mensualidad obligatoria (art. 36)"],
        ["Actualización de la renta", "Libertad de pactos", "IRAV si el contrato es posterior al 26/05/2023"],
        ["Prórroga tácita", "Solo si se pacta", "Hasta 3 años (art. 10.1)"]
      ]
    },
    mistakes: [
      { t: "Usar una plantilla de la LAU", d: "Citar artículos de la LAU en un contrato de habitación confunde el régimen y puede volverse en tu contra si alguien alega que cediste la vivienda completa." },
      { t: "No concretar las zonas comunes", d: "Si no dices qué se comparte, el estudiante puede entender que tiene derecho a usar toda la vivienda, trastero incluido." },
      { t: "Dejar el verano sin regular", d: "Es el conflicto clásico: el estudiante deja sus cosas y entiende que la habitación sigue siendo suya sin pagar." },
      { t: "Fianza sin criterio de devolución", d: "Sin inventario ni plazo escrito, la devolución se convierte en una negociación incómoda cada junio." },
      { t: "Olvidar la fiscalidad", d: "El alquiler por habitaciones tributa como rendimiento del capital inmobiliario y, por lo general, no da derecho a la reducción del artículo 23 de la Ley del IRPF." }
    ],
    faqs: [
      { q: "¿El alquiler de una habitación se rige por la LAU?", a: "No. Al no cederse la vivienda completa, la jurisprudencia lo sitúa fuera de la LAU: se rige por lo pactado y, supletoriamente, por los artículos 1542 y siguientes del Código Civil." },
      { q: "¿Cuánta fianza puedo pedir por una habitación?", a: "La que acuerden las partes, porque no se aplica el artículo 36 de la LAU. Lo importante es dejar escrito el importe, el plazo de devolución y qué se puede descontar." },
      { q: "¿Puedo firmar solo por el curso académico?", a: "Sí. Es uno de los motivos por los que este régimen resulta útil: puedes fijar fechas concretas de inicio y fin sin prórroga tácita, siempre que lo escribas." },
      { q: "¿Puede el estudiante empadronarse en la habitación?", a: "El empadronamiento depende del ayuntamiento y de la residencia efectiva, no de tu autorización. Conviene dejar la posición de cada parte reflejada en el contrato para evitar sorpresas." },
      { q: "¿Necesito un contrato por cada habitación?", a: "Es lo más ordenado, porque separa la responsabilidad de cada ocupante. Un contrato conjunto también es posible, pero entonces conviene aclarar si la responsabilidad por la renta es solidaria." }
    ],
    guides: [
      ["blog-habitacion.html", "¿Es legal alquilar por habitaciones?"],
      ["blog-fianza-alquiler-habitacion.html", "La fianza en el alquiler de habitación"],
      ["blog-normas-convivencia-piso-compartido.html", "Normas de convivencia, con modelo"],
      ["blog-alquiler-habitaciones-declaracion-renta.html", "Cómo tributa el alquiler por habitaciones"]
    ],
    related: ["contrato-alquiler-habitacion-piso-compartido", "contrato-alquiler-temporada-estudiantes"]
  },

  {
    slug: "contrato-alquiler-habitacion-piso-compartido", category: "Alquiler de habitación",
    title: "Contrato de habitación en piso compartido: modelo 2026",
    meta: "Contrato de habitación para piso compartido: uso exclusivo, zonas comunes, reparto de suministros, visitas, limpieza, sustitución de ocupantes e inventario.",
    intro: "En un piso compartido los conflictos casi nunca son por la renta. Son por la limpieza, las visitas, el recibo de la luz y quién responde de lo que se rompe en el salón. Un contrato genérico no resuelve nada de eso; este modelo lo pone por delante.",
    key: "contrato-habitacion", product: "Contrato de habitación", price: "9,99 €",
    law: "Código Civil, arts. 1255 y 1542 y siguientes; autonomía de la voluntad dentro de sus límites.", lawUrl: CC,
    context: [
      "El piso compartido funciona sobre una base jurídica sencilla y una realidad complicada. La base es que cada ocupante tiene el uso exclusivo de su habitación y el uso compartido de las zonas comunes, en las condiciones que fije el contrato. La realidad es que la convivencia genera fricciones que ningún artículo del Código Civil resuelve por ti.",
      "Por eso el contrato tiene que bajar al detalle. No basta con decir que el inquilino usará las zonas comunes: hay que decir cuáles, con qué límites de horario si los hay, cómo se reparte la limpieza y qué ocurre cuando alguien deja de cumplir. Cuanto más concreto sea el anexo de convivencia, menos veces tendrás que mediar tú.",
      "El segundo punto crítico es la responsabilidad. Si firmas un único contrato con todos los ocupantes y la obligación de pagar la renta es solidaria, puedes reclamar el total a cualquiera de ellos. Si firmas contratos separados por habitación, cada uno responde de lo suyo y tú asumes el riesgo de las habitaciones vacías. No hay una opción mejor: hay que elegir a conciencia y escribirlo."
    ],
    checklist: [
      "Descripción de cada habitación y de los espacios de uso compartido",
      "Cuota fija o fórmula para repartir suministros e internet",
      "Sistema de limpieza acordado, por turnos o contratado",
      "Quién responde de los daños en zonas comunes",
      "Régimen de visitas y pernoctas",
      "Procedimiento para sustituir a un ocupante que se marcha",
      "Inventario del mobiliario común y del de cada habitación"
    ],
    clauses: [
      { t: "Uso exclusivo de la habitación asignada", d: "Identifica la habitación y deja claro que ningún otro ocupante puede entrar sin permiso, ni siquiera para guardar cosas." },
      { t: "Zonas comunes y límites", d: "Cocina, baño, salón, terraza, trastero. Enumera las que se comparten y las que quedan excluidas." },
      { t: "Reparto de suministros", d: "Cuota fija mensual o reparto por consumo. La cuota fija evita discusiones mensuales; el reparto por consumo es más justo pero exige llevar cuentas." },
      { t: "Limpieza y mantenimiento", d: "Turnos con calendario o servicio de limpieza contratado y repercutido. Sin sistema escrito, la limpieza acaba siendo el conflicto número uno." },
      { t: "Visitas y pernoctas", d: "Fija un límite razonable de noches al mes para invitados. Es lo que evita que una pareja se instale de hecho sin figurar en el contrato." },
      { t: "Daños en zonas comunes", d: "Responde quien lo causa. Cuando no se pueda determinar, conviene haber pactado un criterio de reparto para no dejarlo al aire." },
      { t: "Salida anticipada y sustitución", d: "Preaviso exigible y procedimiento para que entre otro ocupante, siempre con tu consentimiento escrito." },
      { t: "Prohibición de subarriendo", d: "Impide que el inquilino realquile su habitación por temporadas o en plataformas mientras esté fuera." }
    ],
    steps: [
      { t: "Elige el esquema de contratos", d: "Uno por habitación o uno conjunto con responsabilidad solidaria. Decide antes de redactar, porque cambia todo el documento." },
      { t: "Calcula la cuota de suministros", d: "Mira el consumo real de los últimos doce meses y añade margen. Si te quedas corto, la revisión será conflictiva." },
      { t: "Escribe el anexo de convivencia", d: "Limpieza, ruidos, visitas, uso de la cocina, basura. Que lo firmen todos los ocupantes, no solo el que entra." },
      { t: "Levanta inventario doble", d: "Uno de la habitación y otro de las zonas comunes, con fotos fechadas. El de zonas comunes es el que te salva en las salidas." },
      { t: "Entrega llaves con registro", d: "Anota los juegos entregados y prohíbe copias sin autorización, sobre todo del portal." },
      { t: "Revisa las obligaciones locales", d: "Algunos ayuntamientos regulan el alquiler por habitaciones y la ocupación máxima. Compruébalo antes de anunciar." }
    ],
    table: {
      title: "Un contrato por habitación o uno conjunto", caption: "Dos formas de organizar el piso compartido y lo que implica cada una.",
      head: ["Criterio", "Un contrato por habitación", "Un contrato conjunto"],
      rows: [
        ["Responsabilidad por la renta", "Cada uno responde de la suya", "Solidaria si se pacta: puedes reclamar el total a cualquiera"],
        ["Habitación vacía", "El riesgo es tuyo", "El riesgo es del grupo"],
        ["Sustitución de ocupante", "Firmas un contrato nuevo", "Requiere modificar el contrato existente"],
        ["Gestión", "Más contratos que controlar", "Un solo interlocutor"],
        ["Conflictos internos", "Acaban en tu mesa", "Los resuelve el grupo"]
      ]
    },
    mistakes: [
      { t: "Un único contrato sin aclarar la responsabilidad", d: "Si no dices si la obligación es solidaria, cuando uno deje de pagar no sabrás a quién reclamar el total." },
      { t: "No documentar el estado de las zonas comunes", d: "Es donde se producen la mayoría de los daños y donde menos pruebas suele haber." },
      { t: "Permitir sustituciones sin consentimiento escrito", d: "Acabas con una persona viviendo en tu piso con la que no tienes ningún contrato." },
      { t: "Dejar las visitas sin regular", d: "Una pareja que se queda cinco noches por semana es un ocupante más que no paga ni figura." },
      { t: "Cuota de suministros calculada a la baja", d: "Genera revisiones constantes y la sensación de que cambias las reglas a mitad de contrato." }
    ],
    faqs: [
      { q: "¿Cada inquilino debe tener su propio contrato?", a: "Puede formalizarse por habitaciones o mediante un contrato conjunto. Lo decisivo es que quede claro el espacio asignado a cada uno y si la responsabilidad por la renta es solidaria." },
      { q: "¿Quién paga un daño en una zona común?", a: "Responde quien lo causó. Cuando no puede determinarse, se aplica el criterio de reparto que hayáis pactado; sin pacto, la discusión queda abierta." },
      { q: "¿Puedo limitar las visitas y las pernoctas?", a: "Sí, siempre que el límite sea razonable y esté escrito. Prohibir cualquier visita sería desproporcionado; fijar un máximo de noches al mes es habitual y admisible." },
      { q: "¿Qué hago si un inquilino se va a mitad de curso?", a: "Aplica el preaviso pactado y el procedimiento de sustitución. Si permites que entre otra persona, firma un contrato nuevo con ella en lugar de dejarla entrar de hecho." },
      { q: "¿Puede un inquilino realquilar su habitación mientras está fuera?", a: "Solo si el contrato lo permite. Lo habitual y recomendable es prohibir expresamente el subarriendo y la cesión sin consentimiento escrito del propietario." }
    ],
    guides: [
      ["blog-normas-convivencia-piso-compartido.html", "Normas de convivencia en piso compartido"],
      ["blog-subarrendar-habitacion.html", "Subarrendar una habitación: permiso y límites"],
      ["blog-fianza-alquiler-habitacion.html", "Fianza en el alquiler de habitación"],
      ["blog-empadronarse-habitacion-alquilada.html", "Empadronarse en una habitación alquilada"]
    ],
    related: ["contrato-alquiler-habitacion-estudiantes", "modelo-contrato-alquiler-vivienda-habitual"]
  },

  /* ──────────────────────────────── TEMPORADA ──────────────────────────────── */
  {
    slug: "contrato-alquiler-temporada-por-trabajo", category: "Alquiler de temporada",
    title: "Contrato de alquiler de temporada por trabajo 2026",
    meta: "Contrato de temporada por desplazamiento laboral: causa temporal acreditable, domicilio habitual del inquilino, duración determinada, fianza de dos mensualidades.",
    intro: "El alquiler de temporada por motivos de trabajo es válido y útil, pero se sostiene sobre una sola pieza: la causa de temporalidad. Si esa causa no está bien acreditada en el contrato, lo que tienes es un contrato de vivienda habitual con otro nombre.",
    key: "contrato-temporada", product: "Contrato de temporada", price: "9,99 €",
    law: "Ley 29/1994 LAU, arts. 3 y 36: arrendamiento para uso distinto del de vivienda.", lawUrl: LAU,
    context: [
      "El artículo 3 de la LAU define el arrendamiento para uso distinto del de vivienda como aquel que, recayendo sobre una edificación, tiene como destino primordial uno distinto del de satisfacer la necesidad permanente de vivienda del arrendatario. Ahí encajan los alquileres de temporada, incluidos los que responden a un desplazamiento laboral.",
      "Ese régimen es notablemente más favorable para el propietario: se rige por la voluntad de las partes, no hay prórrogas obligatorias de cinco o siete años, la fianza es de dos mensualidades y el plazo es el que se pacte. Por eso mismo los tribunales examinan con lupa si la temporalidad es real o es una etiqueta para esquivar el Título II.",
      "La prueba de esa temporalidad no está en el título del documento. Está en que el inquilino conserve su domicilio habitual en otro sitio, en que exista una causa concreta y verificable, y en que la duración del contrato guarde relación con esa causa. Un contrato de temporada de tres años para un desplazamiento laboral indefinido tiene muy poca defensa."
    ],
    checklist: [
      "Documento que acredite el desplazamiento: contrato, carta de la empresa, proyecto u obra",
      "Domicilio habitual y permanente del inquilino, distinto del inmueble arrendado",
      "Fechas de inicio y fin coherentes con la duración del desplazamiento",
      "Renta y periodo al que corresponde: mensual, quincenal o por estancia",
      "Fianza de dos mensualidades conforme al art. 36 LAU",
      "Inventario del mobiliario y estado de entrega",
      "Registro o comunicación que exija tu comunidad autónoma o tu ayuntamiento"
    ],
    clauses: [
      { t: "Causa de temporalidad acreditada", d: "Describe el motivo concreto del desplazamiento y anexa el documento que lo respalda. Es la cláusula que sostiene todo el contrato." },
      { t: "Domicilio habitual del arrendatario", d: "Debe constar que el inquilino mantiene su residencia habitual en otra dirección. Sin este dato, la temporalidad se debilita." },
      { t: "Duración determinada sin prórroga tácita", d: "Fechas concretas de inicio y fin. La permanencia posterior exige un acuerdo escrito nuevo, nunca un silencio." },
      { t: "Renta y periodo", d: "Deja claro si la renta es mensual, quincenal o por la estancia completa, y cómo se prorratean los periodos incompletos." },
      { t: "Fianza de dos mensualidades", d: "En uso distinto del de vivienda el artículo 36 de la LAU fija dos mensualidades, no una." },
      { t: "Obligaciones del arrendatario", d: "Conservar el inmueble, destinarlo solo al uso pactado, no hacer obras, no subarrendar y devolverlo en el mismo estado." },
      { t: "Registros y autorizaciones", d: "Si el inmueble se comercializa en plataformas, comprueba los registros autonómicos y locales aplicables." },
      { t: "Resolución y MASC", d: "Antes de acudir al juzgado por vía civil hay que intentar un medio adecuado de solución de controversias, conforme a la Ley Orgánica 1/2025." }
    ],
    steps: [
      { t: "Verifica que la causa es real", d: "Pide el documento que acredite el desplazamiento. Si el inquilino no puede aportarlo, replantea el tipo de contrato." },
      { t: "Ajusta la duración a la causa", d: "Si el desplazamiento es de nueve meses, el contrato debe ser de nueve meses. La coherencia entre causa y plazo es lo que se examina." },
      { t: "Haz constar el domicilio habitual", d: "Que figure la dirección donde el inquilino mantiene su residencia permanente, con su documentación de respaldo." },
      { t: "Calcula la fianza correcta", d: "Dos mensualidades. Es uno de los errores más repetidos al copiar plantillas de vivienda habitual." },
      { t: "Comprueba los registros aplicables", d: "El procedimiento estatal del RD 1312/2024 fue anulado por el Tribunal Supremo en 2026, pero los registros autonómicos y municipales siguen vigentes." },
      { t: "Levanta inventario y lecturas", d: "Fotos fechadas y lecturas de contadores a la entrada y a la salida." }
    ],
    table: {
      title: "Temporada frente a vivienda habitual", caption: "Temporada frente a vivienda habitual: las diferencias que cambian el contrato.",
      head: ["Aspecto", "Temporada (art. 3 LAU)", "Vivienda habitual (Título II LAU)"],
      rows: [
        ["Prórroga obligatoria", "No existe", "Hasta 5 o 7 años"],
        ["Fianza legal", "2 mensualidades (art. 36)", "1 mensualidad (art. 36)"],
        ["Duración", "La pactada, ligada a la causa", "Mínimo legal con prórrogas"],
        ["Actualización de la renta", "Libertad de pactos", "IRAV en contratos posteriores al 26/05/2023"],
        ["Qué lo define", "La causa temporal y el domicilio habitual del inquilino", "El destino de vivienda permanente"]
      ]
    },
    mistakes: [
      { t: "Etiquetar como temporada una necesidad permanente", d: "Es el fraude que más se detecta. Si el inquilino vive ahí y no tiene otro domicilio, el juez aplicará el Título II de la LAU." },
      { t: "Duración incoherente con la causa", d: "Un contrato de temporada renovado año tras año delata que la temporalidad era ficticia." },
      { t: "Fianza de una sola mensualidad", d: "En uso distinto del de vivienda son dos. Copiar la plantilla equivocada te deja con menos garantía de la que la ley te reconoce." },
      { t: "No anexar la prueba del desplazamiento", d: "Sin documento que respalde la causa, la cláusula es una declaración de intenciones." },
      { t: "Dejar que el inquilino se quede sin nuevo contrato", d: "La permanencia consentida después del vencimiento puede derivar en tácita reconducción, ya fuera del plazo que habías previsto." }
    ],
    faqs: [
      { q: "¿Qué hace válido un contrato de temporada?", a: "Que exista una causa temporal real y acreditada, que el inquilino conserve su domicilio habitual en otro lugar y que la duración pactada sea coherente con esa causa." },
      { q: "¿Cuánta fianza corresponde en un alquiler de temporada?", a: "Dos mensualidades de renta, conforme al artículo 36 de la LAU para los arrendamientos de uso distinto del de vivienda, sin perjuicio de las garantías adicionales que se pacten." },
      { q: "¿Puede prorrogarse un contrato de temporada?", a: "No de forma tácita. Si ambas partes quieren continuar, lo correcto es firmar un acuerdo escrito nuevo que vuelva a justificar la causa temporal." },
      { q: "¿Necesito registrar el inmueble?", a: "El procedimiento estatal del RD 1312/2024 fue anulado por el Tribunal Supremo en 2026, pero siguen vigentes los registros y licencias de las comunidades autónomas y los ayuntamientos. Comprueba los de tu zona." },
      { q: "¿Qué pasa si el inquilino se queda al terminar el contrato?", a: "Si permanece con tu consentimiento y no reclamas el inmueble, puede nacer un nuevo arrendamiento por tácita reconducción del artículo 1566 del Código Civil. Conviene requerir la devolución por escrito." }
    ],
    guides: [
      ["blog-temporada.html", "Alquiler de temporada: cómo hacerlo bien"],
      ["blog-alquiler-temporada-o-turistico.html", "Temporada o turístico: diferencias clave"],
      ["blog-numero-registro-alquiler-nrua.html", "El registro de alquiler tras la sentencia del Supremo"],
      ["blog-modelo-informativo-anual-arrendamientos.html", "El modelo informativo anual de febrero"]
    ],
    related: ["contrato-alquiler-temporada-estudiantes", "modelo-contrato-alquiler-vivienda-habitual"]
  },

  {
    slug: "contrato-alquiler-temporada-estudiantes", category: "Alquiler de temporada",
    title: "Contrato de alquiler de temporada para estudiantes 2026",
    meta: "Contrato de temporada para estudiantes: vivienda completa durante el curso, causa académica acreditada, domicilio habitual, fianza de dos mensualidades e inventario.",
    intro: "Alquilar la vivienda completa a estudiantes durante el curso es el caso más claro de arrendamiento de temporada. También es donde más se copia la plantilla equivocada y se acaba con un contrato de vivienda habitual sin saberlo.",
    key: "contrato-temporada", product: "Contrato de temporada", price: "9,99 €",
    law: "Ley 29/1994 LAU, arts. 3 y 36; Código Civil con carácter supletorio.", lawUrl: LAU,
    context: [
      "Cuando cedes la vivienda completa a uno o varios estudiantes durante el curso académico, la necesidad que satisfaces no es la de vivienda permanente: es la de alojamiento durante un periodo formativo concreto. Eso encaja en el artículo 3 de la LAU como uso distinto del de vivienda, con todo lo que implica en plazos y fianza.",
      "La diferencia con el alquiler por habitaciones es importante y conviene tenerla clara. Si alquilas habitaciones sueltas con zonas comunes, el contrato se rige por el Código Civil. Si cedes el piso entero, aunque sea a un grupo de estudiantes, estás en el ámbito de la LAU y la pregunta pasa a ser si el uso es de vivienda habitual o de temporada.",
      "La causa académica se acredita con matrícula, carta de admisión, programa de intercambio o convenio de prácticas. Y la duración debe seguir al curso: de septiembre a junio, de septiembre a julio, o el cuatrimestre que corresponda. Un contrato de doce meses renovado cada septiembre empieza a parecerse mucho a una vivienda habitual."
    ],
    checklist: [
      "Matrícula, carta de admisión o convenio de prácticas del estudiante",
      "Domicilio familiar o habitual del estudiante, distinto del inmueble",
      "Fechas ajustadas al curso o cuatrimestre",
      "Renta y forma de pago, con el tratamiento de los meses incompletos",
      "Fianza de dos mensualidades y, si procede, garantía adicional o aval",
      "Inventario detallado del mobiliario y electrodomésticos",
      "Si firman varios estudiantes, si la responsabilidad es solidaria"
    ],
    clauses: [
      { t: "Causa académica acreditada", d: "Identifica los estudios, el centro y el periodo. Anexa el documento que lo acredite: es lo que sostiene la temporalidad." },
      { t: "Domicilio habitual del estudiante", d: "Debe constar que mantiene su residencia habitual en otra dirección, normalmente la familiar." },
      { t: "Duración ligada al curso", d: "Fechas concretas, sin prórroga tácita. Si el estudiante continúa el curso siguiente, se firma un contrato nuevo." },
      { t: "Renta y meses incompletos", d: "Deja escrito cómo se prorratea septiembre y junio si la entrada o la salida no coinciden con el mes natural." },
      { t: "Fianza de dos mensualidades", d: "Es la que corresponde al uso distinto del de vivienda según el artículo 36 de la LAU." },
      { t: "Responsabilidad solidaria y aval", d: "Si firman varios estudiantes, pactar la solidaridad te permite reclamar el total a cualquiera. El aval de los padres es habitual en este perfil." },
      { t: "Uso, obras y subarriendo", d: "Destino exclusivo al alojamiento pactado, sin obras y sin subarrendar, ni siquiera durante las vacaciones." },
      { t: "Inventario y devolución", d: "Estado de entrega documentado y criterio claro de lo que se descuenta al terminar el curso." }
    ],
    steps: [
      { t: "Confirma que cedes la vivienda completa", d: "Si alquilas habitaciones sueltas, necesitas un contrato de habitación, no este." },
      { t: "Pide la acreditación académica", d: "Matrícula o carta de admisión, y anéxala al contrato. Sin ella la causa temporal queda sin respaldo." },
      { t: "Ajusta las fechas al calendario académico", d: "De septiembre a junio o de septiembre a julio. Evita el contrato de doce meses si lo que hay es un curso." },
      { t: "Decide las garantías", d: "Fianza de dos mensualidades y, si lo ves necesario, aval de los padres o garantía adicional dentro de los límites legales." },
      { t: "Levanta inventario con fotos", d: "Electrodomésticos, mobiliario y estado de paredes. Es el documento que evita discusiones en junio." },
      { t: "Prevé el verano y la renovación", d: "Escribe qué pasa con las pertenencias y si la vivienda queda reservada para el curso siguiente, y a cambio de qué." }
    ],
    table: {
      title: "Qué régimen se aplica según lo que alquiles", caption: "Tres formas de alquilar a estudiantes y el régimen que corresponde a cada una.",
      head: ["Qué alquilas", "Régimen", "Fianza"],
      rows: [
        ["Vivienda completa por el curso", "Temporada, art. 3 LAU", "2 mensualidades"],
        ["Habitación con zonas comunes", "Código Civil, arts. 1542 y ss.", "La pactada"],
        ["Vivienda completa como residencia permanente", "Vivienda habitual, Título II LAU", "1 mensualidad"]
      ]
    },
    mistakes: [
      { t: "Copiar una plantilla de vivienda habitual", d: "Acabas con prórrogas obligatorias que no querías y con una fianza inferior a la que te reconoce la ley." },
      { t: "Contrato de doce meses renovado cada año", d: "Repetido curso tras curso, delata que la temporalidad era una etiqueta." },
      { t: "No pactar la solidaridad entre varios firmantes", d: "Cuando uno deje de pagar, no podrás reclamar el total al resto." },
      { t: "Inventario superficial", d: "Con estudiantes el desgaste es mayor y la discusión de junio es previsible. Sin fotos, la pierdes." },
      { t: "Dejar el verano sin regular", d: "Las pertenencias almacenadas sin contrato son una fuente segura de conflicto." }
    ],
    faqs: [
      { q: "¿Alquilar a estudiantes es siempre contrato de temporada?", a: "No. Lo es cuando cedes la vivienda completa por el periodo académico y el estudiante mantiene su domicilio habitual en otro lugar. Si alquilas habitaciones sueltas, el régimen aplicable es el del Código Civil." },
      { q: "¿Qué documento acredita la causa académica?", a: "La matrícula, la carta de admisión del centro, el convenio de prácticas o la documentación del programa de intercambio. Conviene anexarla al contrato." },
      { q: "¿Cuánta fianza puedo pedir?", a: "Dos mensualidades, conforme al artículo 36 de la LAU para uso distinto del de vivienda, además de las garantías adicionales que se pacten, como un aval." },
      { q: "¿Puedo pedir aval a los padres?", a: "Sí. Es una garantía adicional habitual en este perfil de inquilino. Debe constar por escrito, identificando al avalista y el alcance de lo que garantiza." },
      { q: "¿Qué hago si el estudiante quiere quedarse el verano?", a: "Firma un acuerdo escrito para ese periodo o un contrato nuevo. Permitir que se quede sin documentar puede derivar en tácita reconducción." }
    ],
    guides: [
      ["blog-temporada.html", "Alquiler de temporada en 2026"],
      ["blog-alquiler-temporada-o-turistico.html", "Temporada frente a turístico"],
      ["blog-garantia-adicional-alquiler.html", "Garantía adicional y aval: límites"],
      ["blog-inventario-contrato-alquiler.html", "Cómo levantar un inventario que sirva"]
    ],
    related: ["contrato-alquiler-temporada-por-trabajo", "contrato-alquiler-habitacion-estudiantes"]
  },

  /* ──────────────────────────────── IMPAGO ──────────────────────────────── */
  {
    slug: "oferta-vinculante-confidencial-impago-alquiler", category: "Impago",
    title: "Oferta vinculante confidencial por impago de alquiler",
    meta: "Cómo preparar la oferta vinculante confidencial del art. 17 de la LO 1/2025 por impago de alquiler: deuda, propuesta, plazo de un mes y prueba de recepción.",
    intro: "Desde abril de 2025 no puedes demandar directamente a un inquilino que no paga: antes hay que intentar un acuerdo. La oferta vinculante confidencial es la vía más rápida y la que menos te compromete, pero solo sirve si está bien hecha y bien enviada.",
    key: "ovc-impago", product: "Kit Impago + MASC", price: "49 €",
    law: "Ley Orgánica 1/2025, de 2 de enero, art. 17: oferta vinculante confidencial como medio adecuado de solución de controversias.", lawUrl: MASC,
    context: [
      "La Ley Orgánica 1/2025 introdujo en el proceso civil español un requisito de procedibilidad: antes de presentar la demanda hay que acreditar que se ha intentado un medio adecuado de solución de controversias. Si no se acredita, la demanda puede no admitirse a trámite, con la pérdida de tiempo que eso supone cuando llevas meses sin cobrar.",
      "Entre los medios disponibles, la oferta vinculante confidencial del artículo 17 es la que mejor encaja en un impago de alquiler. No exige acudir a un tercero, no requiere que el inquilino acepte reunirse y se formaliza con un escrito que envías tú. Su carácter confidencial significa que el contenido íntegro no se aporta con la demanda: basta el justificante de envío y de recepción.",
      "Hay dos detalles que deciden si el intento sirve. El primero es el plazo: la oferta debe poder aceptarse durante un mes desde su recepción, y la falta de respuesta se entiende como rechazo. El segundo es la prueba: hace falta un medio que deje constancia de la identidad del remitente, del contenido íntegro, de la recepción y de la fecha. El burofax con certificación de texto y acuse de recibo es el estándar."
    ],
    checklist: [
      "Contrato de arrendamiento y sus anexos",
      "Relación de los periodos impagados y el importe principal de cada uno",
      "Justificantes bancarios que acrediten la falta de pago",
      "Domicilio del inquilino a efectos de notificaciones",
      "Propuesta concreta: pago íntegro, plan fraccionado o entrega del inmueble",
      "Medio de envío que deje constancia de contenido, recepción y fecha",
      "Calendario de plazos para saber cuándo puedes demandar"
    ],
    clauses: [
      { t: "Identificación de las partes", d: "Nombre, DNI o NIE y domicilio de remitente y destinatario. Un dato mal puesto puede invalidar la notificación." },
      { t: "Vínculo contractual", d: "Fecha del contrato, dirección del inmueble, renta mensual, día de pago y cuenta de cobro." },
      { t: "Descripción del conflicto", d: "Meses impagados y principal total, dejando a salvo las rentas posteriores y los intereses." },
      { t: "Naturaleza del escrito", d: "Debe decir expresamente que es una oferta vinculante confidencial del art. 17 de la LO 1/2025, formulada como MASC y requisito de procedibilidad." },
      { t: "Propuesta con dos salidas", d: "Pagar la deuda y continuar, o entregar voluntariamente el inmueble en una fecha concreta. Dar dos opciones aumenta mucho la tasa de respuesta." },
      { t: "Plazo de aceptación", d: "Un mes desde la recepción, con la advertencia de que la falta de respuesta se entiende como rechazo." },
      { t: "Efectos de la aceptación", d: "La aceptación produce efectos obligatorios. Conviene advertir también de que la demanda incrementará la deuda con costas." },
      { t: "Forma y constancia", d: "Burofax con certificación de texto y acuse de recibo, o medio electrónico equivalente que deje la misma constancia." }
    ],
    steps: [
      { t: "Calcula la deuda con precisión", d: "Mes a mes, con el principal de cada periodo. Un importe mal calculado debilita todo el escrito." },
      { t: "Decide qué propones", d: "Pago íntegro, fraccionamiento o entrega del inmueble. Piensa qué prefieres de verdad: muchas veces recuperar la vivienda vale más que cobrar el atraso." },
      { t: "Redacta la oferta", d: "Con los elementos del artículo 17 y sin amenazas. El tono importa: el objetivo es que acepte, no que se atrinchere." },
      { t: "Envíalo por burofax", d: "Con certificación de texto y acuse de recibo. Guarda el justificante: es la prueba del intento." },
      { t: "Espera el plazo completo", d: "Un mes desde la recepción. Demandar antes de que venza puede dar al traste con el requisito." },
      { t: "Prepara la demanda si no hay acuerdo", d: "Con el justificante de envío y recepción, sin aportar el contenido íntegro del escrito, que es confidencial." }
    ],
    table: {
      title: "Qué pasa según responda el inquilino", caption: "Qué ocurre según responda o no el inquilino dentro del plazo de un mes.",
      head: ["Respuesta del inquilino", "Efecto", "Siguiente paso"],
      rows: [
        ["Acepta el pago de la deuda", "Acuerdo con efectos obligatorios", "Documentar el pago y mantener el contrato"],
        ["Acepta entregar el inmueble", "Acuerdo con efectos obligatorios", "Fijar fecha de entrega, llaves y liquidación"],
        ["Rechaza expresamente", "Intento acreditado", "Demanda con el justificante de envío y recepción"],
        ["No responde en un mes", "Se entiende rechazada", "Demanda con el justificante de envío y recepción"]
      ]
    },
    mistakes: [
      { t: "Enviar un burofax de reclamación corriente", d: "Un requerimiento de pago no es una oferta vinculante confidencial. Puede no servir como intento de MASC." },
      { t: "No dejar constancia de la recepción", d: "Sin acuse de recibo no puedes acreditar cuándo empezó a correr el plazo ni que el escrito llegó." },
      { t: "Demandar antes de que venza el mes", d: "El plazo mínimo de aceptación forma parte del requisito. Adelantarse puede costarte la admisión." },
      { t: "Aportar el escrito íntegro con la demanda", d: "Es confidencial. Basta el justificante de envío y de recepción." },
      { t: "Aceptar un acuerdo alto sin abogado", d: "La Ley Orgánica 1/2025 exige firma de abogado para aceptar acuerdos que superen los 2.000 euros." }
    ],
    faqs: [
      { q: "¿Es obligatorio intentar un acuerdo antes de demandar por impago?", a: "Sí. La Ley Orgánica 1/2025 configura el intento de un medio adecuado de solución de controversias como requisito de procedibilidad para la demanda civil desde abril de 2025." },
      { q: "¿Qué plazo tiene el inquilino para aceptar la oferta?", a: "Un mes desde la recepción, que es el plazo mínimo legal. Si no responde dentro de ese plazo, se entiende que la rechaza." },
      { q: "¿Cómo debo enviar la oferta vinculante confidencial?", a: "Por un medio que deje constancia de la identidad del remitente, del contenido íntegro, de la recepción y de la fecha. El burofax con certificación de texto y acuse de recibo es la vía habitual." },
      { q: "¿Tengo que aportar el escrito con la demanda?", a: "No. Por su carácter confidencial, el contenido íntegro no se aporta: basta acreditar el envío y la recepción mediante el justificante." },
      { q: "¿Necesito abogado para este escrito?", a: "Para redactar y enviar la oferta, no. Para aceptar un acuerdo de cuantía superior a 2.000 euros, la Ley Orgánica 1/2025 exige firma de abogado." }
    ],
    guides: [
      ["blog-oferta-vinculante-confidencial.html", "Qué es la oferta vinculante confidencial"],
      ["blog-burofax-impago-alquiler.html", "Cómo enviar el burofax y qué poner"],
      ["blog-desahucio-impago-2026.html", "Desahucio por impago paso a paso"],
      ["blog-cuanto-tarda-un-desahucio.html", "Cuánto tarda un desahucio en 2026"]
    ],
    related: ["masc-impago-alquiler-antes-desahucio", "modelo-contrato-alquiler-vivienda-habitual"]
  },

  {
    slug: "masc-impago-alquiler-antes-desahucio", category: "Impago",
    title: "MASC por impago de alquiler antes del desahucio",
    meta: "Qué es el MASC obligatorio antes de demandar por impago de alquiler, qué medios valen, cómo se acredita el intento y qué documentación preparar para el abogado.",
    intro: "El MASC es el trámite que se interpone entre tu inquilino moroso y el juzgado. No es un formalismo vacío: si no puedes acreditar que lo intentaste, la demanda de desahucio puede no admitirse.",
    key: "ovc-impago", product: "Kit Impago + MASC", price: "49 €",
    law: "Ley Orgánica 1/2025, de 2 de enero, de medidas en materia de eficiencia del Servicio Público de Justicia.", lawUrl: MASC,
    context: [
      "MASC son las siglas de medio adecuado de solución de controversias. La Ley Orgánica 1/2025 los convirtió en requisito de procedibilidad para el orden civil: antes de presentar la demanda hay que haber intentado, de buena fe, resolver el asunto fuera del juzgado, y hay que poder acreditarlo.",
      "La ley no impone un medio concreto. Valen la mediación, la conciliación, la opinión de un tercero experto, la negociación entre abogados y la oferta vinculante confidencial. Para un impago de alquiler, la oferta vinculante confidencial suele ser la opción más práctica porque no depende de que la otra parte acepte sentarse.",
      "Lo que la ley sí exige es que el intento sea real y demostrable. Eso significa una propuesta concreta, un plazo de aceptación de al menos un mes y un envío que deje constancia de contenido, recepción y fecha. Un mensaje de WhatsApp diciendo que pague no cumple ninguno de los tres requisitos."
    ],
    checklist: [
      "Contrato de arrendamiento firmado y sus anexos",
      "Extractos bancarios de los meses reclamados",
      "Cuadro de la deuda: periodo, importe y fecha de vencimiento de cada mensualidad",
      "Comunicaciones previas con el inquilino, aunque fueran informales",
      "Domicilio y datos de contacto actualizados del arrendatario",
      "Justificante del envío y de la recepción del intento de MASC",
      "Decisión sobre qué pides: cobrar, recuperar el inmueble o ambas cosas"
    ],
    clauses: [
      { t: "Propuesta concreta y cuantificada", d: "Un MASC sin cifras ni fechas no es una propuesta. Debe poder aceptarse tal cual está escrito." },
      { t: "Plazo de aceptación de un mes", d: "Es el mínimo legal. Cerrar el plazo antes debilita el intento." },
      { t: "Constancia del envío y la recepción", d: "Identidad, contenido íntegro, recepción y fecha. Sin eso no hay nada que acreditar ante el juzgado." },
      { t: "Buena fe en la negociación", d: "La ley valora que el intento sea real. Una propuesta imposible de aceptar puede interpretarse como un trámite simulado." },
      { t: "Confidencialidad del contenido", d: "En la oferta vinculante confidencial el escrito no se aporta con la demanda; solo el justificante." },
      { t: "Advertencia de costas", d: "Informar de que la demanda incrementará la deuda con costas y honorarios suele mover a la otra parte." }
    ],
    steps: [
      { t: "Ordena la deuda antes de nada", d: "Un cuadro mes a mes con importes y vencimientos. Es lo primero que te pedirá cualquier abogado." },
      { t: "Elige el medio", d: "Para un impago corriente, la oferta vinculante confidencial. Si hay relación que salvar o una deuda muy alta, plantéate la mediación." },
      { t: "Redacta la propuesta", d: "Concreta, cuantificada y con dos salidas: pagar o entregar el inmueble." },
      { t: "Envía con acuse de recibo", d: "Burofax con certificación de texto. Guarda el justificante en papel y en digital." },
      { t: "Cuenta el mes completo", d: "Desde la recepción, no desde el envío. Anótalo en el calendario." },
      { t: "Reúne la carpeta para el abogado", d: "Contrato, cuadro de deuda, extractos, justificante del MASC y comunicaciones. Le ahorras horas y a ti dinero." }
    ],
    table: {
      title: "Qué medios valen como MASC", caption: "Medios adecuados de solución de controversias aplicables a un impago de alquiler.",
      head: ["Medio", "Cuándo encaja", "Requiere que la otra parte colabore"],
      rows: [
        ["Oferta vinculante confidencial", "Impago corriente, quieres ir rápido", "No"],
        ["Mediación", "Deuda alta o relación que quieres conservar", "Sí"],
        ["Conciliación", "Cuando se busca un acuerdo con valor reforzado", "Sí"],
        ["Negociación entre abogados", "Si ambas partes ya tienen letrado", "Sí"],
        ["Opinión de tercero experto", "Discrepancia técnica sobre importes o daños", "Sí"]
      ]
    },
    mistakes: [
      { t: "Confundir requerimiento con MASC", d: "Reclamar el pago por burofax no equivale a proponer un acuerdo con plazo de aceptación." },
      { t: "Usar WhatsApp o email corriente", d: "No acreditan contenido íntegro ni recepción con la solidez que exige el trámite." },
      { t: "Presentar la demanda antes de tiempo", d: "Sin el plazo vencido y el justificante, arriesgas la admisión y pierdes meses." },
      { t: "Proponer algo inaceptable", d: "Una propuesta desproporcionada puede leerse como un intento simulado de cumplir el trámite." },
      { t: "No actualizar el domicilio del inquilino", d: "Si el burofax no llega a un domicilio válido, no hay recepción que acreditar." }
    ],
    faqs: [
      { q: "¿Qué es exactamente un MASC?", a: "Un medio adecuado de solución de controversias: cualquiera de las vías previstas por la Ley Orgánica 1/2025 para intentar resolver un conflicto antes de acudir al juzgado, como la mediación, la conciliación o la oferta vinculante confidencial." },
      { q: "¿Qué pasa si demando sin haber intentado el MASC?", a: "La demanda puede no admitirse a trámite por faltar un requisito de procedibilidad, lo que supone perder tiempo y tener que empezar el intento desde cero." },
      { q: "¿Sirve un burofax reclamando el pago?", a: "Un requerimiento de pago sin propuesta concreta ni plazo de aceptación no equivale a un intento de MASC. Conviene formularlo como oferta vinculante confidencial." },
      { q: "¿Cuánto tiempo añade el MASC al procedimiento?", a: "En la práctica alrededor de un mes desde la recepción, que es el plazo mínimo de aceptación. A cambio, en bastantes casos el inquilino responde y se evita el pleito." },
      { q: "¿Necesito abogado para el MASC?", a: "Para preparar y enviar el intento, no es imprescindible. Para aceptar un acuerdo superior a 2.000 euros la ley exige firma de abogado, y para la demanda posterior necesitarás abogado y procurador." }
    ],
    guides: [
      ["blog-impago.html", "Tu inquilino no paga: qué hacer paso a paso"],
      ["blog-oferta-vinculante-confidencial.html", "La oferta vinculante confidencial explicada"],
      ["blog-reclamar-rentas-impagadas.html", "Reclamar las rentas tras el desahucio"],
      ["blog-fichero-inquilinos-morosos.html", "Ficheros de inquilinos morosos"]
    ],
    related: ["oferta-vinculante-confidencial-impago-alquiler", "modelo-contrato-alquiler-vivienda-habitual"]
  }
];

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const css = `:root{--ink:#0e1a2b;--muted:#5b6776;--line:#e2e8f0;--soft:#f6f8fb;--accent:#1f5fa6;--dark:#163f6e;--ok:#1d7a52}*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,sans-serif;color:var(--ink);line-height:1.65;background:#fff}a{color:var(--accent)}.wrap{max-width:920px;margin:auto;padding:0 24px}header{border-bottom:1px solid var(--line);position:sticky;top:0;background:rgba(255,255,255,.94);z-index:3}.nav{height:64px;display:flex;align-items:center;justify-content:space-between}.brand{font-family:Fraunces,serif;font-size:21px;font-weight:600;text-decoration:none;color:var(--ink)}.navlinks{display:flex;gap:16px;font-size:14px}.navlinks a{text-decoration:none;color:#334155}.hero{padding:56px 0 30px}.eyebrow{text-transform:uppercase;letter-spacing:.14em;color:var(--accent);font-weight:700;font-size:12px}h1,h2{font-family:Fraunces,Georgia,serif;line-height:1.16}h1{font-size:clamp(32px,5.4vw,48px);margin:14px 0 18px}h2{font-size:27px;margin:50px 0 16px}h3{font-size:17px;margin:0 0 8px}.lead{font-size:19px;color:var(--muted);max-width:720px}.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:28px 0}.fact,.card{border:1px solid var(--line);border-radius:14px;padding:20px;background:var(--soft)}.fact b{display:block;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:5px}.cta{display:inline-block;background:var(--accent);color:#fff;text-decoration:none;font-weight:700;padding:14px 22px;border-radius:10px;margin-top:8px}.cta:hover{background:var(--dark)}.price{margin-left:12px;color:var(--muted);font-size:14px}.body p{margin:0 0 16px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.card h3{margin:0 0 10px;font-size:17px}.card p{margin:0;font-size:14.5px;color:var(--muted)}.card ul,.check{margin:0;padding-left:20px}.card li,.check li{margin:8px 0}ol.steps{margin:0;padding-left:22px}ol.steps li{margin:0 0 14px}ol.steps b{display:block}ol.steps span{color:var(--muted);font-size:15px}.tw{overflow-x:auto;margin:18px 0;border:1px solid var(--line);border-radius:12px}table{border-collapse:collapse;width:100%;min-width:560px;font-size:14.5px}th,td{text-align:left;padding:11px 15px;border-bottom:1px solid var(--line);vertical-align:top}thead th{background:var(--soft);font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}tbody tr:last-child td{border-bottom:none}caption{caption-side:bottom;text-align:left;padding:10px 15px;font-size:12.5px;color:var(--muted);background:var(--soft);border-top:1px solid var(--line)}.source{border-left:4px solid var(--accent);padding:14px 18px;background:#eef4fb;border-radius:0 10px 10px 0}.faq details{border:1px solid var(--line);border-radius:12px;padding:15px 18px;margin:10px 0}.faq summary{font-weight:700;cursor:pointer}.faq p{margin:10px 0 0;color:var(--muted)}.guides{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:6px}.guides a{border:1px solid var(--line);border-radius:10px;padding:14px 16px;text-decoration:none;font-weight:600;font-size:15px}.related{display:grid;grid-template-columns:1fr 1fr;gap:12px}.related a{border:1px solid var(--line);border-radius:10px;padding:16px;text-decoration:none;font-weight:600}.note{font-size:13px;color:var(--muted);margin-top:34px;border-top:1px solid var(--line);padding-top:18px}footer{margin-top:64px;padding:30px 0;background:var(--ink);color:#a5b4c7;font-size:13px}footer a{color:#9fb0c6}@media(max-width:700px){.facts,.grid,.related,.guides{grid-template-columns:1fr}.navlinks{display:none}}`;

function render(p) {
  const url = `${DOMAIN}/casos/${p.slug}.html`;
  const priceLabel = p.free ? "Gratis · a cambio de tu email" : `${p.price} · pago único`;
  const offer = p.free
    ? { "@type": "Offer", price: "0", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: `${DOMAIN}/generador.html#${p.key}` }
    : { "@type": "Offer", price: p.price.replace(/[^\d,]/g, "").replace(",", "."), priceCurrency: "EUR", availability: "https://schema.org/InStock", url: `${DOMAIN}/generador.html#${p.key}` };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", name: p.title, description: p.meta, url, mainEntityOfPage: url, datePublished: "2026-07-21", dateModified: TODAY, inLanguage: "es-ES", isPartOf: { "@type": "WebSite", "@id": `${DOMAIN}/#website` } },
      { "@type": "Product", name: p.product, description: p.intro, url, brand: { "@type": "Brand", name: "Asesorfy" }, offers: offer },
      { "@type": "HowTo", name: `Cómo preparar ${p.title.toLowerCase()}`, description: p.intro, inLanguage: "es-ES", step: p.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.t, text: s.d })) },
      { "@type": "FAQPage", mainEntity: p.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${DOMAIN}/` },
        { "@type": "ListItem", position: 2, name: "Documentos", item: `${DOMAIN}/documentos.html` },
        { "@type": "ListItem", position: 3, name: p.title, item: url }
      ] }
    ]
  };

  const related = p.related.map(slug => pages.find(x => x.slug === slug)).filter(Boolean);

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(p.title)} | Asesorfy</title><meta name="description" content="${esc(p.meta)}"><meta name="robots" content="index,follow,max-image-preview:large"><meta name="author" content="Asesorfy"><link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:site_name" content="Asesorfy"><meta property="og:locale" content="es_ES"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.meta)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${DOMAIN}/assets/og-asesorfy.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/assets/asesorfy-mark.svg" type="image/svg+xml"><link rel="stylesheet" href="/brand.css"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><style>${css}</style><script type="application/ld+json">${JSON.stringify(schema)}</script><script defer src="/_vercel/insights/script.js"></script><script defer src="../posthog-analytics.js"></script></head><body><header><div class="wrap nav"><a class="brand" href="../index.html"><img class="brand-mark" src="/assets/asesorfy-mark.svg" alt="" width="32" height="32"><span class="brand-name">Asesor<span class="brand-accent">fy</span></span></a><nav class="navlinks"><a href="../documentos.html">Documentos</a><a href="../calculadora-rentabilidad-alquiler.html">Calculadora</a><a href="../blog.html">Blog</a><a href="../asesoria.html">Asesoría</a></nav></div></header><main class="wrap">

<section class="hero"><span class="eyebrow">${esc(p.category)} · Modelo actualizado</span><h1>${esc(p.title)}</h1><p class="lead">${esc(p.intro)}</p><div class="facts"><div class="fact"><b>Documento</b>${esc(p.product)}</div><div class="fact"><b>Precio</b>${esc(priceLabel)}</div><div class="fact"><b>Revisado</b>${TODAY_TXT}</div></div><a class="cta" href="../generador.html#${p.key}">${p.free ? "Crear el contrato gratis →" : "Personalizar el documento →"}</a><span class="price">Vista previa antes de ${p.free ? "descargar" : "pagar"}</span></section>

<section class="body"><h2>Qué dice la ley en este caso</h2>${p.context.map(t => `<p>${esc(t)}</p>`).join("")}</section>

<section><h2>Qué debes preparar</h2><ul class="check">${p.checklist.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>

<section><h2>Cláusulas que conviene revisar</h2><div class="grid">${p.clauses.map(c => `<div class="card"><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p></div>`).join("")}</div></section>

<section><h2>Cómo hacerlo paso a paso</h2><ol class="steps">${p.steps.map(s => `<li><b>${esc(s.t)}</b><span>${esc(s.d)}</span></li>`).join("")}</ol></section>

<section><h2>${esc(p.table.title)}</h2><div class="tw"><table><caption>${esc(p.table.caption)}</caption><thead><tr>${p.table.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${p.table.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>

<section><h2>Errores frecuentes</h2><div class="grid">${p.mistakes.map(m => `<div class="card"><h3>${esc(m.t)}</h3><p>${esc(m.d)}</p></div>`).join("")}</div></section>

<section><h2>Base legal</h2><p class="source">${esc(p.law)} <a href="${p.lawUrl}" target="_blank" rel="noopener noreferrer">Consultar el texto oficial en el BOE</a>.${p.key === "contrato-temporada" ? ` Consulta también el <a href="${NRUA}" target="_blank" rel="noopener noreferrer">RD 1312/2024 consolidado</a>: el procedimiento estatal de registro fue anulado por el Tribunal Supremo en 2026, pero siguen vigentes los registros autonómicos y locales.` : ""}${p.key === "contrato-larga" ? ` Sobre la actualización de la renta, el <a href="${INE_IRAV}" target="_blank" rel="noopener noreferrer">INE publica mensualmente el IRAV</a> y la <a href="${VIVIENDA}" target="_blank" rel="noopener noreferrer">Ley 12/2023 por el derecho a la vivienda</a> recoge el resto de novedades.` : ""}</p></section>

<section class="faq"><h2>Preguntas frecuentes</h2>${p.faqs.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</section>

<section><h2>Guías relacionadas</h2><div class="guides">${p.guides.map(([href, label]) => `<a href="../${href}">${esc(label)} →</a>`).join("")}</div></section>

<section><h2>Otros casos</h2><div class="related">${related.map(x => `<a href="${x.slug}.html">${esc(x.title)} →</a>`).join("")}</div></section>

<div style="text-align:center;margin-top:40px"><a class="cta" href="../generador.html#${p.key}">${p.free ? `Crear ${p.product.toLowerCase()} gratis →` : `Crear ${p.product.toLowerCase()} →`}</a></div>

<p class="note"><strong>Aviso legal.</strong> Contenido informativo y orientativo sobre normativa española, revisado el ${TODAY_TXT}. No constituye asesoramiento jurídico personalizado. La calificación del contrato y las obligaciones aplicables dependen de las circunstancias reales de cada caso, de la fecha de firma y, cuando corresponda, de la normativa autonómica o local. Para asuntos que requieran procedimiento judicial, consulta con un abogado colegiado.</p>

</main><footer><div class="wrap">© 2026 Asesorfy · Documentos legales para propietarios · Normativa española</div><div class="wrap" data-legalbar style="margin-top:12px;display:flex;gap:16px;flex-wrap:wrap;font-size:12.5px"><a href="../sobre.html">Sobre Asesorfy</a><a href="../aviso-legal.html">Aviso legal</a><a href="../privacidad.html">Privacidad</a><a href="../condiciones.html">Condiciones</a><a href="../cookies.html">Cookies</a></div></footer></body></html>`;
}

fs.mkdirSync("casos", { recursive: true });
for (const page of pages) fs.writeFileSync(`casos/${page.slug}.html`, render(page));

let sitemap = fs.readFileSync("sitemap.xml", "utf8");
sitemap = sitemap.replace(/\n?\s*<!-- Programmatic use-case pages -->[\s\S]*?<!-- End programmatic use-case pages -->\s*/g, "\n");
const urls = pages.map(p => `  <url><loc>${DOMAIN}/casos/${p.slug}.html</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("\n");
sitemap = sitemap.replace("</urlset>", `  <!-- Programmatic use-case pages -->\n${urls}\n  <!-- End programmatic use-case pages -->\n</urlset>`);
fs.writeFileSync("sitemap.xml", sitemap);
console.log(`Generadas ${pages.length} landings de casos y actualizado sitemap.xml`);
