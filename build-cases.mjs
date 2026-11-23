/* Genera landings de casos de uso reales para los documentos de Asesorfy.
   Cada página se escribe para responder por sí sola a la búsqueda que la trae:
   contexto legal, qué preparar, cláusulas explicadas, pasos, tabla, errores y FAQ. */
import fs from "node:fs";

const DOMAIN = "https://asesorfy.app";
const TODAY = "2026-11-23";
const TODAY_TXT = "23 de noviembre de 2026";
const LAU = "https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003";
const CC = "https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763";
const MASC = "https://www.boe.es/eli/es/lo/2025/01/02/1/con";
const NRUA = "https://www.boe.es/buscar/act.php?id=BOE-A-2024-26931";
const VIVIENDA = "https://www.boe.es/buscar/act.php?id=BOE-A-2023-12203";
const RDL = "https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823";
const INE_IRAV = "https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736169807";

const pages = [
  /* ─────────────────────────── VIVIENDA HABITUAL ─────────────────────────── */
  {
    slug: "modelo-contrato-alquiler-vivienda-habitual", category: "Vivienda habitual",
    title: "Modelo de contrato de alquiler de vivienda habitual 2026",
    meta: "Modelo de contrato de alquiler de vivienda habitual conforme a la LAU: duración mínima, prórrogas, fianza, desistimiento e IRAV, explicado cláusula a cláusula.",
    intro: "Un contrato de vivienda habitual se rige por reglas que no puedes cambiar aunque ambas partes firmen lo contrario. Este modelo las respeta, cita su base legal y te deja decidir solo lo que de verdad es negociable.",
    key: "contrato-larga", product: "Contrato de larga duración", price: "Gratis", free: true,
    law: "Ley 29/1994 de Arrendamientos Urbanos en la redacción del Real Decreto-ley 29/2026, especialmente arts. 9, 10, 11, 18, 20 y 36.", lawUrl: LAU,
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
      { t: "Duración y prórrogas", d: "Aunque pactes un año, el contrato se prorroga por anualidades hasta cinco años, o siete si el arrendador es persona jurídica (art. 9.1 LAU). Superado ese plazo entra la prórroga tácita de hasta tres años más del art. 10.1. Para contratos vigentes el 8 de octubre de 2026 cuya prórroga obligatoria termine antes del 31 de diciembre de 2028, la DF 5.ª del RDL 29/2026 permite al inquilino al corriente de pago pedir hasta dos años más." },
      { t: "Renta y actualización", d: "La actualización anual solo procede si está pactada y nunca puede superar la variación del IRAV (art. 18.1 LAU tras el RDL 29/2026). Hasta el 31 de diciembre de 2027, sin un nuevo pacto, la subida no puede pasar del 2 % y no hay subida si la renta supera el índice de referencia (DF 6.ª)." },
      { t: "Fianza y garantía adicional", d: "La fianza legal es de una mensualidad (art. 36 LAU) y debe depositarse en el organismo de tu comunidad autónoma. La garantía adicional no puede pasar de dos mensualidades en contratos de hasta cinco o siete años, y no se puede exigir al inquilino un seguro de impago (art. 36.5)." },
      { t: "Desistimiento del inquilino", d: "Puede irse pasados seis meses avisando con treinta días (art. 11 LAU). Desde el RDL 29/2026 ese desistimiento no genera indemnización a favor del arrendador (art. 11.3)." },
      { t: "Gastos y suministros", d: "Los suministros por contador son del inquilino. Los gastos generales solo son repercutibles si se pactan por escrito con su importe anual; los tributos de la vivienda, como el IBI, no se pueden imponer al inquilino salvo que sea el obligado tributario, y los gastos de gestión no se repercuten (art. 20 LAU)." },
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
      { t: "No pactar la actualización de la renta", d: "Sin cláusula, la renta se queda congelada toda la vida del contrato (art. 18.1 LAU)." },
      { t: "Entregar sin inventario ni fotos", d: "Al final del contrato no podrás justificar qué desperfecto es nuevo y cuál era desgaste ordinario." }
    ],
    faqs: [
      { q: "¿Cuánto dura como mínimo un contrato de vivienda habitual?", a: "Aunque pactes un plazo menor, se prorroga por anualidades hasta cinco años si el arrendador es persona física y siete si es persona jurídica, según el artículo 9.1 de la LAU." },
      { q: "¿La fianza es obligatoria y de cuánto?", a: "Sí. En vivienda habitual la LAU exige una mensualidad de renta en metálico (art. 36) y debe depositarse en el organismo que designe tu comunidad autónoma." },
      { q: "¿Puedo subir la renta cada año?", a: "Solo si la actualización está pactada en el contrato, y nunca por encima de la variación del IRAV (art. 18.1 LAU). Si el aniversario cae entre el 8 de octubre de 2026 y el 31 de diciembre de 2027, sin un nuevo pacto la subida máxima es del 2 % (DF 6.ª del RDL 29/2026)." },
      { q: "¿Puedo recuperar la vivienda antes de los cinco años?", a: "Únicamente si pactaste expresamente la necesidad de ocuparla para ti o un familiar de primer grado, conforme al artículo 9.3 de la LAU, y respetando el preaviso previsto." },
      { q: "¿Qué pasa si el inquilino se quiere ir antes de tiempo?", a: "Puede desistir pasados seis meses avisando con treinta días de antelación. Desde el Real Decreto-ley 29/2026, ese desistimiento no genera indemnización a favor del arrendador (art. 11.3 LAU)." }
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
    meta: "Cómo regular las mascotas en un contrato de alquiler: autorización expresa, responsabilidad por daños, convivencia, inventario y lo que puedes exigir.",
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
    meta: "Contrato de habitación para estudiantes tras el RDL 29/2026: vivienda temporal por estudios, causa acreditada, de 32 días a 12 meses, fianza de un mes y gastos.",
    intro: "Desde el 8 de octubre de 2026 alquilar una habitación a un estudiante que tiene su casa en otra ciudad es un arrendamiento de vivienda temporal de la LAU. La matrícula es la causa del contrato y tienes que poder probarla; la duración, la fianza y las reparaciones tienen reglas propias.",
    key: "contrato-temporada", product: "Contrato de vivienda temporal (habitación)", price: "9,99 €",
    law: "Ley 29/1994 de Arrendamientos Urbanos en la redacción del Real Decreto-ley 29/2026: arts. 2.3, 7.2, 9 bis, 11.2, 17.9, 21 bis y 36.", lawUrl: LAU,
    context: [
      "El Real Decreto-ley 29/2026 incluyó la habitación en la Ley de Arrendamientos Urbanos. El artículo 2.3 define el arrendamiento de vivienda temporal como el que recae sobre una vivienda, «incluido el arrendamiento parcial de una habitación o estancia», cuando el inquilino está temporalmente desplazado de su domicilio habitual «por causa justificada y acreditable». Un estudiante que mantiene su domicilio familiar en otro lugar y viene a hacer un curso encaja en esa definición.",
      "El artículo 7.2 obliga a escribir la causa en el contrato, exige que sea real y acreditable y pone la prueba a cargo del arrendador. Si falta, el contrato se trata como vivienda habitual desde la firma, con la duración mínima y las prórrogas de los artículos 9 y 10. La duración debe superar los 31 días y, como regla general, no pasar de 12 meses (art. 9 bis), algo que encaja con un curso académico.",
      "Si el estudiante vive en la habitación de forma estable y no tiene otro domicilio, el contrato es de vivienda habitual (art. 2.1) y conviene usar el contrato de habitación. Para contratos de habitación firmados antes del 8 de octubre de 2026 el real decreto-ley no trae una transitoria específica: revísalos antes de renovar. Y comprueba si tu comunidad autónoma tiene normas propias, que se aplican según la disposición adicional duodécima de la LAU."
    ],
    checklist: [
      "Identidad del estudiante y de quien vaya a avalar, si lo hay",
      "Matrícula, carta de admisión o convenio de prácticas que acredite la causa",
      "Domicilio habitual del estudiante fuera de la vivienda",
      "Fechas de inicio y fin ligadas al curso, entre 32 días y 12 meses",
      "Habitación concreta y zonas comunes que podrá usar",
      "Renta de la habitación y renta de referencia de la vivienda completa (art. 17.9)",
      "Inventario con fotos y criterio de reparto de suministros"
    ],
    clauses: [
      { t: "Causa de temporalidad", d: "Describe el curso, el centro y las fechas, y anota el documento que lo acredita. Sin causa escrita, el contrato pierde su carácter temporal (art. 7.2 LAU)." },
      { t: "Duración ligada al curso", d: "Más de 31 días y hasta 12 meses. Si el estudiante sigue el curso siguiente, la prórroga debe pactarse por escrito; encadenar más de dos contratos temporales con la misma persona convierte el primero en vivienda habitual (art. 9 bis)." },
      { t: "Renta y límite de la suma", d: "La suma de las rentas de las habitaciones alquiladas a la vez no puede superar la renta del contrato de la vivienda completa (art. 17.9 LAU)." },
      { t: "Fianza y aval", d: "Una mensualidad de fianza (art. 36.1). La garantía adicional, incluido un depósito extra, no puede superar una mensualidad en arrendamientos temporales y no se puede exigir seguro de impago (art. 36.5). Un aval personal de los padres debe constar por escrito." },
      { t: "Desistimiento", d: "El estudiante puede irse pasado un mes desde la firma avisando con diez días, sin indemnización (art. 11.2 y 11.3). Pacta solo la forma del aviso." },
      { t: "Reparaciones", d: "En vivienda temporal el arrendador asume la conservación y las pequeñas reparaciones por uso ordinario, y debe responder a los avisos en cinco días hábiles (art. 21 bis)." },
      { t: "Convivencia y zonas comunes", d: "Horarios, visitas, limpieza y uso de cocina y baño se pueden pactar dentro del marco del título II. Un anexo de normas evita la mayoría de los conflictos." }
    ],
    steps: [
      { t: "Comprueba la causa", d: "Pide la matrícula o la carta de admisión y confirma que el estudiante mantiene su domicilio habitual en otro lugar." },
      { t: "Fija las fechas", d: "Ajusta el contrato al curso, por encima de 31 días y sin pasar de 12 meses." },
      { t: "Calcula las rentas", d: "Suma las rentas de todas las habitaciones alquiladas a la vez y compáralas con la renta de la vivienda completa." },
      { t: "Redacta normas y reparto de gastos", d: "Incluye en anexos las normas de convivencia y el criterio de reparto de suministros; los tributos y los gastos de gestión no se repercuten (art. 20)." },
      { t: "Firma con inventario", d: "Inventario de la habitación y de las zonas comunes con fotos fechadas, firmado por ambas partes." },
      { t: "Cierra con el documento de finalización", d: "Al salir, deja constancia escrita del estado de la habitación (art. 36.7). Sin él, se presume que se devolvió bien." }
    ],
    table: {
      title: "Habitación para un estudiante: temporal o habitual", caption: "Régimen de la LAU desde el 8 de octubre de 2026 según la situación del estudiante.",
      head: ["Aspecto", "Estudiante desplazado (vivienda temporal)", "Estudiante sin otro domicilio (vivienda habitual)"],
      rows: [
        ["Norma", "Arts. 2.3, 7.2 y 9 bis LAU", "Arts. 2.1 y título II LAU"],
        ["Duración", "Más de 31 días y hasta 12 meses", "Prórroga obligatoria hasta 5 años (7 si el arrendador es persona jurídica)"],
        ["Fianza", "1 mensualidad", "1 mensualidad"],
        ["Garantía adicional máxima", "1 mensualidad", "2 mensualidades"],
        ["Desistimiento del inquilino", "Tras 1 mes, avisando con 10 días", "Tras 6 meses, avisando con 30 días"],
        ["Pequeñas reparaciones", "Del arrendador (art. 21 bis)", "Del inquilino (art. 21.4)"]
      ]
    },
    mistakes: [
      { t: "Seguir usando el modelo del Código Civil", d: "Desde el RDL 29/2026 la habitación está en la LAU. Una cláusula que diga que no se aplica la ley no cambia el régimen." },
      { t: "Poner una causa genérica", d: "«Por estudios» sin centro, curso ni fechas es difícil de probar, y la prueba es tuya." },
      { t: "Pedir dos meses de fianza o un seguro de impago", d: "En vivienda temporal la fianza es de un mes, la garantía adicional de máximo otro y el seguro de impago no se puede exigir." },
      { t: "Encadenar contratos curso tras curso", d: "Más de dos contratos temporales consecutivos con la misma persona convierten el primero en vivienda habitual." },
      { t: "Cobrar por habitaciones más que por el piso", d: "La suma de rentas simultáneas no puede superar la renta del contrato de la vivienda completa." }
    ],
    faqs: [
      { q: "¿El alquiler de una habitación a un estudiante se rige por la LAU?", a: "Sí, desde el 8 de octubre de 2026. Si el estudiante está desplazado de su domicilio habitual por sus estudios, es un arrendamiento de vivienda temporal (art. 2.3 LAU); si vive ahí de forma habitual, es vivienda habitual (art. 2.1)." },
      { q: "¿Puedo firmar solo por el curso académico?", a: "Sí, si es vivienda temporal: la duración debe superar los 31 días y, como regla general, no pasar de 12 meses (art. 9 bis LAU). La causa del desplazamiento debe constar en el contrato y poder acreditarse." },
      { q: "¿Cuánta fianza puedo pedir por la habitación?", a: "Una mensualidad de fianza en metálico (art. 36.1 LAU) y, como mucho, otra mensualidad de garantía adicional en arrendamientos temporales (art. 36.5). No puedes exigir un seguro de impago." },
      { q: "¿Qué pasa si el estudiante se va a mitad de curso?", a: "Puede desistir pasado un mes desde la firma avisando con diez días de antelación, y ese desistimiento no genera indemnización a tu favor (art. 11.2 y 11.3 LAU)." },
      { q: "¿Cuánto puedo cobrar por cada habitación?", a: "La suma de las rentas de todas las habitaciones alquiladas a la vez no puede superar la renta del contrato de la vivienda completa (art. 17.9 LAU); en zona tensionada se aplican además los límites del artículo 17." }
    ],
    guides: [
      ["blog-habitacion.html", "Alquilar por habitaciones tras el RDL 29/2026"],
      ["blog-temporada.html", "Alquiler de temporada: vivienda temporal en la LAU"],
      ["blog-fianza-alquiler-habitacion.html", "Fianza en el alquiler de habitación"],
      ["blog-normas-convivencia-piso-compartido.html", "Normas de convivencia en piso compartido"]
    ],
    related: ["contrato-alquiler-habitacion-piso-compartido", "contrato-alquiler-temporada-estudiantes"]
  },

  {
    slug: "contrato-alquiler-habitacion-piso-compartido", category: "Alquiler de habitación",
    title: "Contrato de habitación en piso compartido: modelo 2026",
    meta: "Contrato de habitación en piso compartido tras el RDL 29/2026: régimen de la LAU, suma de rentas con tope, fianza de un mes, convivencia, suministros y subarriendo.",
    intro: "Desde el 8 de octubre de 2026 la habitación que es la vivienda habitual de su inquilino es un arrendamiento de vivienda de la LAU. El piso compartido sigue necesitando buenas normas de convivencia, pero ahora con el marco del título II y un tope nuevo: las rentas de las habitaciones no pueden sumar más que la del piso entero.",
    key: "contrato-habitacion", product: "Contrato de habitación", price: "9,99 €",
    law: "Ley 29/1994 de Arrendamientos Urbanos en la redacción del Real Decreto-ley 29/2026: arts. 2.1, 4.2, 8, 9, 10, 11, 17.9, 18, 20 y 36; Código Civil con carácter supletorio.", lawUrl: LAU,
    context: [
      "El nuevo artículo 2.1 de la LAU considera arrendamiento de vivienda habitual el que satisface la necesidad de vivienda del arrendatario, «incluido el arrendamiento parcial de una habitación o estancia de la vivienda». El artículo 4.2 añade que se rige por lo pactado «en el marco de lo establecido en el título II» y solo de forma supletoria por el Código Civil. Hasta octubre de 2026 la opinión mayoritaria situaba la habitación fuera de la LAU; para los contratos nuevos eso ha cambiado.",
      "En la práctica, al compañero de piso que vive en su habitación le alcanzan las reglas de cualquier inquilino de vivienda: duración y prórrogas de los artículos 9 y 10, fianza de una mensualidad, actualización solo si se pacta y con el IRAV como tope, desistimiento sin indemnización y los límites del artículo 20 en gastos. La convivencia, las visitas, la limpieza o el uso de las zonas comunes se siguen pactando, siempre dentro de ese marco.",
      "El artículo 17.9 fija un límite nuevo: la suma de las rentas de los contratos de habitación vigentes a la vez no puede superar la renta del contrato de la vivienda completa, y en zona tensionada hay que respetar además los apartados 6, 7 y 8. El real decreto-ley no trae una transitoria específica para los contratos de habitación firmados antes del 8 de octubre de 2026, así que conviene revisarlos; y las comunidades autónomas pueden tener normas propias (DA 12.ª LAU)."
    ],
    checklist: [
      "Habitación concreta, espacios de uso exclusivo y zonas comunes",
      "Renta de cada habitación y renta de referencia de la vivienda completa",
      "Criterio de reparto de suministros entre ocupantes",
      "Normas de convivencia en un anexo firmado",
      "Inventario de la habitación y de las zonas comunes con fotos",
      "Fianza de una mensualidad y, si la hay, garantía adicional dentro de su límite"
    ],
    clauses: [
      { t: "Objeto y destino", d: "Identifica la habitación, las zonas comunes y que se destina a vivienda habitual del inquilino. Si está desplazado temporalmente, usa el contrato de vivienda temporal." },
      { t: "Duración y prórrogas", d: "Pacta la duración inicial sabiendo que se prorroga por años hasta cinco (siete si el arrendador es persona jurídica) y después opera la tácita del art. 10." },
      { t: "Límite de la suma de rentas", d: "Deja constancia de la renta de referencia de la vivienda completa y de que la suma de las rentas simultáneas no la supera (art. 17.9)." },
      { t: "Suministros y gastos", d: "Reparte los suministros con un criterio objetivo. Los tributos de la vivienda no se imponen al inquilino y los gastos de gestión no se repercuten (art. 20)." },
      { t: "Convivencia", d: "Horarios de descanso, visitas, pernoctaciones, limpieza y uso de cocina y baño, en un anexo que todos conozcan." },
      { t: "Subarriendo y sustitución", d: "El subarriendo necesita tu consentimiento escrito (art. 8 LAU). Si un ocupante se va, firma un contrato nuevo con quien entre." },
      { t: "Salida y documento de finalización", d: "El inquilino puede desistir tras seis meses con treinta días de aviso y sin indemnización (art. 11). Al salir, firmad el documento de finalización del art. 36.7." }
    ],
    steps: [
      { t: "Define qué alquilas", d: "Habitación, espacios exclusivos y zonas comunes. Cuanto más concreto, menos discusión." },
      { t: "Calcula las rentas", d: "Suma las rentas de todas las habitaciones y compárala con la del piso entero antes de anunciar." },
      { t: "Calcula la cuota de suministros", d: "Mira el consumo real de los últimos doce meses y fija un criterio de reparto claro." },
      { t: "Redacta las normas de convivencia", d: "Pocas, claras y aplicables a todos. Adjúntalas como anexo firmado." },
      { t: "Firma con inventario", d: "Fotos fechadas de la habitación y de las zonas comunes, y lecturas de contadores." },
      { t: "Deposita la fianza", d: "Es una mensualidad. Consulta el organismo y el plazo de depósito de tu comunidad autónoma." }
    ],
    table: {
      title: "Antes y después del RDL 29/2026", caption: "Cambios principales para un contrato de habitación nuevo en piso compartido.",
      head: ["Aspecto", "Modelo antiguo (Código Civil)", "Contrato nuevo (LAU tras el RDL 29/2026)"],
      rows: [
        ["Norma aplicable", "Arts. 1255 y 1542 y ss. CC", "Título II de la LAU (arts. 2.1 y 4.2)"],
        ["Duración", "La pactada", "Prórrogas de los arts. 9 y 10 LAU"],
        ["Fianza", "La pactada", "1 mensualidad (art. 36.1)"],
        ["Actualización de la renta", "Libertad de pactos", "Solo si se pacta y con el IRAV como tope (art. 18.1)"],
        ["Suma de rentas", "Sin límite legal", "No puede superar la renta del piso completo (art. 17.9)"],
        ["Salida anticipada", "Lo pactado", "Tras 6 meses con 30 días de aviso, sin indemnización (art. 11)"]
      ]
    },
    mistakes: [
      { t: "Mantener la cláusula «no se aplica la LAU»", d: "El régimen lo fija la ley según el uso real de la habitación, no la etiqueta del contrato." },
      { t: "Sumar rentas por encima del piso entero", d: "Es el límite nuevo del art. 17.9 y el más fácil de comprobar." },
      { t: "Cuota de suministros calculada a la baja", d: "Genera revisiones constantes y la sensación de que cambias las reglas a mitad de contrato." },
      { t: "Penalizar la salida anticipada", d: "El desistimiento del art. 11 no genera indemnización a favor del arrendador." },
      { t: "Normas que solo conoce el casero", d: "Si no están en un anexo firmado, cuesta exigirlas." }
    ],
    faqs: [
      { q: "¿Un contrato de habitación en piso compartido se rige por la LAU?", a: "Sí, desde el 8 de octubre de 2026, cuando la habitación es la vivienda habitual del inquilino (art. 2.1 LAU). Se rige por lo pactado dentro del título II y, de forma supletoria, por el Código Civil." },
      { q: "¿Puedo cobrar por las habitaciones más que por el piso entero?", a: "No. La suma de las rentas de los contratos de habitación vigentes a la vez no puede superar la renta del contrato de la vivienda completa (art. 17.9 LAU)." },
      { q: "¿Siguen valiendo las normas de convivencia?", a: "Sí. Se pueden pactar horarios, visitas, limpieza y uso de zonas comunes, siempre que no contradigan las reglas imperativas del título II de la LAU." },
      { q: "¿Qué hago si un inquilino se va a mitad de contrato?", a: "Puede desistir pasados seis meses avisando con treinta días y sin indemnización (art. 11 LAU). Para quien entre, firma un contrato nuevo en lugar de ceder el anterior." },
      { q: "¿Qué pasa con los contratos de habitación que firmé antes del 8 de octubre de 2026?", a: "El Real Decreto-ley 29/2026 no trae una transitoria específica para ellos. Conviene revisarlos, comprobar la suma de rentas y firmar las renovaciones ya con el régimen de la LAU." }
    ],
    guides: [
      ["blog-habitacion.html", "Alquilar por habitaciones tras el RDL 29/2026"],
      ["blog-normas-convivencia-piso-compartido.html", "Normas de convivencia en piso compartido"],
      ["blog-subarrendar-habitacion.html", "Subarrendar una habitación: permiso y límites"],
      ["blog-fianza-alquiler-habitacion.html", "Fianza en el alquiler de habitación"]
    ],
    related: ["contrato-alquiler-habitacion-estudiantes", "modelo-contrato-alquiler-vivienda-habitual"]
  },

  /* ──────────────────────────────── TEMPORADA ──────────────────────────────── */
  {
    slug: "contrato-alquiler-temporada-por-trabajo", category: "Alquiler de temporada",
    title: "Contrato de alquiler de temporada por trabajo 2026",
    meta: "Contrato de temporada por desplazamiento laboral tras el RDL 29/2026: vivienda temporal, causa acreditada, de 32 días a 12 meses, fianza de un mes y desistimiento.",
    intro: "Desde el 8 de octubre de 2026 el alquiler de temporada para alguien que se desplaza por trabajo es un arrendamiento de vivienda temporal de la LAU. La causa laboral tiene que figurar en el contrato y poder probarse, y la duración tiene un margen de más de 31 días y, como regla, hasta 12 meses.",
    key: "contrato-temporada", product: "Contrato de temporada", price: "9,99 €",
    law: "Ley 29/1994 de Arrendamientos Urbanos en la redacción del Real Decreto-ley 29/2026: arts. 2.3, 3.2, 7.2, 9 bis, 11.2, 17.8, 20, 21 bis y 36, y disposición transitoria octava.", lawUrl: LAU,
    context: [
      "Hasta octubre de 2026 el alquiler de temporada se encajaba en el artículo 3 de la LAU como uso distinto del de vivienda. El Real Decreto-ley 29/2026 cambió ese esquema: el nuevo artículo 3.2 excluye del uso distinto «en todo caso» los contratos que tengan por objeto «el alojamiento u hospedaje de personas», y el artículo 2.3 crea el arrendamiento de vivienda temporal para quien está «temporalmente desplazado de su domicilio habitual, por causa justificada y acreditable».",
      "Un destino laboral temporal es el ejemplo típico. El artículo 7.2 exige que la causa conste de forma expresa, que sea real y acreditable y pone la prueba a cargo del arrendador; sin ella, el contrato se rige como vivienda habitual desde la firma. La duración debe superar los 31 días y, como regla general, no pasar de 12 meses (art. 9 bis). Superar ese plazo sin justificación o encadenar más de dos contratos temporales con la misma persona convierte el primero en vivienda habitual.",
      "Los contratos de temporada firmados antes del 8 de octubre de 2026 siguen siendo de uso distinto hasta su vencimiento y entonces se extinguen sin prórroga; si se renuevan, el nuevo contrato ya es de vivienda temporal (disposición transitoria octava de la LAU). Las comunidades autónomas pueden tener normas propias sobre vivienda temporal, que se aplican en su territorio (DA 12.ª)."
    ],
    checklist: [
      "Carta de la empresa, contrato temporal o comisión de servicio con fechas",
      "Domicilio habitual del trabajador, que se mantiene durante el contrato",
      "Fechas de inicio y fin coherentes con el destino, de 32 días a 12 meses",
      "Fianza de una mensualidad y, si se pacta, garantía adicional de máximo otra",
      "Inventario detallado con fotos fechadas",
      "Registros o comunicaciones autonómicos o locales si lo anuncias en plataformas"
    ],
    clauses: [
      { t: "Causa de temporalidad", d: "Quién se desplaza, desde qué domicilio, por qué destino laboral y hasta cuándo. Anota el documento que lo acredita: la prueba es tuya (art. 7.2)." },
      { t: "Duración", d: "Más de 31 días y hasta 12 meses. Si el destino se alarga, la prórroga debe pactarse expresamente y la causa debe seguir existiendo (art. 9 bis)." },
      { t: "Fianza y garantías", d: "Una mensualidad de fianza (art. 36.1). La garantía adicional no puede superar una mensualidad en arrendamientos temporales y no se puede exigir seguro de impago (art. 36.5)." },
      { t: "Desistimiento", d: "El inquilino puede irse pasado un mes desde la firma avisando con diez días, sin indemnización (art. 11.2 y 11.3)." },
      { t: "Conservación y reparaciones", d: "El arrendador asume la conservación y las pequeñas reparaciones por uso ordinario y debe responder en cinco días hábiles (art. 21 bis)." },
      { t: "Gastos", d: "Suministros por contador a cargo del inquilino; gastos generales solo si se pactan por escrito con su importe; nunca tributos de la vivienda ni gastos de gestión (art. 20)." },
      { t: "Contratos sucesivos", d: "Si vuelves a alquilar a otro trabajador desplazado, la renta del nuevo contrato temporal no puede subir más que el IRAV vigente (art. 17.8)." }
    ],
    steps: [
      { t: "Comprueba la causa", d: "Pide el documento del destino laboral y confirma que el inquilino conserva su domicilio habitual." },
      { t: "Ajusta las fechas", d: "Haz coincidir el contrato con el destino, por encima de 31 días y sin pasar de 12 meses." },
      { t: "Redacta la causa en el contrato", d: "Concreta y con referencia al documento que la acredita." },
      { t: "Fija garantías dentro del límite", d: "Una mensualidad de fianza y, como mucho, otra de garantía adicional." },
      { t: "Firma con inventario", d: "Estado de la vivienda y del mobiliario con fotos, firmado por ambas partes." },
      { t: "Cierra con el documento de finalización", d: "Al terminar, deja constancia escrita del estado de la vivienda (art. 36.7)." }
    ],
    table: {
      title: "Temporada antes y después del 8 de octubre de 2026", caption: "Régimen de un contrato de temporada según su fecha de firma.",
      head: ["Aspecto", "Firmado antes del 8-10-2026", "Firmado desde el 8-10-2026"],
      rows: [
        ["Calificación", "Uso distinto del de vivienda (DT 8.ª)", "Vivienda temporal (art. 2.3 LAU)"],
        ["Causa", "La pactada", "Expresa, real y acreditable; prueba del arrendador (art. 7.2)"],
        ["Duración", "La pactada, sin prórroga al vencer", "Más de 31 días y hasta 12 meses (art. 9 bis)"],
        ["Fianza legal", "2 mensualidades", "1 mensualidad (art. 36.1)"],
        ["Garantía adicional", "La pactada", "Máximo 1 mensualidad (art. 36.5)"],
        ["Desistimiento", "Lo pactado", "Tras 1 mes con 10 días de aviso, sin indemnización (art. 11.2)"]
      ]
    },
    mistakes: [
      { t: "Seguir citando el artículo 3 LAU", d: "Para contratos nuevos, el alojamiento de personas quedó fuera del uso distinto. El modelo debe ser de vivienda temporal." },
      { t: "Causa genérica o sin prueba", d: "«Motivos laborales» sin más es difícil de sostener, y la carga de la prueba es tuya." },
      { t: "Pedir dos mensualidades de fianza", d: "En vivienda temporal la fianza es de una mensualidad." },
      { t: "Encadenar contratos con el mismo inquilino", d: "Más de dos contratos temporales consecutivos convierten el primero en vivienda habitual." },
      { t: "Cargar al inquilino las pequeñas reparaciones", d: "En vivienda temporal son del arrendador (art. 21 bis)." }
    ],
    faqs: [
      { q: "¿El alquiler de temporada por trabajo sigue siendo uso distinto del de vivienda?", a: "Para contratos firmados desde el 8 de octubre de 2026, no: es arrendamiento de vivienda temporal (art. 2.3 LAU) y el artículo 3.2 excluye el alojamiento de personas del uso distinto. Los anteriores conservan esa consideración hasta su vencimiento." },
      { q: "¿Cuánto puede durar el contrato?", a: "Más de 31 días y, como regla general, hasta 12 meses (art. 9 bis LAU). Si el destino se alarga y la causa sigue, se puede prorrogar por acuerdo expreso." },
      { q: "¿Cuánta fianza corresponde en un alquiler de temporada nuevo?", a: "Una mensualidad de fianza, como en cualquier arrendamiento de vivienda (art. 36.1 LAU), y como máximo otra de garantía adicional (art. 36.5). No se puede exigir seguro de impago." },
      { q: "¿Qué pasa si el trabajador termina antes su destino?", a: "Puede desistir pasado un mes desde la firma avisando con diez días de antelación, sin indemnización para el arrendador (art. 11.2 y 11.3 LAU)." },
      { q: "¿Qué pasa con mi contrato de temporada firmado antes del 8 de octubre de 2026?", a: "Sigue con su régimen anterior hasta la fecha de fin pactada y entonces se extingue sin prórroga. Si lo renováis, el contrato nuevo se rige por las reglas de vivienda temporal (DT 8.ª LAU)." }
    ],
    guides: [
      ["blog-temporada.html", "Alquiler de temporada: vivienda temporal en la LAU"],
      ["blog-alquiler-temporada-o-turistico.html", "Temporada o turístico: diferencias"],
      ["blog-garantia-adicional-alquiler.html", "Garantía adicional: límites"],
      ["blog-inventario-contrato-alquiler.html", "Inventario y documento de finalización"]
    ],
    related: ["contrato-alquiler-temporada-estudiantes", "modelo-contrato-alquiler-vivienda-habitual"]
  },

  {
    slug: "contrato-alquiler-temporada-estudiantes", category: "Alquiler de temporada",
    title: "Contrato de alquiler de temporada para estudiantes 2026",
    meta: "Contrato de temporada para estudiantes tras el RDL 29/2026: vivienda completa durante el curso como vivienda temporal, causa acreditada, fianza de un mes e inventario.",
    intro: "Ceder el piso entero a uno o varios estudiantes durante el curso es, desde el 8 de octubre de 2026, un arrendamiento de vivienda temporal de la LAU. La matrícula es la causa que tienes que escribir y poder probar, y las garantías y la salida anticipada tienen reglas nuevas.",
    key: "contrato-temporada", product: "Contrato de temporada", price: "9,99 €",
    law: "Ley 29/1994 de Arrendamientos Urbanos en la redacción del Real Decreto-ley 29/2026: arts. 2.3, 7.2, 9 bis, 11.2, 21 bis y 36, y disposición transitoria octava; Código Civil con carácter supletorio.", lawUrl: LAU,
    context: [
      "Cuando cedes la vivienda completa a estudiantes que mantienen su domicilio familiar en otra ciudad, satisfaces una necesidad de vivienda temporal por estudios. Desde el Real Decreto-ley 29/2026 eso es un arrendamiento de vivienda temporal del artículo 2.3 de la LAU y ya no un uso distinto del de vivienda: el artículo 3.2 excluye «en todo caso» el alojamiento de personas.",
      "La causa debe constar en el contrato y poder acreditarse con la matrícula, la carta de admisión o el convenio de prácticas; la prueba es del arrendador (art. 7.2). La duración debe superar los 31 días y, como regla general, no pasar de 12 meses (art. 9 bis), lo que encaja con un curso. Si el contrato se alarga sin justificación o encadenas más de dos contratos temporales con los mismos estudiantes, el primero se trata como vivienda habitual.",
      "Si alquilas habitaciones sueltas en lugar del piso entero, también entran en la LAU (arts. 2.1 y 2.3) y la suma de sus rentas no puede superar la renta de la vivienda completa (art. 17.9). Los contratos de temporada firmados antes del 8 de octubre de 2026 siguen con su régimen anterior hasta su vencimiento, sin prórroga (DT 8.ª)."
    ],
    checklist: [
      "Identidad de todos los estudiantes que firman y, si lo hay, del avalista",
      "Matrícula, carta de admisión o convenio de prácticas de cada uno",
      "Domicilio habitual de los estudiantes fuera de la vivienda",
      "Fechas ajustadas al curso, de 32 días a 12 meses",
      "Fianza de una mensualidad y, si procede, garantía adicional de máximo otra o aval personal",
      "Inventario detallado con fotos fechadas"
    ],
    clauses: [
      { t: "Causa académica", d: "Centro, estudios y curso, con referencia al documento que lo acredita (art. 7.2 LAU)." },
      { t: "Duración ligada al curso", d: "Más de 31 días y hasta 12 meses. Si siguen el curso siguiente, la prórroga se pacta por escrito; no encadenes más de dos contratos temporales con las mismas personas (art. 9 bis)." },
      { t: "Responsabilidad solidaria", d: "Si firman varios estudiantes, conviene que respondan solidariamente de la renta y de los daños." },
      { t: "Fianza y aval", d: "Una mensualidad de fianza (art. 36.1). La garantía adicional no puede superar una mensualidad en arrendamientos temporales; un aval personal de los padres debe constar por escrito. No se puede exigir seguro de impago (art. 36.5)." },
      { t: "Desistimiento", d: "Pasado un mes desde la firma y avisando con diez días, sin indemnización (art. 11.2 y 11.3)." },
      { t: "Reparaciones", d: "La conservación y las pequeñas reparaciones por uso ordinario son del arrendador, que debe responder en cinco días hábiles (art. 21 bis)." }
    ],
    steps: [
      { t: "Comprueba la causa", d: "Matrícula o admisión de cada estudiante y domicilio habitual fuera de la vivienda." },
      { t: "Ajusta las fechas al curso", d: "Más de 31 días y sin pasar de 12 meses." },
      { t: "Decide las garantías", d: "Fianza de una mensualidad y, si lo ves necesario, aval de los padres o garantía adicional dentro del límite de una mensualidad." },
      { t: "Reparte la renta y los gastos", d: "Renta conjunta con responsabilidad solidaria y suministros por contador; sin repercutir tributos ni gastos de gestión (art. 20)." },
      { t: "Firma con inventario", d: "Con estudiantes el desgaste es mayor: fotografía todo al entrar." },
      { t: "Cierra con el documento de finalización", d: "En junio, deja constancia escrita del estado de la vivienda (art. 36.7)." }
    ],
    table: {
      title: "Qué contrato corresponde a cada situación", caption: "Régimen aplicable a estudiantes desde el 8 de octubre de 2026.",
      head: ["Situación", "Régimen", "Fianza legal"],
      rows: [
        ["Vivienda completa por el curso, estudiantes desplazados", "Vivienda temporal (art. 2.3 LAU)", "1 mensualidad"],
        ["Habitación para un estudiante desplazado", "Vivienda temporal (arts. 2.3 y 17.9 LAU)", "1 mensualidad"],
        ["Estudiante que vive de forma habitual en la vivienda", "Vivienda habitual (art. 2.1 LAU)", "1 mensualidad"],
        ["Contrato de temporada firmado antes del 8-10-2026", "Uso distinto hasta su vencimiento (DT 8.ª)", "La pactada con el régimen anterior"]
      ]
    },
    mistakes: [
      { t: "Usar la plantilla de uso distinto", d: "Para contratos nuevos, el alojamiento de personas quedó fuera del artículo 3. El contrato debe ser de vivienda temporal." },
      { t: "No guardar la matrícula", d: "La causa debe ser acreditable y la prueba es tuya." },
      { t: "Pedir dos mensualidades de fianza", d: "En vivienda temporal la fianza es de una mensualidad y la garantía adicional, de máximo otra." },
      { t: "Renovar año tras año con contratos temporales", d: "Más de dos contratos consecutivos con las mismas personas convierten el primero en vivienda habitual." },
      { t: "Inventario superficial", d: "Con estudiantes el desgaste es mayor y la discusión de junio es previsible. Sin fotos ni documento de finalización, la pierdes." }
    ],
    faqs: [
      { q: "¿Alquilar a estudiantes es siempre contrato de temporada?", a: "Es vivienda temporal cuando los estudiantes mantienen su domicilio habitual en otro lugar y la causa académica consta y se puede acreditar (arts. 2.3 y 7.2 LAU). Si viven ahí de forma habitual, es vivienda habitual." },
      { q: "¿Puedo hacer el contrato solo por el curso?", a: "Sí. En vivienda temporal la duración debe superar los 31 días y, como regla general, no pasar de 12 meses (art. 9 bis LAU)." },
      { q: "¿Cuánta fianza puedo pedir?", a: "Una mensualidad de fianza (art. 36.1 LAU) y, como mucho, otra de garantía adicional en arrendamientos temporales (art. 36.5). No se puede exigir un seguro de impago." },
      { q: "¿Puedo pedir aval a los padres?", a: "Sí, como garantía personal adicional. Debe constar por escrito, identificando al avalista y lo que garantiza; el depósito en dinero adicional a la fianza tiene el tope de una mensualidad." },
      { q: "¿Qué pasa con un contrato de temporada para estudiantes firmado antes del 8 de octubre de 2026?", a: "Sigue con su régimen anterior hasta la fecha de fin pactada y entonces se extingue sin prórroga. Si se renueva, el nuevo contrato es de vivienda temporal (DT 8.ª LAU)." }
    ],
    guides: [
      ["blog-temporada.html", "Alquiler de temporada: vivienda temporal en la LAU"],
      ["blog-habitacion.html", "Alquilar por habitaciones tras el RDL 29/2026"],
      ["blog-garantia-adicional-alquiler.html", "Garantía adicional y aval"],
      ["blog-devolucion-fianza-alquiler.html", "Devolución de la fianza"]
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
      { t: "Hacer la oferta sin abogado por encima de 2.000 €", d: "Si la deuda supera los 2.000 euros, la Ley Orgánica 1/2025 (art. 6.2) exige asistencia de abogado para formular la oferta vinculante y para aceptarla." }
    ],
    faqs: [
      { q: "¿Es obligatorio intentar un acuerdo antes de demandar por impago?", a: "Sí. La Ley Orgánica 1/2025 configura el intento de un medio adecuado de solución de controversias como requisito de procedibilidad para la demanda civil desde abril de 2025." },
      { q: "¿Qué plazo tiene el inquilino para aceptar la oferta?", a: "Un mes desde la recepción, que es el plazo mínimo legal. Si no responde dentro de ese plazo, se entiende que la rechaza." },
      { q: "¿Cómo debo enviar la oferta vinculante confidencial?", a: "Por un medio que deje constancia de la identidad del remitente, del contenido íntegro, de la recepción y de la fecha. El burofax con certificación de texto y acuse de recibo es la vía habitual." },
      { q: "¿Tengo que aportar el escrito con la demanda?", a: "No. Por su carácter confidencial, el contenido íntegro no se aporta: basta acreditar el envío y la recepción mediante el justificante." },
      { q: "¿Necesito abogado para este escrito?", a: "Si la deuda no supera los 2.000 euros, no: puedes redactarla y enviarla tú. Por encima de esa cifra, la Ley Orgánica 1/2025 (art. 6.2) exige asistencia de abogado tanto para formular la oferta como para aceptarla." }
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
      "Lo que la ley sí exige es que el intento sea real y demostrable. Eso significa una propuesta concreta, un plazo de aceptación de al menos un mes y un envío que deje constancia de contenido, recepción y fecha. Un mensaje de WhatsApp diciendo que pague no cumple ninguno de los tres requisitos.",
      "Después del MASC, ten en cuenta dos novedades del Real Decreto-ley 29/2026 en vigor desde el 8 de octubre de 2026. Si el inquilino acredita vulnerabilidad económica y la Administración no ofrece una alternativa habitacional, el nuevo artículo 22.6 de la Ley de Enjuiciamiento Civil le da a la Administración un plazo de dos meses para pagar o consignar la deuda, con el procedimiento suspendido mientras tanto. Y el artículo 2 del real decreto-ley prevé, hasta el 31 de diciembre de 2030, la suspensión del proceso cuando el demandado es vulnerable y no tiene alternativa habitacional, con reglas distintas según quién demande."
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
      { q: "¿Necesito abogado para el MASC?", a: "Depende del medio. Si usas una oferta vinculante confidencial y la deuda supera los 2.000 euros, la ley exige asistencia de abogado para formularla y para aceptarla (art. 6.2 de la Ley Orgánica 1/2025); una negociación directa entre las partes no lo exige, y para la demanda posterior necesitarás abogado y procurador." }
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

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(p.title.length + 11 <= 60 ? `${p.title} | Asesorfy` : p.title)}</title><meta name="description" content="${esc(p.meta)}"><meta name="robots" content="index,follow,max-image-preview:large"><meta name="author" content="Asesorfy"><link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:site_name" content="Asesorfy"><meta property="og:locale" content="es_ES"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.meta)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${DOMAIN}/assets/og-asesorfy.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/assets/asesorfy-mark.svg" type="image/svg+xml"><link rel="stylesheet" href="/brand.css"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><style>${css}</style><script type="application/ld+json">${JSON.stringify(schema)}</script><script defer src="/_vercel/insights/script.js"></script><script defer src="../posthog-analytics.js"></script></head><body><header><div class="wrap nav"><a class="brand" href="../index.html"><img class="brand-mark" src="/assets/asesorfy-mark.svg" alt="" width="32" height="32"><span class="brand-name">Asesor<span class="brand-accent">fy</span></span></a><nav class="navlinks"><a href="../documentos.html">Documentos</a><a href="../calculadora-rentabilidad-alquiler.html">Calculadora</a><a href="../blog.html">Blog</a><a href="../herramientas">Herramientas</a></nav></div></header><main class="wrap">

<section class="hero"><span class="eyebrow">${esc(p.category)} · Modelo actualizado</span><h1>${esc(p.title)}</h1><p class="lead">${esc(p.intro)}</p><div class="facts"><div class="fact"><b>Documento</b>${esc(p.product)}</div><div class="fact"><b>Precio</b>${esc(priceLabel)}</div><div class="fact"><b>Revisado</b>${TODAY_TXT}</div></div><a class="cta" href="../generador.html#${p.key}">${p.free ? "Crear el contrato gratis →" : "Personalizar el documento →"}</a><span class="price">Vista previa antes de ${p.free ? "descargar" : "pagar"}</span></section>

<section class="body"><h2>Qué dice la ley en este caso</h2>${p.context.map(t => `<p>${esc(t)}</p>`).join("")}</section>

<section><h2>Qué debes preparar</h2><ul class="check">${p.checklist.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>

<section><h2>Cláusulas que conviene revisar</h2><div class="grid">${p.clauses.map(c => `<div class="card"><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p></div>`).join("")}</div></section>

<section><h2>Cómo hacerlo paso a paso</h2><ol class="steps">${p.steps.map(s => `<li><b>${esc(s.t)}</b><span>${esc(s.d)}</span></li>`).join("")}</ol></section>

<section><h2>${esc(p.table.title)}</h2><div class="tw"><table><caption>${esc(p.table.caption)}</caption><thead><tr>${p.table.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${p.table.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>

<section><h2>Errores frecuentes</h2><div class="grid">${p.mistakes.map(m => `<div class="card"><h3>${esc(m.t)}</h3><p>${esc(m.d)}</p></div>`).join("")}</div></section>

<section><h2>Base legal</h2><p class="source">${esc(p.law)} <a href="${p.lawUrl}" target="_blank" rel="noopener noreferrer">Consultar el texto oficial en el BOE</a>.${["contrato-larga","contrato-habitacion","contrato-temporada"].includes(p.key) ? ` Redacción vigente tras el <a href="${RDL}" target="_blank" rel="noopener noreferrer">Real Decreto-ley 29/2026</a>, en vigor desde el 8 de octubre de 2026.` : ""}${p.key === "contrato-temporada" ? ` Consulta también el <a href="${NRUA}" target="_blank" rel="noopener noreferrer">RD 1312/2024 consolidado</a>: el procedimiento estatal de registro fue anulado por el Tribunal Supremo en 2026, pero siguen vigentes los registros autonómicos y locales.` : ""}${p.key === "contrato-larga" ? ` Sobre la actualización de la renta, el <a href="${INE_IRAV}" target="_blank" rel="noopener noreferrer">INE publica mensualmente el IRAV</a> y la <a href="${VIVIENDA}" target="_blank" rel="noopener noreferrer">Ley 12/2023 por el derecho a la vivienda</a> recoge el resto de novedades.` : ""}</p></section>

<section class="faq"><h2>Preguntas frecuentes</h2>${p.faqs.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</section>

<section><h2>Guías relacionadas</h2><div class="guides">${p.guides.map(([href, label]) => `<a href="../${href}">${esc(label)} →</a>`).join("")}</div></section>

<section><h2>Otros casos</h2><div class="related">${related.map(x => `<a href="${x.slug}.html">${esc(x.title)} →</a>`).join("")}</div></section>

<div style="text-align:center;margin-top:40px"><a class="cta" href="../generador.html#${p.key}">${p.free ? `Crear ${p.product.toLowerCase()} gratis →` : `Crear ${p.product.toLowerCase()} →`}</a></div>

<p class="note"><strong>Aviso legal.</strong> Contenido informativo y orientativo sobre normativa española, revisado el ${TODAY_TXT}. No constituye asesoramiento jurídico personalizado. La calificación del contrato y las obligaciones aplicables dependen de las circunstancias reales de cada caso, de la fecha de firma y, cuando corresponda, de la normativa autonómica o local. Para asuntos que requieran procedimiento judicial, consulta con un abogado colegiado.</p>

</main><footer><div class="wrap">© 2026 Asesorfy · Documentos y herramientas legales · Normativa española</div><div class="wrap" data-legalbar style="margin-top:12px;display:flex;gap:16px;flex-wrap:wrap;font-size:12.5px"><a href="../sobre.html">Sobre Asesorfy</a><a href="../aviso-legal.html">Aviso legal</a><a href="../privacidad.html">Privacidad</a><a href="../condiciones.html">Condiciones</a><a href="../cookies.html">Cookies</a></div></footer></body></html>`;
}

fs.mkdirSync("casos", { recursive: true });
for (const page of pages) fs.writeFileSync(`casos/${page.slug}.html`, render(page));

let sitemap = fs.readFileSync("sitemap.xml", "utf8");
sitemap = sitemap.replace(/\n?\s*<!-- Programmatic use-case pages -->[\s\S]*?<!-- End programmatic use-case pages -->\s*/g, "\n");
const urls = pages.map(p => `  <url><loc>${DOMAIN}/casos/${p.slug}.html</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("\n");
sitemap = sitemap.replace("</urlset>", `  <!-- Programmatic use-case pages -->\n${urls}\n  <!-- End programmatic use-case pages -->\n</urlset>`);
fs.writeFileSync("sitemap.xml", sitemap);
console.log(`Generadas ${pages.length} landings de casos y actualizado sitemap.xml`);
