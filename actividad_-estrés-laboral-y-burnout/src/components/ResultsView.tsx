import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  QuizSubmissionData,
  submitQuizResults,
  generateMailtoUrl,
} from "../services/emailService";

interface ResultsViewProps {
  submissionData: QuizSubmissionData;
  onRestart: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  submissionData,
  onRestart,
}) => {
  const [emailStatus, setEmailStatus] = useState<"sending" | "success" | "error">("sending");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    submitQuizResults(submissionData)
      .then((res) => {
        if (!isMounted) return;
        setEmailStatus(res.success ? "success" : "error");
      })
      .catch(() => {
        if (!isMounted) return;
        setEmailStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, [submissionData]);

  const handleCopyReport = () => {
    const reportText = `RESULTADOS ACTIVIDAD: ESTRÉS LABORAL Y BURNOUT\n` +
      `Puntaje: ${submissionData.score} / ${submissionData.total} (${submissionData.percentage}%)\n\n` +
      submissionData.answers
        .map(
          (a, i) =>
            `${i + 1}. ${a.questionText}\n` +
            `Respuesta: [${a.selectedOptionId}] ${a.selectedOptionText}\n` +
            `Resultado: ${a.isCorrect ? "Correcta" : `Incorrecta (Correcta: [${a.correctOptionId}] ${a.correctOptionText})`}\n`
        )
        .join("\n");

    navigator.clipboard.writeText(reportText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const mailtoUrl = generateMailtoUrl(submissionData);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-xl mx-auto space-y-8 py-6"
    >
      {/* Duolingo Lesson Complete Hero */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#ffc800] font-display">
          ¡Lección completada!
        </h1>
        <p className="text-sm font-semibold text-slate-400">
          Has completado todas las preguntas sobre Estrés Laboral y Burnout.
        </p>
      </div>

      {/* Duolingo Big Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Points */}
        <div className="bg-slate-900 border-2 border-slate-800 border-b-4 rounded-2xl p-5 text-center space-y-1">
          <p className="text-xs font-black uppercase tracking-wider text-slate-400">
            TOTAL DE ACIERTOS
          </p>
          <p className="text-3xl sm:text-4xl font-black text-[#58cc02] font-mono">
            {submissionData.score} / {submissionData.total}
          </p>
        </div>

        {/* Accuracy */}
        <div className="bg-slate-900 border-2 border-slate-800 border-b-4 rounded-2xl p-5 text-center space-y-1">
          <p className="text-xs font-black uppercase tracking-wider text-slate-400">
            PRECISIÓN
          </p>
          <p className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">
            {submissionData.percentage}%
          </p>
        </div>
      </div>

      {/* Submission Status without displaying any email address */}
      <div className="bg-slate-900/80 border-2 border-slate-800 rounded-2xl p-4 text-center">
        {emailStatus === "sending" && (
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Guardando y enviando resultados...
          </p>
        )}
        {emailStatus === "success" && (
          <p className="text-xs font-bold uppercase tracking-wider text-[#58cc02]">
            Resultados registrados y enviados correctamente
          </p>
        )}
        {emailStatus === "error" && (
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Resultados registrados
            </p>
            <a
              href={mailtoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase tracking-wider text-white rounded-xl border-b-2 border-slate-950 transition-colors"
            >
              Enviar por correo
            </a>
          </div>
        )}
      </div>

      {/* Review Section */}
      <div className="space-y-3">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">
          Revisión de respuestas
        </h2>

        <div className="space-y-3">
          {submissionData.answers.map((ans, idx) => (
            <div
              key={ans.questionId}
              className={`p-4 rounded-2xl border-2 border-b-4 space-y-2 text-xs ${
                ans.isCorrect
                  ? "bg-emerald-950/20 border-emerald-900/60 border-b-emerald-800/80 text-emerald-100"
                  : "bg-rose-950/20 border-rose-900/60 border-b-rose-800/80 text-rose-100"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-bold text-white flex-1 text-sm leading-snug">
                  {idx + 1}. {ans.questionText}
                </span>
                <span
                  className={`font-black uppercase tracking-wider text-[11px] px-2 py-0.5 rounded-lg shrink-0 ${
                    ans.isCorrect
                      ? "bg-[#58cc02] text-slate-950"
                      : "bg-[#ff4b4b] text-white"
                  }`}
                >
                  {ans.isCorrect ? "CORRECTA" : "INCORRECTA"}
                </span>
              </div>

              <div className="space-y-1 pt-1 text-slate-300">
                <p>
                  Tu respuesta: <span className="font-medium text-white">[{ans.selectedOptionId}] {ans.selectedOptionText}</span>
                </p>
                {!ans.isCorrect && (
                  <p className="text-[#58cc02] font-medium">
                    Solución: [{ans.correctOptionId}] {ans.correctOptionText}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Duolingo Chunky 3D Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={onRestart}
          className="w-full py-4 px-6 bg-[#58cc02] hover:bg-[#46a302] text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl border-b-4 border-[#3b8702] active:border-b-0 active:translate-y-1 transition-all cursor-pointer shadow-lg shadow-emerald-950/30"
        >
          PRACTICAR DE NUEVO
        </button>

        <button
          type="button"
          onClick={handleCopyReport}
          className="w-full py-3 px-6 bg-slate-900 hover:bg-slate-800 text-slate-300 font-black text-xs uppercase tracking-wider rounded-2xl border-2 border-slate-800 border-b-4 border-b-slate-950 active:border-b-2 active:translate-y-0.5 transition-all cursor-pointer"
        >
          {copied ? "¡COPIADO AL PORTAPAPELES!" : "COPIAR REPORTE"}
        </button>
      </div>
    </motion.div>
  );
};
