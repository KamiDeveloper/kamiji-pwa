# KamiJi — Product Requirements Document (PRD)

> **"Caracteres Divinos"** — La aplicación definitiva para dominar los kanji japoneses, diseñada para hispanohablantes.

---

| Campo                     | Detalle                              |
| ------------------------- | ------------------------------------ |
| **Nombre del Producto**   | KamiJi (神字 — "Caracteres Divinos") |
| **Versión del Documento** | 1.0                                  |
| **Fecha**                 | 24 de Abril de 2026                  |
| **Autor**                 | KamiJi Product Team                  |
| **Estado**                | Draft — Pendiente de Revisión        |
| **Clasificación**         | Confidencial — Uso Interno           |

---

## Tabla de Contenidos (Documento Completo)

| Parte | Contenido                                          |
| ----- | -------------------------------------------------- |
| 1.0   | Portada, Resumen Ejecutivo, Problema, Visión       |
| 1.1   | Usuarios Objetivo, Personas, Requisitos Previos    |
| 1.2   | Conceptos Core y Terminología                      |
| 2.0   | Temática Visual N5: El Parvulario                  |
| 2.1   | Temática Visual N4: La Escuela Primaria            |
| 2.2   | Temática Visual N3: El Instituto / Adolescencia    |
| 2.3   | Temática Visual N2: La Universidad                 |
| 2.4   | Temática Visual N1: El Doctorado                   |
| 3.0   | Motor de Furigana y Traducción (IA + Diccionarios) |
| 3.1   | Sistema de Interacciones y Gestos                  |
| 3.2   | Principios UX y Anti-Flashing                      |
| 4.0   | Pantallas de UI — Onboarding y Home                |
| 4.1   | Pantallas de UI — Lectura, Repaso y Progreso       |
| 4.2   | Pantallas de UI — Preferencias y Estados de Error  |
| 5.0   | Sistema de Progresión y Subida de Nivel (SRS/FSRS) |
| 5.1   | Gamificación y Psicología del Engagement           |
| 5.2   | Notificaciones y Recordatorios                     |
| 6.0   | Arquitectura Técnica y Stack                       |
| 6.1   | Modelo de Datos y Seguridad                        |
| 6.2   | Estrategia Offline (PWA)                           |
| 7.0   | Riesgos, Pitfalls y Mitigaciones                   |
| 7.1   | Roadmap Futuro (Post-V1) y Cierre                  |

---

## 1. Resumen Ejecutivo

**KamiJi** es una Progressive Web App (PWA) diseñada exclusivamente para **hispanohablantes adultos** que desean dominar la lectura de kanji japoneses. A diferencia de las aplicaciones existentes que tratan los kanji como tarjetas de estudio aisladas o que siguen el orden escolar japonés (irrelevante para un extranjero adulto), KamiJi adopta un enfoque radicalmente diferente:

**Aprender kanji leyendo historias reales, no memorizando fichas.**

La aplicación presenta cuentos, artículos y textos que evolucionan en complejidad lingüística y temática siguiendo los 5 niveles del **JLPT (Japanese Language Proficiency Test)**: desde cuentos infantiles con los ~100 kanji más básicos de supervivencia (N5) hasta ensayos literarios y textos académicos con los ~2,100+ kanji necesarios para la vida profesional en Japón (N1).

### La Propuesta de Valor Única (UVP)

> **"La aplicación que crece contigo."**

KamiJi no solo evoluciona el contenido — **transforma toda su interfaz** para reflejar el viaje emocional y cognitivo del usuario:

- **N5**: La UI es un parvulario japonés — colores pastel, tipografías redondeadas, mascota guía, micro-interacciones juguetones.
- **N4**: La UI madura a una escuela primaria — más estructura, colores cálidos, primeras responsabilidades.
- **N3**: La UI se vuelve adolescente — oscurece, gana edge, introduce personalización.
- **N2**: La UI se profesionaliza — limpia, tipográfica, seria, como un dashboard corporativo japonés.
- **N1**: La UI se vuelve erudita — minimalismo wabi-sabi, tinta sobre papel, elegancia literaria.

Esta metamorfosis visual no es cosmética — es **psicología aplicada**. Cada cambio de interfaz actúa como recompensa tangible y refuerzo positivo que dice al usuario: _"Has crecido. Tu aplicación lo reconoce."_

---

## 2. Declaración del Problema

### 2.1 El Muro de los Kanji

El japonés utiliza tres sistemas de escritura. Hiragana (~46 caracteres) y Katakana (~46 caracteres) son fonéticos y se pueden dominar en semanas. Los **kanji** son logográficos: cada uno representa un concepto y puede tener múltiples pronunciaciones dependiendo del contexto. Un adulto japonés educado conoce entre **2,000 y 3,000 kanji**.

Para un hispanohablante, los kanji representan el obstáculo más significativo y la razón #1 de abandono en el estudio del japonés.

### 2.2 Los Problemas de las Soluciones Existentes

| Problema                         | Apps Afectadas                              | Consecuencia                                                                                |
| -------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Kanji aislados sin contexto**  | WaniKani, Kanji Study, Anki                 | El usuario memoriza significados individuales pero no puede leer textos reales              |
| **Orden escolar japonés**        | Apps basadas en Jouyou Kanji                | Un adulto aprende 糸 (hilo) y 虫 (insecto) antes que 駅 (estación) o 電車 (tren)            |
| **Interfaz estática y aburrida** | Anki, la mayoría de apps SRS                | No hay sensación de progreso visual; la experiencia es idéntica en el día 1 y en el día 365 |
| **Solo en inglés**               | WaniKani, Kanji Garden                      | Los hispanohablantes dependen de traducciones intermediadas por el inglés                   |
| **Curva de aprendizaje técnica** | Anki (configuración de decks, plugins FSRS) | El usuario dedica más tiempo configurando la herramienta que estudiando                     |
| **Sin lectura inmersiva**        | La mayoría de apps de kanji                 | No hay puente entre "conocer un kanji" y "poder leerlo en contexto"                         |
| **Gamificación superficial**     | Duolingo (para japonés)                     | Incentiva "jugar" pero no asegura retención profunda; falsa sensación de progreso           |

### 2.3 La Oportunidad

No existe, a día de hoy (abril 2026), una aplicación que:

1. Enseñe kanji **en contexto** (dentro de historias y textos reales graduados por nivel JLPT)
2. Esté diseñada **nativamente en español** para hispanohablantes
3. **Evolucione visualmente** con el progreso del usuario
4. Combine un **motor de furigana/traducción con IA** (Gemini) + diccionarios robustos (JMdict, KANJIDIC, Jitendex)
5. Implemente un **sistema de gestos intuitivo** que elimine la fricción entre "no entiendo este kanji" y "ahora lo entiendo"
6. Utilice **FSRS (Free Spaced Repetition Scheduler)** en lugar del obsoleto SM-2 para una retención óptima

**KamiJi llena este vacío.**

---

## 3. Visión del Producto

### 3.1 Declaración de Visión

> _"Que cada hispanohablante que sueñe con leer japonés tenga un compañero inteligente, bello y profundamente humano que crezca con él — desde su primer kanji hasta la maestría literaria."_

### 3.2 Principios Fundacionales

| Principio                       | Significado                 | Manifestación en el Producto                                      |
| ------------------------------- | --------------------------- | ----------------------------------------------------------------- |
| **成長 (Seichō) — Crecimiento** | La app crece con el usuario | UI metamórfica, contenido adaptativo, dificultad progresiva       |
| **文脈 (Bunmyaku) — Contexto**  | Nada se aprende aislado     | Todo kanji se presenta dentro de una historia o texto con sentido |
| **直感 (Chokkan) — Intuición**  | Cero manual de usuario      | Gestos naturales, feedback inmediato, affordances claras          |
| **美 (Bi) — Belleza**           | Cada pixel tiene propósito  | UI premium que inspira respeto y deseo de uso                     |
| **根性 (Konjō) — Persistencia** | Motivar sin coaccionar      | Gamificación ética, recordatorios humanos, mecánicas de "gracia"  |

### 3.3 Métricas de Éxito (North Star)

| Métrica                                     | Objetivo V1 (6 meses post-lanzamiento)    |
| ------------------------------------------- | ----------------------------------------- |
| **Retención D7**                            | ≥ 45%                                     |
| **Retención D30**                           | ≥ 25%                                     |
| **Sesión promedio**                         | ≥ 8 minutos                               |
| **Kanji marcados como "aprendidos"/semana** | ≥ 15 por usuario activo                   |
| **Tasa de subida de nivel N5→N4**           | ≥ 30% de usuarios que alcanzan 50%+ de N5 |
| **NPS (Net Promoter Score)**                | ≥ 50                                      |
| **Calificación en stores (si aplica)**      | ≥ 4.6 / 5.0                               |

### 3.4 Aplicaciones de Referencia (Benchmark Estético y Funcional)

KamiJi no busca copiar ninguna aplicación, sino extraer lo mejor de cada una y combinarlo en algo superior:

| Aplicación                | Qué tomamos                                                           | Qué mejoramos                                                    |
| ------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Duolingo**              | Onboarding magistral, gamificación adictiva, mascota con personalidad | Eliminar la falsa sensación de progreso; añadir profundidad real |
| **WaniKani**              | SRS probado, mnemonics de alta calidad, comunidad                     | Añadir contexto (lectura inmersiva), español nativo, UI moderna  |
| **Notion / Linear**       | Claridad tipográfica, minimalismo funcional, dark mode premium        | Aplicar estética enterprise a niveles avanzados (N2/N1)          |
| **Arc Browser**           | Micro-animaciones con propósito, paleta sofisticada                   | Inspirar la transición entre "moods" de cada nivel               |
| **Forest App**            | Motivación positiva sin culpa, timer visual                           | Adaptar a sesiones de lectura con recompensa visual              |
| **Apple Music / Spotify** | Transiciones fluidas, personalización del ambiente visual             | Inspirar el "mood" cambiante por nivel JLPT                      |
| **Satori Reader**         | Lectura graduada con furigana contextual                              | Mejor UX de gestos, traducción con IA, evolución visual          |

# KamiJi PRD — Parte 1.1: Usuarios Objetivo, Personas y Requisitos Previos

---

## 4. Usuarios Objetivo

### 4.1 Segmento Primario

**Hispanohablantes adultos (18-45 años)** que están estudiando japonés de forma autodidacta o complementaria y que:

- Ya dominan (o están en proceso avanzado de dominar) **hiragana y katakana**
- Han llegado al "muro de los kanji" y sienten frustración o estancamiento
- Buscan una herramienta que les permita **leer japonés real**, no solo memorizar caracteres aislados
- Valoran el diseño y la experiencia de usuario (son usuarios de apps premium)
- Tienen motivación intrínseca (interés en la cultura japonesa, anime/manga, viajes, trabajo)

### 4.2 Segmento Secundario

- **Estudiantes universitarios** de japonés que buscan práctica complementaria de kanji
- **Profesionales** que necesitan mejorar su lectura de japonés para trabajo (negocios, traducción, tecnología)
- **Fans de la cultura japonesa** que quieren ir más allá de subtítulos y traducciones

### 4.3 Anti-Personas (A quién NO va dirigida)

| Anti-Persona                                             | Razón                                                                                                    |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Principiantes absolutos sin hiragana/katakana            | KamiJi **requiere** conocimiento previo de kana; no enseña el alfabeto básico                            |
| Personas que buscan aprender a **escribir** kanji a mano | KamiJi se enfoca en **lectura y reconocimiento**, no en escritura (caligrafía podría ser feature futura) |
| Usuarios que solo quieren traducir textos                | KamiJi no es un traductor; es una herramienta de aprendizaje progresivo                                  |
| Niños menores de 12 años                                 | El contenido y la complejidad cognitiva están diseñados para mentes adultas                              |

---

## 5. User Personas

### 5.1 Persona Primaria: "Sofía, la Autodidacta Apasionada"

| Atributo               | Detalle                                                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Edad**               | 27 años                                                                                                                                         |
| **Ubicación**          | Ciudad de México, México                                                                                                                        |
| **Ocupación**          | Diseñadora gráfica freelance                                                                                                                    |
| **Nivel de japonés**   | Intermedio-bajo; domina hiragana/katakana, conoce ~50 kanji                                                                                     |
| **Motivación**         | Leer manga en japonés sin depender de traducciones                                                                                              |
| **Frustración actual** | "Uso Anki pero se siente como tortura. Memorizo un kanji y a la semana se me olvida. No hay contexto, no hay historia, solo flashcards vacías." |
| **Dispositivos**       | iPhone 15, laptop con Chrome                                                                                                                    |
| **Hábitos**            | Estudia 15-30 min/día en el transporte público; sesiones más largas los fines de semana                                                         |
| **Lo que busca**       | Una app bella que la motive a abrir todos los días; sentir que realmente está progresando                                                       |

**Escenario de uso**: Sofía abre KamiJi en el metro. Ve un cuento corto con 3 kanji que no conoce. Toca uno → aparece el furigana → "Ah, así se lee". Mantiene presionado otro → aparece la traducción → "Ah, eso significa eso en este contexto". Desliza el kanji a la derecha en el panel de traducción → marcado como aprendido. En 10 minutos leyó una historia completa y aprendió 3 kanji nuevos. La app le muestra una animación celebrando su progreso. Sonríe.

### 5.2 Persona Secundaria: "Carlos, el Profesional Ambicioso"

| Atributo               | Detalle                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Edad**               | 34 años                                                                                                            |
| **Ubicación**          | Madrid, España                                                                                                     |
| **Ocupación**          | Ingeniero de software en empresa con oficinas en Tokio                                                             |
| **Nivel de japonés**   | Intermedio; aprobó JLPT N4 hace 2 años, intenta N3                                                                 |
| **Motivación**         | Leer documentación técnica y emails en japonés; candidato a traslado a Tokio                                       |
| **Frustración actual** | "WaniKani es genial pero está en inglés y sigue un orden que no me sirve para lo que necesito leer en el trabajo." |
| **Dispositivos**       | Pixel 9, laptop con Firefox                                                                                        |
| **Hábitos**            | Estudia 20-40 min/día durante descansos laborales                                                                  |
| **Lo que busca**       | Eficiencia; no quiere gamificación infantil sino herramientas de lectura serias                                    |

**Escenario de uso**: Carlos está en N3. La UI de KamiJi tiene un tono más maduro y oscuro. Lee un artículo sobre tecnología japonesa. Desliza sobre una frase completa para ver la traducción de todo el bloque. Toca un kanji compuesto dentro de la traducción → ve el desglose. En la sesión de repaso, el algoritmo FSRS le presenta los kanji que están a punto de olvidarse. Eficiente, sin adornos innecesarios.

### 5.3 Persona Terciaria: "Luna, la Estudiante Universitaria"

| Atributo               | Detalle                                                                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Edad**               | 21 años                                                                                                                                      |
| **Ubicación**          | Buenos Aires, Argentina                                                                                                                      |
| **Ocupación**          | Estudiante de Relaciones Internacionales con menor en japonés                                                                                |
| **Nivel de japonés**   | Bajo; domina kana, conoce ~20 kanji del curso                                                                                                |
| **Motivación**         | Complementar las clases universitarias y preparar el JLPT N5                                                                                 |
| **Frustración actual** | "Mi profesor va muy rápido y las apps que conozco son para ingleses. Necesito algo en español que me ayude a practicar lo que veo en clase." |
| **Dispositivos**       | Samsung Galaxy A55, Chromebook                                                                                                               |
| **Hábitos**            | Estudia en ráfagas: 1 hora antes de exámenes, 5 min/día normalmente                                                                          |
| **Lo que busca**       | Diversión sin culpa; algo que no se sienta como "más tarea"                                                                                  |

---

## 6. Requisitos Previos del Usuario

### 6.1 Conocimiento Mínimo Requerido

KamiJi opera bajo la premisa fundamental de que el usuario:

1. **Domina la lectura de Hiragana** (あ-ん, 46 caracteres base + combinaciones): Puede leer cualquier texto escrito en hiragana con fluidez razonable.
2. **Domina la lectura de Katakana** (ア-ン, 46 caracteres base + combinaciones): Puede reconocer y leer préstamos lingüísticos y onomatopeyas en katakana.
3. **Comprende la gramática japonesa básica** (opcional pero recomendado): Partículas は、が、を、に、で、と; estructura SOV; formas verbales básicas (ます、ません).

### 6.2 Cómo se Comunica Este Requisito

- **En la landing page / store listing**: Banner claro: _"¿Ya sabes leer hiragana y katakana? ¡Perfecto! KamiJi es tu siguiente paso."_
- **En el onboarding**: Pregunta de confirmación no-intimidante: _"¿Puedes leer esto? → かんじ (kanji)"_ — Si el usuario dice "No", se le redirige con amabilidad a recursos externos recomendados para aprender kana primero, con un mensaje como: _"¡No te preocupes! Aprende hiragana y katakana primero (solo toma unas semanas) y luego vuelve aquí. ¡Te esperamos! 💪"_
- **No se bloquea el acceso**: Si el usuario confirma que sabe kana, se le deja entrar. La verificación es de honor, no un examen.

### 6.3 Lo que KamiJi NO Requiere

| No se requiere                  | Motivo                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------- |
| Conocimiento previo de kanji    | KamiJi empieza desde cero (N5 = los kanji más básicos)                                            |
| Nivel avanzado de gramática     | Los textos de N5 usan gramática elemental; la gramática compleja llega con los niveles superiores |
| Saber inglés                    | Toda la app y traducciones están en español                                                       |
| Dispositivo específico          | PWA funciona en cualquier navegador moderno (móvil, tablet, desktop)                              |
| Conocimiento de japonés hablado | KamiJi se enfoca en lectura, no en pronunciación o conversación                                   |

# KamiJi PRD — Parte 1.2: Conceptos Core y Terminología

---

## 7. Conceptos Core y Terminología

### 7.1 Glosario del Producto

| Término                            | Definición en KamiJi                                                                                                                   | Contexto                                                  |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **Kanji (漢字)**                   | Caracteres logográficos de origen chino usados en japonés. Cada uno puede tener múltiples lecturas y significados según contexto.      | El objeto de estudio principal de KamiJi                  |
| **Furigana (振り仮名)**            | Pequeños caracteres kana (hiragana/katakana) escritos encima de los kanji para indicar su pronunciación.                               | Mecanismo core de ayuda; se activa con gestos             |
| **JLPT (日本語能力試験)**          | Japanese Language Proficiency Test. Examen oficial de competencia en japonés para extranjeros. 5 niveles: N5 (básico) a N1 (avanzado). | Estructura de progresión de KamiJi                        |
| **Nivel / Evolución**              | Cada uno de los 5 estadios (N5→N1) que determinan el contenido, la dificultad y la temática visual de la app.                          | Core del concepto de "app que evoluciona"                 |
| **Historia / Texto**               | Contenido de lectura graduado por nivel JLPT. Desde cuentos infantiles (N5) hasta ensayos literarios (N1).                             | Vehículo de enseñanza — los kanji se aprenden en contexto |
| **La Chuleta / Pista Rápida**      | Toque rápido sobre un kanji → muestra furigana por 5 segundos.                                                                         | Gesto de ayuda rápida                                     |
| **El Rayo X / X-Ray**              | Mantener pulsado un kanji → muestra significado/traducción.                                                                            | Gesto de comprensión profunda                             |
| **Subrayado X-Ray**                | Mantener pulsado + deslizar sobre texto → muestra traducción de todo lo seleccionado.                                                  | Gesto de comprensión de bloques                           |
| **Panel de Traducción**            | Contenedor flotante que muestra la traducción/significado de un kanji o bloque de texto.                                               | Elemento UI para interacciones de traducción              |
| **Zoom Kanji**                     | Toque rápido dentro del Panel de Traducción → amplía un kanji específico con furigana + traducción aislada.                            | Gesto de profundización                                   |
| **Aprendido**                      | Estado de un kanji cuando el usuario lo desliza a la derecha en el Panel de Traducción. Indica que el usuario siente que lo conoce.    | Estado de progresión del kanji                            |
| **Para Repasar**                   | Estado de un kanji cuando el usuario lo desliza a la izquierda en el Panel de Traducción. Indica que el usuario quiere revisarlo más.  | Estado que alimenta el SRS                                |
| **SRS (Spaced Repetition System)** | Sistema de repetición espaciada que determina cuándo repasar un kanji basado en la curva de olvido del usuario.                        | Motor de retención                                        |
| **FSRS**                           | Free Spaced Repetition Scheduler. Algoritmo ML moderno que reemplaza al SM-2, ofreciendo ~25% menos repasos con igual retención.       | Implementación específica del SRS en KamiJi               |
| **Metamorfosis**                   | El cambio completo de tema visual de la app cuando el usuario sube de nivel JLPT.                                                      | Evento de recompensa máxima                               |

### 7.2 Niveles JLPT en KamiJi

> **Nota**: No existen listas oficiales de kanji por nivel JLPT. Las cantidades son estimaciones consensuadas basadas en análisis de exámenes previos, materiales educativos y la comunidad de estudio de japonés. KamiJi utilizará una lista curada propia basada en fuentes como JMdict, KANJIDIC, análisis de frecuencia de uso en textos reales, y consenso de educadores.

| Nivel JLPT | Nombre en KamiJi    | Kanji Estimados | Kanji Acumulados | Temática de Contenido                                                                               |
| ---------- | ------------------- | --------------- | ---------------- | --------------------------------------------------------------------------------------------------- |
| **N5**     | El Parvulario       | ~103            | ~103             | Supervivencia inmediata: números, tiempo, direcciones, familia, comida, transporte básico           |
| **N4**     | La Escuela Primaria | ~181            | ~284             | Autonomía cotidiana: compras, escuela, trabajo simple, descripciones, pequeñas narrativas           |
| **N3**     | El Instituto        | ~361            | ~645             | Socialización compleja: opiniones, emociones, noticias, cultura pop, comunicación informal          |
| **N2**     | La Universidad      | ~415            | ~1,060           | Inmersión formal: documentos profesionales, artículos periodísticos, argumentación, textos técnicos |
| **N1**     | El Doctorado        | ~1,076+         | ~2,136+          | Maestría intelectual: literatura, filosofía, documentos legales, textos históricos, prosa elegante  |

### 7.3 El Modelo Mental: "Aprender a Leer, Otra Vez"

KamiJi se basa en una metáfora central profundamente humana:

> **Estás aprendiendo a leer de nuevo. Pero esta vez, eres un adulto con las herramientas cognitivas de un adulto y la curiosidad de un niño.**

Esta metáfora informa cada decisión de diseño:

```
El viaje del usuario en KamiJi:

Parvulario (N5)     → "Mamá, ¿qué dice ahí?"
                       Señalas con el dedo. Todo es nuevo, grande, colorido.

Escuela (N4)        → "Profe, ¿puedo leer el cuento?"
                       Ya hilas palabras. Sientes autonomía.

Instituto (N3)      → "¿Por qué nadie habla como en el libro?"
                       Descubres que el mundo real es caótico. Te adaptas.

Universidad (N2)    → "Necesito leer este informe para mañana."
                       Lees con propósito profesional. Eres funcional.

Doctorado (N1)      → "La elegancia de esta prosa es exquisita."
                       No solo lees — aprecias. Eres un erudito.
```

### 7.4 Diferenciadores Clave vs. Competidores

| Dimensión                | WaniKani                   | Anki                         | Duolingo      | Satori Reader      | **KamiJi**                        |
| ------------------------ | -------------------------- | ---------------------------- | ------------- | ------------------ | --------------------------------- |
| **Idioma nativo**        | Inglés                     | Multi (pero contenido en EN) | Multi         | Inglés             | **Español nativo**                |
| **Contexto**             | Kanji → Vocab (sin textos) | Depende del deck             | Frases cortas | Textos graduados   | **Historias completas por nivel** |
| **UI evolutiva**         | Estática                   | Estática                     | Estática      | Estática           | **Metamorfosis por nivel**        |
| **Furigana interactivo** | Toggle global              | No nativo                    | No            | Toggle por texto   | **Gestos granulares por kanji**   |
| **Traducción con IA**    | No                         | No                           | No            | No                 | **Gemini + Diccionarios**         |
| **Algoritmo SRS**        | Propietario                | SM-2 / FSRS                  | Propietario   | No (lectura libre) | **FSRS nativo**                   |
| **Offline**              | No                         | Sí                           | Parcial       | No                 | **PWA Offline-First**             |
| **Precio**               | $9/mes                     | Gratis (+ $25 iOS)           | Freemium      | $9/mes             | **Gratis (BYOK API Key)**         |
| **Enfoque JLPT**         | No directo                 | Depende del deck             | No            | Parcial            | **Estructura central**            |

### 7.5 Modelo de Negocio V1

KamiJi V1 opera bajo el modelo **BYOK (Bring Your Own Key)**:

- **Costo para el usuario**: $0 (gratuito)
- **Requisito**: El usuario provee su propia **Gemini API Key** (disponible gratis en Google AI Studio, o con tier de pago para uso intensivo)
- **Monetización V1**: Donaciones voluntarias (botón "Invítame un café" en Preferencias)
- **Hosting**: Vercel (tier gratuito para proyectos personales / tier Pro para escala)
- **Base de datos**: Firebase Firestore (tier gratuito cubre ~50K lecturas/día)

> **Filosofía**: Primero construir algo que la gente ame. La monetización vendrá después, cuando haya una comunidad que valore el producto.

# KamiJi PRD — Parte 2.0: Temática Visual N5 — El Parvulario

---

## 8. Diseño Evolutivo por Nivel JLPT

> Cada nivel JLPT en KamiJi no es simplemente un cambio de contenido — es una **metamorfosis completa** del ambiente visual, auditivo y emocional de la aplicación. Esta sección define exhaustivamente cada "mundo" visual.

---

## 8.1 Nivel N5: 幼稚園 (Yōchien) — El Parvulario

### Concepto Emocional

> _"Eres un niño otra vez. Todo es grande, suave, amigable. El mundo te protege mientras descubres tus primeras letras."_

**Sensación objetivo**: Seguridad, calidez, asombro inocente, alegría sin presión. El usuario debe sentirse como si entrara en un parvulario japonés moderno — todo diseñado para que tocar, explorar y equivocarse sea seguro y divertido.

### Paleta de Colores

```
PRIMARIOS:
  --n5-bg-primary:     #FFF8F0;     /* Crema cálido — como papel de dibujo */
  --n5-bg-secondary:   #FFEFD5;     /* Papaya suave */
  --n5-accent-primary: #FF8A65;     /* Naranja coral — cálido, energético */
  --n5-accent-secondary: #FFD54F;   /* Amarillo girasol — alegría */

TEXTO:
  --n5-text-primary:   #5D4037;     /* Marrón chocolate — legible, no agresivo */
  --n5-text-secondary: #8D6E63;     /* Marrón claro */
  --n5-text-kanji:     #3E2723;     /* Marrón muy oscuro — alto contraste para kanji */

ESTADOS:
  --n5-success:        #81C784;     /* Verde menta suave */
  --n5-warning:        #FFB74D;     /* Naranja durazno */
  --n5-error:          #E57373;     /* Rojo fresa — no agresivo */
  --n5-info:           #64B5F6;     /* Azul cielo */

ACENTOS DECORATIVOS:
  --n5-deco-pink:      #F48FB1;     /* Rosa sakura */
  --n5-deco-lavender:  #CE93D8;     /* Lavanda suave */
  --n5-deco-mint:      #80CBC4;     /* Menta pastel */
```

### Tipografía

| Uso                           | Fuente            | Peso           | Tamaño                         | Justificación                                                                              |
| ----------------------------- | ----------------- | -------------- | ------------------------------ | ------------------------------------------------------------------------------------------ |
| **Kanji (texto de lectura)**  | `Zen Maru Gothic` | Regular (400)  | 24-28px móvil, 28-32px desktop | Fuente japonesa redondeada, amigable, similar a las usadas en libros infantiles japoneses  |
| **Furigana**                  | `Zen Maru Gothic` | Light (300)    | 10-12px                        | Legible pero no intrusiva; coincide con la fuente de kanji                                 |
| **UI / Botones**              | `Nunito`          | SemiBold (600) | 14-18px                        | Sans-serif redondeada; consistente con estética infantil; excelente legibilidad en español |
| **Títulos**                   | `Nunito`          | Bold (700)     | 20-28px                        | Impacto amigable sin ser agresiva                                                          |
| **Cuerpo de texto (español)** | `Nunito`          | Regular (400)  | 16px                           | Cómoda para lectura prolongada                                                             |

### Fondos y Elementos Decorativos

- **Fondo principal**: Textura sutil de papel washi (和紙) en tono crema `#FFF8F0` con opacidad del 5-8%
- **Elementos flotantes**: Pequeñas ilustraciones SVG semi-transparentes que se desplazan lentamente en el fondo:
  - 🌸 Pétalos de sakura simplificados (formas suaves, no realistas)
  - ☁️ Nubes redondeadas estilo kawaii
  - ⭐ Estrellas de 5 puntas con esquinas redondeadas
  - 🍡 Dangos, onigiris y otros elementos de comida japonesa estilizados
- **Opacidad de elementos decorativos**: 8-12% — presentes pero no distractores
- **Animación**: Float suave con `ease-in-out`, duración 15-30s por ciclo, parallax sutil al hacer scroll

### Iconografía

- **Estilo**: Líneas redondeadas, trazo de 2.5px, esquinas con `border-radius: 50%`
- **Colores**: Monocromáticos usando `--n5-accent-primary` con variaciones de opacidad
- **Animación en hover/tap**: Bounce suave (`scale: 1 → 1.15 → 1.05`, 300ms, ease-out)
- **Mascota guía**: **Kami-chan (カミちゃん)** — Un pequeño zorro (kitsune) estilizado con ojos grandes y expresivos
  - Aparece en esquinas inferiores con tips contextuales
  - Celebra cuando marcas un kanji como "aprendido" (salta + estrellitas)
  - Se entristece suavemente si no abres la app en 3+ días (no culpa, sino "te extraño")
  - Duerme si es de noche (entre 22:00 y 06:00 hora local)
  - Diferentes expresiones según el progreso de la sesión

### Micro-interacciones N5

| Acción                              | Animación                                                                                                                            | Duración | Easing                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------------------------------- |
| **Toque en kanji (Chuleta)**        | El kanji hace un pequeño "wobble" (como gelatina) antes de mostrar furigana; los kana aparecen con fade-in desde arriba, uno por uno | 400ms    | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` |
| **Long-press (Rayo X)**             | Efecto de "lupa mágica" — un círculo suave crece desde el punto de presión; el Panel de Traducción emerge desde abajo con un bounce  | 500ms    | spring(1, 80, 10)                        |
| **Marcar como aprendido (swipe →)** | El kanji vuela hacia la derecha dejando un rastro de estrellas doradas; Kami-chan celebra                                            | 600ms    | `ease-out`                               |
| **Marcar para repasar (swipe ←)**   | El kanji regresa suavemente a una "pila de repaso" con efecto de bookmark                                                            | 400ms    | `ease-in-out`                            |
| **Completar una historia**          | Lluvia de confeti en colores pastel; barra de progreso pulsa con glow; Kami-chan aplaude                                             | 1200ms   | secuencia                                |
| **Abrir la app (splash)**           | Kami-chan bosteza y estira → saluda → la UI se revela con un fade cálido                                                             | 1800ms   | secuencia                                |
| **Subir de progreso (milestone)**   | Las estrellas del fondo brillan más intensamente; un sonido suave de campanilla (si audio está habilitado)                           | 1000ms   | `ease-in-out`                            |

### Componentes UI Específicos de N5

- **Cards de historia**: Bordes redondeados (`border-radius: 20px`), sombra suave (`box-shadow: 0 4px 20px rgba(93, 64, 55, 0.08)`), ilustración decorativa en la esquina superior derecha
- **Barra de progreso**: Con forma de camino/sendero (no una barra plana); puntos de milestone son pequeños torii gates
- **Botones**: Pill-shaped (`border-radius: 9999px`), con sombra cálida y efecto de "presión" (el botón se hunde 2px al hacer tap)
- **Contenedor de texto de lectura**: Fondo blanco puro con borde izquierdo de 3px en `--n5-accent-primary`; padding generoso (24px); interlineado de 2.8 para dejar espacio al furigana sin saltos
- **Panel de Traducción**: Fondo `#FFF8F0` con borde redondeado, sombra elevada, icono de Kami-chan asomándose desde la esquina

### Sonidos (Opcionales, Desactivables)

| Evento             | Sonido                                          | Estilo              |
| ------------------ | ----------------------------------------------- | ------------------- |
| Toque en kanji     | "Pop" suave, como burbuja                       | 8-bit amigable      |
| Marcar aprendido   | Campanilla de xilófono ascendente               | Acústico, cálido    |
| Completar historia | Melodía corta de 4 notas (pentatónica japonesa) | Dulce, celebratorio |
| Error/sin conexión | "Boop" suave descendente                        | No punitivo         |

### Reglas de Espaciado para Furigana en N5

```css
/* El interlineado es generoso para acomodar furigana sin "saltos" en la UI */
.reading-container--n5 {
  line-height: 2.8; /* Espacio suficiente para furigana */
  ruby-align: center; /* Furigana centrado sobre el kanji */
  font-size: 24px; /* Kanji grandes, fáciles de leer y tocar */
}

.reading-container--n5 ruby rt {
  font-size: 0.45em; /* Furigana proporcional */
  opacity: 0; /* Oculto por defecto */
  transition: opacity 300ms ease-in-out;
  position: relative;
  top: -2px; /* Ajuste fino de posición */
}

.reading-container--n5 ruby rt.visible {
  opacity: 1;
}

/* El espacio está PRE-RESERVADO incluso cuando furigana está oculto */
/* Esto previene el "salto" de la UI cuando aparece el furigana */
.reading-container--n5 ruby {
  ruby-position: over;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(1em + 0.5em); /* Reserva espacio para furigana */
}
```

# KamiJi PRD — Parte 2.1: Temática Visual N4 — La Escuela Primaria

---

## 8.2 Nivel N4: 小学校 (Shōgakkō) — La Escuela Primaria

### Concepto Emocional

> _"Ya no eres un bebé. Puedes ir solo a la tienda, pedir cosas, contar historias simples. El mundo se expande y tú con él. Hay reglas, pero también hay orgullo en seguirlas."_

**Sensación objetivo**: Autonomía emergente, estructura amigable, curiosidad organizada, orgullo de las pequeñas conquistas. El usuario siente que "ya puede hacer cosas" — no es un recién nacido, es un alumno competente de primaria.

### Evolución Visual desde N5

La transición de N5 a N4 es **gradual y celebrada**. Cuando el usuario completa N5:

1. **Ceremonia de Graduación**: Animación de Kami-chan (la mascota kitsune) que recibe un pequeño sombrero de graduación → la UI hace un morph suave
2. **Los colores se calientan y se estructuran**: De pasteles difusos a tonos más definidos y "escolares"
3. **La tipografía gana estructura**: Menos redondeada, más legible, primer paso hacia la formalidad
4. **Los elementos decorativos se vuelven "educativos"**: De nubes y estrellas a lápices, cuadernos, mochilas estilizadas

### Paleta de Colores

```
PRIMARIOS:
  --n4-bg-primary:     #FFFDF7;     /* Blanco cálido — como hoja de cuaderno */
  --n4-bg-secondary:   #FFF3E0;     /* Melocotón pálido */
  --n4-accent-primary: #42A5F5;     /* Azul cielo escolar — confianza, estructura */
  --n4-accent-secondary: #66BB6A;   /* Verde pizarra — crecimiento, corrección */

TEXTO:
  --n4-text-primary:   #37474F;     /* Gris azulado oscuro — más "serio" que N5 */
  --n4-text-secondary: #607D8B;     /* Gris medio */
  --n4-text-kanji:     #263238;     /* Casi negro — contraste alto */

ESTADOS:
  --n4-success:        #66BB6A;     /* Verde esmeralda */
  --n4-warning:        #FFA726;     /* Naranja mandarina */
  --n4-error:          #EF5350;     /* Rojo suave */
  --n4-info:           #42A5F5;     /* Azul primario */

ACENTOS DECORATIVOS:
  --n4-deco-yellow:    #FFEE58;     /* Amarillo lápiz */
  --n4-deco-coral:     #FF7043;     /* Coral energético */
  --n4-deco-teal:      #26A69A;     /* Teal educativo */
```

### Tipografía

| Uso                  | Fuente         | Peso           | Tamaño                         | Justificación                                              |
| -------------------- | -------------- | -------------- | ------------------------------ | ---------------------------------------------------------- |
| **Kanji**            | `Noto Sans JP` | Regular (400)  | 22-26px móvil, 26-30px desktop | Transición a una fuente más "estándar" pero aún amigable   |
| **Furigana**         | `Noto Sans JP` | Light (300)    | 10-11px                        | Limpia y precisa                                           |
| **UI / Botones**     | `Outfit`       | SemiBold (600) | 14-16px                        | Sans-serif moderna con personalidad; más madura que Nunito |
| **Títulos**          | `Outfit`       | Bold (700)     | 20-26px                        | Estructura clara                                           |
| **Cuerpo (español)** | `Outfit`       | Regular (400)  | 15px                           | Excelente legibilidad                                      |

### Fondos y Elementos Decorativos

- **Fondo principal**: Blanco cálido `#FFFDF7` con textura sutil de cuadrícula de cuaderno (líneas horizontales en opacidad 3%)
- **Elementos decorativos SVG** (opacidad 6-10%):
  - ✏️ Lápices y bolígrafos estilizados
  - 📔 Cuadernos con espirales
  - 🎒 Mochilas (randoseru — la mochila escolar japonesa)
  - 🏫 Siluetas simplificadas de escuela japonesa
  - 📏 Reglas y escuadras geométricas
- **Animación de fondo**: Más sutil que N5; drift lento horizontal, no vertical. Sensación de "caminar al colegio"

### Mascota: Kami-chan Evoluciona

Kami-chan (el kitsune) ahora lleva:

- Un pequeño **uniforme escolar** japonés (gakuran/sailor fuku simplificado)
- Una **mochila** estilizada
- Expresiones más diversas: concentración, curiosidad, celebración discreta
- **Apariciones menos frecuentes** que en N5 — el usuario ya no necesita tanto "hand-holding"
- Aparece para: felicitar logros significativos, dar tips sobre kanji difíciles, motivar después de errores

### Micro-interacciones N4

| Acción                         | Animación                                                                                                  | Duración | Easing             |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------- | -------- | ------------------ |
| **Toque en kanji (Chuleta)**   | El kanji se "subraya" con un trazo animado azul antes de mostrar furigana; furigana aparece con slide-down | 350ms    | `ease-out`         |
| **Long-press (Rayo X)**        | Efecto de "lupa de leer" — lente rectangular con bordes redondeados; Panel emerge con slide-up             | 450ms    | spring(1, 100, 12) |
| **Marcar aprendido (swipe →)** | El kanji recibe un ✓ verde animado y se desliza suavemente a la derecha; partículas de confeti reducidas   | 500ms    | `ease-out`         |
| **Marcar repasar (swipe ←)**   | El kanji se "archiva" con animación de cuaderno abriéndose                                                 | 400ms    | `ease-in-out`      |
| **Completar historia**         | Estrella dorada se posiciona en la barra de progreso; barra se llena con efecto de "tinta"                 | 800ms    | secuencia          |
| **Nuevo día de racha**         | Pequeño calendario animado marca el día con un stamp rojo (hanko/sello japonés)                            | 600ms    | `bounce`           |

### Componentes UI Específicos de N4

- **Cards de historia**: Bordes menos redondeados (`border-radius: 14px`); estilo "tarjeta de biblioteca escolar" con una franja de color en la parte superior indicando dificultad
- **Barra de progreso**: Lineal con segmentos marcados; cada segmento completado se llena con animación de "tinta" azul
- **Botones**: Rounded-rectangle (`border-radius: 12px`); sombra más definida; estados hover más marcados
- **Contenedor de lectura**: Fondo blanco con líneas horizontales sutiles (como cuaderno); margen izquierdo rosa tenue simulando cuaderno japonés (margen vertical rojo)
- **Panel de Traducción**: Fondo blanco con header azul `--n4-accent-primary`; diseño más "tarjeta informativa" que en N5

### Reglas de Espaciado para Furigana en N4

```css
.reading-container--n4 {
  line-height: 2.6; /* Ligeramente más compacto que N5 */
  font-size: 22px; /* Kanji un poco más pequeños — el usuario ya tiene experiencia */
}

.reading-container--n4 ruby rt {
  font-size: 0.42em;
  transition: opacity 250ms ease-in-out; /* Transición más rápida — el usuario es más ágil */
}
```

### Transición N5 → N4: La Ceremonia de Graduación

```
Secuencia de la animación de subida de nivel (total: ~4 segundos):

1. [0-800ms]    La UI actual se desenfoca suavemente (blur: 0→8px)
2. [800-1600ms] Kami-chan aparece en el centro con una animación especial:
                 - Salta de alegría
                 - Recibe un pequeño sombrero de graduación
                 - Muestra un diploma que dice: "¡Felicidades! Has completado el Parvulario 🎉"
3. [1600-2400ms] Mensaje personalizado: "Has aprendido [X] kanji.
                  Ya puedes leer más que muchos turistas en Japón.
                  ¿Listo para la Escuela Primaria?"
4. [2400-3200ms] La UI se "transforma":
                  - Los colores mutan gradualmente (morph de paleta)
                  - La tipografía transiciona
                  - Los elementos decorativos cambian con crossfade
5. [3200-4000ms] La nueva UI N4 se revela completamente
                  - Kami-chan aparece con su uniforme nuevo
                  - Primera historia N4 se muestra como invitación
```

# KamiJi PRD — Parte 2.2: Temática Visual N3 — El Instituto / Adolescencia

---

## 8.3 Nivel N3: 中学校 (Chūgakkō) — El Instituto / Adolescencia

### Concepto Emocional

> _"El mundo no es tan simple como te enseñaron. La gente habla diferente a como escriben los libros. Tienes opiniones, emociones complejas, y una identidad que estás formando. Ya no eres un niño — pero tampoco eres un adulto."_

**Sensación objetivo**: Descubrimiento caótico, personalización, independencia creciente, un toque de rebeldía controlada. El usuario siente que está entrando al "mundo real" del japonés — donde la gente no habla como los libros de texto. La UI refleja esta transición con **el primer modo oscuro opcional**, colores más saturados, y una estética que empieza a "tener actitud".

### Evolución Visual desde N4

La transición de N4 a N3 es la **más dramática** de todas — como el salto de la niñez a la adolescencia:

1. **Ceremonia del "Primer Día de Instituto"**: Animación de Kami-chan que se quita el uniforme de primaria → se pone ropa casual → la UI se transforma con un efecto de "cortina que se abre"
2. **Los colores ganan profundidad**: De tonos escolares a paleta con más contraste y personalidad
3. **Aparece la opción de Dark Mode** por primera vez — como "quedarse despierto hasta tarde"
4. **La UI gana personalización**: El usuario puede elegir entre 2-3 "skins" por primera vez

### Paleta de Colores — Light Mode

```
PRIMARIOS:
  --n3-bg-primary:     #FAFAFA;     /* Gris blanquecino — más neutro, menos cálido */
  --n3-bg-secondary:   #F5F5F5;     /* Gris claro */
  --n3-accent-primary: #7C4DFF;     /* Violeta eléctrico — creatividad, identidad */
  --n3-accent-secondary: #FF6E40;   /* Naranja atardecer — energía adolescente */

TEXTO:
  --n3-text-primary:   #212121;     /* Casi negro */
  --n3-text-secondary: #757575;     /* Gris medio */
  --n3-text-kanji:     #1A1A1A;     /* Negro profundo */

ESTADOS:
  --n3-success:        #00E676;     /* Verde neón suave */
  --n3-warning:        #FFAB40;     /* Ámbar */
  --n3-error:          #FF5252;     /* Rojo vivo */
  --n3-info:           #448AFF;     /* Azul eléctrico */
```

### Paleta de Colores — Dark Mode (¡Nuevo en N3!)

```
PRIMARIOS:
  --n3-dark-bg-primary:     #1A1A2E;     /* Azul medianoche profundo */
  --n3-dark-bg-secondary:   #16213E;     /* Azul oscuro */
  --n3-dark-bg-surface:     #0F3460;     /* Azul profundo para cards */
  --n3-dark-accent-primary: #BB86FC;     /* Violeta luminoso */
  --n3-dark-accent-secondary: #FF7043;   /* Naranja cálido */

TEXTO:
  --n3-dark-text-primary:   #E8E8E8;     /* Blanco suave */
  --n3-dark-text-secondary: #9E9E9E;     /* Gris claro */
  --n3-dark-text-kanji:     #FFFFFF;     /* Blanco puro para máximo contraste */
```

### Tipografía

| Uso                  | Fuente         | Peso           | Tamaño                         | Justificación                                                                |
| -------------------- | -------------- | -------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| **Kanji**            | `Noto Sans JP` | Regular (400)  | 20-24px móvil, 24-28px desktop | Tamaño ligeramente reducido — el usuario tiene más experiencia visual        |
| **Furigana**         | `Noto Sans JP` | Light (300)    | 9-10px                         | Más discreta — se espera menos dependencia                                   |
| **UI / Botones**     | `Inter`        | Medium (500)   | 14-16px                        | Transición a tipografía profesional; Inter es "la fuente de las apps serias" |
| **Títulos**          | `Inter`        | SemiBold (600) | 20-24px                        | Limpia, directa, sin adornos                                                 |
| **Cuerpo (español)** | `Inter`        | Regular (400)  | 15px                           | Excelente rendimiento en pantalla                                            |

### Fondos y Elementos Decorativos

- **Fondo principal (Light)**: Gris blanquecino limpio sin textura — la primera vez que el fondo es "plano y adulto"
- **Fondo principal (Dark)**: Gradiente sutil de `#1A1A2E` a `#16213E` — profundidad sin monotonía
- **Elementos decorativos**: Prácticamente eliminados del fondo. Los ornamentos infantiles desaparecen. Se reemplazan por:
  - Líneas geométricas sutiles en opacidad 3-5% — como un grid de diseño
  - Gradientes de color suaves en las esquinas de la pantalla (ambient lighting)
  - **Glow effects** sutiles detrás de elementos interactivos
- **La reducción de decoración es intencional** — refleja el "menos es más" adolescente: "ya no necesito dibujos, soy mayor"

### Mascota: Kami-chan Se Vuelve Sutil

En N3, Kami-chan experimenta un cambio significativo:

- **Ya no aparece constantemente** — solo en momentos clave (logros importantes, días sin actividad)
- **Diseño más maduro**: Silueta más estilizada, menos kawaii, más "logo mascot"
- Aparece como **avatar en esquina** en lugar de personaje animado flotante
- Sus mensajes cambian de tono: de "¡Genial!" a "Buen trabajo 👊" — más coloquial
- Puede ser **desactivada por el usuario** por primera vez (toggle en Preferencias)
- Cuando aparece, usa **glassmorphism** en su contenedor: `backdrop-filter: blur(12px)`

### Micro-interacciones N3

| Acción                         | Animación                                                                                               | Duración | Easing             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- | -------- | ------------------ |
| **Toque en kanji (Chuleta)**   | Glow pulsante violeta alrededor del kanji → furigana aparece con fade-in rápido                         | 300ms    | `ease-out`         |
| **Long-press (Rayo X)**        | Efecto "scan line" horizontal que recorre el kanji → Panel emerge con slide-up + blur                   | 400ms    | spring(1, 120, 14) |
| **Subrayado X-Ray**            | Efecto de "highlight" con gradiente violeta semi-transparente; la línea "escanea" el texto bajo el dedo | continuo | `linear`           |
| **Marcar aprendido (swipe →)** | Check mark animado con estilo "hand-drawn"; vibración háptica sutil (si disponible)                     | 400ms    | `ease-out`         |
| **Marcar repasar (swipe ←)**   | Animación de "bookmark" que se pliega                                                                   | 350ms    | `ease-in-out`      |
| **Completar historia**         | Barra de progreso se llena con efecto de "energía neón"; pulso de glow en el progreso total             | 700ms    | `ease-in-out`      |
| **Cambio Light ↔ Dark**        | Morph de colores con duración 800ms; icono de luna/sol rota suavemente                                  | 800ms    | `ease-in-out`      |

### Componentes UI Específicos de N3

- **Cards de historia**: `border-radius: 12px`; borde sutil de 1px en color de acento; hover/tap muestra sombra expandida con glow de acento
- **Barra de progreso**: Estilo "XP bar" de videojuego — lineal con gradiente de color que cambia según el porcentaje
- **Botones**: `border-radius: 10px`; efecto ripple al tocar (Material Design sutil); variantes filled y outlined
- **Contenedor de lectura**: Fondo limpio sin líneas; padding de 20px; borde izquierdo sustituido por un accent bar vertical mínima de 2px
- **Panel de Traducción**: Glassmorphism: `background: rgba(255,255,255,0.85); backdrop-filter: blur(16px);` (en dark: `rgba(26,26,46,0.9)`)
- **Tags/Chips**: Aparecen por primera vez — etiquetas de categoría (gramática, vocabulario, cultura) con colores de acento

### Personalización (Nueva Feature en N3)

Por primera vez, el usuario puede personalizar aspectos de la UI:

| Opción                   | Valores                                                           | Default     |
| ------------------------ | ----------------------------------------------------------------- | ----------- |
| **Tema**                 | Light / Dark / Auto (según SO)                                    | Auto        |
| **Acento primario**      | Violeta / Azul / Teal                                             | Violeta     |
| **Furigana por defecto** | Oculto / Siempre visible en kanji no aprendidos / Siempre visible | Oculto      |
| **Mascota Kami-chan**    | Visible / Solo logros / Oculta                                    | Solo logros |
| **Densidad del texto**   | Espaciado / Normal / Compacto                                     | Normal      |

### Reglas de Espaciado para Furigana en N3

```css
.reading-container--n3 {
  line-height: 2.4; /* Más compacto — textos más largos */
  font-size: 20px; /* Kanji tamaño estándar */
}

.reading-container--n3 ruby rt {
  font-size: 0.4em;
  transition: opacity 200ms ease-in-out; /* Transición rápida — el usuario la espera */
}

/* Modo de furigana permanente para kanji no aprendidos */
.reading-container--n3 ruby.not-learned rt {
  opacity: 0.5; /* Semi-visible como guía sutil */
}
```

# KamiJi PRD — Parte 2.3: Temática Visual N2 — La Universidad

---

## 8.4 Nivel N2: 大学 (Daigaku) — La Universidad y las Prácticas Profesionales

### Concepto Emocional

> _"Eres un adulto funcional. Lees informes, argumentas con lógica, consumes contenido diseñado para nativos. La herramienta ya no te guía — te acompaña. Eres un profesional que usa una herramienta profesional."_

**Sensación objetivo**: Competencia profesional, confianza, elegancia funcional, seriedad sin aridez. La UI se transforma en lo que podría ser un dashboard de productividad premium japonés — piensa en la estética de Linear, Notion o Raycast, pero con alma japonesa.

### Evolución Visual desde N3

1. **Ceremonia de "Entrada a la Universidad"**: Animación cinematográfica reducida — transición elegante con fade to white → la UI se reconstruye pieza por pieza como un layout que "se ensambla"
2. **Colores neutros con acentos precisos**: La paleta se reduce drásticamente; cada color tiene un propósito informacional
3. **La tipografía se vuelve tipográfica**: Serif para títulos, monospace para datos — como un documento serio
4. **Desaparecen los elementos decorativos gratuitos**: Todo elemento visual tiene función informativa

### Paleta de Colores — Light Mode

```
PRIMARIOS:
  --n2-bg-primary:     #FFFFFF;     /* Blanco puro — limpieza profesional */
  --n2-bg-secondary:   #F8F9FA;     /* Gris hielo */
  --n2-bg-surface:     #FFFFFF;     /* Cards blancas sobre gris */
  --n2-accent-primary: #1A73E8;     /* Azul Google — profesional, confiable */
  --n2-accent-secondary: #0D47A1;   /* Azul profundo — autoridad */

TEXTO:
  --n2-text-primary:   #1F1F1F;     /* Negro suave */
  --n2-text-secondary: #5F6368;     /* Gris Google */
  --n2-text-kanji:     #000000;     /* Negro puro — máxima claridad */

ESTADOS:
  --n2-success:        #1E8E3E;     /* Verde corporativo */
  --n2-warning:        #F9AB00;     /* Ámbar profesional */
  --n2-error:          #D93025;     /* Rojo serio */
  --n2-info:           #1A73E8;     /* Azul primario */

BORDES Y SEPARADORES:
  --n2-border:         #DADCE0;     /* Gris borde sutil */
  --n2-divider:        #E8EAED;     /* Línea divisoria */
```

### Paleta de Colores — Dark Mode

```
PRIMARIOS:
  --n2-dark-bg-primary:     #121212;     /* Negro material */
  --n2-dark-bg-secondary:   #1E1E1E;     /* Gris oscuro */
  --n2-dark-bg-surface:     #2D2D2D;     /* Surface elevada */
  --n2-dark-accent-primary: #8AB4F8;     /* Azul luminoso */
  --n2-dark-accent-secondary: #669DF6;   /* Azul medio */

TEXTO:
  --n2-dark-text-primary:   #E8EAED;     /* Blanco suave */
  --n2-dark-text-secondary: #9AA0A6;     /* Gris medio */
  --n2-dark-text-kanji:     #FFFFFF;     /* Blanco puro */
```

### Tipografía

| Uso                  | Fuente               | Peso           | Tamaño                         | Justificación                                        |
| -------------------- | -------------------- | -------------- | ------------------------------ | ---------------------------------------------------- |
| **Kanji**            | `Noto Serif JP`      | Regular (400)  | 20-22px móvil, 22-26px desktop | Serif japonesa — elegancia formal, como un periódico |
| **Furigana**         | `Noto Sans JP`       | Light (300)    | 8-9px                          | Mínimo pero legible                                  |
| **UI / Navegación**  | `Inter`              | Medium (500)   | 13-15px                        | Estándar de la industria tech                        |
| **Títulos**          | `Noto Serif` (latín) | SemiBold (600) | 18-24px                        | Serif para títulos — seriedad editorial              |
| **Cuerpo (español)** | `Inter`              | Regular (400)  | 14px                           | Densidad informativa aumentada                       |
| **Datos / Stats**    | `JetBrains Mono`     | Regular (400)  | 13px                           | Monospace para porcentajes, conteos, métricas        |

### Fondos y Elementos Decorativos

- **Fondo**: Completamente plano. Sin texturas, sin gradientes decorativos, sin parallax
- **Decoración**: **Cero**. La belleza emerge de la tipografía, el espacio en blanco y la alineación precisa
- **Elementos informativos**:
  - Grid lines sutilísimas para alinear contenido (opacidad 2%)
  - Badges y tags con datos funcionales (nivel de dificultad del texto, categoría, kanji nuevos)
  - Micro-gráficos: sparklines de progreso, heat maps de repaso
- **Inspiración visual**: Bloomberg Terminal + Notion + periódico Nikkei (日経新聞)

### Mascota: Kami-chan como Ícono

- **Ya no es un personaje animado** — es un **ícono estilizado** en la esquina superior
- Aparece como **avatar minimalista** en notificaciones y mensajes del sistema
- Diseño: silueta monocromática del kitsune, estilo logo corporativo
- Solo aparece activamente durante eventos especiales (aniversarios de uso, logros milestone)
- El tono de los mensajes es **directo y profesional**: "Has dominado 847 kanji. Continúa así."

### Micro-interacciones N2

| Acción                       | Animación                                                                              | Duración | Easing        |
| ---------------------------- | -------------------------------------------------------------------------------------- | -------- | ------------- |
| **Toque en kanji (Chuleta)** | Underline animado sutil → furigana aparece con fade-in instantáneo                     | 200ms    | `ease-out`    |
| **Long-press (Rayo X)**      | Borde de selección azul aparece alrededor del kanji → Panel emerge con slide-up limpio | 300ms    | `ease-out`    |
| **Subrayado X-Ray**          | Highlight con fondo azul semi-transparente `rgba(26,115,232,0.12)`                     | continuo | `linear`      |
| **Marcar aprendido**         | Ícono ✓ minimalista + el kanji se desvanece suavemente del contexto de repaso          | 300ms    | `ease-out`    |
| **Marcar repasar**           | Ícono de bookmark + flash sutil del borde                                              | 250ms    | `ease-in-out` |
| **Completar texto**          | Barra de progreso se actualiza con transición suave; stat counter incrementa           | 400ms    | `ease-out`    |

### Componentes UI Específicos de N2

- **Cards de historia**: `border-radius: 8px`; borde de 1px `--n2-border`; sin sombra (o sombra mínima de 1px); layout tipo artículo periodístico
- **Barra de progreso**: Minimalista — línea fina con porcentaje numérico al lado; sin animaciones exageradas
- **Botones**: `border-radius: 6px`; estilo Google Material 3; padding preciso; transiciones de 150ms
- **Contenedor de lectura**: Tipo columna de periódico; máximo 680px de ancho para legibilidad óptima; margen amplio; tipografía serif
- **Panel de Traducción**: Card limpia con header mínimo; tabs para "Significado", "Lecturas", "Compuestos"; datos tabulados
- **Dashboard lateral**: Estadísticas de sesión (kanji vistos, tiempo, accuracy) en panel colapsable

### Layout: Evolución Significativa

En N2, el layout cambia fundamentalmente para usuarios desktop:

```
┌─────────────────────────────────────────────────────────────┐
│  ≡ KamiJi      N2 · 大学      ████████░░ 78%      ⚙ 👤    │
├────────────┬────────────────────────────────┬───────────────┤
│            │                                │               │
│  Índice    │     Área de Lectura            │  Panel de     │
│  de        │     (texto con kanji)          │  Estadísticas │
│  Textos    │                                │  y Repaso     │
│            │     max-width: 680px           │               │
│  > Textos  │     font: Noto Serif JP        │  - Kanji del  │
│  > Repaso  │                                │    día: 12    │
│  > Stats   │                                │  - Racha: 23d │
│            │                                │  - Nivel: 67% │
│            │                                │               │
├────────────┴────────────────────────────────┴───────────────┤
│  © KamiJi 2026  ·  N2: La Universidad  ·  Invítame un ☕   │
└─────────────────────────────────────────────────────────────┘
```

En móvil, los paneles laterales se colapsan en tabs inferiores o menú hamburguesa.

### Reglas de Espaciado para Furigana en N2

```css
.reading-container--n2 {
  line-height: 2.2; /* Compacto pero con espacio para furigana */
  font-size: 20px;
  max-width: 680px; /* Columna de lectura óptima */
  margin: 0 auto;
  font-family: "Noto Serif JP", serif;
}

.reading-container--n2 ruby rt {
  font-size: 0.38em;
  font-family: "Noto Sans JP", sans-serif; /* Sans para furigana sobre serif */
  transition: opacity 150ms ease-out;
}

/* En N2, furigana solo aparece para kanji de nivel N2+ (no para N5-N3 ya aprendidos) */
.reading-container--n2 ruby.mastered rt {
  display: none; /* No mostrar furigana para kanji dominados */
}
```

# KamiJi PRD — Parte 2.4: Temática Visual N1 — El Doctorado

---

## 8.5 Nivel N1: 博士 (Hakase) — El Doctorado y la Vida Cívica Adulta

### Concepto Emocional

> _"Eres un erudito. No solo lees japonés — lo saboreas. Aprecias la diferencia entre una traducción aceptable y una elegante. La precisión absoluta es tu estándar. Incluso nativos jóvenes sudarían con los textos que tú lees."_

**Sensación objetivo**: Maestría serena, elegancia literaria, minimalismo wabi-sabi (侘寂), reverencia por la palabra escrita. La UI se convierte en un **santuario digital de la lectura** — como abrir un libro encuadernado en tela en una biblioteca silenciosa de Kioto.

### Evolución Visual desde N2

1. **Ceremonia del "Erudito"**: La transición más sobria y elegante de todas — un fade a negro durante 2 segundos → un solo kanji (学 - aprender) se traza con animación de pincelada → la nueva UI se revela como una cortina de tinta que se disuelve
2. **Los colores se reducen a esenciales**: Negro, blanco, un acento en bermellón o dorado — la paleta de la caligrafía japonesa
3. **La tipografía alcanza su forma final**: Serif japonesa con reminiscencias de impresión tradicional
4. **La interfaz desaparece**: La UI se minimiza al máximo — el contenido ES la interfaz

### Paleta de Colores — Light Mode (Washi / 和紙)

```
PRIMARIOS:
  --n1-bg-primary:     #FAF8F5;     /* Blanco marfil — como papel washi envejecido */
  --n1-bg-secondary:   #F2EDE7;     /* Pergamino suave */
  --n1-bg-surface:     #FFFFFF;     /* Blanco para áreas de lectura */
  --n1-accent-primary: #B71C1C;     /* Bermellón (朱色 shuiro) — sello hanko, tinta roja */
  --n1-accent-secondary: #8D6E63;   /* Marrón tinta (墨色 sumiiro) */

TEXTO:
  --n1-text-primary:   #1B1B1B;     /* Negro tinta */
  --n1-text-secondary: #6D6D6D;     /* Gris tinta diluida */
  --n1-text-kanji:     #0A0A0A;     /* Negro profundo — como tinta sumi fresca */

ESTADOS:
  --n1-success:        #2E7D32;     /* Verde bambú */
  --n1-warning:        #E65100;     /* Naranja otoñal (紅葉 momiji) */
  --n1-error:          #C62828;     /* Rojo profundo */
  --n1-info:           #1565C0;     /* Azul índigo (藍色 ai-iro) */

ACENTOS DECORATIVOS (mínimos):
  --n1-gold:           #C9A96E;     /* Dorado envejecido (金 kin) */
  --n1-ink:            #3E2723;     /* Tinta sumi */
```

### Paleta de Colores — Dark Mode (Sumi / 墨)

```
PRIMARIOS:
  --n1-dark-bg-primary:     #0D0D0D;     /* Negro absoluto — como noche sin luna */
  --n1-dark-bg-secondary:   #1A1714;     /* Negro cálido — carbón */
  --n1-dark-bg-surface:     #252220;     /* Surface — madera oscura */
  --n1-dark-accent-primary: #E57373;     /* Bermellón suave */
  --n1-dark-accent-secondary: #BCAAA4;   /* Arcilla clara */

TEXTO:
  --n1-dark-text-primary:   #E0DDD8;     /* Blanco pergamino */
  --n1-dark-text-secondary: #8C8580;     /* Gris cálido */
  --n1-dark-text-kanji:     #F5F2ED;     /* Blanco marfil */
```

### Tipografía

| Uso                   | Fuente               | Peso                 | Tamaño  | Justificación                                       |
| --------------------- | -------------------- | -------------------- | ------- | --------------------------------------------------- |
| **Kanji**             | `Noto Serif JP`      | Regular (400)        | 20-22px | Serif — como impresión de libro japonés tradicional |
| **Furigana**          | `Noto Sans JP`       | Light (300)          | 8px     | Mínimo absoluto — el usuario rara vez la necesita   |
| **UI / Navegación**   | `Cormorant Garamond` | Medium (500)         | 13-14px | Serif latina elegante; evoca tipografía académica   |
| **Títulos**           | `Cormorant Garamond` | SemiBold (600)       | 18-22px | Elegancia literaria                                 |
| **Cuerpo (español)**  | `Cormorant Garamond` | Regular (400)        | 15px    | Lectura inmersiva, como una revista literaria       |
| **Citas / Extractos** | `Noto Serif JP`      | Light (300) + Italic | 18px    | Para citas literarias japonesas destacadas          |

### Fondos y Elementos Decorativos

- **Fondo (Light)**: Textura sutil de papel washi con fibras visibles (opacidad 4-6%) — hecho con CSS noise/grain pattern
- **Fondo (Dark)**: Negro con grano sutil — como papel de carbón de alta calidad
- **Decoración**: Casi inexistente. Solo:
  - **Un sello hanko (判子)** estilizado como marca de KamiJi en la esquina inferior — bermellón sobre fondo claro
  - **Líneas de separación** hechas con trazo de pincel SVG animado (no líneas CSS rectas)
  - **Motivos estacionales mínimos** (opcionales, desactivables): un pétalo de sakura en primavera, una hoja de arce en otoño, un copo de nieve estilizado en invierno — sutilísimos, solo 1-2 elementos
- **Filosofía de diseño**: Wabi-sabi — encontrar la belleza en la imperfección y la simplicidad. Cada pixel vacío es intencional.

### Mascota: Kami-chan Trascendida

- **Ya no es una mascota** — es un **sello (hanko)** o **mon (紋, emblema)**
- Aparece como marca de agua sutil en documentos completados
- Los mensajes del sistema usan un tono **literario y contemplativo**: _"Has recorrido un camino largo. 千里の道も一歩から — Un viaje de mil leguas comienza con un solo paso."_
- Solo aparece como personaje animado en el **aniversario de uso** — una versión adulta y sabia del kitsune original

### Micro-interacciones N1

| Acción                       | Animación                                                                                                           | Duración | Easing        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| **Toque en kanji (Chuleta)** | El kanji se "ilumina" con un sutil glow dorado → furigana aparece con fade-in ultra-suave                           | 250ms    | `ease-out`    |
| **Long-press (Rayo X)**      | Efecto de "tinta expandiéndose" desde el punto de presión → Panel emerge como pergamino desenrollándose desde abajo | 500ms    | `ease-in-out` |
| **Subrayado X-Ray**          | "Pincelada" de tinta bermellón semi-transparente sigue el dedo                                                      | continuo | `linear`      |
| **Marcar aprendido**         | Sello hanko se estampa sobre el kanji con micro-vibración; efecto de tinta expandiéndose                            | 400ms    | `ease-out`    |
| **Marcar repasar**           | Trazo de pincel marca suavemente el kanji                                                                           | 300ms    | `ease-in-out` |
| **Completar texto**          | Un sello de "完了" (completado) se estampa con animación de presión; tinta se expande suavemente                    | 600ms    | secuencia     |

### Componentes UI Específicos de N1

- **Cards de texto**: `border-radius: 4px` o 0px; borde superior con "trazo de pincel" SVG; sin sombra; separación por espacio en blanco amplio
- **Barra de progreso**: Casi invisible — un número y un punto pequeño que indica posición en el recorrido. "1,847 / 2,136 kanji" en tipografía monospace discreta
- **Botones**: `border-radius: 4px`; bordes finos; colores contenidos; hover sutil (cambio de background-color a `--n1-bg-secondary`)
- **Contenedor de lectura**: Máximo 640px; márgenes amplísimos (simular márgenes de libro); tipografía serif a tamaño confortable; interlineado amplio para respiro visual
- **Panel de Traducción**: Estilo "nota al margen" — aparece al costado del texto (desktop) o como overlay translúcido mínimo (móvil); fuente serif; layout tipo diccionario clásico

### Feature Exclusiva N1: Modo Inmersión (没入モード)

Un modo de lectura especial que elimina **absolutamente toda la UI** excepto el texto:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│                                                             │
│          この美しい文章を読んでいる時、あなたは         │
│          もう外国人ではない。あなたは読者だ。             │
│                                                             │
│          (Mientras lees esta bella prosa, ya no             │
│           eres un extranjero. Eres un lector.)              │
│                                                             │
│                                                             │
│                                                             │
│                                              [判] KamiJi    │
└─────────────────────────────────────────────────────────────┘
```

- Se activa con doble-tap en los márgenes o swipe horizontal
- Los gestos de kanji siguen funcionando
- La barra de navegación desaparece completamente
- Para salir: swipe vertical hacia arriba o toque en la marca KamiJi

### Reglas de Espaciado para Furigana en N1

```css
.reading-container--n1 {
  line-height: 2.2;
  font-size: 20px;
  max-width: 640px;
  margin: 0 auto;
  font-family: "Noto Serif JP", serif;
  letter-spacing: 0.02em; /* Micro-tracking para elegancia */
}

.reading-container--n1 ruby rt {
  font-size: 0.36em;
  font-family: "Noto Sans JP", sans-serif;
  transition: opacity 200ms ease-out;
  color: var(--n1-text-secondary); /* Furigana más sutil que el kanji */
}

/* En N1, furigana solo se muestra para kanji de nivel N1 (todo lo anterior está dominado) */
.reading-container--n1 ruby.mastered rt {
  display: none;
}
```

---

## 8.6 Resumen Comparativo de Evolución Visual

| Aspecto              | N5 Parvulario         | N4 Primaria       | N3 Instituto       | N2 Universidad       | N1 Doctorado       |
| -------------------- | --------------------- | ----------------- | ------------------ | -------------------- | ------------------ |
| **Paleta**           | Pasteles cálidos      | Escolares claros  | Eléctricos + Dark  | Corporativos neutros | Tinta y pergamino  |
| **Tipografía kanji** | Zen Maru Gothic       | Noto Sans JP      | Noto Sans JP       | Noto Serif JP        | Noto Serif JP      |
| **Tipografía UI**    | Nunito                | Outfit            | Inter              | Inter                | Cormorant Garamond |
| **Border-radius**    | 20px                  | 14px              | 12px               | 8px                  | 4px                |
| **Decoración**       | Abundante, kawaii     | Moderada, escolar | Mínima, geométrica | Cero, funcional      | Washi, pincel      |
| **Mascota**          | Animada, frecuente    | Uniformada, media | Sutil, opcional    | Ícono, rara          | Sello/mon, ausente |
| **Animaciones**      | Bouncy, celebratorias | Estructuradas     | Con glow/neon      | Precisas, mínimas    | Tinta, zen         |
| **Dark Mode**        | No                    | No                | Sí (debut)         | Sí                   | Sí                 |
| **Personalización**  | No                    | No                | Debut (3 opciones) | Expandida            | Completa           |
| **Line-height**      | 2.8                   | 2.6               | 2.4                | 2.2                  | 2.2                |
| **Font-size kanji**  | 24-28px               | 22-26px           | 20-24px            | 20-22px              | 20-22px            |
| **Sonidos**          | Sí (default on)       | Sí (default on)   | Sí (default off)   | No (opt-in)          | No (opt-in)        |

# KamiJi PRD — Parte 3.0: Motor de Furigana y Traducción (IA + Diccionarios)

---

## 9. Motor de Furigana y Traducción

### 9.1 Arquitectura del Motor: Sistema Híbrido de 3 Capas

El motor de furigana y traducción de KamiJi opera como un sistema de **3 capas** con fallback progresivo, diseñado para ser robusto, preciso y eficiente:

```
┌──────────────────────────────────────────────────────┐
│                  CAPA 1: DICCIONARIOS                │
│        (Offline, instantáneo, alta precisión)        │
│                                                      │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │   JMdict     │  │  KANJIDIC2   │  │  Jitendex   │ │
│  │  (Spanish)   │  │  (Spanish)   │  │             │ │
│  └─────────────┘  └──────────────┘  └─────────────┘ │
│                                                      │
│  → Búsqueda de palabras exactas y kanji aislados     │
│  → Furigana para compuestos conocidos                │
│  → Traducciones en español verificadas               │
│  → Funciona 100% offline                             │
├──────────────────────────────────────────────────────┤
│                  CAPA 2: IA GEMINI                   │
│      (Online, contextual, resolución de ambigüedad)  │
│                                                      │
│  ┌──────────────────────┐  ┌───────────────────────┐ │
│  │ gemini-3.1-flash-lite-preview      │  │ gemini-3-flash-preview      │ │
│  │ (N5, N4, N3)         │  │ (N2, N1)              │ │
│  │ Textos simples       │  │ Textos complejos      │ │
│  └──────────────────────┘  └───────────────────────┘ │
│                                                      │
│  → Desambiguación de lecturas (音読み vs 訓読み)       │
│  → Traducción contextual de frases completas         │
│  → Explicaciones culturales/matizadas                │
│  → Furigana para compuestos raros/no en diccionario  │
├──────────────────────────────────────────────────────┤
│                  CAPA 3: CACHE + FALLBACK            │
│           (Resiliencia y rendimiento)                │
│                                                      │
│  ┌──────────────────────────────────────────────────┐│
│  │  IndexedDB Cache (resultados de IA anteriores)   ││
│  │  + Heurísticas de fallback (reglas de lectura)   ││
│  └──────────────────────────────────────────────────┘│
│                                                      │
│  → Si la IA falla, busca en cache de consultas prev. │
│  → Si cache no tiene, aplica heurísticas básicas     │
│  → Nunca muestra "sin resultado" al usuario          │
└──────────────────────────────────────────────────────┘
```

### 9.2 Integración de Diccionarios

#### Fuentes de Datos

| Diccionario             | Propósito                                                                                    | Formato Original | Formato en KamiJi                   | Licencia             |
| ----------------------- | -------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------- | -------------------- |
| **JMdict (Spanish)**    | Vocabulario japonés-español: significados, lecturas, compuestos                              | XML              | SQLite / JSON indexado en IndexedDB | CC BY-SA 4.0         |
| **KANJIDIC2 (Spanish)** | Datos por kanji individual: significados, lecturas on/kun, trazos, nivel JLPT, grado escolar | XML              | SQLite / JSON indexado en IndexedDB | CC BY-SA 4.0         |
| **Jitendex**            | Definiciones detalladas, frases de ejemplo, datos adicionales                                | JSON             | JSON indexado en IndexedDB          | Dominio público / CC |

#### Pipeline de Datos

```
1. PREPROCESAMIENTO (build time):
   ├─ Descargar XML/JSON fuente de EDRDG
   ├─ Parsear y filtrar entradas con traducciones al español
   ├─ Enriquecer con datos de frecuencia de uso
   ├─ Mapear kanji a nivel JLPT (usando lista curada)
   ├─ Generar índices de búsqueda (por kanji, por lectura, por significado)
   └─ Exportar como JSON optimizado para IndexedDB

2. DISTRIBUCIÓN (deploy time):
   ├─ JSON particionado por nivel JLPT (N5.json, N4.json, etc.)
   ├─ Precaching vía Service Worker del nivel actual del usuario
   ├─ Lazy loading de niveles no desbloqueados
   └─ Tamaño estimado: ~2MB por nivel (comprimido con gzip)

3. RUNTIME (client-side):
   ├─ Búsqueda en IndexedDB local (latencia < 5ms)
   ├─ Si no encuentra → consulta a IA Gemini
   ├─ Resultado de IA → cachear en IndexedDB para uso futuro
   └─ Resultado compuesto → mezcla diccionario + IA para máxima precisión
```

### 9.3 Integración con Gemini AI

#### Selección de Modelo por Nivel

| Contexto                                   | Modelo                          | Justificación                                                                              |
| ------------------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------ |
| **N5, N4, N3** (kanji básicos-intermedios) | `gemini-3.1-flash-lite-preview` | Rápido, económico; los textos son simples y la desambiguación es directa                   |
| **N2, N1** (kanji avanzados)               | `gemini-3-flash-preview`        | Mayor capacidad de razonamiento para textos complejos, matices literarios y lecturas raras |

> **Nota**: Los modelos se actualizarán a las últimas versiones disponibles al momento del desarrollo y mantenimiento de KamiJi. Los nombres `gemini-3.1-flash-lite-preview` y `gemini-3-flash-preview` son referencias a la generación de modelos a utilizar.
> **Nota 2**: Los modelos actuales a la fecha de desarrollo abril de 2026 son `gemini-3.1-flash-lite-preview` y `gemini-3-flash-preview` y estos se implementarán en la fase de desarrollo, no obstante los nombres de los modelos pueden cambiar y sus especificaciones pueden variar, la implementación será usando @google/genai SDK y se le proporcionará contexto de implementación actualizada y recomendada por Google para hacer una implementación correcta.
> **Nota 3**: Los modelos actualmente cuentan con Thinking capabilities, se puede ajustar la forma de trabajar con esto mediante un parametro en la API, se deberá tomar en cuenta para configurar un ThinkingLevel dinámico, pues no se requiere el mismo esfuerzo para traducir una palabra/kanji N5, que un texto complejo con kanjis N1 o N2. Por lo tanto se podrá ajustar el ThinkingLevel de la API en base al nivel del usuario o a la complejidad del texto.
> **Nota 4**: Para el correcto funcionamiento de la API se deberá tomar en cuenta la implementación del parámetro `thinking_level`, el cual se deberá configurar de acuerdo al nivel de conocimiento del usuario y/o la complejidad del texto a traducir.

#### Prompts del Sistema

**Prompt para Furigana + Traducción (ejemplo N5-N3):**

```
Eres un asistente de aprendizaje de japonés para hispanohablantes.
Tu tarea es proporcionar:
1. Furigana preciso para los kanji indicados
2. Traducción al español natural y contextual
3. Nota breve si hay ambigüedad en la lectura

CONTEXTO:
- Nivel del usuario: {user_level} (JLPT)
- Texto completo: {full_text}
- Kanji/palabra seleccionada: {selected_text}
- Posición en el texto: {position_context}

REGLAS:
- Usa español neutro (evita regionalismos extremos)
- Indica entre paréntesis si hay lecturas alternativas comunes
- Si es una palabra compuesta, desglosa cada kanji brevemente
- Formato de respuesta: JSON estricto

FORMATO DE RESPUESTA:
{
  "furigana": "lectura en hiragana",
  "translation": "traducción en español",
  "kanji_breakdown": [
    {"kanji": "字", "reading": "じ", "meaning": "carácter"}
  ],
  "note": "nota opcional sobre uso o matiz",
  "confidence": 0.95
}
```

#### Manejo de Errores de IA

| Error                       | Código      | Mensaje al Usuario                                                                                                                                      | Acción del Sistema                                                   |
| --------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Rate limit (RPM)**        | 429         | "¡Uy! La IA necesita un respiro. Prueba de nuevo en unos segundos 😅"                                                                                   | Retry con exponential backoff (1s, 2s, 4s); máx 3 intentos           |
| **Rate limit (RPD/diario)** | 429         | "Has usado mucha IA hoy, ¡genial! Pero el límite diario se alcanzó. Mañana podrás seguir. Mientras tanto, la Chuleta (diccionarios) funciona sin IA 💪" | Desactivar IA hasta reset; forzar fallback a Capa 1                  |
| **API Key inválida**        | 401         | "Tu clave de Gemini parece no funcionar. Revísala en Preferencias → API Key"                                                                            | Enlace directo a pantalla de API Key                                 |
| **Respuesta mal formada**   | parse_error | "La IA respondió algo raro 🤔 Usando diccionarios como respaldo"                                                                                        | Log del error; fallback a Capa 1; reintentar con prompt simplificado |
| **Timeout**                 | timeout     | "La IA está tardando más de lo normal... Usando diccionarios mientras tanto"                                                                            | Timeout de 8s; fallback inmediato a Capa 1                           |
| **Sin conexión**            | offline     | (No se muestra error específico de IA; la app usa diccionarios offline transparentemente)                                                               | Modo offline automático; IA deshabilitada                            |
| **Error genérico**          | 500/502/503 | "¡Ups! Algo falló con la IA. Inténtalo de nuevo en unos minutitos 🙏"                                                                                   | Retry 1 vez; luego fallback a Capa 1                                 |

#### Optimización de Costos de IA

- **Caching agresivo**: Cada consulta a Gemini se cachea en IndexedDB con key = `{text}:{context}:{level}`. Si el mismo texto se consulta de nuevo, se sirve desde cache sin tocar la API.
- **Batching inteligente**: Cuando el usuario abre una historia nueva, se pre-procesan los kanji desconocidos (no aprendidos + no en diccionario) en un solo batch request a Gemini.
- **Fallback-first**: Para kanji que existen en JMdict/KANJIDIC, **nunca se llama a la IA**. Solo se invoca cuando el diccionario no tiene la entrada, el contexto es ambiguo, o el usuario solicita una traducción de frase completa.
- **Rate limiting interno**: KamiJi implementa su propio rate limiter (max 15 requests/minuto) para evitar que el usuario agote su cuota de API inadvertidamente.

### 9.4 Flujo de Resolución de Furigana

```
Usuario toca un kanji → ¿Está el kanji/compuesto en IndexedDB (diccionario)?
                          │
                     ┌────┴────┐
                     Sí        No
                     │         │
              Mostrar          ¿Está en cache de IA?
              furigana              │
              del diccionario  ┌────┴────┐
                               Sí        No
                               │         │
                         Mostrar     ¿Hay conexión?
                         furigana         │
                         cacheado    ┌────┴────┐
                                     Sí        No
                                     │         │
                               Consultar   Aplicar
                               Gemini AI   heurísticas
                                     │     de fallback
                               Cachear      │
                               resultado  Mostrar
                                     │     lectura
                               Mostrar   estimada
                               furigana   con badge
                               de IA      "sin confirmar"
```

### 9.5 Créditos y Licencias (Obligatorio)

La aplicación debe mostrar en la pantalla de "Acerca de" (dentro de Preferencias):

```
Datos de diccionario proporcionados por:
- JMdict/EDICT — © Electronic Dictionary Research and Development Group (EDRDG)
- KANJIDIC2 — © EDRDG
- Jitendex — © jitendex.org

Licenciados bajo Creative Commons Attribution-ShareAlike 4.0.
```

# KamiJi PRD — Parte 3.1: Sistema de Interacciones y Gestos

---

## 10. Sistema de Interacciones y Gestos

### 10.1 Filosofía de Interacción

> _"El gesto perfecto es aquel que no necesita instrucción. Es tan natural que el usuario siente que la aplicación lee su mente."_

KamiJi implementa un sistema de gestos en capas diseñado para que la curva de aprendizaje sea orgánica: los gestos básicos son descubribles por instinto y los avanzados se revelan progresivamente.

### 10.2 Catálogo Completo de Gestos

---

#### GESTO 1: La Chuleta / Pista Rápida (ちょっとヒント)

| Atributo             | Especificación                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------- |
| **Trigger**          | Toque rápido (tap) sobre un kanji o palabra compuesta                                       |
| **Duración del tap** | < 300ms                                                                                     |
| **Resultado**        | Muestra el furigana (lectura en hiragana) encima del kanji tocado                           |
| **Duración visible** | 5 segundos, luego fade-out (300ms)                                                          |
| **Cierre manual**    | Toque rápido en cualquier parte del texto                                                   |
| **Feedback visual**  | Kanji objetivo pulsa brevemente (scale 1→1.05→1, 200ms)                                     |
| **Feedback háptico** | Vibración ultra-corta (10ms) si dispositivo lo soporta                                      |
| **Zona de toque**    | Hitbox expandida: +8px en cada dirección del kanji para facilitar el toque en textos densos |
| **Conflictos**       | No se activa si el usuario está en medio de un scroll vertical                              |

**Comportamiento detallado:**

```
t=0ms     → Usuario toca el kanji 食 (comer)
t=0-50ms  → Detección del tap (distinguir de scroll, long-press o multi-tap)
t=50ms    → Feedback háptico + kanji pulsa (scale animation)
t=100ms   → Furigana "た" aparece encima con fade-in (opacity 0→1, 200ms)
           → El espacio para furigana ya está PRE-RESERVADO (sin salto de UI)
t=300ms   → Furigana completamente visible
t=5000ms  → Timer de auto-ocultación comienza
t=5000-5300ms → Furigana hace fade-out (opacity 1→0, 300ms)
t=5300ms  → Furigana oculto; UI regresa al estado original
```

---

#### GESTO 2: La Chuleta Global (みんなのヒント)

| Atributo             | Especificación                                                                                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Trigger**          | Triple toque rápido (3 taps en < 600ms) en cualquier parte del área de texto                                                                                     |
| **Resultado**        | Muestra furigana de TODOS los kanji en la historia/texto actual                                                                                                  |
| **Duración visible** | 60 segundos (1 minuto), luego fade-out global                                                                                                                    |
| **Cierre manual**    | Triple toque rápido nuevamente                                                                                                                                   |
| **Feedback visual**  | Onda de revelación: los furigana aparecen en cascada desde el kanji más cercano al punto de toque, expandiéndose como una onda (~50ms de delay entre cada kanji) |
| **Indicador**        | Badge flotante en esquina superior: "Furigana: ON" con countdown visual (barra que se vacía en 60s)                                                              |

**Comportamiento detallado:**

```
t=0ms     → Primer tap detectado
t=200ms   → Segundo tap detectado (< 200ms desde el primero)
t=400ms   → Tercer tap detectado → Triple-tap confirmado
t=400ms   → Badge "Furigana: ON" aparece con slide-in desde arriba
t=400-800ms → Onda de revelación de furigana (cascada desde punto de toque)
t=800ms   → Todos los furigana visibles
t=60000ms → Timer expira → Badge muestra "Ocultando..."
t=60000-60500ms → Furigana desaparecen con fade-out en cascada inversa
t=60500ms → Badge desaparece

CIERRE MANUAL:
t=X       → Usuario hace triple-tap de nuevo
t=X+400ms → Triple-tap confirmado → Fade-out inmediato de todos los furigana (500ms)
```

---

#### GESTO 3: El Rayo X / X-Ray (レントゲン)

| Atributo                | Especificación                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Trigger**             | Mantener pulsado (long-press) sobre un kanji o palabra compuesta                                                    |
| **Duración del press**  | ≥ 500ms (tiempo intuitivo)                                                                                          |
| **Feedback a 300ms**    | Feedback háptico intermedio + efecto visual de "carga" (círculo radial que se llena alrededor del punto de presión) |
| **Resultado a 500ms**   | Aparece el Panel de Traducción con significado/traducción del kanji/palabra                                         |
| **Cierre**              | Toque/click fuera del Panel de Traducción                                                                           |
| **Contenido del Panel** | Furigana + Traducción al español + Descomposición de kanji (si es compuesto)                                        |

**Comportamiento detallado:**

```
t=0ms     → Usuario comienza a presionar el kanji 電車 (tren eléctrico)
t=0-300ms → Sistema espera para confirmar que es long-press (no tap)
t=300ms   → Feedback háptico suave + efecto visual de "carga":
             Un círculo radial se dibuja alrededor del punto de presión
             (progreso visual de 0% a 100% en los próximos 200ms)
t=500ms   → Long-press confirmado:
             1. El kanji/compuesto se resalta con background de selección
             2. El Panel de Traducción emerge desde abajo (slide-up + fade-in)
             3. Contenido del panel:
                ┌─────────────────────────────────┐
                │  電車                            │
                │  でんしゃ (densha)               │
                │  ─────────────────────────────  │
                │  🔤 Tren eléctrico / Tren       │
                │                                 │
                │  📝 Descomposición:              │
                │  電 (でん) = electricidad        │
                │  車 (しゃ) = vehículo           │
                │                                 │
                │  ← Para repasar  Aprendido →    │
                └─────────────────────────────────┘

t=X       → Usuario toca fuera del panel → Panel hace slide-down + fade-out (300ms)
```

---

#### GESTO 4: Subrayado X-Ray / X-Ray Scan (スキャン)

| Atributo                                  | Especificación                                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Trigger**                               | Mantener pulsado + deslizar horizontalmente sobre el texto                                                          |
| **Resultado**                             | Efecto visual de "subrayado/escáner" que sigue el dedo; al soltar, muestra traducción de todo el texto seleccionado |
| **Feedback visual durante deslizamiento** | Línea de highlight semi-transparente con color de acento del nivel actual                                           |
| **Feedback háptico**                      | Pulso suave cada vez que un nuevo kanji entra en la selección                                                       |
| **Cierre**                                | Toque/click fuera del Panel de Traducción                                                                           |

**Comportamiento detallado:**

```
t=0ms     → Long-press detectado (misma mecánica que Rayo X)
t=500ms   → En lugar de soltar, el usuario comienza a deslizar
t=500ms+  → MODO SCAN ACTIVADO:
             1. El kanji inicial se resalta
             2. Al deslizar, cada kanji que el dedo "toca" se añade a la selección
             3. Efecto visual: highlight con gradiente que sigue el dedo
             4. Vibración háptica sutil con cada nuevo kanji seleccionado

t=release → Usuario levanta el dedo:
             1. La selección se "congela"
             2. Panel de Traducción emerge con la traducción del bloque completo
             3. Contenido del panel incluye:
                - Texto seleccionado con furigana
                - Traducción completa de la frase/bloque
                - Lista de kanji individuales (tocables para Zoom Kanji)
```

---

#### GESTO 5: Zoom Kanji (ズームイン) — Dentro del Panel de Traducción

| Atributo        | Especificación                                                                   |
| --------------- | -------------------------------------------------------------------------------- |
| **Contexto**    | Solo funciona DENTRO del Panel de Traducción                                     |
| **Trigger**     | Toque rápido sobre un kanji específico dentro del Panel                          |
| **Resultado**   | Reemplaza el contenido del Panel con la ficha detallada de ese kanji individual  |
| **Auto-cierre** | 10 segundos o toque rápido en cualquier parte del Panel                          |
| **Regreso**     | Al cerrarse, el Panel regresa a su contenido anterior (la traducción del bloque) |

**Contenido del Zoom Kanji:**

```
┌─────────────────────────────────────────┐
│            ┌───────────┐                │
│            │           │                │
│            │    電     │  ← Kanji gran  │
│            │           │     tamaño     │
│            └───────────┘                │
│                                         │
│  でん (den) / デン                       │
│  ────────────────────────────           │
│  ⚡ Electricidad, relámpago              │
│                                         │
│  音読み (on'yomi): デン                  │
│  訓読み (kun'yomi): いなずま             │
│                                         │
│  Compuestos comunes:                    │
│  電車 (でんしゃ) — tren                  │
│  電話 (でんわ) — teléfono               │
│  電気 (でんき) — electricidad            │
│                                         │
│  ← Para repasar          Aprendido →   │
│                                         │
│  [Auto-cierre en 8s...]                 │
└─────────────────────────────────────────┘
```

---

#### GESTO 6: Marcar como Aprendido (覚えた！)

| Atributo                     | Especificación                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Contexto**                 | Dentro del Panel de Traducción                                                                                                       |
| **Trigger**                  | Drag & Drop del kanji hacia la DERECHA                                                                                               |
| **Distancia mínima**         | 80px de desplazamiento horizontal                                                                                                    |
| **Feedback durante drag**    | El kanji se desplaza con el dedo; fondo se tiñe de verde progresivamente; ícono ✓ crece en opacidad                                  |
| **Feedback de confirmación** | Animación de éxito (varía por nivel); kanji se marca como "Aprendido" en la BD                                                       |
| **Umbral visual**            | A los 40px, el fondo comienza a teñirse; a los 80px, se confirma; si suelta antes de 80px, el kanji regresa a su posición con bounce |

---

#### GESTO 7: Marcar para Repasar (もう一回！)

| Atributo                     | Especificación                                                                         |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| **Contexto**                 | Dentro del Panel de Traducción                                                         |
| **Trigger**                  | Drag & Drop del kanji hacia la IZQUIERDA                                               |
| **Distancia mínima**         | 80px de desplazamiento horizontal                                                      |
| **Feedback durante drag**    | El kanji se desplaza; fondo se tiñe de ámbar/naranja progresivamente; ícono 🔄 aparece |
| **Feedback de confirmación** | Animación de bookmark; kanji se añade a la cola de repaso del SRS con prioridad alta   |
| **Umbral visual**            | Misma mecánica que "Aprendido" pero en dirección opuesta                               |

---

### 10.3 Jerarquía de Gestos y Resolución de Conflictos

```
PRIORIDAD DE DETECCIÓN (de mayor a menor):

1. SCROLL VERTICAL
   → Si el dedo se mueve >10px verticalmente en los primeros 100ms → es scroll
   → Se cancela cualquier otro gesto potencial

2. TRIPLE TAP
   → Si se detectan 3 taps en <600ms → Chuleta Global
   → Override sobre tap individual

3. LONG-PRESS + DRAG (Subrayado X-Ray)
   → Si long-press alcanza 500ms Y luego hay movimiento horizontal → Scan
   → Override sobre Rayo X simple

4. LONG-PRESS (Rayo X)
   → Si long-press alcanza 500ms Y NO hay movimiento → Mostrar traducción

5. TAP INDIVIDUAL (Chuleta)
   → Si tap < 300ms Y no es parte de triple-tap → Mostrar furigana

ZONA MUERTA:
  → Movimientos < 5px no se consideran "movimiento" (evita jitter del dedo)
  → Taps entre 300-500ms son "tierra de nadie" — no activan nada (evita falsos positivos)
```

### 10.4 Onboarding de Gestos

Los gestos se enseñan **progresivamente**, no todos de golpe:

| Sesión                     | Gesto Enseñado              | Método                                                                                       |
| -------------------------- | --------------------------- | -------------------------------------------------------------------------------------------- |
| **Primera historia**       | Chuleta (tap)               | Tooltip animado sobre el primer kanji: "¡Toca para ver cómo se lee!"                         |
| **Segunda historia**       | Rayo X (long-press)         | Tooltip: "Mantén pulsado para ver qué significa"                                             |
| **Tercera historia**       | Swipe aprendido/repasar     | Tooltip dentro del Panel: "Desliza a la derecha si ya lo sabes, a la izquierda para repasar" |
| **Quinta historia**        | Chuleta Global (triple-tap) | Tooltip: "¿Muchos kanji desconocidos? ¡Triple toque para ver todos!"                         |
| **Décima historia**        | Subrayado X-Ray             | Tooltip: "Mantén pulsado y desliza para traducir frases completas"                           |
| **En Panel de Traducción** | Zoom Kanji                  | Tooltip: "Toca un kanji aquí para verlo en detalle"                                          |

Cada tooltip aparece solo 1 vez. Si el usuario ya usó el gesto antes de que aparezca el tooltip, este se omite (detección automática).

### 10.5 Accesibilidad de Gestos

| Consideración                        | Solución                                                                                             |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Usuarios con dificultad motriz**   | Botones alternativos en el menú contextual: "Ver lectura", "Ver significado", "Marcar aprendido"     |
| **Usuarios que no descubren gestos** | Sección "Gestos" en Preferencias con animaciones explicativas                                        |
| **Dispositivos sin háptica**         | Feedback visual aumentado (animaciones más prominentes) como sustituto                               |
| **Desktop (sin touch)**              | Click = tap, Right-click o Ctrl+Click = long-press, Click+drag = scan, Triple-click = Chuleta Global |

# KamiJi PRD — Parte 3.2: Principios UX y Sistema Anti-Flashing

---

## 11. Principios UX

### 11.1 Los 7 Mandamientos UX de KamiJi

#### 1. Optimistic UI (UI Optimista)

> Toda acción del usuario se refleja **inmediatamente** en la interfaz, antes de que el servidor confirme.

| Acción                      | Respuesta Optimista                                      | Si falla el servidor                                                       |
| --------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------- |
| Marcar kanji como aprendido | ✓ aparece inmediatamente; kanji se actualiza en la vista | Revertir silenciosamente; mostrar toast: "No se pudo guardar. Reintentar." |
| Marcar para repasar         | Bookmark aparece inmediatamente                          | Revertir + toast                                                           |
| Cambiar de historia         | Transición inmediata; contenido aparece (o skeleton)     | Mostrar contenido cacheado o mensaje offline                               |
| Guardar preferencias        | Toggle cambia inmediatamente                             | Revertir toggle + toast: "No se guardaron los cambios"                     |

#### 2. Cero Fricción

> El camino entre "quiero hacer X" y "ya hice X" tiene el mínimo número de pasos posible.

| Antes (fricción)                                                  | Después (KamiJi)                                         |
| ----------------------------------------------------------------- | -------------------------------------------------------- |
| Abrir app → buscar kanji → buscar en diccionario externo → volver | Tocar el kanji → ver significado inmediatamente          |
| Abrir app → buscar repaso → configurar sesión → empezar           | Abrir app → la sesión de repaso está lista desde el Home |
| Marcar kanji → abrir menú → seleccionar estado → confirmar        | Deslizar a la derecha = aprendido. Un gesto, cero menús. |

#### 3. Feedback Inmediato

> Cada acción tiene una respuesta visual en < 100ms. Nunca dejar al usuario preguntándose "¿Funcionó?"

- **Toque**: Respuesta visual inmediata (ripple, scale, color change)
- **Carga**: Skeleton screens, nunca spinners vacíos
- **Error**: Mensaje claro con acción sugerida, nunca pantalla en blanco
- **Éxito**: Animación proporcional a la importancia de la acción

#### 4. Progreso Visible

> El usuario siempre sabe exactamente **dónde está** y **cuánto le falta**.

- **Barra de progreso global**: Siempre visible en la navegación principal — muestra % del nivel actual completado
- **Progreso por historia**: Indicador de kanji nuevos vs. conocidos dentro de cada texto
- **Contadores**: Kanji aprendidos hoy / esta semana / total
- **Meta visual**: El próximo hito siempre visible (ej: "12 kanji más para tu siguiente logro")

#### 5. Minimalismo Funcional

> Mostrar solo lo necesario, cuando es necesario. No abrumar.

| Principio                  | Implementación                                                                |
| -------------------------- | ----------------------------------------------------------------------------- |
| **Progressive Disclosure** | Los gestos avanzados se enseñan gradualmente, no todos de golpe               |
| **Context-Aware UI**       | Los botones de acción solo aparecen cuando son relevantes                     |
| **Clean Reading View**     | El área de lectura prioriza el texto; la UI se "retira" durante la lectura    |
| **No Feature Creep**       | Cada feature en V1 pasa el test: "¿Esto ayuda directamente a aprender kanji?" |

#### 6. Recompensa Visual (Serotonina por Diseño)

> Cada logro, por pequeño que sea, recibe reconocimiento visual que refuerza el comportamiento.

| Tipo de Recompensa   | Cuándo                                    | Intensidad                                                          |
| -------------------- | ----------------------------------------- | ------------------------------------------------------------------- |
| **Micro-recompensa** | Marcar un kanji como aprendido            | Baja: ✓ animado, partículas mínimas                                 |
| **Recompensa menor** | Completar una historia                    | Media: Animación de 1-2 segundos, barra de progreso pulsa           |
| **Recompensa media** | Racha de 7 días                           | Media-Alta: Animación especial del número de racha, badge nuevo     |
| **Recompensa mayor** | Completar todos los kanji de un sub-grupo | Alta: Animación elaborada, unlock de logro con título               |
| **Recompensa épica** | Subir de nivel JLPT (Metamorfosis)        | Máxima: Ceremonia de 4-5 segundos, transformación completa de la UI |

**Principio de variabilidad**: Las animaciones de micro-recompensa varían ligeramente cada vez (rotación aleatoria de partículas, colores ligeramente diferentes) para evitar habituación y mantener el efecto de novedad — basado en el principio de Recompensas Variables de B.F. Skinner.

#### 7. Estados de Error Amigables

> Los errores no son el fin del mundo. Son oportunidades de demostrar empatía.

**Tono de voz**: Amigable, casual pero respetuoso. Nunca culpar al usuario. Siempre ofrecer una acción concreta.

| Situación                   | Mensaje                                                                                                                   | Acción                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **Sin internet**            | "¡Ups! Parece que no tienes conexión. Intentémoslo de nuevo cuando haya conexión, ¿sí? 📶"                                | Botón: "Reintentar" + modo offline automático    |
| **IA rate limit (minutos)** | "¡Uy! La IA necesita un respiro 😅 Prueba de nuevo en unos segundos"                                                      | Timer visible de espera + fallback a diccionario |
| **IA rate limit (diario)**  | "Has usado mucha IA hoy — ¡genial que estudias tanto! 🎉 El límite diario se alcanzó, pero la Chuleta funciona sin IA 💪" | Desactivar IA; habilitar modo diccionario-only   |
| **API Key inválida**        | "Tu clave de Gemini parece no funcionar 🔑 Revísala en Preferencias"                                                      | Link directo a Preferencias → API Key            |
| **Respuesta IA rota**       | "La IA respondió algo raro 🤔 Usando diccionarios como respaldo"                                                          | Fallback silencioso; log para debugging          |
| **Error genérico**          | "Algo salió mal por aquí 🙈 Inténtalo de nuevo en un minutito"                                                            | Botón: "Reintentar"                              |
| **Historia no cargada**     | "Esta historia se nos escapó 📖 ¿Probamos otra mientras tanto?"                                                           | Sugerir historia alternativa                     |
| **Primera vez sin API Key** | "Para las traducciones con IA, necesitas una clave de Gemini (¡es gratis!) 🆓"                                            | Tutorial paso a paso para obtener API Key        |

---

## 12. Sistema Anti-Flashing y Estabilidad Visual

### 12.1 El Problema

La aparición/desaparición de furigana, paneles de traducción y animaciones puede causar:

- **Layout Shift**: El contenido "salta" cuando aparece furigana encima de un kanji
- **Flashing**: Parpadeos visuales durante transiciones rápidas
- **Jank**: Animaciones entrecortadas que rompen la sensación de fluidez
- **Overflow**: Contenido que se desborda de su contenedor durante gestos

### 12.2 Estrategias Anti-Flashing

#### A. Espacio Pre-Reservado para Furigana

```css
/* ESTRATEGIA CORE: El espacio para furigana SIEMPRE está reservado,
   incluso cuando el furigana está oculto. Esto elimina el layout shift. */

.kanji-text {
  /* Usar ruby para estructura semántica */
  ruby-position: over;
}

.kanji-text ruby {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  /* CRÍTICO: min-height incluye espacio para furigana */
  min-height: calc(1em + var(--furigana-height));
}

.kanji-text ruby rt {
  /* Furigana ocupa espacio pero es invisible por defecto */
  visibility: hidden;
  height: var(--furigana-height);
  line-height: var(--furigana-height);
  font-size: var(--furigana-size);
}

.kanji-text ruby rt.visible {
  visibility: visible;
  /* Animación que NO causa reflow */
  animation: furigana-reveal var(--reveal-duration) ease-out;
}

@keyframes furigana-reveal {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Variables por nivel */
:root[data-level="n5"] {
  --furigana-height: 14px;
  --furigana-size: 0.45em;
  --reveal-duration: 300ms;
}

:root[data-level="n4"] {
  --furigana-height: 12px;
  --furigana-size: 0.42em;
  --reveal-duration: 250ms;
}
/* ... etc para cada nivel */
```

#### B. Panel de Traducción como Overlay (No Inline)

```css
/* El Panel de Traducción NUNCA empuja el contenido de lectura.
   Se posiciona como overlay absoluto/fixed. */

.translation-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 50vh; /* Nunca cubre más de la mitad de la pantalla */
  z-index: 100;

  /* Animación de entrada que no causa reflow */
  transform: translateY(100%);
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Backdrop blur para que el contenido detrás sea legible */
  backdrop-filter: blur(8px);

  /* Prevenir scroll del body cuando el panel está abierto */
  overscroll-behavior: contain;
}

.translation-panel.open {
  transform: translateY(0);
}

/* En desktop N2/N1: Panel como sidebar en lugar de bottom sheet */
@media (min-width: 1024px) {
  :root[data-level="n2"] .translation-panel,
  :root[data-level="n1"] .translation-panel {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    left: auto;
    max-height: 100vh;
    width: 360px;
    transform: translateX(100%);
  }

  :root[data-level="n2"] .translation-panel.open,
  :root[data-level="n1"] .translation-panel.open {
    transform: translateX(0);
  }
}
```

#### C. Optimización de Animaciones

```css
/* Todas las animaciones usan GPU-accelerated properties ÚNICAMENTE */
/* PERMITIDO: transform, opacity, filter */
/* PROHIBIDO: width, height, top, left, margin, padding, font-size */

.animate-gpu {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force GPU layer */
}

/* Reducir animaciones si el usuario lo prefiere */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### D. Skeleton Screens (No Spinners)

```
CARGANDO UNA HISTORIA:

┌────────────────────────────────────────┐
│  ████████████████████  ← Título       │
│  ████████  ← Metadatos               │
│                                        │
│  ██████████████████████████████████    │
│  ████████████████████████             │
│  ████████████████████████████         │
│  ████████████████████████████████████ │
│  ██████████████████████████████       │
│                                        │
│  ████████████████████████████████████ │
│  ████████████████████████████         │
│  ████████████████████████████████     │
└────────────────────────────────────────┘

Los bloques skeleton tienen:
- Animación de "shimmer" (gradiente que se desplaza horizontalmente)
- Proporciones que coinciden con el contenido real
- Color: var(--bg-secondary) para el bloque, gradiente highlight más claro
- Duración del shimmer: 1.5s por ciclo
```

#### E. Debounce y Throttle de Gestos

```typescript
// Configuración de debounce/throttle para cada gesto
const GESTURE_CONFIG = {
  tap: {
    maxDuration: 300, // ms — un tap más largo no cuenta
    debounce: 50, // ms — evitar doble-tap accidental
    scrollThreshold: 10, // px — si hay scroll > 10px, cancelar tap
  },
  tripleTap: {
    windowDuration: 600, // ms — los 3 taps deben ocurrir en esta ventana
    minInterval: 50, // ms — intervalo mínimo entre taps (anti-bounce)
  },
  longPress: {
    activationTime: 500, // ms — tiempo para activar long-press
    feedbackTime: 300, // ms — feedback visual intermedio
    moveThreshold: 5, // px — movimiento > 5px = cancelar long-press
  },
  scan: {
    activateAfter: "longPress", // Se activa solo después de long-press confirmado
    hitboxExpansion: 8, // px — expansión del hitbox de cada kanji
    hapticInterval: 1, // Cada N kanji nuevos, vibrar
  },
  swipe: {
    minDistance: 80, // px — distancia mínima para confirmar swipe
    maxVertical: 40, // px — si el vertical > 40px, es scroll, no swipe
    velocityThreshold: 0.3, // px/ms — velocidad mínima para swipe rápido
  },
};
```

### 12.3 Testing de Estabilidad Visual

| Métrica                                          | Objetivo | Herramienta              |
| ------------------------------------------------ | -------- | ------------------------ |
| **Cumulative Layout Shift (CLS)**                | < 0.05   | Lighthouse, Web Vitals   |
| **Interaction to Next Paint (INP)**              | < 100ms  | Chrome DevTools          |
| **First Contentful Paint (FCP)**                 | < 1.5s   | Lighthouse               |
| **Largest Contentful Paint (LCP)**               | < 2.5s   | Lighthouse               |
| **Frames por segundo (FPS)** durante animaciones | ≥ 58fps  | Chrome Performance Panel |
| **Reflow count** por gesto                       | 0        | Chrome Performance Panel |

# KamiJi PRD — Parte 4.0: Pantallas de UI — Onboarding y Home

---

## 13. Mapa de Pantallas

### 13.1 Inventario de Pantallas V1

```
FLUJO DE ONBOARDING:
  ┌─────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
  │ Splash  │ → │ Welcome  │ → │ Sign In  │ → │ Setup    │ → │ Donation │
  │ Screen  │   │ Screen   │   │ Google   │   │ Profile  │   │ Ask      │
  └─────────┘   └──────────┘   └──────────┘   └──────────┘   └──────────┘
                                                    │                │
                                               NickName             │
                                               API Key              │
                                               Nivel JLPT           │
                                                    │                │
                                                    └───────┬────────┘
                                                            ↓
                                                    ┌──────────┐
                                                    │  Home    │
                                                    │  Screen  │
                                                    └──────────┘

FLUJO PRINCIPAL:
  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
  │  Home    │ ↔ │ Reading  │ ↔ │ Review   │ ↔ │ Progress │
  │          │   │ (Story)  │   │ (SRS)    │   │ (Stats)  │
  └──────────┘   └──────────┘   └──────────┘   └──────────┘
       │
       ↓
  ┌──────────┐
  │ Settings │
  │ (Prefs)  │
  └──────────┘
```

---

### 13.2 Pantalla: Splash Screen

**Duración**: 1.5-2 segundos (o hasta que los datos mínimos carguen)

**Contenido**:

- Logo de KamiJi centrado: el kanji 神字 con animación de trazo de pincel
- Debajo: "KamiJi" en la tipografía del nivel actual del usuario (o Nunito si es primera vez)
- Subtítulo sutil: "Caracteres Divinos"
- Fondo: Color primario del nivel actual (o crema cálido si primera vez)
- Sin barra de carga visible — el contenido simplemente se revela cuando está listo

**Animación**:

```
t=0ms      → Fondo del nivel actual aparece
t=200ms    → Kanji 神 se traza con animación de pincel (stroke-dasharray)
t=600ms    → Kanji 字 se traza
t=1000ms   → "KamiJi" fade-in debajo
t=1200ms   → "Caracteres Divinos" fade-in
t=1500ms   → Transición a la siguiente pantalla (fade + scale out)
```

---

### 13.3 Pantalla: Welcome Screen (Solo primera vez)

**Propósito**: Dar la bienvenida, comunicar la propuesta de valor, emocionar.

**Contenido** (carrusel de 3 slides con swipe horizontal):

**Slide 1: "Aprende a leer japonés"**

- Ilustración: Un libro japonés abierto con kanji que "cobran vida" (animación sutil)
- Texto: "Domina los kanji leyendo historias reales, no memorizando fichas."
- Subtexto: "Desde cuentos infantiles hasta literatura clásica."

**Slide 2: "La app que crece contigo"**

- Ilustración: 5 iconos representando los niveles N5→N1 con una flecha de progresión
- Texto: "Cada nivel transforma toda la experiencia. Tu app evoluciona cuando tú evolucionas."
- Subtexto: "5 mundos visuales únicos te esperan."

**Slide 3: "Solo necesitas un toque"**

- Ilustración: Mano tocando un kanji → furigana apareciendo
- Texto: "Toca para la lectura. Mantén pulsado para el significado. Así de fácil."
- Subtexto: "Diseñado para hispanos, en español."

**Navegación**: Dots de paginación + botón "Comenzar" en el último slide. Se puede omitir con "Saltar" en la esquina superior.

---

### 13.4 Pantalla: Sign In con Google

**Propósito**: Autenticación con mínima fricción.

**Contenido**:

- Logo KamiJi en la parte superior
- Texto: "Inicia sesión para guardar tu progreso en la nube"
- Botón prominente: "Continuar con Google" (estilo oficial de Google Sign-In)
- Texto legal mínimo: "Al continuar, aceptas los Términos de Uso y la Política de Privacidad"
- Nota: "Tus datos nunca se compartirán con terceros"

**Flujo técnico**:

```
1. Usuario toca "Continuar con Google"
2. Firebase Auth popup/redirect se abre
3. Usuario selecciona cuenta Google
4. Auth completa → redirect a Setup Profile
5. Si el usuario ya tiene cuenta → redirect a Home (skip setup)
```

---

### 13.5 Pantalla: Setup Profile (Solo primera vez)

**Propósito**: Recopilar datos mínimos necesarios para personalizar la experiencia.

**Diseño**: Wizard de 3 pasos con progress indicator en la parte superior.

#### Paso 1: NickName

- Input field con placeholder: "¿Cómo te gusta que te llamen?"
- Validación: 2-20 caracteres, letras/números/emojis
- Debajo: "Este nombre se mostrará en tu perfil y logros"
- Animación: Kami-chan saluda y dice en tooltip: "¡Hola! ¿Cómo te llamas? 🦊"
- Verificación de kana: Texto pequeño con un hiragana simple: "¿Puedes leer esto? → かんじ" — si el usuario toca "No estoy seguro", se muestra un mensaje amable sugiriendo aprender kana primero con links a recursos, pero NO se bloquea el acceso

#### Paso 2: Gemini API Key

- Input field de tipo password con toggle de visibilidad
- Texto explicativo: "Para las traducciones con IA, necesitas una clave de Gemini"
- CTA prominente: "Obtener API Key gratis →" (abre Google AI Studio en nueva tab)
- Tutorial colapsable de 4 pasos con capturas:
  1. "Ve a Google AI Studio (aistudio.google.com)"
  2. "Inicia sesión con tu cuenta de Google"
  3. "Haz click en 'Get API Key' → 'Create API Key'"
  4. "Copia la clave y pégala aquí"
- Opción: "Configurar después" (la app funciona con diccionarios offline; las features de IA quedan deshabilitadas hasta que se añada la key)
- Nota de seguridad: "🔒 Tu clave se guarda cifrada. Nunca la compartimos."

#### Paso 3: Selección de Nivel Inicial

- 5 cards visuales, una por cada nivel JLPT, con:
  - Nombre del nivel (N5: El Parvulario, N4: La Escuela, etc.)
  - Icono/ilustración representativa del nivel
  - Descripción breve (2-3 líneas):
    - **N5**: "Empiezo desde cero. No conozco (casi) ningún kanji. Quiero aprender los ~100 más básicos para sobrevivir."
    - **N4**: "Ya conozco los kanji más básicos (~100). Quiero poder leer textos simples del día a día."
    - **N3**: "Tengo una base sólida (~300 kanji). Quiero entender textos reales y conversaciones."
    - **N2**: "Soy intermedio-avanzado (~650 kanji). Quiero leer artículos y documentos profesionales."
    - **N1**: "Soy avanzado (~1000+ kanji). Quiero dominar los textos más complejos del japonés."
  - Kanji de ejemplo del nivel
- Card seleccionada tiene borde/glow del color de acento del nivel correspondiente
- Recomendación: "¿No estás seguro? Empieza con N5. Siempre podrás avanzar más rápido si ya conoces kanji."

---

### 13.6 Pantalla: Donation Ask (Solo primera vez, tras setup)

**Propósito**: Establecer la relación de apoyo voluntario sin presión.

**Diseño**: Pantalla simple, cálida, breve. Debe sentirse genuina, no como un paywall.

**Contenido**:

- Ilustración de Kami-chan sosteniendo una taza de café
- Texto principal: "¡Todo listo! 🎉"
- Texto secundario: "Si te gusta esta aplicación y quieres apoyarme a seguir mejorándola, puedes invitarme una taza de café cuando gustes en el menú de Preferencias ☕"
- Botón primario: "¡Empezar a aprender!" (lleva al Home)
- Link discreto: "Invitar un café ahora →" (abre link de donación)

**Timing**: Esta pantalla aparece una sola vez. No se repite jamás. El usuario puede ignorarla completamente.

---

### 13.7 Pantalla: Home Screen

**Propósito**: Centro de mando del usuario. Desde aquí accede a todo.

**Estructura (Móvil)**:

```
┌────────────────────────────────────────┐
│  Buenos días, {NickName} 🦊            │
│  N5 · El Parvulario                    │
│  ████████████░░░░░░░░ 62% (64/103)     │
├────────────────────────────────────────┤
│                                        │
│  📖 Continuar Leyendo                  │
│  ┌──────────────────────────────────┐  │
│  │ "El gato y la lluvia" ☔         │  │
│  │  Progreso: 3/5 páginas          │  │
│  │  4 kanji nuevos                  │  │
│  └──────────────────────────────────┘  │
│                                        │
│  🔄 Repaso del Día                     │
│  ┌──────────────────────────────────┐  │
│  │  12 kanji listos para repasar   │  │
│  │  Tiempo estimado: ~5 min        │  │
│  │  [Empezar repaso]               │  │
│  └──────────────────────────────────┘  │
│                                        │
│  📚 Historias Disponibles              │
│  ┌──────┐ ┌──────┐ ┌──────┐           │
│  │ 🌸   │ │ 🏠   │ │ 🍱   │          │
│  │Sakura│ │Casa  │ │Bento │           │
│  │ ✓    │ │ ●●○  │ │ NEW  │           │
│  └──────┘ └──────┘ └──────┘           │
│                                        │
│  🏆 Logros Recientes                   │
│  "Primer Paso" — 10 kanji aprendidos   │
│                                        │
├────────────────────────────────────────┤
│  🏠      📖      🔄      📊      ⚙   │
│  Home   Leer   Repaso   Stats   Prefs  │
└────────────────────────────────────────┘
```

**Comportamiento adaptativo**:

- **Si hay repaso pendiente**: La card de repaso tiene badge pulsante y se posiciona primera
- **Si no hay historias nuevas**: Muestra sugerencia "¿Has considerado repasar los kanji de la semana?"
- **Si la racha está en riesgo** (no ha estudiado hoy): Banner sutil: "¡Tu racha de {X} días corre peligro! 🔥"
- **Saludo contextual**: "Buenos días/tardes/noches" según hora local
- **Si no hay API Key configurada**: Banner discreto recordando configurarla

**Navegación inferior (Tab Bar)**:
| Tab | Ícono | Pantalla |
|---|---|---|
| Home | 🏠 | Home Screen |
| Leer | 📖 | Lista de Historias |
| Repaso | 🔄 | Sesión de Repaso SRS |
| Stats | 📊 | Pantalla de Progreso |
| Prefs | ⚙ | Preferencias |

# KamiJi PRD — Parte 4.1: Pantallas de UI — Lectura, Repaso y Progreso

---

## 13.8 Pantalla: Lista de Historias (📖 Leer)

**Propósito**: Catálogo de contenido de lectura disponible para el nivel actual.

**Estructura (Móvil)**:

```
┌────────────────────────────────────────┐
│  📖 Historias · N5                     │
│  ┌─ Filtros ─────────────────────────┐ │
│  │ [Todas] [En progreso] [Nuevas]    │ │
│  │ [Completadas]                     │ │
│  └───────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  🌸 La primavera de Sakura       │  │
│  │  ★★☆ · 8 min · 12 kanji nuevos  │  │
│  │  "Un cuento sobre una niña..."   │  │
│  │  ████████░░ 80%                  │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  🏠 Mi casa, mi familia          │  │
│  │  ★☆☆ · 5 min · 8 kanji nuevos   │  │
│  │  "Descripción de una casa..."    │  │
│  │  NEW ✨                          │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  🍱 Comida japonesa              │  │
│  │  ★★★ · 12 min · 18 kanji nuevos │  │
│  │  "Descubre los platos típicos.." │  │
│  │  🔒 Desbloquea con 50 kanji      │  │
│  └──────────────────────────────────┘  │
│                                        │
├────────────────────────────────────────┤
│  🏠      📖      🔄      📊      ⚙   │
└────────────────────────────────────────┘
```

**Atributos de cada Historia Card**:

| Campo           | Descripción                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------- |
| Título          | Nombre de la historia (bilingüe: japonés + español)                                         |
| Dificultad      | ★☆☆ (fácil), ★★☆ (medio), ★★★ (difícil) dentro del nivel                                    |
| Tiempo estimado | Basado en longitud + velocidad media del usuario                                            |
| Kanji nuevos    | Cantidad de kanji que el usuario no ha marcado como "aprendidos"                            |
| Progreso        | Barra si está en progreso; "NEW" si no iniciada; "✓" si completada                          |
| Desbloqueo      | Algunas historias requieren X kanji aprendidos para desbloquearse (progresión motivacional) |
| Icono/Emoji     | Representativo del tema (comida, familia, transporte, etc.)                                 |

**Sistema de Desbloqueo de Historias**:

- Las primeras 3 historias están siempre desbloqueadas
- Las siguientes se desbloquean gradualmente al alcanzar hitos de kanji aprendidos
- Las historias bloqueadas muestran cuántos kanji faltan: "Desbloquea con 50 kanji aprendidos (te faltan 8)"
- Esto evita que el usuario se salte historias y crea anticipación ("¿qué historia nueva se desbloqueará?")

---

## 13.9 Pantalla: Reading View (Vista de Lectura)

**Propósito**: La pantalla core de la aplicación. Donde el usuario lee historias y aprende kanji.

**Estructura (Móvil)**:

```
┌────────────────────────────────────────┐
│  ← 🌸 La primavera de Sakura   2/5    │
├────────────────────────────────────────┤
│                                        │
│     はる            き                  │
│    春 が来ました。                      │
│                                        │
│               さくら                    │
│    小さい 桜 の木が                     │
│                                        │
│         にわ     さ                     │
│    お庭に咲いています。                 │
│                                        │
│    (Los furigana de arriba solo        │
│     aparecen al tocar cada kanji)      │
│                                        │
│                                        │
│                                        │
│                                        │
│                                        │
│                                        │
├────────────────────────────────────────┤
│  ← Anterior    ●●●●○    Siguiente →   │
├────────────────────────────────────────┤
│  Kanji en esta página: 春 桜 庭 咲     │
│  Conocidos: 2/4  Nuevos: 2/4          │
└────────────────────────────────────────┘
```

**Elementos del Reading View**:

| Elemento           | Comportamiento                                                                        |
| ------------------ | ------------------------------------------------------------------------------------- |
| **Header**         | Título de la historia + indicador de página actual / total; botón back                |
| **Área de texto**  | Texto japonés con kanji interactivos; line-height pre-reservado; padding amplio       |
| **Paginación**     | Dots de paginación + botones Anterior/Siguiente; swipe horizontal para cambiar página |
| **Footer info**    | Resumen de kanji en la página actual: cuántos conoce vs. nuevos                       |
| **Gestos activos** | Todos los gestos del catálogo (tap, triple-tap, long-press, scan, etc.)               |

**Reglas del texto de lectura**:

- **Kanji no aprendidos**: Se muestran en color `--text-kanji` estándar con un sutil dot debajo (●) indicando que es interactivo
- **Kanji aprendidos**: Se muestran en color `--text-primary` sin dot — integrados naturalmente al texto
- **Hiragana/Katakana**: Color `--text-primary`, no interactivos
- **Puntuación japonesa**: 。、！？ etc. en color `--text-secondary`

---

## 13.10 Pantalla: Review Session (🔄 Repaso SRS)

**Propósito**: Sesión de repaso basada en FSRS. El usuario repasa kanji que están cerca de olvidarse.

**Formato**: Cards de repaso estilo flashcard pero con contexto.

**Flujo de Repaso**:

```
┌────────────────────────────────────────┐
│  🔄 Repaso · 7 de 12 restantes        │
│  ████████████████░░░░ 58%              │
├────────────────────────────────────────┤
│                                        │
│                                        │
│                                        │
│              ┌─────────┐               │
│              │         │               │
│              │   食    │               │
│              │         │               │
│              └─────────┘               │
│                                        │
│    "昨日、日本の食べ物を食べました。"    │
│     (Frase de contexto donde aparece)  │
│                                        │
│                                        │
│                                        │
├────────────────────────────────────────┤
│                                        │
│  [Mostrar respuesta]                   │
│                                        │
└────────────────────────────────────────┘

--- Después de tocar "Mostrar respuesta" ---

┌────────────────────────────────────────┐
│  🔄 Repaso · 7 de 12 restantes        │
│  ████████████████░░░░ 58%              │
├────────────────────────────────────────┤
│              ┌─────────┐               │
│              │   食    │               │
│              │  た(べる)│               │
│              │ しょく  │               │
│              └─────────┘               │
│                                        │
│  🔤 Comer / Comida / Alimento         │
│                                        │
│  音: ショク (shoku)                    │
│  訓: た.べる (taberu)                  │
│                                        │
│  "Ayer comí comida japonesa."          │
│                                        │
├────────────────────────────────────────┤
│  ┌────────┐ ┌────────┐ ┌────────┐     │
│  │  😣    │ │  🤔    │ │  😊    │     │
│  │ Otra   │ │ Difícil│ │  Bien  │     │
│  │  vez   │ │        │ │        │     │
│  └────────┘ └────────┘ └────────┘     │
│                    ┌────────┐          │
│                    │  🌟    │          │
│                    │ Fácil  │          │
│                    └────────┘          │
└────────────────────────────────────────┘
```

**Botones de respuesta (alimentan el FSRS)**:

| Botón           | Significado                    | Efecto en FSRS                                       |
| --------------- | ------------------------------ | ---------------------------------------------------- |
| **😣 Otra vez** | No lo recordé en absoluto      | Reset; se mostrará de nuevo esta sesión y muy pronto |
| **🤔 Difícil**  | Lo recordé con mucho esfuerzo  | Intervalo corto; se revisará pronto                  |
| **😊 Bien**     | Lo recordé correctamente       | Intervalo estándar según FSRS                        |
| **🌟 Fácil**    | Lo sé perfectamente, sin dudar | Intervalo largo; confianza alta                      |

**Al completar la sesión de repaso**:

```
┌────────────────────────────────────────┐
│                                        │
│          🎉 ¡Repaso completado!        │
│                                        │
│          12/12 kanji repasados         │
│          Tiempo: 4 min 32 seg          │
│                                        │
│          Resultados:                   │
│          🌟 Fácil: 5                   │
│          😊 Bien: 4                    │
│          🤔 Difícil: 2                 │
│          😣 Otra vez: 1               │
│                                        │
│          Retención: 75%                │
│                                        │
│          Próximo repaso:               │
│          3 kanji mañana                │
│          9 kanji en 3 días             │
│                                        │
│          [Volver al Home]              │
│                                        │
└────────────────────────────────────────┘
```

---

## 13.11 Pantalla: Progress / Stats (📊 Estadísticas)

**Propósito**: Mostrar el progreso del usuario de forma visual, motivante y detallada.

**Estructura (Móvil)**:

```
┌────────────────────────────────────────┐
│  📊 Tu Progreso                        │
├────────────────────────────────────────┤
│                                        │
│  NIVEL ACTUAL: N5 · El Parvulario      │
│  ████████████░░░░░░░░ 62%              │
│  64 de 103 kanji aprendidos            │
│  39 kanji restantes para N4            │
│                                        │
│  ──────────────────────────────        │
│                                        │
│  📅 Esta Semana                        │
│  ┌──┬──┬──┬──┬──┬──┬──┐               │
│  │L │M │X │J │V │S │D │               │
│  │██│██│██│░░│██│░░│░░│               │
│  │3 │5 │2 │  │7 │  │  │               │
│  └──┴──┴──┴──┴──┴──┴──┘               │
│  17 kanji esta semana · Racha: 🔥 14d  │
│                                        │
│  ──────────────────────────────        │
│                                        │
│  📈 Estadísticas Generales             │
│  Total kanji aprendidos: 64            │
│  Historias completadas: 5              │
│  Días de estudio: 23                   │
│  Racha más larga: 14 días              │
│  Tiempo total: 4h 32min               │
│  Retención promedio: 82%               │
│                                        │
│  ──────────────────────────────        │
│                                        │
│  🏆 Logros                             │
│  [🥇 Primer Paso] [🌸 Hanami]         │
│  [🔥 7 días]     [📖 5 historias]      │
│  [░░ ????????]   [░░ ????????]         │
│                                        │
├────────────────────────────────────────┤
│  🏠      📖      🔄      📊      ⚙   │
└────────────────────────────────────────┘
```

**Elementos clave**:

| Sección                  | Contenido                                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| **Progreso del nivel**   | Barra visual prominente + porcentaje + kanji restantes para subir                                   |
| **Actividad semanal**    | Heatmap/barras de los últimos 7 días; kanji aprendidos por día                                      |
| **Racha**                | Días consecutivos de estudio con ícono de fuego                                                     |
| **Stats generales**      | Métricas acumuladas desde el inicio                                                                 |
| **Logros**               | Grid de badges desbloqueados vs. bloqueados (los bloqueados son "????????" para generar curiosidad) |
| **Gráfico de retención** | (Opcional, si el espacio lo permite) Línea de retención promedio en las últimas 4 semanas           |

# KamiJi PRD — Parte 4.2: Pantallas de UI — Preferencias y Estados de Error

---

## 13.12 Pantalla: Preferencias (⚙ Settings)

**Propósito**: Configuración de la aplicación y perfil del usuario.

### Estructura

```
┌────────────────────────────────────────┐
│  ⚙ Preferencias                        │
├────────────────────────────────────────┤
│                                        │
│  👤 PERFIL                             │
│  ┌──────────────────────────────────┐  │
│  │ NickName: {nombre}        [✏️]  │  │
│  │ Email: {email}            (GGL) │  │
│  │ Nivel: N5 · El Parvulario       │  │
│  │ Miembro desde: Abril 2026       │  │
│  └──────────────────────────────────┘  │
│                                        │
│  🔑 API KEY DE GEMINI                  │
│  ┌──────────────────────────────────┐  │
│  │ Estado: ✅ Configurada           │  │
│  │ [Cambiar API Key]               │  │
│  │ [Obtener nueva API Key gratis →]│  │
│  │ Modelo actual: gemini-3.1-flash-lite-preview │  │
│  └──────────────────────────────────┘  │
│                                        │
│  🎨 APARIENCIA                         │
│  ┌──────────────────────────────────┐  │
│  │ Tema: [Auto] [Light] [Dark] *   │  │
│  │ Acento: [●] [●] [●]        *   │  │
│  │ Densidad: [Espaciado][Normal]   │  │
│  │           [Compacto]        *   │  │
│  │ * Solo disponible en N3+        │  │
│  └──────────────────────────────────┘  │
│                                        │
│  📖 LECTURA                            │
│  ┌──────────────────────────────────┐  │
│  │ Furigana por defecto:           │  │
│  │ [Oculto] [Solo no aprendidos]   │  │
│  │ [Siempre visible]               │  │
│  │                                  │  │
│  │ Tamaño del texto: [- ● ● ● +]  │  │
│  │ Velocidad de auto-ocultación:   │  │
│  │ Chuleta: [3s] [5s] [10s]       │  │
│  │ Chuleta Global: [30s] [60s]     │  │
│  │                [120s] [∞]       │  │
│  └──────────────────────────────────┘  │
│                                        │
│  🦊 MASCOTA KAMI-CHAN                   │
│  ┌──────────────────────────────────┐  │
│  │ Visibilidad:                    │  │
│  │ [Siempre] [Solo logros] [Oculta]│  │
│  └──────────────────────────────────┘  │
│                                        │
│  🔔 NOTIFICACIONES                     │
│  ┌──────────────────────────────────┐  │
│  │ Recordatorio diario: [ON/OFF]   │  │
│  │ Hora: [19:00]                   │  │
│  │ Frecuencia: [Diario] [Cada 2d]  │  │
│  │             [Solo si no estudio] │  │
│  │ Tono: [Amigable] [Directo]      │  │
│  │       [Motivacional]            │  │
│  └──────────────────────────────────┘  │
│                                        │
│  🔊 SONIDO Y HÁPTICA                   │
│  ┌──────────────────────────────────┐  │
│  │ Efectos de sonido: [ON/OFF]     │  │
│  │ Vibración háptica: [ON/OFF]     │  │
│  └──────────────────────────────────┘  │
│                                        │
│  📊 DATOS                              │
│  ┌──────────────────────────────────┐  │
│  │ [Exportar mi progreso (JSON)]   │  │
│  │ [Resetear progreso del nivel]   │  │
│  │ ⚠️ [Resetear TODO]             │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ☕ APOYAR KAMIJI                       │
│  ┌──────────────────────────────────┐  │
│  │ ¿Te gusta KamiJi? ¡Invítame    │  │
│  │ un café para seguir mejorándola!│  │
│  │ [☕ Invitar un café →]          │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ℹ️ ACERCA DE                          │
│  ┌──────────────────────────────────┐  │
│  │ KamiJi v1.0.0                   │  │
│  │ [Créditos y Licencias]          │  │
│  │ [Política de Privacidad]        │  │
│  │ [Términos de Uso]               │  │
│  │ [Gestos — Cómo usar la app]     │  │
│  │                                  │  │
│  │ [Cerrar Sesión]                 │  │
│  └──────────────────────────────────┘  │
│                                        │
├────────────────────────────────────────┤
│  🏠      📖      🔄      📊      ⚙   │
└────────────────────────────────────────┘
```

### Opciones Detalladas por Sección

**Perfil**: Editable es solo el NickName. Email viene de Google Auth (read-only). El nivel se muestra pero NO se puede cambiar manualmente (se sube al completar todos los kanji del nivel).

**API Key**: Se muestra estado (configurada/no configurada); se puede cambiar en cualquier momento; link a Google AI Studio para obtener nueva key. La key se almacena **cifrada** en Firestore.

**Apariencia**: Las opciones de tema (Light/Dark/Auto), acento y densidad solo se desbloquean en N3+. En N5/N4 la UI usa el tema fijo del nivel (coherencia de la narrativa de evolución).

**Lectura**: Ajustes de furigana y tiempos. Permitir al usuario calibrar la experiencia a su ritmo.

**Datos**: Exportar progreso como JSON (para backup); resetear progreso del nivel actual (con doble confirmación); resetear todo (con triple confirmación y countdown de 5 segundos).

---

## 13.13 Pantallas de Estado: Error, Offline, Cargando y Vacío

### Estado: Sin Conexión a Internet

```
┌────────────────────────────────────────┐
│                                        │
│          ┌──────────────┐              │
│          │  📶 ✕        │              │
│          │  (icono wifi │              │
│          │   tachado)   │              │
│          └──────────────┘              │
│                                        │
│  ¡Ups! Parece que no tienes conexión   │
│  a internet. 📶                        │
│                                        │
│  No te preocupes, puedes:             │
│  • Leer historias ya descargadas 📖    │
│  • Repasar kanji offline 🔄           │
│  • Ver tu progreso guardado 📊        │
│                                        │
│  Las traducciones con IA estarán       │
│  disponibles cuando vuelvas a          │
│  conectarte. Mientras tanto, la        │
│  Chuleta (diccionarios) funciona       │
│  perfectamente sin internet 💪         │
│                                        │
│  Intentémoslo de nuevo cuando haya     │
│  conexión, ¿sí?                        │
│                                        │
│         [🔄 Reintentar conexión]       │
│                                        │
└────────────────────────────────────────┘
```

**Comportamiento offline**:

- Banner sutil en la parte superior (no modal): "Modo offline · Diccionarios disponibles · IA no disponible"
- Las historias previamente cargadas son accesibles
- Los gestos de Chuleta (furigana) funcionan con datos del diccionario local
- Los gestos de Rayo X (traducción) funcionan con diccionario local; si necesitan IA, muestran: "Traducción no disponible offline. Usando diccionario."
- El progreso se guarda localmente en IndexedDB y se sincroniza al reconectarse (Background Sync)
- La barra de progreso sigue funcionando (datos locales)

### Estado: Cargando (Skeleton Screens)

Las pantallas de carga **nunca** muestran spinners vacíos. Siempre usan skeleton screens que replican la estructura del contenido esperado:

- **Home cargando**: Skeleton del saludo + cards de historia + card de repaso
- **Historia cargando**: Skeleton del texto con bloques de ancho variable
- **Repaso cargando**: Skeleton de la card central + botones

Animación del skeleton: Shimmer horizontal (gradiente de `--bg-secondary` a `--bg-primary` a `--bg-secondary`, ciclo de 1.5s)

### Estado: Vacío (Empty States)

| Pantalla               | Estado Vacío                | Mensaje                                                                                 |
| ---------------------- | --------------------------- | --------------------------------------------------------------------------------------- |
| **Lista de historias** | Sin historias para el nivel | "¡Ups! Estamos preparando historias para tu nivel. Mientras tanto, ¿qué tal un repaso?" |
| **Repaso SRS**         | Sin kanji para repasar      | "¡Genial! No tienes kanji pendientes de repaso 🎉 ¿Lees una historia nueva?"            |
| **Logros**             | Sin logros desbloqueados    | "Tus logros aparecerán aquí. ¡Lee tu primera historia para empezar! 📖"                 |
| **Stats semanales**    | Sin actividad esta semana   | "Esta semana aún no has estudiado. ¡Empieza con una historia cortita!"                  |

### Estado: Error Genérico

```
┌────────────────────────────────────────┐
│                                        │
│          ┌──────────────┐              │
│          │   🙈         │              │
│          │              │              │
│          └──────────────┘              │
│                                        │
│  Algo salió mal por aquí               │
│                                        │
│  No te preocupes, estas cosas pasan.   │
│  Tu progreso está a salvo.             │
│                                        │
│         [🔄 Intentar de nuevo]         │
│         [🏠 Ir al inicio]             │
│                                        │
│  Si el problema persiste:             │
│  Código: {error_code}                  │
│                                        │
└────────────────────────────────────────┘
```

### Estado: Subida de Nivel (Level Up / Metamorfosis)

Esta es la pantalla más especial de toda la aplicación. Ver Parte 2.1 (ceremonia de graduación N5→N4) como referencia. Cada transición de nivel tiene su ceremonia única descrita en las Partes 2.0-2.4.

**Trigger**: Se activa cuando el usuario marca el último kanji necesario del nivel como "Aprendido" Y su retención promedio del nivel es ≥ 80%.

```
┌────────────────────────────────────────┐
│                                        │
│   ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨         │
│                                        │
│          🎓                             │
│   ¡FELICIDADES, {NickName}!            │
│                                        │
│   Has completado                       │
│   N5 · El Parvulario                   │
│                                        │
│   🏆 103 kanji dominados              │
│   📖 12 historias leídas              │
│   ⏱️ 15 horas de estudio              │
│   🔥 Racha más larga: 23 días         │
│                                        │
│   Tu nuevo nivel:                      │
│   ┌──────────────────────────────┐     │
│   │  N4 · La Escuela Primaria   │     │
│   │  181 nuevos kanji te esperan │     │
│   └──────────────────────────────┘     │
│                                        │
│   La app se transformará para          │
│   reflejar tu crecimiento.             │
│                                        │
│        [✨ Comenzar N4]                │
│                                        │
│   ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨         │
└────────────────────────────────────────┘
```

Al tocar "Comenzar N4", se ejecuta la ceremonia de metamorfosis visual completa (descrita en Parte 2.1 para N4, y equivalentes para los demás niveles).

# KamiJi PRD — Parte 5.0: Sistema de Progresión y Subida de Nivel (SRS/FSRS)

---

## 14. Sistema de Progresión

### 14.1 ¿Cómo Sube de Nivel un Usuario?

La subida de nivel es el evento más importante en KamiJi. Se basa en dos criterios simultáneos:

#### Criterio 1: Cobertura — Todos los Kanji del Nivel Marcados como "Aprendidos"

El usuario debe haber marcado como "Aprendido" (swipe → en el Panel de Traducción o confirmación positiva en sesión de repaso SRS) cada uno de los kanji del nivel actual.

| Nivel           | Kanji Necesarios                          | Ejemplo                                                          |
| --------------- | ----------------------------------------- | ---------------------------------------------------------------- |
| N5 → N4         | ~103 kanji                                | Todos los kanji asignados a N5 deben estar en estado "Aprendido" |
| N4 → N3         | ~181 kanji (los de N4, no los acumulados) | Solo los nuevos de N4                                            |
| N3 → N2         | ~361 kanji                                | Solo los nuevos de N3                                            |
| N2 → N1         | ~415 kanji                                | Solo los nuevos de N2                                            |
| N1 → Completado | ~1,076+ kanji                             | El estado final de maestría                                      |

#### Criterio 2: Retención — Retención Promedio ≥ 80%

No basta con tocar "Aprendido" una vez. El algoritmo FSRS debe confirmar que el usuario retiene al menos el 80% de los kanji del nivel con una confianza razonable.

**Cálculo de retención**: Se basa en los datos del FSRS — cada kanji tiene un "stability" score y un "retrievability" estimado. La retención promedio es la media de retrievability de todos los kanji del nivel.

```
Retención del nivel = Σ(retrievability de cada kanji) / total kanji del nivel

Si retención ≥ 0.80 AND cobertura = 100% → LEVEL UP disponible
```

**Si el usuario tiene cobertura 100% pero retención < 80%**:

- Mensaje: "¡Ya conoces todos los kanji de este nivel! Pero algunos necesitan un poco más de repaso para que no se te olviden. Tu retención es del {X}% — necesitas 80% para subir de nivel. ¡Ya casi estás! 💪"
- El sistema prioriza los kanji con baja retención en las sesiones de repaso
- La barra de progreso muestra "100% aprendidos · {X}% retenidos" con dos indicadores visuales

### 14.2 FSRS: Implementación del Algoritmo

KamiJi implementa **FSRS v4** (Free Spaced Repetition Scheduler), el algoritmo de repetición espaciada basado en machine learning que ha demostrado ser ~25% más eficiente que SM-2.

#### Parámetros Core del FSRS

```typescript
interface FSRSConfig {
  // Retención objetivo (configurable por usuario en V2; fijo en V1)
  desiredRetention: 0.9; // 90% — balance óptimo entre retención y carga de repaso

  // Pesos del modelo (se optimizan con datos del usuario después de ~400 repasos)
  weights: number[]; // 19 parámetros del modelo FSRS

  // Configuración de learning steps
  learningSteps: [60, 600]; // 1 minuto, 10 minutos (misma sesión)
  relearningSteps: [600]; // 10 minutos (para kanji olvidados)

  // Límites
  maximumInterval: 365; // Máximo 1 año entre repasos
  minimumInterval: 1; // Mínimo 1 día
}
```

#### Estados de un Kanji en el SRS

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│   NEW    │ ──→ │ LEARNING │ ──→ │  REVIEW  │ ──→ │ MASTERED │
│ (Nuevo)  │     │(Aprender)│     │ (Repaso) │     │(Dominado)│
└──────────┘     └──────────┘     └──────────┘     └──────────┘
                      │                │                  │
                      │           ┌────┴────┐             │
                      │           │ RELEARN │             │
                      └─────────→ │(Re-apr.)│ ←───────────┘
                                  └─────────┘
```

| Estado       | Descripción                                              | Trigger de Entrada                                                       |
| ------------ | -------------------------------------------------------- | ------------------------------------------------------------------------ |
| **NEW**      | Kanji nunca visto ni interactuado                        | Estado inicial de todo kanji                                             |
| **LEARNING** | Kanji en proceso de aprendizaje inicial (learning steps) | Primera interacción (swipe →, o primera exposición en lectura + marcado) |
| **REVIEW**   | Kanji en ciclo regular de repaso espaciado               | Completó todos los learning steps                                        |
| **RELEARN**  | Kanji olvidado, repitiendo learning steps                | Botón "Otra vez" en sesión de repaso                                     |
| **MASTERED** | Kanji con intervalo > 60 días y retención estimada > 95% | FSRS calcula estabilidad alta; se excluye de repaso activo               |

#### Cómo se Alimenta el FSRS

| Acción del Usuario                      | Efecto en FSRS                                        |
| --------------------------------------- | ----------------------------------------------------- |
| **Swipe → "Aprendido"** (en lectura)    | Kanji pasa de NEW → LEARNING; primer learning step    |
| **Swipe ← "Para repasar"** (en lectura) | Kanji se marca con prioridad alta en cola de repaso   |
| **"Otra vez" en repaso**                | rating = 1; kanji entra en RELEARN                    |
| **"Difícil" en repaso**                 | rating = 2; intervalo reducido                        |
| **"Bien" en repaso**                    | rating = 3; intervalo estándar FSRS                   |
| **"Fácil" en repaso**                   | rating = 4; intervalo ampliado                        |
| **No repasar (skip involuntario)**      | El kanji acumula "overdue"; FSRS ajusta la predicción |

#### Cola de Repaso Diaria

El sistema calcula cada día los kanji que necesitan repaso:

```typescript
function getDailyReviewQueue(userId: string): Kanji[] {
  // 1. Obtener todos los kanji en estado REVIEW o RELEARN
  // 2. Filtrar los que tienen scheduledDate <= hoy
  // 3. Ordenar por urgencia (más overdue primero)
  // 4. Limitar a un máximo razonable por sesión

  const MAX_REVIEWS_PER_SESSION = 30; // Prevenir fatiga
  const NEW_KANJI_PER_SESSION = 5; // Introducir kanji nuevos gradualmente

  return [...overdueKanji, ...scheduledForToday]
    .sort((a, b) => a.retrievability - b.retrievability) // Más urgentes primero
    .slice(0, MAX_REVIEWS_PER_SESSION);
}
```

### 14.3 Progreso Visible: La Barra de Nivel

La barra de progreso del nivel está **siempre visible** en la parte superior de la app (en el header/nav).

**Componentes de la barra**:

```
N5 · El Parvulario  ████████████░░░░░░░░ 62% (64/103)

Desglose al expandir (tap en la barra):
┌────────────────────────────────────────┐
│  N5 · El Parvulario                    │
│                                        │
│  Cobertura: 64/103 kanji (62%)        │
│  ██████████████████░░░░░░░░░░░░        │
│                                        │
│  Retención: 84% (objetivo: 80%)       │
│  ██████████████████████████░░░░        │
│                                        │
│  Próximo hito: 70 kanji → Badge 🌸    │
│  Te faltan: 6 kanji                   │
│                                        │
│  Estimación: ~2 semanas para N4       │
│  (basado en tu ritmo actual)          │
└────────────────────────────────────────┘
```

**La estimación de tiempo** se calcula basada en:

- Kanji aprendidos/semana (promedio últimas 4 semanas)
- Kanji restantes para cobertura 100%
- Tiempo estimado para alcanzar retención 80% en kanji ya aprendidos

### 14.4 Prevención del "Juego" del Sistema

Para evitar que el usuario marque todos los kanji como "Aprendidos" sin realmente aprenderlos:

1. **El swipe → solo cambia el estado a LEARNING, no a MASTERED**: Marcar un kanji como "Aprendido" inicia el proceso SRS, no lo completa
2. **La retención se mide objetivamente**: El FSRS requiere que el usuario demuestre retención en sesiones de repaso futuras
3. **No hay atajos**: No existe botón de "completar nivel" — el progreso es orgánico
4. **Anti-spam**: Si un usuario marca >20 kanji como "Aprendidos" en <5 minutos, se muestra un reminder amable: "¡Vas muy rápido! 🏃 Asegúrate de que realmente los recuerdas. El repaso te lo confirmará."

# KamiJi PRD — Parte 5.1: Gamificación y Psicología del Engagement

---

## 15. Sistema de Gamificación

### 15.1 Filosofía de Gamificación

> _"La gamificación en KamiJi no busca crear adicción vacía. Busca crear un ciclo virtuoso donde la recompensa refuerza el aprendizaje real, no lo sustituye."_

**Principios**:

- **Recompensas ligadas a progreso real**: Cada badge, racha o logro se gana por aprender kanji, no por "abrir la app"
- **Variables rewards (recompensas variables)**: No siempre la misma animación — variabilidad para mantener la dopamina activa
- **Grace mechanics**: Redes de seguridad (streak freeze) para prevenir ansiedad y abandono
- **Status progression**: Sensación de crecimiento continuo, no estancamiento
- **No comparación social agresiva**: Sin leaderboards públicos en V1 — el progreso es personal

### 15.2 Sistema de Rachas (Streaks)

#### Definición de "Día de Estudio"

Un día cuenta como activo si el usuario:

- Leyó al menos 1 página de una historia completa, O
- Completó al menos 1 sesión de repaso SRS (mínimo 5 kanji), O
- Marcó al menos 3 kanji como "Aprendidos" durante lectura

**No cuenta**: Solo abrir la app, ver el Home, cambiar preferencias.

#### Mecánica de Rachas

| Racha    | Recompensa                                                            |
| -------- | --------------------------------------------------------------------- |
| 3 días   | Micro-animación: "¡3 días seguidos! 🔥"                               |
| 7 días   | Badge "Primera Semana" + animación media                              |
| 14 días  | Badge "Constancia" + Kami-chan celebra                                |
| 30 días  | Badge "Un Mes" + animación elaborada + streak freeze gratuito         |
| 60 días  | Badge "Disciplina" + 2 streak freezes                                 |
| 100 días | Badge "百日 (Hyaku-nichi)" + animación épica                          |
| 365 días | Badge legendario "一年 (Ichi-nen)" + animación de fuegos artificiales |

#### Streak Freeze (Protección de Racha)

- **Función**: Permite al usuario "perdonar" 1 día sin actividad sin perder su racha
- **Obtención**: Se gana 1 streak freeze cada 30 días de racha continua; máximo 3 acumulados
- **Uso**: Automático — si un día pasa sin actividad y hay freeze disponible, se consume automáticamente
- **Notificación**: "Usaste un Streak Freeze ayer. Tu racha de {X} días sigue viva 🧊 (Te quedan {Y} freezes)"
- **Por qué**: Previene la ansiedad de "perdí mi racha de 45 días por un viaje de 1 día" — la causa #1 de abandono permanente en apps con streaks

### 15.3 Sistema de Badges / Logros

#### Categorías de Badges

**📖 Lectura**

| Badge | Nombre              | Requisito                     |
| ----- | ------------------- | ----------------------------- |
| 📖    | Primer Cuento       | Completar la primera historia |
| 📚    | Ratón de Biblioteca | Completar 10 historias        |
| 🏛️    | Bibliotecario       | Completar 25 historias        |
| 📜    | Narrador            | Completar 50 historias        |
| ✍️    | Erudito Literario   | Completar 100 historias       |

**漢 Kanji**

| Badge | Nombre          | Requisito                            |
| ----- | --------------- | ------------------------------------ |
| 一    | Primer Trazo    | Aprender el primer kanji             |
| 十    | Diez Caracteres | Aprender 10 kanji                    |
| 百    | Cien Caracteres | Aprender 100 kanji                   |
| 五百  | Quinientos      | Aprender 500 kanji                   |
| 千    | Mil Caracteres  | Aprender 1,000 kanji                 |
| 二千  | Dos Mil         | Aprender 2,000 kanji (near-complete) |

**🔥 Constancia**

| Badge  | Nombre       | Requisito         |
| ------ | ------------ | ----------------- |
| 🔥     | Chispa       | Racha de 3 días   |
| 🔥🔥   | Llama        | Racha de 7 días   |
| 🔥🔥🔥 | Fogata       | Racha de 14 días  |
| ☀️     | Sol Naciente | Racha de 30 días  |
| 🌋     | Volcán       | Racha de 100 días |

**🎓 Nivel (Metamorfosis)**

| Badge | Nombre                  | Requisito    |
| ----- | ----------------------- | ------------ |
| 🌸    | Graduado del Parvulario | Completar N5 |
| 🎒    | Graduado de Primaria    | Completar N4 |
| ⚡    | Graduado del Instituto  | Completar N3 |
| 🎓    | Graduado Universitario  | Completar N2 |
| 🏯    | Doctor en Kanji         | Completar N1 |

**🧠 Especiales**

| Badge | Nombre           | Requisito                                         |
| ----- | ---------------- | ------------------------------------------------- |
| 🦊    | Amigo de Kami    | Interactuar con Kami-chan 10 veces                |
| 🌙    | Búho Nocturno    | Estudiar después de las 23:00                     |
| 🌅    | Madrugador       | Estudiar antes de las 7:00                        |
| 💯    | Memoria Perfecta | Sesión de repaso con 100% de aciertos (≥10 kanji) |
| 🔬    | Investigador     | Usar el Rayo X 50 veces                           |
| ⚡    | Velocista        | Completar un repaso de 20 kanji en <3 minutos     |

### 15.4 Sistema de Puntos de Experiencia (XP)

| Acción                                      | XP Ganados                             |
| ------------------------------------------- | -------------------------------------- |
| Marcar kanji como "Aprendido" (primera vez) | +10 XP                                 |
| Completar una página de historia            | +5 XP                                  |
| Completar una historia completa             | +25 XP                                 |
| Respuesta "Bien" en repaso                  | +3 XP                                  |
| Respuesta "Fácil" en repaso                 | +5 XP                                  |
| Respuesta "Difícil" en repaso               | +2 XP                                  |
| Completar sesión de repaso diaria           | +15 XP bonus                           |
| Día de racha                                | +5 XP × número de día (día 7 = +35 XP) |

**Uso de XP**: En V1, los XP son puramente visuales — muestran la "dedicación" del usuario. No desbloquean contenido (eso lo hacen los kanji aprendidos). En V2, podrían usarse para desbloquear customizaciones visuales.

### 15.5 Psicología Aplicada: Ciclos de Engagement

```
CICLO DIARIO (micro-loop):
┌──────────────┐
│ TRIGGER:     │ → Notificación/Hábito → Abrir app
│ Recordatorio │
└──────┬───────┘
       ↓
┌──────────────┐
│ ACCIÓN:      │ → Leer historia o hacer repaso
│ Contenido    │
└──────┬───────┘
       ↓
┌──────────────┐
│ RECOMPENSA:  │ → Animación, XP, progreso visible, racha
│ Variable     │
└──────┬───────┘
       ↓
┌──────────────┐
│ INVERSIÓN:   │ → Kanji aprendidos, racha acumulada, progreso de nivel
│ Sunk Cost    │   → Difícil de abandonar
└──────────────┘

CICLO SEMANAL (meso-loop):
- Resumen semanal de progreso (email/notificación opcional)
- Hitos de racha (7 días, 14 días)
- Nuevas historias desbloqueadas

CICLO DE NIVEL (macro-loop):
- Metamorfosis visual al completar nivel
- Ceremonia de graduación
- Nueva identidad visual de la app
- Sensación de "nuevo comienzo" renovador
```

### 15.6 Anti-Patrones de Gamificación (Lo que KamiJi NO Hace)

| Anti-Patrón                              | Por Qué Lo Evitamos                                                              |
| ---------------------------------------- | -------------------------------------------------------------------------------- |
| **Leaderboards públicos**                | Genera ansiedad social y comparación tóxica; el aprendizaje es personal          |
| **Penalizaciones por inactividad**       | Perder progreso/puntos por no estudiar genera culpa → abandono permanente        |
| **Notificaciones agresivas**             | "¡Estás perdiendo tu racha!" con tono amenazante destruye la relación con la app |
| **Recompensas por abrir la app**         | Incentiva "abrir y cerrar" sin aprender nada; infla métricas sin valor           |
| **Contenido detrás de paywall de XP**    | Las historias se desbloquean por aprendizaje real, no por puntos                 |
| **Gamificación infinita sin meta clara** | Cada nivel JLPT tiene un fin definido; se evita el "treadmill infinito"          |

# KamiJi PRD — Parte 5.2: Notificaciones y Recordatorios

---

## 16. Sistema de Notificaciones y Recordatorios

### 16.1 Filosofía de Notificaciones

> _"Las notificaciones de KamiJi son como un amigo que te recuerda estudiar, no como un jefe que te regaña por no hacerlo."_

**Principios**:

1. **Nunca generar culpa**: El tono siempre es positivo o neutral, jamás punitivo
2. **Respetar el tiempo**: Máximo 1 notificación/día (excepto recordatorio de racha urgente)
3. **Personalizable**: El usuario controla frecuencia, hora y tono
4. **Contextual**: El contenido de la notificación varía según el estado del usuario
5. **Desactivable sin fricción**: Un toggle, sin preguntas tipo "¿Estás seguro?"

### 16.2 Tipos de Notificaciones

#### Tipo 1: Recordatorio Diario

**Trigger**: A la hora configurada por el usuario (default: 19:00), SI no ha estudiado hoy.

**Tonos disponibles (configurables en Preferencias)**:

**Amigable (Default)**:
| Día | Mensaje |
|---|---|
| Normal | "¡Hey {NickName}! Tienes {X} kanji listos para repasar. ¿5 minutitos? 📖" |
| Racha activa | "Tu racha de {X} días va genial 🔥 ¿Le damos continuidad?" |
| Nuevo contenido | "¡Nueva historia disponible! '{Título}' te espera 📚" |
| Hace 2 días sin estudiar | "Te echamos de menos, {NickName} 🦊 Kami-chan quiere verte" |

**Directo**:
| Día | Mensaje |
|---|---|
| Normal | "Repaso pendiente: {X} kanji · ~{Y} min" |
| Racha activa | "Racha: {X} días · No la pierdas hoy" |
| Hace 2 días | "2 días sin estudiar · {X} kanji pendientes" |

**Motivacional**:
| Día | Mensaje |
|---|---|
| Normal | "千里の道も一歩から — Un viaje de mil leguas comienza con un solo paso 🏔️" |
| Racha activa | "¡{X} días sin parar! 継続は力なり — La perseverancia es poder 💪" |
| Hito cercano | "Solo te faltan {X} kanji para tu próximo logro. ¿Hoy lo consigues? 🏆" |

#### Tipo 2: Racha en Peligro

**Trigger**: 2 horas antes de medianoche, si no ha estudiado hoy Y tiene racha ≥ 3 días Y no tiene streak freeze.

**Mensaje**: "Tu racha de {X} días está en peligro ⏰ Aún tienes tiempo — un repaso rápido de 3 min salva tu racha"

**Regla**: Solo se envía 1 vez. Si el usuario la ignora, la racha se pierde silenciosamente. No se envía segunda notificación tipo "¡Perdiste tu racha!".

#### Tipo 3: Celebración de Hito

**Trigger**: Cuando el usuario alcanza un hito significativo (badge nuevo, milestone de kanji, subida de nivel).

**Mensaje**: "🎉 ¡Lo lograste! Has aprendido {X} kanji. ¡Estás volando!"

**Regla**: Se envía solo si el usuario no está actualmente en la app (para no duplicar la celebración in-app).

#### Tipo 4: Resumen Semanal (Opcional)

**Trigger**: Domingo a las 20:00 (configurable).

**Mensaje**: "📊 Tu semana: {X} kanji aprendidos · {Y} historias leídas · {Z} días de racha · ¡Sigue así!"

**Regla**: Solo si el usuario activó "Resumen semanal" en Preferencias (default: OFF).

### 16.3 Reglas Anti-Spam

| Regla                         | Especificación                                                                                                                                 |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Máximo diario**             | 1 notificación/día (excepto racha en peligro, que puede ser la 2da)                                                                            |
| **Cooldown tras interacción** | Si el usuario abrió la app hoy, NO enviar recordatorio                                                                                         |
| **Escalado de inactividad**   | Si no abre la app en 7+ días: reducir frecuencia a cada 3 días                                                                                 |
| **Abandono detectado**        | Si no abre en 30+ días: dejar de enviar notificaciones. Si vuelve: mensaje de bienvenida cálido ("¡{NickName}! Qué alegría verte de nuevo 🦊") |
| **No molestar**               | Respetar horario configurado. Nunca enviar entre 22:00-08:00                                                                                   |

### 16.4 Implementación Técnica

- **Web Push Notifications**: Usando la Push API del navegador + Service Worker
- **Permission Request**: Se pide permiso de notificaciones después de la 3ra sesión de estudio (no en el primer uso — demasiado pronto, baja tasa de aceptación)
- **Scheduling**: Las notificaciones se programan desde el Service Worker usando la Notification API
- **Fallback si deniega permisos**: Banner in-app discreto al abrir la app después de inactividad

---

## 17. Calendario y Ritmo de Estudio Recomendado

### 17.1 Sesión Tipo Recomendada

```
SESIÓN DIARIA IDEAL (~15 minutos):

1. REPASO SRS (5-7 min)
   └─ Repasar los kanji que FSRS marca como urgentes
   └─ ~10-15 kanji por sesión

2. LECTURA (5-8 min)
   └─ Leer 1-2 páginas de una historia
   └─ Interactuar con 3-5 kanji nuevos

3. RESULTADO ESPERADO
   └─ ~3-5 kanji nuevos marcados como "Aprendidos"/día
   └─ ~10-15 kanji repasados/día
   └─ Progreso estimado: N5 completado en ~5-7 semanas
```

### 17.2 Estimación de Tiempo por Nivel

| Nivel     | Kanji      | Ritmo (5 kanji/día)         | Ritmo (3 kanji/día)        | Ritmo (10 kanji/día)       |
| --------- | ---------- | --------------------------- | -------------------------- | -------------------------- |
| N5        | ~103       | ~3 semanas                  | ~5 semanas                 | ~1.5 semanas               |
| N4        | ~181       | ~5 semanas                  | ~9 semanas                 | ~2.5 semanas               |
| N3        | ~361       | ~10 semanas                 | ~17 semanas                | ~5 semanas                 |
| N2        | ~415       | ~12 semanas                 | ~20 semanas                | ~6 semanas                 |
| N1        | ~1,076     | ~31 semanas                 | ~52 semanas                | ~15 semanas                |
| **TOTAL** | **~2,136** | **~61 semanas (~14 meses)** | **~103 semanas (~2 años)** | **~30 semanas (~7 meses)** |

> Estas son estimaciones conservadoras que incluyen tiempo de repaso y asumen adherencia imperfecta. El tiempo real depende del usuario.

# KamiJi PRD — Parte 6.0: Arquitectura Técnica y Stack

---

## 18. Stack Tecnológico

### 18.1 Stack Completo

| Capa                            | Tecnología                    | Versión | Justificación                                              |
| ------------------------------- | ----------------------------- | ------- | ---------------------------------------------------------- |
| **Framework**                   | Next.js                       | 16.x    | App Router, RSC, optimizaciones de rendimiento, PWA-ready  |
| **Lenguaje**                    | TypeScript                    | 5.x     | Type safety, mejor DX, refactoring seguro                  |
| **Styling**                     | Tailwind CSS                  | 4.x     | Utility-first, design tokens nativos, treeshaking agresivo |
| **Animaciones (UI)**            | Motion (Framer Motion)        | 12.x    | Declarativo, springs, layout animations, gesture support   |
| **Animaciones (SVG/complejas)** | GSAP                          | 3.x     | Control granular de timelines, SVG morphing, pinceladas    |
| **Estado global**               | Zustand                       | 5.x     | Ligero, sin boilerplate, compatible con RSC                |
| **Data fetching**               | TanStack Query (React Query)  | 5.x     | Caching, revalidation, optimistic updates, offline support |
| **Auth**                        | Firebase Auth                 | 11.x    | Google OAuth, session management, tokens                   |
| **Base de datos**               | Firebase Firestore            | 11.x    | Realtime, offline persistence, escalable                   |
| **Almacén local**               | IndexedDB (via Dexie.js)      | 4.x     | Diccionarios offline, cache de IA, datos SRS locales       |
| **PWA / Service Worker**        | Serwist                       | 9.x     | Sucesor moderno de next-pwa, compatible con App Router     |
| **AI Provider**                 | Google Gemini API             | v1      | BYOK model, modelos flash para velocidad/costo             |
| **Deploy**                      | Vercel                        | -       | Edge functions, CDN global, preview deploys                |
| **Linting / Formato**           | ESLint + Prettier + Biome     | Latest  | Consistencia de código                                     |
| **Testing**                     | Vitest + Playwright           | Latest  | Unit + E2E                                                 |
| **Monitoring**                  | Vercel Analytics + Web Vitals | -       | Performance monitoring real                                |

### 18.2 Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE (PWA)                           │
│                                                                 │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐               │
│  │   React    │  │  Zustand   │  │  TanStack  │               │
│  │   Server   │  │  (Client   │  │  Query     │               │
│  │ Components │  │   State)   │  │  (Server   │               │
│  │            │  │            │  │   State)   │               │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘               │
│        │               │               │                       │
│  ┌─────┴───────────────┴───────────────┴──────┐                │
│  │              CAPA DE SERVICIOS              │                │
│  │  ┌─────────┐ ┌──────────┐ ┌──────────────┐ │                │
│  │  │Furigana │ │  SRS     │ │  Gesture     │ │                │
│  │  │Engine   │ │  Engine  │ │  Handler     │ │                │
│  │  │(Dict+AI)│ │  (FSRS)  │ │              │ │                │
│  │  └────┬────┘ └────┬─────┘ └──────────────┘ │                │
│  │       │           │                         │                │
│  │  ┌────┴───────────┴─────────────────────┐   │                │
│  │  │         CAPA DE DATOS LOCAL          │   │                │
│  │  │  ┌──────────┐  ┌──────────────────┐  │   │                │
│  │  │  │IndexedDB │  │ Service Worker  │  │   │                │
│  │  │  │(Dexie.js)│  │ Cache (Serwist) │  │   │                │
│  │  │  └──────────┘  └──────────────────┘  │   │                │
│  │  └──────────────────────────────────────┘   │                │
│  └─────────────────────────────────────────────┘                │
│                          │                                      │
└──────────────────────────┼──────────────────────────────────────┘
                           │ HTTPS
┌──────────────────────────┼──────────────────────────────────────┐
│                   SERVICIOS EXTERNOS                            │
│                          │                                      │
│  ┌───────────────┐  ┌────┴──────┐  ┌──────────────────┐       │
│  │ Firebase Auth │  │ Firestore │  │ Gemini API       │       │
│  │ (Google OAuth)│  │ (User DB) │  │ (BYOK)           │       │
│  └───────────────┘  └───────────┘  │ gemini-3.1-flash-lite-preview │       │
│                                     │ gemini-3-flash-preview │       │
│                                     └──────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### 18.3 Estructura de Carpetas del Proyecto

```
k-jp-web/
├── docs/                           # PRD y documentación
├── public/
│   ├── manifest.json               # PWA manifest
│   ├── icons/                      # PWA icons (192, 512, maskable)
│   ├── dictionaries/               # JSON de diccionarios particionados
│   │   ├── jmdict-n5.json
│   │   ├── jmdict-n4.json
│   │   ├── kanjidic-n5.json
│   │   └── ...
│   └── audio/                      # Efectos de sonido (opcional)
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout + providers
│   │   ├── page.tsx                # Home screen
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── setup/page.tsx
│   │   ├── read/
│   │   │   ├── page.tsx            # Lista de historias
│   │   │   └── [storyId]/page.tsx  # Reading view
│   │   ├── review/
│   │   │   └── page.tsx            # SRS review session
│   │   ├── progress/
│   │   │   └── page.tsx            # Stats/progress screen
│   │   ├── settings/
│   │   │   └── page.tsx            # Preferencias
│   │   ├── offline/
│   │   │   └── page.tsx            # Offline fallback page
│   │   └── sw.ts                   # Service Worker entry
│   ├── components/
│   │   ├── ui/                     # Componentes UI genéricos
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── ...
│   │   ├── reading/                # Componentes del Reading View
│   │   │   ├── KanjiText.tsx       # Texto con kanji interactivos
│   │   │   ├── FuriganaRuby.tsx    # Componente ruby con furigana
│   │   │   ├── TranslationPanel.tsx
│   │   │   ├── KanjiZoom.tsx
│   │   │   └── StoryNavigation.tsx
│   │   ├── review/                 # Componentes del SRS Review
│   │   │   ├── ReviewCard.tsx
│   │   │   ├── ReviewButtons.tsx
│   │   │   └── ReviewSummary.tsx
│   │   ├── gamification/           # Badges, streaks, XP
│   │   │   ├── StreakCounter.tsx
│   │   │   ├── BadgeGrid.tsx
│   │   │   ├── XPAnimation.tsx
│   │   │   └── LevelUpCeremony.tsx
│   │   ├── mascot/                 # Kami-chan
│   │   │   ├── KamiChan.tsx
│   │   │   └── KamiChanExpressions.tsx
│   │   ├── navigation/
│   │   │   ├── TabBar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── LevelProgress.tsx
│   │   └── onboarding/
│   │       ├── WelcomeSlides.tsx
│   │       ├── ProfileSetup.tsx
│   │       └── DonationAsk.tsx
│   ├── hooks/                      # Custom React hooks
│   │   ├── useGestures.ts          # Gesture detection engine
│   │   ├── useFurigana.ts          # Furigana show/hide logic
│   │   ├── useTranslation.ts       # Translation (dict + AI) logic
│   │   ├── useSRS.ts               # FSRS integration
│   │   ├── useLevel.ts             # Current level + theme
│   │   ├── useStreak.ts            # Streak tracking
│   │   ├── useOffline.ts           # Online/offline detection
│   │   └── useHaptic.ts            # Haptic feedback
│   ├── lib/                        # Core business logic
│   │   ├── fsrs/                   # FSRS algorithm implementation
│   │   │   ├── algorithm.ts
│   │   │   ├── types.ts
│   │   │   └── scheduler.ts
│   │   ├── dictionary/             # Dictionary lookup engine
│   │   │   ├── jmdict.ts
│   │   │   ├── kanjidic.ts
│   │   │   ├── lookup.ts
│   │   │   └── types.ts
│   │   ├── ai/                     # Gemini AI integration
│   │   │   ├── client.ts
│   │   │   ├── prompts.ts
│   │   │   ├── cache.ts
│   │   │   └── rate-limiter.ts
│   │   ├── firebase/               # Firebase config + helpers
│   │   │   ├── config.ts
│   │   │   ├── auth.ts
│   │   │   ├── firestore.ts
│   │   │   └── encryption.ts       # API Key encryption
│   │   ├── gestures/               # Gesture engine
│   │   │   ├── detector.ts
│   │   │   ├── resolver.ts         # Conflict resolution
│   │   │   └── types.ts
│   │   └── content/                # Story/content management
│   │       ├── stories.ts
│   │       └── kanji-list.ts       # Curated JLPT kanji lists
│   ├── stores/                     # Zustand stores
│   │   ├── userStore.ts            # User profile, level, settings
│   │   ├── progressStore.ts        # Kanji progress, stats
│   │   ├── readingStore.ts         # Current reading session state
│   │   ├── reviewStore.ts          # SRS review session state
│   │   └── uiStore.ts             # Theme, panels, modals
│   ├── styles/                     # Global styles + theme tokens
│   │   ├── globals.css             # Base styles
│   │   └── themes/
│   │       ├── n5-parvulario.css
│   │       ├── n4-primaria.css
│   │       ├── n3-instituto.css
│   │       ├── n2-universidad.css
│   │       └── n1-doctorado.css
│   ├── types/                      # Global TypeScript types
│   │   ├── kanji.ts
│   │   ├── story.ts
│   │   ├── user.ts
│   │   └── srs.ts
│   └── utils/                      # Utility functions
│       ├── japanese.ts             # Japanese text processing
│       ├── encryption.ts           # Client-side encryption helpers
│       └── analytics.ts            # Event tracking
├── scripts/                        # Build-time scripts
│   ├── parse-jmdict.ts             # Parse JMdict XML → JSON
│   ├── parse-kanjidic.ts           # Parse KANJIDIC2 XML → JSON
│   └── generate-kanji-lists.ts     # Generate curated JLPT lists
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### 18.4 Principios de Arquitectura

1. **Server Components por defecto**: Todo lo que no necesita interactividad client-side es RSC
2. **Client Components para interactividad**: Gestos, animaciones, estado local → `"use client"`
3. **Edge-first data**: Firestore rules + Vercel Edge Functions para auth checks
4. **Offline-first data**: IndexedDB es la fuente de verdad local; Firestore es backup/sync
5. **Code splitting por nivel**: Los estilos y assets de niveles no activos se cargan lazy
6. **Zero layout shift**: Todo espacio de UI es pre-reservado antes de que el contenido cargue

# KamiJi PRD — Parte 6.1: Modelo de Datos y Seguridad

---

## 19. Modelo de Datos

### 19.1 Firestore — Estructura de Colecciones

```
firestore/
├── users/
│   └── {userId}/                      # Documento principal del usuario
│       ├── profile                     # Sub-documento de perfil
│       ├── settings                    # Sub-documento de preferencias
│       ├── kanji_progress/             # Sub-colección: progreso por kanji
│       │   └── {kanjiCharacter}/       # Ej: "食", "電", "車"
│       ├── story_progress/             # Sub-colección: progreso por historia
│       │   └── {storyId}/
│       ├── achievements/               # Sub-colección: logros desbloqueados
│       │   └── {achievementId}/
│       └── review_log/                 # Sub-colección: log de repasos (para FSRS)
│           └── {logId}/
└── content/
    ├── stories/                        # Colección de historias
    │   └── {storyId}/
    └── kanji_lists/                    # Listas de kanji por nivel
        └── {level}/                    # "n5", "n4", etc.
```

### 19.2 Schemas de Documentos

#### User Document

```typescript
interface UserDocument {
  uid: string; // Firebase Auth UID
  email: string; // Desde Google OAuth
  nickname: string; // Elegido por el usuario
  photoURL?: string; // Desde Google OAuth
  currentLevel: "n5" | "n4" | "n3" | "n2" | "n1";
  createdAt: Timestamp;
  lastActiveAt: Timestamp;
  totalXP: number;

  // Cifrado
  encryptedApiKey?: string; // API Key de Gemini cifrada con AES-256-GCM
  apiKeyIV?: string; // Vector de inicialización para el cifrado

  // Streak
  currentStreak: number; // Días consecutivos
  longestStreak: number; // Récord personal
  lastStudyDate: string; // Formato: "YYYY-MM-DD"
  streakFreezes: number; // Disponibles (máx 3)

  // Stats
  totalKanjiLearned: number;
  totalStoriesCompleted: number;
  totalStudyMinutes: number;
  totalReviewSessions: number;
}
```

#### User Settings Document

```typescript
interface UserSettings {
  // Apariencia
  theme: "auto" | "light" | "dark";
  accentColor: "default" | "blue" | "teal"; // Solo N3+
  textDensity: "spacious" | "normal" | "compact";

  // Lectura
  defaultFurigana: "hidden" | "unlearned" | "always";
  textSize: number; // Multiplicador (0.8 - 1.5)
  cheatSheetDuration: number; // Segundos (3, 5, 10)
  globalCheatSheetDuration: number; // Segundos (30, 60, 120, -1 para infinito)

  // Mascota
  mascotVisibility: "always" | "achievements" | "hidden";

  // Notificaciones
  notificationsEnabled: boolean;
  notificationTime: string; // "HH:MM" formato 24h
  notificationFrequency: "daily" | "every2days" | "onInactive";
  notificationTone: "friendly" | "direct" | "motivational";
  weeklyDigest: boolean;

  // Audio
  soundEffects: boolean;
  hapticFeedback: boolean;
}
```

#### Kanji Progress Document

```typescript
interface KanjiProgress {
  kanji: string; // El carácter: "食"
  level: string; // Nivel JLPT: "n5"

  // Estado SRS (FSRS)
  srsState: "new" | "learning" | "review" | "relearn" | "mastered";
  stability: number; // FSRS: estabilidad de la memoria
  difficulty: number; // FSRS: dificultad personal del kanji
  retrievability: number; // FSRS: probabilidad de recordar
  scheduledDate: string; // Próxima fecha de repaso: "YYYY-MM-DD"
  interval: number; // Días hasta próximo repaso
  repetitions: number; // Total de repasos realizados
  lapses: number; // Veces que se olvidó

  // Metadata
  firstSeenAt: Timestamp; // Primera vez que lo vio en una historia
  learnedAt?: Timestamp; // Cuando lo marcó como "Aprendido"
  lastReviewedAt?: Timestamp; // Último repaso

  // Contexto
  firstStoryId: string; // Historia donde lo vio primero
  timesEncountered: number; // Veces que apareció en historias leídas
}
```

#### Story Document

```typescript
interface StoryDocument {
  id: string;
  title: {
    ja: string; // Título en japonés
    es: string; // Título en español
  };
  level: string; // "n5", "n4", etc.
  difficulty: 1 | 2 | 3; // Dentro del nivel: fácil, medio, difícil
  estimatedMinutes: number;
  emoji: string; // Icono representativo
  description: string; // Descripción breve en español

  // Contenido
  pages: StoryPage[];

  // Kanji
  kanjiList: string[]; // Lista de kanji únicos en la historia
  kanjiByLevel: Record<string, string[]>; // Agrupados por nivel JLPT

  // Desbloqueo
  requiredKanjiCount: number; // Kanji aprendidos necesarios para desbloquear

  // Metadata
  category: string; // "comida", "familia", "transporte", etc.
  tags: string[];
  createdAt: Timestamp;
}

interface StoryPage {
  pageNumber: number;
  content: string; // Texto japonés con markup para kanji
  kanjiInPage: string[]; // Kanji presentes en esta página
}
```

#### Review Log Entry

```typescript
interface ReviewLogEntry {
  kanjiCharacter: string;
  reviewedAt: Timestamp;
  rating: 1 | 2 | 3 | 4; // Otra vez, Difícil, Bien, Fácil
  previousInterval: number;
  newInterval: number;
  previousStability: number;
  newStability: number;
  elapsedDays: number; // Días desde último repaso
  scheduledDays: number; // Días que se había programado
}
```

### 19.3 IndexedDB — Estructura Local (Dexie.js)

```typescript
// Base de datos local para funcionamiento offline
const db = new Dexie("KamiJiDB");

db.version(1).stores({
  // Diccionarios (precargados desde JSON estáticos)
  jmdict: "id, kanji, *readings, *meanings, level",
  kanjidic: "kanji, *readings, *meanings, level, strokeCount, jlpt",

  // Cache de IA
  aiCache: "key, text, context, level, result, timestamp",

  // Progreso local (mirror de Firestore para offline)
  kanjiProgress: "kanji, level, srsState, scheduledDate",

  // Historias descargadas (para lectura offline)
  stories: "id, level, difficulty",

  // Cola de sincronización (acciones pendientes de subir a Firestore)
  syncQueue: "++id, action, data, timestamp",
});
```

---

## 20. Seguridad

### 20.1 Cifrado de API Key

La API Key de Gemini del usuario se almacena cifrada en Firestore usando **AES-256-GCM**:

```typescript
// Flujo de cifrado
async function encryptApiKey(
  apiKey: string,
  userId: string,
): Promise<{
  encrypted: string;
  iv: string;
}> {
  // 1. Derivar clave de cifrado del UID del usuario + server secret
  const key = await deriveKey(userId, process.env.ENCRYPTION_SECRET);

  // 2. Generar IV aleatorio
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // 3. Cifrar con AES-256-GCM
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(apiKey),
  );

  return {
    encrypted: Buffer.from(encrypted).toString("base64"),
    iv: Buffer.from(iv).toString("base64"),
  };
}
```

**Principios de seguridad**:

- La API Key **nunca** se almacena en texto plano
- La clave de cifrado se deriva del UID del usuario + un secret del servidor (nunca expuesto al cliente)
- El descifrado ocurre en el **servidor** (API Route de Next.js) cuando se necesita hacer una llamada a Gemini
- La API Key nunca viaja descifrada al cliente después del setup inicial
- Las llamadas a Gemini se hacen desde API Routes del servidor, no desde el cliente directamente

### 20.2 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Un usuario solo puede leer/escribir sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // Sub-colecciones del usuario
      match /{subcollection}/{docId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }

    // El contenido (historias, listas de kanji) es público para lectura
    match /content/{document=**} {
      allow read: if request.auth != null;
      allow write: if false; // Solo admin puede escribir contenido
    }
  }
}
```

### 20.3 Consideraciones de Privacidad

| Dato                    | Almacenamiento                        | Acceso                                                                               |
| ----------------------- | ------------------------------------- | ------------------------------------------------------------------------------------ |
| **Email**               | Firestore (del Google OAuth)          | Solo el propio usuario                                                               |
| **NickName**            | Firestore                             | Solo el propio usuario (V1; en V2 podría ser público si se añaden features sociales) |
| **API Key**             | Firestore (cifrada AES-256-GCM)       | Descifrada solo en el servidor para llamadas API                                     |
| **Progreso de kanji**   | Firestore + IndexedDB local           | Solo el propio usuario                                                               |
| **Historial de repaso** | Firestore + IndexedDB local           | Solo el propio usuario                                                               |
| **Consultas a IA**      | Cache temporal en IndexedDB (30 días) | Solo local en el dispositivo del usuario                                             |

**GDPR/Privacidad**:

- Botón "Exportar mis datos" en Preferencias (JSON completo)
- Botón "Eliminar mi cuenta" en Preferencias (borra todos los datos de Firestore; con confirmación triple)
- No se recopilan datos analíticos identificables en V1
- No se comparten datos con terceros

# KamiJi PRD — Parte 6.2: Estrategia Offline (PWA)

---

## 21. Estrategia Offline-First (PWA)

### 21.1 Filosofía Offline

> _"KamiJi debe ser útil aunque el usuario esté en un avión, en el metro sin señal, o en un pueblo sin Wi-Fi. La experiencia offline no es una versión degradada — es una versión diferente pero completa."_

### 21.2 ¿Qué Funciona Offline?

| Feature                                       | Offline | Cómo                                                 |
| --------------------------------------------- | ------- | ---------------------------------------------------- |
| **Lectura de historias previamente cargadas** | ✅ Sí   | Historias cacheadas en IndexedDB/Service Worker      |
| **Furigana (Chuleta)**                        | ✅ Sí   | Diccionarios JMdict/KANJIDIC en IndexedDB            |
| **Traducción (Rayo X) — Diccionario**         | ✅ Sí   | Búsqueda en IndexedDB local                          |
| **Traducción (Rayo X) — IA**                  | ❌ No   | Requiere API de Gemini. Fallback a diccionario       |
| **Traducción (Rayo X) — Cache de IA**         | ✅ Sí   | Consultas previas cacheadas en IndexedDB             |
| **Sesión de repaso SRS**                      | ✅ Sí   | Datos FSRS en IndexedDB; cola de sync pendiente      |
| **Marcar kanji aprendido/repasar**            | ✅ Sí   | Se guarda en IndexedDB + sync queue                  |
| **Ver progreso/stats**                        | ✅ Sí   | Datos en IndexedDB (mirror de Firestore)             |
| **Gamificación (streaks, badges)**            | ✅ Sí   | Calculados localmente                                |
| **Login/Registro**                            | ❌ No   | Requiere Firebase Auth online                        |
| **Descargar nuevas historias**                | ❌ No   | Requiere conexión                                    |
| **Sincronizar progreso**                      | ❌ No   | Se encola y sincroniza al reconectarse               |
| **Cambiar API Key**                           | ❌ No   | Requiere conexión para cifrar y guardar en Firestore |

### 21.3 Service Worker — Estrategias de Cache

```typescript
// Configuración de Serwist para KamiJi
import { defaultCache } from "@serwist/next/worker";

const cacheConfig = {
  runtimeCaching: [
    // 1. APP SHELL — Cache First (nunca expira)
    {
      urlPattern: /\/_next\/static\/.*/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
        expiration: { maxEntries: 200 },
      },
    },

    // 2. DICCIONARIOS — Cache First (actualizar en background)
    {
      urlPattern: /\/dictionaries\/.*/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "dictionaries",
        expiration: { maxAgeSeconds: 30 * 24 * 60 * 60 }, // 30 días
      },
    },

    // 3. HISTORIAS — Cache First (si ya se descargó)
    {
      urlPattern: /\/api\/stories\/.*/,
      handler: "CacheFirst",
      options: {
        cacheName: "stories",
        expiration: { maxEntries: 50 },
      },
    },

    // 4. GOOGLE FONTS — Cache First
    {
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: { maxAgeSeconds: 365 * 24 * 60 * 60 },
      },
    },

    // 5. API ROUTES — Network First (fallback a offline page)
    {
      urlPattern: /\/api\/.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-responses",
        networkTimeoutSeconds: 5,
      },
    },

    // 6. PÁGINAS — Network First (con fallback offline)
    {
      urlPattern: /^https:\/\/.*\//,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages",
        networkTimeoutSeconds: 3,
      },
    },
  ],
};
```

### 21.4 Sincronización Offline → Online

```
FLUJO DE SYNC:

1. USUARIO OFFLINE:
   Acción del usuario → Guardar en IndexedDB → Añadir a Sync Queue

   syncQueue ejemplo:
   [
     { id: 1, action: 'markLearned', data: { kanji: '食', timestamp: ... } },
     { id: 2, action: 'reviewKanji', data: { kanji: '電', rating: 3, ... } },
     { id: 3, action: 'markForReview', data: { kanji: '車', ... } },
   ]

2. RECONEXIÓN DETECTADA:
   navigator.onLine === true → Service Worker Background Sync activado

3. SYNC PROCESS:
   a. Leer todos los items de syncQueue ordenados por timestamp
   b. Para cada item:
      - Enviar a Firestore via API Route
      - Si éxito → eliminar de syncQueue
      - Si fallo → reintentar con exponential backoff (máx 3 intentos)
      - Si conflicto (dato modificado en otro dispositivo):
        → Usar timestamp más reciente (last-write-wins)
   c. Después del sync:
      - Descargar cambios del servidor que no estén en local
      - Actualizar IndexedDB con datos frescos del servidor

4. FEEDBACK AL USUARIO:
   - Toast discreto: "✅ Progreso sincronizado" (si había items en cola)
   - Sin feedback si no había nada que sincronizar
```

### 21.5 Detección Online/Offline

```typescript
// Hook: useOffline.ts
export function useOffline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Trigger sync
      triggerBackgroundSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { isOnline, pendingSyncCount };
}
```

**Indicador visual en la UI**:

- **Online**: Sin indicador (estado normal)
- **Offline**: Banner compacto en la parte superior: "📴 Modo offline · Diccionarios disponibles" con color de fondo sutil (`--warning` a 10% opacidad)
- **Sincronizando**: Spinner pequeño + "Sincronizando..." durante el sync
- **Sync completado**: Toast efímero: "✅ Sincronizado"

### 21.6 Precarga Inteligente de Contenido

Para maximizar la experiencia offline, KamiJi precarga contenido proactivamente:

```
ESTRATEGIA DE PRECARGA:

1. AL PRIMER LOGIN:
   ├─ Descargar diccionario del nivel actual (ej: jmdict-n5.json, kanjidic-n5.json)
   ├─ Descargar las primeras 3 historias del nivel
   └─ Cachear fuentes tipográficas del nivel actual

2. DESPUÉS DE CADA SESIÓN (con Wi-Fi):
   ├─ Descargar la siguiente historia no leída
   ├─ Actualizar caché de diccionario si hay nueva versión
   └─ Sincronizar progreso a Firestore

3. AL SUBIR DE NIVEL:
   ├─ Descargar diccionario del nuevo nivel
   ├─ Descargar las primeras 3 historias del nuevo nivel
   ├─ Descargar assets del nuevo tema visual (fuentes, SVGs)
   └─ Mantener diccionario del nivel anterior (para kanji ya aprendidos)

4. LIMPIEZA AUTOMÁTICA:
   ├─ Si el storage local > 100MB: eliminar historias completadas hace >30 días
   ├─ Si el cache de IA > 50MB: eliminar entradas más antiguas (LRU)
   └─ Nunca eliminar diccionarios ni datos de progreso
```

### 21.7 PWA Manifest

```json
{
  "name": "KamiJi — Caracteres Divinos",
  "short_name": "KamiJi",
  "description": "Aprende kanji japoneses leyendo historias reales",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#FF8A65",
  "background_color": "#FFF8F0",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-maskable-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/home.png",
      "sizes": "390x844",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

# KamiJi PRD — Parte 7.0: Riesgos, Pitfalls y Mitigaciones

---

## 22. Riesgos y Mitigaciones

### 22.1 Riesgos Técnicos

| #   | Riesgo                                                                   | Probabilidad | Impacto | Mitigación                                                                                                                                                                             |
| --- | ------------------------------------------------------------------------ | ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T1  | **API Key de Gemini expuesta en el cliente**                             | Media        | Crítico | Las llamadas a Gemini se hacen SIEMPRE desde API Routes del servidor (Next.js). La key nunca llega al bundle del cliente. Cifrado AES-256-GCM en Firestore.                            |
| T2  | **Calidad inconsistente del furigana generado por IA**                   | Alta         | Alto    | Sistema de 3 capas: diccionario primero (alta precisión), IA solo cuando el diccionario no tiene la entrada, y cache para no repetir errores. Logging de errores para mejorar prompts. |
| T3  | **Costos de IA excesivos para el usuario (cuota del free tier agotada)** | Alta         | Medio   | Rate limiter interno (15 req/min); caching agresivo; batching de consultas; fallback transparente a diccionario. Comunicación clara de que el free tier tiene límites.                 |
| T4  | **IndexedDB storage lleno en dispositivos con poco espacio**             | Baja         | Medio   | Monitoreo del storage con `navigator.storage.estimate()`; limpieza automática de cache de IA antiguo; diccionarios particionados por nivel (solo cargar el activo).                    |
| T5  | **Service Worker desactualizado o conflicto de cache**                   | Media        | Alto    | Headers `Cache-Control: no-cache` para `sw.js`; versionado del SW; prompt al usuario: "Hay una actualización disponible. ¿Recargar?"                                                   |
| T6  | **Rendimiento de animaciones en dispositivos de gama baja**              | Media        | Medio   | Solo usar propiedades GPU-aceleradas (transform, opacity); `@media (prefers-reduced-motion: reduce)` para deshabilitar; benchmark en dispositivos low-end.                             |
| T7  | **Datos de diccionario desactualizados**                                 | Baja         | Bajo    | Versionar los JSON de diccionario; actualización periódica (trimestral) desde fuentes EDRDG; StaleWhileRevalidate en SW cache.                                                         |
| T8  | **Conflictos de sincronización multi-dispositivo**                       | Media        | Medio   | Last-write-wins por timestamp; merge inteligente de progreso SRS (siempre mantener el estado más avanzado del kanji).                                                                  |

### 22.2 Riesgos de Producto

| #   | Riesgo                                                      | Probabilidad | Impacto | Mitigación                                                                                                                                                                                                                       |
| --- | ----------------------------------------------------------- | ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1  | **Contenido insuficiente de historias para cada nivel**     | Alta (V1)    | Crítico | Priorizar N5 con ~15-20 historias en V1. N4 con ~10. N3+ como "coming soon". Las historias son el contenido que más tiempo toma crear. Considerar generación asistida por IA + curación humana.                                  |
| P2  | **La lista curada de kanji por JLPT no es perfecta**        | Alta         | Medio   | Basar la lista en consenso de múltiples fuentes (KANJIDIC, materiales de estudio populares, análisis de exámenes). Permitir feedback de usuarios para ajustar en actualizaciones.                                                |
| P3  | **Usuarios avanzados se aburren con N5**                    | Media        | Medio   | La selección de nivel inicial permite empezar en cualquier nivel. Las historias tempranas de cada nivel se pueden completar rápidamente. El SRS se adapta al ritmo del usuario.                                                  |
| P4  | **La metamorfosis visual confunde a usuarios**              | Baja         | Medio   | La transición es gradual y celebrada (ceremonia). Preview del nuevo tema antes de confirmar. Opción de "volver al tema anterior" en Preferencias (V2).                                                                           |
| P5  | **Los gestos son demasiado complejos para usuarios nuevos** | Media        | Alto    | Onboarding progresivo de gestos (1 por sesión). Tooltips la primera vez. Sección "Gestos" en Preferencias con demos animadas. Alternativas con botones para cada gesto.                                                          |
| P6  | **El modelo BYOK (Bring Your Own Key) genera fricción**     | Alta         | Alto    | Tutorial paso a paso con capturas de pantalla. La app funciona SIN API key (solo con diccionarios). Comunicar claramente que la key es gratuita. Considerar que en V2 se podría ofrecer un tier con key compartida (monetizado). |
| P7  | **Traducciones al español de baja calidad en JMdict**       | Media        | Alto    | Usar Jitendex como complemento. Para entradas sin traducción en español, usar IA para traducir desde el inglés. Permitir a usuarios reportar traducciones erróneas (V2).                                                         |

### 22.3 Riesgos de UX

| #   | Riesgo                                                           | Probabilidad             | Impacto | Mitigación                                                                                                                                                       |
| --- | ---------------------------------------------------------------- | ------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| U1  | **Layout shift al mostrar furigana**                             | Alta (si no se previene) | Alto    | Espacio pre-reservado con `min-height` en Ruby elements. Line-height generoso. Animación con opacity/transform, no con height. Testing exhaustivo de CLS.        |
| U2  | **Panel de Traducción tapa contenido que el usuario quiere ver** | Media                    | Medio   | Panel como overlay con backdrop-filter (no empuja contenido). Máx 50vh en móvil. En desktop N2/N1, sidebar lateral. Drag handle para redimensionar.              |
| U3  | **Gestos entran en conflicto entre sí o con scroll**             | Alta                     | Alto    | Jerarquía de prioridad clara (scroll > triple-tap > long-press+drag > long-press > tap). Zona muerta de 5px. Debounce/throttle en cada gesto. Testing extensivo. |
| U4  | **Sobrecarga cognitiva en la vista de lectura**                  | Media                    | Medio   | Minimalismo funcional: solo mostrar lo necesario. Sin badges/XP/stats intrusivos durante la lectura. La UI "se retira" cuando el usuario está leyendo.           |
| U5  | **Animaciones distraen de la lectura**                           | Baja                     | Medio   | Animaciones contenidas (nunca durante la lectura activa, solo en respuesta a acciones). Respeto de `prefers-reduced-motion`. Toggle en Preferencias.             |

### 22.4 Riesgos Legales / Compliance

| #   | Riesgo                                     | Mitigación                                                                                                                                                             |
| --- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| L1  | **Licencias de JMdict/KANJIDIC**           | Cumplir con CC BY-SA 4.0: incluir créditos al EDRDG en "Acerca de". El contenido derivado (las historias) debe ser original.                                           |
| L2  | **GDPR / Protección de datos**             | Datos mínimos recopilados. Exportación y eliminación de datos disponible. Privacy policy clara. Sin tracking de terceros en V1.                                        |
| L3  | **Uso de la marca/nombre JLPT**            | JLPT es marca registrada de Japan Foundation. Usar "Basado en los niveles del JLPT" como referencia, no como endorsement. Aclarar que KamiJi no está afiliada al JLPT. |
| L4  | **Almacenamiento de API Keys de terceros** | Cifrado robusto. Nunca almacenar en texto plano. Transparencia con el usuario sobre cómo se almacena.                                                                  |

---

## 23. Pitfalls No Obvios y Soluciones

### 23.1 El "Problema del Día 15"

**Problema**: La mayoría de usuarios de apps de aprendizaje de idiomas abandonan entre el día 10 y el día 20. La novedad se agota, el progreso se siente lento, y la rutina aún no es hábito.

**Solución KamiJi**:

- **Hito a los 7 días**: Badge + animación celebratoria significativa
- **Hito a los 14 días**: Streak freeze gratuito (incentivo a continuar para "asegurar" la racha)
- **"Sorpresa" en la historia 5**: Una historia especialmente divertida o culturalmente interesante diseñada para re-enganchar
- **Progresión visible**: A los 15 días con ritmo normal, el usuario debería estar al ~30% de N5 — un punto donde "ya ha invertido demasiado para abandonar" (sunk cost positivo)

### 23.2 El "Kanji Zombi"

**Problema**: Un kanji que el usuario marca como "Aprendido" pero nunca retiene. Lo olvida en cada repaso pero lo sigue marcando como "Bien" por vergüenza o prisa.

**Solución KamiJi**:

- **Detección automática**: Si un kanji tiene ≥ 3 lapses (veces olvidado), se marca como "Leech" (sanguijuela) internamente
- **Acción**: Se muestra en la sesión de repaso con contexto adicional (más frases de ejemplo, mnemonics si están disponibles)
- **Mensaje amable**: "Este kanji parece difícil. ¡No te preocupes! Vamos a verlo de nuevo con más calma."

### 23.3 El "Muro del N3"

**Problema**: N3 es el nivel donde más gente abandona porque la dificultad sube dramáticamente y el contenido deja de ser "simple y divertido".

**Solución KamiJi**:

- **La metamorfosis visual de N3 es la más dramática** — renovación de la experiencia que genera curiosidad
- **El dark mode se desbloquea en N3** — nuevo "toy" que incentiva llegar a este nivel
- **La personalización se desbloquea en N3** — sensación de "ya soy lo suficientemente mayor para elegir"
- **Historias N3 más variadas temáticamente** — cultura pop, tecnología, historias cotidianas relatable

### 23.4 El "Multi-Dispositivo Desync"

**Problema**: El usuario estudia en el móvil en el metro y en el laptop por la noche. El progreso debe ser consistente.

**Solución KamiJi**:

- **Firestore como fuente de verdad del servidor**
- **IndexedDB como fuente de verdad local** (para velocidad y offline)
- **Sync bidireccional** al detectar conexión
- **Merge strategy para SRS**: Si hay conflicto, siempre mantener el estado más "avanzado" del kanji (ej: si en un dispositivo está en "Learning" y en otro en "Review", mantener "Review")
- **Merge strategy para streaks**: Tomar el streak más largo de ambos dispositivos

### 23.5 El "Font Rendering Japonés"

**Problema**: Las fuentes japonesas se renderizan diferente en cada OS y navegador. Los kanji pueden verse pixelados o con proporciones incorrectas en algunos dispositivos.

**Solución KamiJi**:

- **Google Fonts (Noto family)** como fuentes principales — excelente rendering cross-platform
- **Font-display: swap** para evitar FOIT (Flash of Invisible Text)
- **Fallback chain robusta**: `'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif`
- **Testing en**: Chrome/Firefox/Safari × Windows/macOS/Android/iOS

# KamiJi PRD — Parte 7.1: Roadmap Futuro (Post-V1) y Cierre

---

## 24. Roadmap Futuro (Post-V1)

### 24.1 Qué Incluye V1 (MVP)

| Feature                                          | Estado V1                                    |
| ------------------------------------------------ | -------------------------------------------- |
| Autenticación con Google                         | ✅ Incluido                                  |
| Setup Profile (NickName, API Key, Nivel)         | ✅ Incluido                                  |
| Lectura de historias con kanji interactivos      | ✅ Incluido                                  |
| Sistema de gestos completo (7 gestos)            | ✅ Incluido                                  |
| Motor de furigana (diccionario + IA Gemini)      | ✅ Incluido                                  |
| Motor de traducción (diccionario + IA Gemini)    | ✅ Incluido                                  |
| Sistema SRS con FSRS                             | ✅ Incluido                                  |
| Sesión de repaso diaria                          | ✅ Incluido                                  |
| Progresión por nivel JLPT (N5 → N1)              | ✅ Incluido                                  |
| Metamorfosis visual por nivel (5 temas)          | ✅ Incluido                                  |
| Gamificación (streaks, badges, XP)               | ✅ Incluido                                  |
| PWA con soporte offline                          | ✅ Incluido                                  |
| Notificaciones (Web Push)                        | ✅ Incluido                                  |
| Preferencias configurables                       | ✅ Incluido                                  |
| Contenido: ~15-20 historias N5, ~10 historias N4 | ✅ Incluido                                  |
| Contenido: N3, N2, N1                            | ⚠️ Parcial (5 historias por nivel como demo) |
| Mascota Kami-chan (5 evoluciones)                | ✅ Incluido                                  |
| Donación voluntaria (botón café)                 | ✅ Incluido                                  |

### 24.2 V2: Features Planificadas

| Feature                                      | Descripción                                                                                                                                                                                                                               | Prioridad |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **📝 Modo Escritura**                        | Practicar escritura de kanji con stroke order y reconocimiento táctil; integración con Skritter-style input                                                                                                                               | Alta      |
| **🗣️ Audio Nativo**                          | Pronunciación de cada kanji/palabra por un hablante nativo; integración con TTS o audio grabado                                                                                                                                           | Alta      |
| **📖 Generador de Historias con IA**         | Generar historias personalizadas basadas en los kanji que el usuario necesita repasar                                                                                                                                                     | Alta      |
| **🚸 Apartado Pre-Parvulario**               | Implementar un apartado de "Pre-Parvulario" que permita el aprendizaje de hiragana, katakana y trazo básico de kanjis, orientado a niños y personas que no conocen el idioma, usando un personaje "Kami-chan" más "infantil" y didáctico. | Alta      |
| **🌐 Comunidad**                             | Foro/chat para usuarios; compartir progreso; "clubs de lectura" por nivel                                                                                                                                                                 | Media     |
| **🏆 Leaderboards Opcionales**               | Rankings voluntarios por racha, kanji aprendidos, XP — siempre opt-in, nunca forzado                                                                                                                                                      | Media     |
| **📱 App Nativa (React Native / Capacitor)** | Versión nativa para iOS/Android para mejor integración con OS y notificaciones                                                                                                                                                            | Media     |
| **🎨 Temas Custom**                          | Permitir al usuario crear su propio tema visual (colores, fuentes) además de los 5 de nivel                                                                                                                                               | Baja      |
| **📊 Analytics Detallados**                  | Gráficos de retención avanzados, heatmaps de estudio, predicciones de completión                                                                                                                                                          | Media     |
| **🔊 Inmersión Auditiva**                    | Modo donde las historias se leen en voz alta mientras el texto se resalta kanji por kanji                                                                                                                                                 | Media     |
| **📑 Importar Texto Propio**                 | El usuario puede pegar cualquier texto japonés y KamiJi lo procesa con furigana/traducción interactivos                                                                                                                                   | Alta      |
| **🤝 Tier Compartido de IA**                 | Para usuarios sin API Key: tier de pago (~$3/mes) con API Key compartida del servicio                                                                                                                                                     | Media     |
| **🇯🇵 Gramática Integrada**                   | Explicaciones gramaticales contextuales cuando el usuario interactúa con estructuras gramaticales, no solo kanji                                                                                                                          | Baja      |
| **🎮 Mini-juegos de Kanji**                  | Juegos rápidos (matching, memory, speed quiz) como alternativa al repaso SRS tradicional                                                                                                                                                  | Baja      |
| **📧 Reporting de Errores**                  | Sistema para que usuarios reporten traducciones incorrectas o furigana erróneo                                                                                                                                                            | Alta      |
| **🔄 Sincronización con Anki**               | Exportar/importar progreso a/desde decks de Anki para usuarios power                                                                                                                                                                      | Baja      |

### 24.3 V3+: Visión a Largo Plazo

- **KamiJi Academy**: Cursos estructurados con progresión certificable (similar a Coursera pero para kanji)
- **KamiJi for Teams**: Versión para clases/grupos con dashboard de profesor
- **Expansión a otros idiomas**: Chino (Hanzi), Coreano (Hanja) con la misma mecánica core
- **API pública**: Permitir a desarrolladores integrar el motor de furigana/traducción en sus apps
- **Partnerships**: Colaboración con instituciones de enseñanza de japonés y editoriales

---

## 25. Métricas y KPIs de Lanzamiento

### 25.1 Métricas de Éxito V1

| Categoría       | Métrica                                  | Objetivo (3 meses) | Objetivo (6 meses) |
| --------------- | ---------------------------------------- | ------------------ | ------------------ |
| **Adquisición** | Usuarios registrados                     | 500                | 2,000              |
| **Activación**  | % que completa setup + primera historia  | ≥ 60%              | ≥ 70%              |
| **Retención**   | D1 (regresa al día siguiente)            | ≥ 50%              | ≥ 55%              |
| **Retención**   | D7 (regresa a la semana)                 | ≥ 35%              | ≥ 45%              |
| **Retención**   | D30 (regresa al mes)                     | ≥ 18%              | ≥ 25%              |
| **Engagement**  | Sesión promedio                          | ≥ 6 min            | ≥ 8 min            |
| **Engagement**  | Sesiones/semana por usuario activo       | ≥ 3.5              | ≥ 4.5              |
| **Progreso**    | Kanji aprendidos/semana (usuario activo) | ≥ 10               | ≥ 15               |
| **Progreso**    | % usuarios que completan N5              | ≥ 10%              | ≥ 30%              |
| **Calidad**     | NPS                                      | ≥ 40               | ≥ 50               |
| **Calidad**     | CLS (Core Web Vital)                     | < 0.05             | < 0.03             |
| **Calidad**     | INP (Core Web Vital)                     | < 100ms            | < 80ms             |

### 25.2 Herramientas de Medición

| Herramienta                     | Propósito                                                       |
| ------------------------------- | --------------------------------------------------------------- |
| **Vercel Analytics**            | Web Vitals, page views, performance                             |
| **Firebase Analytics** (básico) | Eventos custom (kanji_learned, story_completed, level_up, etc.) |
| **Custom Dashboard** (V2)       | Dashboard interno con métricas de producto                      |

---

## 26. Plan de Contenido V1

### 26.1 Historias N5 — Lista Inicial

| #     | Título (JP)               | Título (ES)      | Tema          | Dificultad | Kanji Principales      |
| ----- | ------------------------- | ---------------- | ------------- | ---------- | ---------------------- |
| 1     | わたしのいちにち          | Mi día           | Rutina diaria | ★☆☆        | 日、人、大、一、二、三 |
| 2     | がっこうへいく            | Voy a la escuela | Transporte    | ★☆☆        | 学、校、行、車、駅     |
| 3     | かぞく                    | La familia       | Familia       | ★☆☆        | 父、母、子、女、男     |
| 4     | にほんのたべもの          | Comida japonesa  | Comida        | ★★☆        | 食、水、魚、肉、米     |
| 5     | でんしゃのなか            | En el tren       | Transporte    | ★★☆        | 電、車、中、出、入     |
| 6     | わたしのへや              | Mi habitación    | Casa          | ★☆☆        | 本、書、見、聞、読     |
| 7     | やすみのひ                | El día libre     | Tiempo libre  | ★★☆        | 休、時、分、半、前、後 |
| 8     | おかいもの                | De compras       | Compras       | ★★☆        | 買、円、高、安、店     |
| 9     | てんき                    | El clima         | Naturaleza    | ★★☆        | 天、気、雨、風、空     |
| 10    | ともだち                  | Los amigos       | Relaciones    | ★★☆        | 友、話、会、言、思     |
| 11-15 | (5 historias adicionales) | (temas variados) | Varios        | ★★★        | Kanji restantes de N5  |

> Las historias se escriben en japonés con gramática N5 y se verifican por hablantes nativos o curación asistida por IA.

---

## 27. Glosario Final de Acrónimos

| Acrónimo  | Significado                                          |
| --------- | ---------------------------------------------------- |
| **JLPT**  | Japanese Language Proficiency Test                   |
| **SRS**   | Spaced Repetition System                             |
| **FSRS**  | Free Spaced Repetition Scheduler                     |
| **PWA**   | Progressive Web App                                  |
| **BYOK**  | Bring Your Own Key                                   |
| **RSC**   | React Server Components                              |
| **CLS**   | Cumulative Layout Shift                              |
| **INP**   | Interaction to Next Paint                            |
| **LCP**   | Largest Contentful Paint                             |
| **FCP**   | First Contentful Paint                               |
| **EDRDG** | Electronic Dictionary Research and Development Group |
| **UVP**   | Unique Value Proposition                             |
| **NPS**   | Net Promoter Score                                   |
| **XP**    | Experience Points                                    |

---

## 28. Cierre

### 28.1 Principio Rector Final

> _"KamiJi no es una app de flashcards con tema bonito. Es un compañero de viaje inteligente que entiende dónde estás, sabe a dónde quieres llegar, y hace que el camino sea tan bello que nunca quieras bajarte."_

### 28.2 Compromiso de Calidad

Este PRD establece los estándares mínimos de calidad para KamiJi V1. Cada feature, cada animación, cada pixel tiene un propósito. Si algo no mejora activamente la experiencia de aprender kanji, no pertenece al producto.

### 28.3 Nota para el Equipo de Desarrollo

Al implementar este PRD:

1. **Priorizar la experiencia de lectura** — Es el corazón de la app
2. **Los gestos deben sentirse mágicos** — Invertir tiempo extra en el pulido de las interacciones
3. **La metamorfosis visual es la recompensa épica** — Asegurar que cada transición de nivel sea un momento memorable
4. **Performance es UX** — Un jank de 16ms puede arruinar una animación perfecta
5. **Offline no es opcional** — Un porcentaje significativo de uso será en transporte público sin conexión
6. **El español es ciudadano de primera clase** — No es una traducción del inglés; es el idioma nativo del producto

---

**Fin del PRD — KamiJi v1.0**

_"神字 — Caracteres Divinos"_

_24 de Abril de 2026_
