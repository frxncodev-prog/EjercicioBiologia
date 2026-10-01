export interface Question {
  id: number;
  category: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  sourceQuote: string;
}

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Naturaleza del estrés",
    question: "¿El estrés es necesariamente algo malo para nuestro organismo?",
    options: [
      {
        id: "A",
        text: "Sí, cualquier forma de estrés deteriora inmediatamente la salud física y psicológica.",
      },
      {
        id: "B",
        text: "No necesariamente; es una respuesta adaptativa que nos ayuda a estar más atentos y preparados, volviéndose perjudicial si es excesivo o prolongado.",
      },
      {
        id: "C",
        text: "Sí, porque biológicamente el cuerpo humano solo puede funcionar en ausencia total de demandas o exigencias.",
      },
      {
        id: "D",
        text: "No, el estrés nunca tiene consecuencias negativas para la salud humana bajo ninguna circunstancia.",
      },
    ],
    correctOptionId: "B",
    explanation: "El organismo utiliza el estrés como respuesta frente a situaciones que requieren adaptación o esfuerzo mayor (ej. estar más atentos antes de un momento clave). El daño ocurre cuando la exigencia es desmedida o se mantiene en el tiempo.",
    sourceQuote: "«Nuestro organismo utiliza el estrés como una respuesta frente a situaciones que requieren adaptación o un esfuerzo mayor... El problema aparece cuando esa exigencia se vuelve demasiado grande o se mantiene durante demasiado tiempo».",
  },
  {
    id: 2,
    category: "Definición y condiciones",
    question: "¿Qué es y cuándo se produce específicamente el estrés laboral?",
    options: [
      {
        id: "A",
        text: "Aparece ante cualquier jornada compleja o exigente, sin importar si la persona cuenta con apoyo y tiempo para recuperarse.",
      },
      {
        id: "B",
        text: "Se produce cuando una persona siente que lo que le están exigiendo supera los recursos o capacidades que tiene para afrontar esa situación.",
      },
      {
        id: "C",
        text: "Es un estado que ocurre únicamente cuando un trabajador es despedido o cambiado de turno.",
      },
      {
        id: "D",
        text: "Es una situación provocada exclusivamente por la falta de tecnología moderna en el puesto de trabajo.",
      },
    ],
    correctOptionId: "B",
    explanation: "El estrés laboral no surge de cualquier presión puntual, sino cuando la exigencia sobrepasa los recursos disponibles y no se cuenta con apoyo, capacidad de organización ni tiempo de recuperación.",
    sourceQuote: "«El estrés laboral aparece cuando una persona siente que lo que le están exigiendo supera los recursos o las capacidades que tiene para afrontar esa situación. Y algo importante es que no toda presión laboral produce estrés... El problema aparece cuando la presión se vuelve constante».",
  },
  {
    id: 3,
    category: "Causas principales",
    question: "¿Cuáles de los siguientes factores constituyen causas directas del estrés laboral?",
    options: [
      {
        id: "A",
        text: "Sobrecarga de trabajo, falta de autonomía, turnos prolongados o nocturnos, conflictos interpersonales e inseguridad laboral.",
      },
      {
        id: "B",
        text: "Tener autonomía para decidir la organización del trabajo y contar con reconocimiento frecuente de los compañeros.",
      },
      {
        id: "C",
        text: "Poder realizar 5 tareas en el tiempo razonable asignado para esas 5 tareas con suficiente respaldo.",
      },
      {
        id: "D",
        text: "Descansar adecuadamente luego de una jornada de alta exigencia puntual.",
      },
    ],
    correctOptionId: "A",
    explanation: "Las principales causas identificadas incluyen la sobrecarga (muchas tareas en poco tiempo), falta de autonomía, jornadas largas/nocturnas, mal ambiente o acoso, y la falta de claridad o incertidumbre sobre el puesto.",
    sourceQuote: "«Una de las principales es la sobrecarga laboral... También aparece la falta de autonomía... Otra causa son los turnos, las jornadas prolongadas y el trabajo nocturno... relaciones interpersonales... violencia laboral, acoso... e inseguridad laboral».",
  },
  {
    id: 4,
    category: "Consecuencias",
    question: "¿Qué consecuencias puede provocar el estrés laboral prolongado en la persona y en la organización?",
    options: [
      {
        id: "A",
        text: "Únicamente dolores de cabeza leves que desaparecen sin influir en el estado de ánimo ni en el rendimiento del equipo.",
      },
      {
        id: "B",
        text: "No afecta a la organización, únicamente genera cansancio temporal en el hogar del trabajador.",
      },
      {
        id: "C",
        text: "Efectos físicos (insomnio, hipertensión), psicológicos (ansiedad, irritabilidad) y laborales (más errores, accidentes, ausentismo y rotación).",
      },
      {
        id: "D",
        text: "Aumenta la productividad sostenida de la empresa y estimula la toma rápida de decisiones sin margen de error.",
      },
    ],
    correctOptionId: "C",
    explanation: "El estrés crónico impacta de manera integral: deteriora la salud física y psicológica de la persona, e impacta directamente a la empresa con ausentismo, licencias, menor productividad y mayor rotación.",
    sourceQuote: "«A nivel físico pueden aparecer dolores de cabeza, tensión muscular, problemas digestivos... A nivel psicológico: ansiedad, irritabilidad... Y para una empresa: mayor ausentismo, licencias médicas, rotación del personal y menor productividad».",
  },
  {
    id: 5,
    category: "Síndrome de Burnout",
    question: "¿Cuáles son los 3 componentes esenciales que caracterizan al Burnout (estrés laboral crónico)?",
    options: [
      {
        id: "A",
        text: "Estrés agudo, hiperactividad y búsqueda constante de promociones laborales.",
      },
      {
        id: "B",
        text: "Agotamiento emocional, despersonalización (actitudes negativas o indiferentes) y disminución de la realización personal.",
      },
      {
        id: "C",
        text: "Conflictos salariales, absentismo voluntario y exceso de perfeccionismo.",
      },
      {
        id: "D",
        text: "Fatiga muscular pasajera, aburrimiento estacional y cambio de horario.",
      },
    ],
    correctOptionId: "B",
    explanation: "El burnout es un cuadro complejo de estrés crónico conformado por la tríada: agotamiento emocional (cansancio extremo constante), despersonalización (cinismo o frialdad hacia los demás) y baja realización personal.",
    sourceQuote: "«El burnout está relacionado con el estrés laboral crónico... Nuestro trabajo destaca tres componentes: el primero es el agotamiento emocional... el segundo es la despersonalización... y el tercero es la disminución de la realización personal».",
  },
];

export const REFERENCE_TEXT = `El estrés no es necesariamente algo malo.
Nuestro organismo utiliza el estrés como una respuesta frente a situaciones que requieren adaptación o un esfuerzo mayor. Por ejemplo, antes de una situación importante podemos estar más atentos, concentrados y preparados para reaccionar.
El problema aparece cuando esa exigencia se vuelve demasiado grande o se mantiene durante demasiado tiempo. En ese momento, el estrés puede comenzar a afectar nuestra salud.

¿Qué es entonces el estrés laboral?
El estrés laboral aparece cuando una persona siente que lo que le están exigiendo supera los recursos o las capacidades que tiene para afrontar esa situación.
Por ejemplo, si a una persona le dan diez tareas para terminar en un tiempo en el que razonablemente podría hacer cinco, sin apoyo, con presión constante y sin poder organizar su trabajo.
No toda presión laboral produce estrés: puede haber días de mucha exigencia y afrontarlos bien si hay tiempo, recursos, apoyo y luego recuperación. El problema aparece cuando la presión se vuelve constante.

Principales causas del estrés laboral:
1. Sobrecarga laboral (demasiadas tareas, poco tiempo o presión constante).
2. Falta de autonomía (responder por resultados sin poder decidir cómo organizar el trabajo).
3. Turnos, jornadas prolongadas y trabajo nocturno (dificultan el descanso y la recuperación).
4. Relaciones interpersonales (conflictos, mala comunicación, falta de reconocimiento o poco apoyo).
5. Violencia laboral, acoso y discriminación.
6. Inseguridad laboral y falta de claridad (no saber qué se espera o sentir el puesto en riesgo constante).

¿Qué consecuencias puede tener?
- A nivel físico: dolores de cabeza, tensión muscular, problemas digestivos, dificultades para dormir, cansancio persistente o aumento de la presión arterial.
- A nivel psicológico: ansiedad, irritabilidad, problemas para concentrarse, agotamiento, pérdida de motivación y cambios de humor.
- A nivel laboral y empresarial: dificultades para concentrarse y tomar decisiones, más errores y mayor riesgo de accidentes, disminución del rendimiento, conflictos entre compañeros, mayor ausentismo, licencias médicas, rotación del personal y menor productividad.

Burnout:
El burnout está relacionado con el estrés laboral crónico y destaca tres componentes:
1. Agotamiento emocional (cansancio físico y mental constante).
2. Despersonalización (actitudes negativas o indiferentes hacia las personas con las que trabaja).
3. Disminución de la realización personal.`;
