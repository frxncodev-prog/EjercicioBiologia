import React from "react";
import { motion } from "motion/react";

interface WelcomeViewProps {
  onStart: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="max-w-md mx-auto text-center space-y-8 py-8"
    >
      {/* Duolingo style headline banner */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase leading-tight font-display">
          Estrés Laboral y Burnout
        </h1>

        <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed max-w-sm mx-auto">
          ¿Sabes identificar cuándo el estrés se vuelve problemático? Pon a prueba lo que sabes.
        </p>
      </div>

      {/* Chunky Duolingo 3D button */}
      <div className="pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full py-4 px-8 bg-[#58cc02] hover:bg-[#46a302] text-slate-950 font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl border-b-4 border-[#3b8702] active:border-b-0 active:translate-y-1 transition-all cursor-pointer shadow-lg shadow-emerald-950/40"
        >
          EMPEZAR
        </motion.button>
      </div>
    </motion.div>
  );
};
