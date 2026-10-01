import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Question } from "../data/quizData";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSubmit: (selectedOptionId: string, isCorrect: boolean) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSubmit,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(false);

  useEffect(() => {
    setSelectedOptionId(null);
    setHasConfirmed(false);
  }, [question.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (!hasConfirmed) {
        const key = e.key.toUpperCase();
        if (["A", "B", "C", "D"].includes(key)) {
          setSelectedOptionId(key);
        } else if (["1", "2", "3", "4"].includes(e.key)) {
          const mapped = ["A", "B", "C", "D"][parseInt(e.key) - 1];
          if (mapped) setSelectedOptionId(mapped);
        } else if (e.key === "Enter" && selectedOptionId) {
          handleConfirm();
        }
      } else {
        if (e.key === "Enter") {
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasConfirmed, selectedOptionId, question]);

  const handleConfirm = () => {
    if (!selectedOptionId || hasConfirmed) return;
    setHasConfirmed(true);
  };

  const handleNext = () => {
    if (!selectedOptionId) return;
    const isCorrect = selectedOptionId === question.correctOptionId;
    onAnswerSubmit(selectedOptionId, isCorrect);
  };

  const isSelectedCorrect = selectedOptionId === question.correctOptionId;
  const progressPercent = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div className="max-w-2xl mx-auto flex flex-col justify-between min-h-[75vh] pb-32">
      {/* Top Bar with Duolingo Progress */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-400">
          <span>Pregunta {questionNumber} de {totalQuestions}</span>
          <span>{progressPercent}%</span>
        </div>

        {/* Duolingo Chunky Progress Bar */}
        <div className="w-full h-4 bg-slate-800 rounded-full p-0.5 overflow-hidden">
          <motion.div
            className="h-full bg-[#58cc02] rounded-full relative"
            initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Subtle gloss highlight on progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/20 rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Main Question Section */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className="my-auto py-6 space-y-6"
      >
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-teal-400">
            {question.category}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight">
            {question.question}
          </h2>
        </div>

        {/* Options in 3D Duolingo Card Style */}
        <div className="space-y-3" role="radiogroup">
          {question.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const isCorrectOption = option.id === question.correctOptionId;

            // Duolingo 3D Button style
            let cardClasses = "bg-slate-900 border-2 border-slate-800 border-b-4 hover:bg-slate-850 hover:border-slate-700 text-slate-200 active:border-b-2 active:translate-y-0.5";
            let badgeClasses = "bg-slate-800 text-slate-400 border border-slate-700";

            if (isSelected && !hasConfirmed) {
              cardClasses = "bg-cyan-950/40 border-2 border-cyan-400 border-b-4 border-cyan-600 text-cyan-50 shadow-md shadow-cyan-950/30";
              badgeClasses = "bg-cyan-500 text-slate-950 border-cyan-400 font-black";
            }

            if (hasConfirmed) {
              if (isCorrectOption) {
                cardClasses = "bg-emerald-950/50 border-2 border-[#58cc02] border-b-4 border-[#3b8702] text-emerald-50";
                badgeClasses = "bg-[#58cc02] text-slate-950 border-[#58cc02] font-black";
              } else if (isSelected && !isCorrectOption) {
                cardClasses = "bg-rose-950/50 border-2 border-[#ff4b4b] border-b-4 border-[#b92b27] text-rose-50";
                badgeClasses = "bg-[#ff4b4b] text-white border-[#ff4b4b] font-black";
              } else {
                cardClasses = "bg-slate-900/40 border-2 border-slate-800/60 border-b-2 opacity-35 text-slate-500 cursor-not-allowed";
                badgeClasses = "bg-slate-800 text-slate-600 border-slate-800";
              }
            }

            return (
              <button
                key={option.id}
                type="button"
                disabled={hasConfirmed}
                onClick={() => setSelectedOptionId(option.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all flex items-start gap-4 cursor-pointer select-none ${cardClasses}`}
              >
                <span
                  className={`w-8 h-8 rounded-xl font-mono text-sm font-black flex items-center justify-center shrink-0 ${badgeClasses}`}
                >
                  {option.id}
                </span>

                <span className="flex-1 text-sm sm:text-base font-medium leading-relaxed pt-0.5">
                  {option.text}
                </span>

                {hasConfirmed && isCorrectOption && (
                  <span className="text-xs font-black uppercase tracking-wider text-[#58cc02] mt-1 shrink-0">
                    CORRECTA
                  </span>
                )}
                {hasConfirmed && isSelected && !isCorrectOption && (
                  <span className="text-xs font-black uppercase tracking-wider text-[#ff4b4b] mt-1 shrink-0">
                    INCORRECTA
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Duolingo Sticky Bottom Action Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 border-t-2 transition-colors duration-200 ${
          hasConfirmed
            ? isSelectedCorrect
              ? "bg-[#0f241a] border-[#58cc02]"
              : "bg-[#281216] border-[#ff4b4b]"
            : "bg-slate-950/95 border-slate-800 backdrop-blur-md"
        }`}
      >
        <div className="max-w-2xl mx-auto px-4 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left info box when confirmed */}
          <div className="w-full sm:flex-1 text-left">
            {!hasConfirmed ? (
              <div className="hidden sm:block text-xs font-bold uppercase tracking-wider text-slate-500">
                Selecciona tu respuesta
              </div>
            ) : isSelectedCorrect ? (
              <div className="space-y-1">
                <p className="text-base sm:text-lg font-black uppercase tracking-wider text-[#58cc02]">
                  ¡Excelente!
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-snug">
                  {question.explanation}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-base sm:text-lg font-black uppercase tracking-wider text-[#ff4b4b]">
                  Solución correcta:
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-snug">
                  {question.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Duolingo 3D Action Button */}
          <div className="w-full sm:w-auto shrink-0">
            {!hasConfirmed ? (
              <button
                type="button"
                disabled={!selectedOptionId}
                onClick={handleConfirm}
                className={`w-full sm:w-44 py-3.5 px-6 font-black text-sm uppercase tracking-wider rounded-2xl border-b-4 transition-all ${
                  selectedOptionId
                    ? "bg-[#58cc02] hover:bg-[#46a302] text-slate-950 border-[#3b8702] active:border-b-0 active:translate-y-1 cursor-pointer shadow-md"
                    : "bg-slate-800 text-slate-500 border-slate-900 cursor-not-allowed"
                }`}
              >
                COMPROBAR
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className={`w-full sm:w-44 py-3.5 px-6 font-black text-sm uppercase tracking-wider rounded-2xl border-b-4 active:border-b-0 active:translate-y-1 transition-all cursor-pointer shadow-md ${
                  isSelectedCorrect
                    ? "bg-[#58cc02] hover:bg-[#46a302] text-slate-950 border-[#3b8702]"
                    : "bg-[#ff4b4b] hover:bg-[#d93838] text-white border-[#b92b27]"
                }`}
              >
                {questionNumber < totalQuestions ? "CONTINUAR" : "FINALIZAR"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
