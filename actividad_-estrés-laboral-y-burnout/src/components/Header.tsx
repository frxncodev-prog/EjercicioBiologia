import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-wide text-slate-200">
          Estrés Laboral y Burnout
        </span>
        <span className="text-xs text-slate-500">
          5 preguntas
        </span>
      </div>
    </header>
  );
};
