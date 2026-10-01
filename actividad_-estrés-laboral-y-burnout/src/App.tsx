import React, { useState, useMemo } from "react";
import { AnimatePresence } from "motion/react";
import { QUIZ_QUESTIONS, Question } from "./data/quizData";
import { Header } from "./components/Header";
import { WelcomeView } from "./components/WelcomeView";
import { QuestionCard } from "./components/QuestionCard";
import { ResultsView } from "./components/ResultsView";
import { QuizSubmissionData } from "./services/emailService";

type AppView = "welcome" | "quiz" | "results";

interface RecordedAnswer {
  questionId: number;
  questionText: string;
  selectedOptionId: string;
  selectedOptionText: string;
  correctOptionId: string;
  correctOptionText: string;
  isCorrect: boolean;
}

export default function App() {
  const [view, setView] = useState<AppView>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<RecordedAnswer[]>([]);

  const currentQuestion: Question = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleStartQuiz = () => {
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setView("quiz");
  };

  const handleAnswerSubmit = (selectedOptionId: string, isCorrect: boolean) => {
    const selectedOption = currentQuestion.options.find((o) => o.id === selectedOptionId);
    const correctOption = currentQuestion.options.find((o) => o.id === currentQuestion.correctOptionId);

    const record: RecordedAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      selectedOptionId,
      selectedOptionText: selectedOption ? selectedOption.text : "",
      correctOptionId: currentQuestion.correctOptionId,
      correctOptionText: correctOption ? correctOption.text : "",
      isCorrect,
    };

    const nextAnswers = [...userAnswers, record];
    setUserAnswers(nextAnswers);

    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setView("results");
    }
  };

  const handleRestart = () => {
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setView("welcome");
  };

  const submissionData: QuizSubmissionData = useMemo(() => {
    const score = userAnswers.filter((a) => a.isCorrect).length;
    const total = QUIZ_QUESTIONS.length;
    const percentage = Math.round((score / total) * 100);

    return {
      participantId: "Anónimo",
      timestamp: new Date().toLocaleString("es-AR", {
        dateStyle: "short",
        timeStyle: "short",
      }),
      score,
      total,
      percentage,
      answers: userAnswers,
    };
  }, [userAnswers]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100 antialiased selection:bg-teal-900 selection:text-teal-100">
      {view === "welcome" && <Header />}

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-4 sm:py-8 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {view === "welcome" && (
            <WelcomeView
              key="welcome"
              onStart={handleStartQuiz}
            />
          )}

          {view === "quiz" && currentQuestion && (
            <QuestionCard
              key={`question-${currentQuestion.id}`}
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={QUIZ_QUESTIONS.length}
              onAnswerSubmit={handleAnswerSubmit}
            />
          )}

          {view === "results" && (
            <ResultsView
              key="results"
              submissionData={submissionData}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </main>

      {view !== "quiz" && (
        <footer className="w-full border-t border-slate-900/80 py-4 text-center text-xs text-slate-600">
          <div className="max-w-2xl mx-auto px-4 flex items-center justify-between">
            <span>Actividad interactiva</span>
            <span>5 preguntas</span>
          </div>
        </footer>
      )}
    </div>
  );
}
