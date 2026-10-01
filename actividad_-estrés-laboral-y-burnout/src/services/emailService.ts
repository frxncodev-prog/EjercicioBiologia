export interface QuizSubmissionData {
  participantId: string;
  timestamp: string;
  score: number;
  total: number;
  percentage: number;
  answers: {
    questionId: number;
    questionText: string;
    selectedOptionId: string;
    selectedOptionText: string;
    correctOptionId: string;
    correctOptionText: string;
    isCorrect: boolean;
  }[];
}

export const RECIPIENT_EMAIL = "francoveloso2010@gmail.com";

export async function submitQuizResults(data: QuizSubmissionData): Promise<{ success: boolean; message: string }> {
  const payload: Record<string, string> = {
    _subject: `Resultados Actividad: Estrés Laboral y Burnout (${data.score}/${data.total})`,
    _template: "table",
    _captcha: "false",
    "Participante": "Anónimo",
    "Fecha y Hora": data.timestamp,
    "Calificación Final": `${data.score} de ${data.total} aciertos (${data.percentage}%)`,
    "Evaluación": data.percentage >= 80 ? "Sobresaliente" : data.percentage >= 60 ? "Aprobado" : "Requiere Repaso",
  };

  data.answers.forEach((ans, index) => {
    payload[`P${index + 1} - ${ans.questionText}`] = `[${ans.selectedOptionId}] ${ans.selectedOptionText} (${ans.isCorrect ? "CORRECTA" : `INCORRECTA - Correcta era [${ans.correctOptionId}]`})`;
  });

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return {
        success: true,
        message: `Resultados enviados correctamente a ${RECIPIENT_EMAIL}.`,
      };
    } else {
      const errorData = await response.json().catch(() => null);
      return {
        success: false,
        message: errorData?.message || "No se pudo conectar con el servicio de correo automático.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error de conexión al enviar el correo.",
    };
  }
}

export function generateMailtoUrl(data: QuizSubmissionData): string {
  const subject = encodeURIComponent(`Resultados Actividad: Estrés Laboral y Burnout - ${data.participantId}`);
  const lines = [
    `INFORME DE ACTIVIDAD - ESTRÉS LABORAL Y BURNOUT`,
    `--------------------------------------------------`,
    `Participante: ${data.participantId} (Anónimo)`,
    `Fecha: ${data.timestamp}`,
    `Puntaje: ${data.score} / ${data.total} (${data.percentage}%)`,
    ``,
    `DETALLE DE RESPUESTAS:`,
    ...data.answers.map((a, i) => [
      `Pregunta ${i + 1}: ${a.questionText}`,
      `Respuesta elegida: [${a.selectedOptionId}] ${a.selectedOptionText}`,
      `Resultado: ${a.isCorrect ? "✅ Correcta" : `❌ Incorrecta (La correcta era [${a.correctOptionId}] ${a.correctOptionText})`}`,
      ``,
    ]).flat(),
  ];

  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
}
