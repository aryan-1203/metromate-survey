'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SurveyHeroProps {
  onStart: () => void;
}

export function SurveyHero({ onStart }: SurveyHeroProps) {
  const words = ['Shape', 'the', 'future', 'of', 'flatmate', 'finding.'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-16"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 24 }}
        className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-2 mb-8 text-sm font-sans text-indigo-600"
      >
        <Sparkles size={14} className="text-amber-500" />
        3-minute survey · 13 questions
      </motion.div>

      <h1 className="font-display text-4xl md:text-6xl text-stone-900 leading-tight mb-6 max-w-2xl">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.07, type: 'spring', stiffness: 280, damping: 22 }}
            className={`inline-block mr-3 ${word === 'finding.' ? 'text-indigo-600 italic' : ''}`}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 280, damping: 24 }}
        className="text-stone-500 font-sans text-lg mb-10 max-w-md leading-relaxed"
      >
        Tell us about your flatmate search journey. Your answers directly shape what MetroMate builds first.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, type: 'spring', stiffness: 280, damping: 24 }}
      >
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-sans font-semibold text-base px-8 py-4 rounded-full shadow-lg shadow-indigo-200 transition-all duration-200 cursor-pointer"
        >
          Begin survey
          <ArrowRight size={18} />
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="text-xs text-stone-400 font-sans mt-6"
      >
        Anonymous · No spam · Helps us build better
      </motion.p>
    </motion.div>
  );
}
