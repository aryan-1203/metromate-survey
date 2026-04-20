'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface NavigationRowProps {
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  isLastSection: boolean;
}

export function NavigationRow({ onNext, onBack, canGoBack, isLastSection }: NavigationRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 280, damping: 24 }}
      className="flex items-center justify-between pt-4"
    >
      <div>
        {canGoBack && (
          <motion.button
            type="button"
            onClick={onBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans font-medium text-sm text-stone-500 hover:text-stone-700 hover:bg-stone-100 transition-all cursor-pointer"
          >
            <ArrowLeft size={15} />
            Back
          </motion.button>
        )}
      </div>

      <motion.button
        type="button"
        onClick={onNext}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-sans font-semibold text-sm px-6 py-2.5 rounded-full shadow-md shadow-indigo-200 transition-all duration-200 cursor-pointer"
      >
        {isLastSection ? (
          <>
            <CheckCircle2 size={16} />
            Submit
          </>
        ) : (
          <>
            Next section
            <ArrowRight size={16} />
          </>
        )}
      </motion.button>
    </motion.div>
  );
}
